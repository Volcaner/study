// util.inspect

var util = require('util');

function Person() {
	this.name = 'Byvoid';
	this.toString = function() {
		return this.name;
	};
};

var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true));


// util.isArray
console.log(util.isArray([]));

console.log(util.isArray(new Array));

console.log(util.isArray({}));


// util.isRegExp
console.log(util.isRegExp(/some regexp/));

console.log(util.isRegExp(new RegExp('another regexp')));

console.log(util.isRegExp({}));


// util.isDate
console.log(util.isDate(new Date()));

console.log(util.isDate(Date()));  // false (without 'new' returns a String)

console.log(util.isDate({}));


// util.isError
console.log(util.isError(new Error()));

console.log(util.isError(new TypeError()));

console.log(util.isError({neme: 'Error', message: 'an Error occurred'}));
