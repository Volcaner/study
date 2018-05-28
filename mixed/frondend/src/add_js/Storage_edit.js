import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
		sp:false,//商品model是否显示
		splist:'',//商品list
		//商品model
		spshow:true,
		classify:'',//类型
		object:'',//关键字
		pro_id:'',//货号
		low_price:'',//最低价
		high_price:'',//最高价
		xllist:'',
		count:0,//个数
		splength:0,
		proidArr:[],//选中商品的id
		templateid:'',
		text:'',
		ts:'warning',
		showtip:false,
		
 }
const mutations = {
    
}
const actions={
		Ajax(context){
			var obj={};
			obj.classify=context.state.classify;
			obj.object=context.state.object;
			obj.pro_id=context.state.pro_id;
			obj.low_price=context.state.low_price;
			obj.high_price=context.state.high_price;
			   Vue.http.post('/yich/TemplateProduct',obj,{emulateJSON:true}).then((response) => {
			 		  window.checkErrorVue(response);
					   context.state.xllist=response.data.contentlist;
					   context.state.splist=response.data.list;
					   context.state.spshow=false;
					   setTimeout(function(){
						   context.state.spshow=true;
					   },0);
		    			  }, (response) => {
		    		 });
	    },
	    
	    Ajaxsave(context,obj){
			   Vue.http.post('/yich/TemplateServlet',obj,{emulateJSON:true}).then((response) => {
			 		  window.checkErrorVue(response);
					if(response.data.flag>=1){
						context.state.text='保存成功！';
						context.state.showtip=true;
					}else{
						context.state.text='保存失败！';
						context.state.showtip=true;
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
