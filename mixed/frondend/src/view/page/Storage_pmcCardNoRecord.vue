<template>
	<div id="pmcDetail">
		<top></top>
		<StorageTop></StorageTop>
		<div class="auto_main">
			<leftNavIndex></leftNavIndex>
			<div class="right">
				<p class="pf_title"><a href="/yich/Storage/Storage_preMemoryCard.html">预存卡</a>><a :href='"/yich/Storage/Storage_pmcDetail.html?pmcId=" + pmcId'>预存卡详情</a>><a href="">卡号使用记录</a></p>
				<div class="pf_con">
					<div :class='[{"offShelf": !pmcSoldNoInfo || "0"==pmcSoldNoInfo.is_invalid}, "c_basicInfo", "clearfix"]'>
						<p class="supName">
							<span>采购商昵称</span>
							<span>
								<p :title='pmcSoldNoInfo&&pmcSoldNoInfo.business?pmcSoldNoInfo.business.name:""'>{{pmcSoldNoInfo&&pmcSoldNoInfo.business?pmcSoldNoInfo.business.name:''}}</p>
								<a v-if="pmcSoldNoInfo&&pmcSoldNoInfo.business?pmcSoldNoInfo.business.wangwang:''" target="_blank" :href="setAwang(pmcSoldNoInfo&&pmcSoldNoInfo.business?pmcSoldNoInfo.business.wangwang:'')">
									<img border="0" :src="setImgwang(pmcSoldNoInfo&&pmcSoldNoInfo.business?pmcSoldNoInfo.business.wangwang:'')" alt="和我联系" />
								</a>
							</span>
						</p>
						
						
						
						<p class="refundM" >
							<span>退款金额（元）</span>
							<span>{{pmcSoldNoInfo.refund_money?pmcSoldNoInfo.refund_money.toFixed(2):'0.00'}}</span>
						</p>
						<p class="unUsedM">
							<span>未使用金额（元）</span>
							<span>{{pmcSoldNoInfo.card_balance?pmcSoldNoInfo.card_balance.toFixed(2):'0.00'}}</span>
						</p>
						<p class="usedM">
							<span>已使用金额（元）</span>
							<span>{{pmcSoldNoInfo.used_money?pmcSoldNoInfo.used_money.toFixed(2):'0.00'}}</span>
						</p>
						<p class="cardNo">
							<span>卡号</span>
							<span>{{pmcSoldNoInfo.prestore_card_sold_id}}</span>
						</p>
					</div>
				</div>

				<div class="pf_saleRecord">
					<div class="sr_list">
						<div class="sr_tab clearfix">
							<ul class="clearfix">
								<li @click='clickToSort("SORT_BY_TIME")' :class='[{sort: option=="1"||option=="2"}, {reverse: option=="2"}]'><p>使用时间</p><i class="icon iconfont">&#xe600;</i></li>
								<li @click='clickToSort("SORT_BY_USEDM")' :class='[{sort: option=="3"||option=="4"}, {reverse: option=="4"}]'><p>使用金额（元）</p><i class="icon iconfont">&#xe600;</i></li>
								<li>未使用金额（元）</li>
								<li>支付订单编号</li>
							</ul>
						</div>
						<div class="sr_dataList">
							<ul>
								<li v-for='item in pmcSoldNoRecordList'>
									<ul>
										<li>{{item.operation_time}}</li>
										<li><b v-if='"O" == item.state'>-</b><b v-if='"I" == item.state'>+</b>{{item.amount?item.amount.toFixed(2):"0.00"}}</li>
										<li>{{item.balance?item.balance.toFixed(2):'0.00'}}</li>
										<li><b v-if='"O" == item.state'>{{item.alipay_num}}</b><b v-if='"I" == item.state'>订单交易退款</b></li>
									</ul>
								</li>
							</ul>
						</div>
						<div class='pubfenye'>
							<fenye :page='allpage' v-if='true'></fenye>
						</div>
					</div>

					
				</div>
			</div>
		</div>
		<bottom></bottom>
	</div>
</template>
<script charset="utf-8">
	import top from '../component/top.vue';
	import StorageTop from '../component/StorageTop.vue';
	import bottom from '../component/bottom.vue';
	import leftNavIndex from '../component/leftNavIndex.vue';
	import fenye from '../component/fenye.vue';
	import {mapState,mapMutations,mapActions} from 'vuex';
	export default{
		data() {
			return {

			}
		},
		computed: {
			...mapState(["allpage", "option", "pmcSoldNoInfo", "pmcSoldNoRecordList", "pmcId"]),
		},
		beforeMount: function() {

		},
		mounted() {
			let that = this;
			this.$store.commit('setPmcId', this.getReg("pmcId"));
			this.$store.commit('setPmcSoldId', this.getReg("pmcSoldNo"));
			this.$store.dispatch('Ajax');
		},
		methods: {
			getReg: function(name) {
				let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
				let r = window.location.search.substr(1).match(reg);
				if(r!=null) return  unescape(r[2]); return null;
			},
			clickToSort: function(key) {
				let that = this;
				switch(this.option) {
					case "1": {
						if("SORT_BY_TIME" == key) {
							that.$store.commit('setOption', "2");
						}
						else if("SORT_BY_USEDM" == key) {
							that.$store.commit('setOption', "3");
						}
						break;
					}
					case "2": {
						if("SORT_BY_TIME" == key) {
							that.$store.commit('setOption', "1");
						}
						else if("SORT_BY_USEDM" == key) {
							that.$store.commit('setOption', "3");
						}
						break;
					}
					case "3": {
						if("SORT_BY_TIME" == key) {
							that.$store.commit('setOption', "1");
						}
						else if("SORT_BY_USEDM" == key) {
							that.$store.commit('setOption', "4");
						}
						break;
					}
					case "4": {
						if("SORT_BY_TIME" == key) {
							that.$store.commit('setOption', "1");
						}
						else if("SORT_BY_USEDM" == key) {
							that.$store.commit('setOption', "3");
						}
						break;
					}
				}

				this.$store.commit('page', {page: 1});
				this.$store.dispatch('Ajax');
			},
			setAwang:function(src){
				return "http://www.taobao.com/webww/ww.php?ver=3&touid="+src+"&siteid=cntaobao&status=2&charset=utf-8";
			},
			setImgwang:function(src){
				return "http://amos.alicdn.com/realonline.aw?v=2&uid="+src+"&site=cntaobao&s=2&charset=utf-8";
			},
		},
		components: {
			"top":top,
			"StorageTop":StorageTop,
			"bottom":bottom,
			"leftNavIndex":leftNavIndex,
			'fenye':fenye,
		},
	};
</script>