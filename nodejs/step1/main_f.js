// util.inherits

var util = require('util');

function Base() {  // ����һ���������� Base���������ڹ��캯���ڶ��������
	this.name = 'base';
	this.base = 1991;
	this.sayHello = function() {
		console.log('Hello ' + this.name);
	};
};

Base.prototype.showName = function() {  // ��һ��ԭ���ж���ĺ���
	console.log(this.name);
};

function Sub() {
	this.name = 'Sub';
};

util.inherits(Sub, Base);  // ͨ�� util.inherits ʵ�ּ̳�

var objBase = new Base();
objBase.sayHello();
objBase.showName();

console.log('objBase: ', objBase);

var objSub = new Sub();
objSub.showName();
objSub.sayHello();
console.log('objSub: ', objSub);
