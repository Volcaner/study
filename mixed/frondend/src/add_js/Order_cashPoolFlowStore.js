import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
	allpage:1,  // 总页数	
	nowpage:1,  // 当前显示的页数
	option: 'A',  // 资金流向 A:所有 I:收入 O:支出
	startTime: '',  // 开始时间
	endTime: '',  // 结束时间
	type: '0',  // 交易类型 0:所有 1:充值 2:预存卡 3:购买商品 4:预缴推广费 5:提现
	mp: {
		money: '0',  // 资金池余额
		balance: '0',  // 账户余额
		goods_payment: '0',  // 货品押款
		promotion_fee: '0',  // 推广费押款
	},
	mprList: [
		{
			operate_time: '',  // 创建时间
			type: '',  // 交易类型
			alipay_num: '',  // 交易号
			user_id: '',  // 对象
			amount: '',  // 金额  12345 +; 67 -
			// 交易状态: '交易成功'
		}
	],
	inCash: '0',
	outCash: '0',
};

const mutations = {
	page(state, n){
		state.nowpage = n.page;
	},
	setOption(state, op) {
		state.option = op;
	},
	setType(state, type) {
		state.type = type;
	},
	setStartTime(state, time) {
		state.startTime = time;
	},
	setEndTime(state, time) {
		state.endTime = time;
	},
	setData(state, res) {
		console.log(res);
		if(res && res.body) {
			let result = res.body;
			state.allpage = result.PageCount;
			state.mp = result.mp;
			state.inCash = result.in;
			state.outCash = result.out;
			state.mprList = [];
			if(result.mprList && result.mprList.length > 0) {
				for(let i = 0; i < result.mprList.length; i++) {
					var mpr = result.mprList[i];

					switch(mpr.type) {
						case '1': {
							mpr.type = "购买商品";
							mpr.amount = "+" + mpr.amount;
							mpr.addsta = "add";
							break;
						}
						case '2': {
							mpr.type = "余额充值";
							mpr.amount = "+" + mpr.amount;
							mpr.addsta = "add";
							break;
						}
						case '3': {
							mpr.type = "购买预存卡";
							mpr.amount = "+" + mpr.amount;
							mpr.addsta = "add";
							break;
						}
						case '4': {
							mpr.type = "预交推广费";
							mpr.amount = "+" + mpr.amount;
							mpr.addsta = "add";
							break;
						}
						case '5': {
							mpr.type = "购买商品";
							mpr.amount = "+" + mpr.amount;
							mpr.addsta = "add";
							break;
						}
						case '6': {
							mpr.type = "提现";
							mpr.amount = "-" + mpr.amount;
							mpr.addsta = "dec";
							break;
						}
						case '7': {
							mpr.type = "提现手续费";
							mpr.amount = "-" + mpr.amount;
							mpr.addsta = "dec";
							break;
						}
						default: {
							break;
						}
					}

					state.mprList.push(mpr);
					
				}
				console.log(state.mprList)
			}
		}
	},
};

const actions = {
	Ajax(context){
		var url = '/yich/MoneyPoolServlet';
		var params= {
			option: context.state.option,
			startTime: context.state.startTime,
			endTime: context.state.endTime,
			type: context.state.type,
			page: context.state.nowpage
		};
		Vue.http.post(url, params, {emulateJSON: true})
			.then((res) => {
				window.checkErrorVue(res);
				context.commit('setData', res);
			})
	},
};

export default  new Vuex.Store({
	state,
	mutations,
	actions
});