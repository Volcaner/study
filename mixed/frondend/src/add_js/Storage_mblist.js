import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
     pages:0,
     page:1,
     name:'',
     type:'',
     arr:'',
     showFeny:true,
     show:true,

	 templateId:'',
     //选择对象
     objstate:false,
     objshow:true,
	 objname:'',
	 objlist:'',
	 objcount:0,
	 objarr:[],
	 count:0,
 }
const mutations = {
		page(state,n){
			state.page=n.page;
		},
		obj(state,obj){
			state.name=obj.name;
			state.type=obj.type;
			state.page=obj.page;
		},
}

const actions={
		Ajax(context){
			var obj={};
			obj.name=context.state.name;
			obj.type=context.state.type;
			obj.page=context.state.page;
			obj.templateId=context.state.templateId;
		 	   Vue.http.post('/yich/TemplateList',obj,{emulateJSON:true}).then((response) => {
		 		  window.checkErrorVue(response);
				    var a=response.data;
				    if(a.flag==1){
				    context.state.show=false;
				    setTimeout(function(){
				    	context.state.show=true;
				    },0);
				   // context.state.pages=a.totalPages;
				 if(a.totalPages<1){
					context.state.showFeny = false;
					context.state.zonPage = 1;
				}else{
					context.state.showFeny = true;
					context.state.zonPage = a.totalPages;
				};
				    context.state.arr=a.list;
				    }
	    			  }, (response) => {
	    		 });
		},
		
		objAjax(context){
			context.state.objlist='';
			context.state.objcount=0;
			var obj={};
			obj.name=context.state.objname;
			obj.templateId=context.state.templateId;
			  Vue.http.post('/yich/TemplateCooperation',obj,{emulateJSON:true}).then((response) => {
		 		  window.checkErrorVue(response);
		 		    var a=response.data;
                    if(typeof (a.coopList)!='undefined'){
                   	 context.state.objlist=a.coopList;
                    }
                    context.state.objshow=false;
                    setTimeout(function(){
                   	 context.state.objshow=true;
                    },0);
				
	    			  }, (response) => {
	    		 });
		},
		qd:function(context){
			var obj={};
			obj.TemplateId=context.state.templateId;
			obj.userIdList=(context.state.objarr).join(",");
			context.state.count=0;
			 Vue.http.post('/yich/SelectUsersForTemplates',obj,{emulateJSON:true}).then((response) => {
		 		  window.checkErrorVue(response);
		 		  var a = '';
		 		  if(typeof response.data == 'object'){
		 			  a = response.data;
		 		  }else if(typeof response.data == 'string'){
		 			 a=eval("("+response.data+")");
		 		  }
                    if(a.flag!='0'){
                    	context.state.objstate=false;
                    	context.state.count=context.state.objcount;
                    }else{
                    	alert("保存失败！");
                    }
	    			  }, (response) => {
	    		 });
		},
	}
export default new Vuex.Store({
	state,
	mutations,
	actions
 })
