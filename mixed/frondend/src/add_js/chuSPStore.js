/*
 * 商户-已购商品种类
 * 链接地址：coopId=‘’ 为动态！需要动态取值
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	condatalist:'',//content数据
	chageSta:'',
}
const mutations={
	starAjax(state){
		Vue.http.post('/yich/checkBuyPro?coopId=2&status='+state.chageSta,{emulateJSON:true}).then((response) => {
			window.checkErrorVue(response);
			// 响应成功回调
			/*state.condatalist = response.data.list;*/
			if(response.data.list!="null"){
				mylist(response.data.list);
			}else{
				state.condatalist='';
			}
			}, (response) => {
				// 响应错误回调
		});
	}
}
const actions={
	starAjax(context){
		context.commit("starAjax");
	}
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})
function mylist(data){
	var _list = [];
	var json = {gosimg:'',gosname:'',godsno:'',cgnum:'',cgprice:'',minprice:'',maxprice:'',kcnum:'',gosta:''};
	for(var i in data){
		var mydata = data[i].product.shopInvtory;
		json.gosimg = data[i].product.proImage.src.replace("oss-","img-");
		json.gosname = data[i].product.pro_name;
		json.godsno = data[i].product.good_no;
		json.cgnum = data[i].buyNum;
		json.cgprice = data[i].totalPrice;
		json.minprice = data[i].smallPrice;
		json.maxprice = data[i].bigPrice;
		for(var j in mydata){
			json.kcnum += parseInt(mydata[j].pro_num);
		};
		if(mydata[0].wait_sell == 'PUT_AWAY'){
			json.gosta = '出售中';
		}else{
			json.gosta = '已下架';
		}
		_list.push(json);
	};
	if(_list.length!=0){
		state.condatalist = _list;
	}
	
}