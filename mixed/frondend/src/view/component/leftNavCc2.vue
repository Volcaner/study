<template>
	<div id="left" class="alignment">
		<ul class="left_nav">
			<li><a href="">应用服务</a></li>
			<li><a href="">促销中心</a></li>
		</ul>
	</div>
</template>
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
		}
	}
}

</style>
</script>