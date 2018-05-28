<template>
	<div id="pmcAdd">
		<top></top>
		<StorageTop></StorageTop>
		<div class="auto_main">
			<leftNavIndex></leftNavIndex>
			<div class="right">
				<p class="pf_title"><a href="/yich/Storage/Storage_preMemoryCard.html">预存卡</a>><a href="">新增预存卡</a></p>
				<div class="pf_con">
					<div class="card_add">
						<div>
							<label>名称：<b>*</b></label>
							<input v-model='strName' type="text" name="" value="" maxlength="20">
							<span>{{strName.length}}/20</span>
						</div>
						<div>
							<label>出售金额：<b>*</b></label>
							<input v-model='strMoney' type="text" name="" value="" maxlength="10">
							<span>元</span>
						</div>
						<div>
							<label>折扣：<b>*</b></label>
							<input v-model='strDiscount' type="text" name="" value="" maxlength="3">
							<span>折</span>
						</div>
						<div>
							<label>发行量：<b>*</b></label>
							<input v-model='strCount' type="text" name="" value="" maxlength="5">
							<span>张</span>
						</div>
						<button type="button" @click='clickToSave'>保存</button>
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
	// import {mapState,mapMutations,mapActions} from 'vuex';
	export default{
		data() {
			return {
				strName: '',
				strMoney: '',
				strDiscount: '',
				strCount: '',
			}
		},
		computed: {
			
		},
		beforeMount: function() {

		},
		mounted() {
			
		},
		methods: {
			ajax: function(url, params, callback) {
				this.$http.post(url, params, {emulateJSON: true}).then(function(res) {
					console.log(res);
					callback(res);
				}, function(error) {
					console.log(error);
					// window.location.href = "/dist/error404/error404.html"; 
				});
			},
			clickToSave: function() {
				let that = this;

				let url = "/yich/IssuePrestoreCardServlet";
				let params = {
					prestoreCardName: this.strName,
					faceValue: this.strMoney,
					discount: this.strDiscount,
					issueNum: this.strCount
				};
				this.ajax(url, params, function(res) {
					if(res && res.body) {
						if(res.body.flag && 1 == res.body.flag) {
							window.location.href = "/yich/Storage/Storage_preMemoryCard.html"; 
						}
						else {
							alert("新增预存卡失败！");
						}
					}
				})
			},
			isStrNoU: function(str) {
				// null or undefined
				if(str == null || str == undefined || str == '') {
					return true;
				}
				return false;
			},
			isNaN: function(str) {
				if(isNaN(str) || str == '' || str == null || str == undefined) {
					return true;
				}
				return false;
			},
		},
		components: {
			"top":top,
			"StorageTop":StorageTop,
			"bottom":bottom,
			"leftNavIndex":leftNavIndex,
		},
		watch: {
			'strName': function(newVal, oldVal) {
				let that = this;
				console.log(newVal);

				let reg = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\ ]/g;
				this.strName = newVal.replace(reg, '');
			},
			'strMoney': function(newVal, oldVal) {
				let that = this;
				console.log(newVal);

				let reg = /^(\-)*(\d+)\.(\d\d).*$/;
				if(this.isNaN(newVal)) {
					if(newVal == '') {
						this.strMoney = '';
					}
					else {
						this.strMoney = oldVal;
					}
				}
				else {
					this.strMoney = newVal.replace(reg, '$1$2.$3');
				}
				
				if(newVal > 1000000) {
					this.strMoney = "999999";
				}
			},
			'strDiscount': function(newVal, oldVal) {
				let that = this;
				console.log(newVal);

				if(this.isNaN(newVal)) {
					if(newVal == '') {
						this.strDiscount = '';
					}
					else {
						this.strDiscount = oldVal;
					}
				}
				else if(parseFloat(newVal) > 9.9) {
					this.strDiscount = 9.9;
				}
			},
			'strCount': function(newVal, oldVal) {
				let that = this;
				console.log(newVal);

				let reg = /\D/g;
				this.strCount = newVal.replace(reg, '');

				if(this.strCount && parseInt(this.strCount) <= 0) {
					this.strCount = "";
				}
			},
		}
	};
</script>