import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
	userName:'',
	pmcId:'',
	pmcName:'',
	refundResult:'',
	pmcOption:'6',
	page:1,
	zonPage:1,//总页码数
	showFeny:true, //是否显示分页
	soldData:{
		yckName:[],//预存卡名称
		soldList:[],//退款申请数据
	},//退款总数据
	isModalDisplay:false,//提示框
	FYAjaxSta:'applyAjax',//分页请求aja状态(applyAjax:退款申请,dolistAjax:退款记录)
}
const mutations = {
	page(state,obj){//页码
		state.page=obj.page;
	},
	userName(state,val){
		state.userName = val;
	},
	pmcId(state,val){
		state.pmcId = val;
	},
	pmcName(state,val){
		state.pmcName = val;
	},
	refundResult(state,val){
		state.refundResult = val;
	},
	pmcOption(state,val){
		state.pmcOption = val;
	},
	soldData(state,val){
		state.soldData = val;
	},
	FYAjaxSta(state,val){
		state.FYAjaxSta = val;
	}
}
const actions = {
	//初始数据请求(退款申请处理)
	starAjaxData(context){
		var _state = context.state;
		Vue.http.post('/yich/CardApplyRefundListServlet',{
			prestore_card_id:_state.pmcName,//id
			prestore_card_sold_id:_state.pmcId,
			name:_state.userName,
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
			var tempdatas = resetApplyData(response.data);
			context.commit('soldData',tempdatas);
		},(error)=>{
			
		})
	},
	dolistAjaxData(context){
		var _state = context.state;
		Vue.http.post('/yich/CardRefundResultListServlet',{
			prestore_card_id:_state.pmcName,//id
			prestore_card_sold_id:_state.pmcId,
			name:_state.userName,
			refund_result:_state.refundResult,
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
			var tempdatas = resetDolistData(response.data);
			context.commit('soldData',tempdatas);
		},(error)=>{
			
		})
	},
	Ajax(context){
		if(context.state.FYAjaxSta == 'applyAjax'){
			context.dispatch("starAjaxData");
		}else if(context.state.FYAjaxSta == 'dolistAjax'){
			context.dispatch("dolistAjaxData");
		}
	},
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
})

function resetApplyData(data){
	var tempDatalist = {};
	if(data){
		var names = (data.names && data.names.length>0)?data.names:[];
		var plists = (data.pcslist && data.pcslist.length>0)?data.pcslist:[];
		var nameslist = [],pmcslist = [];
		for(var n in names){
			var nobj = {};
			nobj.name = names[n].prestore_card_name;
			nobj.pmcid = names[n].prestore_card_id;
			nameslist.push(nobj);
		}
		for(var p in plists){
			var pobj = {supshopName:'',pmcName:'',pmcNameId:'',pmcId:'',discount:'',tkBalance:'',tkTime:'',wangwang:'',shopId:''};
			pobj.supshopName = (plists[p].business && plists[p].business.name)?plists[p].business.name:'';
			pobj.pmcName = (plists[p].prestoreCard && plists[p].prestoreCard.prestore_card_name)?plists[p].prestoreCard.prestore_card_name:'';
			pobj.pmcNameId = (plists[p].prestoreCard && plists[p].prestoreCard.prestore_card_id)?plists[p].prestoreCard.prestore_card_id:'';
			pobj.pmcId = plists[p].prestore_card_sold_id?plists[p].prestore_card_sold_id:'';
			pobj.discount =(plists[p].prestoreCard && plists[p].prestoreCard.discount)?parseFloat(plists[p].prestoreCard.discount).toFixed(1):'0.0';
			pobj.tkBalance = plists[p].card_balance?parseFloat(plists[p].card_balance).toFixed(2):'0.00';
			pobj.tkTime = plists[p].apply_time?plists[p].apply_time:" ";
			pobj.wangwang = (plists[p].business && plists[p].business.wangwang)?plists[p].business.wangwang:'';
			pobj.shopId = (plists[p].business && plists[p].business.user_id)?plists[p].business.user_id:'';
			pmcslist.push(pobj);
		}
		tempDatalist.yckName = nameslist;
		tempDatalist.soldList = pmcslist;
	}
	return tempDatalist;
}
function resetDolistData(data){
	var tempDatalist = {};
	if(data){
		var names = (data.names && data.names.length>0)?data.names:[];
		var plists = (data.pcrrlist && data.pcrrlist.length>0)?data.pcrrlist:[];
		var nameslist = [],pmcslist = [];
		for(var n in names){
			var nobj = {};
			nobj.name = names[n].prestore_card_name;
			nobj.pmcid = names[n].prestore_card_id;
			nameslist.push(nobj);
		}
		for(var p in plists){
			var pobj = {supshopName:'',pmcName:'',pmcNameId:'',pmcId:'',discount:'',tkBalance:'',tkTime:'',doResult:'',doTime:'',wangwang:'',shopId:''};
			pobj.supshopName = (plists[p].business && plists[p].business.name)?plists[p].business.name:'';
			pobj.pmcName = (plists[p].prestoreCard && plists[p].prestoreCard.prestore_card_name)?plists[p].prestoreCard.prestore_card_name:'';
			pobj.pmcNameId = (plists[p].prestoreCard && plists[p].prestoreCard.prestore_card_id)?plists[p].prestoreCard.prestore_card_id:'';
			pobj.pmcId = plists[p].prestore_card_sold_id?plists[p].prestore_card_sold_id:'';
			pobj.discount =(plists[p].prestoreCard && plists[p].prestoreCard.discount)?parseFloat(plists[p].prestoreCard.discount).toFixed(1):'0.0';
			pobj.tkBalance = plists[p].refund_balance?parseFloat(plists[p].refund_balance).toFixed(2):'0.00';
			pobj.tkTime = plists[p].apply_time?plists[p].apply_time:" ";
			pobj.doResult = plists[p].refund_result == "S"?"已退款":plists[p].refund_result == "R"?"拒绝退款":"";
			pobj.doTime =  plists[p].refund_time?plists[p].refund_time:" ";
			pobj.wangwang = (plists[p].business && plists[p].business.wangwang)?plists[p].business.wangwang:'';
			pobj.shopId = (plists[p].business && plists[p].business.user_id)?plists[p].business.user_id:'';
			pmcslist.push(pobj);
		}
		tempDatalist.yckName = nameslist;
		tempDatalist.soldList = pmcslist;
	}
	return tempDatalist;
}