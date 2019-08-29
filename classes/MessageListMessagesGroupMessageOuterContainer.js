const config = require('config')
const stripAnsi = require('strip-ansi')

const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')
const MessageListMessagesGroupMessageInnerContainer = require('./MessageListMessagesGroupMessageInnerContainer')
const MessageListMessagesGroupSmallHeadContainer = require('./MessageListMessagesGroupSmallHeadContainer')

class MessageListMessagesGroupMessageOuterContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesContainer')
	}

	static get htmlNode() {
		return 'div'
	}

	static get htmlClasses() {
		return ['clearfix', 'direction_ltr', 'text_align_ltr']
	}

	async check(namespace = undefined) {
		const children = await this.getChildren(namespace)
		return children.length >= 1 && children.some(child => child instanceof MessageListMessagesGroupMessageInnerContainer)
	}

	async getTerminalString(options = {}) {
		const {
			lineTerminator = "\n",
			chalk = require('chalk'),
		} = options

		const children = await this.getChildren()

		const lines = []

		let lastMessageContent = undefined

		for (let child of children) {
			if (child instanceof MessageListMessagesGroupMessageInnerContainer) {
				lines.push(await child.getTerminalString(options))
				lastMessageContent = child
			} else if (child instanceof require('./MessageListMessagesGroupMediaIntermediateContainer')) {
				// just embed it
				lines.push(await child.getTerminalString(options).then(string => string.split(lineTerminator)))
			} else if (child instanceof MessageListMessagesGroupSmallHeadContainer) {
				lines.push(await child.getTerminalString(options))
			} else {
				let text = await child.evaluate(e => e.innerText, child.element)

				if (text === "") continue

				text = text.replace(/\s*(\r?\n|^|$)\s*/g, " ")

				text = text.replace(/^\s+|\s+$/g, "")

				if (!lastMessageContent) {
					text = chalk.dim.italic(text)
				} else {
					text = chalk.cyan.italic(text)

					const lastTimingString = await lastMessageContent.getTimingString()
					const length = stripAnsi(lastTimingString).length
					text = " ".repeat(length + 2) + text
				}

				if (config.get('debug')) {
					text = `{${child.constructor.name}} ${text}`
				}

				lines.push(text)
			}
		}

		return lines.join(lineTerminator)

		// todo remove below
		// return Promise.all([children[0].getTerminalString(options),
		// 	...children.slice(1).map(child =>
		// 		child.element.getProperty('innerText')
		// 			.then(p => p.jsonValue())
		// 			.then(s => s.replace(/\s*(\r?\n|^|$)\s*/g, " "))
		// 			.then(chalk.green.italic)
		// 	)]).then(array => array.join(lineTerminator))

		// todo process and show links & images
	}
}

module.exports = MessageListMessagesGroupMessageOuterContainer
