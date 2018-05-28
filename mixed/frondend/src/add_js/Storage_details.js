import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
		groupId:1,
		goodNo:'',
		src:'',
		proName:'',
		name:'',
		tel:'',
		tteldh:'',
		telnum:'',
		ww:'',
		thead:'',
		list:'',
		list1:'',
		count:0,
		zje:0,
		isdisplay:'',
		wangwang:'',
 }
const mutations = {
		vueajax(state){
		 	   Vue.http.post('/yich/AuditingDetailedServlet',{
		 		  groupId:state.groupId,
		 		   }).then((response) => {
		 			  window.checkErrorVue(response);
		 			  state.wangwang = response.data.group.business.wangwang;
		 			 if(response.data.group.isDisplay=='1'){
		 				 state.isdisplay="是";
		 			 }else{
		 				state.isdisplay="否";
		 			 }
		 			   if(response.data.group.goodGroups){
		 				   state.list=response.data.group.goodGroups;
		 				  state.list1=(state.list).slice(0,3);
		 			   }
		 			  if(response.data.group){
		 				state.thead=response.data.group;
		 			  }
		 			   if(response.data.group){
		 				  state.name=response.data.group.business.name;
		 				  var data = response.data.group.business;
		 					  if((typeof (data.tel)!='undefined' || typeof (data.mobile)!='undefined') && typeof (data.landline_tel)!='undefined'){
		 					 data.landline_tel = window.toNormalNumber(data.landline_tel);
		 					 var phone='';
		 					 if(typeof (data.mobile)!='undefined' && data.mobile){
		 						phone=data.mobile;
		 					 }else{
		 						phone=data.tel;
		 					 }
		 					 state.telnum =(phone && data.landline_tel)?phone+' / '+data.landline_tel:phone?phone:data.landline_tel?data.landline_tel:'';
		 				  }else if(typeof (data.tel)!='undefined' || typeof (data.mobile)!='undefined'){
		 					  if(data.mobile){
		 						 state.telnum = data.mobile;
		 					  }else{
		 						 state.telnum = data.tel;
		 					  }
		 				  }else if(typeof (data.landline_tel)!='undefined'){
		 					 state.telnum = window.toNormalNumber(data.landline_tel);
		 				  }
		 				  
		 				  state.tel=response.data.group.business.tel;
		 				  state.tteldh=' / '+response.data.group.business.landline_tel;
		 				  state.ww='http://www.taobao.com/webww/ww.php?ver=3&amp;touid='+response.data.group.business.wangwang+'&amp;siteid=cntaobao&amp;status=2&amp;charset=utf-8';
		 			   }
						if(response.data.group.goodNo){
							state.goodNo=response.data.group.goodNo;
						}else{
							state.goodNo='';
						}
						if(response.data.group.mainSrc){
							state.src=response.data.group.mainSrc;
						}else{
							state.src='';
						}
						if(response.data.group.proName){
							state.proName=response.data.group.proName;
						}else{
							state.proName='';
						}
		 			   for(var i=0;i<state.list.length;i++){
		 				  
		 				   state.count+=(state.list)[i].num-0;
		 				  state.zje+=((state.list)[i].num*(state.list)[i].price)*1;
		 			   };
		 			  state.zje=(state.zje).toFixed(2);
	    			  }, (response) => {
	    		 });
		},
}

const actions={
		Ajax(context,huohao){
			context.state.hh=huohao;
       	    context.commit('vueajax',context.state)
		},
  }
export default new Vuex.Store({
  state,
  mutations,
  actions,
  //getters
})

