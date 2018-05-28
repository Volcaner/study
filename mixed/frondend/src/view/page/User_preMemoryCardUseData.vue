<!--
	作者：石竹
	title: 商户-预存卡-使用数据
	样式:preMemoryCard.less
	入口：User_preMemoryCardUseData.js
	vuex:uPMCUseDataStore.js
-->
<template>
	<div id="pmcardBox">
	 	<top></top>
		<ShanghuTop></ShanghuTop>
		<div class="auto_main">
			<leftNavShangh></leftNavShangh> 
			<div class="pmc_right">
				<p class="pmc_title"><a href="/yich/User/User_preMemoryCard.html">预存卡</a>&nbsp;&gt;&nbsp;<a href="">使用数据</a></p>
				<upreMemoryCardTop :pmcNames="soldData.yckName" :pmcIDs="soldData.yckID" :supNames="soldData.supName"></upreMemoryCardTop>
				<pmcUseDatalist :typeName="typeName" :soldList="soldData.soldList" :hadUseMoney="soldData.useMoney" :totalBalance="soldData.resMoney" :totalRefundMoney="soldData.refMoney" :userJump="isuser"></pmcUseDatalist>
				<fenye :page="zonPage" v-if="showFeny"></fenye>
			</div>
		</div>
		<bottom></bottom>
	</div>
</template>
<script>
import top from '../component/top.vue';
import ShanghuTop from '../component/ShanghuTop.vue';
import leftNavShangh from '../component/leftNavShangh.vue';
import upreMemoryCardTop from '../component/UserPreMemoryCardTop.vue';
import pmcUseDatalist from '../component/pmcUseDatalist.vue';
import fenye from '../component/fenye.vue';
import bottom from '../component/bottom.vue';
import {mapState,mapMutations,mapActions} from 'vuex'
export default{
	data(){
		return{
			typeName:'仓储名称',
			isuser:'isuser',//商户跳转链接详情页
		}
	},
	computed:{
		...mapState(["soldData","zonPage","showFeny"])
	},
	methods:{
		...mapActions({
			starAjaxData:"starAjaxData",
		})
	},
	beforeMount:function(){
		this.$emit(this.starAjaxData());
	},
	components:{
		"top":top,
		"ShanghuTop":ShanghuTop,
		"leftNavShangh":leftNavShangh,
		"upreMemoryCardTop":upreMemoryCardTop,
		"pmcUseDatalist":pmcUseDatalist,
		"fenye":fenye,
		"bottom":bottom,

	}
}
</script>