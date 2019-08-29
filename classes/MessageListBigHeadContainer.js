const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')
const MessageListBigHeadOuterContainer = require('./MessageListBigHeadOuterContainer')

class MessageListBigHeadContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroup')
	}

	static get htmlNode() {
		return 'div'
	}

	async check(namespace = undefined) {
		const children = await this.getChildren(namespace)
		return children.length === 1 && children[0] instanceof MessageListBigHeadOuterContainer
	}
}

module.exports = MessageListBigHeadContainer
