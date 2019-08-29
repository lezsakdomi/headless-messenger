const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')
const MessageListName = require('./MessageListName')
const MessageListMessagesGroupMessageReplyInfoOuterContainer = require('./MessageListMessagesGroupMessageReplyInfoOuterContainer')

class MessageListMessagesContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroup')
	}

	static get htmlNode() {
		return 'div'
	}

	async check(namespace = undefined) {
		const children = await this.getChildren(namespace)
		return children.length > 0 && (
			children[0] instanceof MessageListName ||
			await children[0].getChildren()
				.then(subChildren => subChildren[0] instanceof MessageListMessagesGroupMessageReplyInfoOuterContainer)
		)
	}
}

module.exports = MessageListMessagesContainer
