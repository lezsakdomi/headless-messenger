const fs = require('fs')

const classes = fs.readdirSync(__dirname)
	.filter(file => file !== 'index.js')
	.filter(RegExp.prototype.exec.bind(/^[A-Z]\w*.js$/))
	.map(file => `./${file}`)
	.map(require)

for (let Class of classes) {
	module.exports[Class.name] = Class
}