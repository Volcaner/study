import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
	 //待转账
      count:0,//待转账总条数
      arr:'',//待转账数组
      page:0,//分页页码
      status:'',//待类型
      lx:'',//全部待转账类型
      D_arr:[],//待转账选中数据
      leng:0,//待转账选中的数据的length
      pl_link:'',//待转账批量选中的数据的ID
      zje:0,//待转账总金额
      //转账成功
      s_length:0,
      s_json:'',
      //转账失败
      f_length:0,
      f_json:'',
      f_nowtime:'',
      show:true,
      already_arr:[],//已转账数组，防止重复转账
	}
const mutations = {
		page(state,json){ //修改页码
			state.page=json.page;
		},
		dzz_ajax(state,json){
		   state.leng=0;
			if(json){
				state.page=json.page;
				state.status=json.status;
				state.lx=json.lx;
			}
		Vue.http.post("/yich/ajaxStatus",{pno:state.page,type:state.lx,status:state.status},{emulateJSON:true}).then((response)=>{
			window.checkErrorVue(response);
			var sj=response.data;
			state.show=false;
			setTimeout(function(){state.show=true;},0);
			if(state.status=='K'){
				state.count=sj.count;
				state.arr=sj.list;
				state.page=sj.totalpages;
			}else if(state.status=='S'){
				state.s_length=sj.count;
				state.page=sj.totalpages;
				state.s_json=sj.json;
			}else if(state.status=='F'){
				state.f_length=sj.count;
				state.page=sj.totalpages;
				state.f_json=sj.json;
				state.f_nowtime=sj.now;
			}
			
		},(error) => {
		})
	},

	add(state,json){  //待转账选中add数据
		(state.D_arr).push(json);
	},
	remove(state,index){ //待转账取消选中 删除数据
		for(var i=0;i<(state.D_arr).length;i++){
			 for(var key in (state.D_arr)[i]){
				 if(key=='index' && (state.D_arr)[i][key]==index){
					 (state.D_arr).splice(i,1);
				 }
			 }
		};
		
	},
	len(state){
		var id='';
		var n=0;
		state.leng=(state.D_arr).length;
		for(var i=0;i<(state.D_arr).length;i++){
			for(var key in (state.D_arr)[i]){
				 if(key=='transId'){
					 id+=(state.D_arr)[i][key]+',';
				 }else if(key=='je'){
					 n+=+(state.D_arr)[i][key];
				 }
			}
		}
		state.zje=n.toFixed(2);
		state.pl_link='/yich/batchTransAccount?transId='+id;
	},
}
const actions={
		Ajax(context,json){
			context.commit("dzz_ajax",json);
        },
		
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})
