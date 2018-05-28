<template>
	<div id='user'>
		<adminTop></adminTop>
		<DingdanTop></DingdanTop>
		<div class='main'>
			<leftNavDdan></leftNavDdan>
			<div class="header">
				<p class="title">现金账户余额</p>
				<span class="cashBalance"><span class="flag">￥</span>{{balance}}</span>
				<button @click="goWithdraw" class="withdrawBtn">提现</button>
				<button @click="goTransfer" class="withdrawBtn">转账</button>
			</div>
			<div class="content">
				<ul class="select" v-show="option=='transation'||option=='withdrawRecord'">
					<li :class="{selected:option=='transation'}" @click="changeOption('transation')">现金账户交易记录</li>
					<li :class="{selected:option=='withdrawRecord'}" @click="changeOption('withdrawRecord')">提现记录</li>
				</ul>
				<div v-show="option=='transation'">
					<div class="conditionBox">
						<!--<span>交易类型：&nbsp;&nbsp;</span><span class="type">入驻缴费</span>-->
						<span style="float:left;">交易类型：&nbsp;&nbsp;</span>
						<label class="label"><input type="radio" v-model="type_jy" value="A"/><span>所有</span></label>
						<label class="label"><input type="radio" v-model="type_jy" value="1"/><span>入驻收入</span></label>
						<label class="label"><input type="radio" v-model="type_jy" value="7"/><span>推广费收入</span></label>
						<label class="label"><input type="radio" v-model="type_jy" value="8"/><span>转账</span></label>
					</div>
					<div class="conditionBox">
						<span>缴费方式：&nbsp;</span>
						<label><input type="radio" name="paymentType" v-model="payment" value="A">全部</label>
						<label><input type="radio" name="paymentType" v-model="payment" value="Y">支付宝</label>
						<label><input type="radio" name="paymentType" v-model="payment" value="X">微信</label>
						<label><input type="radio" name="paymentType" v-model="payment" value="W">余额</label>
					</div>
					<div class="conditionBox">
						<span>缴费时间：&nbsp;</span><span class="type">&nbsp;从&nbsp;&nbsp;</span><input type="text" class="sang_Calender" placeholder="请选择时间" v-model="start"/><span class="type">&nbsp;&nbsp;到&nbsp;&nbsp;&nbsp;</span><input type="text" class="sang_Calender" placeholder="请选择时间" v-model="end"/>						
					</div>
					<button class="search" @click='search'>搜索</button>
					<div class="totalBox">
						<span v-show="payment=='A'||payment=='Y'" class="total">支付宝缴费（元）：<span class="sum">+{{ySum}}</span></span>
						<span v-show="payment=='A'||payment=='X'" class="total">微信缴费（元）：<span class="sum">+{{wSum}}</span></span>
						<span v-show="payment=='A'||payment=='W'" class="total">现金账户缴费（元）：<span class="sum">+{{xSum}}</span></span>
					</div>
					<table>
						<thead>
							<tr>
								<th width="160px">创建时间</th>
								<th width="160px">蚁巢昵称</th>
								<th width="120px">交易类型</th>
								<th width="220px">支付账号/蚁巢交易号</th>
								<th width="120px">支付金额（元）</th>
								<th width="90px">交易状态</th>
								<th width="130px">支付时间</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="record in records" :class="{lose:record.payStatus=='缴费失败'||record.payStatus=='缴费关闭'}">
								<td><p>{{record.gmtCreate}}</p></td>
								<td><p>{{record.username}}</p></td>
								<td><p>{{record.type}}</p></td>
								<td><p>来源：{{record.resource}}</p><p>{{record.alipayNum}}</p></td>
								<td><p class="cash" :class="{losecash:record.payStatus=='缴费失败'||record.payStatus=='缴费关闭'}">{{record.totalFee}}</p></td>
								<td><p>{{record.payStatus}}</p></td>
								<td><p>{{record.gmtPayment}}</p></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div v-show="option=='withdrawRecord'">
					<div class="withdrawTime">
						<span>提现时间：&nbsp;</span><span class="type">&nbsp;从&nbsp;&nbsp;</span><input type="text" class="sang_Calender" placeholder="请选择时间"/><span class="type">&nbsp;&nbsp;到&nbsp;&nbsp;&nbsp;</span><input type="text" class="sang_Calender" placeholder="请选择时间"/>
					</div>
					<input type="button" value="搜索" class="search" @click='withdrawSearch'/>
					<div class="totalBox">
						<span class="total">提现金额（元）：<span class="withdrawSum">-{{withdrawSum}}</span></span>
					</div>
					<table>
						<thead>
							<tr>
								<th width="216px">提现创建时间</th>
								<th width="276px">提现至账号/蚁巢交易号</th>
								<th width="176px">提现金额（元）</th>
								<th width="146px">提现状态</th>
								<th width="186px">提现时间</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="withdrawList in withdrawRecords" :class="{lose:withdrawList.payStatus=='提现失败'||withdrawList.payStatus=='提现关闭'}">
								<td><p>{{withdrawList.establish_time}}</p></td>
								<td><p>至：支付宝（newgoshare@163.com）</p><p>{{withdrawList.alipayNum}}</p></td>
								<td><p class="withdrawSum" :class="{losecash:withdrawList.payStatus=='提现失败'||withdrawList.payStatus=='提现关闭'}">{{withdrawList.amount}}</p></td>
								<td><p>{{withdrawList.payStatus}}</p></td>
								<td><p>{{withdrawList.operation_time}}</p></td>
							</tr>
						</tbody>
					</table>
				</div>
				<fenye :page='pages' v-if='records.length&&fenyeshow||withdrawRecords.length&&fenyeshow' v-show="option=='transation'"></fenye>
				<div class="pull" v-if="option=='pull'">
					<p class="withdrawtitle">提现</p>
					<div>
						<div class="zhifubao">
							<span class="account">提现到支付宝：<span class="number"><img class="logo" src="../../images/z_zfb.png" alt="" />{{zfb}}</span></span>
						</div>
						<div>
							<input class="money" type="text" placeholder="提现金额" v-model.trim="money"/>
							<span>元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;此账户最多可提现金额：<span class="price">{{maxprice}}</span>元</span>
							<p class="pull_sxf">支付宝提现手续费<span class="price">{{ txMoney }}</span>（单笔不超过25元）</p>
						</div>
						<div>
							<button class="search sure" @click='dopull'>确定</a>
						</div>
						<div>
							<a class="goWithdrawRecord" href="javascript:;" @click="changeOption('withdrawRecord')">提现记录</a>
						</div>
					</div>
				</div>
				<div class='ispull' v-if="option=='ispull'">
					<div>
						<p>提现申请已提交，2-3个工作日内到账！</p>
						<div class='middle'>
							<p><span>提现到：</span>支付宝 {{zfb}}</p>
							<p><span>提现金额：</span>{{money}}元</p>
						</div>
						<div class='bottom'>
							<a href="javascript:;" @click="changeOption('withdrawRecord')">提现记录</a>
						</div>					
					</div>
				</div>
			</div>
		</div>
		<transferMT v-if="zzIsShow" :isuser="false"></transferMT>
		<bottom></bottom>
	</div>
</template>
<script>
import {mapState, mapActions, mapMutations} from 'vuex';
import adminTop from '../component/adminTop.vue';
import DingdanTop from '../component/DingdanTop.vue';
import leftNavDdan from '../component/leftNavDdan.vue';
import bottom from '../component/bottom.vue';
import fenye from '../component/fenye.vue';
import transferMT from '../component/transferMT.vue';
export default{
	data(){
		return{
			payment:'A',
			start:'',
			end:'',
			fenyeshow:true,
			withdrawStartTime:'',
			withdrawEndTime:'',
			money:'',
			maxprice:0.00,
			txMoney:'0.2%',
			zfb:'',
			type_jy:'A',
		}
	},
	computed:{
		...mapState(['records','pages','wSum','xSum','ySum','balance','withdrawRecords','withdrawSum','option','withdrawpages','cashpages','zzIsShow']),
	},
	mounted:function(){
		this.balanceRecord();
	},
	methods:{
		...mapMutations(['startTime','endTime','paymentType','page','withdrawStart','withdrawEnd','setZzIsShow']),
		...mapActions(['balanceRecord','getwithdrawRecord']),
		changeOption:function(selected){
			this.$store.state.option = selected;
			this.page({page:'1'});
			this.fenyeshow = false;
			setTimeout(function(){this.fenyeshow=true}.bind(this),0)
			if(selected=='withdrawRecord'){
				this.getwithdrawRecord();
				this.$store.state.pages = this.withdrawpages;
			}else{
				this.$store.state.pages = this.cashpages;
			}
		},
		search:function(){
			this.start=$('.sang_Calender')[0].value;
			this.end=$('.sang_Calender')[1].value;
			this.startTime(this.start);
			this.endTime(this.end);
			this.paymentType(this.payment);
			this.page({page:'1'});
			this.fenyeshow = false;
			setTimeout(function(){this.fenyeshow=true}.bind(this),0)
			this.balanceRecord();
		},
		withdrawSearch:function(){
			this.withdrawStartTime=$('.sang_Calender')[2].value;
			this.withdrawEndTime=$('.sang_Calender')[3].value;
			this.withdrawStart(this.withdrawStartTime);
			this.withdrawEnd(this.withdrawEndTime);
			this.page({page:'1'});
			this.fenyeshow = false;
			setTimeout(function(){this.fenyeshow=true}.bind(this),0)
			this.getwithdrawRecord();
		},
		goWithdraw:function(){
			this.$store.state.option = 'pull';
			this.$http.post('/yich/CheckAlipayServlet')
			.then((response)=>{
				window.checkErrorVue(response);
				var data=response.data;
				this.zfb=data.alipay;
				this.$store.state.balance = response.data.money.toFixed(2);
				this.maxprice = data.upLimit?data.upLimit.toFixed(2):0.00;
			},(response)=>{
				
			})
		},
		dopull:function(){
			this.$http.post('/yich/OrderWithdrawCashServlet',{amount:this.money})
			.then((response)=>{
				window.checkErrorVue(response);
				if(response.data.flag == 1){
					this.$store.state.option = 'ispull';
					this.$store.state.balance = (this.balance - this.money).toFixed(2);
				}
			},(response)=>{
				
			})
		},
		goTransfer:function(){
			this.setZzIsShow(true);
		}
	},
	watch:{
	    type_jy:function(newval,oldval){
	       this.$store.state.typeJy=newval;
	    },
		'money':function(newvalue,oldvalue){
			if(isNaN(newvalue)){
				this.money=oldvalue;
			}else{
				if(newvalue==''||newvalue==0){
					this.txMoney = '0.2%';
				}else if(newvalue>12500){
					this.txMoney = 25;
				}else if(newvalue < 5){
					this.txMoney = 0.00;
				}else{
					this.txMoney = (newvalue*0.002).toFixed(2);
				}
			}
		}
	},
	components:{
		'adminTop':adminTop,
		'DingdanTop':DingdanTop,
		'leftNavDdan':leftNavDdan,
		"bottom":bottom,
		'fenye':fenye,
		'transferMT':transferMT,
	}
}
</script>
<style scoped lang="less">
@import '../../css/base.css';
@import '../../css/public.less';
.main{width:1200px;margin:0 auto;overflow: hidden;margin-bottom:10px;}
.header{margin:10px 0 10px 10px;float:left;width:1000px;height:120px;background:#fff;}
.title{margin:33px 0 20px 37px;font-size:14px;color:#292929;line-height:14px;}
.cashBalance{display:inline-block;margin:0 27px 0 37px;font-size:26px;color:#ff2929;line-height:26px;height:26px}
.flag{font-size:16px;}
.withdrawBtn{display:inline-block;border:1px solid #bbbbbb;border-radius:3px;background:#efefef;width:50px;height:30px;cursor:pointer;font-size:14px;color:#292929;margin-right:12px;}
.content{margin-left:10px;width:1000px;min-height:620px;background:#fff;float:left;overflow:hidden;}
.select{height:37px;border-bottom:1px solid #e9e9e9}
li{float:left;width:150px;font-size:14px;line-height:36px;text-align:center;border-right:1px solid #e9e9e9;cursor:pointer;}
.selected{font-weight:bold;color:#ff0000;border-top:2px solid #ff0000;background:#fff;height:37px}
.conditionBox{padding-left:28px;height:40px;
	>span{display:inline-block;line-height:40px;}
	}
.label{
  float:left;
  display:block;
  overflow:hidden;
  input{
    display:block;
    float:left;
    margin-top:14px;
    margin-right:4px;
    width:12px;
    height:12px;
  }
  span{
    display:block;
    float:left;
    line-height:40px;
  }
}
.type{color:#626262;}
label{color:#626262;margin-right:20px;cursor:pointer;}
input{vertical-align:middle;margin-right:3px;}
.sang_Calender{height:28px;width:150px;color:#626262;}
.search{border:none;width:52px;height:30px;background:#fc3a3a;color:#ffffff;font-size:14px;border-radius:3px;cursor:pointer;margin:10px 0 0 28px;}
.totalBox{height:40px;margin:25px 0 0 28px;line-height:40px;color:#626262;font-size:12px;}
.total{margin-right:20px;}
.sum{color:#ff2929;font-weight:bold;}
table{border-collapse:collapse;}
thead{background:#fafafa;}
th{font-weight:normal;font-size:14px;color:#626262;text-align:left;height:40px;border-bottom:1px solid #e6e6e6;
	&:first-child{padding-left:26px;}}
tbody{color:#626262;}
td{vertical-align:top;height:56px;border-bottom:1px solid #e6e6e6;padding:12px 0 12px 0;font-size:12px;
	&:first-child{padding-left:26px;}}
.lose{color:#bbbbbb;}
.cash{color:#ff2929;font-weight:bold;}
.losecash{color:#bbbbbb;font-weight:normal;}
.withdrawTime{margin:22px 0 10px 28px;}
.withdrawSum{color:#fe8e00;}
.pull{min-height:560px;background:#fff;}
.withdrawtitle{padding:8px 24px;border-bottom:1px solid #e6e6e6;}
.zhifubao{height:85px;padding:18px 0 0 24px;margin-bottom:10px}
.account{display: inline-block;}
.number{display: inline-block;padding:14px 24px;border:1px solid #e6e6e6;color:#666;margin-left:5px;&:hover{background:#fafafa;}}
.logo{vertical-align: middle;margin-right:8px;}
.money{width:100px;height:28px;padding-left:5px;margin-left:24px;border:1px solid #d2d2d2}
.price{color:#ff2929;}
.pull_sxf{margin:20px 0 14px 24px;color:#626262;}
.sure{margin-bottom:40px;}
.goWithdrawRecord{color:005aff;cursor:pointer;margin-left:24px;}
div.ispull{
	margin-top: 10px;
	min-height:560px;
	background:#fff;
	position:relative;
	>div{
		width:250px;
		height:130px;
		position:absolute;top:50%;
		left:50%;
		margin-left:-125px;
		margin-top:-100px;
		>p{
			margin-bottom:20px;
		}
		>div.middle{
			color:#999;
			>p{	
				padding:3px 0;
				>span{
					display: inline-block;
					width:64px;
				}
			}
		}
		>div.bottom{
			margin-top:10px;
			>a{color:#005aff;}
		}
	}
}
</style>