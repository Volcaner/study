import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {//页面状态
	page1:false,
	page2:true,
	page3:false,
	page4:false,
	page5:false,
	page6:false,
	page7:false,
	headImg:'',
	nickName:'',
	bindTime:'',
	publicId:'',
	publicList:'',
	wechatWindow:'',
	bindSuccess:false,
	name:'查看绑定结果',
	deleteRow:false,
	row:0,
	uuid:'',
	bindFailed:'',
}

const mutations = {
	publicList(state, list){
		state.publicList = list;
	},
	rowChange(state,index){
		state.row = index;
	},
	deleteList(state,row){
		state.publicList.splice(row,1);
	},
	deleteChange(state){
		state.deleteRow = !state.deleteRow;
	}
}

const actions = {
	queryAjax(context){
		Vue.http.post("/yich/QueryWeChatBindings",{emulateJSON:true}).then((response) => {
			window.checkErrorVue(response);
			if(typeof response.data == 'string'){
				response.data = JSON.parse(response.data);
			}
			if(response.data.list){
				context.commit('publicList', response.data.list);
			}
		},(error) => {
			
		})
	},
	bindAjax(context){
		context.state.wechatWindow = window.open();
		Vue.http.post("/yich/BindingPlatform").then((response) => {
			window.checkErrorVue(response);
			if(typeof response.data == 'string'){
				response.data = JSON.parse(response.data);
			}
			var s1 = response.data.APPID?response.data.APPID:'';
			var s2 = response.data.pre_auth_code?response.data.pre_auth_code:'';
			var s3 = response.data.url?response.data.url:'';
			//var s4 = response.data.supshopId?response.data.supshopId:'';
			var s5 = response.data.uuid?response.data.uuid:'';
			context.state.uuid = s5;
			//context.state.wechatWindow = window.open('https://mp.weixin.qq.com/cgi-bin/componentloginpage?component_appid='+s1+'&pre_auth_code='+s2+'&redirect_uri='+s3+'?uuid='+s5);		
			context.state.wechatWindow.location = 'https://mp.weixin.qq.com/cgi-bin/componentloginpage?component_appid='+s1+'&pre_auth_code='+s2+'&redirect_uri='+s3+'?uuid='+s5;
			var times = 605;
			var interval = setInterval(function(){
				if(times > 0){
					if(context.state.wechatWindow.closed == true){
						clearInterval(interval);
						Vue.http.post("/yich/ScanResultServlet?uuid="+s5).then((response) => {
							window.checkErrorVue(response);
							if(typeof response.data == 'string'){
								response.data = JSON.parse(response.data);
							}
							if(response.data.i == 2){
								context.state.bindFailed = '该公众号未企业认证，绑定失败！';
								return;
							}
							/*if(response.data.i == 0){
								context.state.bindFailed = '';
								return;
							}*/
							if(response.data.i == 1){
								context.state.bindSuccess = true;
								context.state.name = '知道啦';
								context.dispatch('queryAjax');
								return;
							}
						},(error) => {
							
						})
					}
/*					
					context.state.wechatWindow.close();
					return;
				}else{
					--times;
					Vue.http.post("/yich/ScanResultServlet?uuid="+s5).then((response) => {
						window.checkErrorVue(response);
						if(typeof response.data == 'string'){
							response.data = JSON.parse(response.data);
						}
						if(response.data.i != 0){
							context.state.bindSuccess = true;
							context.state.name = '知道啦';
							context.dispatch('queryAjax');
							clearInterval(interval);
							//context.state.wechatWindow.close();
							return;
						}
						if(context.state.wechatWindow.closed == true)	{
							clearInterval(interval);
							return;	
						}
					})
					return;
				}*/
				}
			},1000)
		},(error) => {
			
		})
	},
	unboundAjax(context){
		Vue.http.post('/yich/UnboundServlet?appid=' + context.state.publicList[context.state.row].appid).then((response) => {
			window.checkErrorVue(response);
			if(response.data.i != 0){
				context.commit('deleteList',context.state.row);
			}
		},(error)=>{
			
		})
	}
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
})
