const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')
const MessageListMessagesGroupMessageLinkPreviewAnchor = require('./MessageListMessagesGroupMessageLinkPreviewAnchor')

class MessageListMessagesGroupMessageLinkPreviewOuterContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageOuterContainer')
	}

	static get htmlNode() {
		return 'div'
	}

	async check() {
		return await this.evaluate((e, selector) => e.querySelector(selector) !== null,
			this.element, MessageListMessagesGroupMessageLinkPreviewAnchor.selector)
	}
}

module.exports = MessageListMessagesGroupMessageLinkPreviewOuterContainer
