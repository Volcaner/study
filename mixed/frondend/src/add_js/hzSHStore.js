/*
 * 合作申请-审核申请
 * 注：链接中的page 需动态
 */

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	titleName:'合作申请',//黑名单title数据
	haveStarData:'',//审核申请数据
	listStarData:'',//审核记录数据
	searchSta:'ing',//查询状态{审核申请P&审核记录A}
	searchName:'',//查询名字
	sortStaA:'apply_time',//排序状态
	sortStaP:'apply_time',//排序状态
	coopId:'',
	supshopId:'',
	userId:'',
	hzHandleSta:'',//审核申请操作状态
	applySta:'ALL',//申请记录状态
	isStopMotai:false,
	motaiTitle:'',//模态框标题
	motaiText:'',//模态框内容
	FYAjaxSta:'SHSQ',//分页请求地址的状态
	showFeny:false,//是否显示分页
	page:1, //页码
	zonPage:1,//总页码数
	currentPage:0,
	sqListCount:0,
	jlListCount:0,
};
const mutations={
	page(state,obj){//页码
		state.page=obj.page;
	},
	//审核申请ajax
	haveStarAjax(state){
		Vue.http.post('/yich/sHandleCoop?page='+state.page+'&order='+state.sortStaP).then((response)=>{
			window.checkErrorVue(response);
			//success
			 window.checkErrorVue(response);
			 if(typeof (response.data.check)!='undefined' && response.data.check){
				 if(response.data.totalPage<1){
						state.showFeny = false;
						state.zonPage = 1;
					}else{
						state.showFeny = true;
						state.zonPage = response.data.totalPage;
					};
					if(response.data.list!='null'){
						state.sqListCount = response.data.list.length;
						haveData(response.data.list);
					}else{
						state.haveStarData='';
					};
			 }else if(typeof (response.data.check)!='undefined'){
				 alert("输入不合法");
			 }
		},(response)=>{
			//error
		});
	},
	//审核记录ajax & 排序
	listStarAjax(state){
		Vue.http.post('/yich/applyedAndHandleRecord?option=sup&status='+state.applySta+'&page='+state.page+'&order='+state.sortStaA).then((response)=>{
			//success
			 window.checkErrorVue(response);
			 if(typeof (response.data.check)!='undefined' && response.data.check){
				 if(response.data.totalpage<1){
						state.showFeny = false;
						state.zonPage = 1;
					}else{
						state.showFeny = true;
						state.zonPage = response.data.totalpage;
					};
					if(response.data.list!="null"){
						listData(response.data.list);
						state.jlListCount = response.data.list.length;
					}else{
						state.listStarData='';
					}
			 }else if(typeof (response.data.check)!='undefined'){
				 alert("输入不合法");
			 }
		},(response)=>{
			//error
		});
	},
	//查询
	searchAjax(state){
		Vue.http.post('/yich/queryCoop?option=S&page='+state.page+'&status='+state.searchSta+'&order='+state.sortStaA+'&name='+state.searchName).then((response)=>{
			//success
			 window.checkErrorVue(response);
			if(response.data.totalpage<1){
				state.showFeny = false;
				state.zonPage = 1;
			}else{
				state.showFeny = true;
				state.zonPage = response.data.totalpage;
			}
			if(response.data.list!="null"){
				if(state.searchSta == "ing"){
					
					haveData(response.data.list);
				}else{
			
					listData(response.data.list);
				}
				
			}else{
				state.haveStarData='';
				state.listStarData='';
			}
			
		},(response)=>{
			//error
		});
	},
	//删除记录
	deleAjax(state){
		Vue.http.post('/yich/deleteRecord?option=S&coopId='+state.coopId).then((response)=>{
			//success
			 window.checkErrorVue(response);
			if(response.data.result > 0){
				if(state.jlListCount ==1 && state.page>1){
			 		if(state.zonPage==1){
			 			state.showFeny=false;
			 		}else{
			 			state.currentPage = state.zonPage - 1;
			 			state.page = state.zonPage - 1;
			 			Vue.http.post('/yich/applyedAndHandleRecord?option=sup&status='+state.applySta+'&page='+state.page+'&order='+state.sortStaA).then((response)=>{
							window.checkErrorVue(response);
							//success
							if(typeof (response.data.check)!='undefined' && response.data.check){
								state.zonPage = response.data.totalpage;
								listData(response.data.list);
							}else if(typeof (response.data.check)!='undefined'){
								alert("输入不合法");
							}
							/*state.zonPage = response.data.totalpage;
							listData(response.data.list);*/
						},(response)=>{
							//error
						});
			 		}
			 	}else{
			 		Vue.http.post('/yich/applyedAndHandleRecord?option=sup&status='+state.applySta+'&page='+state.page+'&order='+state.sortStaA).then((response)=>{
						window.checkErrorVue(response);
						//success
						if(typeof (response.data.check)!='undefined' && response.data.check){
							state.zonPage = response.data.totalpage;
							listData(response.data.list);
						}else if(typeof (response.data.check)!='undefined'){
							alert("输入不合法");
						}
						/*state.zonPage = response.data.totalpage;
						listData(response.data.list);*/
					},(response)=>{
						//error
					});
			 	}
			}else{
				alert("删除失败！！")
			}
			
		},(response)=>{
			//error
		});
	},
	//加入黑名单
	HeZuoHandle(state){
		Vue.http.post('/yich/handleApply?option='+state.hzHandleSta+'&coopId='+state.coopId+'&userId='+state.userId+'&supShopId='+state.supshopId).then((response)=>{
			//success
			 window.checkErrorVue(response);
			if(response.data.result > 0){
				//window.location.reload();
				if(state.sqListCount ==1 && state.page>1){
			 		if(state.zonPage==1){
			 			state.showFeny=false;
			 		}else{
			 			state.currentPage = state.zonPage - 1;
			 			state.page = state.zonPage - 1;
			 			Vue.http.post('/yich/sHandleCoop?page='+state.page+'&order='+state.sortStaP).then((response)=>{
							window.checkErrorVue(response);
							//success
							if(typeof (response.data.check)!='undefined' && response.data.check){
								state.zonPage = response.data.totalPage;
								haveData(response.data.list);
							}else if(typeof (response.data.check)!='undefined'){
								alert("输入不合法");
							}
							
						},(response)=>{
							//error
						});
			 		}
			 	}else{
			 		Vue.http.post('/yich/sHandleCoop?page='+state.page+'&order='+state.sortStaP).then((response)=>{
						window.checkErrorVue(response);
						//success
						if(typeof (response.data.check)!='undefined' && response.data.check){
							state.zonPage = response.data.totalPage;
							haveData(response.data.list);
						}else if(typeof (response.data.check)!='undefined'){
							alert("输入不合法");
						}
						
					},(response)=>{
						//error
					});
			 	}
				state.isStopMotai = false;
			}else{
				alert("操作失败！！")
			}
			
		},(response)=>{
			//error
		});
	},
	
	
};
const actions={
	Ajax(context){
		if(state.FYAjaxSta == 'SHSQ'){
			context.commit("haveStarAjax");
		}else if(state.FYAjaxSta == 'SHJL'){
			context.commit("listStarAjax");
		}else if(state.FYAjaxSta == 'SHSearch'){
			context.commit("searchAjax");
		}
	},
	haveStarAjax(context){
		context.commit("haveStarAjax");
	},
	listStarAjax(context){
		context.commit("listStarAjax");
	},
	searchAjax(context){
		context.commit("searchAjax");
	},
	//删除记录
	deleAjax(context){
		context.commit("deleAjax");
	},
	HeZuoHandle(context){
		context.commit("HeZuoHandle");
	},
	
};
export default new Vuex.Store({
	state,
	mutations,
	actions,
})
//仓储合作申请-审核申请
function haveData(data){
	var list = [];
	if(data && data.length>0 && data != 'null'){
		for(var i in data){
			var json={name:'',dengj:'',dengjX:1,hzFrends:0,tkPercent:0,rzTime:0,aplyTime:0,aplyKinds:'',coopId:'',userId:'',supshopId:'',wangwang:''};
			json.name = data[i].shopName;
			json.hzFrends = data[i].business.coop_num;//合作伙伴
			if(data[i].retNum !=0 && data[i].traNum!=0){
				json.tkPercent =((data[i].retNum/data[i].traNum)*100).toFixed(2)+"%";
			}
			json.rzTime = (data[i].business.register_time).split(' ')[0];
			json.aplyTime = data[i].applyTime.split(" ")[0];
			json.coopId = data[i].coopId;
			json.userId = data[i].userId;
			json.supshopId = data[i].supshopId;
			json.dengj = data[i].business.level.split('-')[0];
			json.dengjX = parseInt(data[i].business.level.split('-')[1]);
			if(data[i].coopStatus == "AP"){
				json.aplyKinds = "重新申请";
			}else if(data[i].coopStatus == "P"){
				json.aplyKinds = "新的申请";
			}
			if(data[i].business){
				if(data[i].business.wangwang){
					json.wangwang = data[i].business.wangwang;
				}
			}
			list.push(json);
		}
	}else{
		state.showFeny=false;
	}
	state.haveStarData = list;
};
//仓储合作申请-审核记录
function listData(data){
	var list = [];
	if(data && data.length>0 && data != 'null'){
		for(var i in data){
			var json={name:'',applytime:'',shStatus:'',agreTime:'',coopId:'',userId:'',wangwang:''};
			json.name = data[i].shopName;
			json.applytime = data[i].applyTime;
			json.coopId = data[i].coopId;
			json.userId = data[i].userId;
			if(data[i].coopStatus == "A"){
				json.shStatus = "审核同意";
				json.agreTime = data[i].agreeTime;
			}else if(data[i].coopStatus == "D"){
				json.shStatus = "审核拒绝";
				json.agreTime = data[i].handTime;
			}
			if(data[i].business){
				if(data[i].business.wangwang){
					json.wangwang = data[i].business.wangwang;
				}
			}
			list.push(json);
		}
	}else{
		state.showFeny=false;
	}
	state.listStarData = list;
}