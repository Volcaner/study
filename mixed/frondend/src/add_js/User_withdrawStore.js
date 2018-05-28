import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
	name:'',//名字
	money:0,//余额
	bB:'',
	json:'',
	in:0,
	out:0,
		/*****record 状态****/
	allpage:1,//总页数	
	nowpage:1,//当前显示的页数
//	recordstate:'A',//默认为充值记录 R P 充值 提现
	R:[{createTime:'',name:'',dealnum:'',payway:'',money:'',state:'',statetime:''}],//充值记录
	P:[{createTime:'',name:'',dealnum:'',payway:'',accounts:'',money:'',state:'',statetime:''}],//提现记录
	datalist:'',//记录的详细message
	/**********/
	zzIsShow:false,//转账显隐
}
const mutations = {		
	page(state,n){
		state.nowpage=n.page;
	},	
	setZzIsShow(state,val){
		state.zzIsShow = val;
	},
}
const actions={
	Ajax(context){
		Vue.http.post('/yich/RecordServlet',{'option':context.state.json.option,'type':context.state.json.type,'startTime':context.state.json.startTime,'endTime':context.state.json.endTime,'bB':context.state.json.bB,'page':context.state.nowpage},{emulateJSON:true})
		.then((response)=>{
			window.checkErrorVue(response);
			var data=response.body;
			context.state.name=data.username;
			context.state.money=data.balance;
			context.state.allpage=data.pages;
			context.state.datalist=data.list;
			context.state.bB=data.bB;
			context.state.in=data.in;
			context.state.out=data.out;
		},(response)=>{
			
		})
	}
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})