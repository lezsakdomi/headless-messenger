const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListEventInnerContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListEventOuterContainer')
	}

	static get htmlNode() {
		return 'span'
	}

	static get additionalSelectors() {
		return '[class]:not(:empty):nth-child(2)'
	}

	async check() {
		return this.evaluate(e => {
			return e.querySelector('span:not([class]):only-child') !== null
		}, this.element)
	}

	async getTerminalString(options = {}) {
		const {
			chalk = require('chalk')
		} = options

		return chalk.italic(await this.getText())
	}
}

module.exports = MessageListEventInnerContainer
