const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListDataContainer extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListContainer')
	}

	static get htmlNode() {
		return 'div'
	}

	static get additionalSelectors() {
		return ':not([class])'
	}
}

module.exports = MessageListDataContainer
