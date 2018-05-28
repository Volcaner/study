<!-- 预售卡组件 -->
<template>
	<div class="preCard">
		<!-- 已售、库存、未使用金额、卡内已消费完、退款金额 -->
		<div class="cardStock clearfix">
			<p v-if='bIsSold'>已售<b>{{soldAm?soldAm:0}}</b>张</p>
			<p v-if='bIsStock'>库存<b>{{stockAm?stockAm:0}}</b>张</p>
			<p v-if='bIsUnusedM'>未使用金额：<b>{{unUsedM}}</b>元</p>
			<p v-if='bIsConsumed'>卡内金额已消费完</p>
			<p v-if='bIsRefundM'>退款金额：<b>{{refundM}}</b>元</p>
			<p v-if='bIsDrawbOk' class="floatRight">退款成功</p>
		</div>

		<!-- 预存卡名字、折扣 -->
		<div class="cardInfo" @click='click2PmcDetail'>
			<div class="cardName">
				<p :title='name'>{{name?name:"---"}}</p>
			</div>

			<div :class='["cardDiscount clearfix", bIsUN?"notsale_dash":"onsale_dash"]'>
				<p :class='[bIsUN?"notsale":"onsale"]'>
					<strong>{{discount?discount:0}}</strong>
					<b>折</b>
					<span v-if='bIsSoldNo'>{{soldNo}}</span>
				</p>
			</div>
		</div>

		<!-- 预存、金额、购买、申请退款、退款成功、删除 -->
		<div class="cardHandle clearfix">
			<div class="c_leftBtn floatLeft">
				
			</div>

			<div class="sumOfMoney floatLeft">
				<p v-if='bIsSumM'>￥<b>{{totalM}}</b></p>
			</div>

			<div class="c_rightBtn floatRight">
				<input @click='click2Buy' v-if='bIsBuy' type="button" name="buy" value="购买">
				<input @click='click2Drawb' v-if='bIsDrawb' type="button" name="drawback" value="申请退款">
				<input @click='click2OffTheShelf' v-if='bIsOffS' type="button" name="offTheShelf" value="下架">
				<i @click='click2Delete' v-if='bIsDelete' class="icon iconfont" style="font-size:17px;">&#xe628;</i>
			</div>

			<div class="drawback_tips floatRight">
				<p v-if='bIsDrawbing' class="deepred">退款中</p>
			</div>
		</div>
	</div>
</template>
<script charset="utf-8">
	export default({
		data() {
			return {

			}
		},
		// 详情页、已下架或已失效、已售999张、库存999张、未使用金额：999元、退款金额：20元、9.5折、预售卡名字、总金额、小b卡号
		// 'bIsDetail'、'bIsUN', 'soldAm', 'stockAm', 'unUsedM', 'refundM', 'discount', 'name', 'totalM', 'soldNo', 
		// 已售、库存、未使用金额、卡内已消费完、退款金额、金额、下架、购买、申请退款、退款成功、退款中、删除、小b卡号
		// 'bIsSold', 'bIsStock', 'bIsUnusedM', 'bIsConsumed', 'bIsRefundM', 'bIsSumM', 'bIsOffS', 'bIsBuy', 'bIsDrawb', 'bIsDrawbOk', 'bIsDrawbing', 'bIsDelete', 'bIsSoldNo'
		props: ['bIsDetail', 'bIsUN', 'soldAm', 'stockAm', 'unUsedM', 'refundM', 'discount', 'name', 'totalM', 'soldNo', 
			'bIsSold', 'bIsStock', 'bIsUnusedM', 'bIsConsumed', 'bIsRefundM', 'bIsSumM', 'bIsOffS', 'bIsBuy', 'bIsDrawb', 'bIsDrawbOk', 'bIsDrawbing', 'bIsDelete', 'bIsSoldNo'],
		computed: {

		},
		methods: {
			click2OffTheShelf: function() {
				this.$emit('offTheShelf');
			},
			click2PmcDetail: function() {
				if(this.bIsDetail) {
					this.$emit('pmcClick');
				}
			},
			click2Delete: function() {
				if(this.bIsDelete) {
					this.$emit('delete');
				}
			},
			click2Buy: function() {
				if(this.bIsBuy) {
					this.$emit('buy');
				}
			},
			click2Drawb: function() {
				if(this.bIsDrawb) {
					this.$emit('drawback');
				}
			},
		},
		beforeMount: function() {

		},
		mounted() {
			// console.log(this.bIsSold);
		},
		components: {

		},
	});
</script>
<style lang="less" scoped>
	.clearfix:after{
		content: "";
		display: block;
		clear: both;
		zoom: 1;
		height: 1px;
	}
	.hide{
		display: none;
		visibility: hidden;
		width: 0;
		height: 0;
	}
	.preCard{
		position: relative;
		width: 100%;
	}
	.cardStock{
		margin-bottom: 8px;
	}
	.cardStock>p{
		float: left;
		font-size: 12px;
		color: #777;
	}
	.cardStock>p:first-child{
		padding-right: 12px;
	}
	.cardStock>p>b{
		font-weight: normal;
	}
	.cardInfo{
		width: 180px;
		border: solid 1px #d2d2d2;
		cursor: pointer;
	}
	.cardName{

	}
	.cardName>p{
		font-size: 14px;
		color: #212121;
		padding: 10px 10px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.cardDiscount{

		>p{
			display: block;
			font-size: 40px;
			color: #fff;
			font-family: "Impact";
			text-align: center;
			padding: 10px 0;

			>strong{
				font-size: 40px;
				font-weight: normal;
				height: 48px;
			}

			>b{
				font-size: 16px;
				color: #fff;
				font-weight: normal;
			}

			>span{
				display: block;
				width: 100%;
				font-size: 12px;
				color: #fff;
				font-family: "微软雅黑";
				font-weight: normal;
				text-align: right;
				padding-right: 8px;
				padding-top: 10px;
				height: 26px;
			}
		}
	}
	.onsale_dash{
		border-top: dashed 1px rgba(226, 0, 0, 0.55);
	}
	.notsale_dash{
		border-top: dashed 1px rgba(119, 119, 119, 0.75);
	}
	.onsale{
		background: rgba(226, 0, 0, 0.55);
		/*background: #ff6d6d;*/
	}
	.onsale:hover{
		transition:background 0.2s ease-in 0s;
		background: rgba(226, 0, 0, 1);
		/*background: #e20000;*/
	}
	.notsale{
		background: rgba(119, 119, 119, 0.75);
		/*background: #777;*/
	}
	.notsale:hover{
		transition:background 0.2s ease-in 0s;
		background: rgba(119, 119, 119, 1);
		/*background: #999;*/
	}
	.cardHandle{
		position: relative;
		padding-top: 7px;
	}
	.cardHandle>div{
		display: block;
	}
	.cardHandle>div p,input,b{
		font-size: 12px;
		font-weight: normal;
	}
	.cardHandle>div input{
		cursor: pointer;
	}
	.sumOfMoney{
		padding: 4px 7px;
		padding-left: 0;
	}
	.c_leftBtn{

	}
	.c_rightBtn{

	}
	.c_rightBtn>i{
		color: #212121;
		cursor: pointer;
		padding: 3px 0 3px 7px;
		display: block;
	}
	.c_rightBtn>input{
		border: solid 1px #d2d2d2;
		border-radius: 3px; 
		background: #fff;
		color: #212121;
		padding: 3px 7px;
	}
	.c_rightBtn>input:active{
		background: #eee;
	}
	.floatLeft{
		float: left !important;
	}
	.floatRight{
		float: right !important;
	}
	.deepred{
		color: #e20000 !important;
	}
	.drawback_tips>p{
		padding: 4px 7px;
		color: #777;
	}
</style>