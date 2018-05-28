<template>
	<div id="pmcDetail">
		<top></top>
		<StorageTop></StorageTop>
		<div class="auto_main">
			<leftNavIndex></leftNavIndex>
			<div class="right">
				<p class="pf_title"><a href="/yich/User/User_preMemoryCard.html">预存卡</a>&nbsp;&gt;&nbsp;<a href="">预存卡详情</a></p>
				<div class="pf_con">
					<div :class='["c_basicInfo clearfix", {"offShelf":"0"==pmcInfo.isInvalid}]'> <!-- offShelf -->
						<p class="name">
							<span>{{pmcInfo.prestoreCardName}}<b v-if='"0"==pmcInfo.isInvalid'>（失效）</b><strong>卡号：{{pmcInfo.prestoreCardSoldId}}</strong></span>
							<span>
								<p :title='pmcInfo.supName'>{{pmcInfo.supName}}</p>
								<a v-if="pmcInfo.wangwang" target="_blank" :href="setAwang(pmcInfo.wangwang)">
									<img border="0" :src="setImgwang(pmcInfo.wangwang)" alt="和我联系" />
								</a>
							</span>
						</p>
						<p class="creatTime">
							<span>购买时间</span>
							<span>{{pmcInfo.buyTime}}</span>
						</p>
						<p class="discount">
							<span>折扣</span>
							<span>{{pmcInfo.discount}}</span>
						</p>
						<p class="totalM">
							<span>出售面额</span>
							<span>{{pmcInfo.faceValue?pmcInfo.faceValue.toFixed(2):"0.00"}}</span>
						</p>
					</div>

					<div class="c_soldInfo">
						<p class="usedM">
							<span>累计使用金额（元）</span>
							<span>{{toThousands(totalUsedM)}}</span>
						</p>
						<p class="unUsedM">
							<span>未使用金额（元）</span>
							<span>{{toThousands(pmcInfo.cardBalance)}}</span>
						</p>
						<p class="refundM">
							<span>退款金额（元）</span>
							<span>{{toThousands(pmcInfo.refund_money)}}</span>
						</p>
					</div>
				</div>

				<p class="pf_title"><a href="">使用记录</a></p>
				<div class="pf_saleRecord">
					<div class="sr_list">
						<div class="sr_tab clearfix">
							<ul class="clearfix">
								<li @click='clickToSort("SORT_BY_TIME")' :class='[{sort: option=="1"}]'>使用时间<i class="icon iconfont">&#xe600;</i></li>
								<li @click='clickToSort("SORT_BY_USEDM")' :class='[{sort: option=="2"}]'>使用金额（元）<i class="icon iconfont">&#xe600;</i></li>
								<li>未使用金额（元）</li>
								<li>订单交易号</li>
							</ul>
						</div>
						<div class="sr_dataList">
							<ul>
								<li v-for='item in pmcRecordList'>
									<ul>
										<li>{{item.operation_time}}</li>
										<li><b v-if='"O" == item.state'>-</b><b v-if='"I" == item.state'>+</b>{{item.amount?item.amount.toFixed(2):"0.00"}}</li>
										<li>{{item.balance?item.balance.toFixed(2):"0.00"}}</li>
										<li><b v-if='"O" == item.state'>{{item.alipay_num}}</b><b v-if='"I" == item.state'>订单交易退款</b></li>
									</ul>
								</li>
							</ul>
						</div>
					</div>

					<div class='pubfenye'>
						<fenye :page='allpage' v-if='true'></fenye>
					</div>
				</div>
			</div>
		</div>
		<bottom></bottom>
	</div>
</template>
<script charset="utf-8">
	import top from '../component/top.vue';
	import StorageTop from '../component/ShanghuTop.vue';
	import bottom from '../component/bottom.vue';
	import leftNavIndex from '../component/leftNavShangh.vue';
	import fenye from '../component/fenye.vue';
	import {mapState,mapMutations,mapActions} from 'vuex';
	export default{
		data() {
			return {

			}
		},
		computed: {
			...mapState(["pmcId", "allpage", "pmcInfo", "pmcRecordList", "option", "totalUsedM"]),
		},
		beforeMount: function() {

		},
		mounted() {
			let that = this;
			this.$store.commit('setPmcId', this.getReg("pmcId"));
			this.$store.dispatch('Ajax');
		},
		methods: {
			getReg: function(name) {
				let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
				let r = window.location.search.substr(1).match(reg);
				if(r!=null) return  unescape(r[2]); return null;
			},
			isNaN: function(str) {
				if(isNaN(str) || str == '' || str == null || str == undefined) {
					return true;
				}
				return false;
			},
			toThousands: function(num) {
				var num = (num || 0).toString(), re = /\d{3}$/, result = '';  
			    while ( re.test(num) ) {  
			        result = RegExp.lastMatch + result;  
			        if (num !== RegExp.lastMatch) {  
			            result = ',' + result;  
			            num = RegExp.leftContext;  
			        } else {  
			            num = '';  
			            break;  
			        }  
			    }  
			    if (num) { result = num + result; }  
			    return result;
			},
			clickToSort: function(key) {
				let that = this;
				switch(this.option) {
					case "1": {
						if("SORT_BY_TIME" == key) {
							
						}
						else if("SORT_BY_USEDM" == key) {
							that.$store.commit('setOption', "2");
						}
						break;
					}
					case "2": {
						if("SORT_BY_TIME" == key) {
							that.$store.commit('setOption', "1");
						}
						else if("SORT_BY_USEDM" == key) {
							
						}
						break;
					}
				}
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