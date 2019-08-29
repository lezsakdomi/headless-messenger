const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListEventInnerContainerPre extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListEventOuterContainer')
	}

	static get htmlNode() {
		return 'i'
	}

	static get additionalSelectors() {
		return ':empty:first-child'
	}
}

module.exports = MessageListEventInnerContainerPre
