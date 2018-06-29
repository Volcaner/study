function compareVersion(v1, v2) {
	const v1Arr = v1.split('.');
	const v2Arr = v2.split('.');

	// minLength
	let minLen = Math.min(v1Arr.length, v2Arr.length);
	
	// 1. compare
	for(let i = 0; i < minLen; i++) {
		if(v1Arr[i] > v2Arr[i]) {
			return v1;
		}
		else if(v1Arr[i] < v2Arr[i]) {
			return v2;
		}
	}

	// 2. if the first step is same
	if(v1Arr.length === v2Arr.length || v1Arr.length > v2Arr.length) {
		return v1;
	}
	else {
		return v2;	
	}
}

console.log(compareVersion('1.2.3a', '1.2.4b'));
