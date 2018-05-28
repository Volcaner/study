/*
 * 仓储-协议
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	xydraft:'',//协议草稿数据
	starData:'',//初始数据
	cellSta:'Wait',//协议模块
	tel:'',//电话
	yzTishi:'验证码不正确！',
	yzmesNun:'',//验证短信次数上限20次
	Ttishi:false,//获取验证码提示
	
	hcode:'',//验证码
	shoplist:'',//模态框采购商list
	isYZmotaishow:false,//验证码
	YANZSTA:'send',//是哪个验证模块（send：发送协议验证 & apply：申请作废验证）
	ismotaishow:false,
	userId:'',//商户id
	xyId:'',//协议草稿id
	agId:'',//协议id
	who:'B',//仓储
	
	whoDelete:'',//(协议草稿&失效)删除
	xydelShow:false,//删除页面的模态
	isSendOk:false,//显示发送状态页面
	applyShow:false,//申请作废模态框显隐
	isWhoApply:false,//申请作废模态框（true申请作作废&false拒绝作废）
	isapply:false,//已签署显示申请作废还是撤销作废
	applyResuleCon:'',//申请作废理由
	applySta:'SI',//申请作废状态
	
}
const mutations={
	
	//草稿初始ajax
	starCGAjax(state){
		Vue.http.post('/yich/AgreementDraftServlet').then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			if(response.data.agreementList.length>0){
				state.xydraft = response.data.agreementList;
				state.tel = response.data.tel;
			}
			
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
	//协议草稿删除
	dreaftDelAjax(state){
		Vue.http.post('/yich/DeleteDraftServlet',{agdId:state.xyId},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			if(response.data.res == 1){
				window.location.href='/yich/Storage/Storage_agreement_main.html?option=Draft';
			}
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
	//已失效删除
	lapDelAjax(state){
		Vue.http.post('/yich/DeleteAgreementServlet',{agId:state.agId,who:state.who},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			if(response.data.res == 1){
				window.location.href="/yich/Storage/Storage_agreement_main.html?option=invali";
			}else{
				alert("删除失败！");
			}
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
	//草稿发送协议ajax(验证身份)获取验证码
	sendXYStarAjax(state){
		Vue.http.post('/yich/SetAgdTelCodeServlet',{agdId:state.xyId},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			if(response.data.result){
				var num1 = response.data.result.split('-')[0]?response.data.result.split('-')[0]:0;
				var num2 = response.data.result.split('-')[1]?response.data.result.split('-')[1]:0;
				if(num1 !=1){
					alert('短信发送失败！')
				}else{
					state.yzmesNun = num2?"今日已用短信次数:"+num2+"次(上限20次)":"";
				}
				
			}
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
	sendApplyStarAjax(state){
		Vue.http.post('/yich/SetAgTelCodeServlet',{agId:state.agId},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			if(response.data.result != "1"){
				alert("验证失败！！！");
			}
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
	setCodeAjax(state){
		Vue.http.post('/yich/CheckAgdTelCodeServlet',{agdId:state.xyId,hcode:state.hcode},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			if(response.data.res == 1){
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
	setApplyCodeAjax(state){
		Vue.http.post('/yich/CheckAgTelCodeServlet',{agId:state.agId,hcode:state.hcode},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			if(response.data.res == '1'){
				state.Ttishi = false;
				state.isYZmotaishow=false;
				//window.location.href="/yich/Storage/Storage_agreement_main.html?option=Success";
			}else{
				state.Ttishi = true;
				state.yzTishi = '验证码不正确！';
			}
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
	/*申请作废订单提交*/
	applyTiJiaoAjax(state){
		Vue.http.post('/yich/VoidCodeServlet',{agId:state.agId,reason:state.applyResuleCon,state:state.applySta},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			if(response.data.res == '1'){
				state.applyShow = false;
				window.location.href="/yich/Storage/Storage_agreement_main.html?option=Success";
			}else{
				alert('申请失败请重新操作！')
			}
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
	sendXYAjax(state){
		if(state.userId !='' && state.xyId !=''){
			Vue.http.post('/yich/SetAgreementServlet',{agdId:state.xyId,userId:state.userId},{emulateJSON:true}).then((response) => {
				// 响应成功回调
				 window.checkErrorVue(response);
				if(response.data.res == 1){
					 state.isSendOk = true;
				}
				setTimeout(function(){
					state.ismotaishow = false;
					window.location.reload();
				},2000);
				
			},(response) => {
				// 响应错误回调
				console.log("error");
			});
		}else{
			alert("发送失败！！！");
		}
		
	},
	//get发送协议采购商数据
	getSendXYData(state){
		Vue.http.post('/yich/GetCooperativeServlet',{agdId:state.xyId,userId:state.userId},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			 state.shoplist = response.data.map1;
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	
	},
	//待签署&已签署&已失效
	waitStarAjax(state){
		Vue.http.post('/yich/AgreementServlet',{state:state.cellSta},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			state.tel = response.data.tel;
			if(response.data.agreementList){
				var data = response.data.agreementList;
				//待签署
				if(state.cellSta == "Wait"){
					setWaitData(data);
				}else if(state.cellSta == "Success"){
					setSuccessData(data);
				}else if(state.cellSta == "invali"){
					setInvaliData(data);
				}else{
					state.starData = '';
				}
			}
			
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},

}
const actions={
	//草稿
	starCGAjax(context){
		context.commit("starCGAjax");
	},
	
	//发送协议（验证身份）
	sendXYStarAjax(context){
		if(state.YANZSTA == "send"){
			context.commit("sendXYStarAjax");
		}else if(state.YANZSTA == "apply"){
			context.commit("sendApplyStarAjax");
		}
	},
	//验证验证码
	setCodeAjax(context){
		if(state.YANZSTA == "send"){
			context.commit("setCodeAjax");
		}else if(state.YANZSTA == "apply"){
			context.commit("setApplyCodeAjax");
		}
		
	},
	//发送协议
	sendXYAjax(context){
		context.commit("sendXYAjax");
	},
	getSendXYData(context){
		context.commit("getSendXYData");
	},
	//待签署
	waitStarAjax(context){
		context.commit("waitStarAjax");
	},
	//已签署
	hadStarAjax(context){
		context.commit("waitStarAjax");
	},
	/*申请作废订单提交*/
	applyTiJiaoAjax(context){
		context.commit("applyTiJiaoAjax");
	},
	
	//已失效
	lapStarAjax(context){
		context.commit("waitStarAjax");
	},
	//失效删除
	/*lapDelAjax(context){
		context.commit("lapDelAjax");
	},*/
	//删除协议
	deleltXYAjax(context){
		if(state.whoDelete == "draft"){
			context.commit("dreaftDelAjax");
		}else if(state.whoDelete == "lapsed"){
			context.commit("lapDelAjax");
		}
		
	},
	
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
})
//待签署
function setWaitData(data){
	var list = [];
	if(data.length>0){
		for(var i in data){
			var json = {xyName:"",xyNum:"",xyTime:'',xySta:'',supName:'',supShopId:'',userId:'',xyStarSta:''};
			json.xyName = data[i].agName;
			json.xyNum = data[i].agId;
			json.xyTime = data[i].lastEditTime;
			if(data[i].state == "N" || data[i].state == "W"){
				json.xySta = "待查看";
			}else if(data[i].state == "A"){
				json.xySta = "已查看";
			}
			json.xyStarSta = data[i].state; //协议状态（未变话）
			json.supName = data[i].business.name;
			json.supShopId = data[i].supshopId;
			json.userId = data[i].userId;
			
			list.push(json);
		}
	}
	
	
		state.starData = list;

	
};
//已签署
function setSuccessData(data){
	var list = [];
	if(data.length>0){
		for(var i in data){
			var json = {xyName:"",xyNum:"",xyTime:'',xySta:'',handSta:'',supName:'',supShopId:'',userId:'',xyStarSta:'',ishandCell:false};
			json.xyName = data[i].agName;
			json.xyNum = data[i].agId;
			json.xyTime = data[i].signTime;
			if(data[i].state == "S"){
				json.xySta = "已签署";
				json.handSta = "申请作废";
				json.ishandCell = false;
			}else if(data[i].state == "SI"){
				json.xySta = "申请作废中";
				json.handSta = "";
				json.ishandCell = false;
			}else if(data[i].state == "BI"){
				json.xySta = "对方申请作废";
				json.ishandCell = true;
			}else if(data[i].state == "SR"){
				json.xySta = "您已拒绝作废该协议";
				json.handSta = "申请作废";
				json.ishandCell = false;
			}else if(data[i].state == "BR"){
				json.xySta = "该协议已被拒绝作废";
				json.handSta = "申请作废";
				json.ishandCell = false;
			}
			json.xyStarSta = data[i].state;//协议状态（未变话）
			json.supName = data[i].business.name;
			json.supShopId = data[i].supshopId;
			json.userId = data[i].userId;
			
			list.push(json);
		}
	}
	
		state.starData = list;
	
}
//已失效
function setInvaliData(data){
	var list = [];
	if(data.length>0){
		for(var i in data){
			var json = {xyName:"",xyNum:"",xyTime:'',xyInTime:'',xySta:'',supName:'',supShopId:'',userId:'',xyStarSta:''};
			json.xyName = data[i].agName;
			json.xyNum = data[i].agId;
			json.xyTime = data[i].signTime;
			json.xyInTime = data[i].cancelTime;
			if(data[i].state == "R"){
				json.xySta = "已拒绝签署";
			}else if(data[i].state == "I"){
				json.xySta = "已作废";
			}
			json.xyStarSta = data[i].state;//协议状态（未变话）
			json.supName = data[i].business.name;
			json.supShopId = data[i].supshopId;
			json.userId = data[i].userId;
			
			list.push(json);
		}
	}
	
		state.starData = list;
	
}