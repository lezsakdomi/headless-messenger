const FacebookMessengerPageElement = require('./FacebookMessengerPageElement')

class MessageListTime extends FacebookMessengerPageElement {
	static get parentClass() {
		return require('./MessageListLongerSeparator')
	}

	static get htmlNode() {
		return 'time'
	}

	async check(namespace = undefined) {
		const children = await this.getChildren(namespace)
		return children.length === 0
	}
}

module.exports = MessageListTime
