const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')
const MessageListBigHeadIconImage = require('./MessageListBigHeadIconImage')

class MessageListBigHeadIconThirdContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListBigHeadIconInnerContainer')
	}

	static get htmlNode() {
		return 'div'
	}

	async check(namespace = undefined) {
		const children = await this.getChildren(namespace)
		return children.length === 1 && children[0] instanceof MessageListBigHeadIconImage
	}
}

module.exports = MessageListBigHeadIconThirdContainer
