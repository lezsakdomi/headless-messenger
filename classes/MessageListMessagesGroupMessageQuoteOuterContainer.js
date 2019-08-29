const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListMessagesGroupMessageQuoteOuterContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageQuoteLink')
	}

	static get htmlNode() {
		return 'blockquote'
	}
}

module.exports = MessageListMessagesGroupMessageQuoteOuterContainer
