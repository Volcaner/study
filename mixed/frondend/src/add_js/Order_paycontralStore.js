import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
	nowpage:1,//当前显示的页数
	allpage:0,//总页数
	searchinput:'',
	data:[
	      /*{
	    	  createtime:'2016-12-18 18:39',
	    	  name:'阿斯达撒的撒大声地',
	    	  showmany:true,//是否显示等多件
	    	  dealnumber:'12312313123123',//交易号
	    	  paytype:'支付宝',
	    	  paymoney:'300.00',
	    	  paystate:'未支付',
	    	  dealstate:'已支付',
	      },
	      {
	    	  createtime:'2016-12-18 18:39',
	    	  name:'阿斯达asddddddddasd撒的撒大声地',
	    	  showmany:false,//是否显示等多件
	    	  dealnumber:'12312313123123',//交易号
	    	  paytype:'支付宝',
	    	  paymoney:'300.00',
	    	  paystate:'已支付',
	    	  dealstate:'已支付',
	      },*/
	]
}
const mutations = {		
	page(state,n){
		state.nowpage=n.page;
	},
	jiazai(state,response){
		state.allpage=response.body.totalPages;
		state.data.splice(0);
		var list=response.body.list;
		var json=[];
		for(var k in list){
			let paytype=list[k].paymentMethod;
			paytype=paytype=='X'?'微信支付':paytype=='Y'?'支付宝支付 ':paytype=='Z'?'银行卡支付':paytype=='W'?'现金支付':paytype=='P'?'预存卡支付':'暂无';
			let paystate=list[k].payStatus;
			paystate=paystate=='NEW'?'未支付':paystate=='SUCCESS'?'已支付':'无数据';
			/*支付状态和交易状态因为后台同步关系，所以相等*/
			var j={};
			j.isshow=true;
			j.createtime='';
			j.name='暂无';
			j.showmany=false;
			j.dealnumber='';
			j.paytype=paytype;
			j.paystate=paystate;
			j.dealstate=paystate;
			if(typeof (list[k].gmtCreate)!='undefined'){
				j.createtime=list[k].gmtCreate;
			}
			if(typeof (list[k].payTitle)!='undefined' && list[k].payTitle.length>0){
				j.name=list[k].payTitle;
				if(list[k].yichPayType == '3'){
					j.name = '拼团-'+ j.name;
				}else if(list[k].yichPayType == '6'){
					j.name = '转售-'+ j.name;
				}
			}
			if(typeof (list[k].payTitle)!='undefined'){
				if(list[k].payTitle.length>1){
					j.showmany=true;
				}else{
					j.showmany=false;
				}
			}
			if(typeof (list[k].alipayNum)!='undefined'){
				j.dealnumber=list[k].alipayNum;
			}
			if(typeof (list[k].totalFee)!='undefined'){
				j.paymoney=list[k].totalFee;
			}
			json.push(j);
			//json.push({isshow:true,createtime:list[k].operTime,name:list[k].titles[0],showmany:list[k].titles.length>1?true:false,dealnumber:list[k].alipayNum,paytype:paytype,paymoney:list[k].payPrice,paystate:paystate,dealstate:paystate})
		}
		state.data=json;
	}
}
const actions={
	Ajax(context){
		Vue.http.post('/yich/OrderPayment',{ordernum:context.state.searchinput,page:context.state.nowpage})
		.then((response)=>{
			window.checkErrorVue(response);
			context.commit('jiazai',response);
		},(error)=>{
			
		});
	}
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})