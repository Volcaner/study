import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
	pmcName:'',//预存卡名字(id)
	pmcId:'',//预存卡ID
	startTime:'',//开始时间
	endTime:'',//结束时间
	shopName:'',//采购商昵称
	pmcOption:'4',//1:折扣升序，2:折扣降序，3:交易时间升序，4:交易时间降序
	page:1, //页码
	zonPage:1,//总页码数
	showFeny:true, //是否显示分页
	soldData:{
		yckName:[],//预存卡名称
		soldList:[],//售出记录数据
		totalAmount:'0.00',//售出金额
	},//售后总数据
	timeInterval:false,//是否显示时间区间
	
}
const mutations = {
	page(state,obj){//页码
		state.page=obj.page;
	},
	soldData(state,val){
		state.soldData = val;
	},
	timeInterval(state,val){
		state.timeInterval = val;
	},
	pmcName(state,val){
		state.pmcName = val;
	},
	pmcId(state,val){
		state.pmcId = val;
	},
	startTime(state,val){
		state.startTime = val;
	},
	endTime(state,val){
		state.endTime = val;
	},
	shopName(state,val){
		state.shopName = val;
	},
	pmcOption(state,val){
		state.pmcOption = val;
	},
}
const actions = {
	//初始数据请求
	starAjaxData(context){
		var _state = context.state;
		Vue.http.post('/yich/SalesRecordServlet',{
			prestore_card_id:_state.pmcName,//id
			prestore_card_sold_id:_state.pmcId,
			startTime:_state.startTime,
			endTime:_state.endTime,
			name:_state.shopName,
			option:_state.pmcOption,
			page:_state.page},{emulateJSON:true})
		.then((response)=>{
			window.checkErrorVue(response);
			var tempdatas = {};
			var names = response.data.names?response.data.names:[];
			var plists = response.data.pclist?response.data.pclist:[];
			var totalAmount = response.data.totalAmount?parseFloat(response.data.totalAmount).toFixed(2):'0.00';
			 if(response.data.PageCount<1){
				 _state.showFeny = false;
				 _state.zonPage = 1;
			}else{
				_state.showFeny = true;
				_state.zonPage = response.data.PageCount;
			};
			tempdatas.names = names;
			tempdatas.plists = plists;
			tempdatas.totalAmount = totalAmount;
			context.commit('soldData',tempdatas);
		},(error)=>{
			
		})
	},
	Ajax(context){
		context.dispatch("starAjaxData");
	},
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
})