const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

/*
 * Little reply icon before the small text like _XY replied to YZ's message:_ above the message container
 */

class MessageListMessagesGroupMessageReplyInfoRepliedIcon extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageReplyInfoOuterContainer')
	}

	static get htmlNode() {
		return 'i'
	}

	static get htmlClasses() {
		return ['img']
	}

	static get additionalSelectors() {
		return '[alt=""]:only-child:empty:not([data-tooltip-content])'
	}
}

module.exports = MessageListMessagesGroupMessageReplyInfoRepliedIcon
