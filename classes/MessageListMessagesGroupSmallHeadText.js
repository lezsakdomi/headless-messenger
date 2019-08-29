const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

/*
 * Shows the number of hidden (unlisted) people seen this message
 */

class MessageListMessagesGroupSmallHeadText extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupSmallHeadContainer')
	}

	static get htmlNode() {
		return 'span'
	}

	static get additionalSelectors() {
		return ':first-child' // not important
	}

	async getTerminalString(options = {}) {
		const {
			chalk = require('chalk')
		} = options

		const title = await this.evaluate(e => e.title, this.element)
		return chalk.blue.italic("Also seen by " + title.split('\n').map(name => name.split(' ')[0]).join(", "))
		// todo or maybe just show "+n" as in `return await this.getText()`?
	}
}

module.exports = MessageListMessagesGroupSmallHeadText
