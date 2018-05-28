import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
	groupId:2,
	peopleGroupIds:'',
	address:'',//地址
	sheng:'',//省
	shi:'',//市
	qu:'',//区
	newdizhi:false,//新地址
	lsdizhi:true,//临时地址
	status:false,
	list_nr:'',//新地址填充内容
	index:0,//修改地址的索引
	list:'',
	kdshow:true,
 }
const mutations = {
	useraAddress(state,str){
		state.useraddress=str;
	},
	taobid(state,tb){
		state.taobaoid=tb;
	},
	lyan(state,str){
		state.liuy=str;
	},
	Address(state,index){
		var Addres = state.address;
		for(var j=0;j<Addres.length;j++){
			Addres[j].isDefault=0
		};
		Addres[index].isDefault=1;
	},
	vueajax(state){
	 	   Vue.http.post('/yich/GroupOrderServlet',{
	 		  group_id:state.groupId,
	 		 peopleGroupIds:state.peopleGroupIds,
	 		   },{emulateJSON:true}).then((response) => {
	 			// window.checkErrorVue(response);
	 			 state.address=response.data.addressList;//地址
	 			 state.list=response.data;
	 			 if(typeof (response.data.unique_log)!='undefined'){
	 				 state.kdshow=false;
	 			 }else{
	 				state.kdshow=true;
	 			 }
 			  }, (response) => {
 			   console.log('error');
 		 });
	},
	
	
	s_sheng(state,text){  //省
		state.sheng=text;
	},
	s_shi(state,text){   //市
		state.shi=text;
	},
	s_qu(state,text){  //区
		state.qu=text;
	},
	quxnewdz(state){  //新地址取消
		state.newdizhi=false;
	},
	quxlsdz(state){  //临时地址取消
		state.lsdizhi=true;
	},
	synewdizhi(state,obj){//使用新地址
		state.newdizhi=false;
		setTimeout(function(){state.newdizhi=true;},0);
		//state.newdizhi=true;
		state.type='newdz';
		state.index=(state.address).length;
		if(obj){
		  state.list_nr=obj.shuju;	
		  state.index=obj.index;
		  state.sheng=( state.list_nr.area).split(" ")[0];
		  state.shi=( state.list_nr.area).split(" ")[1];
		  state.qu=( state.list_nr.area).split(" ")[2];
		}else{
		  state.list_nr='';	
		  state.sheng='';
		  state.shi='';
		  state.qu='';
		}
	},
	sylsdizhi(state,obj){  //使用临时地址
		state.lsdizhi=true;
		setTimeout(function(){state.lsdizhi=false;},0);
		//state.lsdizhi=false;
		state.type='lsdz';
		state.newdizhi=false;
		state.index=(state.address).length;
		if(obj){
			state.list_nr=obj.shuju;	
			  state.index=obj.index;
			  state.sheng=( state.list_nr.area).split(" ")[0];
			  state.shi=( state.list_nr.area).split(" ")[1];
			  state.qu=( state.list_nr.area).split(" ")[2];
		}else{
			  state.list_nr='';	
			  state.sheng='';
			  state.shi='';
			  state.qu='';
			}
	},
	mrdizhi(state,bool){  //默认地址
		state.status=bool;
	},

}

const actions={
		Ajax(context,huohao){
       	    context.commit('vueajax')
		},
	}
/*const getters={

	}*/
export default new Vuex.Store({
	state,
	mutations,
	actions,
	//getters
})

