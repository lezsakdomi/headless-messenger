const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')
const MessageListMessagesContainer = require('./MessageListMessagesContainer')

class MessageListMessagesGroup extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListDataContainer')
	}

	static get htmlNode() {
		return 'div'
	}

	static get htmlClasses() {
		return ['clearfix']
	}

	async getMessagesContainer() {
		return (await this.getChildren()).filter(child => child instanceof MessageListMessagesContainer)[0]
	}

	async check(namespace = undefined) {
		const children = await this.getChildren(namespace)
		return children.filter(child => child instanceof MessageListMessagesContainer).length === 1
	}

	async getTerminalString(options = {}) {
		const {
			lineSeparator = "",
		} = options

		// todo also add big head icon
		return lineSeparator + await this.getMessagesContainer().then(container => container.getTerminalString(options))
	}
}

module.exports = MessageListMessagesGroup
