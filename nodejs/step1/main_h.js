// map  ��ԭ������ÿ��Ԫ��Ӧ��ĳ�����������õ�������

var newArray = [-2, 1, 2, 3].map( value => {
	if(value > 1) {
		return Math.pow(value, 2);
	}
	else {
		return Math.pow(Math.abs(value) + 1, 2);
	}

});

console.log(newArray);
