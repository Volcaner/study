/*采录库-采购记录*/
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
	startData:'',
	imgSrc:'',
	conData:'',
	year:'',
	uxyear:'',
	uxmonth:'',
	url:'',
	page:1, //页码
	zonPage:1,//总页码数
	showFeny:true, //是否显示分页
	proId:window.location.href.split("pro_id=")[1],
}
const mutations = {
	ajaxData(state){
			Vue.http.post("/yich/PurchasingRecords?proId="+state.proId).then((response)=>{
				 window.checkErrorVue(response);
			 	if(response.data.proSellStatisticsInfo){
			 		state.startData = response.data.proSellStatisticsInfo;
			 		state.imgSrc = imgchange((response.data.proSellStatisticsInfo.src),"@78w_78h");
			 	}
			 	if(response.data.proSellInfo.length > 0){
			 		state.conData = response.data.proSellInfo;
				 	state.year = response.data.proSellInfo[0].traPayTime.split(" ")[0];
			 	}
		},(error) => {
		})
	},
	searchAjax(state){
		Vue.http.post("/yich/PurchasingRecords?proId="+state.proId+"&yearMonth="+state.uxyear+"-"+state.uxmonth+"").then((response)=>{
			 window.checkErrorVue(response);
		 	if(response.data.proSellStatisticsInfo){
		 		state.startData = response.data.proSellStatisticsInfo;
		 	}
			 if(response.data.proSellInfo.length>0){
				 state.conData = response.data.proSellInfo;
				 state.year = response.data.proSellInfo[0].traPayTime.split(" ")[0];
			 }else if(response.data.proSellInfo.length == 0){
				 state.conData = '';
			 }
	},(error) => {
	})
	}
}
const actions={
		ajaxData(context){
			context.commit("ajaxData");
		},
		searchAjax(context){
			context.commit("searchAjax");
		},
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})