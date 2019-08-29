const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')
const MessageListTime = require('./MessageListTime')

class MessageListLongerSeparator extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListContainer')
	}

	static get htmlNode() {
		return 'h4'
	}

	async check(namespace = undefined) {
		const children = await this.getChildren(namespace)
		return children.length === 1 && children[0] instanceof MessageListTime
	}

	async getTerminalString(options = {}) {
		const {
			lineSeparator = "",
			chalk = require('chalk'),
		} = options

		const child = await (await this.getChildren())[0]
		const childString = await child.getText()

		return `${lineSeparator}====== ${chalk.bold(childString)} ======`
	}
}

module.exports = MessageListLongerSeparator
