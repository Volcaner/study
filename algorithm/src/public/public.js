// 获取地址参数
var getHrefParam = function(name) {
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null) {
		return unescape(r[2]);
	}else {
		return null;
	};
};

// 判断字符串非空
var isNorU = function(str){
	if(str == undefined || str == null || str == ""){
		return true;
	}else{
		return false;
	}
};

// 日期
var getDate = function (format, timestamp) {
	/**
	* 和PHP一样的时间戳格式化函数
	* @param {string} format 格式
	* @param {int} timestamp 要格式化的时间 默认为当前时间
	* @return {string}   格式化的时间字符串
	*/
    var a, jsdate = ((timestamp) ? new Date(timestamp * 1000) : new Date());
    var pad = function(n, c) {
        if ((n = n + "").length < c) {
            return new Array(++c - n.length).join("0") + n;
        } else {
            return n;
        }
    };
    var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var txt_ordin = {
        1 : "st",
        2 : "nd",
        3 : "rd",
        21 : "st",
        22 : "nd",
        23 : "rd",
        31 : "st"
    };
    var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var f = {
        // Day
        d: function() {
            return pad(f.j(), 2)
        },
        D: function() {
            return f.l().substr(0, 3)
        },
        j: function() {
            return jsdate.getDate()
        },
        l: function() {
            return txt_weekdays[f.w()]
        },
        N: function() {
            return f.w() + 1
        },
        S: function() {
            return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'
        },
        w: function() {
            return jsdate.getDay()
        },
        z: function() {
            return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0
        },

        // Week
        W: function() {
            var a = f.z(),
            b = 364 + f.L() - a;
            var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
            if (b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
                return 1;
            } else {
                if (a <= 2 && nd >= 4 && a >= (6 - nd)) {
                    nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
                    return date("W", Math.round(nd2.getTime() / 1000));
                } else {
                    return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
                }
            }
        },

        // Month
        F: function() {
            return txt_months[f.n()]
        },
        m: function() {
            return pad(f.n(), 2)
        },
        M: function() {
            return f.F().substr(0, 3)
        },
        n: function() {
            return jsdate.getMonth() + 1
        },
        t: function() {
            var n;
            if ((n = jsdate.getMonth() + 1) == 2) {
                return 28 + f.L();
            } else {
                if (n & 1 && n < 8 || !(n & 1) && n > 7) {
                    return 31;
                } else {
                    return 30;
                }
            }
        },

        // Year
        L: function() {
            var y = f.Y();
            return (! (y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0
        },
        //o not supported yet
        Y: function() {
            return jsdate.getFullYear()
        },
        y: function() {
            return (jsdate.getFullYear() + "").slice(2)
        },

        // Time
        a: function() {
            return jsdate.getHours() > 11 ? "pm": "am"
        },
        A: function() {
            return f.a().toUpperCase()
        },
        B: function() {
            // peter paul koch:
            var off = (jsdate.getTimezoneOffset() + 60) * 60;
            var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
            var beat = Math.floor(theSeconds / 86.4);
            if (beat > 1000) beat -= 1000;
            if (beat < 0) beat += 1000;
            if ((String(beat)).length == 1) beat = "00" + beat;
            if ((String(beat)).length == 2) beat = "0" + beat;
            return beat;
        },
        g: function() {
            return jsdate.getHours() % 12 || 12
        },
        G: function() {
            return jsdate.getHours()
        },
        h: function() {
            return pad(f.g(), 2)
        },
        H: function() {
            return pad(jsdate.getHours(), 2)
        },
        i: function() {
            return pad(jsdate.getMinutes(), 2)
        },
        s: function() {
            return pad(jsdate.getSeconds(), 2)
        },
        //u not supported yet
        // Timezone
        //e not supported yet
        //I not supported yet
        O: function() {
            var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
            if (jsdate.getTimezoneOffset() > 0) t = "-" + t;
            else t = "+" + t;
            return t;
        },
        P: function() {
            var O = f.O();
            return (O.substr(0, 3) + ":" + O.substr(3, 2))
        },
        //T not supported yet
        //Z not supported yet
        // Full Date/Time
        c: function() {
            return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()
        },
        //r not supported yet
        U: function() {
            return Math.round(jsdate.getTime() / 1000)
        }
    };

    var forReg = /([\])?([a-zA-Z])/g;
    return format.replace(forReg, function(t, s) {
        if( t!=s ){
		    // escaped
		    ret = s;
		} else if (f[s]) {
            // a date function exists
            ret = f[s]();
        } else {
            // nothing special
            ret = s;
        }
        return ret;
    });
};

// scroll
var htmlScrollOk = function() {
	var htmlTop = parseFloat($('html').css("top"));
	$('html').css({overflow: "auto", position: "absolute", top: "0px"});
	$('body').scrollTop(Math.abs(htmlTop));
};
var htmlScrollPok = function() {
	var scrollTop = document.body.scrollTop;
	$('html').css({overflow: "hidden", position: "fixed", top: -scrollTop+"px"});
};

// 对象及其一级子元素判空
var bIsObjUorN = function(obj) {
	if(obj) {
		var k = 0;
		for(var key in obj) {
			k++;
			if(_isNorU(obj[key])) {  // 对象子元素判空
				return false;
			}
		}
		if(k <= 0) {  // 对象判空
			return false;
		}
	}
	else {
		return false;
	}

	return true;
};

// uuid
var uuid = function(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
};

// toArray
var toArray = function(s){  // Array.prototype.slice.call(arguments)能将具有length属性的对象转成数组，除了IE下的节点集合（因为ie下的dom对象是以com对象的形式实现的，js对象与com对象不能进行转换）
    try{
        return Array.prototype.slice.call(s);
    } catch(e){
        var arr = [];
        for(var i = 0,len = s.length; i < len; i++){
            // arr.push(s[i]);
            arr[i] = s[i];  // 据说这样比push快
        }
        return arr;
    }
}

// 封装自己的 cookie
var cookie = {
    //根据key值获取对应的cookie
    get:function(key){
        //获取cookie
        var data = document.cookie;
        //获取key第一次出现的位置    pwd=
        var startIndex = data.indexOf(key+'=');
        //  name=123;pwd=abc
        //如果开始索引值大于0表示有cookie
        if(startIndex>-1) {
            //key的起始位置等于出现的位置加key的长度+1
            startIndex = startIndex+key.length+1;

            //结束位置等于从key开始的位置之后第一次;号所出现的位置
            var endIndex = data.indexOf(';',startIndex);

            //如果未找到结尾位置则结尾位置等于cookie长度，之后的内容全部获取
            endIndex = endIndex<0 ? data.length:endIndex;

            return decodeURIComponent(data.substring(startIndex,endIndex));
        }else {
            return '';
        }
    },
    set:function(key,value,time){
        //默认保存时间
        var time = time;
        //获取当前时间
        var cur = new Date();
        var undefined;

        //设置指定时间
        cur.setTime(cur.getTime()+time*24*3600*1000);

        //创建cookie  并且设置生存周期为GMT时间
        document.cookie = key+'='+encodeURIComponent(value)+';expires='+(time===undefined?'':cur.toGMTString());
    },

    del:function(key){
        //获取cookie
        var data = this.get(key);

        //如果获取到cookie则重新设置cookie的生存周期为过去时间
        if(data!==false){
            this.set(key,data,-1);
        }
    }
};

module.exports = {
    toArray,
    getHrefParam,
    isNorU,
    getDate,
    htmlScrollOk,
    htmlScrollPok,
    bIsObjUorN,
    uuid,
};
