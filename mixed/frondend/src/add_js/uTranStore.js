/*
*商户-交易数据
*/
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

const state={
	totalData:'',//所有数据
	//累计交易数据
	/*whoSta:'yest',*/
	whoSta:'all',
	timeData:'',//选择时间
	transTopData:'',
	transDownData:'',
	//近30天物分析
	topDataList:'',
	wuliuJson:'',//物流数据
	wuliuNum:'',//物流占比
	cityJson:'',//城市数据
	cityNum:'',//城市占比
	
	
}
const mutations={
	dataStarAjax(state){
		Vue.http.post('/yich/traData',{option:"user"},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			state.totalData = response.data;
			//累计交易数据
			transData(state.whoSta,response.data);
			//近30天物流
			wuliuData(response.data);
			
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
	changeDataFun(state){
		transData(state.whoSta,state.totalData)
	}
}
const actions={
	dataStarAjax(context){
		context.commit("dataStarAjax");
	},
	changeDataFun(context){
		context.commit("changeDataFun");
	},
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})
//交易数据
//注：勿动（小心弄乱）
function transData(who,data){
	//var yest = ["yesMoney","yesTraNum","yesPayNum","yesRetMoney","yesRetNum","yesOnlyRetMoney","yesOnlyRetNum","yesRetGoodMoney","yesRetGoodNum","yesChangeNum","yesArtNum"];
	var all = ["totalMoney","traNum","payNum","retMoney","retNum","onlyRetMoney","onlyRetNum","retGoodMoney","retGoodNum","changeNum","artNum"];
	var week = ["weekMoney","weekTraNum","weekPayNum","weekRetMoney","weekRetNum","weekOnlyRetMoney","weekOnlyRetNum","weekRetGoodMoney","weekRetGoodNum","weekChangeNum","weekArtNum"];
	var month = ["monthMoney","monthTraNum","monthPayNum","monthRetMoney","monthRetNum","monthOnlyRetMoney","monthOnlyRetNum","monthRetGoodMoney","monthRetGoodNum","monthChangeNum","monthArtNum"];
	var threeMonth = ["threeMonthMoney","threeMonthTraNum","threeMonthPayNum","threeMonthRetMoney","threeMonthRetNum","threeMonthOnlyRetMoney","threeMonthOnlyRetNum","threeMonthRetGoodMoney","threeMonthRetGoodNum","threeMonthChangeNum","threeMonthArtNum"];
	var timeData = {now:'',week:'',month:'',threeMonth:''};
	
	if(data.now){timeData.now = data.now};
	if(data.week){timeData.week = data.week};
	if(data.month){timeData.month = data.month};
	if(data.threemonth){timeData.threeMonth = data.threemonth};
	state.timeData = timeData;
	if(data.traData){
		//所有交易数据
		var json = data.traData;
		if(who == "yest"){
			setData(yest,json);
		}else if(who == "week"){
			setData(week,json);
		}else if(who == "month"){
			setData(month,json);
		}else if(who == "threeMonth"){
			setData(threeMonth,json);
		}else if(who == "all"){
			setData(all,json);
		}
	}
};
//物流数据分析
function wuliuData(data){
	var wuliuDataList=[];
	var wuliuNumList=[];
	var cityDataList=[];
	var cityNumList=[];
	var topList={sendNum:'0',wulNum:'0',addresNum:'0',paySend:'0',payTake:'0'};
	var allNum = data.count?data.count:0;
	if(data.loglist){
		var wuJson = data.loglist;
		for(var i in wuJson){
			if(wuJson[i].logName !=''){
				var comData = {name:'',num:'',pers:''};
				comData.name = wuJson[i].logName;
				comData.num = wuJson[i].logTime;
				if(allNum != 0){
					comData.pers = (parseFloat(parseInt(wuJson[i].logTime)/parseInt(allNum))*100).toFixed(2)+"%";
				}else{
					comData.pers = '0.00%';
				}
				wuliuDataList.push(comData);
				wuliuNumList.push(wuJson[i].logTime);
			}
		}
		
		state.wuliuJson  = wuliuDataList;
		state.wuliuNum = wuliuNumList;
	};
	if(data.plist){
		var ciJson = data.plist;
		for(var j in ciJson){
			if(ciJson[j].province !=''){
				var citData = {name:'',num:'',pers:''};
				citData.name = ciJson[j].province;
				citData.num = ciJson[j].logTime;
				if(allNum != 0){
					citData.pers = (parseFloat(parseInt(ciJson[j].logTime)/parseInt(allNum))*100).toFixed(2)+"%";
				}else{
					citData.pers = '0.00%';
				}
				cityDataList.push(citData);
				cityNumList.push(ciJson[j].logTime);
			}
		}
		
		state.cityJson  = cityDataList;
		state.cityNum = cityNumList;
	}
	if(data.count){topList.sendNum = data.count}
	if(data.logNum){topList.wulNum = data.logNum}
	if(data.traadd){topList.addresNum = data.traadd}
	if(data.deliverTime){topList.paySend = data.deliverTime}
	if(data.completedTime){	topList.payTake = data.completedTime}
	state.topDataList = topList;
}

//注：勿动（小心弄乱）
function setData(att,json){
	var transTopData = {ddPrice:'0',ddNum:'0',ghNum:'0',ddOnePrice:'0',kOnePrice:'0'}
	var transDownData = {tkPrice:'0',tkNum:'0',tkpers:'0.00%',jtkPrice:'0',jtkNum:'0',jtkPers:'0.00%',thPrice:'0',thNum:'0',thPers:'0.00%',hhNum:'0',hhPers:'0.00%',jfPers:'0.00%'};

	transTopData.ddPrice = json[att[0]];
	transTopData.ddNum = json[att[1]];
	transTopData.ghNum = json[att[2]];
	if(json[att[1]] != 0){
		transTopData.ddOnePrice = (parseFloat(json[att[0]])/parseFloat(json[att[1]])).toFixed(2);
	}
	if(json[att[2]] != 0){
		transTopData.kOnePrice = (parseFloat(json[att[0]])/parseFloat(json[att[2]])).toFixed(2);
	}
	//down
	//退款
	transDownData.tkPrice = json[att[3]];
	transDownData.tkNum = json[att[4]];
	if(json[att[1]] != 0){
		transDownData.tkpers = ((parseFloat(json[att[4]])/parseInt(json[att[1]]))*100).toFixed(2)+"%";
	}
	//仅退款
	transDownData.jtkPrice = json[att[5]];
	transDownData.jtkNum = json[att[6]];
	if(json[att[1]] != 0){
		transDownData.jtkPers = ((parseFloat(json[att[6]])/parseInt(json[att[1]]))*100).toFixed(2)+"%";
	}
	//退货
	transDownData.thPrice = json[att[7]];
	transDownData.thNum = json[att[8]];
	if(json[att[1]] != 0){
		transDownData.thPers = ((parseFloat(json[att[8]])/parseInt(json[att[1]]))*100).toFixed(2)+"%";
	}
	//换货
	transDownData.hhNum = json[att[9]];
	if(json[att[1]] != 0){
		transDownData.hhPers = ((parseFloat(json[att[9]])/parseInt(json[att[1]]))*100).toFixed(2)+"%";
	}
	//纠纷率
	if(json[att[1]] != 0){
		transDownData.jfPers = ((parseFloat(json[att[10]])/parseInt(json[att[1]]))*100).toFixed(2)+"%";
	}
	
	state.transTopData = transTopData;
	state.transDownData = transDownData;
	
}

