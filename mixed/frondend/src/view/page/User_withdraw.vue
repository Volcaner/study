<template>
	<div id="user">
		<top></top>
		<div class="CompanyInf">
			<div class="top">
				<a href=""><img src="../../images/z_cash.png" alt="" /></a>
				<ul class="top_ul">
					<li><a href=''>我的账户</a></li>
					<li><a href="/yich/User/User_cash.html?do=push" >充值</a></li>
					<li><a href="/yich/User/User_cash.html?do=pull" >提现</a></li>
					
				</ul>
			</div>
		</div>
		<div class="main">
			<div class='maintop'>
				<p>您好，<span>{{this.$store.state.name}}</span>的小店</p>
				<div><span class="center">账户余额</span><b>&yen;{{parseFloat(this.$store.state.money).toFixed(2)}}</b>
					<span>
						<a href="/yich/User/User_cash.html?do=push">充值</a>
						<span>|</span>
						<a href="/yich/User/User_cash.html?do=pull">提现</a>
						<span>|</span>
						<a class="" @click="zzClickFun">转账</a>
					</span>
				</div>
			</div>
			<div class='record' v-if='page=="record"'>
				<p>交易记录</p>
				<div>
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
 							<input type="button" class="leftBtn" @click="getAllday" name="time" value="所有">
							<input type="button" @click="getToday" name="time" value="今天">
							<input type="button" @click="getYesterday" name="time" value="昨天">
							<input type="button" @click="getWeek" name="time" value="最近一周">
							<input type="button" @click="getMonth" name="time" value="最近一个月">
						</div>
						<div>
							<span>交易类型：</span>
							<label><input type="radio" name="tradetype" value="A" v-model="tradeType">所有</label>
							<label v-if="withdrawRadio"><input type="radio" name="tradetype" value="G" v-model="tradeType">提现</label>
							<label v-if="rechargeRadio"><input type="radio" name="tradetype" value="R" v-model="tradeType">充值</label>
							<label v-if="balancePaymentRadio"><input type="radio" name="tradetype" value="P" v-model="tradeType">余额支付</label>
							<label v-if="refundRadio"><input type="radio" name="tradetype" value="B" v-model="tradeType">退款</label>
							<label v-if="confirmReceiptRadio"><input type="radio" name="tradetype" value="T" v-model="tradeType">确认收货</label>
							<label v-if="confirmReceiptRadio"><input type="radio" name="tradetype" value="TA" v-model="tradeType">转账</label>
						</div>
						<div>
							<button class="searchBtn" type="button" @click="search">搜索</button>
						</div>
					</form>
					<div class="inoroutmon">
						<span>收入：</span><b class="inmon">&yen;{{parseFloat(this.$store.state.in).toFixed(2)}}</b>
						<span>支出：</span><b class="outmon">&yen;{{parseFloat(this.$store.state.out).toFixed(2)}}</b>
					</div>
					<div class="table">
						<ul>
							<li class="ctime">创建时间</li>
							<li class="type">交易类型</li>
							<li class="target">对象|交易号</li>
							<li class="money">金额</li>
							<li class="status">交易状态</li>
							<li class="ttime">交易时间</li>
						</ul>
					</div>
					<div class="tablecontent">
						<ul>
							<!-- <li v-for="item in items" :key="item.index"> -->
							<li v-for="(item,index) in datalist">
								<ul>
									<li class="ctime" v-bind:class="{tradeFail: isFail(index)}">{{item.establish_time}}</li>
									<li class="type" v-bind:class="{tradeFail: isFail(index)}">{{tradeTitle(index)}}<span v-if="(item.pay&&item.pay.payTitle)||item.title">-<span class="remark">{{tradeTitleSubject(index)}}</span></span></li>
									<li class="target" v-bind:class="{tradeFail: isFail(index)}"><span v-if="isExpenditure(index)">至：&nbsp;&nbsp;&nbsp;</span><span v-if="isIncome(index)">来源：</span><span><!--  v-if="item.mode=='alipay'&&!iscard(index)">支付宝</span><span v-if="item.mode=='wechat'&&!iscard(index)">微信</span><span v-if="(item.mode==null||item.mode=='BALANCE')&&!iscard(index)">蚁巢系统</span><span v-if="iscard(index)">-->{{iscard(index)}}</span><!-- <span v-if="item.account">：{{item.account}}</span> --></br>{{item.br_id}}</li>
									<li class="money" v-bind:class="{income: isIncome(index),expenditure:isExpenditure(index),tradeFail: isFail(index)}"><span v-if="isIncome(index)">+</span><span v-if="isExpenditure(index)">-</span>{{parseFloat(item.amount).toFixed(2)}}</li>
									<li class="status" v-bind:class="{tradeFail: isFail(index)}">{{tradeStatus(index)}}</li>
									<li class="ttime" v-bind:class="{tradeFail: isFail(index)}">{{item.operation_time}}</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
				<div class="fenyePosition" v-if='record.fisshow&&datalist.length'>
					<fenye :page='allpage' v-if='show'></fenye>
				</div>
			</div>
		</div>
		<transferMT v-if="zzIsShow" :isuser="true"></transferMT>	
		<bottom></bottom>
	</div>
</template>
<script>
import { mapState,mapActions,mapMutations } from 'vuex'
	import top from '../component/top.vue';
	import transferMT from '../component/transferMT.vue';
	import bottom from '../component/bottom.vue';
	import fenye from '../component/fenye.vue';

	export default{
		data() {
			return{
				page:'record',  //页面状态 record pull ispull push  记录 提现 提现成功 充值
				record:{  //记录
					state:'push',  //push pull 充值记录 提现记录
					fisshow:true,  //分页的显示
				},
				tradeType:'A', //交易类型
				type:'A', //资金流向
				timeData1:'',
				withdrawRadio: true,
				rechargeRadio: true,
				balancePaymentRadio: true,
				refundRadio: true,
				confirmReceiptRadio:'',
				show:true,
			}
		},
		computed:{
			...mapState(['datalist','bB','allpage','zzIsShow']),
		},
		mounted: function() {
			this.$store.state.json={'option':'A','type':'A','startTime':'','endTime':'','bB':'','page':1};
			//this.$store.dispatch('Ajax');
			this.$emit(this.Ajax());
			if(location.search.indexOf('push') !== -1){
				this.changepage("push")
			}else if(location.search.indexOf('pull') !== -1){
				this.changepage("pull")
			}	
		},
		methods: {
			...mapMutations(["setZzIsShow"]),
			...mapActions({Ajax:'Ajax'}),
			search: function(){
				this.show=false;
				var _this=this;
				setTimeout(function(){
					_this.show=true;
				},0);
				var start = document.getElementById('starttime');
				var end = document.getElementById('endtime');
				this.$store.state.nowpage = 1; 
				this.$store.state.json={'option':this.tradeType,'type':this.type,'startTime':start.value,'endTime':end.value,'bB':this.bB,'page':1};
				this.$emit(this.Ajax());
			},
			tradeTitleSubject: function(index){
				var titleSubject = typeof(this.datalist[index].pay)!='undefined'  ? this.datalist[index].pay.payTitle : typeof(this.datalist[index].title)!='undefined' ? this.datalist[index].title : ''; 
				if (titleSubject.length <= 30){
					return titleSubject;
				}else{
					return titleSubject.slice(0,27) +'...';
				}
			},
			isFail: function(index){
				var state = this.datalist[index].state;
				return state=='RCR'?false:state=='CR'?false:state=='SCARD'?false:state=='CARD'?false:state=='RI'?false:state=='RS'?false:state=='DER'?false:state=='DP'?false:state=='RL'?true:state=='RC'?false:state=='GI'?false:state=='GS'?false:state=='GL'?true:state=='PS'?false:state=='OPS'?false:state=='T'?false:state=='B'?false:false;
			},
			iscard:function(index){
				//if(this.datalist[index].state=='CARD'||this.datalist[index].state=='SCARD'){
					return (this.datalist[index].business&&this.datalist[index].business.name)?(this.datalist[index].business.name+'的现金账户'):'无';
				//}
			},
			isIncome: function(index){
				var state = this.datalist[index].state;
				return state=='PGA'?false:state=='PA'?false:state=='PR'?true:state=='RCR'?true:state=='CR'?false:state=='SCARD'?true:state=='CARD'?false:state=='RI'?true:state=='RS'?true:state=='RL'?true:state=='DER'?true:state=='DP'?true:state=='RC'?true:state=='GI'?false:state=='GS'?false:state=='GL'?false:state=='PS'?false:state=='PC'?false:state=='OPS'?false:state=='T'?true:state=='B'?true:state=='TAI'?true:state=='TAO'?false:false;
			},
			isExpenditure :function(index){
				var state = this.datalist[index].state;
				return state=='PGA'?true:state=='PA'?true:state=='PR'?false:state=='RCR'?false:state=='CR'?true:state=='SCARD'?false:state=='CARD'?true:state=='RI'?false:state=='RS'?false:state=='DER'?false:state=='DP'?false:state=='RL'?false:state=='RC'?false:state=='GI'?true:state=='GS'?true:state=='GL'?true:state=='PS'?true:state=='PC'?true:state=='OPS'?true:state=='T'?false:state=='B'?false:state=='TAI'?false:state=='TAO'?true:false;
			},
			tradeStatus: function(index){
				var state = this.datalist[index].state;
				return state=='RCR'?'交易成功':state=='CR'?'交易成功':state=='SCARD'?'交易成功':state=='CARD'?'交易成功':state=='DER'?'交易成功':state=='DP'?'交易成功':state=='RI'?'交易中...':state=='RS'?'交易成功':state=='DER'?'交易成功':state=='DP'?'交易成功':state=='RL'?'交易失败':state=='RC'?'交易关闭':state=='GI'?'交易中...':state=='GS'?'交易成功':state=='GL'?'交易失败':state=='PS'?'交易成功':state=='OPS'?'交易成功':state=='T'?'交易成功':state=='B'?'交易成功':state=='TAO'?'交易成功':state=='TAI'?'交易成功':'默认状态';
			},
			tradeTitle: function(index){
				var state = this.datalist[index].state;
				return state=='GR'?'余额退回':state=='GL'?'提现失败':state=='RCR'?'接收预存卡退款':state=='CR'?'预存卡退款':state=='SCARD'?'出售预存卡':state=='CARD'?'购买预存卡':state=='DER'?'转售异常退款':state=='DP'?'转售利润':state=='RI'?'充值':state=='RS'?'充值':state=='RL'?'充值':state=='RC'?'充值':state=='GI'?'提现':state=='GS'?'提现':state=='GL'?'提现':state=='PS'?'余额支付':state=='PC'?'余额支付':state=='OPS'?'余额支付':state=='T'?'确认收货':state=='B'?'退款':state=='TAO'?'转账':state=='TAI'?'转账':'默认状态';
			},
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
			zzClickFun:function(){
				this.setZzIsShow(true);
			},
		},
		watch: {
			bB:function(newval){
				if(this.bB === 'B'){
					this.confirmReceiptRadio = true;
				};
			},
			type: function(newval){
				if(newval == 'A'){
					this.withdrawRadio = true;
					this.balancePaymentRadio = true;
					this.rechargeRadio = true;
					this.refundRadio = true;
					if(this.bB === 'B'){
						this.confirmReceiptRadio = true;
					};
				}else if(newval == 'I'){
					this.withdrawRadio = false;
					this.balancePaymentRadio = false;
					this.rechargeRadio = true;
					this.refundRadio = true;
					if(this.bB === 'B'){
						this.confirmReceiptRadio = true;
					};
				}else{
					this.withdrawRadio = true;
					this.balancePaymentRadio = true;
					this.rechargeRadio = false;
					this.refundRadio = false;
					this.confirmReceiptRadio = false;
				}
			},
		},
		components: {
			'top': top,
			'transferMT':transferMT,
			'bottom': bottom,
			'fenye': fenye,
		}
	}
</script>
<style scoped lang="less">
	@import '../../css/base.css';
	@import '../../css/public.less';
	#user{
		background: #e9e9e9;
	}
	.CompanyInf{
		width:100%;
		height:85px;
		background:#e20000;	
		margin-top:2px;
	}
	.top{
		width:1200px;	
		background:#e20000;
		margin:auto;
		overflow:hidden;
		a{
			display:block;
			float:left;
			img{
				display:block;
			}
		}
		.top_ul{
			overflow:hidden;
			float:left;
			margin-left:15px;
			li{
				display:block;
				cursor:pointer;
				font-size:16px;
				color:#ffffff;
				line-height:85px;
				float:left;
				padding:0 25px;
				a{
				  color:#ffffff;
				 }
			}
		}
	}
	.main{
		width:1200px;
		background: #e9e9e9;
		margin:0 auto;
		margin-bottom:10px;
		overflow: hidden; 
		>div.maintop{
			background:#fff;
			margin-top:10px;
			padding:23px 24px;
			>p{margin-bottom:20px;font-size: 14px;}
			>div{
				color:#666;
				font-size:12px;
				>span.center{vertical-align:middle;margin:0}
				>b{color:#e20000;margin:0 10px;font-size:18px;font-weight:900;vertical-align:middle}
				>span{
					margin-left:10px;
					vertical-align:middle;
					>span{
						margin:0 9px;
						color:#005aff;
					}
					>a{color:#005aff;cursor:pointer;}
				}
			}
		}
		>div.record{
			margin-top: 10px;
			min-height: 670px;
			background: #fff;
			>p{
				padding: 8px 24px;
				border-bottom: 1px solid #e6e6e6;
				font-size: 14px;
			}
			>div{
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
					margin-left: -24px;
					margin-right: -24px;
					padding-left: 24px;
					background-color: #fafafa;
					height: 38px;
					line-height: 38px;
					border-bottom: 1px solid #e6e6e6;
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
					margin-left: -24px;
					margin-right: -24px;
					padding-left: 24px;
					>ul{
						>li{
							>ul{
								padding: 10px 0;
								margin-left: -24px;
								margin-right: -24px;
								padding-left: 24px;
								width: 100%;
								height: 37px;
								border-bottom: 1px solid #e6e6e6;
								>li{
									display: inline-block;
									vertical-align: middle;
									color: #626262;
									font-size: 12px;
									height: 37px;
									/* margin: 5px 2% 10px 0; */
									list-style: none;
									line-height: 1.5;
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
					width: 166px;
					height: 37px;
				}
				.type{
					width: 213px;
					padding-right:80px;
					overflow: hidden;
					height: 37px;
				}
				.target{
					width: 322px;
					height: 37px;
				}
				.money{
					width: 132px;
					height: 37px;
				}
				.status{
					width: 105px;
					height: 37px;
				}
				.ttime{
					width: 127px;
					height: 37px;						
				}
				.remark{
					color: #bbbbbb;
				}
			}
		}
		.fenyePosition{
			margin-right:-32px;
		}
	}
</style>