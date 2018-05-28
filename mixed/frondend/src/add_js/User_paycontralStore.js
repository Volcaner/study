import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
	nowpage:1,//当前显示的页数
	allpage:0,
	classify:'ALL',
	paystyle:'ALL',
	data:[
	      /*
	      {
	    	  isshow:true,
	    	  createtime:'2016-12-18 18:39',
	    	  name:'阿斯达撒的撒大声地',
	    	  showmany:false,//是否显示等多件
	    	  ddnumber:'12312312312313',//订单号
	    	  dealnumber:'12312313123',//交易号
	    	  paytype:'支付宝',
	    	  paymoney:'300.00',
	    	  paystate:'已支付',
	    	  timer:'',//倒计时动画
	    	  time:'3600000',
	    	  fen:'01',
	    	  miao:'01',
	    	  yichPayType:'',
	      },*/
	]
}
const mutations = {		
	page(state,n){
		state.nowpage=n.page;
	},
	jiazai(state,response){
		state.allpage=response.body.totalPages;
		for(var i in state.data){
			if(state.data[i].timer){
				clearInterval(state.data[i].timer);
				state.data[i].timer=null;
			}
		}
		state.data.splice(0);
		var list=response.body.list;
		var json=[];
		for(var k in list){
			let paytype=list[k].paymentMethod;
			let yichPayType=false;
			if(paytype == 'X'){
				var ddnumber = list[k].transaction_id;
			}else{
				var ddnumber = list[k].tradeNo || '';
			}
			if(typeof (list[k].yichPayType)!='undefined' && list[k].yichPayType==5){
				yichPayType=true;
			}
			paytype=paytype=='X'?'微信支付':paytype=='Y'?'支付宝支付':paytype=='Z'?'银行卡支付':paytype=='P'?'预存卡支付':paytype=='W'?'账户余额':'暂无';
			let paystate=list[k].payStatus;
			paystate=paystate=='NEW'?'未支付':paystate=='SUCCESS'?'已支付':'无数据';
			var time=list[k].time*1000;
			//拼团状态
			var pt_state=false;
			if(typeof (list[k].yichPayType)!='undefined' && list[k].yichPayType=='3'){
				pt_state=true;
			}
			var payType = '';
			if(list[k].yichPayType){
				var typeVal = list[k].yichPayType;
				payType = typeVal==7?'公众号预缴推广费':typeVal==0?'购买商品':typeVal==1?'服务付款':typeVal==2?'现金充值':typeVal==3?'拼团':typeVal==5?'转售':typeVal==6?'购买预存卡':'';
			}
			//转售
			/*var zhuans_state=false;
			if(typeof (list[k].yichPayType)!='undefined' && list[k].yichPayType=='5'){
				zhuans_state=true;
			}*/
			//json.push({zhuans_state:zhuans_state,pt_state:pt_state,isshow:true,createtime:list[k].operTime,name:list[k].titles?list[k].titles[0]:'',showname:(list[k].titles && list[k].titles.length>1)?true:false,ddnumber:ddnumber,dealnumber:list[k].alipayNum,paytype:paytype,paymoney:list[k].totalFee,paystate:paystate,timer:'',time:time,fen:0,miao:0,yichPayType:yichPayType})

			var j={};
			j.pt_state=pt_state;
			j.isshow=true;
			j.createtime='';
			j.name='暂无';
			j.ddnumber=ddnumber;
			j.dealnumber='';
			j.paytype=paytype;
			j.paymoney='';
			j.paystate=paystate;
			j.timer='';
			j.time=time;
			j.fen=0;
			j.miao=0;
			j.payType = payType;
			j.yichPayType=yichPayType;
			if(typeof (list[k].gmtCreate)!='undefined'){
				j.createtime=list[k].gmtCreate;
			}
			if(typeof (list[k].payTitle)!='undefined'){
				j.name=list[k].payTitle;
			}
			if(list[k].yichPayType==2 || list[k].yichPayType==1){
				j.name = '';
			}
			if(typeof (list[k].alipayNum)!='undefined'){
				j.dealnumber=list[k].alipayNum;
			}
			if(typeof (list[k].totalFee)!='undefined'){
				j.paymoney=list[k].totalFee;
			}
			json.push(j);
			//json.push({pt_state:pt_state,isshow:true,createtime:list[k].operTime,name:list[k].titles?list[k].titles[0]:'',showname:(list[k].titles && list[k].titles.length>1)?true:false,ddnumber:ddnumber,dealnumber:list[k].alipayNum,paytype:paytype,paymoney:list[k].totalFee,paystate:paystate,timer:'',time:time,fen:0,miao:0,yichPayType:yichPayType})
		}
		state.data=json;
		for(var key in state.data){
			if(state.data[key].paystate=='未支付'){
				(function(key){
					state.data[key].time=state.data[key].time?state.data[key].time:0;
					state.data[key].timer=setInterval(runtime,1000);
					function runtime(){
						if(state.data[key].time<=999){
							clearInterval(state.data[key].timer);
							state.data[key].timer=null;
							//ajax
							Vue.http.post('/yich/PayOff',{payNum:state.data[key].dealnumber})
							.then((response)=>{
								window.checkErrorVue(response);
								if(response.body.flag=='1'){
									/*alert('关闭成功');*/
									state.data[key].isshow=false;
								}else{
									/*alert('系统繁忙，请刷新页面重试');*/
								}
							},(response)=>{
								
							});
						}
						let mm=parseInt(state.data[key].time/60000);
						let ss=parseInt(state.data[key].time/1000%60);
						mm=String(mm);
						ss=String(ss);
						mm=mm.length<2?('0'+mm):mm;
						ss=ss.length<2?('0'+ss):ss;	
						state.data[key].fen=mm;
						state.data[key].miao=ss;
						state.data[key].time-=1000;	
					}
					runtime();
				})(key)
			}
		}
	}
}
const actions={
	Ajax(context){
		Vue.http.post('/yich/UserPaymentManagement',{branch:context.state.classify,option:context.state.paystyle,page:state.nowpage})
		.then((response)=>{
			window.checkErrorVue(response);
			context.commit('jiazai',response);
		},(error)=>{
			
		})
	}
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})