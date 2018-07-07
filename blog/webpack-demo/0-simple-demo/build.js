const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

console.log(__dirname);

console.log(ROOT_PATH);

console.log(__dirname + '/src');

console.log(path.resolve(__dirname, './src'));

console.log(path.resolve(ROOT_PATH, './src'));

console.log(path.resolve(ROOT_PATH, 'src'));

console.log(path.resolve(ROOT_PATH, '/src/'));
