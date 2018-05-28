import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
		traState:100,
		page:1,
		Data:'',//ajax返回list数据
		zong:0,//ajax返回总页数
		booLeam:false,//是否全选
		arr:[],//选中的数据
		length:0,
		 show:true,
		 index:0,
		 xs:true,
 }
const mutations = {
		feny(state){
			state.show=false;
	        setTimeout(function(){state.show=true},0);
		},
		tab(state,n){
			if(n==0){
				state.traState=100;
			}else{
				state.traState=101;
			}
		state.page=1;
		state.booLeam=false;
		},
		qux(state,bool){
			state.booLeam=bool;
		},
		clear(state){
			state.arr.length=0;
		},
		page(state,obj){
			state.page=obj.page;
		}
}

const actions={
		Ajax(context){
    	  Vue.http.post('/yich/InvoiceListsServlet',{
    		  traState:context.state.traState,
    		  page:context.state.page,
	 		   },{emulateJSON:true}).then((response) => {
	 			  window.checkErrorVue(response);
	 			   var d=response.data;
	 			  context.state.Data=d.datas;
	 			  context.state.zong=d.totalPages;
	 			 //context.state.index=index;
	 			 context.state.xs=false;
	 			 setTimeout(function(){
	 				context.state.xs=true;
	 			 },0);
   			  }, (response) => {
   		   });
      }  
	}
const getters={
		length(state){
			var a=0;
			for(var i=0;i<state.arr.length;i++){
				if((state.arr)[i]['state']){
					a++;
				}
			}
			return a;
		},
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
 })
