import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
	nowpage:1,//当前显示的页数
	allpage:1,//当前的总页数
	state:'s1',//当前的展示nav页
	s1:{
		state:'t1',//t1待审核 t2 记录
		num:{left:'',right:''},
		list1:[],//待审核{imgurl,title,sku,bname,wangwangurl,wangwangimg,price,allNum,createTime,groupId,isshow,detailsurl}
		list2:[],//记录{imgurl,title,sku,bname,wangwangurl,wangwangimg,createTime,status,checkTime,groupId,isshow,detailsurl}
	},
	s2:{
		list:[],//{imgurl,title,sku,bname,wangwangurl,wangwangimg,startTime,amount,distance,isopen,timer,showtime,groupId,isshow,detailsurl,tuanurl}
	},
	s3:{
		list:[],//{imgurl,title,sku,bname,wangwangurl,wangwangimg,startTime,endTime,succtype,status,distance,timer,showtime,groupId,isshow,adjusturl,tuanurl}
	},
	s4:{
		list:[],//{imgurl,title,sku,bname,wangwangurl,wangwangimg,startTime,endTime,overtype,status,createTime,isshow,detailsurl}
	},
}
const mutations = {		
	page(state,n){
		state.nowpage=n.page;
	},
	s1t1(state,response){
		state.allpage=response.body.totalPage;
		state.s1.num.left=response.body.count1;
		state.s1.num.right=response.body.count2;
		state.s1.list1.splice(0);
		var list=response.body.list;
		for(let key in list){
			let imgurl=window.imgchange(list[key].mainSrc,'@80w_80h');
			let title=list[key].proName;
			let sku=list[key].goodNo;
			let bname=list[key].sup.supshop_name;
			/*let bname=list[key].business.name;*/
			let wangwangurl=list[key].wangwang?'http://www.taobao.com/webww/ww.php?ver=3&touid='+list[key].wangwang+'&siteid=cntaobao&status=2&charset=utf-8':'';
			let wangwangimg=list[key].wangwang?'http://amos.alicdn.com/realonline.aw?v=2&uid='+list[key].wangwang+'&site=cntaobao&s=2&charset=utf-8':'';
			let price=parseFloat(list[key].allPrice).toFixed(2);
			let allNum=list[key].allNum;
			let createTime=list[key].creatTime||'';
			let groupId=list[key].groupId;
			let isshow=true;
			let homeurl = '/yich/GoodInfo?proid=' + list[key].proId;
			let detailsurl='/yich/User/User_details.html?groupId='+list[key].groupId;
			state.s1.list1.push({homeurl:homeurl,imgurl:imgurl,title:title,sku:sku,bname:bname,wangwangurl:wangwangurl,wangwangimg:wangwangimg,price:price,allNum:allNum,createTime:createTime,groupId:groupId,isshow:isshow,detailsurl:detailsurl})
		}
	},
	s1t2(state,response){
		state.allpage=response.body.totalPage;
		state.s1.num.left=response.body.count1;
		state.s1.num.right=response.body.count2;
		state.s1.list2.splice(0);
		var list=response.body.list;
		for(let key in list){
			let imgurl=window.imgchange(list[key].mainSrc,'@80w_80h');
			let title=list[key].proName;
			let sku=list[key].goodNo;
			let bname=list[key].sup.supshop_name;
			/*let bname=list[key].business.name;*/
			let wangwangurl=list[key].wangwang?'http://www.taobao.com/webww/ww.php?ver=3&touid='+list[key].wangwang+'&siteid=cntaobao&status=2&charset=utf-8':'';
			let wangwangimg=list[key].wangwang?'http://amos.alicdn.com/realonline.aw?v=2&uid='+list[key].wangwang+'&site=cntaobao&s=2&charset=utf-8':'';
			let createTime=list[key].creatTime||'';
			let status=list[key].status;
				status=status=='1'?'审核被拒绝':status=='2'?'审核通过':'审核';
			let checkTime=list[key].auditingTime||'';	
			let groupId=list[key].groupId;
			let isshow=true;
			let homeurl = '/yich/GoodInfo?proid=' + list[key].proId;
			let detailsurl='/yich/User/User_details.html?groupId='+list[key].groupId;
			state.s1.list2.push({homeurl:homeurl,imgurl:imgurl,title:title,sku:sku,bname:bname,wangwangurl:wangwangurl,wangwangimg:wangwangimg,createTime:createTime,status:status,checkTime:checkTime,groupId:groupId,isshow:isshow,detailsurl:detailsurl})
		}
		
	},
	s2(state,response){
		state.allpage=response.body.totalPage;
		for(let key in state.s2.list){//将上一次的定时器清除
			if(state.s2.list[key].timer){
				clearInterval(state.s2.list[key].timer);
				state.s2.list[key].timer=null;
			}
		}
		state.s2.list.splice(0);
		var list=response.body.list;
		for(let key in list){
			let imgurl=window.imgchange(list[key].mainSrc,'@80w_80h');
			let title=list[key].proName;
			let sku=list[key].goodNo;
			let bname=list[key].sup.supshop_name;
			let wangwangurl=list[key].wangwang?'http://www.taobao.com/webww/ww.php?ver=3&touid='+list[key].wangwang+'&siteid=cntaobao&status=2&charset=utf-8':'';
			let wangwangimg=list[key].wangwang?'http://amos.alicdn.com/realonline.aw?v=2&uid='+list[key].wangwang+'&site=cntaobao&s=2&charset=utf-8':'';
			let startTime=list[key].auditingTime ||'';
			let amount=list[key].surplusStock;
			let distance=parseInt(list[key].diftime);
			let isopen=list[key].isDisplay=='1'?'是':'否';
			let timer=null;
			let showtime='';
			let groupId=list[key].groupId;
			let isshow=true;
			let homeurl = '/yich/GoodInfo?proid=' + list[key].proId;
			let detailsurl='/yich/User/User_fightGroupDoing.html?groupId='+list[key].groupId;
			let tuanurl='/yich/SpellDetailsPage?groupId='+list[key].groupId;
			state.s2.list.push({homeurl:homeurl,imgurl:imgurl,title:title,sku:sku,bname:bname,wangwangurl:wangwangurl,wangwangimg:wangwangimg,startTime:startTime,amount:amount,distance:distance,isopen:isopen,timer:timer,showtime:showtime,groupId:groupId,isshow:isshow,detailsurl:detailsurl,tuanurl:tuanurl})
		}
		for(let key in state.s2.list){
			(function(list){
				list.showtime=window.getDistenceTime(list.distance);
				list.distance-=1000;
				list.timer=setInterval(function(){
					if(isNaN(list.distance)||list.distance<=0){
						clearInterval(list.timer);
						list.timer=null;
						
						var groupId=state.s2.list[key].groupId;
						Vue.http.post('/yich/GroupAdvanceSuccessServlet',{groupId:groupId,type:1})
						.then((response)=>{
							window.checkErrorVue(response);
							if(response.body.res!=='0'){//成功
								state.s2.list[key].isshow=false;
								//this.modal={index:'',dowhat:''}
							}else{
								alert('服务器开小差啦，请重试');
								//this.modal={index:'',dowhat:''}
							}
						},(response)=>{
							
						})
					}
					list.showtime=window.getDistenceTime(list.distance);
					list.distance-=1000;
				}.bind(this),1000)
			})(state.s2.list[key])
		}
	},
	s3(state,response){
		for(let key in state.s3.list){//将上一次的定时器清除
			if(state.s3.list[key].timer){
				clearInterval(state.s3.list[key].timer);
				state.s3.list[key].timer=null;
			}
		}
		state.allpage=response.body.totalPage;
		state.s3.list.splice(0);
		var list=response.body.list;
		for(let key in list){
			let imgurl=window.imgchange(list[key].mainSrc,'@80w_80h');
			let title=list[key].proName;
			let sku=list[key].goodNo;
			let bname=list[key].sup.supshop_name;
			let wangwangurl=list[key].wangwang?'http://www.taobao.com/webww/ww.php?ver=3&touid='+list[key].wangwang+'&siteid=cntaobao&status=2&charset=utf-8':'';
			let wangwangimg=list[key].wangwang?'http://amos.alicdn.com/realonline.aw?v=2&uid='+list[key].wangwang+'&site=cntaobao&s=2&charset=utf-8':'';
			let startTime=list[key].auditingTime||'';
			let endTime=list[key].endTime||'';
			let succtype=list[key].type;
			succtype=succtype=='0'?'拼团失败':succtype=='1'?'拼团成功':succtype=='2'?'提前接单':succtype=='3'?'待确定':succtype=='4'?'到期末拼成':'未知';
			let status=list[key].status;//3为待调剂，4为调剂结束，其他不管
			let swapStatus = list[key].swapStatus;
			let distance=parseInt(list[key].diftime)||0;
			let timer=null;
			let showtime='';
			let groupId=list[key].groupId;
			let isshow=true;
			let homeurl = '/yich/GoodInfo?proid=' + list[key].proId;
			let adjusturl='/yich/User/User_Swap.html?groupId='+list[key].groupId;
			let tuanurl='/yich/SpellDetailsPage?groupId='+list[key].groupId;
			let detailsurl='/yich/User/User_fightGroupAdmin.html?groupId='+list[key].groupId;
			let sup_supshopId = list[key].sup?list[key].sup.supshop_id:'';
			let sup_userId = list[key].sup?list[key].sup.user_id:'';
			state.s3.list.push({homeurl:homeurl,imgurl:imgurl,title:title,sku:sku,bname:bname,wangwangurl:wangwangurl,wangwangimg:wangwangimg,startTime:startTime,endTime:endTime,succtype:succtype,status:status,swapStatus:swapStatus,distance:distance,timer:timer,showtime:showtime,groupId:groupId,isshow:isshow,adjusturl:adjusturl,tuanurl:tuanurl,detailsurl:detailsurl,sup_supshopId:sup_supshopId,sup_userId:sup_userId});
		}
		for(let key in state.s3.list){
			(function(list){
				list.showtime=window.getDistenceTime(list.distance);
				list.distance-=1000;
				list.timer=setInterval(function(){
					if(isNaN(list.distance)||list.distance<=0){
						clearInterval(list.timer);
						list.timer=null;
						
						//生成订单方法
						var groupId=state.s3.list[key].groupId;
						var status=state.s3.list[key].status;
						var supshopId=state.s3.list[key].sup_supshopId;
						var userId=state.s3.list[key].sup_userId;
						Vue.http.post('/yich/GroupGenerateOrderServlet',{option:'1',groupId:groupId,status:status,supshopId:supshopId,userid:userId})
						.then((response)=>{
							window.checkErrorVue(response);
							if(response.body.traRes>0){//成功
								state.s3.list[key].isshow=false;
								// this.modal={index:'',dowhat:''}
							}else if("nogroup" == response.body.traRes){
								//this.domodal(this.modal.index,"nogroup");
								var groupId=state.s3.list[key].groupId;
								Vue.http.post('/yich/VoidGroupServlet',{groupId:groupId})
							}else{
								alert('服务器开小差啦，请重试');
								// this.modal={index:'',dowhat:''}
							}
						},(response)=>{
							
						})
					}
					list.showtime=window.getDistenceTime(list.distance);
					list.distance-=1000;
				}.bind(this),1000)
			})(state.s3.list[key])
		}
	},
	s4(state,response){
		state.allpage=response.body.totalPage;
		state.s4.list.splice(0);
		var list=response.body.list;
		for(let key in list){
			let imgurl=window.imgchange(list[key].mainSrc,'@80w_80h');
			let title=list[key].proName;
			let sku=list[key].goodNo;
			let bname=list[key].sup.supshop_name;
			let wangwangurl=list[key].wangwang?'http://www.taobao.com/webww/ww.php?ver=3&touid='+list[key].wangwang+'&siteid=cntaobao&status=2&charset=utf-8':'';
			let wangwangimg=list[key].wangwang?'http://amos.alicdn.com/realonline.aw?v=2&uid='+list[key].wangwang+'&site=cntaobao&s=2&charset=utf-8':'';
			let startTime=list[key].auditingTime||'';
			let endTime=list[key].endTime||'';
			let overtype=list[key].type;
				overtype=overtype=='0'?'拼团失败':overtype=='1'?'拼团成功':overtype=='2'?'提前接单':overtype=='3'?'待确定':overtype=='4'?'到期末拼成':'未知';
			let status=list[key].status;
				status=status=='0'?'审核中':status=='1'?'审核被拒绝':status=='2'?'审核通过':status=='3'?'待调剂':status=='4'?'调剂结束':status=='5'?'撤销':status=='6'?'部分生成订单':status=='7'?'全部生成订单':status=='8'?'全部退款':status=='9'?'人数不足，拼团作废':'未知';
			let createTime=list[key].tradeTime||'';
			let isshow=true;
			let homeurl = '/yich/GoodInfo?proid=' + list[key].proId;
			let detailsurl='/yich/User/User_fightGroupNotes.html?groupId='+list[key].groupId;
			state.s4.list.push({homeurl:homeurl,imgurl:imgurl,title:title,sku:sku,bname:bname,wangwangurl:wangwangurl,wangwangimg:wangwangimg,startTime:startTime,endTime:endTime,overtype:overtype,status:status,createTime:createTime,isshow:isshow,detailsurl:detailsurl})
		}
	},
}
const actions={
	Ajax(context){
		if(context.state.state=='s1'){
			if(context.state.s1.state=='t1'){
				Vue.http.post('/yich/UserGroupApplyingList',{page:context.state.nowpage,option:0},{emulateJSON:true})
				.then((response)=>{
					window.checkErrorVue(response);
					context.commit('s1t1',response);
				},(error)=>{
					
				})
			}else if(context.state.s1.state=='t2'){
				Vue.http.post('/yich/UserGroupApplyingList',{page:context.state.nowpage,option:1},{emulateJSON:true})
				.then((response)=>{
					window.checkErrorVue(response);
					context.commit('s1t2',response);
				},(error)=>{
					
				})
			}
		}else if(context.state.state=='s2'){
			Vue.http.post('/yich/Grouping',{page:context.state.nowpage},{emulateJSON:true})
			.then((response)=>{
				window.checkErrorVue(response);
				context.commit('s2',response);
			},(error)=>{
				
			});
		}else if(context.state.state=='s3'){
			Vue.http.post('/yich/GroupManageList',{page:context.state.nowpage},{emulateJSON:true})
			.then((response)=>{
				window.checkErrorVue(response);
				context.commit('s3',response);
			},(error)=>{
				
			});
		}else if(context.state.state=='s4'){
			Vue.http.post('/yich/GroupRecord',{page:context.state.nowpage},{emulateJSON:true})
			.then((response)=>{
				window.checkErrorVue(response);
				context.commit('s4',response);
			},(error)=>{
				
			});
		}
	}
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})