const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

/**
	{}   多入口
	string | Array<string>   单个入口，引入多个依赖
**/
const EntryPoint = {
	app: [
		path.resolve(ROOT_PATH, './../src/js/index.js'),
		path.resolve(ROOT_PATH, './../src/js/vendor_1.js')
	],
	main: [
		path.resolve(ROOT_PATH, './../src/js/index.js'),
		path.resolve(ROOT_PATH, './../src/js/vendor_2.js')
	],
	// common: path.resolve(ROOT_PATH, './../src/js/common.js')
	moment: 'moment'
};

module.exports = EntryPoint;
