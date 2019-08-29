const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListMessagesGroupMessageReactionEmoticonOuterContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageReactionsButton')
	}

	static get htmlNode() {
		return 'span'
	}

	static get additionalSelectors() {
		return "[style]" // unstable
	}

	async check(ns = undefined) {
		return await this.evaluate(e => e.innerText === "", this.element)
		// the above is far enough

		const children = await this.getChildren(ns)
		return children.length === 0 && children[0] instanceof MessageListMessagesGroupMessageReactionEmoticonInnerContainer
	}
}

module.exports = MessageListMessagesGroupMessageReactionEmoticonOuterContainer
