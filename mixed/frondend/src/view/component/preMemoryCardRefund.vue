<!-- 预存卡-退款申请处理 -->
<template>
	<div class="pmcRefund">
		<ul class="pmc_tkTitle">
			<li>采购商昵称</li>
			<li>
				<select class="pmc_tkYCName" v-model="cpmcName">
					<option value="">全部预存卡</option>
					<option v-for="items in pmcNames" :value="items.pmcid">{{ items.name }}</option>
				</select>
			</li>
			<li>卡号</li>
			<li>折扣<i :class="sortSta === 'zk' ? hightlight : '' " @click="sortBtn1"></i></li>
			<li>剩余可退款金额(元)<i :class="sortSta === 'syj' ? hightlight : '' " @click="sortBtn2"></i></li>
			<li>申请退款时间<i :class="sortSta === 'tkt' ? hightlight : '' " @click="sortBtn3"></i></li>
			<li>操作</li>
		</ul>
		<ul class="pmc_tkCon">
			<li v-for="items in pmcList">
				<p><a class="pmc_tkName pmcUserName" :title="items.supshopName" @click="userJumpStore(items.shopId)">{{ items.supshopName }}</a><a v-if="items.wangwang" target="_blank" :href="setAwang(items.wangwang)">
<img border="0" :src="setImgwang(items.wangwang)" alt="和我联系" /></a></p>
				<p><a class="pmc_tkName" :title="items.pmcName" @click="nameJumpUrl(items.pmcNameId)">{{ items.pmcName }}</a></p>
				<p><a class="pmc_tkId" :title="items.pmcId" @click="IdJumpUrl(items.pmcNameId,items.pmcId)">{{ items.pmcId }}</a></p>
				<p>{{ items.discount }}</p>
				<p>{{ items.tkBalance }}</p>
				<p>{{ items.tkTime.split(' ')[0] }}<br>{{ items.tkTime.split(' ')[1] }}</p>
				<p>
					<span class="pmc_tkAgressBtn" @click="pmcAgressBtn(items.pmcId)">同意退款</span>
					<span class="pmc_tkRefuseBtn" @click="pmcRefuseBtn(items.pmcId)">拒绝退款</span>
				</p>
			</li>
		</ul> 
		<pmcTkModal v-if="isModalDisplay" :title='title' :tips='tips' :sure="sureBtnTxt" :cancel="cancelBtnTxt" v-on:confirm="modelConfirm" @cancelClick="modelCancel" @cancelClose="modelClose">
			
		</pmcTkModal>
	</div>
</template>
<script>
import pmcTkModal from '../component/pmcTkModal.vue';
import {mapState,mapMutations,mapActions} from 'vuex'
export default{
	props:["pmcNames","pmcList"],
	data(){
		return{
			sortSta:"tkt",
			hightlight:"hightlight",
			clickCell:'aggre',//aggre:同意退款，refuse:拒绝
			cpmcName:'',
			cpmcId:'',
			
			title:'',//提示框标题
			tips:'',//提示框说明
			sureBtnTxt:'',
			cancelBtnTxt:'',
			confirmSta:'',//模态款回调函数状态gopay:去支付，goclose:取消
		}
	},
	computed:{
		...mapState(["isModalDisplay"]),
	},
	methods:{
		...mapMutations(["pmcName","pmcOption"]),
		...mapActions(["starAjaxData"]),
		sortBtn1:function(){
			this.sortSta = "zk";
			this.pmcOption(2);
			this.$emit(this.starAjaxData());
		},
		sortBtn2:function(){
			this.sortSta = "syj";
			this.pmcOption(4);
			this.$emit(this.starAjaxData());
		},
		sortBtn3:function(){
			this.sortSta = "tkt";
			this.pmcOption(6);
			this.$emit(this.starAjaxData());
		},
		pmcAgressBtn:function(pmcId){
			this.clickCell = "aggre";
			this.$store.state.isModalDisplay = true;
			this.tips = '同意退款后,预存卡内剩余金额将直接退回至对方现金账户,确定同意退款吗？';
			this.title ='确定同意退款吗？';
			this.cpmcId = pmcId;
		},
		pmcRefuseBtn:function(pmcId){
			this.clickCell = "refuse";
			this.$store.state.isModalDisplay = true;
			this.tips = '拒绝退款后,对方可重新发起退款申请,建议您与采购商沟通,确定拒绝退款吗？';
			this.title ='确定拒绝退款吗？';
			this.sureBtnTxt='取消,再想想';
			this.cancelBtnTxt='拒绝退款';
			this.confirmSta='goclose';
			this.cpmcId = pmcId;
		},
		userJumpStore:function(shopId){
			window.open('/yich/User/User_FileManagement.html?userid='+shopId);
		},
		nameJumpUrl:function(pmcNameId){
			window.open('/yich/Storage/Storage_pmcDetail.html?pmcId='+pmcNameId);
		},
		IdJumpUrl:function(pmcId,pmcSoldNo){
			window.open('/yich/Storage/Storage_pmcCardNoRecord.html?pmcId='+pmcId+'&pmcSoldNo='+pmcSoldNo);
		},
		setAwang:function(src){
			return "http://www.taobao.com/webww/ww.php?ver=3&touid="+src+"&siteid=cntaobao&status=2&charset=utf-8";
		},
		setImgwang:function(src){
			return "http://amos.alicdn.com/realonline.aw?v=2&uid="+src+"&site=cntaobao&s=2&charset=utf-8";
		},
		modelConfirm:function(){
			var doState = "";
			if(this.confirmSta == ""){
				if(this.clickCell == "aggre"){
					doState = "S";
				}else if(this.clickCell == "refuse"){
					doState = "R";
				}
				this.$http.post('/yich/HandleRefundApplyServlet',{state:doState,prestore_card_sold_id:this.cpmcId,},{emulateJSON:true}).then((response) => {
					window.checkErrorVue(response);
					// 响应成功回调
					 if(response.data.flag == "1"){
						this.$emit(this.starAjaxData());
						this.$emit(this.modelClose());
					}else if(response.data.flag == "nomoney"){
						this.confirmSta = "gopay";
						this.tips = '现金账户余额不足，请充值后再同意退款申请！';
						this.title ='余额不足';
						this.sureBtnTxt = '前往充值';
						this.cancelBtnTxt = '取消';
					}else{
						this.$emit(this.modelClose());
						alert("操作失败，请稍后再试！")
					} 
				}, (response) => {
					// 响应错误回调
				});
			}else if(this.confirmSta == "gopay"){
				this.$store.state.isModalDisplay = false;
				window.location.href="/yich/User/User_cash.html";
			}else{
				this.$emit(this.modelClose());
			}
		},
		modelCancel:function(){
			if(this.confirmSta == "goclose"){
				this.confirmSta = '';//注意这个位置不要变动
				this.$emit(this.modelConfirm());
			}
			this.$emit(this.modelClose());
		},
		modelClose:function(){
			this.title='',//提示框标题
			this.tips='',//提示框说明
			this.confirmSta = '';
			this.sureBtnTxt = '';
			this.cancelBtnTxt = '';
			this.$store.state.isModalDisplay = false;
		},
		
	},
	watch:{
		cpmcName:function(val){
			this.pmcName(val);
			this.$emit(this.starAjaxData());
		},
	},
	components:{
		"pmcTkModal":pmcTkModal,
	}
}
</script>
<style lang="less" scoped>
.pmc_tkTitle{
	height: 36px;
	padding: 0px 24px;
	background: #f8f8f8;
	overflow: hidden;
	font-size:14px;
	color: #292929;
	li{
		float: left;
		width: 150px;
		line-height: 36px;
		text-align: center;
		.pmc_tkYCName{
			width: 140px;
			height: 28px;
			border:1px solid #d2d2d2;
			background: transparent;
		}
		i{
			position: relative;
		    display: inline-block;
		    width: 12px;
		    height: 12px;
		    background: url(../../images/h_paixu.png) no-repeat;
		    background-position: -4px -4px;
		    margin-left: 3px;
		    top: 2px;
		    cursor: pointer;
		}
		.hightlight{
			background-position: -21px -4px !important;
		}
	}
	li:nth-child(1){
		text-align: left;
	}
	li:nth-child(4){
		width: 80px;
	}
	li:nth-child(6){
		width: 120px;
		text-align: left;
	}
	
}
.pmc_tkCon{
	li{
		height: 60px;
		padding: 12px 24px;
		font-size:14px;
		color: #292929;
		overflow: hidden;
		border-bottom: 1px solid #e6e6e6;
		p{
			float: left;
			width: 150px;
			font-size: 12px;
			color: #626262;
			max-height: 36px;
			text-align: center;
			word-break: break-all;
			overflow: hidden;
			.pmc_tkName{
				display: inline-block;
				max-width: 120px;
				max-height: 36px;
				color:#292929;
				cursor:pointer;
			}
			.pmc_tkId{
				cursor:pointer;
			}
			.pmcUserName{
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			.pmcUserName:hover{
				text-decoration:underline;
			}
		}
		p:nth-child(1){
			text-align: left;
		}
		p:nth-child(2){
			a:hover{
				text-decoration:underline;
			}
		}
		p:nth-child(3){
			a:hover{
				text-decoration:underline;
			}
		}
		p:nth-child(4){
			width: 80px;
		}
		p:nth-child(5){
			color:#e20000;
		}
		p:nth-child(6){
			width: 120px;
			text-align: left;
		}
		p:nth-child(7){
			span{
				color: #005aff;
				cursor: pointer;
				margin-left: 10px;
			}
			span:first-child{
				border-right: 2px solid #d3d3d3;
				padding-right: 10px;
				margin-left: 0;
			}
		}
	}
	
		
}
</style>