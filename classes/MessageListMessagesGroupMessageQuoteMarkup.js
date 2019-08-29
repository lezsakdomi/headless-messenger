const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListMessagesGroupMessageQuoteMarkup extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageQuoteInnerContainer')
	}

	static get htmlNode() {
		return 'span'
	}

	async getTerminalString() {
		return await this.getText()
	}
}

module.exports = MessageListMessagesGroupMessageQuoteMarkup
