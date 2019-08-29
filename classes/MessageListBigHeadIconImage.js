const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListBigHeadIconImage extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListBigHeadIconThirdContainer')
	}

	static get htmlNode() {
		return 'img'
	}

	// todo output sixel
}

module.exports = MessageListBigHeadIconImage
