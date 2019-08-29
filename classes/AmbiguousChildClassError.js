const ChildMatchError = require('./ChildMatchError')

class AmbiguousChildClassError extends ChildMatchError {
	constructor(e, parent, message, reservedArgument, namespace) {
		super(e, parent, message || "Ambiguous class for a child of a " + parent.constructor.name, namespace)
	}
}

module.exports = AmbiguousChildClassError
