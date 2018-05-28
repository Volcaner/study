	import OSS from 'aliyun-oss-sdk.min';
	import reinitoss from '../add_js/reInitOss'
	import {imgMark} from './imgmark.js';
	reinitoss.reInitOss(OSS);
	var stripscript = function(s) { 
		var pattern = new RegExp("[`~%!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]") 
		var rs = ""; 
		for (var i = 0; i < s.length; i++) { 
			rs = rs+s.substr(i, 1).replace(pattern, ''); 
		} 
		return rs;
	};
	function upload(l,btn,username){
		var btn2=btn || ".file_input";
		if(l<=0 || isNaN(l) || !l){
			l=1;
		}
		var aa={
			getFileList:function(dir,_this){
				if(!window.ossstate){
					return false
				}
					        client.list({
					          prefix: dir,
					            delimiter: '/'
					  }).then(function (result) {
						/*console.log(result);*/
						  getresult(result,_this);
					
					   
					  }).catch(function (err) {
						  reinitoss.reInitOss(OSS);
					  });
				},
			saveFile:function(storeAsdir,file,_this){
				if(!window.ossstate){
					return false
				}
				  client.multipartUpload(storeAsdir+showTime()+stripscript(file.name), file).then(function (result) {
				       imglist(result,_this);
				       
				  }).catch(function (err) {
					  reinitoss.reInitOss(OSS);
				  });
			}, 
			newFloder:function(dir){
				if(!window.ossstate){
					return false
				}
				var _this=this;
				client.put(dir, new Buffer("")).then(function (res) {
					  /*console.log(res);*/
			          //loadtree(dir);
				}).catch(function (err) {
					reinitoss.reInitOss(OSS);
		       });
			},
			deletefile:function(file){
				if(!window.ossstate){
					return false
				}
				client.delete(file).then(function (res) {
					 /* console.log(res);*/
				}).catch(function (err) {
					reinitoss.reInitOss(OSS);
				  });
			}
		};

			//var username=$(".username").text() || "jcm01";
		aa.newFloder(username+"/");
		if($(".imgSrc").length>0){
			$(".imgSrc").each(function(){
				$(this).removeAttr("id");
			});
		}

		//上传图片
		var div="";
		var num=0;
		var next=0;
		var filesarr_next='';
		var img=[];
		$(document).on("change",btn2,function(){
			if(!window.ossstate){
				return false
			}
			//$(".file_input").attr("disabled","disabled");
			img.length=0;
			next=0;
			var _this=this;
            var explorer = navigator.userAgent;
	        var filesarr=$(this)[0].files;
	        filesarr_next=filesarr;
	        var user=username;
		    var filePath='';
		    var dir=user+'/'+filePath;
            for(var f=0;f<filesarr.length;f++){
            	num++;
	            if (explorer.indexOf('MSIE') >= 0) {
	                if (!/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/.test(filesarr[f].name)) {
	                    imgSrc = "";
	                    return false;
	                }else{
	                	$("input[type=file]").attr("disabled","disabled");
	                    imgSel("", filesarr[f].name,filesarr[f],filesarr_next,num,_this,l);
	                    uploadimg("", filesarr[f].name,filesarr[f],filesarr_next);
	                    if(img[0]){
				      		loadimg(img[0].dir,img[0].storeAsdir,img[0].id,filesarr_next); 
				        };
	                }
	            }else{
	                if (!/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/.test(filesarr[f].name)) {
	                    imgSrc = "";
	                    return false;
	                }else{
	                	$("input[type=file]").attr("disabled","disabled");
	                    var file = filesarr[f]
	                   	var url = URL.createObjectURL(file);
	                	if($(_this).hasClass("imgMark")) {
	                		file = imgMark(file, function(fileResult) {
	                			imgSel(url,dir,fileResult,filesarr_next,num,_this,l);
			                    // uploadimg(url,dir,filesarr[f],filesarr_next,num,_this,l);
			                    uploadimg(url,dir,fileResult,filesarr_next);
			                    if(img[0]){
						      		loadimg(img[0].dir,img[0].storeAsdir,img[0].id,filesarr_next); 
						        };
	                		});
	                	}
	                	else {
	                		imgSel(url,dir,filesarr[f],filesarr_next,num,_this,l);
		                    // uploadimg(url,dir,filesarr[f],filesarr_next,num,_this,l);
		                    uploadimg(url,dir,filesarr[f],filesarr_next);
		                    if(img[0]){
					      		loadimg(img[0].dir,img[0].storeAsdir,img[0].id,filesarr_next); 
					        };
	                	}
	                }
	            }
	        };
	        
		});

		function uploadimg(url,dir,storeAsdir,filesarr_next){
			 var json={};
			   json.dir=dir;
			   json.storeAsdir=storeAsdir;
			   json.id='imgid'+num;
			   if(img.length<l){
			   img.push(json);
			   };
		 };

		function loadimg(dir,storeAsdir,id,filesarr_next){
		      aa.saveFile(dir,storeAsdir,id);
		      div=id;
		      applyTokenDo(uploadFile,filesarr_next);
		 };

			//上传进度条
		var uploadFile = function (client,filesarr) {
		  	var file =filesarr[0];
		  	var key = username+'/';

		  	return client.multipartUpload(key, file,{
		    	progress: progress
		  	}).then(function (res) {
		    	/*console.log('upload success: %j', res);*/
		  	}).catch(function (err) {
		  		reinitoss.reInitOss(OSS);
	          });
		};

		var progress = function (p) {
		  return function (done) {
		    var bar =document.getElementById(div);
		    bar.style.width = Math.floor(p * 100) + '%';
		    bar.innerHTML = Math.floor(p * 100) + '%';
		    if(p==1){
		    	next++;

		   if(img[next]){
		    loadimg(img[next].dir,img[next].storeAsdir,img[next].id,filesarr_next); 
		    }else{
		    	next--;
		    }
		   
		   var a=0;
		   $(".pross_div").each(function(){
		   	if($.trim($(this).children("span").text())==""){
		          a++;
		   	}
		   });
		  
		   if(a==0){
			   $("input[type=file]").removeAttr("disabled");
		   }
		   
		    }
		    done();
		  }
		};

		 var applyTokenDo = function (func,filesarr) {
		   return func(client,filesarr);
		 };
		};
	function download(name,newname){
		if(!newname){
			newname='';
		}
	 var applyTokenDo2 = function (func) {
		 return func(client);
		  };
				//下载图片
	   var downloadFile = function (client) {
		   if(!window.ossstate){
				return false
			}
			   var object = name;
			   var filename = newname;
			 /*  console.log(object + ' => ' + filename);*/
	
			   var result = client.signatureUrl(object, {
			     response: {
			       'content-disposition': 'attachment; filename="' + filename + '"'
			     }
			   });
			   window.location = result;
	
			   return result; 
		   
 };
 //$(document).on("click",down,function(){
	 applyTokenDo2(downloadFile);
// });
}
	function showTime(){
	  var date = new Date();
	  var year = date.getFullYear();
	  var month = date.getMonth()+1;
	  var day = date.getDate();
	  var hour = date.getHours();
	  var minute = date.getMinutes();
	  var second = date.getSeconds();
	  var str=(year+''+month+''+day+''+hour+''+minute+''+second);
	  return str;
	};
	
//添加图片
function imgSel(url, dir, storeAsdir, filesarr_next, num, _this, length) {
		$(_this).prev().html('');
		var lujin = dir + "" + storeAsdir.name;// 可以不写
		if ($(_this).prev().children("img").length < length) {
			$(_this)
					.prev()
					.html(
							'<img src="'
									+ url
									+ '" class="zclc_tp"/><div class="pross_div"><span class="imgid"id="imgid'
									+ num + '"/></span></div>'
									
					);
		} else {
			$(_this).removeAttr("disabled");
		}
};
// 生成阿里云路径
function imglist(resut, _this) {
		var imgurl = "http://ngsimage.img-cn-hangzhou.aliyuncs.com/" + resut.name;
		$("#" + _this).closest("a").append('<input type="hidden" value="'+imgurl+'" name="loadpic">');
}
//
module.exports={
	"upload":upload,
	"download":download
}
