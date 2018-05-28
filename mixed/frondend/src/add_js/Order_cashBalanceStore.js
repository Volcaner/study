import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
	option:'transation',
	paymentType:'A',
	startTime:'',
	endTime:'',	
	records:[],
	page:1,
	pages:0,
	wSum:0,
	xSum:0,
	ySum:0,
	balance:0,
	withdrawStart:'',
	withdrawEnd:'',
	withdrawSum:0,
	withdrawRecords:[],
	cashpages:0,
	withdrawpages:0,
	typeJy:'A',
	zzIsShow:false,//转账显隐

}
const mutations = {
	page(state,n){
		state.page=n.page;
	},
	option(state,option){
		state.option=option;
	},
	records(state,records){
		state.records=records;
	},
	pages(state,pages){
		state.pages=pages;
	},
	startTime(state,startTime){
		state.startTime=startTime;
	},
	endTime(state,endTime){
		state.endTime=endTime;
	},
	paymentType(state,paymentType){
		state.paymentType=paymentType;
	},
	wSum(state,wSum){
		state.wSum=wSum;
	},
	xSum(state,xSum){
		state.xSum=xSum;
	},
	ySum(state,ySum){
		state.ySum=ySum;
	},
	balance(state,balance){
		state.balance=balance;
	},
	withdrawStart(state,withdrawStart){
		state.withdrawStart=withdrawStart;
	},
	withdrawEnd(state,withdrawEnd){
		state.withdrawEnd=withdrawEnd;
	},
	withdrawSum(state,withdrawSum){
		state.withdrawSum=withdrawSum;
	},
	withdrawRecords(state,withdrawRecords){
		state.withdrawRecords=withdrawRecords;
	},
	cashpages(state,cashpages){
		state.cashpages=cashpages;
	},
	withdrawpages(state,withdrawpages){
		state.withdrawpages=withdrawpages;
	},
	setZzIsShow(state,val){
		state.zzIsShow = val;
	},
}
const actions={
	balanceRecord(context){
		Vue.http.post('/yich/OrderBalanceRecordServlet',{option:context.state.typeJy,type:context.state.paymentType,startTime:context.state.startTime,endTime:context.state.endTime,page:context.state.page})
		.then((response)=>{
			window.checkErrorVue(response);
			context.commit('pages',response.data.pages);
			context.commit('cashpages',response.data.pages);
			context.commit('wSum',response.data.wSum);
			context.commit('xSum',response.data.xSum);
			context.commit('ySum',response.data.ySum);
			context.commit('balance',response.data.balance.toFixed(2));
			let plist = response.data.plist;
			let records = [];
			for(let k in plist){
				let list = {};
				if(typeof plist[k].yichPayType!='undefined' && plist[k].yichPayType=='A'){
					list.type='所有';
				}else if(typeof plist[k].yichPayType!='undefined' && plist[k].yichPayType=='1'){
					list.type='入驻收入';
				}else if(typeof plist[k].yichPayType!='undefined' && plist[k].yichPayType=='7'){
					list.type='推广费收入';
				}
				
				list.alipayNum = plist[k].alipayNum;
				list.gmtCreate = '';
				if(plist[k].gmtCreate){
					list.gmtCreate = plist[k].gmtCreate.substring(0,plist[k].gmtCreate.length-3);
				}
				list.gmtPayment = '';
				if(plist[k].gmtPayment){
					list.gmtPayment = plist[k].gmtPayment.substring(0,plist[k].gmtPayment.length-3);
				}
				list.totalFee = '+' + plist[k].totalFee;
				list.username = '';
				if(plist[k].business&&plist[k].business.name){
					list.username = plist[k].business.name;
				}
				list.resource = plist[k].paymentMethod=='Y'?'支付宝':plist[k].paymentMethod=='W'?'余额':'微信';
				list.payStatus = plist[k].payStatus=='SUCCESS'?'缴费成功':plist[k].payStatus=='NEW'?'缴费中...':plist[k].payStatus=='LOSE'?'缴费失败':'缴费关闭';
				records.push(list);
			}
			context.commit('records',records);
		},(response)=>{
			
		})
	},
	getwithdrawRecord(context){
		Vue.http.post('/yich/RecordServlet',{type:'A',startTime:context.state.withdrawStart,endTime:context.state.withdrawEnd,page:context.state.page,option:'G',bB:'O'},{emulateJSON:true})
		.then((response)=>{
			window.checkErrorVue(response);
			context.commit('withdrawSum',response.data.out);
			context.commit('pages',response.data.pages);
			context.commit('withdrawpages',response.data.pages);
			let records = [];
			if(response.data.list.length>0){
				let lists = response.data.list;
				for(let k in lists){
					let list = {};
					list.alipayNum = lists[k].br_id;
					list.establish_time = '';
					if(lists[k].establish_time){
						list.establish_time = lists[k].establish_time.substring(0,lists[k].establish_time.length-3);
					}
					list.operation_time = '';
					if(lists[k].operation_time){
						list.operation_time = lists[k].operation_time.substring(0,lists[k].operation_time.length-3);
					}
					list.amount = '-' + lists[k].amount.toFixed(2);
					var state = lists[k].state;
					list.payStatus = state=='RI'?'提现中...':state=='RS'?'提现成功':state=='RL'?'提现失败':state=='RC'?'提现关闭':state=='GI'?'提现中...':state=='GS'?'提现成功':state=='GL'?'提现失败':state=='PS'?'提现成功':state=='OPS'?'提现成功':state=='T'?'提现成功':state=='B'?'提现成功':'默认状态';
					records.push(list);
				}
			}
			context.commit('withdrawRecords',records);
		},(response)=>{
			
		})
	},
	Ajax(context){
		if(context.state.option=='transation'){
			context.dispatch('balanceRecord');
		}else if(context.state.option=='withdrawRecord'){
			context.dispatch('getwithdrawRecord');
		}
	}
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})