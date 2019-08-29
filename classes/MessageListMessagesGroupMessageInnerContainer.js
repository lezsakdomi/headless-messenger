const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')
const MessageListMessagesGroupMessageContentContainer = require('./MessageListMessagesGroupMessageContentContainer')

class MessageListMessagesGroupMessageInnerContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListMessagesGroupMessageOuterContainer')
	}

	static get htmlNode() {
		return 'div'
	}

	static get additionalSelectors() {
		return '[data-tooltip-content][data-hover="tooltip"]'
	}

	async getContentContainer() {
		const children = await this.getChildren()
		return children.filter(child => child instanceof MessageListMessagesGroupMessageContentContainer)[0]
		// todo maybe check
	}

	async getTimingString() {
		const dataset = await this.element.getProperty('dataset')
		const tooltipContent = await dataset.getProperty('tooltipContent')

		const tooltipContentValue = await tooltipContent.jsonValue()

		tooltipContent.dispose().then(() => dataset.dispose())

		if (tooltipContentValue) {
			return String(tooltipContentValue).replace(/\n/g, ", ")
		} else {
			return "--:--"
		}
	}

	async getTerminalString(options = {}) {
		const {
			chalk = require('chalk'),
			lineSeparator = "\n",
		} = options

		const timingString = await this.getTimingString()
		const text = await this.getContentContainer().then(container => container.getText()) // getText returns aria-label for it
		const textLines = text.split('\n')

		return chalk.dim(timingString) + " " + chalk.green(textLines[0]) +
			textLines.slice(1).map(line => lineSeparator + " ".repeat(timingString.length + 1) + chalk.green(line))
	}

	// todo check children
}

module.exports = MessageListMessagesGroupMessageInnerContainer
