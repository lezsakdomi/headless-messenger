const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListMessagesGroupMessageHoverInnerContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageHoverOuterContainer')
	}

	static get htmlNode() {
		return 'span'
	}

	async check(namespace = undefined) {
		const children = await this.getChildren(namespace)
		return children.length === 0
	}
}

module.exports = MessageListMessagesGroupMessageHoverInnerContainer
