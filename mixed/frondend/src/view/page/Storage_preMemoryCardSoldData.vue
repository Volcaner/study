<!--
	作者：石竹
	title: 仓储-预存卡-售出记录
	样式:preMemoryCard.less
	入口：Storage_preMemoryCardSoldData.js
	vuex:sPMCSoldDataStore.js
-->
<template>
	<div id="pmcardBox">
		<top></top>
		<StorageTop></StorageTop>
		<div class="auto_main">
			<leftNavIndex></leftNavIndex>
			<div class="pmc_right">
				<p class="pmc_title"><a href="/yich/Storage/Storage_preMemoryCard.html">预存卡</a>&nbsp;&gt;&nbsp;<a href="">售出记录</a></p>
				<preMemoryCardTop :timeName="timeName" :pmcNames="soldData.names"></preMemoryCardTop>
				<pmcSoldDatalist :typeName="typeName" :pmcPlists="soldData.plists" :totalAmount="soldData.totalAmount"></pmcSoldDatalist>
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
import pmcSoldDatalist from '../component/pmcSoldDatalist.vue';
import fenye from '../component/fenye.vue';
import bottom from '../component/bottom.vue';
import {mapState,mapMutations,mapActions} from 'vuex'
export default{
	data(){
		return{
			typeName:'采购商昵称',
			timeName:'交易日期',
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
		"pmcSoldDatalist":pmcSoldDatalist,
		"fenye":fenye,
		"bottom":bottom,

	}
}
</script>