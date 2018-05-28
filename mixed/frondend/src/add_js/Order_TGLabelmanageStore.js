/*
 * 订单中心-标签管理
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	islabel:_getReg('islabel'),
	advId:_getReg('advId'),
	title:'',
	starDatas:[],
	tagId:'',
	tagDisplay:'Y',//是否在前端显示 Y：显示,N:不显示
	fixTagIds:{
		oldTagId:'',
		newTagId:'',
	},
}
const mutations={
	title(state,val){
		state.title = val;
	},
	starDatasFun(state,val){
		state.starDatas = val;
	},
	tagId(state,val){
		state.tagId = val;
	},
	tagDisplay(state,val){
		state.tagDisplay = val;
	},
	fixTagIds(state,val){
		state.fixTagIds = val;
	},
}
const actions={
	starAjax(context){
		var _state = context.state;
		var type = "S";
		if(_state.islabel == "fixlabel"){
			type = "A";
		}else if(_state.islabel == "looks"){
			type = "S";
		}
		Vue.http.post('/yich/SeeTagServlet',{advertisement_id:_state.advId,type:type},{emulateJSON:true}).then((response) => {
			window.checkErrorVue(response);
			// 响应成功回调
			if(response.data && response.data.title){
				context.commit('title',response.data.title+"的标签");
			}
			if(response.data && response.data.list){
				var listarr = getStarDatas(response.data.list);
				context.commit('starDatasFun',listarr);
			}
		}, (response) => {
			// 响应错误回调
		});
	},
	//合并
	fixAjax(context){
		var _state = context.state;
		Vue.http.post('/yich/MergeTagServlet',{advertisement_id:_state.advId,oldAtag_id:_state.fixTagIds.oldTagId,newAtag_id:_state.fixTagIds.newTagId},{emulateJSON:true}).then((response) => {
			window.checkErrorVue(response);
			// 响应成功回调
			if(response.data && response.data.flag != 0){
				context.dispatch('starAjax');
			}else{
				alert("操作失败!请稍后再试!")
			}
		}, (response) => {
			// 响应错误回调
		});
	},
	//是否显示标签
	showHideAjax(context){
		var _state = context.state;
		Vue.http.post('/yich/DisplayTagServlet',{atag_id:_state.tagId,is_display:_state.tagDisplay},{emulateJSON:true}).then((response) => {
			window.checkErrorVue(response);
			// 响应成功回调
			if(response.data && response.data.flag != 0){
				context.dispatch('starAjax');
			}else{
				alert("操作失败!请稍后再试!")
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
function getStarDatas(list){
	var te_arr = [];
	if(list && list.length>0){
		for(var i in list){
			var obj = {tagId:'',tagName:'--',selectNum:'0',isShow:''};
			obj.tagId = list[i].atag_id?list[i].atag_id:'';
			obj.tagName = list[i].tag_name?list[i].tag_name:'--';
			obj.selectNum = list[i].select_num?list[i].select_num:'0';
			if(list[i].is_display){
				obj.isShow = list[i].is_display == 'Y'?list[i].atag_id:"";
			}
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