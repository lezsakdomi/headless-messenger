const MessageListMessagesGroupMessageOuterContainer = require('./MessageListMessagesGroupMessageOuterContainer')

class MessageListMessagesGroupMediaIntermediateContainer extends MessageListMessagesGroupMessageOuterContainer {
	static get parentClass() {
		return require('./MessageListMessagesGroupMediaOuterContainer')
	}

	static get htmlClasses() {
		return []
	}

	async getTerminalString(options = {}) {
		const {
			chalk = require('chalk'),
		} = options

		const textContent = await this.evaluate(e => e.textContent, this.element)

		return chalk.cyan.italic(textContent || "(media)")
	}
}

module.exports = MessageListMessagesGroupMediaIntermediateContainer
