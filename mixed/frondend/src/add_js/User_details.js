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
		ww:'',
		thead:'',
		list:'',
		list1:'',
		count:0,
		zje:0,
		isdisplay:'',
		wangwang:'',
		pt_user_id:'',
		type:'',
 }
const mutations = {
		vueajax(state){
		 	   Vue.http.post('/yich/GroupApplyDetail',{
		 		  groupId:state.groupId,
		 		   },{emulateJSON:true}).then((response) => {
		 			  window.checkErrorVue(response);
		 			 state.wangwang = response.data.group.sup.wangwang;
		 			  if(response.data.group.isDisplay=='1'){
		 				 state.isdisplay='是';
		 			  }else{
		 				 state.isdisplay='否';
		 			  }
		 			   if(response.data.group.goodGroups){
		 				   state.list=response.data.group.goodGroups;
		 				  state.list1=(state.list).slice(0,3);
		 			   }
		 			  if(response.data.group){
		 				state.thead=response.data.group;
		 			  }
		 			   if(response.data.group){
		 				  state.name=response.data.group.sup.shop_name;
		 				  var d=response.data;
		 				 
		 				 if((typeof (d.group.business.mobile)!='undefined' || typeof (d.group.business.tel)!='undefined') && typeof (d.group.business.landline_tel)!='undefined'){
		 					var landline_tel = window.toNormalNumber(d.group.business.landline_tel);
		 					var phone='';
		 					if(typeof (d.group.business.mobile)!='undefined' && d.group.business.mobile){
		 						phone=d.group.business.mobile;
		 					}else if(typeof (d.group.business.tel)!='undefined' && d.group.business.tel){
		 						phone=d.group.business.tel;
		 					}
		 					 state.tel =(phone && landline_tel)?phone+' / '+landline_tel:phone?phone:landline_tel?landline_tel:'';
		 				  }else if(typeof (d.group.business.mobile)!='undefined' || typeof (d.group.business.tel)!='undefined'){
		 					 if(typeof (d.group.business.mobile)!='undefined' && d.group.business.mobile){
		 						state.tel = d.group.business.mobile;
		 					 }else if(typeof (d.group.business.tel)!='undefined' && d.group.business.tel){
		 						state.tel = d.group.business.tel;
		 					 }else{
		 						state.tel='';
		 					 }
		 					 
		 				  }else if(d.group.business.landline_tel){
		 					 state.tel = window.toNormalNumber(d.group.business.landline_tel);
		 				  }
		 				 
		 				  state.ww='http://www.taobao.com/webww/ww.php?ver=3&amp;touid='+response.data.group.sup.wangwang+'&amp;siteid=cntaobao&amp;status=2&amp;charset=utf-8';
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
	    			   console.log('error');
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

