const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListMessagesGroupMessageContentContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageInnerContainer')
	}

	static get htmlNode() {
		return 'div'
	}

	static get additionalSelectors() {
		return '[aria-label][tabindex="0"]'
	}

	async getText() {
		return await this.evaluate(e => {
			e.setAttribute('headless-messenger-aria-label-hist', e.ariaLabel)
			return e.ariaLabel
		}, this.element)
	}
}

module.exports = MessageListMessagesGroupMessageContentContainer
