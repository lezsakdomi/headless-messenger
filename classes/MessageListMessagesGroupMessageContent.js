const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListMessagesGroupMessageContent extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageContentContainer')
	}

	static get htmlNode() {
		return 'span'
	}
}

module.exports = MessageListMessagesGroupMessageContent
