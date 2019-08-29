const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')
const config = require('config')

class MessageListMessagesGroupSmallHeadStatusIcon extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupSmallHeadContainer')
	}

	static get htmlNode() {
		return 'i'
	}

	static get additionalSelectors() {
		return `[aria-roledescription="${config.get('localization.Status_icon')}"][role="img"]`
	}

	async check(namespace = undefined) {
		const children = await this.getChildren(namespace)
		return children.length === 0
	}

	async getTerminalString(options = {}) {
		const {
			chalk = require('chalk'),
		} = options

		// todo show an icon maybe
		const label = await this.element.executionContext().evaluate(e => e.getAttribute('aria-label'), this.element)
		return chalk.blue.italic(label)
	}
}

module.exports = MessageListMessagesGroupSmallHeadStatusIcon
