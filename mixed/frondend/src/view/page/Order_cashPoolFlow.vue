<template>
	<div id='user'>
		<adminTop></adminTop>
		<DingdanTop></DingdanTop>
		<div class='main'>
			<leftNavDdan></leftNavDdan>
			<div class="header">
				<p class="title">资金池余额</p>
				<span class="cashTotal"><span class="flag">￥</span>{{mp.money}}</span>
				<span class="cashDetail">(
					<span class="c_d">账户余额<b>￥{{mp.balance}}</b></span>
					<span class="c_d">货品押款<b>￥{{mp.goods_payment}}</b></span>
					<span class="c_d">推广费押款<b>￥{{mp.promotion_fee}}</b></span>
				)</span>
			</div>
			<div class="content">
				<div class="record">
					<form>
						<div>
							<span>资金流向：</span>
							<label><input type="radio" name="moneyflow" value="A" v-model="type">所有</label>
							<label><input type="radio" name="moneyflow" value="I" v-model="type">收入</label>
							<label><input type="radio" name="moneyflow" value="O" v-model="type">支出</label>
						</div>
						<div>
							<span>起止日期：</span>
							<input type="text" class="sang_Calender" name="time" id="starttime" placeholder="请选择时间" />
							<i>到</i>
 							<input type="text" class="sang_Calender" name="time" id="endtime" placeholder="请选择时间" /> 
 							<input type="button" class="leftBtn"@click="getAllday" name="time" value="所有">
							<input type="button" @click="getToday" name="time" value="今天">
							<input type="button" @click="getYesterday" name="time" value="昨天">
							<input type="button" @click="getWeek" name="time" value="最近一周">
							<input type="button" @click="getMonth" name="time" value="最近一个月">
						</div>
						<div>
							<span>交易类型：</span>
							<label><input type="radio" name="tradetype" value="0" v-model="tradeType">全部</label>
							<label><input type="radio" name="tradetype" value="1" v-model="tradeType">购买商品</label>
							<label><input type="radio" name="tradetype" value="2" v-model="tradeType">余额充值</label>
							<label><input type="radio" name="tradetype" value="3" v-model="tradeType">购买预存卡</label>
							<label><input type="radio" name="tradetype" value="4" v-model="tradeType">预交推广费</label>
							<label><input type="radio" name="tradetype" value="6" v-model="tradeType">提现</label>
							<label><input type="radio" name="tradetype" value="7" v-model="tradeType">提现手续费</label>
						</div>
						<div>
							<button class="searchBtn" type="button" @click="search">搜索</button>
						</div>
					</form>

					<div class="inoroutmon">
						<span>共搜索到<b>{{mprList.length}}</b>条记录，</span>
						<span>收入：</span><b class="inmon">&yen;{{inCash}}</b>
						<span>支出：</span><b class="outmon">&yen;{{outCash}}</b>
					</div>

					<div class="table">
						<ul>
							<li class="ctime">创建时间</li>
							<li class="type">交易类型</li>
							<li class="num">交易号</li>
							<li class="target">对象</li>
							<li class="money">金额</li>
							<li class="status">交易状态</li>
						</ul>
					</div>

					<div class="tablecontent">
						<ul>
							<!-- <li v-for="item in items" :key="item.index"> -->
							<li  v-for="(item, index) in mprList">
								<ul>
									<li class="ctime">{{item.operate_time}}</li>
									<li class="type">{{item.type}}</li>
									<li class="num">{{item.alipay_num}}</li>
									<li class="target"><span>{{ item.tel }}</span>&nbsp;(&nbsp;<span class="targetuser">{{item.name}}</span>&nbsp;)</li>
									<li :class="item.addsta=='dec'?'money decMoney':'money'">{{item.amount}}</li>
									<li class="status">交易成功</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>

				<div class="fenyePosition">
					<fenye :page='allpage'></fenye>
				</div>
			</div>
		</div>
		<bottom></bottom>
	</div>
</template>
<script type="text/javascript" charset="utf-8">
	import {mapState, mapActions, mapMutations} from 'vuex';
    import adminTop from '../component/adminTop.vue';
    import DingdanTop from '../component/DingdanTop.vue';
    import leftNavDdan from '../component/leftNavDdan.vue';
    import bottom from '../component/bottom.vue';
    import fenye from '../component/fenye.vue';
    export default{
    	data() {
    		return {
    			type: 'A',
    			tradeType: '0',
    		}
    	},
    	computed: {
    		...mapState(['allpage', 'mp', 'mprList', 'inCash', 'outCash']),
    	},
    	mounted: function() {
    		let that = this;
    		this.$store.dispatch('Ajax');
    	},
    	methods: {
    		getAllday:function(){
				var start = document.getElementById('starttime');
				var end = document.getElementById('endtime');
				start.value = "";
				end.value = "";
			},
    		getToday:function(){
				var start = document.getElementById('starttime');
				var end = document.getElementById('endtime');
				start.value = this.getDayStr(0);
				end.value = this.getDateStr(0);
			},
			getYesterday:function(){
				var start = document.getElementById('starttime');
				var end = document.getElementById('endtime');
				start.value = this.getDayStr(1);
				end.value = this.getDayStr(0);
			},
			getWeek:function(){
				var start = document.getElementById('starttime');
				var end = document.getElementById('endtime');
				start.value = this.getDateStr(7);
				end.value = this.getDateStr(0);
			},
			getMonth:function(){
				var start = document.getElementById('starttime');
				var end = document.getElementById('endtime');
				start.value = this.getDateStr(30);
				end.value = this.getDateStr(0);
			},
			getDateStr: function(count){
				var date = new Date();
				var targetday_milliseconds=date.getTime() - 1000*60*60*24*count;          
  				date.setTime(targetday_milliseconds);
				var year = date.getFullYear();
				var month = (date.getMonth()+1) < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1);
				var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
				var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
				var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
				var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
				return (year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second);
			},
			getDayStr: function(count){
				var date = new Date();
				var targetday_milliseconds=date.getTime() - 1000*60*60*24*count;          
  				date.setTime(targetday_milliseconds);
				var year = date.getFullYear();
				var month = (date.getMonth()+1) < 10 ? '0' + (date.getMonth()+1) : (date.getMonth()+1);
				var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
				return (year+'-'+month+'-'+day+' 00:00:00');
			},
			search: function(){
				let that = this;
				var start = document.getElementById('starttime');
				var end = document.getElementById('endtime');
				this.$store.commit('page', {page: 1});
				this.$store.commit('setOption', this.type);
				this.$store.commit('setType', this.tradeType);
				this.$store.commit('setStartTime', start.value);
				this.$store.commit('setEndTime', end.value);
				this.$store.dispatch('Ajax');
			},
    	},
    	watch: {

    	},
    	components: {
    		'adminTop': adminTop,
		    'DingdanTop': DingdanTop,
		    'leftNavDdan': leftNavDdan,
		    'bottom': bottom,
		    'fenye': fenye,
	    }
    }
</script>
<style scoped lang="less">
	@import '../../css/base.css';
	@import '../../css/public.less';
	.main{width:1200px;margin:0 auto;overflow: hidden;margin-bottom:10px;}
	.header{margin:10px 0 10px 10px;float:left;width:1000px;height:120px;background:#fff;}
	.title{margin:33px 0 20px 37px;font-size:14px;color:#292929;line-height:14px;}
	.content{margin-left:10px;width:1000px;min-height:620px;background:#fff;float:left;overflow:hidden;}
	.cashTotal{display:inline-block;margin:0 27px 0 37px;font-size:24px;color:#ff2929;line-height:24px;height:24px}
	.flag{font-size:14px;}
	.cashDetail{
		display: inline-block;
		margin: 0 10px;
		font-size: 14px;
		color: #212121;

		.c_d{
			margin-right: 40px;

			>b{
				font-weight: normal;
				color: #ff0000;
				margin-left: 12px;
			}
		}
		.c_d:last-child{
			margin-right: 0;
		}
	}
	.record{
		font-size:12px;
		padding: 8px 24px;

		>form{
			>div{
				padding: 8px 0;
				>span{
					/* color: #666; */
					margin-right: 1px;
				}
				>label{
					color: #666;
					margin-right: 10px;
					/* vertical-align: middle; */
					>input{
						margin-right: 5px;
						vertical-align: middle;
					}
				}
				>i{
					margin: 0 10px;
					vertical-align: middle;
				}
				>input[type=text]{
					color:#666;
					height: 26px;
					width:120px;
					padding: 0px 9px;
				}
				>input[type=button]{
					height: 26px;
					padding: 0px 9px;
					margin: 0 2px;
					vertical-align: middle;
					border: none;
					background: none;
				}
				>input[type=button]:hover{
					color: #fff;
					background: #999999;
				}
				>input.leftBtn{
					margin-left:14px;
				}
				>button.searchBtn{
					padding: 5px 15px;
					margin-top: 2px;
					color: #fff;
					font-size: 14px;
					vertical-align: middle;
					border: none;
					background: #f52f2f;
					border-radius: 5px 5px;
				}
				>button.searchBtn:active{
					color: #999999;
				}
			}
		}

		>div.inoroutmon{
			margin-top: 24px;
			>span{
				color: #666;
				margin-right: 5px;
				font-size: 12px;

				>b{
					margin: 0 5px;
					font-weight: normal;
				}
			}
			>b.inmon{
				color: #f52f2f;
				margin-right: 20px;
				font-size: 12px;
			}
			>b.outmon{
				color: #fe8e00;
				margin-right: 20px;
				font-size: 12px;
			}
		}

		>div.table{
			margin-top: 13px; 
			// margin-left: -24px;
			// margin-right: -24px;
			padding: 0 14px;
			background-color: #eee;
			height: 38px;
			line-height: 38px;
			border-bottom: 1px solid #e6e6e6;
			font-weight: bold;

			>ul{
				width: 100%;
				/* border-bottom: 1px solid #e6e6e6; */
				>li{
					display: inline-block;
					vertical-align: middle;
					color: #626262;
					font-size: 14px;
					list-style: none;
					
					/* margin-right: 2%; */
				}

			}
		}

		>div.tablecontent{
			// margin-left: -24px;
			// margin-right: -24px;
			// padding: 0 14px;
			>ul{
				>li{
					>ul{
						// padding: 10px 0;
						// margin-left: -24px;
						// margin-right: -24px;
						padding: 10px 14px;
						width: 100%;
						// height: 37px;
						border-bottom: 1px solid #e6e6e6;
						>li{
							display: inline-block;
							vertical-align: middle;
							color: #626262;
							font-size: 12px;
							//line-height: 37px;
							min-height: 37px;
							/* margin: 5px 2% 10px 0; */
							list-style: none;
							word-break: break-all;
							word-wrap: break-word;
						}
						>li.income{
							color: #ff2929;
							font-weight: bold;
						}
						>li.expenditure{
							color: #fe8e00;
							font-weight: bold;
						}
						>li.tradeFail{
							color: #bbbbbb;
						}
					}
				}
			}
		}

		.ctime{
			width: 165px;
			height: 37px;
		}
		.type{
			width: 161px;
			height: 37px;
		}
		.num{
			width: 169px;
			height: 37px;
		}
		.target{
			width: 245px;
			height: 37px;
			span{
				display:inline-block;
			}
			.targetuser{
				position:relative;
				top:3px;
				max-width:145px;
				white-space: nowrap;
			    text-overflow: ellipsis;
			    overflow: hidden;
			}
		}
		.money{
			width: 87px;
			height: 37px;
			color:#f52f2f !important;
		}
		.decMoney{
			color:#fe8e00 !important;
		}
		.status{
			width: 76px;
			height: 37px;
		}
	}
	.sang_Calender{height:28px !important;width:150px !important;color:#626262 !important;}
</style>