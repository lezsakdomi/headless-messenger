const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')
const MessageListMessagesGroupMessageReplyInfoInnerContainer = require('./MessageListMessagesGroupMessageReplyInfoInnerContainer')

/*
 * Small text like _XY replied to YZ's message:_ above the message container
 *
 * From DOM perspective seems like a media intermediate container, but it isn't, because it is not an only child.
 * Maybe these should be merged instead? (results in -maybe- faster parsing)
 * Unfortunately this doesn't have classes, etc.
 * (note: It seems like css classes don't match but should they?)
 */

class MessageListMessagesGroupMessageReplyInfoOuterContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageOuterContainer')
	}

	static get htmlNode() {
		return 'div'
	}

	static get additionalSelectors() {
		return ":first-child:not([data-tooltip-content])"
	}

	async check(namespace = undefined) {
		const children = await this.getChildren(namespace)
		return children.length === 1 && children[0] instanceof MessageListMessagesGroupMessageReplyInfoInnerContainer
	}
}

module.exports = MessageListMessagesGroupMessageReplyInfoOuterContainer
