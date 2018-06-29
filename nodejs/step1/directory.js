// ´´½¨ Ä¿Â¼

const fs = require('fs');

fs.mkdir('./test/', err => {
	if(err) return console.log(err);

	console.log('Create directory successful!');
})
