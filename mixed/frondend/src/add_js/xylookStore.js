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
	//仓储待签署查看
	userWaitLook(state){
		Vue.http.post('/yich/SeeAgreementServlet',{option:state.option,agId:state.agId,supShopId:state.supShopId,userId:state.userId},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			setTitleName();
			if(response.data){
				if(!response.data.res && response.data.agree){
					setData(response.data.agree);
					state.tel = response.data.tel;
				}else{
					alert("协议被篡改！！！");
					window.location.href="/yich/Storage/"+state.Furl+".html?option="+state.option;
				}
			}
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
	//同意作废
	agreeSetCodeAjax(state){
		Vue.http.post('/yich/VoidCodeServlet',{agId:state.agId,state:"IB"},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			if(response.data.res == 1){
				window.location.href = "/yich/Storage/Storage_agreement_main.html?option=Success";
			}else{
				alert('作废失败！');
			}
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
	//拒绝作废
	applySureAjax(state){
		Vue.http.post('/yich/VoidCodeServlet',{agId:state.agId,state:"SR"},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			if(response.data.res == 1){
				window.location.href = "/yich/Storage/Storage_agreement_main.html?option=Success";
			}else {
				alert('拒绝失败！');
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
	//下载文件
	fileDownload(state){
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
	
	//仓储待签署查看
	userWaitLook(context){
		context.commit("userWaitLook");
	},
	handLookAjax(context){
		context.commit("userWaitLook");
	},
	//验证身份
	sendXYStarAjax(context){
		context.commit("sendXYStarAjax");
	},
	//同意作废
	agreeSetCodeAjax(context){
		context.commit("agreeSetCodeAjax");
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
	if(name == "xydqs002"){
		state.titleName = "待签署";
	}else if(name == "xyyqs003"){
		state.titleName = "已签署";
	}else if(name == "xyysx004"){
		state.titleName = "已失效";
	}
	
	if(bjsta == "none"){
		state.xybjSta = false;
	}else if(bjsta == "block"){
		state.xybjSta = true;
		if(name == "xydqs002"){
			state.xybjTitle = "等待采购商签署！";
			state.xyDownloadSta = false;
		}else if(name == "xyyqs003"){
			state.xybjTitle = "采购商已签署！";
			state.xyDownloadSta = true;
		}else if(name == "xyysx004"){
			state.xybjTitle = "已失效！";
			state.xyDownloadSta = false;
		}
	}
}
function setData(data){
	var json = {Jname:'',Jcard:'',Yname:'',Ycard:'',xyTitle:'',xyCon:'',xyReasonTitle:'',xyReasonH:'',xyRefuseH:'',xyReason:'',xyRefuseTime:''}
	json.Jname = data.first_party_name;
	json.Jcard = data.first_party_id;
	json.Yname = data.second_party_name;
	json.Ycard = data.second_party_id;
	json.xyTitle = data.agName;
	json.xyCon = data.agreementContent;
	if(data.state == "SI"){
		json.xyReasonTitle = "已申请作废！等待对方处理！";
		json.xyReasonH = "申请作废理由";
		json.xyRefuseH = "申请作废时间";
		state.isHandLookShow = false;
	}else if(data.state == "BI"){
		json.xyReasonTitle = "采购商申请作废，是否同意作废？";
		json.xyReasonH = "申请作废理由";
		json.xyRefuseH = "申请作废时间";
		state.isHandLookShow = true;
	}else if(data.state == "IS"){
		json.xyReasonTitle = "您已申请作废！";
		json.xyReasonH = "作废理由";
		json.xyRefuseH = "作废时间";
		state.isHandLookShow = false;
	}else if(data.state == "IB"){
		json.xyReasonTitle = "采购商申请作废！";
		json.xyReasonH = "作废理由";
		json.xyRefuseH = "作废时间";
		state.isHandLookShow = false;
	}else if(data.state == "SR"){
		json.xyReasonTitle = "您已拒绝作废该协议！";
		state.isResonShow = false;
		state.isHandLookShow = false;
	}else if(data.state == "BR"){
		json.xyReasonTitle = "采购商拒绝作废该协议！";
		state.isResonShow = false;
		state.isHandLookShow = false;
	}else if(data.state == "R"){
		json.xyReasonTitle = "采购商拒绝签署协议！";
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