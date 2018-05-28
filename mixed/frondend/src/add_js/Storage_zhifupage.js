import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
  ye:0.00,  //可用余额
  orderLogMoney:0,
  payNum:'',	
  pwd:'',
  src:'',
  srcshow:false,
  ispassed:false,  //余额支付是否有密码 有false 无true
  cardList:[],
  cardTitle:'',
  cardId:'',
  cardMoney:'',
  cardSoldId:'',
  iscardcan:false,
  pmcClickIndex:0,//预存卡索引默认0；
  discount:0,
 }
const mutations = {
		weix(state){
			var obj={};
			obj['paynum']=state.payNum;
			 Vue.http.post('/yich/WeChatResultServlet',obj,{emulateJSON:true}).then((response) => {
				 	var data=response.data;
				 	if(data.map.state=='SUCCESS'){
				 		 var j=(window.location.href).split("?");
						    var jg=j[1].split("&");
						    var price=0;
						    for(var i=0;i<jg.length;i++){
						    	var a= jg[i].split("=");
						    	if(a[0]=='totalFee'){
						    		price=a[1];
						    	}
						    }
						 	window.location.href="/yich/Storage/Storage_Successful.html?price="+price;	
				 	}else if(data.map.state=='FAIL'){
				 		window.location.href="/yich/User/User_error404.html";	
				 	}
			 	 }, (response) => {
			 });
		},
}

const actions={
   yue(context){
	   Vue.http.post('/yich/BalanceSelect',{emulateJSON:true}).then((response) => {
		 	context.state.ye=response.data.balance;
		 	if(response.data.result==0){
		 		context.state.ispassed=true;
		 	}
		 	var alipayId = window.location.href.split('payNum=')[1]?window.location.href.split('payNum=')[1].split('&')[0]:'';
		 	var paymoney = window.location.href.split('totalFee=')[1]?parseFloat(window.location.href.split('totalFee=')[1].split('&')[0]):0;
		 	 Vue.http.post('/yich/PayMoneyGetPrestoreCardServlet?payNum='+alipayId,{emulateJSON:true}).then((res) => {
		 		 if(res.data.prestoreCardSoldList.length>0){
		 			context.state.orderLogMoney=res.data.log_money;
		 			context.state.cardList=resetCardlist(res.data);
		 			var logMoney = res.data.log_money?parseFloat(res.data.log_money):0;
		 			for(var i=0; i<res.data.prestoreCardSoldList.length; i++){
		 				var afterZf = (paymoney-logMoney)*((res.data.prestoreCardSoldList[i].prestoreCard.discount)/10)+logMoney;
						if(res.data.prestoreCardSoldList[i].card_balance>afterZf){
							context.state.cardId = res.data.prestoreCardSoldList[i].prestoreCard.prestore_card_id;
							context.state.cardMoney = res.data.prestoreCardSoldList[i].card_balance;
							context.state.cardTitle = res.data.prestoreCardSoldList[i].prestoreCard.prestore_card_name;
							context.state.cardSoldId = res.data.prestoreCardSoldList[i].prestore_card_sold_id;
							context.state.discount = res.data.prestoreCardSoldList[i].prestoreCard.discount;
							context.state.iscardcan = true;
							context.state.pmcClickIndex = i;
							break;
						}
					}
		 		 }
			 }, (response) => {
			 });
	 	 }, (response) => {
	 });
   },
   zhifubao(context){
	   var obj={};
	   obj.payNum=context.state.payNum;
	   window.location.href='/yich/AliPayServletCheckstand?payNum='+context.state.payNum;
   },
   wx(context){
	   var obj={};
	   var search=window.location.href;
		  var searchstr=search.split("?");
		  var searcharr=searchstr[1];
		  var arr=searcharr.split("&");
		  for(var i=0;i<arr.length;i++){
			   var str=arr[i].split("=");
			   var key=str[0];
			   var val=str[1];
			   if(key=='trads'){
				   obj['traIds']=val;
			   } 
		  }
		  obj.payNum=context.state.payNum;
		  obj['yich_pay_type']=2;
		  obj['body']='1';
	   Vue.http.post('/yich/WeChatPayServlet',obj,{emulateJSON:true}).then((response) => {
		   context.state.src=(response.data);
		   context.state.srcshow=true;
		   document.getElementById('yingying').style.display='block';
		   setInterval(function(){
			   context.commit('weix')
		   },1000);
			  }, (response) => {
		 });
   },
}
export default new Vuex.Store({
	state,
	mutations,
	actions
 })

function resetCardlist(data){
	var paymoney = window.location.href.split('totalFee=')[1]?parseFloat(window.location.href.split('totalFee=')[1].split('&')[0]):0;
	var logMoney = data.log_money?parseFloat(data.log_money):0;
	var carlist = [];
	var list = data.prestoreCardSoldList?data.prestoreCardSoldList:[];
	for(var i in list){
		var obj = {cardName:'',cardId:'',cardSoldId:'',cardblance:0,discount:0,cardSta:false}
		obj.cardName = list[i].prestoreCard.prestore_card_name;
		obj.cardId = list[i].prestoreCard.prestore_card_id;
		obj.cardSoldId = list[i].prestore_card_sold_id;
		obj.cardblance = list[i].card_balance;
		obj.discount = list[i].prestoreCard.discount;
		var afterZf = (paymoney-logMoney)*(list[i].prestoreCard.discount/10)+logMoney;
		if(afterZf>list[i].card_balance){
			obj.cardSta = false;
		}else{
			obj.cardSta = true;
		}
		carlist.push(obj);
	}
	return carlist;
}
