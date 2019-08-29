const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListName extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesContainer')
	}

	static get htmlNode() {
		return 'h5'
	}

	async getTerminalString(options = {}) {
		const {
			chalk = require('chalk'),
		} = options

		return chalk.bold(`${await this.getText()}:`)
	}
}

module.exports = MessageListName
