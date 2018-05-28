/*
 * 合作供货商
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	searchCon:'', //查询
	isStopMotai:false,//终止合作模态框
	sureMoytai:true,//模态框显示按钮
	motaiTitle:'',//模态框显示标题
	motaiText:'',//模态框显示内容
	isHavelist:false, //是否有数据
	disSta:false, //打分模态框显示状态
	disabled:false,//打分滑块禁止滑动
	orderSta:'tra_money',//状态排序
	stopCoopid:'',//终止合作参数
	coopId:'',//打分coopId
	supShopId:'',//打分supid
	stopUserId:'',//终止合作参数
	stopSupshopId:'',//终止合作参数
	condatalist:'',//数据list
	dafen:'',//打分数据list
	dafenData:'',//查看的打分
	/*pengfenNum:{jiag:0,pinz:0,jiaoh:0,fuw:0,xiny:0,peih:0,score:0},*/
	page:1, //页码
	zonPage:1,//总页码数
	showFeny:true, //是否显示分页
	FYAjaxSta:'',//分页请求地址的状态
	canblacklist:'',
}
const mutations={
	page(state,obj){//页码
		state.page=obj.page;
	},
	//初始ajax
	starAjax(state){
		Vue.http.post('/yich/cooper?order='+state.orderSta+'&option=U&page='+state.page).then((response) => {
			window.checkErrorVue(response);
				// 响应成功回调
			 window.checkErrorVue(response);
			 if(response.data.check){
				 if(response.data.totalpage<1){
						state.showFeny = false;
						state.zonPage = 1;
					}else{
						state.showFeny = true;
						state.zonPage = response.data.totalpage;
					};
					if(response.data.list !="null"){
						state.isHavelist = false;
						mylist(response.data.list);
						setdafen(response.data.list);
					}else{
						state.isHavelist = true;
						state.orderSta = '';
						state.condatalist = '';
					}
			 }else{
				 alert("输入不合法");
			 }
			}, (response) => {
				// 响应错误回调
		});
	},
	//查询ajax
	searchAjax(state){
		var myorder='';
		if(state.orderSta == ''){
			myorder = 'tra_money';
		}else{
			myorder = state.orderSta;
		}
		Vue.http.post('/yich/queryCooper?order='+myorder+'&option=U&page='+state.page,{name:state.searchCon},{emulateJSON:true}).then((response) => {
			window.checkErrorVue(response);
			// 响应成功回调
			 window.checkErrorVue(response);
			 if(response.data.check){
				 if(response.data.totalpage<1){
						state.showFeny = false;
						state.zonPage = 1;
					}else{
						state.showFeny = true;
						state.zonPage = response.data.totalpage;
					};
					if(response.data.list !="null"){
						state.isHavelist = false;
						mylist(response.data.list);
						setdafen(response.data.list);
					}else{
						state.isHavelist = false;
						state.orderSta = '';
						state.condatalist = '';
					}
			 }else{
				 alert("输入不合法"); 
			 }
			}, (response) => {
				// 响应错误回调
		});
		
	},
	//终止合作
	hzStop(state){
		Vue.http.post('/yich/handleApply?order='+state.orderSta+'&option=S&coopId='+state.stopCoopid+'&userId='+state.stopUserId+'&supShopId='+state.stopSupshopId,{emulateJSON:true}).then((response) => {
			window.checkErrorVue(response);
			// 响应成功回调
			 window.checkErrorVue(response);
			if(response.data.result == 0){
				alert("更新失败！");
			}else if(response.data.result >= 1){
				window.location.reload();
			}
			
			}, (response) => {
				// 响应错误回调
		});
	},
	//加入黑名单
	blackList(state){
		Vue.http.post('/yich/uhandApply?option=BL&order='+state.orderSta+'&coopId='+state.stopCoopid+'&userId='+state.stopUserId+'&supShopId='+state.stopSupshopId).then((response)=>{
			//success
			 window.checkErrorVue(response);
			if(response.data.result == -1){
				state.sureMoytai = false;
				state.motaiTitle = "很遗憾！不能进行该操作！";
				state.motaiText = "该采购商与您存在正在交易的订单！";
			}else if(response.data.result == 0){
				alert("更新失败！");
			}else if(response.data.result >= 1){
				window.location.reload();
			}
			
		},(response)=>{
			//error
		});
	},
	
}
const actions={
	starAjax(context){
		context.commit("starAjax");
	},
	//查询
	searchAjax(context){
		context.commit("searchAjax");
	},
	//终止合作ajax
	hzStop(context){
		context.commit("hzStop");
	},
	//加入黑名单
	blackList(context){
		context.commit("blackList");
	},
	//评分
	scoreChage(context){
		context.commit("scoreChage");
	},
	//分页-请求数据
	Ajax(context){
		if(state.FYAjaxSta == 'GHSearch'){
			context.commit("searchAjax");
		}else {
			context.commit("starAjax");
		}
	},
	
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
})
//合作供货商list数据
function mylist(data){
	var _list = [];
	for(var i in data){
		var json = {supName:'',supapply:'',supstar:'',ordernum:'',orderprice:'',supPf:'',coopId:'',userId:'',supShopId:'',wangwang:'',canblacklist:'',};
		json.supName = data[i].supName;
		json.supapply = data[i].applyTime;
		json.supstar = data[i].agreeTime;
		json.ordernum = data[i].traNum;
		json.orderprice = data[i].traMoney;
		json.supPf = data[i].score;
		json.coopId = data[i].coopId;
		json.userId = data[i].userId;
		json.supShopId = data[i].supshopId;
		json.canblacklist = data[i].canblacklist;
		if(data[i].business){
			if(data[i].business.wangwang){
				json.wangwang = data[i].business.wangwang;
			}
		}
		_list.push(json);
	};
	if(_list.length!=0){
		state.condatalist = _list;
	}
	
}
function setdafen(data){
	var dflist = [];
	for(var i in data){
		var fenshu = {priceTd:0,goodsTd:0,dateTd:0,serveTd:0,xinyuTd:0,peiheTd:0};
		fenshu.priceTd = parseInt(data[i].priceSatisfiedScore);
		fenshu.goodsTd = parseInt(data[i].qualitySatisfiedScore);
		fenshu.dateTd = parseInt(data[i].deliverySatisfiedScore);
		fenshu.serveTd = parseInt(data[i].serviceSatisfiedScore);
		fenshu.xinyuTd = parseInt(data[i].supplyCreditScore);
		fenshu.peiheTd = parseInt(data[i].supplierCoopScore);
		dflist.push(fenshu);
	}
	state.dafen = dflist;
	
}
