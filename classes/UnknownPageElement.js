const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class UnknownPageElement extends FacebookMessengerPageElement {
	static get isPageElement() {
		return false
	}

	async getChildren() {
		return []
	}

	async getTerminalString(options = {}) {
		const text = await this.getText()
		return text.replace(/\s+/g, " ")
	}
}

module.exports = UnknownPageElement

