// ´´½¨Ò»¸ö³¤¶ÈÎª 10 ¡¢ÇÒÓÃ 0 Ìî³äµÄ Buffer.
const buf1 = Buffer.alloc(10);

// ´´½¨Ò»¸ö³¤¶ÈÎª 10 ¡¢ÇÒÓÃ 0x1Ìî³äµÄ Buffer.
const buf2 = Buffer.alloc(10, 1);

// ´´½¨Ò»¸ö³¤¶ÈÎª 10 ¡¢ÇÒÎ´³õÊ¼»¯µÄ Buffer.
// Õâ¸ö·½·¨±Èµ÷ÓÃ Buffer.alloc() ¸ü¿ì¡.
// µ«·µ»ØµÄ Buffer ÊµÀý¿ÉÄÜ°üº¬¾ÉÊý¾Ý
// Òò´ËÐèÒªÊ¹ÓÃ fill() »ò write() ÖØÐ´¡£
const buf3 = Buffer.allocUnsafe(10);

// ´´½¨Ò»¸ö°üº¬ [0x1, 0x2, 0x3] µÄ Buffer.
const buf4 = Buffer.from([1, 2, 3]);

// ´´½¨Ò»¸ö°üº¬ UTF-8 ×Ö½Ú [0x74, 0xc3, 0xa9, 0x73, 0x74] µÄ Buffer.
const buf5 = Buffer.from('test');

// ´´½¨Ò»¸ö°üº¬ Latin-1 ×Ö½Ú [0x74, 0xe9, 0x73, 0x74] µÄ Buffer.
const buf6 = Buffer('test', 'latin1');
console.log(buf6);

// buf.write()
const buf7 = Buffer.alloc(5);
const len = buf7.write('www.runoob.com');
console.log('Ð´Èë×Ö½ÚÊý£º ' + len);
console.log(buf7.toString('utf-8'));

const json = JSON.stringify(buf7);
console.log(json);

const copy = JSON.parse(json, (key, value) => {
	return value && value.type === 'Buffer' ?
		Buffer.from(value.data) : 
		value;
});
console.log(copy);

var buffer1 = Buffer.from('²ËÄñ½Ì³Ì');
var buffer2 = Buffer.from('www.runoob.com');
var buffer3 = Buffer.concat([buffer1, buffer2], 10);
console.log('buffer3 ÄÚÈÝ£º ' + buffer3.toString());

var buffer4 = Buffer.from('qABC');
var buffer5 = Buffer.from('ABCD');
var result = buffer4.compare(buffer5);

if(result < 0) {
	console.log(buffer4 + ' ÔÚ ' + buffer5 + ' Ö®Ç°before ');
}else if(result == 0) {
	console.log(buffer4 + ' ÔÚ ' + buffer5 + ' ÏàÍ¬same ');
}else if(result > 0) {
	console.log(buffer4 + ' ÔÚ ' + buffer5 + ' Ö®ºóend ');
}else {
	console.log('NO');
}

var buf10 = Buffer.from('abcdefghijkl');
var buf11 = Buffer.from('ROUOOB');

// ½« bu11 ²åÈëµ½ buf10 Ö¸¶¨Î»ÖÃÉÏ
buf11.copy(buf10, 2);

console.log(buf10.toString());
