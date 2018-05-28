<template>
	<div id="left" class="alignment">
		<ul class="left_nav">
			<li><a :class="iscolor?hightcolor:''" href="/yich/Storage/Storage_data.html" >仓储资料</a></li>
			<!--<li><a href="/yich/turnz"  target="_blank">首页装修</a></li>-->
			<li><a href="/yich/PictureSpace"  target="_blank">图片空间</a></li>
			<li><a href="/yich/ShopClassrelationManage?page=1&choseFlag=1"  target="_blank">商品分类</a></li>
			<li><a @click="jump" >查看仓储</a></li>
		</ul>
	</div>
</template>
<script>
export default{
	data(){
		return{
			supShopId:window.location.href.split("supShopId=")[1]?window.location.href.split("supShopId=")[1]:'',
			iscolor:false,
			hightcolor:'hightcolor',
		}
	},
	methods:{
		jump:function(){
			window.open("/yich/myShopServlet?supshopId="+this.supShopId);
		},
		gethight:function(){
			var url = window.location.href;
			if(url.indexOf('Storage_data')>0){
				this.iscolor = true;
			}else{
				this.iscolor = false;
			}
		}
	},
	beforeMount:function(){
		this.$emit(this.gethight());
	},
}
</script>
<style lang="less" scoped>
@import '../../css/public.less';
#left{
	background:#ffffff;
	min-height:722px;
	float:left;
	width:unit(@leftWidth,px);
	li{
		.borderBottom(#e6e6e6,solid,1px);
		a{
			display:block;
			font-size:14px;
			color:#626262;
			height:44px;
			line-height:44px;
			 text-indent:45px;
			 cursor:pointer;
		}
		.hightcolor{
			color:#e20000;
		}
	}
}

</style>
</script>