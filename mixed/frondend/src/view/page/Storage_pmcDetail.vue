<template>
	<div id="pmcDetail">
		<top></top>
		<StorageTop></StorageTop>
		<div class="auto_main">
			<leftNavIndex></leftNavIndex>
			<div class="right">
				<p class="pf_title"><a href="/yich/Storage/Storage_preMemoryCard.html">预存卡</a>><a href="">预存卡详情</a></p>
				<div class="pf_con">
					<div :class='[{"offShelf": "2" == pmcInfo.is_del}, "c_basicInfo", "clearfix"]'>  <!-- offShelf -->
						<p class="name">{{pmcInfo.prestore_card_name}}<b v-if='"2" == pmcInfo.is_del'>（已下架）</b></p>
						<p class="offShelfTime" v-if='"2" == pmcInfo.is_del'>
							<span>下架时间</span>
							<span>{{pmcInfo.stopsell_time}}</span>
						</p>
						<p class="creatTime">
							<span>创建时间</span>
							<span>{{pmcInfo.create_time}}</span>
						</p>
						<p class="circulation">
							<span>发行量</span>
							<span>{{pmcInfo.issue_num}}</span>
						</p>
						<p class="discount">
							<span>折扣</span>
							<span>{{pmcInfo.discount}}</span>
						</p>
						<p class="totalM">
							<span>出售面额</span>
							<span>{{pmcInfo.face_value?pmcInfo.face_value.toFixed(2):'0.00'}}</span>
						</p>
					</div>

					<div class="c_soldInfo">
						<p class="soldCount">
							<span>累计售出数量（张）</span>
							<span>{{toThousands(pmcInfo.sold_num)}}</span>
						</p>
						<p class="soldM">
							<span>累计售出金额（元）</span>
							<span>{{toThousands(pmcInfo.sold_money)}}</span>
						</p>
						<p class="usedM">
							<span>累计使用金额（元）</span>
							<span>{{toThousands(pmcInfo.used_money)}}</span>
						</p>
						<p class="unUsedM">
							<span>未使用金额（元）</span>
							<span>{{toThousands(pmcInfo.card_balances)}}</span>
						</p>
						<p class="unUsedM">
							<span>累计退款金额（元）</span>
							<span>{{toThousands(pmcInfo.refund_money)}}</span>
						</p>
					</div>
				</div>

				<p class="pf_title"><a href="">售出记录</a></p>
				<div class="pf_saleRecord">
					<div class="sr_search">
						<label>预存卡卡号：</label>
						<input type="text" name="" maxlength="20" v-model='searchSoldNo'>
						<button type="button" @click='clickToSearch'>搜索</button>
					</div>

					<div class="sr_list">
						<div class="sr_tab clearfix">
							<ul>
								<li>采购商昵称</li>
								<li>卡号</li>
								<li @click='clickToSort($event, "SORT_BY_USEDM")' :class='[{sort: option=="1"||option=="2"}, {reverse: option=="2"}]'><p>已使用金额（元）</p><i class="icon iconfont">&#xe600;</i></li>
								<li @click='clickToSort($event, "SORT_BY_UNUSEDM")' :class='[{sort: option=="3"||option=="4"}, {reverse: option=="4"}]'><p>未使用金额（元）</p><i class="icon iconfont">&#xe600;</i></li>
								<li><p>退款金额（元）</p></li>
								<li @click='clickToSort($event, "SORT_BY_SOLDTIME")' :class='[{sort: option=="5"||option=="6"}, {reverse: option=="6"}]'><p>售出时间</p><i class="icon iconfont">&#xe600;</i></li>
							</ul>
						</div>
						<div class="sr_dataList">
							<ul>
								<li v-for='item in pmcRecordList'>
									<ul>
										<li>
											<p :title='item.business.name'>{{item.business.name}}</p>
											<a v-if="item.business.wangwang" target="_blank" :href="setAwang(item.business.wangwang)">
												<img border="0" :src="setImgwang(item.business.wangwang)" alt="和我联系" />
											</a>
										</li>
										<li @click='clickToPmcCardNoDetail(item)'>{{item.prestore_card_sold_id}}</li>
										<li>{{item.used_money?item.used_money.toFixed(2):'0.00'}}</li>
										<li>{{item.card_balance?item.card_balance.toFixed(2):'0.00'}}</li>
										<li>{{item.refund_money?item.refund_money.toFixed(2):'0.00'}}</li>
										<li>{{item.buy_time}}</li>
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
				searchSoldNo: '',
				// option: "5",  // 排序方式 1:已用 2:已用倒序 3:未用 4:未用倒序 5:售出时间 6:售出时间倒序
			}
		},
		computed: {
			...mapState(["pmcId", "allpage", "pmcInfo", "pmcRecordList", "option"]),
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
			clickToSearch: function() {
				this.$store.commit('page', {page: 1});
				this.$store.dispatch('Ajax');
			},
			clickToSort: function(event, key) {
				let that = this;
				let option = this.$store.state.option;
				switch(option) {
					case "1": {
						if("SORT_BY_USEDM" == key) {
							that.$store.commit('setOption', "2");
						}
						else if("SORT_BY_UNUSEDM" == key) {
							that.$store.commit('setOption', "3");
						}
						else if("SORT_BY_SOLDTIME" == key) {
							that.$store.commit('setOption', "5");
						}
						break;
					}
					case "2": {
						if("SORT_BY_USEDM" == key) {
							that.$store.commit('setOption', "1");
						}
						else if("SORT_BY_UNUSEDM" == key) {
							that.$store.commit('setOption', "3");
						}
						else if("SORT_BY_SOLDTIME" == key) {
							that.$store.commit('setOption', "5");
						}
						break;
					}
					case "3": {
						if("SORT_BY_USEDM" == key) {
							that.$store.commit('setOption', "1");
						}
						else if("SORT_BY_UNUSEDM" == key) {
							that.$store.commit('setOption', "4");
						}
						else if("SORT_BY_SOLDTIME" == key) {
							that.$store.commit('setOption', "5");
						}
						break;
					}
					case "4": {
						if("SORT_BY_USEDM" == key) {
							that.$store.commit('setOption', "1");
						}
						else if("SORT_BY_UNUSEDM" == key) {
							that.$store.commit('setOption', "3");
						}
						else if("SORT_BY_SOLDTIME" == key) {
							that.$store.commit('setOption', "5");
						}
						break;
					}
					case "5": {
						if("SORT_BY_USEDM" == key) {
							that.$store.commit('setOption', "1");
						}
						else if("SORT_BY_UNUSEDM" == key) {
							that.$store.commit('setOption', "3");
						}
						else if("SORT_BY_SOLDTIME" == key) {
							that.$store.commit('setOption', "6");
						}
						break;
					}
					case "6": {
						if("SORT_BY_USEDM" == key) {
							that.$store.commit('setOption', "1");
						}
						else if("SORT_BY_UNUSEDM" == key) {
							that.$store.commit('setOption', "3");
						}
						else if("SORT_BY_SOLDTIME" == key) {
							that.$store.commit('setOption', "5");
						}
						break;
					}
				}
				
				this.$store.commit('page', {page: 1});
				this.$store.dispatch('Ajax');
			},
			clickToPmcCardNoDetail: function(item) {
				window.location.href = "/yich/Storage/Storage_pmcCardNoRecord.html?pmcId=" + this.pmcId + "&pmcSoldNo=" + item.prestore_card_sold_id;
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
		watch: {
			'searchSoldNo': function(newVal, oldVal) {
				let that = this;
				console.log(newVal);

				let reg = /\D/g;
				this.searchSoldNo = newVal.replace(reg, '');
				this.$store.commit('setPmcSoldId', this.searchSoldNo);
			},
		}
	};
</script>