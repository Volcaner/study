/*
 * 合作采购商（黑名单）
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	conlist:'',//list数据
	blackSta:'',//状态
	selectSta:'',//选择后状态
	coopId:'',
	userId:'',
	supShopId:'',
	blackName:'',//头部名称
	lastUrl:'',//上一层链接地址
	page:1, //页码
	zonPage:1,//总页码数
	showFeny:true, //是否显示分页
	isStopMotai:false,//终止合作模态框
	sureMoytai:true,//模态框显示按钮
	motaiTitle:'',//模态框显示标题
	motaiText:'',//模态框显示内容
}
const mutations={
	page(state,obj){//页码
		state.page=obj.page;
	},
	//初始ajax
	starAjax(state){
		if(window.location.href.split("?")[1]){
			state.blackName = decodeURI(window.location.href.split("blackName=")[1].split("&")[0]);
			state.lastUrl = window.location.href.split("lastUrl=")[1].split("&")[0];
		}
		Vue.http.post('/yich/blackList?page='+state.page+'&option='+state.selectSta).then((response) => {
			window.checkErrorVue(response);
				// 响应成功回调
			 window.checkErrorVue(response);
				if(response.data.totalPage<1){
					state.showFeny = false;
					state.zonPage = 1;
				}else{
					state.showFeny = true;
					state.zonPage = response.data.totalPage;
				};
				if(response.data.list!="null"){
					state.conlist = response.data.list;
					selectStatus(response.data.list);
				}else{
					state.conlist='';
				}
			}, (response) => {
				// 响应错误回调
		});
	},
	unclockAjax(state){
		Vue.http.post('/yich/handleApply?page='+state.page+'&option=UL&coopId='+state.coopId+'&userId='+state.userId+'&supShopId='+state.supShopId).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			if(response.data.totalPage<1){
				state.showFeny = false;
				state.zonPage = 1;
			}else{
				state.showFeny = true;
				state.zonPage = response.data.totalPage;
			};
			if(response.data.result==0){
				alert("操作失败！");
			}else{
				window.location.reload();
			}
		}, (response) => {
			// 响应错误回调
	});
	},
	
}
const actions={
	starAjax(context){
		context.commit("starAjax");
	},
	unclockAjax(context){
		context.commit("unclockAjax");
	},
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
})
function selectStatus(data){
	var list = [];
	for(var i in data){
		if(data[i].coopStatus == "A"){
			list.push("合作中")
		}else if(data[i].coopStatus == "P" || data[i].coopStatus == "AP" || data[i].coopStatus == "D"){
			list.push("合作申请")
		}else{
			list.push("所有来源")
		}
	}
	state.blackSta = list;
	
}