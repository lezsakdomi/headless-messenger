const debug = require('debug')('headless-messenger:tree')
const config = require('config')

const ChildMatchError = require('./ChildMatchError')
const UnknownChildError = require('./UnknownChildError')
const AmbiguousChildClassError = require('./AmbiguousChildClassError')

class FacebookMessengerPageElement {
	constructor(element) {
		this.__element = element
	}

	static get selector() {
		const parentSelectors = [
			this.parentClass.selector, // be first to be readable
			...Object.values(listPageElementClasses())
				.filter(Class => Class !== this.parentClass) // else it would be a duplicate
				.filter(Class => Class.prototype instanceof this.parentClass)
				.map(Class => Class.selector)
		]

		const parentSelector = parentSelectors.length > 1 ? `:is(${parentSelectors.join(', ')})` : parentSelectors[0]

		return parentSelector + ' > '
			+ this.htmlNode
			+ this.htmlClasses.map(c => `.${c}`)
			+ (this.htmlId ? `#${this.htmlId}` : '')
			+ this.additionalSelectors
	}

	static get htmlClasses() {
		return []
	}

	static get htmlId() {
		return undefined
	}

	static get additionalSelectors() {
		return ""
	}

	static get isPageElement() {
		const logIssue = (reason, ...args) => {
			debug.extend('classes')("Warning: Class %s is not a valid page element: %s", this.name, reason, ...args)
		}

		const f = () => {
			if (this === FacebookMessengerPageElement) return false

			if (!(this.prototype instanceof FacebookMessengerPageElement)) return false

			if (!this.parentClass) {
				logIssue("Lacking parentClass")
				return false
			}

			if (!this.htmlNode) {
				logIssue("HTML node not specified")
				return false
			}

			return true
		}

		if (!this.hasOwnProperty('__isPageElement')) this.__isPageElement = f()
		return this.__isPageElement
	}

	get element() {
		return this.__element
	}

	async getChildren(namespace = undefined) {
		if (namespace === undefined) namespace = Math.random().toString(16).slice(2, 6) + ':' + this.constructor.name

		if (!this.hasOwnProperty('__childrenCache')) {
			const onlineChildrenList = await this.element.getProperty('children')
			const length = await this.evaluate(array => array.length, onlineChildrenList)

			const getInstanceAt = async (i) => {
				const debug = require('debug')('headless-messenger:tree:parsing').extend(namespace).extend(i)

				if (config.has('debug.parent') && this.constructor.name === config.get('debug.parent') &&
					!config.has('debug.child')) {
					debugger
				}

				const element = await onlineChildrenList.getProperty(String(i)).then(p => p.asElement())

				const nodeName = await this.evaluate(e => e.nodeName.toLowerCase(), element)
				debug("> %s", nodeName)

				const possibleInstances = [] // possible classes, but instantiated for our case
				const errors = []
				for (let Class of listPageElementClasses()) {
					debug("  ? %s", Class.name)

					if (config.has('debug.parent') && this.constructor.name === config.get('debug.parent') &&
						config.has('debug.child') && Class.name === config.get('debug.child')) {
						debugger
					}

					// check for parentClass
					if (!(this instanceof Class.parentClass)) {
						debug("    -> no: not instance (should be instance of %s)", Class.parentClass.name)
						continue
					}

					// check for htmlNode
					if (nodeName !== Class.htmlNode) {
						debug("    -> no: node mismatch (got %s, expected %s)", nodeName, Class.htmlNode)
						continue
					}

					// check for selector
					if (await this.evaluate((element, selector) => {
						return [...document.querySelectorAll(selector)].some(e => e === element)
					}, element, Class.selector)) {

						// set debugging attribute
						{
							const setAttributePromise = element.executionContext().evaluate((e, className) => {
								const attributeName = "headless-messenger-matching-class"

								if (e.hasAttribute(attributeName)) {
									const possibleClassesSoFar = e.getAttribute(attributeName)
									e.setAttribute(attributeName, possibleClassesSoFar + " " + className)
								} else {
									e.setAttribute(attributeName, className)
								}
							}, element, Class.name).catch(debug.extend('debug:error'))

							if (config.get('debug')) await setAttributePromise
						}

						const result = new Class(element)

						try {
							// check for check()
							const checkResult = await result.check(`${namespace}/#${i}.${Class.name}`)
							if (!checkResult) {
								debug("    -> no: instance.check() returned a falsey value (%o)", checkResult)
								continue
							}
						} catch (e) {
							if (e instanceof AmbiguousChildClassError) {
								throw e
							} else if (e instanceof ChildMatchError) {
								debug("    -> no: instance.check() thrown an error (%s)", e.constructor.name)
								errors.push(e)
								continue
							} else {
								throw e
							}
						}

						// set debug attribute
						{
							const setAttributePromise = element.executionContext().evaluate((e, className) => {
								const attributeName = "headless-messenger-class"

								if (e.hasAttribute(attributeName)) {
									const possibleClassesSoFar = e.getAttribute(attributeName)
									e.setAttribute(attributeName, possibleClassesSoFar + " " + className)
								} else {
									e.setAttribute(attributeName, className)
								}
							}, element, Class.name).catch(debug.extend('debug:error'))
							debug("    -> yes")

							if (config.get('debug')) await setAttributePromise
						}

						possibleInstances.push(result)

					} else {
						debug("    -> no: selector '%s'", Class.selector)
					}
				}

				debug("Possible instances: %d", possibleInstances.length)

				if (possibleInstances.length === 1) {
					return possibleInstances[0]
				} else {
					if (!config.get('debug')) {
						const UnknownPageElement = require('./UnknownPageElement')
						return new UnknownPageElement(element)
					} else {
						// element.dispose()
						// todo do additional cleanup (like for attributes)

						if (possibleInstances.length === 0) {
							throw new UnknownChildError(element, this, undefined, errors, namespace)
						} else {
							throw new AmbiguousChildClassError(element, this, undefined, namespace)
						}
					}
				}
			}

			if (config.get('debug')) {
				// synchronous version
				this.__childrenCache = []
				for (let i = 0; i < length; i++) {
					this.__childrenCache.push(await getInstanceAt(i))
				}
			} else {
				// async version
				this.__childrenCache = await Promise.all([...Array(length).keys()].map(getInstanceAt))
				// todo dispose other children when bailing out because of first rejecter
			}

			onlineChildrenList.dispose()
		}

		return this.__childrenCache
	}

	async getText() {
		return await this.element.getProperty('innerText').then(p => p.jsonValue())
	}

	// noinspection JSMethodCanBeStatic, JSUnusedLocalSymbols
	check(namespace = undefined) {
		return true
	}

	async getTerminalString(options = {}) {
		const {
			lineTerminator = "\n",
		} = options

		const children = await this.getChildren()
		const lines = await Promise.all(children.map(child => child.getTerminalString(options)))
		return lines.join(lineTerminator)
	}

	async evaluate(pageFunction, ...args) {
		return this.element.executionContext().evaluate(pageFunction, ...args)
	}

	async evaluateHandle(pageFunction, ...args) {
		return this.element.executionContext().evaluateHandle(pageFunction, ...args)
	}
}

module.exports = FacebookMessengerPageElement

function listPageElementClasses() {
	if (!listPageElementClasses.hasOwnProperty('__cache')) {
		listPageElementClasses.__cache = Object.values(require('.'))
			.filter(Class => Class.prototype instanceof FacebookMessengerPageElement)
			.filter(Class => Class.isPageElement)
	}

	return listPageElementClasses.__cache
}