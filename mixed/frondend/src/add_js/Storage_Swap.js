import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
		groupId:2,
		group:'',
		oldcount:0,
		oldjg:0,
		newcountarr:[],
		newcount:0,
		newjgarr:[],
		newjg:0,
		showtip:false,
 }
const mutations = {
		vueajax(state){
		 	   Vue.http.post('/yich/SwapDetailedServlet',{
		 		  groupId:state.groupId,
		 		   }).then((response) => {
		 			  window.checkErrorVue(response);
		 			   state.group=response.data;
		 			   var item=state.group.list;
		 			   for(var i=0;i<item.length;i++){
		 				   state.oldcount+=item[i].num;
		 				   state.oldjg+=((item[i].price)*(item[i].num)).toFixed(2)*1;
		 			   }
	    			  }, (response) => {
	    		 });
		},
}

const actions={
		Ajax(context,huohao){
			context.state.hh=huohao;
       	    context.commit('vueajax',context.state)
		},
		f(context,huohao){
			var json={};
			
			var list=context.state.group.list;
			var id='';
			var str='';
			for(var i=0;i<list.length;i++){
				id+=list[i].goodGroupId+';';
				var num = (context.state.newcountarr)[i] || 0;
				str+=list[i].goodGroupId+';'+num+":";
			}
			json.goodGroupId=id;
			json.swapstr=str;
			json.allNum=context.state.newcount;
			json.groupId=context.state.group.group.groupId;
			 Vue.http.post('/yich/ApplySwapServlet',json).then((response) => {
				 window.checkErrorVue(response);
				 if(response.data.res==1 && response.data.res2==1){
					 context.state.showtip=true;
				 }else{
					
				 }
	    			  }, (response) => {
	    		 });
		},
  }
export default new Vuex.Store({
  state,
  mutations,
  actions,
  //getters
})

