const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListMessagesGroupMessageQuoteVerticalLine extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageQuoteOuterContainer')
	}

	static get htmlNode() {
		return 'div'
	}

	static get additionalSelectors() {
		return ':empty'
	}
}

module.exports = MessageListMessagesGroupMessageQuoteVerticalLine
