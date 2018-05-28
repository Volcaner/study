<!-- 预存卡-使用数据列表 -->
<template>
	<div id="pmcUseData">
		<p class="pmc_useDataMes">
			<span v-if="timeInterval"><i>{{ startTime }}</i>&nbsp;<i v-if="(startTime && endTime)">到</i>&nbsp;<i>{{ endTime }}</i></span>
			<span>已使用金额&nbsp;:&nbsp;{{ hadUseMoney }}</span>
			<span>未使用金额&nbsp;:&nbsp;{{ totalBalance }}</span>
			<span>退款金额&nbsp;:&nbsp;{{ totalRefundMoney }}</span>
		</p>
		<ul class="pmc_useDataTitle">
			<li>{{ typeName }}</li>
			<li>预存卡名称/卡号</li>
			<li @click="sortBtn1">折扣<i :class="sortSta === 'zk' ? hightlight : '' "></i></li>
			<li @click="sortBtn2">使用金额(元)<i :class="sortSta === 'syj' ? hightlight : '' "></i></li>
			<li>未使用金额(元)</li>
			<li @click="sortBtn3">使用时间<i :class="sortSta === 'syt' ? hightlight : '' "></i></li>
		</ul>
		<ul class="pmc_useDataCon">
			<li v-for="items in soldList">
				<p><a class="userName" :title="items.supshopName" @click="userJumpStore(items.shopId)">{{ items.supshopName }}</a><a v-if="items.wangwang" target="_blank" :href="setAwang(items.wangwang)">
<img border="0" :src="setImgwang(items.wangwang)" alt="和我联系" /></a></p>
				<p>
					<a class="pmc_name" :title="items.pmcName" @click="nameJumpUrl(items.pmcNameId,items.pmcId)">{{ items.pmcName }}</a>
					<a class="pmc_name" :title="items.pmcId" @click="IdJumpUrl(items.pmcNameId,items.pmcId)">{{ items.pmcId }}</a>
				</p>
				<p>{{ items.discount }}</p>
				<p>{{ items.useMoneySta }}{{ items.amount }}</p>
				<p>{{ items.balance }}</p>
				<p>{{ items.useTime.split(' ')[0] }}<br>{{ items.useTime.split(' ')[1] }}</p>
			</li>
		</ul>
	</div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default{
	props:["typeName","soldList","hadUseMoney","totalBalance","totalRefundMoney","userJump"],
	data(){
		return{
			sortSta:"syt",
			hightlight:"hightlight",
		}
	},
	computed:{
		...mapState(["timeInterval","startTime","endTime"]),
	},
	methods:{
		...mapMutations(["pmcOption"]),
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
			this.sortSta = "syt";
			this.pmcOption(6);
			this.$emit(this.starAjaxData());
		},
		userJumpStore:function(shopId){
			if(this.userJump && this.userJump == "isuser"){
				window.open('/yich/myShopServlet?supshopId='+shopId);
			}else if(this.userJump && this.userJump == "isstorage"){
				window.open('/yich/User/User_FileManagement.html?userid='+shopId);
			}
		},
		nameJumpUrl:function(pmcId,pmcSoldNo){
			if(this.userJump && this.userJump == "isuser"){
				window.open('/yich/User/User_pmcDetail.html?pmcId='+pmcSoldNo);
			}else if(this.userJump && this.userJump == "isstorage"){
				window.open('/yich/Storage/Storage_pmcDetail.html?pmcId='+pmcId);
			} 
		},
		IdJumpUrl:function(pmcId,pmcSoldNo){
			if(this.userJump && this.userJump == "isuser"){
				window.open('/yich/User/User_pmcDetail.html?pmcId='+pmcSoldNo);
			}else if(this.userJump && this.userJump == "isstorage"){
				window.open('/yich/Storage/Storage_pmcCardNoRecord.html?pmcId='+pmcId+'&pmcSoldNo='+pmcSoldNo);
			} 	
		},
		 setAwang:function(src){
			return "http://www.taobao.com/webww/ww.php?ver=3&touid="+src+"&siteid=cntaobao&status=2&charset=utf-8";
		},
		setImgwang:function(src){
			return "http://amos.alicdn.com/realonline.aw?v=2&uid="+src+"&site=cntaobao&s=2&charset=utf-8";
		},
		
	},

}
</script>
<style lang="less" scoped>
/* 样式:preMemoryCard.less; */
.userName{
	cursor:pointer;
	white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.userName:hover{
	text-decoration: underline;
}

</style>