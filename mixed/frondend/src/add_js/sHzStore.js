/*
*仓储-查看合作关系
*/
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

const state={
	isScoreShow:false,//是否显示服务评分和评论
	timeData:'',//单日交易数据时间
	thisDayTime:'',//当日时间
	dayTradeData:'',//单日交易数据
	totalData:[{name:"订单总额（元）",num:"0.00"},
			   {name:"订单总数（笔）",num:"0.00"},
			   {name:"供货次数（次）",num:"0.00"},
			   {name:"客单价（元）",num:"0.00"},
			   {name:"订单均价（元）",num:"0.00"},
			   {name:"退款率",num:"0.00%"},
			   {name:"纠纷率",num:"0.00%"}],
	allData:'',//累计交易数据
	allStatus:'week',//累计交易数据日期状态
	transSort:'',//交易排行
	payNumPersent:'0',//供货频率
	singlePayNumPersent:'0',//人均供货频率
	relationData:'',//合作关系数据
	scoreOption:'1',//服务频分数据状态（“1”为初始， “”为查看更多）
	isScoreList:false,//判断是否有评分或评论
	scoreDataList:'',//评分数据
	supShopId:_getReg("supShopId"),//	
	userId:_getReg("userId"),//
	coopId:_getReg("coopId"),//
}
const mutations={
	//单日初始请求数据
	dayStarAjax(state){
		Vue.http.post('/yich/dayTrade?option=user&date='+state.timeData+'&supShopId='+state.supShopId+'&userId='+state.userId).then((response) => {
				// 响应成功回调
			 window.checkErrorVue(response);
				if(response.data.daytrade){
					state.dayTradeData = response.data.daytrade;
				}if(response.data.date){
					if(!state.timeData){
						state.thisDayTime = response.data.date+" "+"00:00:00";
						state.timeData = response.data.date+" "+"00:00:00";
					}
					
				}
			}, (response) => {
				// 响应错误回调
		});
	},
	//累计交易初始请求数据
	allStarAjax(state){
		Vue.http.post('/yich/coopRelation?option=user&supShopId='+state.supShopId+'&userId='+state.userId+'&coopId='+state.coopId).then((response) => {
				// 响应成功回调
			 window.checkErrorVue(response);
				if(response.data){
					state.allData = response.data;
					relationData(response.data);
					mutations.allDataSet(state);
				}
				
			}, (response) => {
				// 响应错误回调
		});
	},
	allDataSet(state){
		if(state.allData.c){
			var data = state.allData.c;
			var json = state.totalData;
			if(state.allStatus == "week"){
				let price = data.threeData.weekMoney;
				let trad = data.threeData.weekTraNum;
				let pay = data.threeData.weekPayNum;
				let ret = data.threeData.weekRetNum;
				let art = data.threeData.weekArtNum;
				addAllData(json,price,trad,pay,ret,art);
			}else if(state.allStatus == "month"){
				let price = data.threeData.monthMoney;
				let trad = data.threeData.monthTraNum;
				let pay = data.threeData.monthPayNum;
				let ret = data.threeData.monthRetNum;
				let art = data.threeData.monthArtNum;
				addAllData(json,price,trad,pay,ret,art);
			}else if(state.allStatus == "thmonth"){
				let price = data.threeData.threeMonthMoney;
				let trad = data.threeData.threeMonthTraNum;
				let pay = data.threeData.threeMonthPayNum;
				let ret = data.threeData.threeMonthRetNum;
				let art = data.threeData.threeMonthArtNum;
				addAllData(json,price,trad,pay,ret,art);
			}else if(state.allStatus == "all"){
				let price = data.traMoney;
				let trad = data.traNum;
				let pay = data.payNum;
				let ret =data.retNum;
				let art = data.artNum;
				addAllData(json,price,trad,pay,ret,art);
			}
		}
	},
	//近三个月交易排名
	threRankAjax(state){
		Vue.http.post('/yich/rank?supShopId='+state.supShopId+'&userId='+state.userId).then((response) => {
				// 响应成功回调
			 window.checkErrorVue(response);
				if(response.data.transSort){
					state.transSort = response.data.transSort;
					if(parseInt(response.data.transSort.payNum)>0){
						state.payNumPersent = (90/parseInt(response.data.transSort.payNum)).toFixed(2);
					}
					if(parseFloat(response.data.transSort.threeMonthPayNum)>0){
						state.singlePayNumPersent = (90/parseInt(response.data.transSort.threeMonthPayNum)).toFixed(2);
					}
				}
				
			}, (response) => {
				// 响应错误回调
		});
	},
	//服务评分
	servScoreAjax(state){
		Vue.http.post('/yich/displayScoreRecord?option='+state.scoreOption+'&coopId='+state.coopId).then((response) => {
				// 响应成功回调
			 window.checkErrorVue(response);
				if(response.data.score.length>0){
					state.isScoreList = true;
					state.scoreDataList = response.data.score;
				}else{
					state.isScoreList = false;
				}
				
			}, (response) => {
				// 响应错误回调
		});
	},

}
const actions={
	dayStarAjax(context){
		context.commit("dayStarAjax");
	},
	allStarAjax(context){
		context.commit("allStarAjax");
	},
	allDataSet(context){
		context.commit("allDataSet");
	},
	threRankAjax(context){
		context.commit("threRankAjax");
	},
	servScoreAjax(context){
		context.commit("servScoreAjax");
	}

}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})
//设置累计交易数据
function addAllData(json,aprice,trad,pay,ret,art){
	for(var i in json){
		if(json[i].name == "订单总额（元）"){
			json[i].num = aprice;
		}else if(json[i].name == "订单总数（笔）"){
			json[i].num = trad;
		}else if(json[i].name == "供货次数（次）"){
			json[i].num = pay;
		}else if(json[i].name == "客单价（元）"){
			if(parseInt(pay)>0){
				json[i].num = (parseFloat(aprice)/parseInt(pay)).toFixed(2);
			}
		}else if(json[i].name == "订单均价（元）"){
			if(parseInt(trad)>0){
				json[i].num = (parseFloat(aprice)/parseInt(trad)).toFixed(2);
			}
		}else if(json[i].name == "退款率"){
			if(parseInt(trad)>0){
				json[i].num = ((parseInt(ret)/parseInt(trad))*100).toFixed(2)+"%";
			}
		}else if(json[i].name == "纠纷率"){
			if(parseInt(trad)>0){
				json[i].num = ((parseInt(art)/parseInt(trad))*100).toFixed(2)+"%";
			}
		}
	}
}
//合作关系数据
function relationData(data){
	var json={name:'',agreeTime:'',sentKinds:'0',clNum:'0',priceTemp:'0',pfScore:'0',totalMoney:'',totalNum:''}
	if(data.c){
		json.name = data.c.shopName;
		json.agreeTime = data.c.agreeTime;
		json.sentKinds = data.c.purList.length;
		json.clNum = data.cltotal;
		json.priceTemp = data.templateCount;
		json.pfScore = data.c.score;
		json.totalMoney = data.c.traMoney;
		json.totalNum = data.c.traNum;
	}
	state.relationData = json;
}
//截取超链接数据
function _getReg(name) {
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null) return  unescape(r[2]); return '';
}