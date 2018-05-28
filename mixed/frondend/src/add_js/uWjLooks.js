/*商户-问卷查看*/
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
		temId:window.location.href.split("temId=")[1].split("&")[0],
		isBtnTish:false, //回复成功提示
		examId:'',
		wenjName:'',
		modelData:[],
		haveCheckId:[],//必选的quesid
		finalData:[],
		
		showFeny:false,//是否显示分页
		page:1, //页码
		zonPage:1,//总页码数
 }
const mutations = {
		page(state,n){
			state.page=n.page;
		},
		//未回复的查看
		WJlookNoReStar(state){
			Vue.http.post('/yich/UserCheckNoAnswer',{examId:state.temId},{emulateJSON:true}).then((response) => {
				// 响应成功回调
				window.checkErrorVue(response);
				if(response.data.exam){
					state.wenjName=response.data.exam.examName;
					state.examId=response.data.exam.examId;
					getNoReplyData(response.data.exam.qlist,"noreply");
				}
			},(response) => {
				// 响应错误回调
				console.log("error");
			});
		},
		//已回复
		WJlookHadReStar(state){
			Vue.http.post('/yich/UserCheckAnswer',{temId:state.temId},{emulateJSON:true}).then((response) => {
				// 响应成功回调
				window.checkErrorVue(response);
				if(response.data.exam){
					state.wenjName=response.data.exam.examName;
					state.examId=response.data.exam.examId;
					getNoReplyData(response.data.exam.qlist,"hadreply");
				}
			},(response) => {
				// 响应错误回调
				console.log("error");
			});
		},
		//回复
		wjHFAjax(state){
			Vue.http.post('/yich/UserAnswerExam',{answer:state.finalData}).then((response) => {
				// 响应成功回调
				window.checkErrorVue(response);
				var json = eval('(' + response.data + ')'); 
				if(json.result == 1){
					state.isBtnTish = true;
					setTimeout(function(){
						state.isBtnTish = false;
						window.location.href="/yich/User/User_question_main.html";
					},2000)
					
				}
			},(response) => {
				// 响应错误回调
				console.log("error");
			});
		}
}

const actions={
		WJlookNoReStar(context){
			context.commit("WJlookNoReStar");
		},
		WJlookHadReStar(context){
			context.commit("WJlookHadReStar");
		},
		wjHFAjax(context){
			context.commit("wjHFAjax");
		},
	}
export default new Vuex.Store({
	state,
	mutations,
	actions
 })
//未回复
function getNoReplyData(data,hfSta){
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
		if(data[i].isAnswer == "1"){
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