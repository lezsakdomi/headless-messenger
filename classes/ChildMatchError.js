class ChildMatchError extends Error {
	constructor(e, parent, message, namespace) {
		// noinspection JSCheckFunctionSignatures
		super(message || "Failed to match a child of a " + parent.constructor.name)
		this._child = e
		this._parent = parent
		this._namespace = namespace
	}

	get child() {
		return this._child
	}

	get parent() {
		return this._parent
	}

	get namespace() {
		return this._namespace
	}
}

module.exports = ChildMatchError
