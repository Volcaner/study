import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
	label:'可报名的推广',
	isModalDisplay:false,
	isModalDoubleDisplay:false,
	auditState:'K',//审核状态：所有K、待审核A、审核通过S、未通过L
	page:1,//当前页
	allpage:1,//总页数
	pagesize:5,//每页数据，根据需求自己设定
	myPopularizeState:'K',//我的推广状态：所有K、推广中S、推广结束E
	myEnrollList:[],//我的报名List
	showfenye:true,
	popularizeActive:'L',//可报名的推广:所有L、预热中P、报名中A
	canEnrollList:[],//可报名的List
	myPopularizeList:[],//我的推广List
	auid:'',
 }
const mutations = {
	page(state,n){
		state.page=n.page;
	},
	enrollList(state,list){
		state.myEnrollList = list;
	},
	canEnrollList(state,list){
		state.canEnrollList = list;
	},
	myList(state,list){
		state.myPopularizeList = list;
	},
}

const actions={
	Ajax(context){
		if(context.state.label == '可报名的推广'){
			Vue.http.post('/yich/EnrolmentServlet?state='+context.state.popularizeActive+'&page='+context.state.page+'&pagesize='+context.state.pagesize)
			.then((res) =>{
				window.checkErrorVue(res);
				context.state.allpage = res.data.totalPages;
				if(res.data.advertisementList && res.data.advertisementList.length>0){
					var arr = [];
					res.data.advertisement = res.data.advertisementList;
					for(var i=0; i<res.data.advertisement.length; i++){
						var json = {};
						json.on_line = res.data.advertisement[i].on_line;
						json.popularizeType = res.data.advertisement[i].on_line == 'Y' ? '线上推广':'线下推广';
						json.popularizeActiveState = res.data.advertisement[i].state;
						json.popularizeActiveText = res.data.advertisement[i].state == 'P'?'预热中':res.data.advertisement[i].state == 'A'?'报名中':'';
						json.popularizeStartTime = res.data.advertisement[i].advertisement_start_time + '到' + res.data.advertisement[i].advertisement_end_time;
						json.popularizeEnrollTime = res.data.advertisement[i].apply_start_time + '到' + res.data.advertisement[i].apply_end_time;
						json.imgPic = imgchange(res.data.advertisement[i].main_image_src,'@250w_130h');
						json.popularizeTitle = res.data.advertisement[i].title;
						json.popularizeBrowserType = res.data.advertisement[i].method;
						json.popularizeExplain = res.data.advertisement[i].explain;
						json.popularizeOperate = res.data.advertisement[i].state == 'P'?'预热中':res.data.advertisement[i].state == 'A'?'立即报名':'';
						json.advertisement_id=res.data.advertisement[i].advertisement_id;
						arr.push(json);
					}
					context.commit('canEnrollList',arr);
				}else{
					context.commit('canEnrollList','');
				}
			},(error) =>{
				
			});
		}else if(context.state.label == '我的报名'){
			Vue.http.post('/yich/MyregistrationServlet?state='+context.state.auditState+'&page='+context.state.page+'&pagesize='+context.state.pagesize)
			.then((res) =>{
				window.checkErrorVue(res);
				context.state.allpage = res.data.totalpages;
				if(res.data.advertisement && res.data.advertisement.length>0){
					var arr = [];
					for(var i=0; i<res.data.advertisement.length; i++){
						var json = {};
						json.on_line = res.data.advertisement[i].advertisement.on_line;
						json.popularizeType = res.data.advertisement[i].advertisement.on_line == 'Y' ? '线上推广':'线下推广';
						json.popularizeAuditState = res.data.advertisement[i].state;
						json.auditText = res.data.advertisement[i].state == 'A'?'待审核':res.data.advertisement[i].state == 'S'?'审核通过':res.data.advertisement[i].state == 'L'?'未通过':'';
						if(res.data.advertisement[i].tags){
							json.tags = res.data.advertisement[i].tags.join('、');
						}else{
							json.tags ='';
						}
						json.popularizeStartTime = res.data.advertisement[i].advertisement.advertisement_start_time + '到' + res.data.advertisement[i].advertisement.advertisement_end_time;
						json.popularizeEnrollTime = res.data.advertisement[i].advertisement.apply_start_time + '到' + res.data.advertisement[i].advertisement.apply_end_time;
						json.imgPic = imgchange(res.data.advertisement[i].main_image_src,'@250w_130h');
						json.popularizeTitle = res.data.advertisement[i].advertisement.title;
						json.popularizeBrowserType = res.data.advertisement[i].advertisement.method;
						json.popularizePaid = res.data.advertisement[i].advertisement.advance_charge;
						json.popularizeLimit = res.data.advertisement[i].top_price;
						json.advertisementId = res.data.advertisement[i].advertisement_id;
						json.auId = res.data.advertisement[i].au_id;
						arr.push(json);
					}
					context.commit('enrollList',arr);
				}else{
					context.commit('enrollList','');
				}
			},(error) =>{
				
			});
		}else if(context.state.label == '我的推广'){
			Vue.http.post('/yich/MyadvertServlet?state='+context.state.myPopularizeState+'&page='+context.state.page+'&pagesize='+context.state.pagesize)
			.then((res) =>{
				window.checkErrorVue(res);
				context.state.allpage = res.data.totalpages;
				if(res.data.advertisement && res.data.advertisement.length>0){
					var arr = [];
					for(var i=0; i<res.data.advertisement.length; i++){
						var json = {};
						json.on_line = res.data.advertisement[i].advertisement.on_line;
						json.normal = res.data.advertisement[i].state_or;
						json.popularizeType = res.data.advertisement[i].advertisement.on_line == 'Y' ? '线上推广':'线下推广';
						json.popularizeMyPopularizeState = res.data.advertisement[i].advertisement.state;
						json.myPopularizeText = res.data.advertisement[i].advertisement.state == 'S'?'推广中':res.data.advertisement[i].advertisement.state == 'E'?'推广结束':'';
						if(res.data.advertisement[i].tags){
							json.tags = res.data.advertisement[i].tags.join('、');
						}else{
							json.tags ='';
						}
						json.popularizeStartTime = res.data.advertisement[i].advertisement.advertisement_start_time + '到' + res.data.advertisement[i].advertisement.advertisement_end_time;
						json.imgPic = imgchange(res.data.advertisement[i].main_image_src,'@250w_130h');
						json.popularizeTitle = res.data.advertisement[i].advertisement.title;
						json.popularizeBrowserType = res.data.advertisement[i].advertisement.method;
						json.phoneNum = res.data.advertisement[i].advertisement.phonenum;
						json.popularizeConsumePre = res.data.advertisement[i].sumdeposit?res.data.advertisement[i].sumdeposit:0;
						json.popularizeConsumeAccount = res.data.advertisement[i].sumpayment?res.data.advertisement[i].sumpayment:0;
						json.popularizeConsume = (parseFloat(json.popularizeConsumePre) + parseFloat(json.popularizeConsumeAccount)).toFixed(2);
						json.auId = res.data.advertisement[i].au_id;
						json.advertisementId = res.data.advertisement[i].advertisement_id;
						json.unitPrice = res.data.advertisement[i].advertisement.unit_price;
						arr.push(json);
					}
					context.commit('myList',arr);
				}else{
					context.commit('myList','');
				}
			},(error) =>{
				
			});
		}else{
			alert('参数错误，请刷新');
		}
	}
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  //getters
})

