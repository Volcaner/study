import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
	choseOne:'tj',
	
	fkStatus:'',
	datalist:[],//统计返回数据
	datalistId:[],//
	modeldelId:'',//模板中的删除id
	orderSort:"invalid_time",
	isMotaiSta:false,
	fswjMotaiSta:false,//发送问卷模态状态
	wjListSta:false,
	/**模板-发送问卷**/
	fkData:[],//总数据
	name:'',//搜索的名字
	nextBtnSta:false,//下一步按钮的状态
	isSendOk:false,//发送成功
	sortStaH:'agreeTime',//排序
	option:'0',//合作商（0）还是访客（1）
	allDataNum:0,
	carDataNum:0,
	finalName:[],
	peopleNum:0,
	wenjId:'',
	yxTime:'7',
	
	hadCheck:[],//已选择id
	hadCarData:[],//已选择数据
	sinAllCheck:[],//单页选择id
	sinCarData:[],//单页选择数据
	ischeckAllHad:true,//判断是全部还是已选择
	
	mupdate:false,
	
	showFeny:false,//是否显示分页
	page:1, //页码
	zonPage:1,//总页码数
	mzonPage:1,
   
 }
const mutations = {
		page(state,n){
			state.page=n.page;
		},
		sWjStarData(state){
			state.datalist = [];
		 	   Vue.http.post('/yich/feedBackExams',{page:state.page,type:state.fkStatus,order:state.orderSort},{emulateJSON:true}).then((response) => {
		 		  window.checkErrorVue(response);
					if(response.data.totalPage<1){
						state.showFeny = false;
						state.mzonPage = 1;
					}else{
						state.showFeny = true;
						state.mzonPage = response.data.totalPage;
					};
					
					if(response.data.list.length>0){
						getDataList(response.data.list,response.data.date)
					}else{
						state.datalist =[];
					}
			}, (response) => {
	    	});
		},
		sWjModelData(state){
			state.datalist = [];
			state.showFeny = false;
		 	   Vue.http.post('/yich/TemplateExamList',{page:state.page},{emulateJSON:true}).then((response) => {
		 		 window.checkErrorVue(response);
		 		  	if(response.data.totalPage<1){
						state.showFeny = false;
						state.mzonPage = 1;
					}else{
						state.showFeny = true;
						state.mzonPage = response.data.totalPage;
					};
					if(response.data.temlist.length>0){
						state.datalist = response.data.temlist;
					}else{
						state.datalist =[];
					}
			}, (response) => {
	    	});
		},
		deleteList(state){
			Vue.http.post('/yich/DeleteRecordExam',{temId:state.datalistId}).then((response) => {
		 		  window.checkErrorVue(response);
					if(response.data.result != 0){
						window.location.reload();
					}else{
						alert("删除失败！");
					}
			}, (response) => {
	    	});
		},
		//模板删除
		modelDeleteList(state){
			Vue.http.post('/yich/deleteTemplateExam',{temId:state.modeldelId},{emulateJSON:true}).then((response) => {
		 		  window.checkErrorVue(response);
					if(response.data.result != 0){
						window.location.reload();
					}else{
						alert("删除失败！");
					}
			}, (response) => {
	    	});
		},
		/****模板-发送问卷****/
		
		sendWjStar(state){
			Vue.http.post('/yich/selectToUsers',{name:state.name,page:state.page,option:state.option,order:state.sortStaH},{emulateJSON:true}).then((response) => {
		 		  window.checkErrorVue(response);
		 		  if(typeof (response.data.check)!='undefined' && response.data.check){
		 			 if(response.data.clist.totalPage<1){
							state.showFeny = false;
							state.zonPage = 1;
						}else{
							state.showFeny = true;
							state.zonPage = response.data.clist.totalPage;
						};
						if(response.data.clist.list.length>0){
							state.allDataNum = response.data.clist.list.length;
							if(state.option == "0"){
								hzData(response.data.clist.list);
							}else if(state.option == "1"){
								fkData(response.data.clist.list);
							}
						}else{
							state.fkData = [];
						}
		 		  }else{
		 			 alert("输入不合法");
		 		  }
			}, (response) => {
	    	});
		},
		finalSendWj(state){
			var finalName = [];
			var finalid = [];
			state.ischeckAllHad ? finalName=getFinalName(state.sinCarData) : finalName=getFinalName(state.hadCarData);
			state.ischeckAllHad ? finalid=state.sinAllCheck : finalid=state.hadCheck;
			var people=finalName.length+"";
			Vue.http.post('/yich/sendExam',{temId:state.wenjId,option:state.option,people:people,name:finalName,userIds:finalid,time:state.yxTime}).then((response) => {
		 		 window.checkErrorVue(response);
					if(response.data.result != 0){
						state.isSendOk = true;
						setTimeout(function(){
							window.location.reload();
						},3000)
					}
			}, (response) => {
	    	});
		}
}

const actions={
		sWjStarData(context){
			context.commit("sWjStarData");
		},
		sWjModelData(context){
			context.commit("sWjModelData");
		},
		deleteList(context){
			if(state.choseOne == "tj"){
				context.commit("deleteList");
			}else if(state.choseOne == "mb"){
				context.commit("modelDeleteList");
			}
		},
		sendWjStar(context){
			context.commit("sendWjStar");
		},
		finalSendWj(context){
			context.commit("finalSendWj");
		},
		Ajax(context){
			if(state.fswjMotaiSta){
				context.commit("sendWjStar");
			}else{
				if(state.choseOne == "tj"){
					context.commit("sWjStarData");
				}else if(state.choseOne == "mb"){
					context.commit("sWjModelData");
				}
				
			}
			
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
		var json = {id:'',gx:'',fsNum:'',fkNum:'--',mbname:'',fkTime:'',fsTime:'',fkSta:'',sxSta:false,lookSta:false,};
		json.id = data[i].examId;
		data[i].type == 0?json.gx = "合作":json.gx = "访客";
		json.fsNum = data[i].sendNum;
		if(data[i].answerNum != 0){
			json.fkNum = data[i].answerNum;
		}
		json.mbname = data[i].examName;
		json.fkTime = data[i].invalidTime;
		json.fsTime = data[i].sendTime;
		
		var date = data[i].invalidTime.replace(/[^\d]/g, "");
		
		if(parseInt(tt)>parseInt(date)){
			json.fkSta="已反馈";
		}else{
			if(data[i].sendNum == data[i].answerNum){
				json.fkSta="已反馈";
			}else {
				json.fkSta="未反馈";
				json.sxSta = true;
			}
		}
		myData.push(json);
	}
	state.datalist = myData
}
//模板-发送问卷
function hzData(data){
	var mydata=[];
	for(var i in data){
		var json={id:'',name:'',money:'0',hzTime:'',thPer:'0.00%'}
		json.id = data[i].userId;
		json.name = data[i].shopName;
		json.money = data[i].business.tra_total_money;
		json.hzTime = data[i].agreeTime;
		if(parseInt(data[i].traNum)>0 && parseInt(data[i].retNum)>0){
			json.thPer = ((parseInt(data[i].retNum)/parseInt(data[i].traNum))*100).toFixed(2)+"%";
		}
		mydata.push(json);
	}
	state.mupdate = !state.mupdate;
	state.fkData = mydata;
}

//访客数据
function fkData(data){
	state.fkData = [];
	var list = [];
	for(var i in data){
		var json = {id:'',name:'',llNum:'0',clNum:'0',xcNum:'0',xdNum:'0',isSc:'否',userId:''};
		
		if(data[i].business){
			json.id = data[i].business.user_id;
			json.name = data[i].business.name;
		}
		json.llNum = data[i].bs;
		json.clNum = data[i].rs;
		json.xcNum = data[i].ds;
		json.xdNum = data[i].os;
		json.isSc = data[i].collection=="1" ? "是" : "否";
		list.push(json);
	}
	state.mupdate = !state.mupdate;
	state.fkData = list;
}
//下一步时传的数据name
function getFinalName(name){
	var nn=[];
	for(var i in name){
		nn.push(name[i].name)
	}
	return nn;
}
