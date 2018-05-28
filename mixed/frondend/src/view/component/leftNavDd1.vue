<template>
	<div id="left" class="alignment">
		<ul class="left_nav">
			<li><a href="">联系方式</a></li>
			<li><a href="">关于蚁巢</a></li>
			<li><a href="">蚁巢招商</a></li>
			<li><a href="">蚁巢招聘</a></li>
			<li><a href="">公告</a></li>
			<li><a href="">规则</a></li>
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