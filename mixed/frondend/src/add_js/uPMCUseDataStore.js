import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
	pmcName:'',//预存卡名字(id)
	pmcId:'',//预存卡ID
	timeType:'1',// 1全部   2 时间区间
	startTime:'',//开始时间
	endTime:'',//结束时间
	shopName:'',//采购商昵称
	pmcOption:'6',//2:折扣降序，4:使用金额降序，6:使用时间降序
	page:1, //页码
	zonPage:1,//总页码数
	showFeny:true, //是否显示分页
	soldData:{
		supName:[],//仓储名字
		yckName:[],//预存卡名称
		yckID:[],//预存卡ID
		soldList:[],//售出记录数据
		useMoney:'0.00',//已使用金额
		resMoney:'0.00',//未使用金额
		refMoney:'0.00',//退款金额
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
	timeType(state,val){
		state.timeType = val;
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
		Vue.http.post('/yich/BusinessPrestoreCardUseData',{
			cardName:_state.pmcName,//name
			cardCode:_state.pmcId,
			timeType:_state.timeType,// 1全部   2 时间区间
			timeFrom:_state.startTime,
			timeTo:_state.endTime,
			supName:_state.shopName,
			sort:_state.pmcOption,
			page:_state.page},{emulateJSON:true})
		.then((response)=>{
			window.checkErrorVue(response);
			if(response.data.totalPage<1){
				 _state.showFeny = false;
				 _state.zonPage = 1;
			}else{
				_state.showFeny = true;
				_state.zonPage = response.data.totalPage;
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
		var supNames = data.supNameList?data.supNameList:[];
		var names = data.cardNameList?data.cardNameList:[];
		var namesId = data.cardCodeList?data.cardCodeList:[];
		var plists = data.list?data.list:[];
		var supNameslist = [],nameslist = [],namesIdlist = [],pmcslist = [];
		for(var s in supNames){
			var sobj = {};
			sobj.supname = supNames[s];
			supNameslist.push(sobj);
		}
		for(var n in names){
			var nobj = {};
			nobj.pmcname = names[n];
			nameslist.push(nobj);
		}
		for(var i in namesId){
			var iobj = {};
			iobj.pmcId = namesId[i];
			namesIdlist.push(iobj);
		}
		for(var p in plists){
			var pobj = {supshopName:'',pmcName:'',pmcNameId:'',pmcId:'',discount:'',amount:'',balance:'',useTime:'',wangwang:'',shopId:'',useMoneySta:'-'};
			pobj.supshopName = plists[p].supName?plists[p].supName:'';
			pobj.pmcName = plists[p].prestoreCardName?plists[p].prestoreCardName:'';
			pobj.pmcNameId = plists[p].prestoreCardId?plists[p].prestoreCardId:'';
			pobj.pmcId = plists[p].prestoreCardSoldId?plists[p].prestoreCardSoldId:'';
			pobj.discount = plists[p].discount?parseFloat(plists[p].discount).toFixed(1):10;
			pobj.amount = plists[p].useValue?parseFloat(plists[p].useValue).toFixed(2):'0.00';
			pobj.balance = plists[p].balance?parseFloat(plists[p].balance).toFixed(2):'0.00';
			pobj.useTime = plists[p].useTime?plists[p].useTime:'';
			pobj.wangwang = plists[p].wangwang?plists[p].wangwang:'';
			pobj.shopId = plists[p].supshopId?plists[p].supshopId:'';//关联用户id(仓储supshopId，商户userId)
			pobj.useMoneySta = (plists[p].state && plists[p].state == "I")?"+":"-";//O:"-",I:"+";
			pmcslist.push(pobj);
		}
		tempDatalist.supName = supNameslist
		tempDatalist.yckName = nameslist;
		tempDatalist.yckID = namesIdlist;
		tempDatalist.soldList = pmcslist;
		tempDatalist.resMoney = data.resMoney?parseFloat(data.resMoney).toFixed(2):'0.00';
		tempDatalist.useMoney = data.useMoney?parseFloat(data.useMoney).toFixed(2):'0.00';
		tempDatalist.refMoney = data.refMoney?parseFloat(data.refMoney).toFixed(2):'0.00';
		
	}
	return tempDatalist;
}