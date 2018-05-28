<!--
	作者：石竹
	title: 仓储-预存卡-退款申请
	样式:preMemoryCard.less
	入口：Storage_preMemoryCardRefund.js
	vuex:sPMCRefundStore.js
-->
<template>
	<div id="pmcardBox">
		<top></top>
		<StorageTop></StorageTop>
		<div class="auto_main">
			<leftNavIndex></leftNavIndex>
			<div class="pmc_right">
				<p class="pmc_title"><a href="/yich/Storage/Storage_preMemoryCard.html">预存卡</a>&nbsp;&gt;&nbsp;<a href="">退款申请</a></p>
				<div class="pmc_tkTop">
					<label>采购商昵称&nbsp;:&nbsp;<input type="text" class="pmc_tkSearchTxt" maxlength="50" v-model="csupShopName"></label>
					<label>预存卡卡号&nbsp;:&nbsp;<input type="text" class="pmc_tkSearchTxt" maxlength="100" v-model="cpmcId"></label>
					<input type="button" value="查询" class="pmc_tkSearchBtn" @click="pmcTopSearch">
				</div>
				<div class="pmc_tkContent">
					<ul class="pmc_tkConNav">
						<li :class="pmcNavActive?'':'pmc_tkNavActive'" @click="tkApplyBtn">退款申请处理</li>
						<li :class="pmcNavActive?'pmc_tkNavActive':''" @click="tkDidBtn">退款处理记录</li>
					</ul>
					<div :is="pmcNavCell" :pmcNames="soldData.yckName" :pmcList="soldData.soldList"></div>
				</div>
				<fenye :page="zonPage" v-if="showFeny"></fenye>
			</div>
		</div>
		<bottom></bottom>
	</div>
</template>
<script>
import top from '../component/top.vue';
import StorageTop from '../component/StorageTop.vue';
import leftNavIndex from '../component/leftNavIndex.vue';
import preMemoryCardRefund from '../component/preMemoryCardRefund.vue';
import preMemoryCardRefundlist from '../component/preMemoryCardRefundlist.vue';
import fenye from '../component/fenye.vue';
import bottom from '../component/bottom.vue';
import {mapState,mapMutations,mapActions} from 'vuex'
export default{
	data(){
		return{
			typeName:'采购商昵称',
			pmcNavActive:false,//false:退款申请,true:退款处理
			pmcNavCell:'preMemoryCardRefund',
			csupShopName:'',
			cpmcId:'',
		}
	},
	computed:{
		...mapState(["soldData","zonPage","showFeny"])
	},
	methods:{
		...mapMutations(["userName","pmcName","pmcId","refundResult","pmcOption","page","FYAjaxSta"]),
		...mapActions({
			starAjaxData:"starAjaxData",
			dolistAjaxData:"dolistAjaxData",
		}),
		tkApplyBtn:function(){
			this.pmcNavActive = false;
			this.csupShopName = '';
			this.cpmcId = '';
			this.pmcId("");
			this.pmcName("");
			this.userName("");
			this.page({page:1});
			this.pmcOption(6);
			this.FYAjaxSta('applyAjax');
			this.pmcNavCell = 'preMemoryCardRefund';
			this.$emit(this.starAjaxData());
		},
		tkDidBtn:function(){
			this.pmcNavActive = true;
			this.csupShopName = '';
			this.cpmcId = '';
			this.pmcId("");
			this.pmcName("");
			this.userName("");
			this.refundResult("");
			this.page({page:1});
			this.pmcOption(8);
			this.FYAjaxSta('dolistAjax');
			this.pmcNavCell = 'preMemoryCardRefundlist';
			this.$emit(this.dolistAjaxData());
		},
		pmcTopSearch:function(){
			this.userName(this.csupShopName);
			this.pmcId(this.cpmcId);
			if(this.pmcNavCell == "preMemoryCardRefund"){
				this.$emit(this.starAjaxData());
			}else{
				this.$emit(this.dolistAjaxData());
			}
			
		},

	},
	beforeMount:function(){
		this.$emit(this.starAjaxData());
	},
	components:{
		"top":top,
		"StorageTop":StorageTop,
		"leftNavIndex":leftNavIndex,
		"preMemoryCardRefund":preMemoryCardRefund,
		"preMemoryCardRefundlist":preMemoryCardRefundlist,
		"fenye":fenye,
		"bottom":bottom,

	}
}
</script>