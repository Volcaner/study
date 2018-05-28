import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
		/*****p1的store数据*****/
		allpage:1,
		data:{//ajax数据
			userName:'',
			supName:'',
			payTimeYear:'',
			payTimeMonth:'',
			payTimeDay:'',
			serviceTimeYear:'',
			serviceTimeMonth:'',
			serviceTimeDay:'',
			payType:'',
			operateStatus:'',
			pageNo:1,	
		},
		list:[
		      //{userName,supName,payTime,serviceDays,finishedTime,}
		],
}
const mutations = {		
	page(state,n){
		state.data.pageNo=n.page;
	},	
}
const actions={
	Ajax(context){
		var searchData={};
		for(let key in context.state.data){
			searchData[key]=context.state.data[key];
		}
		for(var key in searchData){
			if(!searchData[key]){
				delete searchData[key];
			}
		}
		searchData.payTimeMonth = dateAddZeor(searchData.payTimeMonth);
		searchData.payTimeDay = dateAddZeor(searchData.payTimeDay);
		searchData.serviceTimeMonth = dateAddZeor(searchData.serviceTimeMonth);
		searchData.serviceTimeDay = dateAddZeor(searchData.serviceTimeDay);
		Vue.http.post('/yich/ServiceOperateManage',searchData,{emulateJSON:true})
		.then((response)=>{
			window.checkErrorVue(response);
			context.state.allpage=response.body.totalNum;
			context.state.list.splice(0);
			var list=response.body.siphList;
			for(var key in list){
				let userName=list[key].userName;
				let supName=list[key].supName;
				/*let payTime=new Date(list[key].payTime);
					payTime=payTime.getFullYear()+'/'+(payTime.getMonth()+1)+'/'+payTime.getDate();*/
				let payTime = '';
				if(list[key].payTime){
					payTime = list[key].payTime.split(' ')[0].replace(/-/g,'/');
				}
				let serviceDays=list[key].state=='NY'?'运营中':'已暂停';
				/*let finishedTime=new Date(list[key].finishedTime);
					finishedTime=finishedTime.getFullYear()+'/'+(finishedTime.getMonth()+1)+'/'+finishedTime.getDate();*/
				let finishedTime = '';
				if(list[key].finishedTime){
					finishedTime = list[key].finishedTime.split(' ')[0].replace(/-/g,'/');
				}
				let userId=list[key].userId;
				context.state.list.push({userName:userName,supName:supName,payTime:payTime,serviceDays:serviceDays,finishedTime:finishedTime,userId:userId});	
			}
		},(response)=>{
			
		})
	}
}
function dateAddZeor(date){
	if(date && date.length && date.length == 1){
		return '0'+date;
	}
	return date;
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})