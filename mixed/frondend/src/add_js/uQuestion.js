import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
	choseWho:'',
	allCount:0,
	noCount:0,
	yesCount:0,
	datalist:[],//返回数据
	datalistId:[],//
	nowDate:'',
	isMotaiSta:false,
	showFeny:false,//是否显示分页
	page:1, //页码
	zonPage:1,//总页码数
   
 }
const mutations = {
		page(state,n){
			state.page=n.page;
		},
		uWjStarData(state){
		 	   Vue.http.post('/yich/UserExam',{page:state.page,type:state.choseWho},{emulateJSON:true}).then((response) => {
		 		 /* window.checkErrorVue(response);*/
					if(response.data.totalPage<1){
						state.showFeny = false;
						state.zonPage = 1;
					}else{
						state.showFeny = true;
						state.zonPage = response.data.totalPage;
					};
					//数量
					state.allCount = response.data.allcount;
					state.noCount = response.data.nocount; 
					state.yesCount = response.data.yescount; 
					if(response.data.list.length>0){
						getDataList(response.data.list,response.data.date)
					}else{
						state.datalist =[];
					}
			}, (response) => {
	    		console.log('error');
	    	});
		},
		deleteList(state){
			Vue.http.post('/yich/DeleteExamUser',{examUserId:state.datalistId}).then((response) => {
		 		  window.checkErrorVue(response);
					if(response.data.result != 0){
						window.location.reload();
					}else{
						alert("删除失败！");
					}
			}, (response) => {
	    		console.log('error');
	    	});
		},
}

const actions={
		uWjStarData(context){
			context.commit("uWjStarData");
		},
		deleteList(context){
			context.commit("deleteList");
		},
		Ajax(context){
			context.commit("uWjStarData");
		},
	}
export default new Vuex.Store({
	state,
	mutations,
	actions
 })

function getDataList(data,t){
	var tt = t.replace(/[^\d]/g, "");
	var myData=[];
	for(var i in data){
		var json = {id:'',euid:'',supShopId:'',sqTime:'',fkname:'',gx:'',wjname:'',sxTime:'',wjSta:'',hfTime:'',sxSta:false,lookSta:false,wangwang:''};
		json.id = data[i].examId;
		json.euid = data[i].examUserId;
		json.supShopId = data[i].supshopId;
		json.sqTime = data[i].sendTime;
		json.fkname = data[i].supshopName;
		data[i].type == 0?json.gx = "合作":json.gx = "访客";
		json.wjname = data[i].examName;
		json.sxTime = data[i].invalidTime;
		if(data[i].wangwang){
			json.wangwang = data[i].wangwang;
		}
		if(data[i].answerTime){
			json.wjSta="已回复";
			json.hfTime = data[i].answerTime;
		}else{
			var date = data[i].invalidTime.replace(/[^\d]/g, "");
			if(parseInt(tt)<=parseInt(date)){
				json.wjSta="未回复";
			}else{
				json.wjSta="未回复 已失效";
				json.sxSta = true;
			}
			
		}
		myData.push(json);
	}
	state.datalist = myData
	
}

