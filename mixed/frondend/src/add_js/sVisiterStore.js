/*仓储-访客分析*/
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
		allData:[],
		fkData:[],
		fkDataList:[],
		
		sortStaH:'bs',//排序
		nextBtnSta:false,//下一步按钮的状态
		isBtnShow:true,
		isSendOk:false,//发送成功
		fkListSta:false,//发送问卷访客列表模态(显/隐)
		wjListSta:false,//发送问卷列表模态(显/隐)
		allDataNum:0,
		carDataNum:0,
		finalName:[],
		wenjId:'',
		yxTime:'7',
		option:"1",
		
		fksename:'',
		hadCheck:[],//已选择id
		hadCarData:[],//已选择数据
		sinAllCheck:[],//单页选择id
		sinCarData:[],//单页选择数据
		ischeckAllHad:true,//判断是全部还是已选择
		
		showFeny:false,//是否显示分页
		page:1, //页码
		zonPage:1,//motai总页码数
		szonPage:1,//总页码数
		
		name:'',
		//firstData:true,
		selected:'2',//1:9条数据,2:15条数据
		
		mupdate:false,//监听分页事件
		wechatList:[],
		tabOption:'pcVisiter',
}
const mutations = {
		page(state,obj){//页码
			state.page=obj.page;
		},
		starAJax(state){
			Vue.http.post("/yich/VisitorRecordServlet",{what:state.sortStaH,page:state.page,name:state.fksename,option:state.selected}).then((response)=>{
				window.checkErrorVue(response);
					if(state.fkListSta){
						if(response.data.pages<1){
							state.showFeny = false;
							state.zonPage = 1;
						}else{
							state.showFeny = true;
							state.zonPage = response.data.pages;
						};
					}else{
						if(response.data.pages<1){
							state.showFeny = false;
							state.szonPage = 1;
						}else{
							//state.showFeny = true;
							state.szonPage = response.data.pages;
							setTimeout(function(){
								state.showFeny = true;
							},0);
						};
					}
					
					if(response.data.list){
						state.allDataNum = response.data.list.length;
						fkData(response.data.list,"fk");
					}
			},(error) => {
			})
		},
		//问卷模板
		wenjModelStar(state){
			Vue.http.post("/yich/VisitorQuestionnaireListServlet",{emulateJSON:true}).then((response)=>{
				window.checkErrorVue(response);
				if(response.data.list){
					state.allData = response.data.list;
				}
			},(error) => {
				console.log("err");
			})
		},
		//最终发送问卷
		sendWjToPerson(state){
			var finalName = [];
			var finalid = [];
			state.ischeckAllHad ? finalName=getFinalName(state.sinCarData) : finalName=getFinalName(state.hadCarData);
			state.ischeckAllHad ? finalid=state.sinAllCheck : finalid=state.hadCheck;
			var people=finalName.length+"";
			
			Vue.http.post('/yich/sendExam',{temId:state.wenjId,option:state.option,people:people,name:finalName,userIds:finalid,time:state.yxTime}).then((response) => {
		 		window.checkErrorVue(response);
					if(response.data.result != 0){
						state.isBtnShow = false;
						state.isSendOk = true;
						setTimeout(function(){
							window.location.reload();
						},3000)
					}
			}, (response) => {
	    		console.log('error');
	    	});
		},
}
const actions={
		starAJax(context){
			if(context.state.tabOption=="pcVisiter"){
				context.commit("starAJax");
			}else if(context.state.tabOption=="wechatFollow"){
				Vue.http.post("/yich/WeChatFocus?page="+state.page).then((response)=>{
					window.checkErrorVue(response);
					context.state.wechatList = response.data.listSubscriptionNumber;
					context.state.szonPage = response.data.totalPages;
					context.state.showFeny = false;
					setTimeout(function(){
						context.state.showFeny = true;
					},0);
				},(error) => {
				})
			}
		},
		sendWjStar(context){
			context.commit("starAJax");
		},
		wenjModelStar(context){
			context.commit("wenjModelStar");
		},
		sendWjToPerson(context){
			context.commit("sendWjToPerson");
		},
		Ajax(context){
			if(context.state.tabOption=="pcVisiter"){
				context.commit("starAJax");
			}else if(context.state.tabOption=="wechatFollow"){
				Vue.http.post("/yich/WeChatFocus?page="+state.page).then((response)=>{
					window.checkErrorVue(response);
					context.state.wechatList = response.data.listSubscriptionNumber;
					context.state.szonPage = response.data.totalPages;
					/*context.state.showFeny = false;
					setTimeout(function(){
						context.state.showFeny = true;
					},0);*/
				},(error) => {
				})
			}
		},
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
})
//访客数据
function fkData(data,pro){
	var list = [];
	for(var i in data){
		var json = {id:'',name:'',dengj:'C',dengjX:1,llNum:'0',clNum:'0',xcNum:'0',xdNum:'0',isSc:'否',ishz:'N',wangwang:'',userId:''};
		json.name = data[i].business?data[i].business.name:'';
		if(data[i].business && data[i].business.lv){
			json.dengj = data[i].business.lv.split("-")[0];
			json.dengjX = parseInt(data[i].business.lv.split("-")[1]);
		}
		json.llNum = data[i].bs;
		json.clNum = data[i].rs;
		json.xcNum = data[i].ds;
		json.xdNum = data[i].os;
		json.isSc = data[i].collection=="1" ? "是" : "否";
		if(data[i].coop){
			if(data[i].coop.black == 'N'){
				if(data[i].coop.coopStatus){
					json.ishz = data[i].coop.coopStatus;
				}
			}else{
				json.ishz = "黑名单";
			}
		}
		if(data[i].business && data[i].business.wangwang){
			json.wangwang = data[i].business.wangwang;
		}
		if(data[i].business && data[i].business.user_id){
			json.id = data[i].business.user_id;
			json.userId = data[i].business.user_id;
		}
		
		list.push(json);
	}
	//state.fkData = list;
	if(state.fkListSta){
		state.fkData = list;
	}else{
		state.fkDataList = list;
	}
	state.mupdate = !state.mupdate;
}

//下一步时传的数据name
function getFinalName(name){
	var nn=[];
	for(var i in name){
		nn.push(name[i].name)
	}
	return nn;
}