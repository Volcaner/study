/*
 *  仓储-查看协议草稿
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	xyData:'',//协议草稿数据
	Jname:'',//甲方name
	Jidcard:'',//甲方idcard
	agdId:window.location.href.split("agdId=")[1].split("&")[0],
}
const mutations={
	
	//草稿查看
	lookCGAjax(state){
		Vue.http.post('/yich/SeeDraftServlet',{agdId:state.agdId},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			if(response.data){
				state.xyData = response.data;
				if(response.data.state == "one"){
					state.Jname = response.data.name;
					state.Jidcard = response.data.idCardId;
				}else if(response.data.state == "all"){
					state.Jname = response.data.legalPersonName +" "+ response.data.companyName;
					state.Jidcard = response.data.legalPersonIdCard;
				}
			}
			
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
	
}
const actions={
	//草稿-查看
	lookCGAjax(context){
		context.commit("lookCGAjax");
	},
	
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
})
