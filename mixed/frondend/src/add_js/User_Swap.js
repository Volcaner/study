import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
		groupId:'',
		group:'',
		list:'',
		length:0,
		w:147,
		skuarr:[],
		numjson:{},
		show:false,
		tiptext:'',
		tipts:'',
 }
const mutations = {

}

const actions={
		Ajax(context){
			var obj={};
			obj.groupId=context.state.groupId;
		 	   Vue.http.post('/yich/GoUpdate',obj,{emulateJSON:true}).then((response) => {
		 		  window.checkErrorVue(response);
				    var a=response.data;
				    console.log(444555666);
				    console.log(a.group);
				    context.state.group=a.group;
				    context.state.groupId=a.group.groupId;
				    $("#id").text(context.state.groupId);
				    context.state.list=a.list;
				    context.state.length=a.group.goodGroups;
				    var skulist=a.group.goodGroups;
				    for(var i=0;i<skulist.length;i++){
				    	(context.state.skuarr).push(skulist[i].sku);
				    };
				    document.getElementById("wardiv").style.width= (state.w)*(state.length)+80*1;
				    document.getElementById("table").style.width= (state.w)*(state.length)+80*1;
				    document.getElementById("dltitle").style.width= (state.w)*(state.length)+80*1;
				   setTimeout(function(){window.dom();},500);
	    			  }, (response) => {
	    			   console.log('error');
	    		 });
		},
		f(context){
            var arr=[];
            var json=context.state.numjson;
            console.log(444443333);
            console.log(json);
            for(var attr in json){
            	var j={};
            	var ar = json[attr].split("&");
            	if(ar[0]){
            		j.peopleGroupId=ar[0];
            	}
            	if(ar[1]){
            		j.swapNum=ar[1]*1;
            	}
            	arr.push(j);
            }
           var o={};
           o.swap=arr;
           o.groupId=context.state.groupId;
           var allN = 0;
           $('.z .updatanum').each(function() {
        	   allN+=Number($(this).text());
           });
           o.swapAllNum=JSON.stringify(allN);
           console.log(2222223334);
           console.log(o);
           return false
            Vue.http.post('/yich/Swaping',o).then((response) => {
		 		 window.checkErrorVue(response);
				   if(response.data.result==0){
					   context.state.show=true;
					   context.state.tiptext='没有商户参加拼团';
					   context.state.tipts='error';
				   }else if(response.data.result==-1){
					   context.state.show=true;
					   context.state.tiptext='不能重复调剂';
					   context.state.tipts='warning';
				   }else if(response.data.result==1){
					   context.state.show=false;
					   context.state.tiptext='';
					   context.state.tipts='';
					  // window.location.href='/yich/User/User_UGnav.html';
				   }else if(response.data.result=='void'){ 
					   context.state.show=true; 
					   context.state.tiptext='无人参团，拼团结束'; 
					   context.state.tipts='warning'; 
					   setTimeout(function(){ 
						   context.state.show=false; 
						 //  window.location.href='/yich/User/User_UGnav.html'; 
						   },4000) 
					}else{
					   context.state.show=true;
					   context.state.tiptext='提交失败';
					   context.state.tipts='error';
				   }
	    			  }, (response) => {
	    			   console.log('error');
	    		 });
            
		},
  }
export default new Vuex.Store({
  state,
  mutations,
  actions,
  //getters
})

