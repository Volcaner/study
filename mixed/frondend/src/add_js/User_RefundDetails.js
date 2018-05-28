import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
		groupId:'',
		alipayNum:'',
		type:'',
		types:'',
		status:'',
		swapStatus:'',
		//采购商信息
		cgsname:'',
		tel:'',
		ww:'',
		wangwang:'',
		//收获信息
		lxrname:'',
		lxtel:'',
		address:'',
		//列表左侧信息
		src:'',
		title:'',
		goodNo:'',
		gs:'',
		list:'',
		time:'',
		payStatus: '',
		count:0,
		zje:0,
		ztkze:0,
		pt_user_id:'',
 }
const mutations = {
		vueajax(state){
		 	   Vue.http.post('/yich/GoGroupingDetail',{
		 		  groupId:state.groupId,
		 		 payNum:state.alipayNum,
		 		pt_user_id:state.pt_user_id,
		 		   },{emulateJSON:true}).then((response) => {
		 			   window.checkErrorVue(response);
		 			  if(response.data && !isEmptyObject(response.data)){
		 			 state.cgsname=response.data.group.business.name || '';
		 			 var data = response.data.group;
		 			if(data.business.mobile && data.business.landline_tel){
	 					var landline_tel = window.toNormalNumber(data.business.landline_tel);
	 					 state.tel =landline_tel+' / '+ data.business.mobile;
	 				  }else if(data.business.mobile){
	 					 state.tel = data.business.mobile;
	 				  }else if(data.business.landline_tel){
	 					 state.tel = window.toNormalNumber(data.business.landline_tel);
	 				  }else{
	 					  state.tel = '';
	 				  }
		 			 state.ww='http://www.taobao.com/webww/ww.php?ver=3&amp;touid='+response.data.group.wangwang+'&amp;siteid=cntaobao&amp;status=2&amp;charset=utf-8';
		 			 state.wangwang = response.data.group.wangwang;
		 			 state.lxrname=response.data.group.ig.name || '';
		 			 state.lxtel=response.data.group.ig.mobile || response.data.group.ig.tel || '';
		 			 state.address=(response.data.group.ig.area+' '+response.data.group.ig.address) || '';
		 			 state.src=response.data.group.mainSrc || '';
		 			 state.title=response.data.group.proName || '';
		 			 state.goodNo=response.data.group.goodNo || '';
		 			 state.list=response.data.group.goodGroups;
		 			 state.type=response.data.group.type;
		 			 state.status=response.data.group.status;
		 			 state.swapStatus=response.data.group.swapStatus;
		 			 state.time=(response.data.group.goodGroups)[0].pgroup.operTime || '';
		 			 state.payStatus=response.data.group.goodGroups[0].pgroup.payStatus || '';
		 			 state.gs=response.data.group.supName || '';
		 			 var list=response.data.group.goodGroups;
		 			 for(var i=0;i<list.length;i++){
		 				 var price=(list[i].price).toFixed(2) || 0;
		 				var bnum=(list[i].pgroup.buyNum*1) || 0;
		 				state.count+=bnum;
		 				state.zje+=bnum*price;
		 				if(response.data.group.swapStatus=='S'){
		 					var snum=(list[i].pgroup.swapNum)*1 || 0;
		 					var buynum=(list[i].pgroup.buyNum*1) || 0;
		 					//state.count+=snum*1;
		 					//state.zje+=snum*price;
		 					state.ztkze+=((buynum-snum)*price)*1;
		 				}else{
		 					//var bnum=(list[i].pgroup.buyNum*1) || 0;
		 					//state.count+=bnum;
		 					//state.zje+=bnum*price;
		 				} 
		 			 }
		 			state.zje=(state.zje).toFixed(2);
		 			state.ztkze=(state.ztkze).toFixed(2);
		 		   }
		 		   }, (response) => {
	 			   console.log('error');
	 		 });
		},
}

const actions={
		Ajax(context,huohao){
       	    context.commit('vueajax')
		},
	}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  //getters
})

