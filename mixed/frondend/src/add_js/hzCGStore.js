/*
 * 合作采购商
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	searchCon:'',//查询名字
	isHavelist:false, //是否有数据
	isStopMotai:false,//模态框显示状态
	motaiTitle:'',//模态框显示标题
	motaiText:'',//模态框显示内容
	sureMoytai:true,//判断模态框按钮是否显示
	orderSta:'tra_money',//状态排序
	isHavelist:false, //是否有数据
	stopCoopid:'',//终止合作参数&黑名单
	stopUserId:'',//终止合作参数&黑名单
	stopSupshopId:'',//终止合作参数&黑名单
	condatalist:'',//list数据
	page:1, //页码
	zonPage:1,//总页码数
	showFeny:true, //是否显示分页
	FYAjaxSta:'',//分页请求地址的状态
	canblacklist:'',
	mb_isShow:'',//合作商价格模板显隐
	isModalDisplay:false,//模态框是否显示
	groupDisplay:[],
	allCount:0,
	ungroupCount:0,
	groupedCount:0,
	groupedList:[],
	name:'',//组名
	storage_id:'',//组id
	groupingstate:2,//分组状态
	belongGroupState:true,
	firstTemplate:'请选择模板',
	templateCount:0,
	belongGroupName:'',
	user_id:'',
	movedstroageid:'',//移动之后的
	templatList:[],
	templateShow:false,
	menuList:[],
	dealGroup:false,
	isGrouped:false,
	checkid:[],
	blackStorageId:'',
}
const mutations={
	page(state,obj){//页码
		state.page=obj.page;
	},
	storageStartAjax(state){
		Vue.http.post('/yich/StoragegroupingServlet?order='+state.orderSta+'&page='+state.page+'&name='+state.name).then((response) => {
			window.checkErrorVue(response);
			// 响应成功回调
			if(response.data.list !="null"){
				state.isHavelist = false;
				state.showFeny = true;
				state.zonPage = response.data.totalpage;
				state.belongGroupState = true;
				mylist(response.data.list,'start');
			}else{
				state.showFeny = false;
				state.isHavelist = true;
				state.condatalist = '';
			}
		}, (response) => {
			// 响应错误回调
		});
	},
	groupAjax(state){
		Vue.http.post('/yich/QueryStoragegroupingServlet?order='+state.orderSta+'&page='+state.page+'&groupingstate='+state.groupingstate+'&stroage_id='+state.storage_id+'&name='+state.name).then((response) => {
			window.checkErrorVue(response);
			// 响应成功回调
			state.templateCount = 0;
			if(response.data.list !="null"){
				state.isHavelist = false;
				state.zonPage = response.data.totalpage;
				state.belongGroupState = true;
				state.showFeny = true;
				mylist(response.data.list);
			}else{
				state.showFeny = false;
				state.condatalist = '';
			}
			if(response.data.TemplatList){
				state.checkid = [];
				state.templatList = response.data.TemplatList;
				for(var i=0;i<response.data.TemplatList.length;i++){
					if(response.data.TemplatList[i].templategroupList.length>0){
						state.firstTemplate = response.data.TemplatList[i].template_name;
						break;
					}else{
						state.firstTemplate = "请选择模板";
					}
				}
				for(var j=0;j<response.data.TemplatList.length;j++){
					if(response.data.TemplatList[j].templategroupList.length>0){
						++state.templateCount;
						state.checkid.push(response.data.TemplatList[j].template_id);
					}
				}
			}
		}, (response) => {
			// 响应错误回调
		});
	},
	//终止合作
	hzStop(state){
		Vue.http.post('/yich/handleApply?order='+state.orderSta+'&option=S&coopId='+state.stopCoopid+'&stroage_id='+state.blackStorageId).then((response) => {
			window.checkErrorVue(response);
			// 响应成功回调
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
		Vue.http.post('/yich/handleApply?order='+state.orderSta+'&option=BL&coopId='+state.stopCoopid+'&stroage_id='+state.blackStorageId).then((response) => {
			window.checkErrorVue(response);
			// 响应成功回调
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
			
			}, (response) => {
				// 响应错误回调
		});
	},
	searchGroup(state){
		Vue.http.post('/yich/StoragegroupingListServlet?option=0').then((response) => {
			window.checkErrorVue(response);
			// 响应成功回调
			if(response.data){
				state.allCount = response.data.count;
				state.groupedCount = response.data.num;
				state.ungroupCount = response.data.count - response.data.num;
				state.groupedList = response.data.list;
			}
		}, (response) => {
			// 响应错误回调
		});
	},
	/*confirmMoveto(state){
		Vue.http.post('/yich/MovegroupServlet?groupingstate='+state.groupingstate+'&stroage_id='+state.movedstroageid+'&userstroageid='+state.storage_id+'&userId='+state.user_id).then((response) => {
			window.checkErrorVue(response);
			// 响应成功回调
			Vue.http.post('/yich/StoragegroupingListServlet?option=0').then((response) => {
				window.checkErrorVue(response);
				// 响应成功回调
				if(response.data){
					state.allCount = response.data.count;
					state.groupedCount = response.data.num;
					state.ungroupCount = response.data.count - response.data.num;
					state.groupedList = response.data.list;
				}
			}, (response) => {
				// 响应错误回调
			});
			
		}, (response) => {
			// 响应错误回调
		});
	}*/
}
const actions={
	storageStartAjax(context){
		context.commit("storageStartAjax");
	},
	//终止合作ajax
	hzStop(context){
		context.commit("hzStop");
	},
	//加入黑名单
	blackList(context){
		context.commit("blackList");
	},
	//查询分组
	searchGroup(context){
		context.commit("searchGroup");
	},
	groupAjax(context){
		context.commit("groupAjax");
	},
	confirmMoveto(context){
		//context.commit("confirmMoveto");
		var _state = context.state;
		Vue.http.post('/yich/MovegroupServlet?groupingstate='+_state.groupingstate+'&stroage_id='+_state.movedstroageid+'&userstroageid='+_state.storage_id+'&userId='+_state.user_id).then((response) => {
			window.checkErrorVue(response);
			if(response.data&&response.data.flag == 0){
				alert('分组失败');
				return;
			}
			// 响应成功回调
			Vue.http.post('/yich/StoragegroupingListServlet?option=0').then((response) => {
				window.checkErrorVue(response);
				// 响应成功回调
				if(response.data){
					_state.allCount = response.data.count;
					_state.groupedCount = response.data.num;
					_state.ungroupCount = response.data.count - response.data.num;
					_state.groupedList = response.data.list;
					context.commit("groupAjax");
				}
			}, (response) => {
				// 响应错误回调
			});
			
		}, (response) => {
			// 响应错误回调
		});
	},
	//分页-请求数据
	Ajax(context){
		if(state.FYAjaxSta == 'allPaging'){
			context.commit("storageStartAjax");
		}else{
			context.commit("groupAjax");
		}
	},
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})
//合作供货商list数据
function mylist(data,type){
	var _list = [];
	for(var i in data){
		var json = {shopName:'',supapply:'',supstar:'',ordernum:'',orderprice:'',supPf:'',coopId:'',userId:'',supShopId:'',wangwang:'',canblacklist:'',template:false,coopgroupName:'',name:''};
		json.shopName = data[i].shopName;
		json.supapply = data[i].applyTime;
		json.supstar = data[i].agreeTime;
		json.ordernum = data[i].traNum;
		json.orderprice = data[i].traMoney;
		json.supPf = parseInt(data[i].score).toFixed(1);
		json.coopId = data[i].coopId;
		json.userId = data[i].userId;
		json.supShopId = data[i].supshopId;
		json.canblacklist = data[i].canblacklist;
		json.template = data[i].template?true:false;
		json.coopgroupName = data[i].storagegrouping?data[i].storagegrouping.group_name:'未分组';
		json.name=data[i].business.name
		if(type == 'start'){
			state.belongGroupState = true;
		}else{
			state.belongGroupState = false;
		}
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