const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListMessagesGroupMessageLinkPreviewAnchor extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageLinkPreviewInnerContainer')
	}

	static get htmlNode() {
		return 'a'
	}

	static get additionalSelectors() {
		return '[target="_blank"][href][rel="nofollow noopener"][data-lynx-mode="hover"]:only-child:not(empty)'
	}

	async check() {
		return true // parent already has proper check
	}

	async getTerminalString(options = {}) {
		const {
			chalk = require('chalk')
		} = options

		return chalk.italic(await this.getText())

		// todo properly parse children
	}
}

module.exports = MessageListMessagesGroupMessageLinkPreviewAnchor
