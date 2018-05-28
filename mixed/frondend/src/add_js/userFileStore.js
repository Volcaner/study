import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
	userid:window.location.href.split("userid=")[1],
	shopName:'',
	shopTel:'',
	coopId:'',//可随便写的
	applySta:'',//
	sumData:[{name:"订单笔数",num:0},
				{name:"订单金额",num:0},
				{name:"退款率",num:'0.00%'},
				{name:"纠纷率",num:'0.00%'},
				{name:"实时合作伙伴数",num:0}],
	nowData:[{name:"订单笔数",num:0},
				{name:"订单金额",num:0},
				{name:"退款率",num:'0.00%'},
				{name:"纠纷率",num:'0.00%'}],
	inviteStatus:'',//邀请按钮状态
	black:'',//是否黑名单状态
	userInfo:{},//头部信息
	datalist:{}, //交易数据
	conData:{},//查看记录数据
	dengj:"C",//等级
	dengjX:1,//等级
	/*year:"", //年月日
*/	uxyear:"", //选择查询年份
	uxmonth:"",//选择查询月份
	
	coopnum:0,//实时合作伙伴数
	arr:'',
	year:'',
	month:1,
	starMonth:'',//初始值
}
const mutations={
	ajaxData(state){
		Vue.http.post('/yich/uFileManagement?userid='+state.userid).then((response) => {
			window.checkErrorVue(response);
			// 响应成功回调
			window.checkErrorVue(response);
	    	var data = response.data;
	    	if(data.count){
	    		state.coopnum = data.count;
	    	}
	    	if(data.user_info.business){
	    		state.userInfo = data.user_info.business;
	    		state.shopName = data.user_info.business.name;
	    		state.dengj = data.user_info.business.level.split('-')[0];
		    	state.dengjX = parseInt(data.user_info.business.level.split('-')[1]);
		    	var landline_tel = data.user_info.business.landline_tel || '';
		    	if(landline_tel){
		    		if(landline_tel.charAt(0) == '-'){
	                	 landline_tel = landline_tel.substring(1);
	                 }
	                 if(landline_tel.charAt(landline_tel.length-1) == '-'){
	                	 landline_tel = landline_tel.substring(0, landline_tel.length-2);
	                 }
		    	}
		    	if(landline_tel && data.user_info.business.mobile){		    		
		    		state.shopTel = landline_tel+' / '+data.user_info.business.mobile;
		    	}else if(landline_tel){
		    		state.shopTel = landline_tel;
		    	}else if(data.user_info.business.mobile){
		    		state.shopTel = data.user_info.business.mobile;
		    	}else if(data.user_info.business.tel && data.user_info.business.tel !=''){
		    		state.shopTel = data.user_info.business.tel;
		    	}
	    	}
	    	if(data.user_info.appliyinfo){
	    		state.inviteStatus = data.user_info.appliyinfo.coopStatus;
	    		state.black = data.user_info.appliyinfo.black;
	    	}
	    	if(data.all_trade_data.shopStatistics){
	    		state.datalist = data.all_trade_data.shopStatistics;
		    	allData(state.sumData);
		    	nowData(state.nowData);
	    	}
			}, (response) => {
				// 响应错误回调
				console.log("error");
		});
		 
	},
	
	applyAjax(state){
		Vue.http.post('/yich/storageMaterialOpreta',{commit_opt:8,coopStatus:state.applySta,coopId:state.coopId,userId:state.userid,shop_name:state.shopName}).then((response) => {
			// 响应成功回调
			window.checkErrorVue(response);
			if(response.data.flag == "1"){
					state.inviteStatus = "V"
			}
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
		
	
}
const actions={
	ajaxData(context){
		context.commit('ajaxData');
	},
	searchAjax(context){
		context.commit('searchAjax');
	},
	applyAjax(context){
		context.commit('applyAjax');
	},
	tubline(context,c,json){
		Vue.http.post('/yich/fileMangementAjax',c,{emulateJSON:true}).then((response) => {
			window.checkErrorVue(response);
			  var a=response.data;
		       if(!json){
		    	 if(a.tody){
		    		 var time1=(a.tody).split("-")[0];
	 		    	 var time2=(a.tody).split("-")[1];
	 		    	context.state.year=time1;
	 		    	context.state.month=time2; 
		    	 }
		    	}
		     var json_zxt=[];
		     if(a.tradelist != "null"){
		       var b=a.tradelist;
		       if(b && b.length>0){
		    	   for(var j=0;j<b.length;j++){
		    		   var d={};
		    		   d.name=((b[j].tra_pay_time).split("-"))[1]+"/"+((b[j].tra_pay_time).split("-"))[2];
		    		   d.value=b[j].payment;
		    		 json_zxt.push(d);
		    	   };
		       }
		}
		     context.state.arr=json_zxt;
		     window.linechar(context.state.arr);  
		  }, (response) => {
		   console.log('error');
	 });
	},
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
})

function allData(data){
	 for(var i in data){
			if(data[i].name == "订单笔数"){
				if(state.datalist.sale_shop){
					data[i].num = state.datalist.sale_shop;
				}
			}else if(data[i].name == "订单金额"){
				if(state.datalist.trade_money){
					data[i].num = state.datalist.trade_money;
				}
			}else if(data[i].name == "退款率"){
				if(state.datalist.sale_shop && state.datalist.retNum){
					data[i].num =((parseInt(state.datalist.retNum)/parseInt(state.datalist.sale_shop))*100).toFixed(2)+"%";
				}
			}else if(data[i].name == "纠纷率"){
				if(state.datalist.sale_shop && state.datalist.artNum){
					data[i].num = ((parseInt(state.datalist.artNum)/parseInt(state.datalist.sale_shop))*100).toFixed(2)+"%";
				}
			}else if(data[i].name == "实时合作伙伴数"){
				data[i].num = state.coopnum;
			}
		}
};
function nowData(data){
	 for(var i in data){
			if(data[i].name == "订单笔数"){
				if(state.datalist.traThreeNum){
					data[i].num = state.datalist.traThreeNum;
				}
			}else if(data[i].name == "订单金额"){
				if(state.datalist.traThreeMoney){
					data[i].num = state.datalist.traThreeMoney;
				}
			}else if(data[i].name == "退款率"){
				if( state.datalist.retThreeNum && state.datalist.retThreeNum){
					data[i].num = ((parseInt(state.datalist.retThreeNum)/parseInt(state.datalist.traThreeNum))*100).toFixed(2)+"%";
				}
			}else if(data[i].name == "纠纷率"){
				if( state.datalist.retThreeNum && state.datalist.artThreeNum){
					data[i].num = ((parseInt(state.datalist.artThreeNum)/parseInt(state.datalist.traThreeNum))*100).toFixed(2)+"%";
				}
			}
		}
};