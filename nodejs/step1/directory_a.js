// ��ȡ�ļ�Ŀ¼

const fs = require('fs');

fs.readdir('/', (err, files) => {
	if(err) return console.log(err);

	files.forEach(file => console.log(file));
});
