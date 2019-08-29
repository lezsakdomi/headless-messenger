const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')
const config = require('config')

class MessageListContainer extends FacebookMessengerPageElement {
	static get isPageElement() {
		return false // not a proper implementation...
	}

	static get htmlNode() {
		return "div"
	}

	static get selector() {
		return `div[aria-label="${config.get('localization.Messages')}"] > div[id]`
	}
}

module.exports = MessageListContainer
