<!-- 预存卡-退款处理记录 -->
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
			<li>
				<select class="pmc_tkState" v-model="cpmcDoResult">
					<option value="">处理结果</option>
					<option value="S">已退款</option>
					<option value="R">拒绝退款</option>
				</select>
			</li>
			<li>处理时间<i :class="sortSta === 'clt' ? hightlight : '' " @click="sortBtn4"></i></li>
		</ul>
		<ul class="pmc_tkCon">
			<li v-for="items in pmcList">
				<p><a class="pmc_tkName pmcUserName" :title="items.supshopName" @click="userJumpStore(items.shopId)">{{ items.supshopName }}</a><a v-if="items.wangwang" target="_blank" :href="setAwang(items.wangwang)">
<img border="0" :src="setImgwang(items.wangwang)" alt="和我联系" /></a></p>
				<p><a class="pmc_tkName" :title="items.pmcName" @click="nameJumpUrl(items.pmcNameId)">{{ items.pmcName }}</a></p>
				<p><a class="pmc_tkId" :title="items.pmcId" @click="IdJumpUrl(items.pmcNameId,items.pmcId)"></a>{{ items.pmcId }}</a></p>
				<p>{{ items.discount }}</p>
				<p>{{ items.tkBalance }}</p>
				<p>{{ items.tkTime?items.tkTime.split(' ')[0]:'' }}<br>{{ items.tkTime?items.tkTime.split(' ')[1]:'' }}</p>
				<p>{{ items.doResult }}</p>
				<p>{{ items.doTime?items.doTime.split(' ')[0]:'' }}<br>{{ items.doTime?items.doTime.split(' ')[1]:'' }}</p>
			</li>
		</ul> 
	</div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default{
	props:["pmcNames","pmcList"],
	data(){
		return{
			sortSta:"clt",
			hightlight:"hightlight",
			cpmcName:'',
			cpmcDoResult:'',
		}
	},
	methods:{
		...mapMutations(["pmcName","pmcOption","refundResult"]),
		...mapActions(["dolistAjaxData"]),
		sortBtn1:function(){
			this.sortSta = "zk";
			this.pmcOption(2);
			this.$emit(this.dolistAjaxData());
		},
		sortBtn2:function(){
			this.sortSta = "syj";
			this.pmcOption(4);
			this.$emit(this.dolistAjaxData());
		},
		sortBtn3:function(){
			this.sortSta = "tkt";
			this.pmcOption(6);
			this.$emit(this.dolistAjaxData());
		},
		sortBtn4:function(){
			this.sortSta = "clt";
			this.pmcOption(8);
			this.$emit(this.dolistAjaxData());
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
		}
	},
	watch:{
		cpmcName:function(val){
			this.pmcName(val);
			this.$emit(this.dolistAjaxData());
		},
		cpmcDoResult:function(val){
			this.refundResult(val);
			this.$emit(this.dolistAjaxData());
		}
	},
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
		.pmc_tkState{
			width: 90px;
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
		width: 60px;
	}
	li:nth-child(6){
		width: 110px;
		text-align: left;
	}
	li:nth-child(7){
		width: 90px;
	}
	li:last-child{
		width:90px;
		padding-left: 10px;
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
			width: 60px;
		}
		p:nth-child(6){
			width: 110px;
			text-align: left;
		}
		p:nth-child(7){
			width: 90px;
		}
		p:last-child{
			width:90px;
			padding-left: 10px;
			text-align: left;
		}
	}
	
		
}
</style>