// util.inherits

var util = require('util');

function Base() {  // 定义一个基础对象 Base，有三个在构造函数内定义的属性
	this.name = 'base';
	this.base = 1991;
	this.sayHello = function() {
		console.log('Hello ' + this.name);
	};
};

Base.prototype.showName = function() {  // 和一个原型中定义的函数
	console.log(this.name);
};

function Sub() {
	this.name = 'Sub';
};

util.inherits(Sub, Base);  // 通过 util.inherits 实现继承

var objBase = new Base();
objBase.sayHello();
objBase.showName();

console.log('objBase: ', objBase);

var objSub = new Sub();
objSub.showName();
objSub.sayHello();
console.log('objSub: ', objSub);
