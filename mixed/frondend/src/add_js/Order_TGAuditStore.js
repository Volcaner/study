/*
 * 推广频道-报名审核
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	title:"",//标题
	advsta:'A',// 待审核：A,已审核:任意值(SL) (审核通过：S 审核失败：L)
	doAdvsta:'',//(审核通过：S 审核失败：L)
	advId:_getReg('advId'),//频道id
	auId:'',//用户id
	refuseReason:'',
	supshopName:'',
	
	isModalDisplay:false,
	pageSize:8,//单页数据量
	page:1,
	zonPage:1,//总页码数
	showFeny:true, //是否显示分页
	
	advDatas:[],//初始数据
}
const mutations={
	title(state,val){//页码
		state.title=val;
	},
	page(state,obj){//页码
		state.page=obj.page;
	},
	advsta(state,val){
		state.advsta=val;
	},
	doAdvsta(state,val){
		state.doAdvsta=val;
	},
	auId(state,val){
		state.auId=val;
	},
	refuseReason(state,val){
		state.refuseReason=val;
	},
	advDatas(state,val){
		state.advDatas = val;
	},
	isModalDisplay(state,val){
		state.isModalDisplay = val;
	},
	supshopName(state,val){
		state.supshopName = val;
	}
}
const actions={
	starAjax(context){
		var _state = context.state;
		Vue.http.post('/yich/AuditingAdvertisementListServlet',{supshop_name:_state.supshopName,state:_state.advsta,advertisement_id:_state.advId,page:_state.page,pageSize:_state.pageSize},{emulateJSON:true}).then((response) => {
			window.checkErrorVue(response);
			// 响应成功回调
			if(response.data.PageCount<1){
				context.state.showFeny = false;
				context.state.zonPage = 1;
			}else{
				context.state.showFeny = true;
				context.state.zonPage = response.data.PageCount;
			};
			if(response.data && response.data.title){
				context.commit('title',response.data.title+"的报名审核");
			}
			if(response.data && response.data.list){
				context.commit('advDatas',getDatas(response.data.list));
			}
		}, (response) => {
			// 响应错误回调
		});
	},
	handleAjax(context){
		var _state = context.state;
		Vue.http.post('/yich/AuditingAdvertisementServlet',{state:_state.doAdvsta,advertisement_id:_state.advId,au_id:_state.auId,refuse_reason:_state.refuseReason},{emulateJSON:true}).then((response) => {
			window.checkErrorVue(response);
			// 响应成功回调
			context.commit('isModalDisplay',false);
			if(response.data && response.data.flag!=0){
				context.dispatch("starAjax");
			}else{
				alert("操作失败,请稍后再试!")
			}
		}, (response) => {
			// 响应错误回调
		});
	}
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})
function getDatas(list){
	var te_data = [];
	if(list && list.length>0){
		for(var i in list){
			var obj = {advId:'',auId:'',gzhName:'--',storeName:'--',gzhCode:'',be_gzhCode:'',tgSImgSrc:'',tgLImgSrc:'',be_tgLImgSrc:'',tgLabel:'--',topMoney:'0.00',enterTime:'--',auditTime:'--',advSta:'',tgReason:'',wangwang:'',shopId:'',userId:''}
			obj.advId = list[i].advertisement_id?list[i].advertisement_id:'';
			obj.auId =  list[i].au_id?list[i].au_id:'';
			obj.gzhName = (list[i].publicSignal && list[i].publicSignal.nickName)?list[i].publicSignal.nickName:'--';
			obj.storeName = (list[i].supplierShop && list[i].supplierShop.supshop_name)?list[i].supplierShop.supshop_name:'--';
			obj.gzhCode = (list[i].publicSignal && list[i].publicSignal.qrcodeUrl)?imgchange(list[i].publicSignal.qrcodeUrl,"@116w_116h"):'';
			obj.be_gzhCode = (list[i].publicSignal && list[i].publicSignal.qrcodeUrl)?list[i].publicSignal.qrcodeUrl:'';
			obj.tgSImgSrc = list[i].main_image_src?imgchange(list[i].main_image_src,"@98w_54h"):'';
			obj.tgLImgSrc = list[i].main_image_src?imgchange(list[i].main_image_src,"@290w_160h"):'';
			obj.be_tgLImgSrc = list[i].main_image_src?list[i].main_image_src:'';
			if(list[i].tag){
				var te_str = list[i].tag.charAt(list[i].tag.length-1);
				if(te_str == ';'){
					var ss = list[i].tag.substring(0,list[i].tag.length-1);
					obj.tgLabel = ss.split(';').join('、');
				}else{
					obj.tgLabel = list[i].tag.split(';').join('、');
				}
			}else{
				obj.tgLabel = "--";
			}
			obj.topMoney = list[i].top_price?parseFloat(list[i].top_price).toFixed(2):'0.00';
			obj.enterTime = list[i].apply_time?list[i].apply_time:'--';
			obj.auditTime = list[i].auditing_time?list[i].auditing_time:'';
			obj.advSta =  list[i].state?list[i].state:'';
			obj.tgReason = list[i].refuse_reason?list[i].refuse_reason:'';
			obj.wangwang = (list[i].supplierShop && list[i].supplierShop.wangwang)?list[i].supplierShop.wangwang:'';
			obj.shopId =  list[i].supshop_id?list[i].supshop_id:'';
			obj.userId =  list[i].user_id?list[i].user_id:'';
			te_data.push(obj);
		}
	}
	return te_data;
}
//截取超链接
function _getReg(name) {
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null) return  unescape(r[2]); return '';
}