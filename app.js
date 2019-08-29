const process = require('process')
const puppeteer = require('puppeteer')
const {resolveAsyncConfigs} = require('config/async')
const config = require('config')
const debug = require('debug')("headless-messenger")
const repl = require('repl')
const fs = require('fs')

// noinspection JSUnresolvedVariable
// noinspection SillyAssignmentJS
global.debug = debug
if (process.env['DEBUG'] === undefined) {
	// noinspection JSUnresolvedVariable
	require('debug').enable(debug.namespace)
}

// It's better to require everything before usage at the moment

const {
	ChildMatchError,
	UnknownChildError,
	MessageListContainer,
} = require('./classes')

// const ChildMatchError = require('./classes/ChildMatchError')
// const UnknownChildError = require('./classes/UnknownChildError')
// const MessageListContainer = require('./classes/MessageListContainer')

resolveAsyncConfigs(config)
	.then(config => main())
	.then(v => debug("main() succeeded with %o", v), e => debug("main() failed: %O", e))

async function loadCookies(page, options = {}) {
	const {cookieFile = config.get('cookieFile')} = options

	const cookies = await new Promise((resolve, reject) => fs.readFile(cookieFile, {encoding: 'utf8'}, (err, data) => {
		if (err) {
			reject(err)
		} else {
			resolve(JSON.parse(data))
		}
	}))

	await page.setCookie(...cookies)
}

async function maybeLoadCookies(page, options = {}) {
	const {debug = global.debug.extend('cookies')} = options

	debug("Checking for cookie file access...")
	debug("Cookie file name: '%s'", config.get('cookieFile'))
	const hasCookieFileAccess = await new Promise(resolve => fs.access(config.get('cookieFile'), fs.constants.R_OK, err => {
		resolve(!err)
	}))

	if (hasCookieFileAccess) {
		debug("Cookie file found. Loading cookies...")
		await loadCookies(page)
		return true
	} else {
		return false
	}
}

class ConfigError extends Error {
	// noinspection JSCheckFunctionSignatures
	constructor(key, message, ...args) {
		super(`Bad configuration for key ${key}` + message ? ": " + message : "", ...args)
		// noinspection JSUnusedGlobalSymbols
		this.key = key
	}
}

class LoginError extends Error {
	constructor(message, ...args) {
		// noinspection JSCheckFunctionSignatures
		super("Login failed" + message ? ": " + message : "", ...args)
	}
}

class AlreadyLoggedInError extends LoginError {
	constructor(message, ...args) {
		super("Already logged in" + message ? ": " + message : "", ...args)
	}
}

class FacebookLoginError extends LoginError {
	constructor(facebookMessage, ...args) {
		super("Rejected by facebook", ...args)
		// noinspection JSUnusedGlobalSymbols
		this.facebookMessage = facebookMessage
	}
}

async function login(page, options = {}) {
	const {clean = false, debug = global.debug.extend('login')} = options

	let navigated = !clean

	// todo cleanup
	if (navigated && await page.$('#loginbutton') === null) {
		throw new AlreadyLoggedInError("Login button not found")
	}

	const loginMethod = config.has('login.pass') ? 'plaintext' : config.has('login.method') ? config.get('login.method') : config.get('login')

	debug("Using login method %s", loginMethod)

	switch (loginMethod) {
		case 'plaintext':
		case 'interactive': {
			if (!navigated) {
				await page.goto("https://www.messenger.com/login")
				navigated = true
			}

			const {email, pass} = await (async function () {
				switch (loginMethod) {
					case 'plaintext': {
						return {
							email: config.get('login.email'),
							pass: config.get('login.pass'),
						}
					}

					case 'interactive': {

						prompt.start()

						const result = await new Promise((resolve, reject) => prompt.get([{
							name: 'email',
							required: true,
						}, {
							name: 'pass',
							required: true,
							hidden: true,
							replace: '*',
						}], (err, result) => err ? reject(err) : resolve(result)))

						prompt.stop()

						return result
					}

					default: {
						// note that this is an internal error
						throw new Error(`Unknown login method '${loginMethod}'`)
					}
				}
			})()

			debug("Using email '%s'", email)

			// await page.waitFor(200)

			await page.waitFor(() => {
				const email = document.querySelector('#email')
				const pass = document.querySelector('#pass')
				if (!email || !pass) return false
				return email.offsetParent && pass.offsetParent
			})

			await page.type('#email', email)
			await page.type('#pass', pass)

			await page.waitFor(() => {
				const loginButton = document.querySelector('#loginbutton')
				if (!loginButton) return false
				return !!loginButton.click && !!loginButton.offsetParent
			})

			await Promise.all([
				page.waitForNavigation(),
				page.click('#loginbutton'),
			])
			navigated = true

			// await page.waitFor(500)

			break
		}

		case 'X': {
			await page.goto('about:blank')
			navigated = false
			const oldCookies = await page.cookies()

			const visibleBrowser = await puppeteer.launch({
				headless: false
			})
			const visiblePage = await visibleBrowser.pages().then(pages => pages[0])
			await visiblePage.setCookie(...oldCookies)

			await visiblePage.goto("https://www.messenger.com/login")

			await page.waitFor(() => location.href.match(/^https?:\/\/(www.)?messenger.com\/t\//))

			await visiblePage.goto('about:blank')
			const newCookies = visiblePage.cookies()

			await page.deleteCookie(...oldCookies).then(() => page.setCookie(...newCookies))

			await visibleBrowser.close()

			break
		}

		default: {
			throw new ConfigError('login', "Invalid login method")
		}
	}

	// checking whether login succeeded
	if (!navigated) {
		debug("Page is not on Messenger")
		page.goto("https://www.messenger.com/")
	}

	if (await page.evaluate(() => document.querySelector('#loginbutton') !== null)) {
		debug("Whoops, we still have a login button.")

		let message

		const errorMessageDiv = await page.$('form > input[type="hidden"] + div[class]:not(#loginform)')
		if (errorMessageDiv !== null) {
			message = await page.evaluate(e => e.innerText, errorMessageDiv)
			await errorMessageDiv.dispose()
		}

		throw new FacebookLoginError(message)
	}
}

async function maybeLogin(page, options = {}) {
	if (await page.evaluate(() => document.querySelector('#loginbutton') !== null)) {
		debug("Not logged in")
		login(page, options)
	}
}

// noinspection JSUnusedLocalSymbols
async function generateTextTree(e) { // beginners' function
	// todo optimize
	e = await (e || page.$(`div[aria-label="${config.get('localization.Messages')}"] > div[id]`))

	switch (await e.getProperty('htmlNode').then(p => p.jsonValue()).then(v => v.toLowerCase())) {
		default:
			const onlineChildrenList = await e.getProperty('children')
			const length = await onlineChildrenList.getProperty('length').then(p => p.jsonValue())

			if (length === 0) {
				return e.getProperty('innerText').then(p => p.jsonValue())
			} else {
				return Promise.all([...Array(length).keys()].map(async (i) => {
					return onlineChildrenList.getProperty(String(i)).then(p => p.asElement()).then(generateTextTree)
				}))
					.then(array => array.filter(value => value.length))
					.then(array => array.length === 1 ? array[0] : array)
			}
	}
}

global.generateTextTree = generateTextTree

async function writeMessagesToTerminal() {
	const messageListContainerElement = await page.waitForSelector(MessageListContainer.selector)
	debug.extend('page')("message list loaded")

	const messageListContainer = new MessageListContainer(messageListContainerElement)

	try {
		process.stdout.write(await messageListContainer.getTerminalString() + "\n")
	} catch (e) {
		if (e instanceof ChildMatchError) {
			await printChildMatchError(e)
			global.e = e
		} else {
			throw e
		}
	}
}

global.writeMessagesToTerminal = writeMessagesToTerminal

async function saveCookies(page, options = {}) {
	const {
		cookieFile = config.get('cookieFile'),
		useTemporaryFile = true,
		tmpSuffix = ".tmp",
	} = options

	const cookies = await page.cookies()

	await new Promise((resolve, reject) => fs.writeFile(cookieFile + (useTemporaryFile ? tmpSuffix : ""),
		JSON.stringify(cookies), err => err ? reject(err) : resolve()))

	if (useTemporaryFile) {
		// move tmp to dest
		await new Promise((resolve, reject) => fs.rename(cookieFile + tmpSuffix, cookieFile,
			err => err ? reject(err) : resolve()))
	}
}

async function main() {
	let lastNavigationDate

	puppeteer.defaultArgs({
		args: [
			'--flag-switches-begin',
			'--enable-experimental-web-platform-features',
			'--flag-switches-end',
		],
	})
	// todo deduplicate

	const browser = global.browser = config.get('externalBrowser')
		? await puppeteer.connect(config.get('externalBrowser'))
		: await puppeteer.launch({
			...config.get('chromium'),
			args: [
				...config.get('chromium.args'),
				'--flag-switches-begin',
				'--enable-experimental-web-platform-features',
				'--flag-switches-end',
			],
		})

	try {

		process.on('SIGINT', () => {
			debug("Caught SIGINT - Closing browser...")
			browser.close()
			// todo take action initiate shutdown
		})

		const page = global.page = await browser.newPage()
		page.on('console', consoleMessage => {
			debug.extend('page').extend('console').extend(consoleMessage.type())(consoleMessage.text())
			// todo log with better (maybe remote) serialization
		})
		page.on('error', error => {
			debug.extend('page')("Page crashed")
			debug(error)
			// todo take action restarting workers
		})
		page.on('framenavigated', frame => {
			debug.extend('page')("Navigated to: %s", frame.url())
			lastNavigationDate = new Date()
		})
		page.on('load', () => {
			debug.extend('page')("Page loaded")
		})
		page.on('pageerror', error => {
			debug.extend('page')("Uncaught exception occurred on the page: %o", error)
			// todo take action (like reload the page?)
		})

		await page.bringToFront()

		const cookiesLoaded = await maybeLoadCookies(page)
		if (!cookiesLoaded) {
			await login(page, {clean: true})
		} else {
			debug("Opening Facebook Messenger...")
			await page.goto("https://www.messenger.com/")
			debug("Page loaded")

			await maybeLogin(page)
		}

		if (process.stdout.isTTY) {
			debug("TTY detected - starting REPL")
			const replServer = repl.start({
				useGlobal: true,
			})

			browser.on('disconnect', () => {
				debug("Browser disconnected - Closing REPL...")
				replServer.close()
			})

			await new Promise(resolve => replServer.on('close', resolve))
		} else {
			await writeMessagesToTerminal()
		}

		debug("Saving cookies...")
		await saveCookies(page)

		debug("Closing session...")
		await page.close()
	} finally {
		await browser.close()
	}
}

async function printChildMatchError(e, debug = require('debug')('headless-messenger:tree:error')) {
	debug("ChildMatchError: %s", e.message)
	debug("Error class in reality: %s", e.constructor.name)
	if (e.namespace) debug("Occurred in namespace '%s'.", e.namespace)
	if (e instanceof UnknownChildError) {
		debug("This error has other %d errors associated with it", e.errors.length)
	}
	// noinspection JSUnresolvedVariable
	await e.parent.element.executionContext().evaluate((message, parent, child, namespace) => console.error(
		`[${namespace}]`,
		"ChildMatchError: " + message,
		parent, child
	), e.message, e.parent.element, e.child, debug.namespace)
	if (e instanceof UnknownChildError) {
		for (let i = 0; i < e.errors.length; i++) {
			await printChildMatchError(e.errors[i], debug.extend(`trace:${i}`))
		}
	}
}