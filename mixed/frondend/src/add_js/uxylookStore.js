/*
 *  仓储-查看协议
 */
import Vue from 'vue'
import Vuex from 'vuex'
import v from './aliyunPublic'
Vue.use(Vuex)

const state={
	xyData:'',//协议草稿数据
	titleName:'',//查看导航名称
	xybjTitle:'',//小标题内容
	xybjSta:'none',//小标记是否显示（none&block）
	xyDownloadSta:false,//下载按钮是否显示
	signSta:false,//签署按钮显隐
	isRuleShow:false,//规则motai显隐
	isHandLookShow:false,//可操作查看页面按钮显隐
	isResonShow:true,//作废理由是否显示
	
	applyShow:false,//申请作废模态框显隐
	isWhoApply:false,//申请作废模态框（true申请作作废&false拒绝作废）
	
	tel:'',//商户电话
	isYZmotaishow:false,//验证码
	yzTishi:'验证码不正确！',
	Ttishi:false,//获取验证码提示
	hcode:'',//验证码
	YANZSTA:'send',//是哪个验证模块（send：发送协议验证 & apply：申请作废验证 & agree：同意作废验证）
	agId:window.location.href.split("agId=")[1].split("&")[0],
	supShopId:window.location.href.split("supShopId=")[1].split("&")[0],
	userId:window.location.href.split("userId=")[1].split("&")[0],
	option:window.location.href.split("option=")[1].split("&")[0],//判断父级页面状态
	Furl:window.location.href.split("url=")[1].split("&")[0],//父级页面链接
}
const mutations={
	
	//草稿查看
	lookCGAjax(state){
		Vue.http.post('/yich/SeeDraftServlet',{agId:state.agId},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			setTitleName();
			if(response.data){
				state.xyData = response.data;
			}
			
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
	//商户待签署查看
	userWaitLook(state){
		Vue.http.post('/yich/BusinessSeeAgreementServlet',{option:state.option,agId:state.agId,supShopId:state.supShopId},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			setTitleName();
			if(response.data){
				if(!response.data.res && response.data.agree){
					setData(response.data.agree);
					state.tel = response.data.bTel;
				}else{
					alert("协议被篡改！！！");
					window.location.href="/yich/User/"+state.Furl+".html?option="+state.option;
				}
			}
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
	//获取验证码
	sendXYStarAjax(state){
		Vue.http.post('/yich/SetAgTelCodeServlet',{agId:state.agId},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			 if(response.data.result){
				 var str = response.data.result.split('-')[0];
				 if(str != "1"){
						alert("验证失败！！！");
					}
			 }
			
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
	//验证验证码CheckAgTelCodeServlet
	setCodeAjax(state){
		Vue.http.post('/yich/CheckAgTelCodeServlet',{agId:state.agId,hcode:state.hcode},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			if(response.data.res == '1'){
				state.Ttishi = false;
				state.isYZmotaishow=false;
			}else{
				state.Ttishi = true;
				state.yzTishi = '验证码不正确！';
			}
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
	//(同意签署)
	agreeAjax(state){
		Vue.http.post('/yich/ChangeAgreementStateServlet',{agId:state.agId,state:"S"},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			if(response.data.res == 1){
				window.location.href = "/yich/User/User_agreement_main.html";
			}else{
				alert("签署失败！")
			}
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
	//同意作废
	agreeSetCodeAjax(state){
		Vue.http.post('/yich/VoidCodeServlet',{agId:state.agId,state:"IS"},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			if(response.data.res == 1){
				window.location.href = "/yich/User/User_agreement_main.html?option=Success";
			}else{
				alert("同意作废失败！")
			}
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
	//拒绝签署
	refuseAjax(state){
		Vue.http.post('/yich/ChangeAgreementStateServlet',{agId:state.agId,state:"R"},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			if(response.data.res == 1){
				window.location.href = "/yich/User/User_agreement_main.html";
			}else {
				alert('拒绝签署失败！！');
			}
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
	//拒绝作废
	applySureAjax(state){
		Vue.http.post('/yich/VoidCodeServlet',{agId:state.agId,state:"BR"},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			if(response.data.res == 1){
				window.location.href = "/yich/User/User_agreement_main.html?option=Success";
			}else {
				alert('拒绝失败！！');
			}
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
	//下载文件
	fileDownload(state){
		/*var url = 'Agreement/20170223102231100078/100022.pdf';
		v.download(url);*/
		Vue.http.post('/yich/DownloadAgreementServlet',{agId:state.agId},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			v.download(response.data.url);
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
}
const actions={
	//草稿-查看
	lookCGAjax(context){
		context.commit("lookCGAjax");
	},
	//商户待签署查看
	userWaitLook(context){
		context.commit("userWaitLook");
	},
	handLookAjax(context){
		context.commit("userWaitLook");
	},
	//获取验证码
	sendXYStarAjax(context){
			context.commit("sendXYStarAjax");
	},
	//验证验证证码
	setCodeAjax(context){
			context.commit("setCodeAjax");
	},
	//同意签署
	agreeAjax(context){
		context.commit("agreeAjax");
	},
	//同意作废
	agreeSetCodeAjax(context){
		context.commit("agreeSetCodeAjax");
	},
	//拒绝签署
	refuseAjax(context){
		context.commit("refuseAjax");
	},
	//拒绝作废
	applySureAjax(context){
		context.commit("applySureAjax");
	},
	//下载文件
	fileDownload(context){
		context.commit("fileDownload");
	},
	
	
	
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
})

function setTitleName(){
	var name = window.location.href.split("title=")[1].split("&")[0];
	var bjsta = window.location.href.split("tsbtn=")[1].split("&")[0];
	if(name == "uxydqs002"){
		state.titleName = "待签署";
	}else if(name == "uxyyqs003"){
		state.titleName = "已签署";
	}else if(name == "uxyysx004"){
		state.titleName = "已失效";
	}
	
	if(bjsta == "none"){
		state.xybjSta = false;
	}else if(bjsta == "block"){
		state.xybjSta = true;
		if(name == "uxydqs002"){
			state.xybjTitle = "待您签署！";
			state.signSta = true; // 签署按钮显示&隐藏
			state.xyDownloadSta = false;
		}else if(name == "uxyyqs003"){
			state.xybjTitle = "您已签署！";
			state.signSta = false;
			state.xyDownloadSta = true;
		}else if(name == "uxyysx004"){
			state.xybjTitle = "已失效！";
			state.signSta = false;
			state.xyDownloadSta = false;
		}
	}
}
function setData(data){
	var json = {Jname:'',Jcard:'',Yname:'',Ycard:'',xyTitle:'',xyCon:'',xyReasonTitle:'',xyReasonH:'',xyRefuseH:'', xyReason:'',xyRefuseTime:''}
	json.Jname = data.first_party_name;
	json.Jcard = data.first_party_id;
	json.Yname = data.second_party_name;
	json.Ycard = data.second_party_id;
	json.xyTitle = data.agName;
	json.xyCon = data.agreementContent;
	if(data.state == "BI"){
		json.xyReasonTitle = "已申请作废！等待对方处理！";
		json.xyReasonH = "申请作废理由";
		json.xyRefuseH = "申请作废时间";
		state.isHandLookShow = false;
	}else if(data.state == "SI"){
		json.xyReasonTitle = "供货商申请作废，是否同意作废？";
		json.xyReasonH = "申请作废理由";
		json.xyRefuseH = "申请作废时间";
		state.isHandLookShow = true;
	}else if(data.state == "IS"){
		json.xyReasonTitle = "供货商申请作废!";
		json.xyReasonH = "作废理由";
		json.xyRefuseH = "作废时间";
		state.isHandLookShow = false;
	}else if(data.state == "IB"){
		json.xyReasonTitle = "您已申请作废!";
		json.xyReasonH = "作废理由";
		json.xyRefuseH = "作废时间";
		state.isHandLookShow = false;
	}else if(data.state == "SR"){
		json.xyReasonTitle = "供货商拒绝作废该协议！";
		state.isResonShow = false;
		state.isHandLookShow = false;
	}else if(data.state == "BR"){
		json.xyReasonTitle = "您已拒绝作废该协议！";
		state.isResonShow = false;
		state.isHandLookShow = false;
	}else if(data.state == "R"){
		json.xyReasonTitle = "您已拒绝签署该协议！";
		state.isResonShow = false;
		state.isHandLookShow = false;
	}
	if(data.reason){
		json.xyReason = data.reason;
	}else if(data.state == "R" && !data.reason){
		json.xyReason = "个人！！！";
	}
	if(data.state == "I"){
		json.xyRefuseTime = data.cancelTime;
	}else{
		json.xyRefuseTime = data.applyCancelTime;
	}
	
	state.xyData = json;
}