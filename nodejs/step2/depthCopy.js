function depthCopy(obj) {
	var newObj = Object.prototype.toString.call(obj) === "[object Array]" ? [] : {};

	if(typeof obj === "object") {
		for(let key in obj ) {
			// console.log(key);
			if(typeof obj[key] === "object") {
				newObj[key] = depthCopy(obj[key]);
			}
			else {
				newObj[key] = obj[key];
			}
		}
	} 
	else {
		return obj;
	}

	return newObj;
};

let obj = {
	name: 'aaa',
	price: [1, 2, 3],
	classes: {
		a: "123class",
		b: "456English",
		c: {
			Chinese1: "678Cha1",
			Chinese2: "678Cha2",
		},
		d: {
			Sub: ["a1", "a2", "b3"],
		}
	},
	math: Math,
	reg: /s/,
};
let newObj = depthCopy(obj);

// change
obj.price[0] = 10;

newObj.math = "Wocao Mtah";
newObj.classes.d.Sub[2] = "Z0";

console.log('-----------------------------------------------------------------');
console.log(JSON.stringify(obj), JSON.stringify(newObj));
