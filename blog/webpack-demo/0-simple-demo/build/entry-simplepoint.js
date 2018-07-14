const fs = require('fs');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

/**
	{}   多入口
	string | Array<string>   单个入口，引入多个依赖
**/
const EntryPoint = {
	// app: [
	// 	path.resolve(ROOT_PATH, './../src/js/index.js'),
	// 	path.resolve(ROOT_PATH, './../src/js/vendor_1.js')
	// ],
	// main: [
	// 	path.resolve(ROOT_PATH, './../src/js/index.js'),
	// 	path.resolve(ROOT_PATH, './../src/js/vendor_2.js')
	// ],
	// // common: path.resolve(ROOT_PATH, './../src/js/common.js')
	// moment: 'moment'
};

console.log('ready');

// fs 获取 js
const dirs = fs.readdirSync('./src/js');

console.log(dirs);

dirs.forEach(function(item, index) {
	const strMatch = item.match(/(.+)\.js/);
	if(strMatch) {
		EntryPoint[strMatch[1]] = path.resolve(ROOT_PATH, './../src/js/' + strMatch[0]);
	}
});

console.log(EntryPoint);

module.exports = EntryPoint;
