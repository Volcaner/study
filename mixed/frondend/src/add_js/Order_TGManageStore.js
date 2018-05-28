/*
 * 推广频道管理
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	isModalDisplay:false,
	conTitle:["频道标题/banner","推广平台","获客单价","预缴推广费","推广时间","推广状态","操作"],//
	isTrash:'1',//1:频道管理,0:回收站
	navsta:'',// 草稿：D 预热中：P 报名中：A 待推广：W 推广中：S 推广结束：E
	pageSize:5,//单页数据量
	page:1,
	zonPage:1,//总页码数
	showFeny:true, //是否显示分页
	
	advDatas:[],//初始所有数据
	advId:'',//删除ID
}
const mutations={
	isModalDisplay(state,val){
		state.isModalDisplay = val;
	},
	conTitleFun(state,val){
		state.conTitle = val;
	},
	isTrashFun(state,val){
		state.isTrash = val;
	},
	navsta(state,val){
		state.navsta = val;
	},
	advDatas(state,val){
		state.advDatas = val;
	},
	advId(state,val){
		state.advId = val;
	},
	page(state,obj){//页码
		state.page=obj.page;
	},
	
}
const actions={
	starAjax(context){
		Vue.http.post('/yich/AdvertisementListServlet',{state:context.state.navsta,is_delete:context.state.isTrash,page:context.state.page,pageSize:context.state.pageSize},{emulateJSON:true}).then((response) => {
			//window.checkErrorVue(response);
			// 响应成功回调
			if(response.data.PageCount<1){
				context.state.showFeny = false;
				context.state.zonPage = 1;
			}else{
				context.state.showFeny = true;
				context.state.zonPage = response.data.PageCount;
			};
			if(response.data && response.data.list){
				context.commit('advDatas',getDatas(response.data.list));
			}
		}, (response) => {
			// 响应错误回调
		});
	},
	//频道管理-删除
	deleteAjax(context){
		Vue.http.post('/yich/DeleteAdvertisementServlet',{advertisement_id:context.state.advId},{emulateJSON:true}).then((response) => {
			window.checkErrorVue(response);
			// 响应成功回调
			context.commit('isModalDisplay',false);
			if(response.data && response.data.flag != 0){
				context.dispatch("starAjax");
			}else{
				alert("操作失败!")
			}
		}, (response) => {
			// 响应错误回调
		});
	},
	//频道回收站-彻底删除
	trueDeleteAjax(context){
		Vue.http.post('/yich/ClearAdvertisementServlet',{advertisement_id:context.state.advId},{emulateJSON:true}).then((response) => {
			window.checkErrorVue(response);
			// 响应成功回调
			context.commit('isModalDisplay',false);
			if(response.data && response.data.flag != 0){
				context.dispatch("starAjax");
			}else{
				alert("操作失败!")
			}
		}, (response) => {
			// 响应错误回调
		});
	},
	//频道回收站-还原
	backDeleteAjax(context){
		Vue.http.post('/yich/ReductionAdvertisementServlet',{advertisement_id:context.state.advId},{emulateJSON:true}).then((response) => {
			window.checkErrorVue(response);
			// 响应成功回调
			context.commit('isModalDisplay',false);
			if(response.data && response.data.flag != 0){
				context.dispatch("starAjax");
			}else{
				alert("操作失败!")
			}
		}, (response) => {
			// 响应错误回调
		});
	},
	Ajax(context){
		context.dispatch("starAjax");
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
			var obj = {advId:'',title:'',creatTime:'--',imgSrc:'',isonline:'',method:'',hkPrice:'0.00',payMoney:'0.00',tgTime:'--',tgState:'',state:''}
			obj.advId = list[i].advertisement_id?list[i].advertisement_id:'';
			obj.title = list[i].title?list[i].title:'';
			obj.creatTime = list[i].creat_time?list[i].creat_time:'',
			obj.imgSrc = list[i].main_image_src?list[i].main_image_src:'';
			if(list[i].on_line){
				obj.isonline = list[i].on_line=="Y"?'线上推广':list[i].on_line=="N"?"线下推广":"";
			}
			obj.method = list[i].method?'──'+list[i].method:'';
			obj.hkPrice = list[i].unit_price?parseFloat(list[i].unit_price).toFixed(2):'0.00';
			obj.payMoney = list[i].advance_charge?parseFloat(list[i].advance_charge).toFixed(2):'0.00';
			obj.tgTime = list[i].advertisement_start_time?list[i].advertisement_start_time:'';
			if(list[i].state){
				switch(list[i].state){
				case 'D':
					obj.tgState = "草稿";
					break;
				case 'P':
					obj.tgState = "预热中";
					break;
				case 'A':
					obj.tgState = "报名中";
					break;
				case 'W':
					obj.tgState = "待推广";
					break;
				case 'S':
					obj.tgState = "推广中";
					break;
				case 'E':
					obj.tgState = "推广结束";
					break;
				}
				obj.state = list[i].state?list[i].state:'';
			}
			te_data.push(obj);
		}
	}
	return te_data;
}