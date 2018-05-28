<template>
	<div id="pmc">
		<top></top>
		<ShanghuTop></ShanghuTop>
		<div class="auto_main">
			<leftNavShangh></leftNavShangh>
			<section>
				<nav>
					<ul>
						<li :class='{active:state=="s1"}' @click='changestate("s1")'>有效预存卡</li>
						<li :class='{active:state=="s2"}' @click='changestate("s2")'>失效预存卡</li>
					</ul>
				</nav>
				<section class='s1' v-if='state=="s1"'>
					<div class="right">
						<div class="pf_con">
							<div class="card_handle clearfix">
								<div class="s_search clearfix">
									<label>仓储名称：</label>
									<select v-model='nowSupNameV'>
										<option>全部</option>
										<option v-for='name in supNameListV'>{{name}}</option>
									</select>
									<button type="button" @click='clickToSearch'>搜索</button>
								</div>
								<a href="/yich/User/User_preMemoryCardUseData.html"><i class="icon iconfont">&#xe623;</i><span>使用数据</span></a>
							</div>

							<div class="assortcard clearfix">
								<a href="javascript:;" @click='clickToSort("SORT_BY_RECENTLY")' :class='[{sort: sortV=="1"}]'><p>最近使用</p><i class="icon iconfont">&#xe600;</i></a>
								<a href="javascript:;" @click='clickToSort("SORT_BY_DISC")' :class='[{sort: sortV=="2"}]'><p>按折扣</p><i class="icon iconfont">&#xe600;</i></a>
								<a href="javascript:;" @click='clickToSort("SORT_BY_TOTALM")' :class='[{sort: sortV=="3"}]'><p>按面额</p><i class="icon iconfont">&#xe600;</i></a>
								<a href="javascript:;" @click='clickToSort("SORT_BY_UNUSEDM")' :class='[{sort: sortV=="4"}]'><p>按未使用金额</p><i class="icon iconfont">&#xe600;</i></a>
								<a href="javascript:;" @click='clickToSort("SORT_BY_TIME")' :class='[{sort: sortV=="5"}]'><p>按购买时间</p><i class="icon iconfont">&#xe600;</i></a>
							</div>

							<div class="card_list clearfix">
								<ul>
									<li v-for='item in pclistV'>
										<PreMemoryCard :bIsUnusedM='true' :unUsedM='item.cardBalance?item.cardBalance.toFixed(2):"0.00"' :discount='item.discount' :name='item.prestoreCardName' :totalM='item.faceValue?item.faceValue.toFixed(2):"0.00"' :bIsSumM='true' :bIsDrawb='"P"!=item.state && "0"!=item.cardBalance' @drawback='clickToDrawb(item)' :bIsDrawbing='"P"==item.state' :bIsSoldNo='true' :soldNo='item.prestoreCardSoldId' :bIsDetail='true' @pmcClick='clickToPmcDetail(item)'></PreMemoryCard>
										<a class="sup" target="_blank" :title='item.supName' :href='"/yich/myShopServlet?supshopId="+item.supshopId'>{{item.supName}}</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>
				<section class='s2' v-if='state=="s2"'>
					<div class="right">
						<div class="pf_con">
							<div class="card_handle clearfix">
								<div class="s_search clearfix">
									<label>仓储名称：</label>
									<select v-model='nowSupNameInv'>
										<option>全部</option>
										<option v-for='name in supNameListInv'>{{name}}</option>
									</select>
									<button type="button" @click='clickToSearch'>搜索</button>
								</div>
								<a href="/yich/User/User_preMemoryCardUseData.html"><i class="icon iconfont">&#xe623;</i><span>使用数据</span></a>
							</div>

							<div class="card_list clearfix">
								<ul>
									<li v-for='item in pclistInv'>
										<PreMemoryCard :bIsUN='true' :bIsConsumed='"0"==item.cardBalance&&"A"!=item.state' :bIsRefundM='"A"==item.state' :refundM='item.cardBalance' :bIsDrawbOk='"A"==item.state' :discount='item.discount' :name='item.prestoreCardName' :totalM='item.faceValue?item.faceValue.toFixed(2):"0.00"' :bIsSumM='true' :bIsDetail='true' @pmcClick='clickToPmcDetail(item)' :bIsSoldNo='true' :soldNo='item.prestoreCardSoldId' :bIsDelete='true' @delete='clickToDeleteInv(item)'></PreMemoryCard>
										<p class="sup" :title='item.supName'>{{item.supName}}</p>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>
			</section>
		</div>
		<bottom></bottom>
		<ModalBox v-if='isModalDisplay' :title='modal.title' :tips='modal.tips' @confirm='modalConfirm'></ModalBox>
	</div>
</template>
<script charset="utf-8">
	import top from '../component/top.vue';
	import ShanghuTop from '../component/ShanghuTop.vue';
	import bottom from '../component/bottom.vue';
	import leftNavShangh from '../component/leftNavShangh.vue';
	import PreMemoryCard from '../component/preMemoryCard.vue';
	import ModalBox from '../component/modalBox.vue';
	import {mapState,mapMutations,mapActions} from 'vuex';
	export default{
		data() {
			return {
				nowSupNameV: '',
				nowSupNameInv: '',
				nowDeleteCardInv: '',
				nowDrawbCardV: {},
				modal: {
					title: '',
					tips:'',
					state: '',
				},
			}
		},
		computed: {
			...mapState(["state", "nowSortV", "sortV", "supNameV", "supNameInv", "pclistV", "pclistInv", "supNameListV", "supNameListInv", "isModalDisplay"]),
		},
		beforeMount: function() {

		},
		mounted() {
			let that = this;
			this.post4ValidPc();
		},
		methods: {
			ajax: function(url, params, callback) {
				this.$http.post(url, params, {emulateJSON: true}).then(function(res) {
					// console.log(res);
					callback(res);
				}, function(error) {
					console.log(error);
				});
			},
			post4ValidPc: function() {
				let that = this;
				let url = "/yich/BusinessBuyCards";
				let params = {
					option: this.nowSortV,
					supName: this.supNameV,
				};
				this.ajax(url, params, function(res) {
					if(res && res.body) {
						// console.log(res);
						that.$store.commit('setPclist', res.body.list);
						that.$store.commit('setSupNameList', res.body.supNameList);
						that.$store.commit('setSort', res.body.sort);
					}
				});
			},
			post4InvalidPc: function() {
				let that = this;
				let url = "/yich/InvalidCard";
				let params = {
					supName: this.supNameInv,
				};
				this.ajax(url, params, function(res) {
					if(res && res.body) {
						// console.log(res);
						that.$store.commit('setPclist', res.body.list);
						that.$store.commit('setSupNameList', res.body.supNameList);
					}
				});
			},
			changestate: function(str) {
				let that = this;
				this.$store.commit('changestate', str);

				if("s1" == this.state) {
					this.post4ValidPc();
				}
				else if("s2" == this.state) {
					this.post4InvalidPc();
				}
			},
			setSupName: function(supName) {
				this.$store.commit('setSupName', supName);
			},
			clickToPmcDetail: function(item) {
				window.location.href = "/yich/User/User_pmcDetail.html?pmcId=" + item.prestoreCardSoldId;
			},
			clickToDrawb: function(item) {
				let that = this;
				this.modal.title = "确定申请退款吗？";
				this.modal.tips = "供货商收到您的退款申请后，可选择同意或拒绝，若对方同意，剩余金额将自动退回到您的现金账户，若对方拒绝，您可与对方协商后决定是否再次发起申请，确定继续吗？";
				this.modal.state = "DRAWBACK";
				this.nowDrawbCardV = item;
				this.$store.commit('showModal');
			},
			clickToSearch: function() {
				let that = this;
				if("s1" == this.state) {
					this.post4ValidPc();
				}
				else if("s2" == this.state) {
					this.post4InvalidPc();
				}
			},
			clickToDeleteInv: function(item) {
				let that = this;
				this.modal.title = "确定删除吗？";
				this.modal.tips = "系统将彻底清除该失效预存卡，确定继续吗？";
				this.modal.state = "DELETECARD";
				this.nowDeleteCardInv = item;
				this.$store.commit('showModal');
			},
			modalConfirm: function() {
				let that = this;
				if("DELETECARD" == this.modal.state) {
					let url = "/yich/DeleteInvalidCard";
					let params = {
						cardId: this.nowDeleteCardInv.prestoreCardSoldId,
					};
					this.ajax(url, params, function(res) {
						if(res && res.body) {
							if(res.body.result && 1 == res.body.result) {
								if(that.pclistInv && that.pclistInv.length > 0) {
									that.pclistInv.forEach(function(pcObj, index) {
										if(pcObj.prestoreCardSoldId == that.nowDeleteCardInv.prestoreCardSoldId) {
											that.pclistInv.splice(index, 1);
											return false;
										}
									});
								}
							}
						}

						that.$store.commit('closeModal');
					});
				}
				else if("DRAWBACK" == this.modal.state) {
					let url = "/yich/ApplyRefundCard";
					let params = {
						cardId: this.nowDrawbCardV.prestoreCardSoldId,
					};
					this.ajax(url, params, function(res) {
						if(res && res.body) {
							let result = res.body.result;
							if("success" == result) {
								alert("申请退款成功！");
							}
							else if("nocard" == result) {
								alert("预存卡不存在！");
							}
							else if("updatefail" == result) {
								alert("更新失败！");
							}
							else if("norepeat" == result) {
								alert("重复提交！");
							}

							that.post4ValidPc();
						}

						that.$store.commit('closeModal');
					});
				}
			},
			clickToSort: function(key) {
				let that = this;
				if("s1" == this.state) {
					switch(this.sortV) {
						case "1": {
							if("SORT_BY_RECENTLY" == key) {
								this.$store.commit('setNowSort', "1");
							}
							else if("SORT_BY_DISC" == key) {
								this.$store.commit('setNowSort', "2");
							}
							else if("SORT_BY_TOTALM" == key) {
								this.$store.commit('setNowSort', "3");
							}
							else if("SORT_BY_UNUSEDM" == key) {
								this.$store.commit('setNowSort', "4");
							}
							else if("SORT_BY_TIME" == key) {
								this.$store.commit('setNowSort', "5");
							}
							break;
						}
						case "2": {
							if("SORT_BY_RECENTLY" == key) {
								this.$store.commit('setNowSort', "1");
							}
							else if("SORT_BY_DISC" == key) {
								this.$store.commit('setNowSort', "2");
							}
							else if("SORT_BY_TOTALM" == key) {
								this.$store.commit('setNowSort', "3");
							}
							else if("SORT_BY_UNUSEDM" == key) {
								this.$store.commit('setNowSort', "4");
							}
							else if("SORT_BY_TIME" == key) {
								this.$store.commit('setNowSort', "5");
							}
							break;
						}
						case "3": {
							if("SORT_BY_RECENTLY" == key) {
								this.$store.commit('setNowSort', "1");
							}
							else if("SORT_BY_DISC" == key) {
								this.$store.commit('setNowSort', "2");
							}
							else if("SORT_BY_TOTALM" == key) {
								this.$store.commit('setNowSort', "3");
							}
							else if("SORT_BY_UNUSEDM" == key) {
								this.$store.commit('setNowSort', "4");
							}
							else if("SORT_BY_TIME" == key) {
								this.$store.commit('setNowSort', "5");
							}
							break;
						}
						case "4": {
							if("SORT_BY_RECENTLY" == key) {
								this.$store.commit('setNowSort', "1");
							}
							else if("SORT_BY_DISC" == key) {
								this.$store.commit('setNowSort', "2");
							}
							else if("SORT_BY_TOTALM" == key) {
								this.$store.commit('setNowSort', "3");
							}
							else if("SORT_BY_UNUSEDM" == key) {
								this.$store.commit('setNowSort', "4");
							}
							else if("SORT_BY_TIME" == key) {
								this.$store.commit('setNowSort', "5");
							}
							break;
						}
						case "5": {
							if("SORT_BY_RECENTLY" == key) {
								this.$store.commit('setNowSort', "1");
							}
							else if("SORT_BY_DISC" == key) {
								this.$store.commit('setNowSort', "2");
							}
							else if("SORT_BY_TOTALM" == key) {
								this.$store.commit('setNowSort', "3");
							}
							else if("SORT_BY_UNUSEDM" == key) {
								this.$store.commit('setNowSort', "4");
							}
							else if("SORT_BY_TIME" == key) {
								this.$store.commit('setNowSort', "5");
							}
							break;
						}
					}
					this.post4ValidPc();
				}
				else if("s2" == this.state) {
					// this.post4InvalidPc();
				}
			},
		},
		watch: {
			nowSupNameV: function(newVal, oldVal) {
				if("全部" == newVal) {
					// this.nowSupNameV = "";
					this.setSupName("");
				}
				else {
					this.setSupName(newVal);
				}
			},
			nowSupNameInv: function(newVal, oldVal) {
				if("全部" == newVal) {
					// this.nowSupNameInv = "";
					this.setSupName("");
				}
				else {
					this.setSupName(newVal);
				}
			},
		},
		components: {
			"top":top,
			"ShanghuTop":ShanghuTop,
			"bottom":bottom,
			"leftNavShangh":leftNavShangh,
			"PreMemoryCard":PreMemoryCard,
			"ModalBox":ModalBox,
		},
	};
</script>