// module.exports

var Hello = function() {
	var name;
	this.setName = function(thyName) {
		name = thyName;
	};
	this.getName = function() {
		return name;
	};
	this.sayHello = function() {
		console.log('Hello ' + name);
	};
};

module.exports = Hello;
