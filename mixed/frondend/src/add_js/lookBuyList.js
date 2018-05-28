/*合作供货商-查看采购记录*/
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
	startData:'', //所有初始数据
	goodsSta:'PUT_AWAY',//商品状态
	conData:'',
	year:'',
	uxyear:'',
	uxmonth:'',
	url:'',
	page:1, //页码
	zonPage:1,//总页码数
	showFeny:true, //是否显示分页
	purcId:_getReg("purcid"), //初始数据传参
	status:_getReg("status"), //初始数据传参
}
const mutations = {
	ajaxData(state){
			Vue.http.post("/yich/buyRecord?purcId="+state.purcId+"&waitSell="+state.status).then((response)=>{
				 window.checkErrorVue(response);
			 	if(response.data.purc){
			 		addbuyData(response.data.purc);
			 	}
			 	if(response.data.waitSell){
			 		state.goodsSta = response.data.waitSell;
			 	}
			 	if(response.data.list != "null"){
			 		state.conData = response.data.list;
				 	var yearData = response.data.list[0].purTime.split('-');
				 	state.year  = yearData[0]+"-"+yearData[1];
			 	}else{
			 		state.conData = '';
			 	}
		},(error) => {
		})
	},
	searchAjax(state){
		Vue.http.post("/yich/queryBuyRecord?purcId="+state.purcId+"&time="+state.uxyear+"-"+state.uxmonth+"").then((response)=>{
			 window.checkErrorVue(response);
		 	if(response.data.list!="null"){
		 		state.conData = response.data.list;
		 		var yearData = response.data.list[0].purTime.split('-');
			 	state.year  = yearData[0]+"-"+yearData[1];
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
function addbuyData(data){
	var shopInv = 0;
	var json = {imgsrc:'',goodsName:'',goodsNo:'',buyNum:'',buyPrice:'',minPrice:'',maxPrice:'',kcnum:0,proId:''}
	json.imgsrc = data.src?imgchange((data.src),"@78w_78h"):'';
	json.goodsName = (data.product && data.product.pro_name)?data.product.pro_name:'';
	/*json.goodsNo = data.purc.product.good_no;*/
	json.buyNum = data.buyNum;
	json.buyPrice = data.totalPrice;
	json.minPrice = data.smallPrice;
	json.maxPrice = data.bigPrice;
	json.kcnum = data.storeNum;
	json.proId =  data.proId;
	
	
	state.startData = json;				
}

//截取超链接数据
function _getReg(name) {
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null) return  unescape(r[2]); return '';
}