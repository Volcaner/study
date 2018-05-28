<template>
 <div id="top">
	<div class="top">
		<div class="top_center">
			<div class="topmian_left">
				<span class="span_hy">欢迎来到蚁巢</span>
				<!-- <div class="yhm_k" style="display:inline-block; position: relative; width:100px; padding:0 10px; text-align:center; cursor:pointer; "></div> -->
				<a href="/yich/link" class="yhm_k" style="display:block; float:left; padding:0 10px; text-align:center; cursor:pointer;color:#777777; display:none;">{{ name }}</a>
				<span style="display:block;float:left;width:1px;height:12px;margin:12px 8px 0 8px;background:#777777;display:none;" class="leftxian"></span>
				<a href="/yich/RegisterLink"　style="display:none;float:left;line-height:36px;font-size:12px;color:#777777;" class="yhm_zctop">注册</a> 
				<div class="login_name " style="display:none">
					<a :href="link" class="a_login"> <span title="" class="username" style="text-align: initial;width: initial;height: initial;position: initial;color:#777777;max-width:82px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis; ">{{ nikename }}</span>
						<i></i>
					</a>
					
					<div class="list_dlxl">
							<dl>								
								<dd>
								
								<!--  #if($!{loginmark}=="1") -->
							     <a v-if='tuic' class="login_out" style="cursor:pointer;color:#777777;" href="/yich/TaobaoAuthorizeServlet?option=1"> <i class="tc_i"></i> <span>退出</span></a>
							    <!-- #else -->
					    	     <a v-else class="login_out" style="cursor:pointer;color:#777777;" href="/yich/signOut"> <i class="tc_i"></i> <span>退出</span></a>
							    <!-- #end -->
								</dd>
							</dl>
					</div>
				</div>
				   <!-- #if($!{loginmark}=="1") -->
				 	<!-- <a v-if='tuic' href="/yich/TaobaoAuthorizeServlet?option=1" class="a_out"> 退出</a> -->
					<!--  #else -->
			    	<!--<a v-else href="/yich/signOut" class="a_out">退出</a> -->
					 <!-- #end -->
			</div>
			<div class="topmian_right">
				<a href="/yich/index" class="top_ra">蚁巢首页</a>
				<span class="fengexian"></span>
				<div class="my_sh">
					<a href='javascript:;' class="over_a user_log"> <span style="color:#777777;">我是商户</span> <i></i>
					</a>
					<dl>
						<dd>
							<a  class="login_cailu" style="cursor:pointer;color:#777777;">采录库</a>
						</dd>
						<dd>
							<a  class="login_store" style="cursor:pointer;color:#777777;">收藏的仓储</a>
						</dd>
					</dl>
				</div>
                <span class="fengexian"></span>
				<div class="my_sh">
					<a href='javascript:;' class="over_a shop_log"> <span style="color:#777777;">我是仓储</span> <i></i>
					</a>
					<dl>
						<dd>
							<a class="login_newGoods" style="cursor:pointer;color:#777777;">发布新商品</a>
						</dd>
						<dd>
							<a  class="login_sale" style="cursor:pointer;color:#777777;">在售的商品</a>
						</dd>
					</dl>
				</div>
				<span class="fengexian"></span>
				<a href="/yich/User/User_purchase.html" class="top_ra">采购单<span style="color:#e20000;" id="cgdcount">(0)</span></a>
				<span class="fengexian"></span>
				<a href="/yich/wapshow/src/html/yichAssistant.html" class="top_ra">蚁巢助手</a>
				<span class="fengexian"></span>
				<a href="/yich/ProsceniumServlet" class="top_ra">关于蚁巢</a>
				<span class="fengexian"></span>
				<a href="/yich/User/User_matters.html" class="top_ra">常见问题</a>
			</div>
		</div>
	</div>
</div>
</template>
<script>
export default{ 
	data(){   
        return {  
           name:'',//用户名
           nikename:'',//昵称
           link:'',
           sh:'',//商户
           cc:'',//仓储
           tuic:''//退出状态
          }  
      },
      computed:{
    	 // ...mapState(['count','list']),
      },
      beforeMount:function(){
    	  this.$emit(this.topajax());
    	  window.caigoudancont();
      },
      methods:{
         topajax:function(){
	  	 	   this.$http.post('/yich/PublicInfo').then((response) => {
	  	 		window.checkErrorVue(response);
			       this.nikename=response.data.nickName;
			       this.name=response.data.name;
			   setTimeout(function(){
					if($.trim($('.username').text()) == ""){
						$('.login_name').hide();
						$('.yhm_k').text('请登录');
						$('.yhm_k').show();
						$('.a_out').hide();
						$(".yhm_zctop").css("display","inline-block");
					}else {
						$('.yhm_k').hide();
						$('.login_name').show();
						$('.a_out').show();
						$(".yhm_zctop").css("display","none");
					}
			   },0);
			       this.link='/yich/myShopServlet?supshopId='+response.data.userId;
			       this.sh='/yich/LoginServlet?nick='+response.data.nickName+'&power=N';
			       this.cc='/yich/LoginServlet?nick='+response.data.nickName+'&power=Y';
			       if(response.data.loginmark!=0){
			    	   this.tuic=true;
			       }else{
			    	   this.tuic=false;  
			       }
	   			  }, (response) => {
	   		 });
         },
      },
      watch:{
  
      },

    } 
</script>
<style scoped>
.a_out{cursor:pointer;color:#777777;}
.a_out:hover{color:#e20000;}
.top{width:100%;height:36px;background:#e9e9e9;}
.top_center{width:1200px;margin:auto;height:36px;font-size:12px;color:#000000;line-height:36px;}
.top_center a{color:#777777;}
.topmian_left{float:left;}
.span_hy{float:left;display:block;color:#777777;}
.login_name{float: left;margin:0 10px;height:36px;position:relative;width:102px;border:solid 1px #e9e9e9;border-bottom:none;}
.login_name dl{display:none;position:absolute;left:-1px;top:35px;z-index:30;background:#ffffff;width:100px;border:solid 1px #cccccc;border-top:none;}
.login_name dd a{display:block;overflow:hidden;line-height:36px;color:#6c6c6c;}
.login_name dd a:hover{background:#e8e8e8;color:#e20000;}
.login_name dd a span{display:block;float:left;}
.login_name dd i{display:block;float:left;margin:10px 5px 0 5px;}
.login_name .grzl_i{width:16px;height:16px;overflow:hidden;background:url(../../images/t2.png) no-repeat -333px 0;}
.login_name .zhbd_i{width:18px;height:16px;overflow:hidden;background:url(../../images/t2.png) no-repeat -454px 0;}
.login_name .xgmm_i{width:16px;height:16px;overflow:hidden;background:url(../../images/t2.png) no-repeat -317px 0;}
.login_name .tc_i{width:14px;height:14px;overflow:hidden;background:url(../../images/t2.png) no-repeat -210px 0;}

.login_name a.a_login{display:block;overflow:hidden;}
.login_name a.a_login span{display:block;float: left;width: 82.5%; overflow: hidden; text-overflow: ellipsis;margin-left:5px;white-space:nowrap;}
.login_name a.a_login i,.my_sh i{display:block;margin:15px 0 0 6px;float:left;width:6px;height:5px;overflow:hidden;background:url(../../images/topxl.png) no-repeat;}
.topmian_right{float:right;}
.top_ra{float:left;display:block;padding:0 10px;color:#777777;}
.top_ra:hover{color:#e20000;}
.my_sh{float:left;width:80px;height:36px;position:relative;border:solid 1px #e9e9e9;border-bottom:none;}
.my_sh a{display:block;overflow:hidden;}
.my_sh span{display:block;float:left;margin-left:10px;}
.my_sh dl{display:none;position:absolute;left:-1px;top:35px;z-index:30;width:80px;border:solid 1px #cccccc;background:#ffffff;border-top:none;}
.my_sh dl a{display:block;padding:0px 9px;line-height:36px;color:#6c6c6c;}
.my_sh dl a:hover{background:#e8e8e8;color:#e20000;}
.fengexian{width:1px;height:12px;margin:12px 5px 0 5px;background:#777777;display:block;float:left;}
</style>
