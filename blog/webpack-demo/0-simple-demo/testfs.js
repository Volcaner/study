const fs = require('fs');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

fs.readdir('./src/js', (err, data) => {
	if(err) throw err;

	console.log('readdir: ', data);
});

// const dirs = fs.readdirSync('./src/js');
// console.log('readdirSync', dirs);

const dirs = fs.readdirSync(path.resolve(ROOT_PATH, './src/js'));
dirs.forEach(function(item, index) {
	const strMatch = item.match(/(.+)\.js/);
	if(strMatch) {
		console.log(strMatch[1]);
	}
});
