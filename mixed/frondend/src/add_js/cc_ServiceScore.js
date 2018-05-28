import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
	Name:'',
	Pf:'',
	arr:'',
	year:'',
	month:1,
	list:'',
	pengf:'',
	modalLoginFlag:false,
	userid:false,
 }
const mutations = {
		name(state,o){
			state.Name=o;
		},
		pf(state,o){
			state.Pf=o;
		},

}
const actions={
		tubline(context,c,json){
			Vue.http.post('/yich/SerScore',c,{emulateJSON:true}).then((response) => {
				window.checkErrorVue(response);
	 			   var a=response.data;
	 		     context.state.Name=a.supname;
	 		     context.state.pf=a.score;
	 		     context.state.list=a.record;
	 		     context.state.pengf=a.score;
	 		       if(!json){
	 		    	 if(a.date){
	 		    		 var time1=(a.date).split("-")[0];
		 		    	 var time2=(a.date).split("-")[1];
		 		    	context.state.year=time1;
		 		    	context.state.month=time2; 
	 		    	 }
	 		    	}
	 		     var json_zxt=[];
	 		       var b=a.list;
	 		       if(b && b.length>0){
	 		    	   for(var j=0;j<b.length;j++){
	 		    		   var d={};
	 		    		   d.name=((b[j].scoreTime).split("-"))[2];
	 		    		   d.value=b[j].score;
	 		    		 json_zxt.push(d);
	 		    	   };
	 		       }else {
	 		       	 setScoreNum(json_zxt,c);
	 		       }
	 		      context.state.arr=json_zxt; 
	              window.linechar(context.state.arr);
  			  }, (response) => {
  		 });
		},
	
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})
function setScoreNum(arr,c) {
	var monthNum = 30;
	var date = new Date();
	var year = "";
	var month = "";
	if(!c){
   		year = date.getFullYear();
    	month = date.getMonth()+1;
	}else{
		year = c.time.split("-")[0];
		month = c.time.split("-")[1];
	}
	
    var d = new Date(year, month, 0);
    monthNum =  d.getDate();
    for(var i=1;i<=monthNum;i++){
    	var obj = {name:'01',value:8}
    	if(i<10){
    		obj.name = '0'+i;
    	}else {
    		obj.name = i;
    	}
    	arr.push(obj)
    }
}
