const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')
const MessageListMessagesGroupMessageReplyInfoRepliedIcon = require('./MessageListMessagesGroupMessageReplyInfoRepliedIcon')

/*
 * Small text like _XY replied to YZ's message:_ above the message container
 */

class MessageListMessagesGroupMessageReplyInfoInnerContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageReplyInfoOuterContainer')
	}

	static get htmlNode() {
		return 'div'
	}

	static get htmlClasses() {
		return ['direction_ltr']
	}

	static get additionalSelectors() {
		return ":not([data-tooltip-content])"
	}

	async check() {
		return await this.evaluate((e, selector) => {
			return e.querySelector(selector) !== null
		}, this.element, MessageListMessagesGroupMessageReplyInfoRepliedIcon.selector)
	}

	async getTerminalString(options = {}) {
		const {
			chalk = require('chalk')
		} = options

		return chalk.bold(await this.getText())
	}
}

module.exports = MessageListMessagesGroupMessageReplyInfoInnerContainer
