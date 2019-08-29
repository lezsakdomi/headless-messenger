const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListMessagesGroupMessageReactionEmoticonImage extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageReactionEmoticonInnerContainer')
	}

	static get htmlNode() {
		return 'img'
	}

	static get htmlClasses() {
		return ['img']
	}

	static get additionalSelectors() {
		return '[alt]' // I don't think it's needed
	}

	async getTerminalString() {
		return await this.evaluate(e => e.alt)
	}
}

module.exports = MessageListMessagesGroupMessageReactionEmoticonImage
