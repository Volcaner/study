import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
	name:'',//名字
	money:0,//余额
		/*****record 状态****/
	allpage:1,//总页数	
	nowpage:1,//当前显示的页数
	recordstate:'R',//默认为充值记录 R P 充值 提现
	R:[{createTime:'',name:'',dealnum:'',payway:'',money:'',state:'',statetime:''}],//充值记录
	P:[{createTime:'',name:'',dealnum:'',payway:'',accounts:'',money:'',state:'',statetime:''}],//提现记录
	/**********/
}
const mutations = {
	page(state,n){
		state.nowpage=n.page;
	},	
}
const actions={
	Ajax(context){
		Vue.http.post('/yich/RecordServlet',{option:context.state.recordstate,page:context.state.nowpage},{emulateJSON:true})
		.then((response)=>{   
			window.checkErrorVue(response);
			var data=response.body;
			context.state.name=data.username;
			context.state.money=data.balance;
			context.state.allpage=data.pages;
			if(context.state.recordstate=='R'){ 
				context.state.R.splice(0);
				for(var key in data.list){
					var payway=data.list[key].mode;
					payway=payway=='wechat'?'微信':payway=='alipay'?'支付宝':'其他';
					var state=data.list[key].state;
					state=state=='RI'?'充值中':state=='RS'?'充值成功':state=='RL'?'充值失败':state=='RC'?'充值关闭':state=='GI'?'提现中':state=='GS'?'提现成功':state=='GL'?'提现失败':state=='PS'?'支付成功':'默认状态';
					context.state.R.push({createTime:data.list[key].establish_time,name:'充值',dealnum:data.list[key].alipay_num?data.list[key].alipay_num:'暂无',payway:payway,money:data.list[key].amount,state:state,statetime:data.list[key].end_time?data.list[key].end_time:'充值中暂无'})
				}
			}else if(context.state.recordstate=='P'){
				context.state.P.splice(0);
				for(var key in data.list){
					var payway=data.list[key].mode;
					payway=payway=='wechat'?'微信':payway=='alipay'?'支付宝':'其他';
					var state=data.list[key].state;
					state=state=='RI'?'充值中':state=='RS'?'充值成功':state=='RL'?'充值失败':state=='RC'?'充值关闭':state=='GI'?'提现中':state=='GS'?'提现成功':state=='GL'?'提现失败':state=='PS'?'支付成功':'默认状态';
					context.state.P.push({createTime:data.list[key].establish_time,name:'提现',dealnum:data.list[key].serial_number?data.list[key].serial_number:'提现中暂无',payway:payway,accounts:data.list[key].account,money:data.list[key].amount,state:state,statetime:data.list[key].end_time?data.list[key].end_time:'提现中暂无'})
				}
			}
			
		},(response)=>{
			
		})
	}
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})