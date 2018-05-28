<!-- 
	需要给vuex加一个是模态框是否显示的bool值变量isModalDisplay,父组件也用这个变量判断是否显示模态框
	isModalDisplay:false,
	title:标题,
	tips:提示语,
	sureBtnTxt:确定按钮文案,
	cancelBtnTxt:取消按钮文案,
	v-on:confirm="":确定回调,
	cancelClick:取消回调,
	cancelClose:模态框消失,初始化
-->
<template>
	<div id="modal">
		<div class="modal_back"></div>
		<div class="modal_con">
			<div class="modal_title"><span>{{title}}</span><i @click="ccloseModal"></i></div>
			<div class="content">
				<slot><span class="modal_tips" v-html="tips"></span></slot>
			</div>
			<div class="modal_opertion">
				<input class="modal_sure" type="button" :value="sure?sure:'确定'" @click="sureModal">
				<input class="modal_cancel" type="button" :value="cancel?cancel:'取消'" @click="closeModal">
			</div>
		</div>
	</div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex';
	export default {
		props:['title','tips','sure','cancel'],
		data(){
			return{
				
			}
		},
		computed:{
			...mapState(["isModalDisplay"]),
		},
		methods:{
			ccloseModal:function(){
				if(this._events.cancelClose){
					this.$emit('cancelClose');
				}
				this.$store.state.isModalDisplay = false;
			},
			closeModal:function(){
				if(this._events.cancelClick){
					this.$emit('cancelClick');
				}else{
					this.$store.state.isModalDisplay = false;
				}
			},
			sureModal:function(){
				this.$emit('confirm');
			},
		}
	}
</script>
<style lang="less" scoped>
@import '../../css/public.less';
*{
	box-sizing:border-box;
}
.modal_back{
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0px;
	top: 0px;
	opacity: 0.5;
	background: #000000;
	z-index: 1000;

}
.modal_con{
	position: fixed;
	width: 416px;
	height: 290px;
	border:8px solid #666666;
	left: 50%;
	top: 50%;
	margin-left: -208px;
	margin-top: -145px;
	background: #ffffff;
	z-index: 1001;
}
.modal_title{
	height:38px;
	width:100%;
	background:#e9e9e9;
	padding-left:20px;
	span{
		line-height:38px;
		font-size:14px;
		font-weight:bold;
	}
	i{
		float: right;
		width: 13px;
		height: 13px;
		display: block;
		margin: 10px 10px 0px 0px;
		cursor: pointer;
		background: url(../../images/sgrr_spri.png)no-repeat;
		background-position: -15px -0px;
	}
}
.content{
	width:100%;
	height:171px;
	overflow: hidden;
	padding:0 44px;
	border-top:1px solid #d2d2d2;
	border-bottom:1px solid #d2d2d2;
	display: box;
  	display: -webkit-box;
  	display: -moz-box;
  	display: -ms-flexbox; 
  	display: -webkit-flex;
  	display: flex;
  	-webkit-justify-content: center;
  	-moz-justify-content: center;
  	-ms-justify-content: center;
  	-o-justify-content: center;
 	justify-content: center;
	flex-direction:column;
	-webkit-flex-direction: column;
  	-moz-flex-direction: column;
  	-ms-flex-direction: column;
  	-o-flex-direction: column;
  	flex-direction: column;
}
.modal_tips{
	display:inline-block;
	font-size:12px;
	line-height:18px;
	width:312px;
}
.modal_opertion{
	height:65px;
	width:100%;
	background:#e9e9e9;
}
.modal_sure{
	margin:17px 12px 0 21px;
	/* width:50px; */
	height:28px;
	
	border:1px solid #e20000;
	border-radius:3px;
	color:#fff;
	font-size:14px;
	cursor:pointer;
	padding: 0px 10px;
	max-width:100px;
	background: -webkit-linear-gradient(#fe3f3f, #ec1c1c);
    background: -o-linear-gradient(#fe3f3f, #ec1c1c);
    background: -moz-linear-gradient(#fe3f3f, #ec1c1c);
    background: linear-gradient(#fe3f3f, #ec1c1c);
}
.modal_cancel{
	margin-top:17px;
	/* width:50px; */
	height:28px;
	border:1px solid #90908f;
	border-radius:3px;
	color:#212121;
	font-size:14px;
	cursor:pointer;
	padding: 0px 10px;
	max-width:100px;
	background: -webkit-linear-gradient(#fdfdfd, #cfcfcf);
    background: -o-linear-gradient(#fdfdfd, #cfcfcfcf);
    background: -moz-linear-gradient(#fdfdfd, #cfcfcf);
    background: linear-gradient(#fdfdfd, #cfcfcf);
}
</style>