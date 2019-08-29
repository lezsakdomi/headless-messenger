const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListMessagesGroupMessageReactionEmoticonInnerContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageReactionEmoticonOuterContainer')
	}

	static get htmlNode() {
		return 'span'
	}

	static get additionalSelectors() {
		return ':only-child:not([class])' // todo this is just a simple plain <span>
	}
}

module.exports = MessageListMessagesGroupMessageReactionEmoticonInnerContainer
