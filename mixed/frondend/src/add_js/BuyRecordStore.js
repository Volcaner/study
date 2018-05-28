/*仓储-查看出售记录  */

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
	startData:'',
	conData:'',
	year:'',
	uxyear:'',
	uxmonth:'',
	url:'',
	waitSell:'PUT_AWAY',
	goodsSta:'',
	purcid:_getReg("purcid"),
	status:_getReg("status"),
}
const mutations = {
		ajaxData(state){
			Vue.http.post("/yich/buyRecord?purcId="+state.purcid+"&waitSell="+state.status).then((response)=>{
				 window.checkErrorVue(response);
			 	setData(response.data.purc);
			 	state.goodsSta = response.data.waitSell;
			 	if(response.data.list!="null"){
			 		state.conData = response.data.list;
			 		state.year = response.data.list[0].purTime;
			 	}
		},(error) => {
		})
	},
	searchAjax(state){
		Vue.http.post("/yich/queryBuyRecord?purcId="+state.purcid+"&time="+state.uxyear+"-"+state.uxmonth+"",{emulateJSON:true}).then((response)=>{
			 window.checkErrorVue(response);
		 	if(response.data.list!="null"){
		 		state.conData = response.data.list;
		 		state.year = response.data.list[0].purTime;
		 	}else{
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

function setData(data){
	var json = {proName:'',goodNo:'',imgSrc:'',sumCount:0,sumPrice:0,minPrice:0,maxPrice:0,sumProNum:0,proId:''};
	if(data!="null"){
		json.proName = data.product.pro_name;
		json.goodNo = data.product.good_no;
		if(data.src){
			json.imgSrc = imgchange((data.src),"@78w_78h");
		}
		json.sumCount = data.buyNum;
		json.sumPrice = data.totalPrice;
		json.minPrice = data.smallPrice; 
		json.maxPrice = data.bigPrice; 
		json.proId = data.proId;
		for(var f in data.product.shopInvtory){
			json.sumProNum += data.product.shopInvtory[f].pro_num;
		}
	}
	
	
	
	state.startData = json;
}
//截取超链接数据
function _getReg(name) {
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null) return  unescape(r[2]); return '';
}