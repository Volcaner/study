/*
 * 商户-协议
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	xySta:'',//协议状态
	starData:'',//初始数据
	cellSta:'Wait',//协议模块
	tel:'',//电话
	yzTishi:'验证码不正确！',
	Ttishi:false,//获取验证码提示
	
	hcode:'',//验证码
	shoplist:'',//模态框采购商list
	isYZmotaishow:false,//验证码
	YANZSTA:'send',//是哪个验证模块（send：发送协议验证 & apply：申请作废验证）
	ismotaishow:false,
	userId:'',//商户id
	xyId:'',//协议id
	agId:'',
	who:'b',//商户
	
	xydelShow:false,//删除页面的模态
	isSendOk:false,//显示发送状态页面
	applyShow:false,//申请作废模态框显隐
	isWhoApply:false,//申请作废模态框（true申请作作废&false拒绝作废）
	isapply:false,//已签署显示申请作废还是撤销作废
	applyResuleCon:'',//申请作废理由
	applySta:'SI',//申请作废状态
	
	
	
}
const mutations={
	
	//初始ajax
	starCGAjax(state){
		Vue.http.post('/yich/BusinessAgreementServlet',{state:state.cellSta},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			state.tel = response.data.tel;
			if(response.data.agreementList){
				var data = response.data.agreementList;
				if(state.cellSta == "Wait"){
					setWaitData(data);
				}else if(state.cellSta == "Success"){
					setSuccessData(data);
				}else if(state.cellSta == "invali"){
					setInvaliData(data);
				}
				
				
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
				window.location.href="/yich/User/User_agreement_main.html?option=invali";
			}else{
				alert("删除失败！");
			}
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
	//已签署申请作废（发送验证码）
	sendXYStarAjax(state){
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
	//验证验证码
	setApplyCodeAjax(state){
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
	/*申请作废订单提交*/
	applyTiJiaoAjax(state){
		Vue.http.post('/yich/VoidCodeServlet',{agId:state.agId,reason:state.applyResuleCon,state:state.applySta},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			if(response.data.res == '1'){
				state.applyShow = false;
				window.location.href="/yich/User/User_agreement_main.html?option=Success";
			}else{
				alert('申请失败请重新操作！')
			}
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},

}
const actions={
	//待签署
	waitStarAjax(context){
		context.commit("starCGAjax");
	},
	//已签署
	hadStarAjax(context){
		context.commit("starCGAjax");
	},
	//失效
	lapStarAjax(context){
		context.commit("starCGAjax");
	},
	applyTiJiaoAjax(context){
		context.commit("applyTiJiaoAjax");
	},
	//发送协议（验证身份）
	sendXYStarAjax(context){
		context.commit("sendXYStarAjax");
	},
	//验证验证码
	setCodeAjax(context){
		context.commit("setApplyCodeAjax");
	},
	//删除协议
	deleltXYAjax(context){
		context.commit("lapDelAjax");
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
	for(var i in data){
		var json = {xyName:"",xyNum:"",xyTime:'',xySta:'',supName:'',supShopId:'',userId:'',xyStarSta:''};
		json.xyName = data[i].agName;
		json.xyNum = data[i].agId;
		json.xyTime = data[i].initiateTime;
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
		state.starData = list;
	
};
//已签署
function setSuccessData(data){
	var list = [];
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
			json.xySta = "对方申请作废";
			json.ishandCell = true;
		}else if(data[i].state == "BI"){
			json.handSta = "";
			json.xySta = "申请作废中";
			json.ishandCell = false;
		}else if(data[i].state == "SR"){
			json.xySta = "该协议已被拒绝作废";
			json.handSta = "申请作废";
			json.ishandCell = false;
		}else if(data[i].state == "BR"){
			json.xySta = "您已拒绝作废该协议";
			json.handSta = "申请作废";
			json.ishandCell = false;
		}
		json.xyStarSta = data[i].state;//协议状态（未变话）
		json.supName = data[i].business.name;
		json.supShopId = data[i].supshopId;
		json.userId = data[i].userId;
		list.push(json);
	}
		state.starData = list;
}
//已失效
function setInvaliData(data){
	var list = [];
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
		state.starData = list;
}