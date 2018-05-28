/*仓储-问卷查看*/
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
		temId:window.location.href.split("temId=")[1].split("&")[0],//问卷id
		haveCheckId:[],
		wenjName:'',
		modelData:[],//问卷模板数据
		statisData:'',
		showFeny:false,//是否显示分页
		page:1, //页码
		zonPage:1,//总页码数
 }
const mutations = {
		page(state,n){
			state.page=n.page;
		},
		/*问卷模板查看*/
		modelStar(state){
			Vue.http.post("/yich/TemplateExamDetail",{temId:state.temId},{emulateJSON:true}).then((response)=>{
				/*window.checkErrorVue(response);*/
				if(response.data.pages<1){
					state.showFeny = false;
					state.zonPage = 1;
				}else{
					state.showFeny = true;
					state.zonPage = response.data.pages;
				};
				if(response.data.detail){
					setmodel(response.data.detail.quesList);
					state.wenjName = response.data.detail.templateName;
					/*state.modelData = response.data.detail;*/
				}
			},(error) => {
				console.log("err");
			})
		},
		/*问卷统计查看*/
		statisStar(state){
			Vue.http.post("/yich/examAnswer",{temId:state.temId},{emulateJSON:true}).then((response)=>{
				/*window.checkErrorVue(response);*/
				if(response.data.pages<1){
					state.showFeny = false;
					state.zonPage = 1;
				}else{
					state.showFeny = true;
					state.zonPage = response.data.pages;
				};
				if(response.data.exam){
					state.modelData = [];
					getPeople(response.data.exam,response.data.people,response.data.names);
					getStatisData(response.data.exam.qlist);
				}
			},(error) => {
				console.log("err");
			})
		},
		//
		onePersonStar(state){
			if(window.location.href.indexOf("userId=") != -1){
				var userid = window.location.href.split("userId=")[1].split("&")[0];
			}
			Vue.http.post("/yich/examAnswerOne",{temId:state.temId,userId:userid},{emulateJSON:true}).then((response)=>{
				/*window.checkErrorVue(response);*/
				if(response.data.pages<1){
					state.showFeny = false;
					state.zonPage = 1;
				}else{
					state.showFeny = true;
					state.zonPage = response.data.pages;
				};
				if(response.data.exam){
					state.wenjName=response.data.exam.examName;
					state.examId=response.data.exam.examId;
					getHadReplyData(response.data.exam.qlist,"hadreply");
				}
				
			},(error) => {
				console.log("err");
			})
		}
}

const actions={
		modelStar(context){
			context.commit("modelStar");
		},
		statisStar(context){
			context.commit("statisStar");
		},
		onePersonStar(context){
			context.commit("onePersonStar");
		},
	}
export default new Vuex.Store({
	state,
	mutations,
	actions
 })
function setmodel(data){
	var quesData=[];
	for(var i in data){
		var list = data[i].optionList;
		var json = {id:'',name:'',isAnswer:'',quesType:'',quesArr:'',answerId:''}
		var arr = [];
		var arrid = [];
		for(var j in list){
			var cjson = {quesId:'', name:''};
			cjson.quesId = list[j].templateOptionId;
			cjson.name = list[j].optionContent;
			arr.push(cjson);
		}
		json.id = data[i].templateExamId;
		json.name = data[i].content;
		json.isAnswer = data[i].isAnswer;
		json.quesType = data[i].quesType;
		json.quesArr = arr;
		json.answerId = arrid;
		quesData.push(json);
	}
	state.modelData = quesData;
}
//统计查看
function getStatisData(data){
	var quesData=[];
	for(var i in data){
		var list = data[i].qolist;
		var alist = data[i].alist;
		var json = {id:'',name:'',isAnswer:'',quesType:'',quesArr:'',alist:'',answerId:''}
		var qrr = [];
		var arr =[];
		var arrid = [];
		for(var j in list){
			var cjson = {name:'',choseNum:'0'};
			cjson.name = list[j].optionContent;
			if(list[j].chooseNum){
				cjson.choseNum = list[j].chooseNum;
			}
			qrr.push(cjson);
		}
		for(var x in alist){
			var ajson = {name:''};
			ajson.name = alist[x].answer;
			arr.push(ajson);
		}
		json.id = data[i].questionId;
		json.name = data[i].content;
		json.isAnswer = data[i].isAnswer;
		json.quesType = data[i].quesType;
		json.quesArr = qrr;
		json.alist = arr;
		json.answerId = arrid;
		quesData.push(json);
	}
	state.modelData = quesData;
}
function getPeople(data,people,names){
	var tempArr = [];
	var nameArr = [];
	var json = {sendNum:'0',backNum:'0',sendTime:'',tjTime:'',peoArr:''}
	json.sendNum = data.sendNum;
	json.backNum = data.answerNum;
	json.sendTime = data.sendTime;
	json.tjTime = data.invalidTime;
	tempArr = people.split("、");
	for(var i in tempArr){
		var nameJson = {name:'',sta:false,userId:'',examId:''};
		for(var j in names){
			if(tempArr[i]==names[j].userName){
				nameJson.userId = names[j].userId;
				nameJson.sta = true;
			}
		}
		nameJson.examId = data.examId;
		nameJson.name = tempArr[i];
		nameArr.push(nameJson);
	}
	json.peoArr = nameArr;
	state.statisData = json;
	
}
//已恢复
function getHadReplyData(data,hfSta){
	var quesData=[];
	for(var i in data){
		var list = data[i].qolist;
		var json = {id:'',name:'',isAnswer:'',quesType:'',quesArr:'',answerId:''}
		var arr = [];
		var arrid = [];
		for(var j in list){
			var cjson = {oid:'', name:''};
			cjson.oid = list[j].optionId;
			cjson.name = list[j].optionContent;
			arr.push(cjson);
		}
		json.id = data[i].questionId;
		json.name = data[i].content;
		json.isAnswer = data[i].isAnswer;
		if(data[i].isAnswer == "0"){
			state.haveCheckId.push(data[i].questionId)
		}
		json.quesType = data[i].quesType;
		json.quesArr = arr;
		//
		if(hfSta == "hadreply"){
			if(data[i].answer){
				if(data[i].answer.answer){
					arrid = data[i].answer.answer.split('、')
				}
			}
		}
		
		json.answerId = arrid;
		quesData.push(json);
	}
	state.modelData = quesData;
}