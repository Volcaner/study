var stripscript = function(s) { 
			var pattern = new RegExp("[`~%!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]") 
			var rs = ""; 
			for (var i = 0; i < s.length; i++) { 
				rs = rs+s.substr(i, 1).replace(pattern, ''); 
			} 
			return rs;
		};
var max_arrleft = [];
var max_arrright = [];
var resultobjs = {};
resultobjs.prefixes = [];
resultobjs.objects = [];
var treeone = true;
function aac(json, b) {
    json = o;
    asdf(json, b);
}

function asdf(j, b) {
    if (b.length > 0) {
        for (var v = 0; v < b.length; v++) {
            var n = 0;
            for (key in j) {
                if (key == b[v]) {
                    n++;
                    j = j[b[v]];

                    var newarr = b.slice((v + 1));
                    asdf(j, newarr);
                }
            }
            if (n == 0) {

                j[b[v]] = {};

                break;
            }
        }
    }
};

window.bb = {
    oss_params: {
        'prefix': '',
        'delimiter': '/',
        'max-keys': 1000,
        'marker': ''
    },
    //获取目录
    getFileList: function(dir, obj, getstr) {
        if (dir) {
            var me = this;
            me.oss_params.prefix = dir;
            client.list(me.oss_params).then(function(result) {
                max_arrleft.length = 0;
                max_arrright.length = 0;
                var length = 0;
                var len = 0;
                var last_name = '';
                var state = false;
                if (result.prefixes) {
                    max_arrleft.push(result.prefixes);
                    len = result.prefixes.length;
                    length += result.prefixes.length;
                    for (var i = 0; i < result.prefixes.length; i++)
                        if (last_name < result.prefixes[i])
                            last_name = result.prefixes[i];
                    var l = [];
                    for (var a = 0; a < max_arrleft.length; a++) {
                        l = l.concat(max_arrleft[a]);
                    }
                    if (l) {
                        for (var b = 0; b < l.length; b++) {
                            resultobjs.prefixes.push(l[b]);
                        }
                    }
                    //resultobjs.prefixes=l;
                }

                if (result.objects) {
                    for (var i = 0; i < result.objects.length; i++) {
                        if (last_name < result.objects[i].name) {
                            last_name = result.objects[i].name;
                        }
                    }

                    max_arrright.push(result.objects);
                    length += result.objects.length;
                    var r = [];
                    for (var b = 0; b < max_arrright.length; b++) {
                        r = r.concat(max_arrright[b]);
                    }
                    if (r) {
                        for (var t = 0; t < r.length; t++) {
                            resultobjs.objects.push(r[t])
                        }
                    }
                    //resultobjs.objects=r;
                }

                if (length == me.oss_params['max-keys']) {
                    //alert(1);
                    me.oss_params.marker = last_name;
                    // alert(dir)
                    //me.getFileList(dir)
                    me.getFileList(dir, o, dir)
                } else {
                    me.oss_params.marker = "";
                    state = true;
                }
                if (state) {
                    if (treeone) {
                        treeone = false;
                        getresult2(resultobjs);
                    }
                    ;var newobj = resultobjs.prefixes;
                    if (result.prefixes) {
                        var arrjson = [];
                        for (var g = 0; g < newobj.length; g++) {
                            if ((newobj[g]).indexOf(dir) != -1) {
                                var str = getstr + ";" + newobj[g];
                                arrjson.push(str);
                            }
                        }
                        ;if (getstr == dir) {
                            obj[dir] = {};
                        } else {
                            //  if(getstr){
                            var splitStr = getstr.split(";");
                            // if(splitStr){
                            aac(jsoncopy, splitStr)
                            //  }
                            //  }
                        }
                        gettree(obj, arrjson);
                    } else {
                        // if(getstr){
                        var splitStr = getstr.split(";");
                        // if(splitStr){
                        aac(jsoncopy, splitStr)
                        //  }
                        // }

                    }
                    (resultobjs.prefixes).length = 0;
                    (resultobjs.objects).length = 0;
                }
            }).catch(function(err) {
              reInitOss();
            });

        }
    },

    //获取目录下的图片
    imgarr:[],
    getFileListimg: function(file_list_params) {
        if (file_list_params.prefix) {
            var me = this;
            client.list(file_list_params).then(function(result) {
                getresultimg(result);
                if (result.isTruncated) {
                    file_list_params.marker = result.nextMarker;
                    me.getFileListimg(file_list_params);
                }
            }).catch(function(err) {
              reInitOss();
            });
        }
    },
    getFileListimg2: function(dir) {

        if (dir) {
            var me = this;
            me.oss_params.prefix = dir;
            client.list(me.oss_params).then(function(result) {
                max_arrleft.length = 0;
                max_arrright.length = 0;
                var length = 0;
                var len = 0;
                var last_name = '';
                var state = false;
                if (result.prefixes) {
                    max_arrleft.push(result.prefixes);
                    len = result.prefixes.length;
                    length += result.prefixes.length;
                    for (var i = 0; i < result.prefixes.length; i++)
                        if (last_name < result.prefixes[i])
                            last_name = result.prefixes[i];
                    var l = [];
                    for (var a = 0; a < max_arrleft.length; a++) {
                        l = l.concat(max_arrleft[a]);
                    }
                    if (l) {
                        for (var b = 0; b < l.length; b++) {
                            resultobjs.prefixes.push(l[b]);
                        }
                    }
                    //resultobjs.prefixes=l;
                }

                if (result.objects) {
                    for (var i = 0; i < result.objects.length; i++) {
                        if (last_name < result.objects[i].name) {
                            last_name = result.objects[i].name;
                        }
                    }

                    max_arrright.push(result.objects);
                    length += result.objects.length;
                    var r = [];
                    for (var b = 0; b < max_arrright.length; b++) {
                        r = r.concat(max_arrright[b]);
                    }
                    if (r) {
                        for (var t = 0; t < r.length; t++) {
                            resultobjs.objects.push(r[t])
                        }
                    }
                    //resultobjs.objects=r;
                }
                if (length > 0 && length == me.oss_params['max-keys']) {
                    me.oss_params.marker = last_name;
                } else {
                    me.oss_params.marker = "";
                    state = true;
                }
                if (state) {
                    del(resultobjs);
                    (resultobjs.prefixes).length = 0;
                    (resultobjs.objects).length = 0;
                }
            }).catch(function(err) {
              reInitOss();
            });
        }
    },
    meta:function(obj){
    	client.head(obj.name).then(function(data){
    		console.log(data.meta);
    		if(data.meta!=null){
    			var w=data.meta.width;
    			var h=data.meta.height;
    			if(window.setwh){
    				setwh(w,h,obj.url);
    			}
    		}
    	});
    	return obj;
    },
    newFloder: function(dir) {
        var _this = this;
        client.put(dir, new Buffer("")).then(function(res) {
            loadtree(dir);
        }).catch(function(err) {
            console.log(err)
            reInitOss();
        });
    },
    saveFile: function(storeAsdir, file, _this, rar) {
    	var tup_name = storeAsdir + showTime() + file.name;
    	var w=0;
      	 var h=0;
      	var up_length=$(".imgsuccess:visible").length;
      	 if(w_h.length>0 && typeof w_h[up_length].w!='undefined'){
      		 w=w_h[up_length].w;
      	 }
      	 if(w_h.length>0 && typeof w_h[up_length].h!='undefined'){
      		 h=w_h[up_length].h;
      	 }
        client.multipartUpload(tup_name, file,{meta:{'width': w,'height':h}}).then(function(result) {// imglist2(result,_this,rar);

        }).catch(function(err) {
          reInitOss();
        });
    },


    deletefile: function(file) {
        client.delete(file).then(function(res) {}).catch(function(err) {
          reInitOss();
        });
    },

    deleteMulti: function(arr) {
    	console.log(arr);
        client.deleteMulti(arr, {
            quiet: true
        }).then(function(res) {
            //删除完之后再重新获取图片
            var dir = $.trim($(".pictureSpace_rightmulu").text()).split(">").join("/") + "/";
            console.log(dir);
            var file_list_params = {
                'prefix': dir,
                'delimiter': '/',
                'max-keys': 50,
                'marker': ''
            };
            (NEWO.arrimg).length = 0;
            bb.getFileListimg(file_list_params);
        }).catch(function(err) {
          reInitOss();
        });
    },

};

function showTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var str = (year + '' + zero(month) + '' + zero(day) + '' + zero(hour) + '' + zero(minute) + '' + zero(second));
    return str;
};

function zero(n) {
    return (n < 10) ? '0' + n : n;
};