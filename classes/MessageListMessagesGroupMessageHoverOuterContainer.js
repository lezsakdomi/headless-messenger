const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListMessagesGroupMessageHoverOuterContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageInnerContainer')
	}

	static get htmlNode() {
		return 'span'
	}

	static get additionalSelectors() {
		return '[data-hover="none"]'
	}
}

module.exports = MessageListMessagesGroupMessageHoverOuterContainer
