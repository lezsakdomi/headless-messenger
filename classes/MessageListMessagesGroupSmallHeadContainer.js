const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListMessagesGroupSmallHeadContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageOuterContainer')
	}

	static get htmlNode() {
		return 'span'
	}

	async check(namespace = undefined) {
		await this.getChildren(namespace)
		return true
	}

	async getTerminalString(options = {}) {
		const {
			lineSeparator = "\n",
		} = options

		const string = await super.getTerminalString.apply(this, arguments)
		return string.split(lineSeparator).reverse().join(lineSeparator)
	}
}

module.exports = MessageListMessagesGroupSmallHeadContainer
