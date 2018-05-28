import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {//页面状态                                                             已下单/回收站，三月前/三月后，订单状态
	pstate:{hstate:'load',tstate:'now',dstate:'sydd'},//hstate:load,back//tstate:now,before//dstate:sydd,wfk,wfh,yfh,jtkz,thz,hhz,jzz,jzwc,jycg,jygb
	list:{
		page:6,//总页数
		status:'',
		trade:[//大单列表
			/*{
				isshow:true,
				bigmsg:{//大单公用信息
					state:'wfk',//大单状态
					statetxt:'未付款',//大单状态文本
					tuan:false,//是否为拼团
					zhuanshou:false,//是否为转售
					ddnumber:'123456666',//大单的订单编号
					createtime:'2017-02-08 11:01:56',//下单时间
					shopname:'newgoshare',//供货商
					shopurl:'',//'/yich/Storage/Storage_FileManagement.html?supshopId='+trade.supshop_id;
					tbid:'',//淘宝id
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
			}*/
		]
	},//商品列表
	nowpage:1,//当前显示的页数
	currentPage:0,
	listCount:0,
	inputs:{sdd:'',spro:'',ssku:'',scname:'',ssname:'',stel:'',sstate:'sydd',tbid:'',sstart:{time:''},send:{time:''},state:0},//页面的input框
	wfkstate:{checked:[],inputs:false,count:0,price:'0.00',fen:[],miao:[],timer:[]},//未付款中的各种数据,选中的input
}
const mutations = {		
	page(state,n){
		state.nowpage=n.page;
	},
	pubAjax(storestate,_list){
		//清除定时器
		for(var k in storestate.wfkstate.timer){
			if(storestate.wfkstate.timer[k]!==''){
				clearInterval(storestate.wfkstate.timer[k]);
				storestate.wfkstate.timer[k]='';
			}		
		}
		storestate.wfkstate.timer.splice(0);
		
		var list={
			page:6,//总页数
			trade:[//大单列表
				/*{
					isshow:true,
					bigmsg:{//大单公用信息
						state:'wfk',//大单状态
						statetxt:'未付款',//大单状态文本
						tuan:false,//是否为拼团
						ddnumber:'123456666',//大单的订单编号
						createtime:'2017-02-08 11:01:56',//下单时间
						shopname:'newgoshare',//供货商
						tbid:'',//淘宝id
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
		}//商品列表
		list.page=_list.totalpages;
		list.trade=[];
		//input 选中框初始化
		storestate.wfkstate.checked.splice(0);
		storestate.wfkstate.fen.splice(0);
		storestate.wfkstate.miao.splice(0);
		storestate.wfkstate.inputs=false;
		for(var i=0;i<_list.trade_list.length;i++){
			var trade=_list.trade_list[i];//当前的大单信息	
			storestate.wfkstate.checked[i]=false;
			//大单状态 字面状态 仅有  未付款 未发货 已发货 交易成功 交易关闭
			let isshow=true;
			let state=trade.textIsSend=="未付款"?'wfk':trade.textIsSend=="未发货"?'wfh':trade.textIsSend=="已发货"?'yfh':trade.textIsSend=="交易成功"?'jycg':trade.textIsSend=="交易关闭"?'jygb':trade.textIsSend=="订单作废"?'zfdd':'未知状态';
			let statetxt=trade.textIsSend;
			let tuan=trade.source_type==5?true:false;
			let zhuanshou=trade.source_type==6?true:false;
			console.log(state);
			let zfdd_cxxd=state=='zfdd'?true:false;
			let quzhifu = trade.alipay_num=='N'?false:true;
			let ddnumber=trade.tra_id;
			let createtime=trade.tra_created;
			let shopname=trade.supshop_user_name?trade.supshop_user_name:'';
			let shopurl='/yich/Storage/Storage_FileManagement.html?supshopId='+trade.supshop_id;	
			let tbid=trade.name;
			let wangwanghref=trade.supplierShop.wangwang?'http://www.taobao.com/webww/ww.php?ver=3&touid='+trade.supplierShop.wangwang+'&siteid=cntaobao&status=2&charset=utf-8':'';
			let wangwangpic=trade.supplierShop.wangwang?'http://amos.alicdn.com/realonline.aw?v=2&uid='+trade.supplierShop.wangwang+'&site=cntaobao&s=2&charset=utf-8':'';
			let qzcolor=trade.memo_color=='red'?'1':trade.memo_color=='yellow'?'2':trade.memo_color=='green'?'3':trade.memo_color=='blue'?'4':trade.memo_color=='purple'?'5':'0';
			let qzcontent=trade.memo_content!==""?trade.memo_content:'';
			let beizhu=trade.seller_memo;
			if(!beizhu){beizhu=''}
			let allprice=trade.payment;
			let logmoney=trade.log_money;
			let tra_state = trade.tra_state;
			let ddurl='/yich/OrderDetailsServlet?state='+trade.tra_state+'&returnState='+trade.return_state+'&traid='+trade.tra_id+'&supuserid='+trade.sup_userid;
			let wlurl='/yich/LogInfServlet?traId='+trade.tra_id+'&isretState=0&UOrS=U';
			let others={userid:trade.user_id,supuserid:trade.sup_userid,supshopid:trade.supshop_id,tra_state:trade.tra_state};
			list.trade.push({isshow:isshow,bigmsg:{tra_state:tra_state,quzhifu:quzhifu,state:state,statetxt:statetxt,tuan:tuan,zhuanshou:zhuanshou,zfdd_cxxd:zfdd_cxxd,ddnumber:ddnumber,createtime:createtime,shopname:shopname,shopurl:shopurl,tbid:tbid,wangwanghref:wangwanghref,wangwangpic:wangwangpic,qzcolor:qzcolor,qzcontent:qzcontent,beizhu:beizhu,allprice:allprice,logmoney:logmoney,ddurl:ddurl,wlurl:wlurl,others:others},smallmsg:[]});
			//当大单的状态为未付款时，1小时倒计时
			if(trade.alipay_num && trade.alipay_num != 'N' && trade.tra_state == 120){
				storestate.wfkstate.fen[i]=59;
				storestate.wfkstate.miao[i]=59;
				storestate.wfkstate.timer[i]='';
				(function(time,index){
					var mm=parseInt(time/60000);
					var ss=parseInt(time/1000%60);
					mm=mm<0?'00':mm;
					ss=ss<0?'00':ss;
					mm=mm.length<2?('0'+mm):mm;
					ss=ss.length<2?('0'+ss):ss;					
					storestate.wfkstate.fen.splice(index,1,mm);
					storestate.wfkstate.miao.splice(index,1,ss);
					if(time<0){
						Vue.http.post("/yich/PayOff",{payNum:_list.trade_list[index].alipay_num})
						.then((response)=>{
							window.checkErrorVue(response);
							if(response.body.exceptionState==1){alert('异常')}else{
								/*var tstate=storestate.pstate.tstate;
								var dstate=storestate.pstate.dstate;
								var hstate=storestate.pstate.hstate;
								state.list.trade[index].bigmsg.quzhifu = false;
								state.list.trade[index].bigmsg.tra_state="120";*/
								//val.bigmsg.quzhifu&&val.bigmsg.tra_state=="120"
								//storestate.list.trade[index].isshow=false;
								window.location.reload();
							}
						},(response)=>{});
						return;
					}
					time-=1000;
					storestate.wfkstate.timer[index]=setInterval(function(){										
						mm=parseInt(time/60000);
						ss=parseInt(time/1000%60);					
						if(time<0){
							clearInterval(storestate.wfkstate.timer[index]);
							storestate.wfkstate.timer[index]='';
							Vue.http.post("/yich/PayOff",{payNum:_list.trade_list[index].alipay_num})
							.then((response)=>{
								window.checkErrorVue(response);
								if(response.body.exceptionState==1){alert('异常')}else{
									/*var tstate=storestate.pstate.tstate;
									var dstate=storestate.pstate.dstate;
									var hstate=storestate.pstate.hstate;
									state.list.trade[index].bigmsg.quzhifu = false;
									state.list.trade[index].bigmsg.tra_state="120";*/
									//storestate.list.trade[index].isshow=false;
									window.location.reload();
								}
							},(response)=>{});
						}
						mm=mm<10?'0'+mm:mm;
						ss=ss<10?'0'+ss:ss;
						storestate.wfkstate.fen.splice(index,1,mm);
						storestate.wfkstate.miao.splice(index,1,ss);
						time-=1000;
					}.bind(this),1000);
				})(trade.perTim,i);
			}				
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
				if(trade.is_havingTemplate){
					if(trade.is_havingTemplate == 'YES'){
						coprice=true;
					}
				}
				let amount=strade.traAmount;
				let cchtml='';
				let stock = strade.shopInv.pro_num || 0;
				let waitSell = strade.shopInv.wait_sell || 'PUT_AWAY';
				var nowstate=list.trade[i].bigmsg.state;//当前的大单状态
				var ccurl='';//操作的url/不含仲裁
				var bcurl='';
				var txt='';//操作的文本/不含仲裁
				var arb_id='';//判断是否有仲裁,有则加到链接ccurl后面
				var zc_result='';//仲裁结果按钮
				if(strade.arbitration){//仲裁相关
					if(strade.arbitration.arb_state=='N'&&strade.arbitration.is_del=='1') {
						zc_result='\
						<p style="padding-top:10px;">\
							<a target="_blank" href="/yich/ArbitrationDetailsServlet?orderId='+strade.orderId+'&arb_id='+strade.arbitration.arb_id+'&status=business" style="color:#2b9ee0;">\
								查看举证结果\
							</a>\
						</p>';}
					else if(strade.arbitration.arb_state=='Y') {
						zc_result='\
						<p style="padding-top:10px;">\
							<a target="_blank" href="/yich/ArbitrationDetailsServlet?orderId='+orderid+'&status=business&arb_id='+strade.arbitration.arb_id+'" style="color:#2b9ee0;">\
								去举证\
							</a>\
						</p>'}
					arb_id='arb_id='+strade.arbitration.arb_id+'&';
				}

				if(nowstate=='wfk'){//未付款
					cchtml='';
				}else if(nowstate=='wfh'){//未发货//仅退款中
					if(strade.orderRetAndCha==undefined||state=="N"){//文字判断
						txt='申请售后';
					}else{
						txt=strade.orderRetAndCha.retOrChaText;
					}
					if(state=='N'||state=='T'){//链接判断
						ccurl='/yich/ApplyRefundServlet?orderId='+strade.orderId+'&tk=1&proId='+ strade.shopInv.pro_id;
					}else {
						ccurl='/yich/ApplyRefundServlet?orderId='+strade.orderId+'&proId='+ strade.shopInv.pro_id;
					}
				}else if(nowstate=='yfh'||nowstate=='jycg'){//已发货//退货中//换货中//举证中//举证完成       //交易成功//举证完成    //交易关闭//举证完成
					if(strade.orderRetAndCha==undefined||state=="N"){//文字判断
						txt='申请售后';
					}else if(state=='CL'){
						txt='';
					}else{
						txt=strade.orderRetAndCha.retOrChaText;
					}
					if(state=="N"){
						ccurl='/yich/ApplyRefundServlet?'+arb_id+'status=business&orderId='+strade.orderId+'&tk=1&proId='+ strade.shopInv.pro_id;							
					}else if(state=='T'){
						ccurl='/yich/ApplyRefundServlet?'+arb_id+'status=business&tk=1&proId='+ strade.shopInv.pro_id+'&orderId='+strade.orderId+'&type=t';//type:判断跳转仓储还是商户页面（商户：type任意值）;;
					}else if(state=='A'||state=='D'||state=='H'||state=='CP'){
						ccurl="/yich/changeLink?"+arb_id+"status=business&img_add="+ encodeURIComponent(strade.shopInv.product.proImage.src)+ "&good_name="+ strade.title+ "&skupropertiesname="+ strade.skuPropertiesName+ "&unit_price="+ strade.price+ "&good_quantity="+strade.traAmount+ "&tra_id="+ trade.tra_id+ "&good_pay_time="+ trade.tra_pay_time+ "&good_created_time="+ trade.tra_created+ "&order_id="+ strade.orderId+ "&pro_id="+ strade.shopInv.pro_id+ "&sendTime="+ trade.tra_send_time+ "&logName="+ trade.logcp_name+ "&goodno="+ strade.shopInv.good_no+"&isSend=1&orderState="+strade.retOrderState+"&tra_state="+trade.tra_state+"&enter=N"+"&tk=2";
						bcurl='/yich/ApplyRefundServlet?'+arb_id+'status=business&tk=1&proId='+ strade.shopInv.pro_id+'&orderId='+strade.orderId;
					}else if(state=='Y'||state=='S'||state=='L'||state=='E'||state=='F'){
						ccurl='/yich/ApplyRefundServlet?'+arb_id+'status=business&orderId='+strade.orderId+ '&proId='+ strade.shopInv.pro_id;
					}
				}else if(nowstate=='jygb'){
					// do nothing
				}else if(nowstate=='zfdd'){
					// do nothing
				}

				if(storestate.pstate.dstate!=='jzwc'&&(others.tra_state==201||others.tra_state=='trade_completed'||others.tra_state=='trade_close')){
					ccurl='';txt='';zc_result='';
					if(state=='T'){
						//ccurl='/yich/ConfirmReturn?'+arb_id+'status=shop&enter=Y&orderId='+strade.orderId;
						ccurl='/yich/RefundedToPage?'+arb_id+'status=shop&enter=Y&orderId='+strade.orderId+'&type=t';//type:判断跳转仓储还是商户页面（商户：type任意值）;;
						txt=strade.orderRetAndCha.retOrChaText;
					}
				}

				if(ccurl==""||txt==""){
					cchtml='';
				}else{
					if(txt && txt.indexOf('未处理')!==-1){
						cchtml='<p><a target="_blank" href="'+ccurl+'" style="color:#e20000">'+txt+'</a></p>';
					}
					else if(txt && txt.indexOf('退款成功')!==-1){
						cchtml='<p><a target="_blank" href="'+ccurl+'" style="color:#e20000">'+txt+'</a></p>';
					}
					else if(txt && txt.indexOf('换货完成')!==-1){
						cchtml='<p><a target="_blank" href="'+ccurl+'" style="color:#2b9ee0">'+txt+'</a></p>'+'<p>&nbsp;</p>'+
						'<p><a target="_blank" href="'+bcurl+'" style="color:#2b9ee0">申请售后</a></p>';
					}
					else{
						cchtml='<p><a target="_blank" href="'+ccurl+'" style="color:#2b9ee0">'+txt+'</a></p>';
					}							
				}

				cchtml+=zc_result;
				list.trade[i].smallmsg.push({waitSell:waitSell,stock:stock,state:state,orderid:orderid,imgpro:imgpro,imgurl:imgurl,proname:proname,huohao:huohao,sku:sku,wuliu:wuliu,price:price,coprice:coprice,amount:amount,cchtml:cchtml,customer_service:customer_service});
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
		s=s=="sydd"?0:s=='wfk'?16:s=='wfh'?2:s=='yfh'?3:s=='jtkz'?4:s=='thz'?5:s=='hhz'?6:s=='jzz'?7:s=='jzwc'?8:s=='jycg'?9:s=='jygb'?10:s=="pt"?'-1':s=="zfdd"?'-2':11;  // :s=="zfdd"?14 作废订单
		state.status=s;
		//多加的回收站判断				
		if(state.pstate.hstate=='back'){
			m='';
			s=state.pstate.dstate=='sydd'?11:state.pstate.dstate=='jycg'?12:13;
		}
		Vue.http.post('/yich/DelegationUserMergeOrder',{source_type:6,pno:state.nowpage,month:m,orderNum:state.inputs.sdd,proName:state.inputs.spro,proGoodNo:state.inputs.ssku,business:state.inputs.scname,all_order_status:state.inputs.ssname,allyc_order_status:state.inputs.stel,orderStart:state.inputs.sstart.time,orderEnd:state.inputs.send.time,state:s,tbid:state.inputs.tbid},{emulateJSON:true})
		.then((response)=>{
			window.checkErrorVue(response);
			if(response.body.exceptionState==1){alert('后台错误');}else{
				_list=response.body;
				context.state.listCount = _list.trade_list.length;
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