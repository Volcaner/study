function imgMark(file, callback) {
	var icon = new Image();
	icon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAABZCAMAAAAglgsKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFAP//////////xwXptQAAAAN0Uk5T//8A18oNQQAAAyhJREFUeNrsWdtu6zAMM/X/H30OusTRhbIdx04ftgwYim4rJZmiaK3Id5/yh7/7Ab6Kj1+PL78y/xMWn+d1fHwZX517K4K38v8Cvs49DWBn/ho3C6DsLjvaDCj7mv1Cl5wCZT/rmwwoe8uvq0AD2INvUv+fe67DZQPrGe1qRPv534TH/v436PUYTEcsxI+n+kM7qew7vgltwbImW/3BGnM//88uCxQwIrRRf87Plyh8NRTVFj9fa/ERhdeOIBuD/t2n+MgKYDWIzKQl+Bc2GAUg0nRfC/L/ZCrCKNg1P3P4PlPqs3XpV/tPF0CmREb/luNrUtGLxknCLfhgshZbQLlQ3zZ4wD/bR4wBvvA+gPrH8/lrmWH47kc++Xn8QKtQiM7dU4+MMgcvuq+QBUDhK/Y8vhd9cJpl2R/YnxflUfvZoyckC6yHWL8wrX9BBODrH9O/fushPi0AeuU/Kv94/mloo/8uAj8PYF480x/Dw2D+SeVPMVzhfy0DMIY/57/5BypPafI/1S0oMpzsj+ED3LSJNrVotLsaQOTu1cFHfJztie8RqWuvoModeMI1VV3XfQLTbJBb+w/v2BGL7eaQ91/62nHb/xHWubc0+y+n4yt/aO1d/5M1kWOhTt1X/9L5mf0zDznrRKlLjsqG6lGm999IZ3/0/8SRH1MGGM+f7skQL1DtQznXPdKpvMNPGg3eaxKXTcU2zuMmftLp4R0mhPC2Gq2NK8NPtIZEFItDVz8yVv0Dn9ecn4mVAPBlEIawTf4CSeQrrvR4iyhfNwxf8S/yQn1YEkDLlt20EoUOnAYlkbvq3l37Zv/FlxRfcw53jr7Xf2GTikwAlMGSyfr7Weu6wgQVRwXGBa9Rf7Y9YVwgG7Cp3C3/LqcIP+/RxMck9fn8u6QAfouW7LLY1e8Rfqx5mEMSB947+ING4SF+GsDYfwCe4NMCOAONjflnB7Aq4TF8VoCG41mJzwLomOC1+GKvGYLOxWQPfsb1teXn/j8Dwav4yf1rJfrM/XMpfA/fX78Xozfuf0B7AbEbX95Ab++f9qP39m+bwYf2j5Bd2NP7zz/8Zc8/AQYAWf1QmJJoBAYAAAAASUVORK5CYII=';

	var imgReader = new FileReader();
	imgReader.readAsDataURL(file);
	var name = file.name.split('.')[0];

	imgReader.onload = function() {
		var im = new Image();
		im.src = imgReader.result;
		im.onload = function() {
			// image mark
			var can1 = document.createElement('canvas');
			var cxt1 = can1.getContext('2d');
			can1.width = im.width;
			can1.height = im.height;
			cxt1.drawImage(im, 0, 0, can1.width, can1.height);
			cxt1.save();
			var pt = cxt1.createPattern(icon, 'repeat');
			cxt1.fillStyle = pt;
			cxt1.globalAlpha = 0.2;
			cxt1.fillRect(0, 0, can1.width, can1.height);
			cxt1.restore();
			var baseUrl = can1.toDataURL('image/jpeg', 0.5);

			// base64 to file
			var arr = baseUrl.split(',');
			var type = arr[0].match(/:(.*?);/)[1];
			var bstr = window.atob(arr[1]);   
			var fileExt = type.split('/')[1];
			var n = bstr.length;
			var u8arr = new Uint8Array(n);
			while(n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			var fileResult = new File([u8arr],name+"."+fileExt,{type:type});

			callback(fileResult);
			// return fileResult;
		};
	};
};

module.exports = {imgMark};