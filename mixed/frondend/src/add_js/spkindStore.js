/*
 * 已购商品种类
 * 链接地址：coopId=‘’ 为动态！需要动态取值
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	condatalist:'',//content数据
	chageSta:'',
	page:1, //页码
	zonPage:1,//总页码数
	showFeny:true, //是否显示分页
}
const mutations={
	page(state,obj){//页码
		state.page=obj.page;
	},
	starAjax(state){
		var supShopId = _getReg("supShopId");
		var userId = _getReg("userId");
		Vue.http.post('/yich/checkBuyPro?supshopId='+supShopId+'&userId='+userId+'&status='+state.chageSta+'&page='+state.page).then((response) => {
				// 响应成功回调
			 window.checkErrorVue(response);
				/*state.condatalist = response.data.list;*/
				if(response.data.totalpage<1){
					state.showFeny = false;
					state.zonPage = 1;
				}else{
					state.showFeny = true;
					state.zonPage = response.data.totalpage;
				};
				if(response.data.list != 'null'){
					mylist(response.data.list);
				}else{
					state.condatalist='';
				}
				
			}, (response) => {
				// 响应错误回调
		});
	},

}
const actions={
	starAjax(context){
		context.commit("starAjax");
	},
	//分页-请求数据
	Ajax(context){
			context.commit("starAjax");
	},
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})
function mylist(data){
	var _list = [];
	var addkc = 0;
	for(var i in data){
		var json = {gosimg:'',gosname:'',godsno:'',cgnum:'',cgprice:'',minprice:'',maxprice:'',kcnum:'',gosta:'',purcId:'',proId:''};
		var mydata = data[i].product.shopInvtory;
		json.gosimg = imgchange((data[i].product.proImage.src),"@78w_78h");
		json.gosname = data[i].product.pro_name;
		json.godsno = data[i].product.good_no;
		json.cgnum = data[i].buyNum;
		json.cgprice = data[i].totalPrice;
		json.minprice = data[i].smallPrice;
		json.maxprice = data[i].bigPrice;
		json.purcId = data[i].purcId;
		json.proId = data[i].proId;
		for(var j in mydata){
			addkc += parseInt(mydata[j].pro_num);
		};
		json.kcnum = addkc;
		if(mydata[0].wait_sell == 'PUT_AWAY'){
			json.gosta = '出售中';
		}else if(mydata[0].wait_sell == 'WAIT_PUT_AWAY'){
			json.gosta = '已下架';
		}else {
			json.gosta = '商品已被删除';
		}
		_list.push(json);
		addkc = 0;
	};
	if(_list.length!=0){
		state.condatalist = _list;
	}
	
}

//截取超链接数据
function _getReg(name) {
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null) return  unescape(r[2]); return '';
}