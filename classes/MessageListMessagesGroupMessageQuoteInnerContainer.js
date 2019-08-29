const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListMessagesGroupMessageQuoteInnerContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageQuoteOuterContainer')
	}

	static get htmlNode() {
		return 'div'
	}

	static get additionalSelectors() {
		return ':not(:empty)'
	}
}

module.exports = MessageListMessagesGroupMessageQuoteInnerContainer
