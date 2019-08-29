const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListMessagesGroupMessageReactionsButton extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageReactionsInnerContainer')
	}

	static get htmlNode() {
		return 'div' // heh...
	}

	static get additionalSelectors() {
		return '[aria-label="[object Object]"]' + // lol
			'[tabindex="0"]' + // explain this please
			'[role="button"]' // this is why I'm saying it's a button
	}

	async getTerminalString(options = {}) {
		const {
			chalk = require('chalk'),
		} = options

		const children = await this.getChildren()
		const individualStrings = await Promise.all(children.map(child => child.getTerminalString(options)))
		return chalk.magenta(individualStrings.join(' '))
	}
}

module.exports = MessageListMessagesGroupMessageReactionsButton
