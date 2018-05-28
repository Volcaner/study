<template>
	<div id="left" class="alignment">
		<ul class="left_nav">
			<li><a href="javascript:;" @click='changestate(1)' :class='{active:$store.state.page1}'>基础信息设置</a></li>
			<li><a href="javascript:;" @click='changestate(2)' :class='{active:$store.state.page2}'>登陆密码修改</a></li>
			<li><a href="javascript:;" @click='changestate(3)' :class='{active:$store.state.page3}'>交易密码设置</a></li>
			<li><a href="javascript:;" @click='changestate(4)' :class='{active:$store.state.page4}'>账户绑定</a></li>
			<li><a href="javascript:;" @click='changestate(5)' :class='{active:$store.state.page5}'>联系方式</a></li>
			<li><a href="javascript:;" @click='changestate(6)' :class='{active:$store.state.page6}'>收货地址</a></li>
		</ul>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			changestate:function(n){
				if(n==1){
					this.$store.state.page1=true;
					this.$store.state.page2=false;
					this.$store.state.page3=false;
					this.$store.state.page4=false;
					this.$store.state.page5=false;
					this.$store.state.page6=false;
				}
				if(n==2){
					this.$store.state.page1=false;
					this.$store.state.page2=true;
					this.$store.state.page3=false;
					this.$store.state.page4=false;
					this.$store.state.page5=false;
					this.$store.state.page6=false;
				}
				if(n==3){
					this.$store.state.page1=false;
					this.$store.state.page2=false;
					this.$store.state.page3=true;
					this.$store.state.page4=false;
					this.$store.state.page5=false;
					this.$store.state.page6=false;
				}
				if(n==4){
					this.$store.state.page1=false;
					this.$store.state.page2=false;
					this.$store.state.page3=false;
					this.$store.state.page4=true;
					this.$store.state.page5=false;
					this.$store.state.page6=false;
				}
				if(n==5){
					this.$store.state.page1=false;
					this.$store.state.page2=false;
					this.$store.state.page3=false;
					this.$store.state.page4=false;
					this.$store.state.page5=true;
					this.$store.state.page6=false;
				}
				if(n==6){
					this.$store.state.page1=false;
					this.$store.state.page2=false;
					this.$store.state.page3=false;
					this.$store.state.page4=false;
					this.$store.state.page5=false;
					this.$store.state.page6=true;
				}
			}
		}
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
</script>