/*
 * 订单中心-推广效果图
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	advId:_getReg('advId'),
	supshopName:"",
	startTime:"",
	endTime:"",
	pageSize:15,
	page:1,
	zonPage:1,//总页码数
	showFeny:true, //是否显示分页
	
	headDatas:{},//头部信息数据
	satrDatas:[],//初始list数据
}
const mutations={
	page(state,obj){//页码
		state.page=obj.page;
	},
	supshopName(state,val){
		state.supshopName = val;
	},
	startTime(state,val){
		state.startTime = val;
	},
	endTime(state,val){
		state.endTime = val;
	},
	headDatas(state,val){
		state.headDatas = val;
	},
	satrDatas(state,val){
		state.satrDatas = val;
	},
	
}
const actions={
	starAjax(context){
		var _state = context.state;
		Vue.http.post('/yich/AdvertisementEffect',{advId:_state.advId,supshopName:_state.supshopName,startTime:_state.startTime,endTime:_state.endTime,page:_state.page,pageSize:_state.pageSize},{emulateJSON:true}).then((response) => {
			window.checkErrorVue(response);
			// 响应成功回调
			if(response.data.totalpage<1){
				context.state.showFeny = false;
				context.state.zonPage = 1;
			}else{
				context.state.showFeny = true;
				context.state.zonPage = response.data.totalpage;
			};
			if(response.data && response.data.effect){
				var headobj = getHeadDatas(response.data.effect)
				context.commit('headDatas',headobj);
			};
			if(response.data && response.data.list){
				var listarr = getStarDatas(response.data.list);
				context.commit('satrDatas',listarr);
			}
		}, (response) => {
			// 响应错误回调
		});
	},
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})
function getHeadDatas(obj){
	var _obj = {};
	if(obj){
		_obj.title = obj.title?obj.title+"的推广效果":'';
		_obj.payMoney = obj.payMoney?parseFloat(obj.payMoney).toFixed(2):'0.00';
		_obj.searchNum = obj.payNumber?obj.payNumber:'0';
	}
	return _obj;
}
function getStarDatas(list){
	var te_arr = [];
	if(list && list.length>0){
		for(var i in list){
			var obj = {userPhoneNum:"--",kkTime:"--",publicName:"--",storeName:"--",kkfrom:"--",kkPrice:"0.00",syMoney:"0.00"};
			obj.userPhoneNum = list[i].tel?list[i].tel:'--';
			obj.kkTime = list[i].pay_time?list[i].pay_time:'--';
			obj.publicName = list[i].PublicNumber?list[i].PublicNumber:'--';
			obj.storeName = list[i].supName?list[i].supName:'--';
			if(list[i].pay_mode){
				obj.kkfrom = list[i].pay_mode == "C"?"现金账户":list[i].pay_mode == "P"?"预付扣款":"--";
			}
			obj.kkPrice = list[i].pay_price?"-"+parseFloat(list[i].pay_price).toFixed(2):'0.00';
			obj.syMoney = list[i].remaining_capital?parseFloat(list[i].remaining_capital).toFixed(2):'0.00';
			
			te_arr.push(obj);
		}
	}
	return te_arr;
}
//截取超链接
function _getReg(name) {
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null) return  unescape(r[2]); return '';
}