<template>
	<div id="left">
		<ul class="left_nav">
			<li><a href="/yich/Storage/Storage_accounts_manage.html?page=7" class="">公众号绑定</a></li>
			<li><a href="/yich/Storage/Storage_woaSetting.html" class="active">自定义菜单</a></li>
			<li><a href="/yich/wapshow/src/html/homePageDecoration.html" class="" target="_blank">首页装修</a></li>
			<li><a href="/yich/wapshow/src/html/companyShowModel.html" class="">企业秀</a></li>
			<li><a href="/yich/Storage/Storage_popularize.html" class="">公众号推广</a></li>
		</ul>
	</div>
</template>

<script type="text/javascript" charset="utf-8" defer>
	export default{
		data(){
			return {}
		},
	}
</script>

<style lang="less" scoped>
	@import '../../css/public.less';
	#left{
		background:#ffffff;
		min-height:unit(@leftMinheight,px);
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
				&.active{
				 	color:#e20000;
				} 
			}
		}
	}
</style>