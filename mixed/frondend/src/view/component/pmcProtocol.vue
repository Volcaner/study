<template>
	<div id="pmcProtocol">
		<div class="proArea">
			<div class="c_header clearfix">
				<p>蚁巢预存卡购买协议</p>
				<i class="icon iconfont" @click='close'>&#xe7b1;</i>
			</div>

			<div class="c_content clearfix">
				<div class="con">
					<p>买方购买由卖方发行的商品预付卡，并由卖方为持卡人提供刷卡消费以获取商品或者服务。经买卖双方友好协商，依据《中华人民共和国合同法》及其他相关法律法规的规定，就有关事宜及形成的权利义务约定如下：</p>
					<h5>第一条  卖方提供的服务</h5>
					<p>1.消费服务：卖方应设立符合金融标准的机具终端，为买方提供刷卡消费以获取商品或者服务；但因具体的付款环境及机具功能有所差异，具体功能以卖方可以提供的服务为准。</p>
					<p>2.客户服务：卖方在确保买方持卡正常消费的基础上，还提供以下服务。</p>
					<p>（1）客服电话：卖方提供客服电话以确保买方在消费时遇到的问题能够及时解决。</p>
					<p>（2）网站服务：卖方提供网站为预存卡业务服务性网站，为买方提供最新商户信息查询、余额查询、交易明细查询等服务。</p>
					<p>3.退卡服务：买方可以无条件发起退款，卖方应向买方提供免费退卡服务。</p>
					<p>4.安全保障：卖方确保商品预存卡业务系统以及商户的正常使用，并确保系统的数据不外泄、不丢失。</p>
					<h5>第二条  买卖双方的权利和义务</h5>
					<p>1.卖方应确保买方按照正常手续购买的商品预存卡可以正常使用。</p>
					<p>2.卖方应以网上公告或其他方式告知买方预存卡的使用规则。</p>
					<p>3.卖方依法对买方的信息承担保密义务，未经当事人同意不得向任何单位或个人披露，但法律、法规和规章另有规定的除外。</p>
					<p>4.买方有权使用预存卡到卖方店铺进行刷卡消费，并有权享受与其他客户同等的各种优惠待遇，但商户针对特定客户的优惠除外。</p>
					<p>5.买方有权依据卖方提供的服务实现消费、查询、购卡等卡片的使用和管理功能。</p>
					<p>6.买方应依据预存卡的使用规则合法合理的使用该卡片，买方对预存卡保管不善，导致他人冒用造成的经济损失，应当自行承担；买方亦应合法合理的使用卖方提供的客服热线、网站等服务。</p>
					<h5>第三条  违约责任</h5>
					<p>1.因卖方过错给买方造成损失的，由卖方承担相应的经济责任。卖方工作人员如违反国家有关规定，由有关机关依法进行处理。</p>
					<p>2.若因下列原因致使买方不能使用预存卡的，卖方不承担任何责任：</p>
					<p>（1）预存卡内余额不足以支付买方交易金额；</p>
					<p>（2）卖方因公安司法部门要求冻结的卡片；</p>
					<p>（3）因战争、地震、火灾等不可抗力导致的交易中断、延误等风险。</p>
					<p>3.买卖双方因不可抗力无法履行协议的，根据不可抗力的影响，部分或者全部免除责任，但法律另有规定的除外。当事一方延迟履行协议后发生不可抗力的，不能免除责任。</p>
					<p>4.本协议所称不可抗力，是指不能预见、不能避免并不能克服的客观情况。</p>
					<h5>第四条  本协议的生效</h5>
					<p>1.本协议自买方购买预存卡后，立即生效。</p>
					<p>2.本协议生效后，买卖双方均应遵守本协议内容，履行各自的权利义务。</p>
					<h5>第五条  附则</h5>
					<p>1.买卖双方确认已知悉并充分理解本协议中的条款。</p>
					<p>2.买卖双方同意按照本协议的约定及相关法律法规的规定履行；没有约定和规定，或约定和规定不明确的，各方应按照公平、诚信等原则履行。</p>
					<p>3.因履行本协议所产生的纠纷，双方可协商解决，协商不成的，任何一方均可向卖方所在地的法院提起诉讼。</p>
					<p>
						<b class="introduce">本协议最终解释权归杭州新共秀网络科技有限公司所有</b>
					</p>
				</div>
			</div>

			<div class="c_footer clearfix">
				<p @click='click2Read'><input type="checkbox" name="readed" value="">&nbsp;&nbsp;我已阅读《蚁巢预存卡购买协议》</p>
				<input :class='{readed: bIsReaded}' @click='click2Confirm' type="button" name="readbtn" value="已阅读，前往购买">
			</div>
		</div>
	</div>
</template>
<script charset="utf-8">
	export default{
		data() {
			return {
				bIsReaded: false,
			}
		},
		computed: {

		},
		methods: {
			close: function() {
				this.$emit('close', false);
			},
			click2Read: function() {
				let that = this;
				let checked = $("input[name=readed]")[0].checked;
				if(checked) {
					this.bIsReaded = true;
				}
				else {
					this.bIsReaded = false;
				}
			},
			click2Confirm: function() {
				if(this.bIsReaded) {
					this.$emit('confirm');
				}
			},
		},
		beforeMount: function() {

		},
		components: {

		},
	};
</script>
<style lang='less' scoped>
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
	#pmcProtocol{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 99;
	}

	.proArea{
		position: relative;
		width: 600px;
		height: 500px;
		border: 8px solid rgba(0, 0, 0, 0.5);
		margin: 0 auto;
		margin-top: 266px;
		overflow: hidden;

		>.c_header{
			position: relative;
			background: #e9e9e9;
			border-bottom: 1px solid #d2d2d2;

			>p{
				float: left;
				font-size: 14px;
				font-weight: 900;
				padding: 15px 20px;
			}

			>i{
				float: right;
				font-size: 13px;
				padding: 15px 20px;
				cursor: pointer;
				color: #999;
			}
		}

		>.c_content{
			overflow-y: scroll;
			background: #fff;
			height: 410px;

			>.con{
				padding: 10px 20px;

				>p{
					font-size: 12px;
					color: #212121;
					text-indent: 24px;
					margin-bottom: 30px;

					>.introduce{
						display: block;
						text-align: center;
					}
				}

				>h5{
					font-size: 12px;
					color: #212121;
					text-indent: 24px;
					margin-bottom: 30px;
				}
			}
		}

		>.c_footer{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			background: #e9e9e9;
			border-top: 1px solid #d2d2d2;

			>p{
				float: left;
				font-size: 12px;
				display: block;
				line-height: 1;
				padding: 14px 20px;
				
				>input{
					float: left;
					display: block;
				}
			}

			>input[name=readbtn]{
				float: right;
				width: 120px;
				height: 30px;
				color: #fff;
				background: #a9a9a9;
				border: 1px solid #a8a8a8;
				border-radius: 2px;
				margin: 5px 20px;
			}

			.readed{
				background: #f52e2d !important;
				border: 1px solid #e20000 !important;
			}
			.readed:active{
				background: #e20000 !important;
			}
		}
	}
</style>