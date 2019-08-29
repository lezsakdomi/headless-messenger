const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListMessagesGroupMessageLinkPreviewInnerContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageLinkPreviewOuterContainer')
	}

	static get htmlNode() {
		return 'div'
	}

	static get additionalSelectors() {
		return ':only-child'
	}

	async check() {
		return true // parent already has proper check
	}
}

module.exports = MessageListMessagesGroupMessageLinkPreviewInnerContainer
