const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListMessagesGroupMessageReactionsOuterContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageInnerContainer')
	}

	static get htmlNode() {
		return 'div'
	}

	static get htmlClasses() {
		return ['preview'] // it's nonsense
	}

	static get additionalSelectors() {
		return ':not([aria-label]):not([tabindex])'
	}

	async getText() {
		return await this.element.executionContext().evaluate(e => e.getAttribute('aria-label'), this.element)
	}
}

module.exports = MessageListMessagesGroupMessageReactionsOuterContainer
