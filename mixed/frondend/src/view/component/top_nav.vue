<template>
 <div id="nav">
	<div class="nav">
		<div>
			<ul style="width:100%;">
				<li class="fix_nav" style="text-align: center"><a @click="shopIndex">仓储首页</a></li>
				<li class="fix_nav" style="text-align: center"><a @click="shopIndex">所有分类</a></li>
				<li class="fix_nav" style="text-align: center"><a @click="shopfile">仓储档案</a></li>
        <li class="fix_nav" style="text-align: center"><a @click="fwScore">服务评分</a></li>
       	<li class="fix_nav" style="text-align: center"><a @click="clickToPmc">预存卡</a></li>
		       	<!-- <li class="fix_nav" style="text-align: center"  v-for=""><a @click="addKinds()">{{}}</a></li> -->
			</ul>
		</div>
	</div>
</div>
</template>

<script>
export default{ 
	data(){   
        return {  
         	supShopId:'',
          }  
      },
      beforeMount:function(){
    	  var href=((window.location.href).split("?"))[1];
    	  var arr=href.split("&");
    	  var obj={};
    	  for(var i=0;i<arr.length;i++){
    		  var a=arr[i].split("=");
    		  var key=a[0];
    		  var val=a[1];
    		  if(key=='supshopId'){
    			  obj['supshopId']=val;
    			  this.supShopId=val;
    			  break;
    		  }
    	  }
	 	   this.$http.post('/yich/ShopNavServlet',obj,{emulateJSON:true}).then((response) => {
	 		  window.checkErrorVue(response);
	 		  var navJson=response.body.nav;
	 		//导航
	 		 if(navJson){
	 		 	var nav=navJson.shopNavClass;
	 		 	var str='';
	 		 	for(var i=0;i<nav.length;i++){
	 		 		str+='<li style="text-align: center" class="fix_nav"><a href="/yich/clickNav?scnavId='+nav[i].scnavId+'&supshopId='+this.supShopId+'">'+nav[i].content+'</a></li>';
	 		 	}
	 		 $(".nav").find("ul").append(str);
	 		 }
    			  }, (response) => {
    		 });
      },
      methods:{
    	  shopIndex:function(){
    		  window.location.href="/yich/myShopServlet?supshopId="+this.supShopId;
    	  },
    	  shopfile:function(){
    		  window.location.href="/yich/Storage/Storage_FileManagement.html?supshopId="+this.supShopId;
    	  },
    	  fwScore:function(){
    		  window.location.href="/yich/Storage/Storage_ServiceScore.html?supshopId="+this.supShopId;
    	  },
        clickToPmc: function() {
          window.location.href="/yich/Storage/Storage_pmcPage.html?supshopId="+this.supShopId;
        }
      },
     components:{
     	
     	
	     }
    }  
</script>

<style type="text/css">
.nav{width:100%;height:32px;line-height:32px;background:#e20000;position:relative;}
.nav div{overflow:hidden;width:1200px;height:32px;margin:auto;position:relative;}
.nav ul{position:absolute;left:0;top:0;height:32px;}
.nav ul li{float:left;}
.nav ul li a{display:block;padding:0 45px;font-size:14px;color:#ffffff;}
.nav ul li a:hover{background:#ff2929; cursor:pointer;}
.nav ul li.n_actv a{background:#ff2929;}
</style>