import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
	pmcName:'',//预存卡名字(id)
	pmcId:'',//预存卡ID
	startTime:'',//开始时间
	endTime:'',//结束时间
	shopName:'',//采购商昵称
	pmcOption:'6',//2:折扣降序，4:使用金额降序，6:使用时间降序
	page:1, //页码
	zonPage:1,//总页码数
	showFeny:true, //是否显示分页
	soldData:{
		yckName:[],//预存卡名称
		soldList:[],//售出记录数据
		hadUseMoney:'0.00',//已使用金额
		totalBalance:'0.00',//未使用金额
		totalRefundMoney:'0.00',//退款金额
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
		Vue.http.post('/yich/UsedRecordServlet',{
			prestore_card_id:_state.pmcName,//id
			prestore_card_sold_id:_state.pmcId,
			startTime:_state.startTime,
			endTime:_state.endTime,
			name:_state.shopName,
			option:_state.pmcOption,
			page:_state.page},{emulateJSON:true})
		.then((response)=>{
			window.checkErrorVue(response);
			if(response.data.PageCount<1){
				 _state.showFeny = false;
				 _state.zonPage = 1;
			}else{
				_state.showFeny = true;
				_state.zonPage = response.data.PageCount;
			};
			var tempdatas = resetDataList(response.data);
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
function resetDataList(data){
	var tempDatalist = {};
	if(data){
		var names = data.names?data.names:[];
		var plists = data.pcrlist?data.pcrlist:[];
		var nameslist = [],pmcslist = [];
		for(var i in names){
			var nobj = {};
			nobj.prestore_card_name = names[i].prestore_card_name;
			nobj.prestore_card_id = names[i].prestore_card_id;
			nameslist.push(nobj);
		}
		for(var p in plists){
			var pobj = {supshopName:'',pmcName:'',pmcId:'',discount:'',amount:'',balance:'',useTime:'',wangwang:'',shopId:'',useMoneySta:'-'};
			pobj.supshopName = plists[p].business?plists[p].business.name:'';
			pobj.pmcName = plists[p].prestoreCard?plists[p].prestoreCard.prestore_card_name:'';
			pobj.pmcNameId = plists[p].prestoreCard?plists[p].prestoreCard.prestore_card_id:'';
			pobj.pmcId = plists[p].prestore_card_sold_id?plists[p].prestore_card_sold_id:'';
			pobj.discount = plists[p].prestoreCard?parseFloat(plists[p].prestoreCard.discount).toFixed(1):10;
			pobj.amount = plists[p].amount?parseFloat(plists[p].amount).toFixed(2):'0.00';
			pobj.balance = plists[p].balance?parseFloat(plists[p].balance).toFixed(2):'0.00';
			pobj.useTime = plists[p].operation_time?plists[p].operation_time:'';
			pobj.wangwang = plists[p].business.wangwang?plists[p].business.wangwang:'';
			pobj.shopId = plists[p].business.user_id?plists[p].business.user_id:'';//关联用户id(仓储supshopId，商户userId)
			pobj.useMoneySta = (plists[p].state && plists[p].state == "I")?"+":"-";
			pmcslist.push(pobj);
		}
		tempDatalist.yckName = nameslist;
		tempDatalist.soldList = pmcslist;
		if(data.pcs){
			tempDatalist.totalBalance = (data.pcs.total_balance)?parseFloat(data.pcs.total_balance).toFixed(2):'0.00';
			if((data.pcs.total_money || data.pcs.total_money == 0)
				&&(data.pcs.total_balance || data.pcs.total_balance == 0) 
				&& (data.pcs.total_refund_money || data.pcs.total_refund_money == 0)){
				tempDatalist.hadUseMoney = (parseFloat(data.pcs.total_money)-parseFloat(data.pcs.total_balance)-parseFloat(data.pcs.total_refund_money)).toFixed(2);
			}else{
				tempDatalist.hadUseMoney = '0.00';
			}
			tempDatalist.totalRefundMoney = data.pcs.total_refund_money?parseFloat(data.pcs.total_refund_money).toFixed(2):'0.00';
		}else{
			tempDatalist.totalBalance = '0.00';
			tempDatalist.hadUseMoney = '0.00';
			tempDatalist.totalRefundMoney ='0.00';
		}
	}
	return tempDatalist;
}