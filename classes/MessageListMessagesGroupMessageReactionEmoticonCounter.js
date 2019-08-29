const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListMessagesGroupMessageReactionEmoticonCounter extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageReactionsButton')
	}

	static get htmlNode() {
		return 'span'
	}

	static get additionalSelectors() {
		return ':last-child:not([style])'
	}

	async check() {
		return await this.evaluate(e => e.children.length === 0, this.element)
	}

	async getTerminalString() {
		return await this.getText()
	}
}

module.exports = MessageListMessagesGroupMessageReactionEmoticonCounter
