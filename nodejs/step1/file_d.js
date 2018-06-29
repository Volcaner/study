// É¾³ýÎÄ¼þ


const fs = require('fs');

console.log('Read to delete file!');
fs.unlink('input.txt', err => {
	if(err) return console.log(err);

	console.log('Delete file successful!');
})

