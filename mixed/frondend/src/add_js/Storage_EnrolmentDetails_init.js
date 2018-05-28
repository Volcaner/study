import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
		    yr:false,//是否是预热
			onLine:'Y',//线上 线下
			title:'',//标题
			explain:'',//说明
			top_picture_src:'',//页头图
			yytg_fei:'',//预缴推广费
			danjia:'',//单价
			bm_starttime:'',//报名开始时间
			bm_endtime:'',//报名结束时间
			tg_starttime:'',//推广开始时间
			tg_endtime:'',//推广结束时间
			method:'',//推广方式
			json:'',  //报名要求组件
		    json2:'',//报名详情组件
		    model_show:false,//模态框显示
		    timeshow:false,
		    time_text:'',
		    protocolShow:false,//协议模态显示
 }
const mutations = {
	    
}
const actions={
		Ajax(context){
			var queryJson = {};
			var urlSearch=location.search;
			console.log(urlSearch);
			if(urlSearch.length>0){
					var arr = urlSearch.substring(1,urlSearch.length).split("&");
					for(var i in arr){
						var n = arr[i].indexOf("=");
						var key = arr[i].substring(0,n);
						var val = arr[i].substring(n+1,arr[i].length);
						queryJson[key] = val;
					}
			}
			 var j={};
			    j.advertisementId=queryJson.advertisement_id;
			Vue.http.post('/yich/AdvertisementDetailsServlet',j,{emulateJSON:true})
			.then((response)=>{
				window.checkErrorVue(response);
				var nowtime=response.data.now;
				var starttime=response.data.advertisement.apply_start_time;
				var endtime=response.data.advertisement.apply_end_time;
				
				nowtime = nowtime.replace(new RegExp("-","gm"),"/");
			    var now_timeHaoMiao = (new Date(nowtime)).getTime(); //得到毫秒数
			    
			    starttime = starttime.replace(new RegExp("-","gm"),"/");
			    var start_timeHaoMiao = (new Date(starttime)).getTime(); //得到毫秒数
			    
			    endtime = endtime.replace(new RegExp("-","gm"),"/");
			    var end_timeHaoMiao = (new Date(endtime)).getTime(); //得到毫秒数
			    if(now_timeHaoMiao<start_timeHaoMiao){
			    	context.state.timeshow=true;
			    	context.state.time_text='报名未开始!';
			    }else if(now_timeHaoMiao>end_timeHaoMiao){
			    	context.state.timeshow=true;
			    	context.state.time_text='报名已结束!';
			    }
				
				if(typeof response.data.advertisementUser!='undefined'){
					context.state.model_show=true;
				}
				 if(typeof response.data.advertisement!='undefined'){
					 if(typeof response.data.advertisement.method!='undefined'){
						 context.state.method=response.data.advertisement.method;
					 }
					 
					 if(typeof response.data.advertisement.on_line!='undefined'){
						 context.state.onLine=response.data.advertisement.on_line;
					 }
					 if(typeof response.data.advertisement.title!='undefined'){
						 context.state.title=response.data.advertisement.title;
					 }
					 if(typeof response.data.advertisement.explain!='undefined'){
						 context.state.explain=response.data.advertisement.explain;
					 }
					 if(typeof response.data.advertisement.top_picture_src!='undefined'){
						 context.state.top_picture_src=response.data.advertisement.top_picture_src;
					 }
					 if(typeof response.data.advertisement.advance_charge!='undefined'){
						 context.state.yytg_fei=response.data.advertisement.advance_charge;
					 }
					 if(typeof response.data.advertisement.unit_price!='undefined'){
						 context.state.danjia=response.data.advertisement.unit_price;
					 }
					 if(typeof response.data.advertisement.apply_start_time!='undefined'){
						 context.state.bm_starttime=response.data.advertisement.apply_start_time;
					 }
					 if(typeof response.data.advertisement.apply_end_time!='undefined'){
						 context.state.bm_endtime=response.data.advertisement.apply_end_time;
					 }
					 if(typeof response.data.advertisement.advertisement_start_time!='undefined'){
						 context.state.tg_starttime=response.data.advertisement.advertisement_start_time;
					 }
					 if(typeof response.data.advertisement.advertisement_end_time!='undefined'){
						 context.state.tg_endtime=response.data.advertisement.advertisement_end_time;
					 }
					 }
					 var json={};
					 json.onLine=context.state.onLine;//线上线下
					 json.explain=context.state.explain;//说明
					 json.top_picture_src=context.state.top_picture_src;//页头图
					 json.advance_charge=context.state.yytg_fei;//预缴费用
					 json.unit_price=context.state.danjia;//单价
					 json.apply_start_time=context.state.bm_starttime;//报名开始时间
					 json.apply_end_time=context.state.bm_endtime;//报名结束时间
					 json.advertisement_start_time=context.state.tg_starttime;//推广开始时间
					 json.advertisement_end_time=context.state.tg_endtime;//推广结束时间
					 json.state=context.state.yr;//是否是预热
					 json.method=context.state.method;
					 context.state.json=json;
					 var json2={};
					 json2.option='';
					 json2.bq='';//标签
					 json2.tg='';//选择的标签
					 json2.advance_charge='';//预缴费用
					 json2.dz='';//地址
					 json2.advertisement_id='';//id
					 json2.supId='';
					 if(typeof response.data.supshop_id!='undefined'){
						 json2.supId=response.data.supshop_id;
					 }
					 if(typeof response.data.supplierShop.publicSignalList!='undefined' && response.data.supplierShop.publicSignalList.length>0){
						 json2.option=response.data.supplierShop.publicSignalList;
					 }
					 if(typeof response.data.advertisement.advertisementTagList!='undefined' && response.data.advertisement.advertisementTagList.length>0){
						 json2.bq=response.data.advertisement.advertisementTagList;
					 }
					 if(typeof response.data.tagList!='undefined' && response.data.tagList.length>0){
						 json2.tg=response.data.tagList;
					 }else{
						 json2.tg=[];
					 }
					 if(typeof response.data.advertisement.advance_charge!='undefined'){
						 json2.advance_charge=response.data.advertisement.advance_charge;
					 }
					 if(typeof response.data.supplierShop.factory_address!='undefined'){
						 json2.dz=response.data.supplierShop.factory_address;
					 }
					 if(typeof response.data.advertisement.advertisement_id!='undefined'){
						 json2.advertisement_id=response.data.advertisement.advertisement_id;
					 }
					 console.log(66666666);
					 console.log(json2.option);
					 context.state.json2=json2;
					 
			},(response)=>{
			})
		}
	}
export default new Vuex.Store({
	state,
	mutations,
	actions
 })
