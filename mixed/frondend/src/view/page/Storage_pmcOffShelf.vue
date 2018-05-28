<template>
	<div id="pmcOffShelf">
		<top></top>
		<StorageTop></StorageTop>
		<div class="auto_main">
			<leftNavIndex></leftNavIndex>
			<div class="right">
				<p class="pf_title"><a href="/yich/Storage/Storage_preMemoryCard.html">预存卡</a>><a href="/yich/Storage/Storage_pmcOffShelf.html">已下架预存卡</a></p>
				<div class="pf_con">
					<div class="card_list clearfix">
						<ul>
							<li v-for='item in pclist'>
								<PreMemoryCard :bIsDetail='true' :bIsUN='true' :soldAm='item.sold_num' :stockAm='item.stock_num' :discount='item.discount' :name='item.prestore_card_name' :totalM='item.face_value?item.face_value.toFixed(2):"0.00"' :bIsSold='true' :bIsStock='true' :bIsSumM='true' :bIsDelete='true' @pmcClick='clickToPmcDetail(item)' @delete='clickToDelete(item)'></PreMemoryCard>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<bottom></bottom>
		<ModalBox v-if='isModalDisplay' :title='modal.title' @confirm='modalConfirm'>
			<p v-html='modal.tips'></p>
		</ModalBox>
	</div>
</template>
<script charset="utf-8">
	import top from '../component/top.vue';
	import StorageTop from '../component/StorageTop.vue';
	import bottom from '../component/bottom.vue';
	import leftNavIndex from '../component/leftNavIndex.vue';
	import PreMemoryCard from '../component/preMemoryCard.vue';
	import ModalBox from '../component/modalBox.vue';
	import {mapState,mapMutations,mapActions} from 'vuex';
	export default{
		data() {
			return {
				modal: {
					title: '',
					tips:'',
					state:'',
				},
				nowDeleteItem: {},
			}
		},
		computed: {
			...mapState(["isModalDisplay", "pclist"]),
		},
		beforeMount: function() {

		},
		mounted() {
			let that = this;
			let url = "/yich/AlreadyStopServlet";
			let params = {};
			this.ajax(url, params, function(res) {
				if(res && res.body) {
					that.$store.commit('setPcList', res.body.pclist);
				}
			});
		},
		methods: {
			ajax: function(url, params, callback) {
				this.$http.post(url, params, {emulateJSON: true}).then(function(res) {
					console.log(res);
					callback(res);
				}, function(error) {
					console.log(error);
				});
			},
			clickToPmcDetail: function(item) {
				window.location.href = "/yich/Storage/Storage_pmcDetail.html?pmcId=" + item.prestore_card_id;
			},
			modalConfirm: function() {
				if(this.modal.state == "DELETE") {
					this.post4Delete();
				}
				else if(this.modal.state == "CANNOTDELETE") {
					this.$store.commit('closeModal');
				}
			},
			post4Delete: function() {
				let that = this;
				let url = "/yich/DeleteCardServlet";
				let params = {
					prestore_card_id: this.nowDeleteItem.prestore_card_id,
				};
				this.ajax(url, params, function(res) {
					if(res && res.body) {
						let result = res.body;

						if(result.flag && 1 == result.flag) {
							if(that.pclist && that.pclist.length > 0) {
								that.pclist.forEach(function(pcObj, index) {
									if(pcObj.prestore_card_id == that.nowDeleteItem.prestore_card_id) {
										that.pclist.splice(index, 1);
										return false;
									}
								});
							}

							that.$store.commit('closeModal');
						}
						else if(result.flag && -1 == result.flag) {
							// alert("删除失败！");
							that.$store.commit('closeModal');

							setTimeout(function() {
								that.modal.title = "不能删除";
								that.modal.tips = "可能存在的原因：<br>1.该卡种存在未使用完的金额。<br>2.使用该卡种付款的订单还未确认收货。";
								that.modal.state = "CANNOTDELETE";
								that.$store.commit('showModal');
							}, 100);
						}
					}
				});
			},
			clickToDelete: function(item) {
				this.modal.title = "确定删除吗？";
				this.modal.tips = "删除将不可恢复，确定删除吗？";
				this.modal.state = "DELETE";
				this.nowDeleteItem = item;
				this.$store.commit('showModal');
			},
		},
		components: {
			"top":top,
			"StorageTop":StorageTop,
			"bottom":bottom,
			"leftNavIndex":leftNavIndex,
			"PreMemoryCard":PreMemoryCard,
			"ModalBox":ModalBox,
		},
	};
</script>