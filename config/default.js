const process = require('process')

module.exports = {
	cookieFile: (() => {
		if (process.env['HOME']) {
			return process.env['HOME'] + "/.headless-messenger-cookies.json"
		} else {
			return "cookies.json"
		}
	})(),
	login: (() => {
		if (process.env['DISPLAY']) {
			return "X"
		} else if (process.isTTY) {
			return "interactive"
		} else return false
	})(),
	chromium: {
		args: [],
	},
	externalBrowser: false,
	debug: false,
}