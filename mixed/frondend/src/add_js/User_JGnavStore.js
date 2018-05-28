import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
		nowpage:1,//当前显示的页数
		allpage:1,//当前的总页数
		state:'s1',//当前的展示nav页
		s1:{
			list:[]//{payNum,imgurl,title,sku,bname,wangwangurl,wangwangimg,startTime,amount,endTime,enddistance,endtimer,endshowtime,isover,distance,timer,showtime,paystate,groupId,isshow,detailsurling,tuanurl}
		},
		s2:{
			list:[]//{imgurl,title,sku,bname,wangwangurl,wangwangimg,startTime,endTime,overtype,status,createTime,isshow,detailsurlrecord}
		}
}
const mutations = {		
	page(state,n){
		state.nowpage=n.page;
	},
	s1(state,response){
		state.allpage=response.body.totalPage;
		for(let key in state.s1.list){//将上一次的定时器清除
			if(state.s1.list[key].timer){
				clearInterval(state.s1.list[key].timer);
				state.s1.list[key].timer=null;
			}
			if(state.s1.list[key].endtimer){
				clearInterval(state.s1.list[key].endtimer);
				state.s1.list[key].endtimer=null;
			}
		}
		state.s1.list.splice(0);
		var list=response.body.list;
		for(let key in list){
			let payNum=list[key].alipayNum;
			let imgurl=window.imgchange(list[key].mainSrc,'@80w_80h');
			let title=list[key].proName;
			let sku=list[key].goodNo;
			let bname=list[key].sup.supshop_name;
			let wangwangurl=list[key].wangwang?'http://www.taobao.com/webww/ww.php?ver=3&touid='+list[key].wangwang+'&siteid=cntaobao&status=2&charset=utf-8':'';
			let wangwangimg=list[key].wangwang?'http://amos.alicdn.com/realonline.aw?v=2&uid='+list[key].wangwang+'&site=cntaobao&s=2&charset=utf-8':'';
			let startTime=list[key].auditingTime ||'';
			let amount=list[key].surplusStock;
			let endTime=list[key].endTime||'';//拼团结束时间
			let enddistance=parseInt(list[key].diftime)||0;
			let endtimer=null;
			let endshowtime='';
			let isover=enddistance>0?false:true;//是否拼团结束
			let distance=parseInt(list[key].difTradeTime)||0;
			let timer=null;
			let showtime='';
			let paystate=list[key].payStatus=="SUCCESS"?true:false;
			let groupId=list[key].groupId;
			let isshow=true;
			let homeurl = '/yich/GoodInfo?proid=' + list[key].proId;
			let detailsurling='/yich/User/User_RefundDetails.html?groupId='+list[key].groupId+"&alipayNum="+list[key].alipayNum+"&pt_user_id="+list[key].sup.user_id+"&type=1";
			let tuanurl='/yich/SpellDetailsPage?groupId='+list[key].groupId;
			//新添加
			if(isover){
				//ajax
				Vue.http.post('/yich/PayOff',{payNum:payNum})
				.then((response)=>{
					window.checkErrorVue(response);
					if(response.body.flag=='1'){
						/*alert('关闭成功');*/
					}else{
						/*alert('系统繁忙，请刷新页面重试');*/
					}
				},(response)=>{
					
				});
			}
			state.s1.list.push({homeurl:homeurl,payNum:payNum,imgurl:imgurl,title:title,sku:sku,bname:bname,wangwangurl:wangwangurl,wangwangimg:wangwangimg,startTime:startTime,amount:amount,endTime:endTime,enddistance:enddistance,endtimer:endtimer,endshowtime:endshowtime,isover:isover,distance:distance,timer:timer,showtime:showtime,paystate:paystate,groupId:groupId,isshow:isshow,detailsurling:detailsurling,tuanurl:tuanurl})
		}
		for(let key in state.s1.list){
			(function(list){
				list.endshowtime=window.getDistenceTime(list.enddistance);
				list.endtimer=setInterval(function(){
					if(isNaN(list.enddistance)||list.enddistance<=0){
						clearInterval(list.endtimer);
						list.endtimer=null;
					}
					list.endshowtime=window.getDistenceTime(list.enddistance);
					list.enddistance-=1000;
				}.bind(this),1000)
				
				list.showtime=window.getDistenceTime(list.distance);
				list.timer=setInterval(function(){
					if(isNaN(list.distance)||list.distance<=0){
						clearInterval(list.timer);
						list.timer=null;
					}
					list.showtime=window.getDistenceTime(list.distance);
					list.distance-=1000;
				}.bind(this),1000)
			})(state.s1.list[key])
		}
	},
	s2(state,response){
		state.allpage=response.body.totalPage;
		state.s2.list.splice(0);
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
			let overtype='';
			if(typeof (list[key].isDel)!='undefined' && list[key].isDel=='2'){
				 overtype='超时未付款';
				}else if(typeof (list[key].isDel)!='undefined' && list[key].isDel=='4'){
					 overtype='未达数量,拼团失败';
				}else if(typeof (list[key].isDel)!='undefined' && list[key].isDel=='3'){
					 overtype='库存不足';
				}else{
					 overtype=list[key].type;
						overtype=overtype=='0'?'拼团失败':overtype=='1'?'拼团成功':overtype=='2'?'提前接单':overtype=='3'?'待确定':overtype=='4'?'到期自动生成':'未知';
						
				}
			
				let status=list[key].status;
				status=status=='0'?'审核中':status=='1'?'审核被拒绝':status=='2'?'审核通过':status=='3'?'待调剂':status=='4'?'调剂结束':status=='5'?'撤销':status=='6'?'部分生成订单':status=='7'?'全部生成订单':status=='8'?'全部退款':status=='9'?'拼团失败':'未知';
			let createTime=list[key].tradeTime||'';
			let isshow=true;
			let homeurl = '/yich/GoodInfo?proid=' + list[key].proId;
			let detailsurlrecord='/yich/User/User_RefundDetails.html?groupId='+list[key].groupId+"&alipayNum="+list[key].alipayNum+"&pt_user_id="+list[key].sup.user_id+"&type=2";
			state.s2.list.push({homeurl:homeurl,imgurl:imgurl,title:title,sku:sku,bname:bname,wangwangurl:wangwangurl,wangwangimg:wangwangimg,startTime:startTime,endTime:endTime,overtype:overtype,status:status,createTime:createTime,isshow:isshow,detailsurlrecord:detailsurlrecord})
		}
	},
}
const actions={
	Ajax(context){
		if(context.state.state=='s1'){
			Vue.http.post('/yich/GoGrouping',{page:context.state.nowpage},{emulateJSON:true})
			.then((response)=>{
				window.checkErrorVue(response);
				context.commit('s1',response);
			},(error)=>{
				
			})
		}else if(context.state.state=='s2'){
			Vue.http.post('/yich/GoGroupingRecordList',{page:context.state.nowpage},{emulateJSON:true})
			.then((response)=>{
				window.checkErrorVue(response);
				context.commit('s2',response);
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