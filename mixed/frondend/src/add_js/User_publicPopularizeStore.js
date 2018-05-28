/*
 * 推广页
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	advId:_getReg('advId'),//频道id
	tgCity:"",//省市
	tgRegion:"",//大区
	tgTag:"",
	page:1,
	totalPages:1,
	pageSize:"",
	
	headDatas:{},//头部数据
	tagsDatas:[],//总标签数据
	storeDatas:[],//推广商家数据
}
const mutations={
	tgCity(state,val){
		state.tgCity = val;
	},
	tgRegion(state,val){
		state.tgRegion = val;
	},
	tgTag(state,val){
		state.tgTag = val;
	},
	pageSize(state,val){
		state.pageSize = val;
	},
	tagsDatas(state,val){
		state.tagsDatas = val;
	},
	headDatas(state,val){
		state.headDatas = val;
	},
	storeDatas(state,val){
		state.storeDatas = val;
	},
	mutaPage(state,val){
		state.page = val;
	},
	totalPages(state,val){
		state.totalPages = val;
	},
}
const actions={
	starAjax(context,isnoadd){
		var _state = context.state;
		Vue.http.post('/yich/ExtensionPageServlet',{advertisement_id:_state.advId,city:_state.tgCity,region:_state.tgRegion,tag:_state.tgTag,page:_state.page,pageSize:_state.pageSize},{emulateJSON:true}).then((response) => {
			window.checkErrorVue(response);
			// 响应成功回调
			if(response.data && response.data.totalPages){
				context.commit('totalPages',response.data.totalPages);
			}
			if(response.data && response.data.advertisement){
				var te_head = getHeadDatas(response.data.advertisement);
				context.commit('headDatas',te_head);
				if(isnoadd != "isnoadd"){
					var te_tags = getTagsDatas(response.data.advertisement.advertisementTagList)
					context.commit('tagsDatas',te_tags);
				}
			}
			if(response.data && response.data.AdvertisementUserList){
				var te_storeArr = getStoreDatas(response.data.AdvertisementUserList)
				context.commit('storeDatas',te_storeArr);
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
function getStoreDatas(list){
	var te_arr = [];
	if(list && list.length>0){
		for(var i in list){
			var obj = {auId:"",address:"",tgsImgSrc:"",tgsCodeSrc:"",tags:[]};
			obj.auId = list[i].au_id?list[i].au_id:"";
			if(list[i].factory_address){
				var te_address = list[i].factory_address;
				if(te_address.indexOf(';')!=-1){
					obj.address = te_address.replace(/;+|;+$/g," ");
				}else{
					obj.address = te_address;
				}
			}else{
				obj.address = "--";
			}
			obj.tgsImgSrc = list[i].main_image_src?list[i].main_image_src:"";
			obj.tgsCodeSrc = list[i].extension_qr_code?list[i].extension_qr_code:"";
			obj.tags = list[i].tags?list[i].tags:[];
			te_arr.push(obj);
		}
	}
	return te_arr;
}
function getHeadDatas(list){
	var obj={tgClass:'',tgPosterSrc:''};
	if(list){
		obj.tgClass = list.explain?list.explain:'--';
		obj.tgPosterSrc = list.top_picture_src?list.top_picture_src:'';
	}
	return obj;
}
function getTagsDatas(list){
	var te_tags = [];
	if(list && list.length>0){
		for(var i in list){
			var obj = {tagId:'',tagName:'',isActive:''};
			obj.tagId = list[i].atag_id?list[i].atag_id:'';
			obj.tagName = list[i].tag_name?list[i].tag_name:'--';
			te_tags.push(obj);
		}
	}
	return te_tags;
}
//截取超链接
function _getReg(name) {
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null) return  unescape(r[2]); return '';
}