const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')
const MessageListMessagesGroupMessageQuoteOuterContainer = require('./MessageListMessagesGroupMessageQuoteOuterContainer')

class MessageListMessagesGroupMessageQuoteLink extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageInnerContainer')
	}

	static get htmlNode() {
		return 'a'
	}

	static get additionalSelectors() {
		return '[href="#"]'
	}

	async check() {
		return await this.evaluate((element, selector) => {
			return element.querySelector(selector) !== null
		}, this.element, MessageListMessagesGroupMessageQuoteOuterContainer.selector)
	}
}

module.exports = MessageListMessagesGroupMessageQuoteLink
