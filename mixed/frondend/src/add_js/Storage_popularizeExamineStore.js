/*
 * 仓储中心-公众号推广-我的报名-审核
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	au_id: '',
	advertisement_id: '',
	title: '',
	json: {},
	adUser: '',
}
const mutations={
	setData(state, res) {
		if(res && res.body) {
			var result = res.body;
			console.log(result);
			
			if(result.advertisementUser && result.advertisementUser.advertisement) {
				var aduser = state.adUser = result.advertisementUser;
				var adment = result.advertisementUser.advertisement;
				state.json = {
					onLine: adment.on_line?adment.on_line:'',
					explain: adment.explain?adment.explain:'',
					top_picture_src: adment.top_picture_src?adment.top_picture_src:'',
					advance_charge: !isNaN(adment.advance_charge)?adment.advance_charge.toFixed(2):'',
					unit_price: !isNaN(adment.unit_price)?adment.unit_price.toFixed(2):'',
					apply_start_time: adment.apply_start_time?adment.apply_start_time:'',
					apply_end_time: adment.apply_end_time?adment.apply_end_time:'',
					advertisement_start_time: adment.advertisement_start_time?adment.advertisement_start_time:'',
					advertisement_end_time: adment.advertisement_end_time?adment.advertisement_end_time:'',
					method:adment.method?adment.method:'',
					state: false,
					method:adment.method?adment.method:'',
				};

				state.title = adment.title?adment.title:'';
			}
		}
	},
	setAuId(state, au_id) {
		state.au_id = au_id;
	},
	setAdvertiseId(state, advertisement_id) {
		state.advertisement_id = advertisement_id;
	},
}
const actions={
	Ajax(context){
		let url = "/yich/EnrolmentdetailsServlet";
		let params = {
			state: "0",
			au_id: context.state.au_id,
			advertisement_id: context.state.advertisement_id,
		};
		Vue.http.post(url, params, {emulateJSON: true}).then(function(res) {
			window.checkErrorVue(res);
			context.commit('setData', res);
		}, function(error) {
			console.log(error);
		});
	},
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})