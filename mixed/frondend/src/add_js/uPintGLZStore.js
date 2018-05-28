//仓储-拼团管理和拼团中-详情页
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	groupId:window.location.href.split("?groupId=")[1],//拼团商品id
	head:{},
	starHeadSkuData:[],//sku初始数据
	headSkuData:[],
	allHeadSkuData:[],//>3条数据时的所有数据
	islookmore:false,
	totalNum:0,
	totalPrice:0,
	
	//详情
	isfootShow:true,
	swapStatus:'',//详情数据的状态(是否调剂后)
	skulist:[],
	userName:[],
	skuNumData:[],
	totalData:[],
	allTotalNum:{num:{oldnum:0,newnum:0},zfprice:0,tkprice:0,sjprice:0},
	allTotalSkuNum:[],
}
const mutations={
	xqStarAjax(state){
		Vue.http.post('/yich/GroupingDetail',{groupId:state.groupId},{emulateJSON:true}).then((response)=>{
			//success
			 window.checkErrorVue(response);
			if(response.data.group){
				state.swapStatus = response.data.group.swapStatus;
				getHeadData(response.data.group);
				if(response.data.group.goodGroups.length>0){
					getHeadSku(response.data.group.goodGroups);
				}
			}
			if(response.data.groupList.length>0){
				state.isfootShow = true;
				setxqlist(response.data.groupList)
			}else{
				state.isfootShow = false;
			}
			
			
		},(response)=>{
			//error
			console.log("err");
		});
	}
	
}
const actions={
	xqStarAjax(context){
		context.commit('xqStarAjax');
	},
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})
function getHeadData(data){
	var headjson = {supName:'',tel:'',wangwang:'',imgsrc:'',proName:'',goodNo:'',isdisplay:"1"};
	headjson.supName = data.sup.shop_name;
	/*if((typeof (data.tel)!='undefined' || typeof (data.mobile)!='undefined') && typeof (data.landlineTel)!='undefined'){
		var tt1 = data.landlineTel.split('-')[0]?data.landlineTel.split('-')[0]:'';
		var tt2 = data.landlineTel.split('-')[1]?data.landlineTel.split('-')[1]:'';
		var tt3 = data.landlineTel.split('-')[2]?data.landlineTel.split('-')[2]:'';
		var tt = '';
		if(tt1 && tt2 &&tt3){
			tt = tt1+"-"+tt2+"-"+tt3;
		}else if(tt1 && tt2){
			tt = tt1+"-"+tt2;
		}else if(tt2 && tt3){
			tt = tt2+"-"+tt3;
		}else{
			tt = tt2;
		}
		var phone='';
		alert(data.mobile);
		if(typeof (data.mobile)!='undefined' && data.mobile){
			phone=data.mobile;
		}else if(typeof (data.tel)!='undefined' && data.tel){
			phone=data.tel;
		}
		headjson.tel =(phone && tt)?phone+' / '+tt:phone?phone:tt?tt:'';
	}else if(typeof (data.tel)!='undefined' || typeof (data.mobile)!='undefined'){
		var phone='';
		if(typeof (data.mobile)!='undefined' && data.mobile){
			phone=data.mobile;
		}else if(typeof (data.tel)!='undefined' && data.tel){
			phone=data.tel;
		}
		headjson.tel = phone;
	}else if(data.landlineTel){
		headjson.tel = data.landlineTel;
	}*/
	if(data.business.mobile || data.business.tel){
		headjson.tel = data.business.mobile || data.business.tel;
	}
	if(data.sup.wangwang){
		headjson.wangwang = data.sup.wangwang;
	}
	
	headjson.imgsrc = window.imgchange(data.mainSrc,"@76w_76h");
	headjson.proName = data.proName;
	headjson.goodNo = data.goodNo;
	headjson.isdisplay = data.isDisplay;
	
	state.head = headjson;
}
function getHeadSku(data){
	if(data.length>3){
		state.starHeadSkuData = addSumSkuData(data);
		state.headSkuData = addSumSkuData(data);
		state.allHeadSkuData = addAllSkuData(data);
		state.islookmore = true;
	}else{
		state.headSkuData = addAllSkuData(data);
		state.islookmore = false;
	}
	
}
//用户名
function setxqlist(data){
	for(var i in data){
		var myData = data[i].peopleGroups;
		state.userName.push(myData[0].userName);
		getSkuNum(state.skulist,myData);
	}
	//总计
	getTotal(state.totalData);
	getTotalSkuNum(state.skulist,state.skuNumData);
	
	
}
//sku参数
function getSkuNum(sku,pro){
	var tempArr = [];
	/*var total = {allNum:{oldn:0,newn:0},allPrice:0};*/
	var total = {allNum:{oldn:0,newn:0},allPrice:0,tkPrice:0,truePrice:0.00,};
	for(var n in sku){
		var tempJson = {oldskun:'',newskun:''};
		var num = ishave(sku[n],pro)
		if(num){
			tempJson.oldskun = pro[num].buyNum;
			tempJson.newskun = pro[num].swapNum;
			tempArr.push(tempJson);
			
			total.allNum.oldn += parseInt(pro[num].buyNum);
			total.allNum.newn += parseInt(pro[num].swapNum);
			//total.tkPrice += parseFloat(pro[num].returnMoney);
			total.allPrice += parseFloat(pro[num].totalMoney);
		}else{
			tempJson.oldskun = 0;
			tempJson.newskun = 0;
			tempArr.push(tempJson);
		}
	}
	for(var i in pro){
		if(pro[i].swapStatus == "N"){
			total.truePrice = total.allPrice;
			total.tkPrice = 0.00;
		}else{
			total.truePrice += parseFloat((pro[i].swapNum*pro[i].price).toFixed(2));
			total.tkPrice = total.allPrice - total.truePrice;
		}
	}
	/*if(total.tkPrice != 0 && total.tkPrice){
		total.truePrice = parseFloat((total.allPrice-total.tkPrice).toFixed(2));
	}else{
		total.truePrice = total.allPrice;
	}*/
	state.skuNumData.push(tempArr);
	state.totalData.push(total);
}
//总量和金额-总计
function getTotal(data){
	for(var i in data){
		state.allTotalNum.num.oldnum +=data[i].allNum.oldn;
		state.allTotalNum.num.newnum +=data[i].allNum.newn;
		state.allTotalNum.zfprice +=data[i].allPrice;
		if(data[i].tkPrice != 0 && data[i].tkPrice){
			state.allTotalNum.tkprice +=data[i].tkPrice;
		}
		state.allTotalNum.sjprice +=data[i].truePrice;
	}
}
//各sku总计
function getTotalSkuNum(sku,skuNum){
	var totalSkuNum = [];
	for(var s in sku){
		var num = {oldskun:0,newskun:0};
		for(var n in skuNum){
			num.oldskun +=  skuNum[n][s].oldskun;
			num.newskun +=  skuNum[n][s].newskun;
		}
		totalSkuNum.push(num);
	}
	state.allTotalSkuNum = totalSkuNum;
}
//判断是否有这个sku
function ishave(json,data){
	for(var x in data){
		var tesku = '';
		if(data[x].sku.indexOf(';')!=-1){
			var tes1 = data[x].sku.split(';')[0].split(':')[1];
			var tes2 = data[x].sku.split(';')[1].split(':')[1];
			if(tes1 && tes2){
				tesku = tes1+"/"+tes2;
			}else if(tes1){
				tesku = tes1;
			}else if(tes2){
				tesku = tes2;
			}
		}else{
			tesku = data[x].sku;
		}
		
		
		if(tesku == json){
			return x;
		}
	}
	return false;
}
//
function addSumSkuData(data){
	var temptotalNum = 0;
	var temptotalPrice = 0;
	var tempskulist=[];
	var skuData = [];
	for(var i=0;i<3;i++){
		var skujson = {sku:'',ptPrice:'',ptNum:'',ptAllPrice:''};
		if(data[i].sku.indexOf(';')!=-1){
			var sku1 = data[i].sku.split(";")[0];
			var sku2 = data[i].sku.split(";")[1];
			
			if(sku1 && sku2){
				skujson.sku = sku1.split(':')[1]+"/"+sku2.split(":")[1];
			}else if(sku1){
				skujson.sku = sku1.split(':')[1];
			}else if(sku2){
				skujson.sku = sku2.split(":")[1];
			}
		}else{
			skujson.sku = data[i].sku;
		}
		
		skujson.ptPrice = data[i].price;
		skujson.ptNum = data[i].num;
		skujson.ptAllPrice = (parseFloat(data[i].price)*parseInt(data[i].num)).toFixed(2);
		temptotalNum += parseInt(data[i].num);
		temptotalPrice += parseFloat(skujson.ptAllPrice);
		tempskulist.push(skujson.sku);
		
		skuData.push(skujson);
	}
	state.totalNum = temptotalNum;
	state.totalPrice = temptotalPrice.toFixed(2);
	state.skulist = tempskulist;
	return skuData;
}
function addAllSkuData(data){
	var temptotalNum = 0;
	var temptotalPrice = 0;
	var tempskulist=[];
	var skuData = [];
	for(var j in data){
		var skujson = {sku:'',ptPrice:'',ptNum:'',ptAllPrice:''};
		if(data[j].sku.indexOf(';')!=-1){
			var sku1 = data[j].sku.split(";")[0];
			var sku2 = data[j].sku.split(";")[1];
			
			if(sku1 && sku2){
				skujson.sku = sku1.split(':')[1]+"/"+sku2.split(":")[1];
			}else if(sku1){
				skujson.sku = sku1.split(':')[1];
			}else if(sku2){
				skujson.sku = sku2.split(":")[1];
			}
		}else{
			skujson.sku = data[j].sku;
		}
		
		skujson.ptPrice = data[j].price;
		skujson.ptNum = data[j].num;
		skujson.ptAllPrice = (parseFloat(data[j].price)*parseInt(data[j].num)).toFixed(2);
		temptotalNum += parseInt(data[j].num);
		temptotalPrice += parseFloat(skujson.ptAllPrice);
		tempskulist.push(skujson.sku);
		
		skuData.push(skujson);
	}
	state.totalNum = temptotalNum;
	state.totalPrice = temptotalPrice.toFixed(2);
	state.skulist = tempskulist;
	return skuData;
}