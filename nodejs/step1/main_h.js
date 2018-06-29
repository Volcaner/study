// map  对原有数组每个元素应用某个函数，并得到新数组

var newArray = [-2, 1, 2, 3].map( value => {
	if(value > 1) {
		return Math.pow(value, 2);
	}
	else {
		return Math.pow(Math.abs(value) + 1, 2);
	}

});

console.log(newArray);
