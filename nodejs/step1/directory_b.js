// É¾³ýÄ¿Â¼

const fs = require('fs');

fs.rmdir('./test/', err => {
	if(err) return console.log(err);

	console.log('Remove directory successful!');

	fs.readdir('./', (err, files) => {
		if(err) return console.log(err);

		files.forEach(file => console.log(file));
	});
});
