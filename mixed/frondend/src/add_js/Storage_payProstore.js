import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {//页面状态                                                             三月前/三月后，订单状态
	pstate:{tstate:'now',dstate:'sydd'},//tstate:now,before//dstate:sydd,wfk,wfh,yfh,jtkz,thz,hhz,jzz,jzwc,jycg,jygb
	list:{
		page:6,//总页数
		trade:[//大单列表
			/*{
				bigmsg:{//大单公用信息
					state:'wfk',//大单状态
					statetxt:'未付款',//大单状态文本
					tuan:false,//是否拼团
					ddnumber:'123456666',//大单的订单编号
					createtime:'2017-02-08 11:01:56',//下单时间
					shopname:'newgoshare',//采购商
					busurl:'',//yich/User/User_FileManagement.html?userid=123132
					wangwanghref:'http://www.taobao.com/webww/ww.php?ver=3&touid=aaa&siteid=cntaobao&status=2&charset=utf-8',//旺旺链接
					wangwangpic:'http://amos.alicdn.com/realonline.aw?v=2&uid=aaa&site=cntaobao&s=2&charset=utf-8',//旺旺图片链接
					qzcolor:'0',//旗帜颜色012345
					qzcontent:'666666',//旗帜内容
					beizhu:'666',//备注
					allprice:'10.00',//总金额
					logmoney:'0.3',//运费
					ddurl:'/yich/OrderDetailsServlet?state=000&returnState=N&traid=20170208110156105047&supuserid=20160926152521100262',//订单链接
					wlurl:'/yich/LogInfServlet?traId=20170102200314104817&isretState=0&UOrS=U',//物流链接
					others:{userid:'',supuserid:'',supshopid:'',tra_state:''},//右侧的按钮信息
					alipay_num:"N",//支付号
				},
				smallmsg:[//子单状态
					{
						state:'N',//子单状态
						orderid:'123123123',//子单orderid
						imgpro:'/yich/GoodInfo?proid=20160929202113105144',//商品详情页的链接
						imgurl:'http://ngsimage.img-cn-hangzhou.aliyuncs.com/iii/fabushangping/2016111416274589785_001731583550_2.jpg@75w_75h_1e',//图片url
						proname:'uotune2016春装新款韩版大码棉麻女装牛仔长袖衬衫中长款衬衣春秋纯[交易快照]',//商品名称
						huohao:'YUIKHKJ-000',//货号
						sku:'绿色/M',//sku
						wuliu:'123456',//物流编号，没有不显示
						price:'80.00',//商品单价
						coprice:false,//是否合作价
						amount:'3',//商品数量
						cchtml:'',//操作商品的html,根据子单状态+仲裁状态+大单状态做判断
						customer_service:'N',//是否有售后选项
					}
				]
			}*/
		]
	},//商品列表
	nowpage:1,//当前显示的页数
	inputs:{sdd:'',spro:'',ssku:'',scname:'',ssname:'',stel:'',sstate:'sydd',sstart:{time:''},send:{time:''},state:0},//页面的input框
	tbodyshow:true,
	chagePriceList:{
		isChageShow:false,//修改价格模态
		transpost:'',//运费
		godsprice:0,//商品价格
		oIdPrice:[],
	},
	
}
const mutations = {		
	page(state,n){
		state.nowpage=n.page;
	},
	pubAjax(storestate,_list){
		var list={
				page:6,//总页数
				trade:[//大单列表
					{
						bigmsg:{//大单公用信息
							state:'wfk',//大单状态
							statetxt:'未付款',//大单状态文本
							tuan:false,//是否拼团
							zhuanshou:false,//是否转售
							ddnumber:'123456666',//大单的订单编号
							createtime:'2017-02-08 11:01:56',//下单时间
							shopname:'newgoshare',//供货商
							wangwanghref:'http://www.taobao.com/webww/ww.php?ver=3&touid=aaa&siteid=cntaobao&status=2&charset=utf-8',//旺旺链接
							wangwangpic:'http://amos.alicdn.com/realonline.aw?v=2&uid=aaa&site=cntaobao&s=2&charset=utf-8',//旺旺图片链接
							qzcolor:'0',//旗帜颜色012345
							qzcontent:'666666',//旗帜内容
							beizhu:'666',//备注
							allprice:'10.00',//总金额
							logmoney:'0.3',//运费
							ddurl:'/yich/OrderDetailsServlet?state=000&returnState=N&traid=20170208110156105047&supuserid=20160926152521100262',//订单链接
							wlurl:'/yich/LogInfServlet?traId=20170102200314104817&isretState=0&UOrS=U',//物流链接
							others:{userid:'',supuserid:'',supshopid:'',tra_state:''},//右侧的按钮信息
							alipay_num:"N",//支付号
						},
						smallmsg:[//子单状态
							{
								state:'N',//子单状态
								orderid:'123123123',//子单orderid
								imgpro:'/yich/GoodInfo?proid=20160929202113105144',//商品详情页的链接
								imgurl:'http://ngsimage.img-cn-hangzhou.aliyuncs.com/iii/fabushangping/2016111416274589785_001731583550_2.jpg@75w_75h_1e',//图片url
								proname:'uotune2016春装新款韩版大码棉麻女装牛仔长袖衬衫中长款衬衣春秋纯[交易快照]',//商品名称
								huohao:'YUIKHKJ-000',//货号
								sku:'绿色/M',//sku
								wuliu:'123456',//物流编号，没有不显示
								price:'80.00',//商品单价
								coprice:false,//是否合作价
								amount:'3',//商品数量
								cchtml:'',//操作商品的html,根据子单状态+仲裁状态+大单状态做判断
							}
						]
					}
				]
			}//商品列表
			list.page=_list.totalpages;
			list.trade=[];					
			for(var i=0;i<_list.trade_list.length;i++){
				var trade=_list.trade_list[i];//当前的大单信息						
				//大单状态 字面状态 仅有  未付款 未发货 已发货 交易成功 交易关闭
				let state=trade.textIsSend=="未付款"?'wfk':trade.textIsSend=="未发货"?'wfh':trade.textIsSend=="已发货"?'yfh':trade.textIsSend=="交易成功"?'jycg':trade.textIsSend=="交易关闭"?'jygb':'未知状态';
				let statetxt=trade.textIsSend;
				let tuan=trade.source_type==5?true:false;
				let zhuanshou=trade.source_type==6?true:false;
				let ddnumber=trade.tra_id;
				let createtime=trade.tra_created;
				let shopname=trade.business.name;
				let busurl='/yich/User/User_FileManagement.html?userid='+trade.user_id;
				let wangwanghref=trade.business.wangwang?'http://www.taobao.com/webww/ww.php?ver=3&touid='+trade.business.wangwang+'&siteid=cntaobao&status=2&charset=utf-8':'';
				let wangwangpic=trade.business.wangwang?'http://amos.alicdn.com/realonline.aw?v=2&uid='+trade.business.wangwang+'&site=cntaobao&s=2&charset=utf-8':'';
				let qzcolor=trade.shop_memo_color=='red'?'1':trade.shop_memo_color=='yellow'?'2':trade.shop_memo_color=='green'?'3':trade.shop_memo_color=='blue'?'4':trade.shop_memo_color=='purple'?'5':'0';
				let qzcontent=trade.shop_memo_content!==""?trade.shop_memo_content:'';
				let beizhu=trade.seller_memo;
				if(!beizhu){beizhu=''}
				let allprice=trade.payment;
				let logmoney=trade.log_money;
				let ddurl='/yich/TradeOrderDetail?state='+trade.tra_state+'&returnState='+trade.return_state+'&userid='+trade.user_id+'&traid='+trade.tra_id+'&isSend=1';
				let wlurl='/yich/LogInfServlet?traId='+trade.tra_id+'&isretState=0&UOrS=S';
				let others={userid:trade.user_id,supuserid:trade.sup_userid,supshopid:trade.supshop_id,tra_state:trade.tra_state};
				let alipay_num  = trade.alipay_num;
				list.trade.push({bigmsg:{state:state,statetxt:statetxt,tuan:tuan,zhuanshou:zhuanshou,ddnumber:ddnumber,createtime:createtime,shopname:shopname,busurl:busurl,wangwanghref:wangwanghref,wangwangpic:wangwangpic,qzcolor:qzcolor,qzcontent:qzcontent,beizhu:beizhu,allprice:allprice,logmoney:logmoney,ddurl:ddurl,wlurl:wlurl,others:others,alipay_num:alipay_num},smallmsg:[]});			
				for(var j=0;j<trade.tradeOrderList.length;j++){
					var strade=trade.tradeOrderList[j];//小单信息
					let state=strade.retOrderState;//小单状态
					let orderid=strade.orderId;
					let imgpro='/yich/GoodInfo?proid='+strade.shopInv.pro_id;
					let imgurl=imgchange(strade.shopInv.product.proImage.src,'@75w_75h');
					let proname=strade.title;
					let huohao=strade.shopInv.good_no;
					let sku=strade.skuPropertiesName;
					let wuliu='';
					let customer_service = strade.customer_service;
					if(trade.log_number){wuliu=trade.log_number}
					let price=strade.price;
					let coprice=false;
					for(let key in _list.coopProIds){
						if(_list.coopProIds[key]==strade.shopInv.pro_id){coprice=true;}
					}
					let amount=strade.traAmount;
					let cchtml='';
					
					var nowstate=list.trade[i].bigmsg.state;//当前的大单状态
					var ccurl='';//操作的url/不含仲裁
					var txt='';//操作的文本/不含仲裁
					var arb_id='';//判断是否有仲裁,有则加到链接ccurl后面
					var zc_result='';//仲裁结果按钮
					if(strade.arbitration){//仲裁相关
						if(strade.arbitration.arb_state=='N'&&strade.arbitration.is_del=='1'){zc_result='<p style="padding-top:10px;"><a target="_blank" href="/yich/SArbitrationDetailsServlet?orderId='+strade.orderId+'&arb_id='+strade.arbitration.arb_id+'&status=shop" style="color:#2b9ee0;">查看举证结果</a></p>';}
						else if(strade.arbitration.arb_state=='Y'){zc_result='<p style="padding-top:10px;"><a target="_blank" href="/yich/SArbitrationDetailsServlet?orderId='+orderid+'&status=shop&arb_id='+strade.arbitration.arb_id+'" style="color:#2b9ee0;">去举证</a></p>'}
						arb_id='arb_id='+strade.arbitration.arb_id+'&';
					}
					if(nowstate=='wfk'){//未付款
						cchtml='';
					}else if(nowstate=='wfh'){//未发货//仅退款中
						if(strade.orderRetAndCha==undefined||state=="N"){//文字判断
							txt='';
						}else{
							txt=strade.orderRetAndCha.retOrChaText;
						}
						if(state=='Y'){
							ccurl='/yich/BeforeExamepassed?orderId='+strade.orderId;
						}else if(state=='L'){
							ccurl='/yich/RefuseReturn?orderId='+strade.orderId+'&enter=Y&from=one';
						}else if(state=='N'){
							ccurl='/yich/ExamePassingAndPassed';
						}else if(state=='F'){
							ccurl='/yich/WaitSendPro?orderId='+strade.orderId+'&enter=Y';
						}else if(state=='T'){
							ccurl='/yich/RefundedToPage?enter=Y&orderId='+strade.orderId;
							
						}					
					}else if(nowstate=='yfh'||nowstate=='jycg' || nowstate=='jygb'){//已发货//退货中//换货中//举证中//举证完成       //交易成功//举证完成    //交易关闭//举证完成
						if(strade.orderRetAndCha==undefined||state=="N"||state=='CL'){//文字判断
							txt='';
						}else{
							txt=strade.orderRetAndCha.retOrChaText;
						}
						if(state=='Y'){
							ccurl='/yich/BeforeExamepassed?'+arb_id+'status=shop&orderId='+strade.orderId+'&retRea='+strade.orderRetAndCha.retOrChaId;
						}else if(state=='L'){
							if(strade.arbitration&&strade.arbitration.arb_state=='N'){
								 ccurl='/yich/BeforeExamepassed?'+arb_id+'status=shop&orderId='+strade.orderId+'&retRea='+strade.orderRetAndCha.retOrChaId; 
							 }else{
								 ccurl='/yich/RefuseReturn?'+arb_id+'status=shop&orderId='+strade.orderId+'&enter=Y&from=one'; 
							 }
						}else if(state=='S'){
							 ccurl='/yich/BeforeConfirmReturn?'+arb_id+'status=shop&orderId='+strade.orderId;
						}else if(state=='E'){
							 ccurl='/yich/RefuseReturnOfErrorLoginf?'+arb_id+'status=shop&orderId='+strade.orderId+'&enter=Y';
						}else if(state=='N'){
							 ccurl='/yich/ExamePassingAndPassed?'+arb_id+'status=shop&orderId='+strade.orderId+'&enter=Y';
						}else if(state=='F'){
							 ccurl='/yich/WaitSendPro?'+arb_id+'status=shop&orderId='+strade.orderId+'&enter=Y';
						}else if(state=='T'){
							 ccurl='/yich/RefundedToPage?'+arb_id+'status=shop&enter=Y&orderId='+strade.orderId;
							
						}else if(state=='H'||state=='A'||state=='D'||state=='CP'){
							ccurl="/yich/sApplyLink?"+arb_id+"status=shop&utel="+trade.business.tel+"&sendTime="+trade.tra_send_time+"&proName="+strade.shopInv.pro_name+"&traId="+trade.tra_id+"&orderId="+strade.orderId+"&goodNo="+strade.shopInv.good_no+"&sku="+strade.skuPropertiesName+"&unitPrice="+strade.price+"&quantity="+strade.traAmount+"&src="+encodeURIComponent(strade.shopInv.product.proImage.src);
						}	
					}else if(nowstate=='jygb'){
						// do nothing
					}
					if(storestate.pstate.dstate!=='jzwc'&&(others.tra_state==201||others.tra_state=='trade_completed'||others.tra_state=='trade_close')){
						ccurl='';txt='';zc_result='';
						if(state=='T'){
							ccurl='/yich/RefundedToPage?'+arb_id+'status=shop&enter=Y&orderId='+strade.orderId;
							txt=strade.orderRetAndCha.retOrChaText;
						}
					}
					if(ccurl==""||txt==""){cchtml='';}else{
						if(txt.indexOf('未处理')!==-1){cchtml='<p><a target="_blank" href="'+ccurl+'" style="color:#e20000">'+txt+'</a></p>';}
						else if(txt.indexOf('退款成功')!==-1){cchtml='<p><a target="_blank" href="'+ccurl+'" style="color:#e20000">'+txt+'</a></p>';}
						else{cchtml='<p><a target="_blank" href="'+ccurl+'" style="color:#2b9ee0">'+txt+'</a></p>';}							
					}
					cchtml+=zc_result;							
					list.trade[i].smallmsg.push({state:state,orderid:orderid,imgpro:imgpro,imgurl:imgurl,proname:proname,huohao:huohao,sku:sku,wuliu:wuliu,price:price,coprice:coprice,amount:amount,cchtml:cchtml,customer_service:customer_service});
				}
			}
			storestate.list=list;
	}
}
const actions={
	Ajax(context){
		var state=context.state;
		var _list='';
		var m=state.pstate.tstate;
		m=m=='now'?0:1;
		var s=state.pstate.dstate;
		s=s=="zsdd"?16:s=="sydd"?0:s=='wfk'?1:s=='wfh'?2:s=='yfh'?3:s=='jtkz'?4:s=='thz'?5:s=='hhz'?6:s=='jzz'?7:s=='jzwc'?8:s=='jycg'?9:s=='jygb'?10:s=='pt'?'-1':s=='zfdd'?'-2':'未知';
		Vue.http.post('/yich/shopMergeOrder',{pno:state.nowpage,month:m,orderNum:state.inputs.sdd,proName:state.inputs.spro,proGoodNo:state.inputs.ssku,business:state.inputs.scname,all_order_status:state.inputs.ssname,allyc_order_status:state.inputs.stel,orderStart:state.inputs.sstart.time,orderEnd:state.inputs.send.time,state:s},{emulateJSON:true})
		.then((response)=>{
			window.checkErrorVue(response);
			if(response.body.exceptionState==1){alert('异常')}else{
				_list=response.body;
				context.commit('pubAjax',_list);
			}
			
		},(response)=>{
			
		})
	}
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})