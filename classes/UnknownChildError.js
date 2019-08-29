const ChildMatchError = require('./ChildMatchError')

class UnknownChildError extends ChildMatchError {
	constructor(e, parent, message = undefined, errors = [], namespace) {
		super(e, parent, message || "Unknown child of a " + parent.constructor.name, namespace)
		this.errors = errors
	}
}

module.exports = UnknownChildError
