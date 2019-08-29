const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')
const MessageListBigHeadIconInnerContainer = require('./MessageListBigHeadIconInnerContainer')

class MessageListBigHeadOuterContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListBigHeadContainer')
	}

	static get htmlNode() {
		return 'div'
	}

	static get htmlClasses() {
		return ['uiPopover']
	}

	async check(namespace = undefined) {
		const children = await this.getChildren(namespace)
		return children.length === 1 && children[0] instanceof MessageListBigHeadIconInnerContainer
	}
}

module.exports = MessageListBigHeadOuterContainer
