import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
   tid:'',
   arr:'',
   spzje:0,//商品总金额
   kdzje:0,//快递总金额
   zje:0,//总金额
   bz:'',//备注
   traId:'',
   token:'',
 }
const mutations = {
		listajax(state){
		 	   Vue.http.post('/yich/RecordedTradesInfo',{
		 		  traIds:state.tid,
		 		   },{emulateJSON:true}).then((response) => {
		 			  window.checkErrorVue(response);
		 			  state.arr=response.data.data;
		 			  state.token=response.data.token;
		 			  var a=response.data.data;
		 			  for(var i=0;i<a.length;i++){
		 				   for(var j=0;j<a[i].roList.length;j++){
		 					   if(a[i].roList[j].isModify == '1'){
		 						  state.spzje += a[i].roList[j].modifyAllPrice?parseFloat(a[i].roList[j].modifyAllPrice):0;
		 					   }else if(a[i].roList[j].isModify == '0'){
		 						  state.spzje+=(((a[i].roList[j]).price)*((a[i].roList[j]).traAmount)>0)?((a[i].roList[j]).price)*((a[i].roList[j]).traAmount)*1:0*1;
		 					   }
		 					  
		 				   };  
		 				  state.kdzje+=((((a[i]).logMoney)*1)>0)?(((a[i]).logMoney)*1)*1:0*1;
		 				  state.bz+=a[i].sellerMemo+',';
		 				  state.traId+=a[i].traId+',';
		 			  };
		 			 state.spzje=(state.spzje).toFixed(2);
		 			 state.zje=(state.spzje*1+state.kdzje*1).toFixed(2);
		 			state.kdzje=(state.kdzje).toFixed(2);
	    			  }, (response) => {
	    		 });
		},

}

const actions={
		list(context,tid){
			context.state.tid=tid;
       	    context.commit('listajax',context.state)
		},
		beiz(context,bz){
			(state.arr)[bz.index].sellerMemo=bz.bz;
			var a=state.arr;
			 for(var i=0;i<a.length;i++){ 
				  state.bz+=a[i].sellerMemo+',';
			  };
		}
	}

export default new Vuex.Store({
	state,
	mutations,
	actions,
})