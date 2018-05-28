<!--
	作者：石竹
	title: 仓储-预存卡-使用数据
	样式:preMemoryCard.less
	入口：Storage_preMemoryCardUseData.js
	vuex:sPMCUseDataStore.js
-->
<template>
	<div id="pmcardBox">
		<top></top>
		<StorageTop></StorageTop>
		<div class="auto_main">
			<leftNavIndex></leftNavIndex>
			<div class="pmc_right">
				<p class="pmc_title"><a href="/yich/Storage/Storage_preMemoryCard.html">预存卡</a>&nbsp;&gt;&nbsp;<a href="">使用数据</a></p>
				<preMemoryCardTop :timeName="timeName" :pmcNames="soldData.yckName"></preMemoryCardTop>
				<pmcUseDatalist :typeName="typeName" :soldList="soldData.soldList" :hadUseMoney="soldData.hadUseMoney" :totalBalance="soldData.totalBalance" :totalRefundMoney="soldData.totalRefundMoney" :userJump="isstorage"></pmcUseDatalist>
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
import preMemoryCardTop from '../component/preMemoryCardTop.vue';
import pmcUseDatalist from '../component/pmcUseDatalist.vue';
import fenye from '../component/fenye.vue';
import bottom from '../component/bottom.vue';
import {mapState,mapMutations,mapActions} from 'vuex'
export default{
	data(){
		return{
			typeName:'采购商昵称',
			timeName:'使用时间',
			isstorage:'isstorage',
			
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
		"StorageTop":StorageTop,
		"leftNavIndex":leftNavIndex,
		"preMemoryCardTop":preMemoryCardTop,
		"pmcUseDatalist":pmcUseDatalist,
		"fenye":fenye,
		"bottom":bottom,

	}
}
</script>