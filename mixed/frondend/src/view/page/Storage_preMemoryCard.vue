<template>
	<div id="pmc">
		<top></top>
		<StorageTop></StorageTop>
		<div class="auto_main">
			<leftNavIndex></leftNavIndex>
			<div class="right">
				<p class="pf_title"><a href="/yich/Storage/Storage_preMemoryCard.html">预存卡</a></p>
				<div class="pf_con">
					<div class="card_handle clearfix">
						<a href="/yich/Storage/Storage_preMemoryCardSoldData.html"><i class="icon iconfont">&#xe98f;</i><span>售出记录</span></a>
						<a href="/yich/Storage/Storage_preMemoryCardUseData.html"><i class="icon iconfont">&#xe623;</i><span>使用数据</span></a>
						<a href="/yich/Storage/Storage_preMemoryCardRefund.html"><i class="icon iconfont">&#xe6a5;</i><span>退款申请<b v-if='count && "0"!=count'>{{count}}</b></span></a>
						<a href="/yich/Storage/Storage_pmcOffShelf.html"><i class="icon iconfont">&#xe606;</i><span>已下架预存卡</span></a>
					</div>

					<div class="card_list clearfix">
						<ul>
							<li v-for='item in pclist'>
								<PreMemoryCard :bIsDetail='true' :soldAm='item.sold_num' :stockAm='item.stock_num' :discount='item.discount' :name='item.prestore_card_name' :totalM='item.face_value.toFixed(2)' :bIsSold='true' :bIsStock='true' :bIsSumM='true' :bIsOffS='true' @offTheShelf='click2OffTheShelf(item)' @pmcClick='clickToPmcDetail(item)'></PreMemoryCard>
							</li>
							<li>
								<div class="addCard" @click='clickToAddCard'>
									<p>
										<span class="icon iconfont">&#xe644;</span>
										<span>新增预存卡</span>
									</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<bottom></bottom>
		<ModalBox v-if='isModalDisplay' :title='modal.title' :tips='modal.tips' @confirm='modalConfirm'></ModalBox>
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
					title: '确定下架吗？',
					tips:'下架后请前往“已下架预存卡”查看，但已售出的预存卡仍有效，确定继续吗？',
				},
				bIsModalShow: true,
				nowOffShelfItem: {},
			}
		},
		computed: {
			...mapState(["isModalDisplay", "pclist", "count"]),
		},
		beforeMount: function() {

		},
		mounted() {
			let that = this;
			let url = "/yich/PrestoreCardListServlet";
			let params = {};
			this.ajax(url, params, function(res) {
				window.checkErrorVue(res);
				if(res && res.body) {
					that.$store.commit('setPcList', res.body.pclist);
					that.$store.commit('setCount', res.body.count);
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
			modalConfirm: function() {
				let that = this;
				let url = "/yich/StopSellingPrestoreCardServlet";
				let params = {
					prestore_card_id: this.nowOffShelfItem.prestore_card_id,
				};
				this.ajax(url, params, function(res) {
					if(res && res.body) {
						let result = res.body;

						if(result.flag && 1 == result.flag) {
							alert("下架成功！");

							if(that.pclist && that.pclist.length > 0) {
								that.pclist.forEach(function(pcObj, index) {
									if(pcObj.prestore_card_id == that.nowOffShelfItem.prestore_card_id) {
										that.pclist.splice(index, 1);
										return false;
									}
								});
							}

							that.$store.commit('closeModal');
						}
						else {
							alert("下架失败！");
							that.$store.commit('closeModal');
						}
					}
				});
			},
			click2OffTheShelf: function(item) {
				this.nowOffShelfItem = item;
				this.$store.commit('showModal');
			},
			clickToAddCard: function() {
				window.location.href = "/yich/Storage/Storage_pmcAdd.html"; 
			},
			clickToPmcDetail: function(item) {
				window.location.href = "/yich/Storage/Storage_pmcDetail.html?pmcId=" + item.prestore_card_id;
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