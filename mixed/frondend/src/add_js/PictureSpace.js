import OSS from 'aliyun-oss-sdk.min';

var loadUp=[];
var iCur=0;
var w_h=[];
/*var appServer = window.location.host + '/yich/stsService';
var bucket = 'ngsimage';
var region = 'oss-cn-hangzhou';

var urllib = OSS.urllib;
var Buffer = OSS.Buffer;
var OSS = OSS.Wrapper;
var STS = OSS.STS;*/

var o = {};
var jsoncopy = o;
var NEWO = {};
NEWO.maxw=null;
NEWO.maxh=null;
NEWO.user = '';
//目录
NEWO.num = 0;
//进度条ID
NEWO.img = [];
//上传的图片
NEWO.divid = '';
//正在上传图片的进度条
NEWO.filesarr_next = '';
//file
NEWO.next = 0;
//下一个进度条ID
NEWO.stopstate = false;
//是否图片上传完
NEWO.arrimg = [];
//每个目录下图片
NEWO.arrimg2 = [];
//每个目录下图片
NEWO.count = 0;

var reInitOss = function() {
	var url = appServer;
	return urllib.request(url, {
        method: 'GET'
    }).then(function(result) {
        var creds = JSON.parse(result.data);
        client = new OSS({
            region: region,
            accessKeyId: creds.key,
            accessKeySecret: creds.secret,
            stsToken: creds.token,
            bucket: bucket
        });
    });
};
$(function(){
//图片空间dom
var pictureDom=[
'<div class="yingying"></div>',
'<div class="yingying2"></div>',
'<div class="fileloading" style="display:none">',
  '<div class="filetop">',
    '<span class="filetitle">图片上传中</span>',
    '<span class="closefile ingflileclose">×</span>',
  '</div>',
  '<div class="listMain">',
  '<ul class="ullistsj"></ul>',
  '</div>',
  '</div>',
  '<div class="pictureSpace_shadow">',
    '<div class="pictureSpace_module">',
        '<div class="pictureSpace_top">',
            '<span>选择图片</span>',
            '<i></i>',
        '</div>',
        '<div class="pictureSpace_center">',
            '<div class="pictureSpace_main pictureSpace_space">',
                '<div class="pictureSpace_mainleft">',
                    '<span class="pictureSpace_mltext">图片目录</span>',
                    '<div class="pictureSpace_leftsearch">',
                        '<input type="text" placeholder="按文件夹名称搜索" class="searchtext"/>',
                        '<i class="i_search"></i>',
                    '</div>',
                    '<div class="autotree">',
                      '<div class="tree"></div>',
                   '</div>',
                   '<ul class="newandremove">',
					'<li class="cz_newfile">',
						'<i class="New"></i>',
						'<span>新建</span>',
					'</li>',
					'<li class="cz_removefile">',
						'<i class="Remove"></i>',
						'<span>删除</span>',
					'</li>',
				'</ul>',
                '</div>',
                '<div class="pictureSpace_mainright">',
                    '<div class="pictureSpace_mulusearch">',
                       '<p class="pictureSpace_rightmulu"></p>',
                       '<div class="rightseach">',
                         '<div class="pictureSpacefile">',
                            '<input type="file" id="load" multiple/>',
                            '<span>上传图片</span>',
                         '</div>',
                         '<div class="pictureSpace_rightseach">',
                            '<input type="text" placeholder="图片名称搜索" class="rightsearch_text"/>',
                            '<i></i>',
                        '</div>',
                       '</div>',
                    '</div>',
                    '<div class="qx_checkbox">',
   			 	       '<input type="checkbox" name="" class="qxAll">',
   			 	       '<span class="textqx">全选</span>',
	   			 	   '<ul>',
	   			 	 	  '<li class="liRemove">',
	   			 	 	 	'<i class="remove"></i>',
	                           '<span>删除</span>',
	   			 	 	  '</li>',
	   			 	   '</ul>',
   			        '</div>',
                    '<div class="pictureSpace_tupmian">',
                        '<ul class="pictureSpace_list"></ul>',
                    '</div>',
                    '<p class="show_fy tcdPageCode" id="img_self"></p>',
                '</div>',
            '</div>',
        '</div>',
        '<div class="pictureSpace_bottom">',
           '<input type="button" value="确定" class="pictureSpace_true"/>',
           '<input type="button" value="取消" class="pictureSpace_cancel"/>',
        '</div>',
    '</div>',
  '</div>',
               ].join('');
$("body").append(pictureDom);
tree().windowsize();
})
window.get_Catalog=function(Catalog){
	if(arguments.length>1){
		if(/^\d+$/.test(arguments[1])){
			NEWO.maxw=arguments[1];
		}
		if(/^\d+$/.test(arguments[2])){
			NEWO.maxh=arguments[2];
		}
	}
	NEWO.user = Catalog;
	var url = appServer;
	return urllib.request(url, {
	    method: 'GET'
	}).then(function(result) {
	    var creds = JSON.parse(result.data);
	    client = new OSS({
	        region: region,
	        accessKeyId: creds.key,
	        accessKeySecret: creds.secret,
	        stsToken: creds.token,
	        bucket: bucket
	    });
	    // 获取目录
	    tree().init();
	})
}
//取消
$(document).on("click",".pictureSpace_cancel,.pictureSpace_top>i",function(){
	$(".pictureSpace_shadow").css("display","none");
});

//右边图片选择  
 $(document).on("click",".pictureSpace_list>li",function(){
	if(!$(this).children(".pictureSpace_error").is(":visible")){
		if($(this).children(".pictureSpace_select").is(":visible")){
			$(this).children(".pictureSpace_select").css("display","none");
		}else{
			$(this).children(".pictureSpace_select").css("display","block");
		}
	}
 })
//tab切换
$(document).on("click",".pictureSpace_tab>div",function(){
    $(this).addClass("active");
    $(this).siblings("div").removeClass("active");
    var type=$(this).attr("attr");
    if(type=='bd'){
        $(".pictureSpace_bdsc").css("display","block");
        $(".pictureSpace_space").css("display","none");
    }else{
      $(".pictureSpace_bdsc").css("display","none");
      $(".pictureSpace_space").css("display","block");
    }
})  
//目录
var tree = (function() {
    var _instance = null;
    function Single() {
        return {
        	//新建文件夹弹框
        	domnewfile: ['<div class="newfile">', '<div class="filetop">', '<span class="filetitle">新建文件夹</span>', '<span class="closefile newflileclose">×</span>', '</div>', '<p class="pweizhi"></p>', '<div class="filename">', '<input type="text" name="">', '<div>请输入文件夹名称<span>不能输入特殊符号</span></div>', '</div>', '<div class="filewenjj">', '<input type="button" value="确定" class="fileqd" name="">', '<input type="button" value="取消" class="fileqx" name="">', '</div>', '</div>', ].join(''),
        	img:function(){
        		var g=[];
        		if($(".pictureSpace_select").length==0){
                    $(".pictureSpace_shadow").css("display","none");
        			return g;
        		}else{
        			$(".pictureSpace_select:visible").each(function(){
        				var src=$(this).siblings("img").attr("nsrc");
        				g.push(src);
        			});
                    $(".pictureSpace_shadow").css("display","none");
        			return g;
        		}
        	},
        	show:function(){
                (NEWO.arrimg).length=0;
                 (NEWO.arrimg2).length=0;
        		$("#img_self").html('');
        		$(".searchtext,.rightsearch_text").val('');
        		$(".pictureSpace_list").html('');
        		$(".textActive").removeClass('textActive');
        		$(".pictureSpace_shadow").css("display","block");
        		this.windowsize();
        		maxwidth();
        	},
        	//节流器
        	throtttle:function(){
        		var _this=this;
        	 var isClear=arguments[0],fn;
        	   if(typeof isClear==='boolean'){
        	   	fn=arguments[1];
        	   	fn._throttleID && clearTimeout(fn._throttleID);
        	   }else{
        	   	fn=isClear;
        	   	param=arguments[1];
        	   	var p=_this.extend({
        	   		context:null, 
        	   		args:[],     
        	   		time:300      
        	   	},param);
        	   	arguments.callee(true,fn);
        	   	fn._throttleID=setTimeout(function(){
        	     fn.apply(p.context,p.args)
        	   	},p.time);
        	   }
        	},	
        	//继承
        	extend:function(target,source){
        	for(var property in source){
        		target[property]=source[property];
        	}
        	//返回目标对象
        	return target
        	},
        	windowsize:function(){
        		var wh=$(window).height();
        		$(".autotree").css("height",(wh/2)+'px');
        		$(".pictureSpace_tupmian").css("height",((wh/2)-30)+'px');
        		$(".pictureSpace_module").css({
        			"margin-top":(-$(".pictureSpace_module").height()/2)+'px'
        		});
        	},
            init: function() {
            	var me=this;
            	$(window).resize(function() {
            		me.throtttle(me.windowsize);
            		});
                var filePath = '';
                var dir = NEWO.user + '/' + filePath;
                bb.getFileList(dir, o, dir);
                this.openTrtee();
                //搜索目录
                this.search();
                //文件夹选中
                $(document).on("click", ".tree .text", function(event) {
                    event.stopPropagation();
                    $(".pictureSpace_list").html('');
                    $(".tree .textActive").each(function() {
                        $(this).removeClass("textActive");
                    });
                    $(this).addClass("textActive");
                    var strml = $.trim($(this).closest("a").siblings("b").text());
                    var strmlarr = strml.split("/");
                    var mulustr = '';
                    for (var i = 0; i < strmlarr.length - 1; i++) {
                        if (i == (strmlarr.length - 2)) {
                            mulustr += strmlarr[i];
                        } else {
                            mulustr += strmlarr[i] + ">";
                        }
                    }
                    $(".pictureSpace_rightmulu").text(mulustr);
                    var dir = $.trim($(this).closest("a").siblings(".b_hidden").text());
                    var file_list_params = {
                        'prefix': dir,
                        'delimiter': '/',
                        'max-keys': 50,
                        'marker': ''
                    };
                    console.log(NEWO.arrimg);
                    (NEWO.arrimg).length = 0;
                    bb.getFileListimg(file_list_params);
                });
                //新建文件夹弹出框
                $(".cz_newfile").click(function(event) {
                    event.stopPropagation();
                    $(".yingying2").css("display", "block");
                    if ($(".newfile").length > 0) {
                        $(".filename").children("input").val('');
                        $(".newfile").css("display", "block");
                    } else {
                        $(".yingying2").after(me.domnewfile);
                    }
                });
                //取消新建
                $(document).on("click", ".fileqx,.newflileclose", function(event) {
                    event.stopPropagation();
                    $(".yingying2,.newfile").css("display", "none");
                });
                //文件名输入判断
                $(document).on("blur", ".filename input", function() {
                    var s = $.trim($(this).val());
                    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%]");
                    var rs = "";
                    for (var i = 0; i < s.length; i++) {
                        rs = rs + s.substr(i, 1).replace(pattern, '');
                    }
                    var state = true;
                    if ($(".textActive").length > 0) {
                    	$(".textActive").closest("li").find("li").each(function() {
                            var v = $.trim($(this).find(".text").text());
                            if (v == rs) {
                                state = false;
                                alert("不能重名");
                                return false;
                            }
                        });
                    } else {
                        $(".tree").children(".treelist").children("li").each(function() {
                            var v = $.trim($(this).find(".text").text());
                            if (v == rs) {
                                state = false;
                                alert("不能重名");
                                return false;
                            }
                        });
                    }
                    if (state) {
                        $(this).val(rs);
                    } else {
                        $(this).val('');
                    }
                });
                //新建
                $(document).on("click", ".fileqd", function(event) {
                    event.stopPropagation();
                    if ($.trim($(".newfile").find(".filename input").val()) == '') {
                        alert("文件名不能为空");
                    } else {
                        $(".yingying,.newfile").css("display", "none");
                        if ($(".textActive").length > 0) {
                            var name = $.trim($(".textActive").closest("a").siblings("b").text()) + $.trim($(".newfile").find(".filename input").val()) + "/";
                        } else {
                            var name = NEWO.user + "/" + $.trim($(".newfile").find(".filename input").val()) + "/";
                        }
                        var array = name.split("/");
                        for (var i = 0; i < array.length; i++) {
                            if (array[i] == "" || typeof (array[i]) == "undefined") {
                                array.splice(i, 1);
                                i = i - 1;
                            }
                        }
                        var newname = array.join("/") + "/";
                        bb.newFloder(newname);
                    }

                });
                //删除文件夹
                $(".cz_removefile,.shanc").click(function(event) {
                    event.stopPropagation();
                    me.removeselectfile();
                });
                //删除图片
                $(".liRemove").click(function(event) {
                    event.stopPropagation();
                    var l=$(".pictureSpace_select:visible").length;
                    if(l==0){
                    	alert("请先选择!");
                    	return false
                    }
                    if (confirm("确定删除吗!")) {
                        var delarr = [];
                        $(".pictureSpace_list").find(".pictureSpace_select:visible").each(function() {
                            var src = $(this).siblings("img").attr("rename");
                            var g = src.split("/");
                           // g[g.length - 1] = encodeURIComponent(g[g.length - 1]);
                            g[g.length - 1] = (g[g.length - 1]);
                            var _src = g.join("/");
                            delarr.push(_src);
                        });
                        bb.deleteMulti(delarr);
                    }
                });
                $(".qxAll").click(function(event) {
                    event.stopPropagation();
                    if ($(this).get(0).checked) {
                        $(".pictureSpace_list").find(".pictureSpace_select").css("display","block");
                    } else {
                        $(".pictureSpace_list").find(".pictureSpace_select").css("display","none");
                    }
                });
            },
            removeselectfile: function() {
                if ($(".textActive").length == 0) {
                    alert("请先选择文件!");
                    return false;
                }
                if (confirm("确定要删除吗？")) {
                    $(".rightji").css("display","none");
                    $(".list").children("ul").html('');
                    $(".pageBox").css("display", "none");
                    //isEmptyObject
                    var d;
                    //返回选中的部分json
                    var dir = $(".textActive").closest("a").siblings(".b_hidden").text();

                    $(".tree .b_hidden").each(function() {
                        if ($.trim($(this).text()) == dir) {
                            $(this).closest("li").remove();
                            return false
                        }
                    });

                    b(dir, o);
                    var j = d;
                    var arr = [];
                    aa(j);
                    for (var y = 0; y < arr.length; y++) {
                        var r = arr[y];
                        var z = r.split("/");
                        var delarr = [];
                        var str = '';
                        for (var q = 0; q < z.length - 1; q++) {
                            str += z[q] + "/"
                            delarr.push(str);
                        }
                        var delarr2 = delarr.reverse();
                        for (var u = 0; u < delarr2.length; u++) {
                            if (delarr2[u] == dir) {
                                bb.getFileListimg2(delarr2[u]);
                                break;
                            } else {
                                bb.getFileListimg2(delarr2[u]);
                            }
                        }
                    }

                    var j = o;
                    removeobj(dir, j);
                    function aa(json) {
                        //返回最每层最后一个json key
                        for (key in json) {
                            if (isEmptyObject(json[key])) {
                                arr.push(key);

                            } else {
                                aa(json[key]);
                            }
                        }
                    }

                    function b(c, o) {
                        //返回选中的部分json
                        if (!isEmptyObject(o)) {
                            for (var k in o) {
                                if (k == c) {
                                    d = o[k];
                                    break
                                } else {
                                    b(c, o[k]);
                                }

                            }
                            ;
                        }
                        if (isEmptyObject(d)) {
                            d = {};
                            d[c] = {};
                        }
                    }
                }
            },
          
            openTrtee: function() {
                $(document).on("click", ".j", function() {
                    var mulu = $(this).siblings(".b_hidden").text();
                    open2(this, mulu);
                })
            },
            //serachmulu:'',
            search: function() {
                $(document).on("click",".i_search",function(event){
                	event.stopPropagation();
                    $(".textActive").each(function() {
                        $(this).removeClass("textActive");
                    });
                    var strname = $.trim($(this).siblings("input").val());
                    //f1(o,strname,[]);
                    var ojson = o;
                    console.log(strname);
                    f(ojson, strname);

                });
            },
            //搜索父级目录
            serachtree: function(key) {
                var arr = key.split("/");
                arr = arr.splice(0, (arr.length - 1));
                var strmulu = '';
                console.log(arr);
                for (var i = 0; i < arr.length; i++) {
                    strmulu += arr[i] + "/"
                    //从第二级目录开始
                    if (i > 0) {
                        var n = 0;
                        $(".tree .b_hidden").each(function() {
                            if ($.trim($(this).text()) == strmulu) {
                                n++;
                                //如果有目录就显示
                                $(this).closest("ul").css("display", "block");
                                if (i == (arr.length - 1)) {
                                    $(this).siblings("a").children('.text').addClass("textActive");
                                }
                            }
                        });

                    }
                    if (n == 0) {
                        var newarr = strmulu.split("/");
                        newarr = newarr.splice(0, newarr.length - 2);
                        var newstr = newarr.join("/") + "/";
                        var _this = '';
                        $(".b_hidden").each(function() {
                            if ($.trim($(this).text()) == newstr) {
                                _this = $(this).siblings(".j");
                                return false;
                            }
                        })
                        open2(_this, newstr);
                        $(_this).siblings(".treelist").children("li").each(function() {
                            if ($.trim($(this).find(".b_hidden").text()) == strmulu) {
                                if (i == (arr.length - 1)) {
                                    $(this).find(".text").addClass("textActive");
                                    return false;
                                }

                            }
                        });
                    }
                }
            },
        };
    }
    ;return function() {
        if (!_instance) {
            _instance = Single();
        }
        return _instance;
    }
})();

function gettree(root, arr) {
    for (var j = 0; j < arr.length; j++) {
        var strarr = arr[j].split(";");
        var str = strarr[strarr.length - 1];
        bb.getFileList(str, root, arr[j]);
    }
};

function getresult2(result) {
    var one = result.prefixes;
    //root
    if ((result.objects).length > 0) {
        for (var i = 0; i < (result.objects).length; i++) {
            var name = (result.objects)[i].name;
            var namearr = name.split(".");
            var type = namearr[namearr.length - 1];
            if (type.toLowerCase() == "jpg" || type.toLowerCase() == "png" || type.toLowerCase() == "jpeg" || type.toLowerCase() == "gif") {
                if (name) {
                    var newroot = name.split("/");
                    if (newroot[1]) {}
                }
            }
        }
    }
    var oli = [];
    var oldwenj = [];
    for (var i = 0; i < one.length; i++) {
        var oldwenjlenght = one[i].split("/");
        var oldwenjname = oldwenjlenght[oldwenjlenght.length - 2];
        oldwenj.push(oldwenjname);
    }
    for (var i = 0; i < one.length; i++) {
        var keylength = one[i].split("/");
        var endkey = keylength[keylength.length - 2];
        var Ali = ["<li>", "<i class='jia j'></i>", "<a href='javascript:;'><i class='w close'></i><span class='text' title='" + endkey + "'>" + endkey + "</span></a>", "<b style='display:none' class='b_hidden'>" + one[i] + "</b>", "</li>"
        ].join('');
        var Jli = {};
        Jli.dom = Ali;
        Jli.sy = one[i];
        oli.push(Jli);
    }

    var peixuarr = sortarr(oli, "sy");
    var peixuDOM = '';
    for (var w = 0; w < peixuarr.length; w++) {
        peixuDOM += peixuarr[w].dom;
    }
    var oul = '<ul  class="treelist">' + peixuDOM + '</ul>';
    $(".tree").html(oul);
    maxwidth();
};
function maxwidth(){
	var arr=[];
	$(".treelist").each(function(){
		$(this).children("li").each(function(){
			var w = +$(this).find(".text").width()*1+40+$(this).offset().left*1;
			arr.push(w);
		});
	});
	var maxw=Math.max.apply(null, arr);
	$(".treelist").eq(0).css("width",maxw+'px');
};
//排序
function sortarr(arr, key) {
    return arr.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
};

//树展开
function open2(_this, m) {
    var len = $(_this).siblings("ul").length;
    if ($(_this).hasClass("jia")) {
        $(_this).removeClass("jia").addClass("jian");
        $(_this).siblings("a").children(".w").removeClass("close").addClass("open");
        if ($(_this).siblings("ul").length > 0) {
            $(_this).siblings("ul").css("display", "block");
        } else {
            var newo = JSON.stringify(o);
            var marr = m.split("/");
            marr = marr.splice(0, marr.length - 1);
            var str = '';
            for (var g = 0; g < marr.length; g++) {
                var Astr = ''
                for (var v = 0; v <= g; v++) {

                    Astr += marr[v] + "/";
                    //console.log(Astr);
                }
                str += "['" + Astr + "']"
            }
            var objstr = newo + str;
            var obj = eval("(" + objstr + ")");
            var liarr = [];
            for (var key in obj) {
            	console.log(key);
                var keylength = key.split("/");
                var appkey = keylength[keylength.length - 2];
               // console.log(appkey);
                var appli = ["<li>", "<i class='jia j'></i>", "<a href='javascript:;'><i class='w close'></i><span class='text' title='" + appkey + "'>" + appkey + "</span></a>", "<b style='display:none' class='b_hidden'>" + key + "</b>", "</li>"
                ].join('');
                var lijson = {};
                lijson.sy = key;
                lijson.dom = appli;
                liarr.push(lijson);
            }
            var peixappli = sortarr(liarr, "sy");
            var appul = '';
            for (var p = 0; p < peixappli.length; p++) {
                appul += peixappli[p].dom
            }
            $(_this).closest("li").append("<ul class='treelist'>" + appul + "</ul>");
        }
    } else if ($(_this).hasClass("jian")) {
        $(_this).removeClass("jian").addClass("jia");
        $(_this).siblings("a").children(".w").removeClass("open").addClass("close");
        //$(_this).siblings("ul").css("display", "none");
        $(_this).siblings("ul").remove();
        $(_this).closest("li").find(".treelist").each(function() {
            $(this).css("display", "none");
        });
        $(_this).closest("li").find(".j").each(function() {
            $(this).removeClass("jian").addClass("jia");
        });
        $(_this).closest("li").find(".w").each(function() {
            $(this).removeClass("open").addClass("close");
        });
    }
    maxwidth();
};

//搜索目录
function f(j, name) {
    for (var key in j) {
        var arr = key.split("/");
        var n = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == name) {
                n++;
                tree().serachtree(key);
                break;
            }
        }
        if (n == 0) {
            var o2 = j[key];
            f(o2, name);
        }
    }
};


//目录下的图片
function getresultimg(result) {
    NEWO.count = 0;
    var objarr = result.objects;
    console.log(objarr);
    if (objarr.length>0) {
        for (var i = 0; i < objarr.length; i++) {
            NEWO.count++;
            var a = (objarr[i].name).split(".");
            if (a[a.length - 1].toLowerCase() == "jpg" || a[a.length - 1].toLowerCase() == "jpeg" || a[a.length - 1].toLowerCase() == "png" || a[a.length - 1].toLowerCase() == "gif") {
            	objarr[i].realname = (objarr[i].name);
                (NEWO.arrimg).push(objarr[i]);
            }
        }
        $("#img_self").createPage({
    	    pageCount:parseInt((((NEWO.arrimg).length-1)/40)+1),
    	    current:1,
    	    backFn:function(p){
    	      // alert(p) //单击回调方法，p是当前页码
    	    	listimg(p);
    	    }
    	 });	
        if((NEWO.arrimg).length<=50){
        	 listimg(1);
        }
       
    }
    NEWO.count = NEWO.count - 1;
};

function listimg(n, type) {
    $(".pictureSpace_tupmian").children("ul").html('');
    if (arguments.length == 2) {
        var arr = NEWO.arrimg2;
    } else {
        var arr = NEWO.arrimg;
    }
    console.log(arr);
    var str = '';
    var i = (n - 1) * 40;
    var j = n * 40;
    if (j < arr.length) {
        j = n * 40;
    } else {
        j = arr.length;
    }
    for (i; i < j; i++) {
    	bb.meta(arr[i]);
        if (arr[i]) {
            var src = arr[i].url;
            var newsrc = imgchange(src, "@110w_110h");
            var name = (arr[i].realname).split("/");
            var name2 = name[name.length - 1];
            str+=[
                '<li>',
                  '<i class="pictureSpace_select" style="display:none;"></i>',
                  '<img nsrc="' + src + '" src="' + (newsrc) + '" rename="'+arr[i].realname+'"/>',
                	  '<div class="pictureSpace_error" style="display:none;">',
                	  '<b class="b_w" style="display:none;"></b>',
                      '<b class="b_h" style="display:none;"></b>',
                	     '<i></i>',
                	     '<span>尺寸不符</span>',
                	  '</div>',
                	  '<span class="opcaty" style="display:none;"></span>',
                 '</li>'
            ].join(''); 
            };
    }
    ;$(".pictureSpace_tupmian").children("ul").html(str);
};


//图片缩略图
function imgchange(src, size) {
    if ((src).indexOf('http://ngsimage') == -1) {
        var imgsrc = (src);
        return imgsrc;
    } else {
        var oss_img = '';
        var src_oss = (src).split(".");
        src_oss.splice(src_oss.length - 1, 1);
        var left_ossimg = src_oss.join('.');
        var srclast_oss = src.split('.');
        srclast_oss = srclast_oss[srclast_oss.length - 1];
        var a_oss = srclast_oss.split("jpg").length
        var c_oss = srclast_oss.split("png").length
        var e_oss = srclast_oss.split("jpeg").length
        var g_oss = srclast_oss.split("JPG").length
        var i_oss = srclast_oss.split("PNG").length
        var k_oss = srclast_oss.split("JPEG").length
        var o_oss = srclast_oss.split("gif").length
        var m_oss = srclast_oss.split("GIF").length
        if (a_oss > 1) {
            oss_img = left_ossimg + '.jpg'
        } else if (c_oss > 1) {
            oss_img = left_ossimg + '.png'
        } else if (e_oss > 1) {
            oss_img = left_ossimg + '.jpeg'
        } else if (g_oss > 1) {
            oss_img = left_ossimg + '.JPG'
        } else if (i_oss > 1) {
            oss_img = left_ossimg + '.PNG'
        } else if (k_oss > 1) {
            oss_img = left_ossimg + '.JPEG'
        } else if (o_oss > 1) {
            oss_img = left_ossimg + '.gif'
        } else if (m_oss > 1) {
            oss_img = left_ossimg + '.GIF'
        } else {
            oss_img = (src);
        }
        var imgsrc = oss_img.replace("http://ngsimage.oss-", "http://ngsimage.img-");
        imgsrc = imgsrc + size;
        return imgsrc;
    }
};

$(".pictureSpace_rightseach").children("i").click(function() {
    var text = $.trim($(this).siblings("input").val());
    var oldarr = NEWO.arrimg;
    if (text != '') {
        var slectimgarr = [];
        for (var i = 0; i < NEWO.arrimg.length; i++) {
            if (((NEWO.arrimg)[i].realname).indexOf(text) != -1) {
                slectimgarr.push((NEWO.arrimg)[i]);
            }
        }
        var json = {};
        json.objects = slectimgarr;
        getresultimg2(json);
    } else {
        var json = {};
        json.objects = NEWO.arrimg;
        getresultimg2(json);
    }

});
function getresultimg2(result) {
    (NEWO.arrimg2) = [];
    var objarr = result.objects;
    if (objarr) {
        for (var i = 0; i < objarr.length; i++) {
            var a = (objarr[i].name).split(".");
            if (a[a.length - 1].toLowerCase() == "jpg" || a[a.length - 1].toLowerCase() == "jpeg" || a[a.length - 1].toLowerCase() == "png" || a[a.length - 1].toLowerCase() == "gif") {
            	 objarr[i].realname = (objarr[i].name);
                (NEWO.arrimg2).push(objarr[i]);
            }
        }
        var allpage = Math.ceil((NEWO.arrimg2).length / 40);
        if (allpage > 1) {
            $("#Pagination").pagination(allpage);
            $(".allPage").text(allpage);
            $(".pageBox").css("display", "block");
        } else {
            $(".pageBox").css("display", "none");
        }
        listimg(1, 'arrimg2');
    }

};



$(document).on("change", "#load", function() {
	if($(".textActive").length==0){
		alert("请选择文件夹");
		return false
	}
	if((NEWO.arrimg).length>40){
		alert("文件夹已满!");
		return false
	};
	 var filesarr=$(this)[0].files;
	 if(filesarr.length>0){
    NEWO.stopstate = true;
    NEWO.num = 0;
    NEWO.next = 0;
    loadUp.length=0;
    iCur=0;
    w_h.length=0;
    //NEWO.user=$.trim($(".textActive").closest("a").siblings(".b_hidden").text());
    $("input[type=file]").attr("disabled", "disabled");
    $(".uploadfile").css("display", "none");
        $(".fileloading").find(".ullistsj").html('');
        $(".fileloading").css("display", "block");
    

    var dir = $.trim($(".textActive").closest("a").siblings(".b_hidden").text());
    $("body").find('#newappend_img').remove();
    $('body').append('<img src="" id="newappend_img" style="display:none;">');
    (NEWO.img).length = 0;
    var explorer = navigator.userAgent;
    var filesarr = $(this)[0].files;
    NEWO.filesarr_next = filesarr;
    for (var f = 0; f < filesarr.length; f++) {
        NEWO.num++;
        if (explorer.indexOf('MSIE') >= 0) {
            if (!/\.(jpg|jpeg|png|JPG|PNG|JPEG|gif|GIF)$/.test(filesarr[f].name)) {

                return false;
            } else {
                alert("不支持低版本IE!");
            }
        } else {
            if (!/\.(jpg|jpeg|png|JPG|PNG|JPEG|gif|GIF)$/.test(filesarr[f].name)) {

                return false;
            } else {

                var file = filesarr[f]
                var url = URL.createObjectURL(file);
                loadUp.push(url);
                var size = file.size / 1000;
                f3(url, file, dir, NEWO.num, size);
            }
        }
    }
    xunlei();
	 }
});

function f3(url, file, dir, num, size) {
    var json = {};
    json.dir = dir;
    json.storeAsdir = file;
    json.id = 'imgid' + num;
    (NEWO.img).push(json);
    var listr = ['<li>', '<span class="tupname">' + file.name + '</span>', '<span class="tupsize">' + size + 'KB</span>', '<div class="tupstatus">', '<span id="imgid' + num + '">上传中...</span>', '<i class="imgsuccess"></i>', '</div>', '</li>', ].join('');
    $(".ullistsj").append(listr);
};

var oImage = new Image();
function xunlei() {
	oImage.src = loadUp[iCur];
	oImage.onload = function() {
		$('#newappend_img').attr("src",loadUp[iCur]);
		iCur++;
		if (iCur < loadUp.length) {
			xunlei();	//递归
		}
	var w=$('#newappend_img').width();
	var h=$('#newappend_img').height();
	var json={};
	json.w=w;
	json.h=h;
	w_h.push(json);
	 if(w_h.length==loadUp.length){
		 f4(); 
	   }
	};
	oImage.onerror=function(){
		iCur++;
		if (iCur < loadUp.length) {
			xunlei();	//递归
		}
		var json={};
		w_h.push(json);
		 if(w_h.length==loadUp.length){
			f4();
		   }
	}
}

function f4() {
	 $(".fileloading,.yingying").css("display", "block");
    if ((NEWO.img)[0] && NEWO.stopstate) {
        loadimg((NEWO.img)[0].dir, (NEWO.img)[0].storeAsdir, (NEWO.img)[0].id)
    }
};

function loadimg(dir, storeAsdir, id) {
    bb.saveFile(dir, storeAsdir, id);
    NEWO.divid = id;
    applyTokenDo(uploadFile, NEWO.filesarr_next);
};

var applyTokenDo = function(func, filesarr) {
    return func(client, filesarr);
};

var uploadFile = function(client, filesarr) {
    var file = filesarr[0];
    var key = NEWO.user;
    return client.multipartUpload(key, file, {
        progress: progress
    }).then(function(res) {
        console.log('upload success: %j', res);
    }).then(function(err) {
    	console.log(err);
    	reInitOss();
    });
};

var progress = function(p) {
    return function(done) {
        var bar = document.getElementById(NEWO.divid);
        bar.style.width = Math.floor(p * 100) + '%';
        bar.innerHTML = Math.floor(p * 100) + '%';
        $("#" + NEWO.divid).addClass("uploadComplete");
        if (p == 1) {
            NEWO.next++;
            $("#" + NEWO.divid).css("display", "none");
            $("#" + NEWO.divid).siblings("i").css("display", "block");
            if ((NEWO.img)[NEWO.next] && NEWO.stopstate) {
                loadimg((NEWO.img)[NEWO.next].dir, (NEWO.img)[NEWO.next].storeAsdir, (NEWO.img)[NEWO.next].id, NEWO.filesarr_next);
            } else {
                NEWO.next--;
            }
            var a = 0;
            $(".tupstatus").each(function() {
                if ($(this).children("span").is(":visible")) {
                    a++;
                }
            });
            if (a == 0) {
                $("input[type=file]").removeAttr("disabled");
                $("#load").remove();
                $(".pictureSpacefile").append('<input type="file" id="load" multiple>');
                $(".fileloading,.yingying").css("display", "none");
                setTimeout(function() {
                    var dir = $.trim($(".textActive").closest("a").siblings(".b_hidden").text());
                    var file_list_params = {
                        'prefix': dir,
                        'delimiter': '/',
                        'max-keys': 50,
                        'marker': ''
                    };
                    (NEWO.arrimg).length = 0;
                    bb.getFileListimg(file_list_params);
                }, 500);
            }
        }
        done();
    }
};

function setwh(w,h,url){
	//alert(w+'-----'+h);
	$(".pictureSpace_list").children("li").each(function(){
		var s=$(this).children("img").attr("nsrc");
		if(s==url){
			$(this).children(".pictureSpace_error").children(".b_w").text(w);
			$(this).children(".pictureSpace_error").children(".b_h").text(h);
			if(NEWO.maxw!=null && NEWO.maxh!=null){
				if(+w<+NEWO.maxw || +h<+NEWO.maxh){
					$(this).children(".pictureSpace_error").css("display","block");
					$(this).children(".opcaty").css("display","block");
				}
			}
			return false;
		}
	});
}

//新建文件夹后的回调
function loadtree(dir) {
    var arr = dir.split("/");
    var arr2 = dir.split("/");
    var selectmulu = arr2.splice(0, (arr.length - 2));
    var selectmulu2 = selectmulu.join("/") + "/";
    sleletjson(selectmulu2, dir, o);
    var newdir = arr[arr.length - 2];
    arr = arr.splice(0, (arr.length - 2));
    var str = arr.join("/") + "/";
    open(_this, str);
    if ($(".textActive").length > 0) {
        var _this = $(".textActive").closest("a").siblings(".j");
        $(_this).removeClass("jia").addClass("jian");
        $(".tree .b_hidden").each(function() {
            if ($.trim($(this).text()) == str) {
                if ($(this).siblings(".treelist").length == 0) {
                    var strdom = ['<ul class="treelist" style="display:block">', "<li>", "<i class='jia j'></i>", "<a href='javascript:;'><i class='w close'></i><span class='text' title='" + newdir + "'>" + newdir + "</span></a>", "<b style='display:none' class='b_hidden'>" + dir + "</b>", "</li>", '</ul>', ].join('');
                    $(this).closest("li").append(strdom);
                } else {
                    var lidom = [
                    "<li>", "<i class='jia j'></i>", "<a href='javascript:;'><i class='w close'></i><span class='text' title='" + newdir + "'>" + newdir + "</span></a>", "<b style='display:none' class='b_hidden'>" + dir + "</b>", "</li>", ].join('');
                    $(this).closest("li").children(".treelist").append(lidom);
                    $(this).closest("li").children(".treelist").css("display", "block");
                }
                return false;
            }
        });
    } else {
        if ($(".tree").children(".treelist").length > 0) {
            var lidom = ["<li>", "<i class='jia j'></i>", "<a href='javascript:;'><i class='w close'></i><span class='text' title='" + newdir + "'>" + newdir + "</span></a>", "<b style='display:none' class='b_hidden'>" + dir + "</b>", "</li>", ].join('');
            $(".tree").children(".treelist").append(lidom);
            $(".tree").children(".treelist").css("display", "block");
        } else {
            var strdom = ['<ul class="treelist" style="display:block">', "<li>", "<i class='jia j'></i>", "<a href='javascript:;'><i class='w close'></i><span class='text' title='" + newdir + "'>" + newdir + "</span></a>", "<b style='display:none' class='b_hidden'>" + dir + "</b>", "</li>", '</ul>', ].join('');
            $(".tree").append(strdom);
        }
    }
    maxwidth();
};
function sleletjson(oldml, newml, obj) {
    for (var key in obj) {
        if (key == oldml) {
            obj[key][newml] = {};
            break;
        } else {
            sleletjson(oldml, newml, obj[key]);
        }
    }
    ;
};
//删除
function del(result) {
    var b = [];
    var a = (result.prefixes);
    for (var k = 0; k < (result.objects).length; k++) {
        b.push((result.objects)[k].name);
    }
    a = a.concat(b);
    bb.deleteMulti(a);
};
function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
};
function removeobj(dir, j) {
    for (var key in j) {
        if (key == dir) {
            delete j[key];
            break
        } else {
            removeobj(dir, j[key])
        }
    }

};