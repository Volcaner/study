/*
 * 订单中心-入驻意向
 */

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
	searchNum:0,//查询结果
	tel:"",
	whether:"All",//全部:All,是:Yes,否:No
	startTime:"",
	endTime:"",
	pageNum:"15",//页面数量
	starData:[],

	exportSta:'All',//全部：All,部分：Part 
	exportStar:'',
	exportEnd:'',

	page:1, //页码
	zonPage:1,//总页码数
	showFeny:true, //是否显示分页
};
const mutations={
showFeny(state,val){
	state.showFeny=val;
},
zonPage(state,val){
	state.zonPage=val;
},
page(state,n){
		state.page=n.page;
},
searchNum(state,val){
	state.searchNum = val;
},
tel(state,val){
	state.tel = val;//
},
whether(state,val){
	state.whether = val;
},
startTime(state,val){
	state.startTime = val;
},
endTime(state,val){
	state.endTime  = val;
},
starData(state,val){
	state.starData = val;
},
//导出
exportSta(state,val){
	state.exportSta = val;
},
exportStar(state,val){
	state.exportStar = val;
},
exportEnd(state,val){
	state.exportEnd = val;
},
};
const actions={
starAjax(context){
	var _state = context.state;
	Vue.http.post('/yich/RegisteredUserServlet',
		{
			tel:_state.tel,
			source:_state.whether,
			startTime:_state.startTime,
			endTime:_state.endTime,
			pageNum:_state.pageNum,
			page:_state.page
		},{emulateJSON:true}).then((response) => {
		window.checkErrorVue(response);
		// 响应成功回调
		if(response.data.totalPages<1){
			//context.state.showFeny = false;
			//context.state.zonPage = 1;
			context.commit("showFeny",false);
			context.commit("zonPage",1);
		}else{
			context.commit("showFeny",true);
			context.commit("zonPage",response.data.totalPages);
		};

		if(response.data.list && response.data.list.length>0){
			context.commit("starData",reGetDatas(response.data.list));
		}else {
			context.commit("starData",[]);
		}
		var count = response.data.count?response.data.count:0;
		context.commit("searchNum",count);
		
	}, (response) => {
		// 响应错误回调
	});
},
Ajax(context){
	context.dispatch("starAjax");
},

};
export default new Vuex.Store({
	state,
	mutations,
	actions,
})
function reGetDatas(list){
	var rearr = [];
	for(var i in list){
		var temp = {tel:"",whether:"",appTime:""};
		temp.tel = list[i].tel?list[i].tel:"";//手机号
		//temp.whether = list[i].register_from?list[i].register_from:"";//来源
		switch(list[i].register_from){
			case 'pcrz':
				temp.whether = "电脑端入驻页入驻";
				break;
			case 'phonerz':
				temp.whether = "手机端入驻页入驻";
				break;
			default:
			temp.whether = list[i].register_from;
				break;
		}
		temp.appTime = list[i].register_time?list[i].register_time:"";//注册时间
		rearr.push(temp);
	}
	return rearr;
}