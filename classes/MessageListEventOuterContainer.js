const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')
const MessageListEventInnerContainerPre = require('./MessageListEventInnerContainerPre')
const MessageListEventInnerContainer = require('./MessageListEventInnerContainer')
const MessageListEventInnerContainerPost = require('./MessageListEventInnerContainerPost')

class MessageListEventOuterContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListDataContainer')
	}

	static get htmlNode() {
		return 'div'
	}

	static get additionalSelectors() {
		return '[class]' // poor but better than nothing
	}

	async check(ns = undefined) {
		const children = await this.getChildren(ns)
		return children.length === 3 &&
			children[0] instanceof MessageListEventInnerContainerPre &&
			children[1] instanceof MessageListEventInnerContainer &&
			children[2] instanceof MessageListEventInnerContainerPost
	}
}

module.exports = MessageListEventOuterContainer
