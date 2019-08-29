const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListMessagesGroupMessageReactionsInnerContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageReactionsOuterContainer')
	}

	static get htmlNode() {
		return 'div'
	}

	static get additionalSelectors() {
		return '[data-tooltip-content][data-hover="tooltip"][id]'
	}
}

module.exports = MessageListMessagesGroupMessageReactionsInnerContainer