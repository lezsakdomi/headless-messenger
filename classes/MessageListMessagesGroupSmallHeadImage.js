const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')
const config = require('config')

class MessageListMessagesGroupSmallHeadImage extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupSmallHeadContainer')
	}

	static get htmlNode() {
		return 'img'
	}

	static get htmlClasses() {
		return ['img']
	}

	static get additionalSelectors() {
		return `[alt*="${config.get('localization.seen')}"][title*="${config.get('localization.seen')}"]`
	}

	async check(namespace = undefined) {
		const children = await this.getChildren(namespace)
		return children.length === 0
	}

	async getTerminalString(options = {}) {
		const {
			chalk = require('chalk'),
		} = options

		// todo show image
		const alt = await this.element.getProperty('alt').then(p => p.jsonValue())
		return chalk.blue.italic(alt)
	}
}

module.exports = MessageListMessagesGroupSmallHeadImage
