/*采录单*/
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
	isHavalist:'',//是否有要采购的商品
	condatelist:'',//商品数据信息
	json:'',
	arrId:[],
}
/*const mutations = {
	searchAjax(state){
		var a =1;
		Vue.http.post("/yich/PurchaseList",{emulateJSON:true}).then((response)=>{
			 window.checkErrorVue(response);
		 	console.log(response.data);
		 	if(response.data.list){
		 		state.isHavalist = true;
		 		state.condatelist = mylist(response.data.list);
		 	}else{
		 		state.isHavalist = false;
		 		state.condatelist = '';
		 	}
		},(error) => {
			console.log("err");
		})
	}
}
const actions={
	searchAjax(context){
		context.commit("searchAjax");
	}
}*/

const mutations = {
	shopCart(state, bool){
		state.isHavalist = bool;
	},
	message(state, list){
		state.condatelist = list;
	}
}

const actions = {
	searchAjax(context){
		Vue.http.post("/yich/PurchaseList",{emulateJSON:true}).then((response)=>{
			window.checkErrorVue(response);
			if(response.data.list){
				context.commit('shopCart', true);
				context.commit('message', mylist(response.data.list));
			}else{
				context.commit('shopCart', false);
				context.commit('message', '');
			}
		},(error) => {
			console.log("err");
		})
	},
	deleteAjax(context,index){
		Vue.http.post("/yich/DeleteShopCartServlet",{shopCartId:context.state.arrId}).then((response)=>{
			window.checkErrorVue(response);
			context.state.arrId = [];
			if(state.condatelist[index.companyIndex].shopCart.length == 1){
				state.condatelist.splice(index.companyIndex,1);
			}else{
				state.condatelist[index.companyIndex].shopCart.splice(index.shopIndex,1);
			}
		},(error)=>{
			console.log("err");
		})
	}
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
})

function mylist(data){
	var _list = [];
	for(var i in data){
		var json = {shopCart:'',supshop_id:'',supshop_name:'',wangwang:''};
		json.shopCart = data[i].shopCart;
		json.supshop_id = data[i].supshop_id;
		json.supshop_name = data[i].supshop_name;
		json.wangwang = data[i].wangwang;
		_list.push(json);
	}
	return _list;
}