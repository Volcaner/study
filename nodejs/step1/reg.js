let str = "aaa[bbb[ccc,ddd[eee,fff,yyy[eeeu,yyyuy]]],ggg[hhh,iii,qqq],ooo[sss]]";
let newStr = str;
let arr = [];

// const reg = /(^[^\[\],]+\[(.+)\]$)/g;
const pat1 = /[^\[\],]+\[[^\[\]]+\]/g;
const pat2 = /\[/g;
const pat3 = /_([0-9]+)_/g;

function reStr(s) {
	var minMatches = s.match(pat1);

	return newStr.replace(pat1, strMatch => {
		arr.push(strMatch);
		
		return "_" + (arr.length-1).toString() + "_";
	});
};

while(newStr.match(pat2).length>1) {
	newStr = reStr(newStr);
}

arr = arr.concat(newStr.match(pat1));

arr.forEach(function(item, index) {
	arr[index] = item.replace(pat3, function() {
		console.log(arguments);
		return arr[arguments[1]];
	});
});


// console.log(newStr);
console.log(arr);





// let kkk = reg.exec(str);
// let ddd = str.match(pat1);
// let getStr = function(s) {
// 	if(!s.test(reg)) return false;
// };
// console.log(kkk);
// console.log(ddd);
