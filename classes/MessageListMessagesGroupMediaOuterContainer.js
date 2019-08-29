const MessageListMessagesGroupMessageOuterContainer = require('./MessageListMessagesGroupMessageOuterContainer')
const MessageListMessagesGroupMediaIntermediateContainer = require('./MessageListMessagesGroupMediaIntermediateContainer')

class MessageListMessagesGroupMediaOuterContainer extends MessageListMessagesGroupMessageOuterContainer {
	async check(namespace = undefined) {
		const children = await this.getChildren(namespace)
		return children.length >= 1 && children[0] instanceof MessageListMessagesGroupMediaIntermediateContainer
	}
}

module.exports = MessageListMessagesGroupMediaOuterContainer
