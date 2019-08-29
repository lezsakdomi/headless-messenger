const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListEventInnerContainerPost extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListEventOuterContainer')
	}

	static get htmlNode() {
		return 'span'
	}

	static get additionalSelectors() {
		return ':empty:nth-child(3):last-child'
	}
}

module.exports = MessageListEventInnerContainerPost
