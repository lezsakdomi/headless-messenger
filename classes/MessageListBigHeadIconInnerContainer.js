const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')
const MessageListBigHeadIconThirdContainer = require('./MessageListBigHeadIconThirdContainer')

class MessageListBigHeadIconInnerContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListBigHeadOuterContainer')
	}

	static get htmlNode() {
		return 'div'
	}

	static get additionalSelectors() {
		return '[data-tooltip-content][data-tooltip-position="left"][role="button"]'
	}

	async check(namespace = undefined) {
		const children = await this.getChildren(namespace)
		return children.length === 1 && children[0] instanceof MessageListBigHeadIconThirdContainer
	}

	async getTerminalString(options = {}) {
		const {
			chalk = require('chalk')
		} = options

		// todo output image's sixel instead
		const dataset = await this.element.getProperty('dataset')
		const tooltipContent = await dataset.getProperty('tooltipContent')
		return chalk.bold(`${tooltipContent.jsonValue()}:`)
	}
}

module.exports = MessageListBigHeadIconInnerContainer
