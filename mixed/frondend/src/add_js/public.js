/********/
//百度搜索自动推送代码
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https'){
   bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
  }
  else{
  bp.src = 'http://push.zhanzhang.baidu.com/push.js';
  }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();

window.checkErrorVue=function(data){
	var str=[
	         '<div id="ajaxyingying" style="position:fixed;left:0;top:0;width:100%;height:100%;z-index:100;background:#000000;filter:alpha(opacity=50); -moz-opacity:0.5;-khtml-opacity: 0.5;opacity: 0.5;"></div>',
	         '<div id="ajaxwardiv" style="width:384px;height:234px;border:solid 8px rgba(0,0,0,0.5);background:#ffffff;position:fixed;left:50%;top:50%;margin-left:-200px;margin-top:-125px;z-index:101;box-sizing:content-box;">',
	            '<p class="ajaxTop" style="overflow:hidden;width:384px;height:38px;border-bottom:solid 1px #d2d2d2;background:#e9e9e9;line-height:38px;box-sizing:content-box;">',
	              '<span style="display:block;float:left;font-size:12px;color:#000000;text-indent:20px;" id="ajaxtoptext"></span>',
	              '<span style="display:block;float:right;font-size:18px;color:#000000;margin-right:10px;cursor:pointer;" id="ajaxclose">×</span>',
	            '</p>',
	            '<div class="ajaxcenter" style="overflow:hidden;font-size:14px;line-height:20px;padding:68px 0;background:#ffffff;height:20px;box-sizing:content-box;">',
	               '<span style="display:block;float:left;margin-left:22px;width:20px;height:20px;overflow:hidden;" id="ajaxerrortip"></span>',
	               '<span style="display:block;float:left;margin-left:10px;" id="ajaxcentertext"></span>',
	            '</div>',
	            '<p class="ajaxbotton" style="width:384px;height:38px;border-top:solid 1px #d2d2d2;background:#e9e9e9;box-sizing:content-box;">',
	             '<input type="button" value="确定" id="ajaxqd" style="display:block;width:48px;height:26px;background:#f93433;border:solid 1px #e20000;color:#ffffff;font-size:12px;margin:6px 0 0 20px;cursor:pointer;"/>',
	            '</p>',
	         '</div>',
	         ].join('');
	var body=document.getElementsByTagName("body")[0];
	var node=document.getElementById("ajaxwardiv");
	var text="网络异常或数据加载失败，请稍候再试!";
	var tip="url(images/errortip.png) no-repeat -3px -3px";
	var text2="抱歉,您没有权限！";
	var tip2="url(images/errortip.png) no-repeat -27px -3px";
		//错误页判断  vue的ajax
	try{
		if(data.body.exceptionValue=='1'){
		//	window.location.href='/yich/User/User_error404.html';
			if(node){
				node.style.display="block";
			}else{
				body.innerHTML+=str;
			}
			document.getElementById("ajaxtoptext").innerHTML=text;
			document.getElementById("ajaxcentertext").innerHTML=text;
			document.getElementById("ajaxerrortip").style.background=tip;
			}			//权限判断  vue的ajax
		if(data.body.powerFlag=='1'){
			//window.location.href='/yich/User/User_errorlimit.html';
			if(node){
				node.style.display="block";
			}else{
				body.innerHTML+=str;
			}
			document.getElementById("ajaxtoptext").innerHTML=text2;
			document.getElementById("ajaxcentertext").innerHTML=text2;
			document.getElementById("ajaxerrortip").style.background=tip2;
		}
		if(data.body.flag=='该用户没有操作权限!'){
			//window.location.href='/yich/User/User_errorlimit.html';
			if(node){
				node.style.display="block";
			}else{
				body.innerHTML+=str;
			}
			document.getElementById("ajaxtoptext").innerHTML=text2;
			document.getElementById("ajaxcentertext").innerHTML=text2;
			document.getElementById("ajaxerrortip").style.background=tip2;
		}
	}catch(error){
		console.log('turn');
	}finally{
		console.log('continue');
	}
	ajaxclose();	
}
/********/
window.checkErrorAjax=function(data){
	var str=[
	         '<div id="ajaxyingying" style="position:fixed;left:0;top:0;width:100%;height:100%;z-index:100;background:#000000;filter:alpha(opacity=50); -moz-opacity:0.5;-khtml-opacity: 0.5;opacity: 0.5;"></div>',
	         '<div id="ajaxwardiv" style="width:384px;height:234px;border:solid 8px rgba(0,0,0,0.5);background:#ffffff;position:fixed;left:50%;top:50%;margin-left:-200px;margin-top:-125px;z-index:101;box-sizing:content-box;">',
	            '<p class="ajaxTop" style="overflow:hidden;width:384px;height:38px;border-bottom:solid 1px #d2d2d2;background:#e9e9e9;line-height:38px;box-sizing:content-box;">',
	              '<span style="display:block;float:left;font-size:12px;color:#000000;text-indent:20px;" id="ajaxtoptext"></span>',
	              '<span style="display:block;float:right;font-size:18px;color:#000000;margin-right:10px;cursor:pointer;" id="ajaxclose">×</span>',
	            '</p>',
	            '<div class="ajaxcenter" style="overflow:hidden;font-size:14px;line-height:20px;padding:68px 0;background:#ffffff;height:20px;box-sizing:content-box;">',
	               '<span style="display:block;float:left;margin-left:22px;width:20px;height:20px;overflow:hidden;" id="ajaxerrortip"></span>',
	               '<span style="display:block;float:left;margin-left:10px;" id="ajaxcentertext"></span>',
	            '</div>',
	            '<p class="ajaxbotton" style="width:384px;height:38px;border-top:solid 1px #d2d2d2;background:#e9e9e9;box-sizing:content-box;">',
	             '<input type="button" value="确定" id="ajaxqd" style="display:block;width:48px;height:26px;background:#f93433;border:solid 1px #e20000;color:#ffffff;font-size:12px;margin:6px 0 0 20px;cursor:pointer;"/>',
	            '</p>',
	         '</div>',
	         ].join('');
	var body=document.getElementsByTagName("body")[0];
	var node=document.getElementById("ajaxwardiv");
	var text="网络异常或数据加载失败，请稍候再试!";
	var tip="url(../images/errortip.png) no-repeat -3px -3px";
	var text2="抱歉,您没有权限！";
	var tip2="url(../images/errortip.png) no-repeat -27px -3px";
	//错误页判断  不是vue的ajax
	if(data){
		if(data.exceptionValue=='1'){
			//window.location.href='/yich/User/User_error404.html';
			if(node){
				node.style.display="block";
			}else{
				body.innerHTML+=str;
			}
			document.getElementById("ajaxtoptext").innerHTML=text;
			document.getElementById("ajaxcentertext").innerHTML=text;
			document.getElementById("ajaxerrortip").style.background=tip;
		}
		//权限判断  不是vue的ajax
		if(data.powerFlag=='1'){
			//window.location.href='/yich/User/User_errorlimit.html';
			if(node){
				node.style.display="block";
			}else{
				body.innerHTML+=str;
			}
			document.getElementById("ajaxtoptext").innerHTML=text2;
			document.getElementById("ajaxcentertext").innerHTML=text2;
			document.getElementById("ajaxerrortip").style.background=tip2;
		}
		if(data.flag=='该用户没有操作权限!'){
			//window.location.href='/yich/User/User_errorlimit.html';
			if(node){
				node.style.display="block";
			}else{
				body.innerHTML+=str;
			}
			document.getElementById("ajaxtoptext").innerHTML=text2;
			document.getElementById("ajaxcentertext").innerHTML=text2;
			document.getElementById("ajaxerrortip").style.background=tip2;
		}
	}
	ajaxclose();
}
function ajaxclose(){
	if(document.getElementById("ajaxclose") && document.getElementById("ajaxqd")){
	document.getElementById("ajaxclose").onclick=ajaxclose;
	document.getElementById("ajaxqd").onclick=ajaxclose;
	function ajaxclose(){
		var body=document.getElementsByTagName("body")[0];
		var yy=document.getElementById("ajaxyingying");
		var k=document.getElementById("ajaxwardiv");
		body.removeChild(yy);
		body.removeChild(k);
		history.go(-1);
	};
	}
};
window.isEmptyObject=function(e) {  
    var t;  
    for (t in e)  
        return !1;  
    return !0  
} 
//-11111111- 转成11111111
window.toNormalNumber = function(landline_tel){
	if(!landline_tel)
		return '';
	if(landline_tel.charAt(0) == '-'){
		landline_tel = landline_tel.substring(1);
	}
	if(landline_tel.charAt(landline_tel.length-1) == '-'){
		landline_tel = landline_tel.substring(0, landline_tel.length-2);
	}
	return landline_tel;
}

function Stringlength(str,size){
  	var name='';
  	var b=0;
  var re=/[\u4E00-\u9FA5]|\s/;
  var bb=0;
  if(str.match(re)){
   var aa=str.match(re);
   bb=aa.length;
  }
  var numstr=bb*0.5+(str.length-bb);
  for(var h=0;h<str.length;h++){

           if(!re.test(str[h])){
                 b+=0.5*1;
           }else{		
           	b+=1*1;
           }
           
           if(b<=size){
           	name+=str[h];
           	
           }else{
           
           }
      }
  return name;
};    
var name='';
   $(function(){   
   	name='';
//top
   	$(function(){
   		//top_size();
   	})
   
 	function top_size(){
 		var name=$.trim($(".yhm_k").text());
 		if(!name){
 			$(".yhm_k").text("请登录");
 			/*$(".yhm_k").css({display:"block",cursor:"pointer"});
 			$(".a_login").css("display","none");
 			$(".list_dlxl").css("display","none");*/
 		}
 		else{
 			$(".list_dlxl").css("display","block");
    	    //用户名输入字节控制
		    var login_name=$(".a_login").children("span").text();
		    //add(login_name);
		    var h=Stringlength(login_name,7);

		    $(".a_login").children("span").text(h);
 		}
		
   	};
 //nav选中
/*select_nav();
function select_nav(){
	var l=(window.location.href).split("/");
	var f=l[l.length-1];
	$(".mian_left").find("a").each(function(){
		var nav=$(this).attr("href");
		if(nav){
			var v=$(this).attr("href").split("/");
			var vv=v[v.length-1];
			if(f.indexOf(vv)!=-1){
				$(this).css("color","red");
			}else if(f.indexOf("OrderQuery")!=-1){
				$(".mian_left dd").first().find("a").css("color","red");
			}else if(f.indexOf("isConfirmPay?option=2")!=-1){
				$(".or_zhifu").css("color","red");
			}
		}
		
	});
};*/
//leftnav 红色
   	function lightselect(){
   		var l=window.location.href;
   		$('#left_index dd a').each(function(){
   			if(l.indexOf($(this).attr("href"))!==-1){
   				$(this).css('color','#e20000');
   			}
   		});
   	}
   	lightselect();
//search
    search()
    function search(){
    	var src=$(".shopico").text();
    	$(".userlog_img").attr("src",src);
    	var name=$(".shopName").text();
    	$(".top_dplk").text(name);
    };
    

function nav2(){
    	
    	$(".fiv_navdlthree").each(function(){
			$(this).siblings("a").prepend("<i>");
		});
    	$(".nav").find("ul").children("li").not(".fix_nav").remove();
    	var str="";
    	if($(".menuList").length>0){
        	$(".menuList").each(function(){
        		str+='<li><a href="">'+$(this).text()+'</a></li>';
        	});
        	$(".nav").find("ul").append(str);
        }else{
       	 $.ajax({
  			type : "post",
  			url : "/yich/getShopNav",
  			 contentType: "application/json,charset=utf-8",
  			dataType : "json",
  			success : function(data) {
  				window.checkErrorAjax(data);
	  			if(data && data!=null && data !=undefined){
	  				$(".dpindex_mktj").css("display","none");
	  				var str='';
	  				for(var snav=0;snav<data.shopNav.shopNavClass.length;snav++){
	  					str+='<li><a href='+1212+'>'+data.shopNav.shopNavClass[snav].content+'</a></li>';
	  			    };
	  				$(".nav").find("ul").children("li").not(".fix_nav").remove();
	  				$(".nav").find("ul").append(str);
	  			};
  			},
  			
  			error : function(err) {
  			}
  		}); 	
     }
    	
    }
    
  
 //left
     nav_left()
     function nav_left(){
    	 if(isFF()){
    		 $(".dlleft_nav").children("dd").each(function(i,a){
    	 			var height=$(this).children("ul").height();
    	               $(this).children(".dd_listxian").css({
    	               	"height":(height-32)+"px",
    	               	"top":15+'px'
    	               });
    	               $(this).children(".dd_listxian").addClass("nohandle");
    	 		});
    	 }else if(isChrome()){
    		 $(".dlleft_nav").children("dd").each(function(i,a){
    	 			var height=$(this).children("ul").height();
    	               $(this).children(".dd_listxian").css({
    	               	"height":(height-31)+"px",
    	               	"top":16+'px'
    	               });
    	               $(this).children(".dd_listxian").addClass("nohandle");
    	 		});
    	 }
      	
      	
      };
     //判断什么浏览器解决兼容问题
      function isFF(){
          return navigator.userAgent.indexOf("Firefox")!=-1;
      }
      function isChrome(){
          return navigator.userAgent.indexOf("Chrome") > -1;
      }
      
      
      
	 $(document).on("click",".search li",function(){
	 	$(".sear_liactv").removeClass("sear_liactv");
	 	$(this).addClass("sear_liactv");
	 });

	 var navl=$(".nav").find("li").length;
	 var navliw=$(".nav").find("li").outerWidth(true);
	// $(".nav").find("ul").css("width",navl*navliw+"px");
//首页关于蚁巢left
	/* $('.pub_left li').click(function(){
			
			var index = $(this).index();
			$(this).addClass('ch_back').siblings().removeClass('ch_back');
			$(this).find('a').addClass('ch_color').closest('li').siblings().find('a').removeClass('ch_color');
			$(this).find('i').addClass('ch_pointer').closest('li').siblings().find('i').removeClass('ch_pointer');
		});
	 */
	 
	//nav选中
selectOrderNav();
 function selectOrderNav(){
 	var l=(window.location.href).split("/");
 	var f=l[l.length-1];
 	$(".pub_left").find("a").each(function(){
 		var nav=$(this).attr("href");
 		if(nav){
 			var v=$(this).attr("href").split("/");
 			var vv=v[v.length-1];
 			if(f.indexOf(vv)!=-1){
 				$(this).addClass('ch_back');
 				$(this).addClass('ch_color');
 				$(this).find('i').addClass('ch_pointer');
 			}
 		}
 		
 	});
 };
 //top
	$(document).on("mouseover",".my_sh",function(){
       $(this).css({
    	   "border-color":"#cccccc",
    	   "background":"#ffffff"
       });
       $(this).children(".over_a").children("i").css("background","url(../images/topxl.png) no-repeat");
       $(this).children(".over_a").children("span").css("color","#e20000")
       $(this).find("dl").css("display","block");
	});
	$(document).on("mouseout",".my_sh",function(){
       $(this).css({
    	   "border-color":"#e9e9e9",
    	   "background":"#e9e9e9"
       });
       $(this).children(".over_a").children("i").css("background","url(../images/topxl.png) no-repeat");
       $(this).children(".over_a").children("span").css("color","#777777")
       $(this).find("dl").css("display","none");
	});
    
    $(document).on("mouseover",".login_name",function(){
    	$(this).css({
    		"border-color":"#cccccc",
    		"background":"#ffffff"
    	});
    	$(this).children(".a_login").children("i").css("background","url(../images/topxl.png) no-repeat");
    	$(this).children(".a_login").children("span").css("color","#e20000")
    	$(this).find("dl").css("display","block");
    });
    $(document).on("mouseout",".login_name",function(){
    	$(this).css({
    		"border-color":"#e9e9e9",
    		"background":"#e9e9e9"
    	});
    	$(this).children(".a_login").children("i").css("background","url(../images/topxl.png) no-repeat");
    	$(this).children(".a_login").children("span").css("color","#777777")
    	$(this).find("dl").css("display","none");
    });
  
	
//左侧菜单
		$(document).on("mouseover",".dlleft_nav dd ul li",function(){
			$(this).children("a").children("span").css("background","none");
			$(this).children("a").children("span").append("<img src='../images/tou4.png' class='tou_yuan'>");
		})
		$(document).on("mouseout",".dlleft_nav dd ul li",function(){
            $(this).children("a").children("span").children(".tou_yuan").remove();
			$(this).children("a").children("span").css("background","url(../images/tou3.png) no-repeat left center");
		});

	/*$(window).load(function(){
		$(".mian_left").height($(".mian").outerHeight()+"px");
	});	*/
	
//是否显示未处理订单
	
	if($('.dlleft_nav .nohandle1').text()!=0){
		$('.dlleft_nav .nohandle1').addClass('nohandle');
	}else{
		$('.dlleft_nav .nohandle1').removeClass('nohandle');
	
	}
	if($('.dlleft_nav .nohandle2').text()!=0){
		$('.dlleft_nav .nohandle2').addClass('nohandle');
	}else{
		$('.dlleft_nav .nohandle2').removeClass('nohandle');
	
	}
	
	
//图片加载


	showImg()
//	$(document).on("keyup",".search_text",function(){
//		var params=$(".search_text").val();
//		
//		   $.ajax({
//					type : "post",
//					url : "/yich/searchAjaxServlet",
//					contentType:"application/json,charset=utf-8",
//					dataType:"json",
//					data:"{\"text\":\""+params+"\",\"opt\":\""+myIndex.index+"\"}",
//					success : function(data) {
//						console.log(data);
//					},
//					error : function() {
//					}
//		});
//}); 
	
	//********************topLogin********************//	 
	
	 $('.login_personal').on("click",function(){
		 var thisNum= 1;
		 topLoginAjax(thisNum)
	 });
	 $('.login_banding').on("click",function(){
		 var thisNum= 2;
		 topLoginAjax(thisNum)
	 });
	 $('.login_changePwd').on("click",function(){
		 var thisNum= 3;
		 topLoginAjax(thisNum)
	 });
	/* $('.login_out').on("click",function(){
		 var thisNum= 4;
		 topLoginAjax(thisNum)
	 });*/
	 $('.login_cailu').on("click",function(){
		 var thisNum= 5;
		 topLoginAjax(thisNum)
	 });
	 $('.login_store').on("click",function(){
		 var thisNum= 6;
		 topLoginAjax(thisNum)
	 });
	 $('.login_newGoods').on("click",function(){
		 var thisNum= 7;
		 topLoginAjax(thisNum)
	 });
	 $('.login_sale').on("click",function(){
		 var thisNum= 8;
		 topLoginAjax(thisNum)
	 });
	 $('.user_log').on("click",function(){
		 var thisNum=10;
		 topLoginAjax(thisNum)
	 });
	 $('.shop_log').on("click",function(){
		 var thisNum= 11;
		 topLoginAjax(thisNum)
	 });
	 function topLoginAjax(num){
		 $.ajax({
				type:"post",
				contentType:"application/json,charset=utf-8",
				url:"/yich/isLogin?option="+num+"",
				dataType: "json", 
	         success: function(data) {
	        	 window.checkErrorAjax(data);
	        	$('.flag_url').text(data.option);
	        	if(data.flag == 0){
        	    	window.location.href="/yich/link";
            }else if(data.flag == 1){
            	if(data.option==11){//点击仓储 
    	    		if(data.irn=='O'||data.irn=='C'){
    	   	    		window.location.replace('/yich/storageCenterDataServlet');		
    	   	    	}else{
    	   	    		window.location.href='/yich/Storage/Storage_enter.html';  
    	   	    	}
    	    	}else{//点击商户
    	    		window.location.href=data.url;
    	    	}
   	       }else if(data.flag == 2){
	    	   if(data.option==11){//点击仓储 
	   	    		window.location.replace('/yich/storageCenterDataServlet');		
	    	   }else{//点击商户
	    		   window.location.href=data.url;
	    	   }
   	       }else if(data.flag == 3){
   	    	   window.location.href=data.url;
       	      }
           
           },
       error:function(err){
       	
           },
			});
	 }	

   });
   
	//全部宝贝列表
   list_down();
	function list_down(){
		if($(".div_leimulist").length>0){
			$(".div_leimulist").each(function(){
				if($(this).children(".leimu_down").length==0){
					 $(this).append('<span class="leimu_down span_down"></span>'); 
				}
			});
			};	

	
			 
		 setTimeout(function(){
			 $(".div_leimulist").each(function(){
					var ul_h=$(this).children("ul").height();
					  if(ul_h>34){
					   $(this).children(".leimu_down").css("display","block");
					  }
			});
		 },300);
	};
	 $(document).on("click",".leimu_down",function(){
		   if($(this).hasClass("span_down")){
		    var h=$(this).siblings("ul").height();
		    $(this).closest(".div_leimulist").css("height",h+"px");
		    $(this).removeClass("span_down").addClass("span_up")
		   }
		   else if($(this).hasClass("span_up")){
		 $(this).closest(".div_leimulist").css("height",34+"px");
		    $(this).removeClass("span_up").addClass("span_down");
		   }
		 });
   function showImg(){
$(".loading_bg").each(function(){
	var src=$(this).children("img").attr("data-ks-lazyload");
	if(src && ($(this).offset().top<$(window).scrollTop()+$(window).height()-100) && ($(this).offset().top+$(this).outerHeight()-100)>$(window).scrollTop()){
      $(this).children("img").attr("src",src);
      $(this).children("img").removeAttr("data-ks-lazyload");
	}

});
};
	
$(window).scroll(function(){
	showImg();
});
$(window).resize(function(){
	showImg();
});


//所有分类下拉
$(document).on("mouseover",".li_allfenl",function(){
	$(this).children(".fiv_navdltwo").stop(true).slideDown(300);
	
});
$(document).on("mouseover",".fiv_navdltwo dd",function(){
	$(".fiv_navdltwo").css("display","block");
	$(this).children(".fiv_navdlthree").css("display","block");
	$(this).closest("dd").siblings("dd").children(".fiv_navdlthree").css("display","none");
})
$(document).on("mouseout",".li_allfenl",function(){
	$(".fiv_navdltwo,.fiv_navdlthree").css("display","none");
});

//*******************搜索**********************//


$(document).on("click",function(){     //点击显示框外隐藏显示框并移除内部数据
	$('.search_content').css("display","none");
	$('.search_content').children().remove();
})
$('.search_content').click(function(event){  //点击显示框内，组织调用隐藏显示框方法
	event.stopPropagation();//阻止事件向上冒泡
})

$(document).on("keyup",".search_text",function(){
	var params=$(".search_text").val();
	searchContent.string = params;
	searchContent.searchAjax();
});
 /*$(".search_sub").on("click",function(){*/  //点击搜索按钮请求Ajax
$(document).on("click",".search_sub",function(){
	 var string = searchContent.string;
	 var index = searchContent.index;
	 var url="/yich/clickCata?cataopt=three&text="+string+"&opt="+index;
    window.open(url);	 
 })

 $(document).on("click",".search li",function(){   //选择搜索类型（关键字、货号、仓储）
	 searchContent.index = $(this).index();
 });

function searchText(){     //点击显示框把数据显示到搜索栏里并请求ajax
 $('.search_content').find('li').click(function(){
		var text = $(this).text();
		$(".search_text").val(text);
		searchContent.string = text;
		searchContent.searchAjax();
	})
 }

 function searchDisplay(){   //显示、隐藏显示框
		var content = $('.search_content').html();
		if(content!=''){
			$('.search_content').css("display","block");
		}else{
			$('.search_content').css("display","none");
		}
	};
function searStyle(){
	$('.search_content li').css({
		lineHeight:"28px",
		fontSize:"14px",
		paddingLeft:"8px",
		cursor:"pointer",
	})
	$('.search_content li').hover(function(){
		$(this).css("background","#ddd");
	},function(){
		$(this).css("background","#fff");
	})
}
	 var searchContent = {
			 index:0,
			 string:'',
			 searchAjax:function(){
				   $.ajax({
					type : "post",
					url : "/yich/searchAjaxServlet",
					contentType:"application/json,charset=utf-8",
					dataType:"json",
					data:"{\"text\":\""+this.string+"\",\"opt\":\""+this.index+"\"}",
					success : function(data) {
						window.checkErrorAjax(data);
						var str='';
						for(var i in data.keydownlist){
							 str += '<li>'+data.keydownlist[i]+'</li>';
						}
						$('.search_content').html(str);
						str='';
						searStyle()
						searchDisplay();
						searchText();
						
					},
					error : function() {
					}
				   });
			 },
			 
	 }
	 
	 $.getJson=function(){     //获取头部search转json的jquery插件函数
		 var str=window.location.search.slice(1);
	    	str=str.split('&');
	    	for(var i=0,json=[];i<str.length;i++){
	    		var arr=str[i].split('=');
	    		for(var j=0;j<arr.length;j++){
	    			arr[j]='"'+arr[j]+'"';
	    		}
	    		json.push(arr.join(':'));
	    	}
	    	json=json.join(',');
	    	json='{'+json+'}';
	    	json=JSON.parse(json);
	    	return json;
	 }
	 window.getDistenceTime=function(time){//方法为毫秒数转时间time为差值毫秒数// 两种输出格式00天00时 00分  00时 00分00秒
			if(isNaN(time)){return '00时00分00秒';}
			if(time<=0){return '00时00分00秒';}
			var s=parseInt(time/1000%60);
			var m=parseInt(time/1000/60%60);
			var h=parseInt(time/1000/60/60%24);
			var day=parseInt(time/1000/60/60/24);
			day=time<1000?0:day;
			s=String(s);
			m=String(m);
			h=String(h);
			day=String(day);
			s=s.length>1?s:'0'+s;
			m=m.length>1?m:'0'+m;
			h=h.length>1?h:'0'+h;
			if(day>0){
				return (day.length>1?day:'0'+day)+'天'+h+'时'+m+'分';
			}else{
				return h+'时'+m+'分'+s+'秒';
			}
		}	 
	 
	//取采购单数量
	  window.caigoudancont=function(){
	 	$.ajax({
	 		type : "post",
	 		url : "/yich/PurchaseCount",
	 		contentType: "application/json,charset=utf-8",
	 		success : function(data) {
	 			window.checkErrorAjax(data);
	 			if(data && typeof(data.count)!='undefined'){
					 $("#cgdcount").text("("+data.count+")");
				}
	               },
	 		
	 		error : function(err) {
	 		}
	 	});
	 };
	 /*window.caigoudancont();*/