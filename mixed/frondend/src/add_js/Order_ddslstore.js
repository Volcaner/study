import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {//页面状态                                                        
	pstate:{dstate:'sydd'},//dstate:sydd,wfh,yfh,jtkz,thz,hhz,jycg,jygb
	list:{
		page:6,//总页数
		trade:[//大单列表
			{
				bigmsg:{//大单公用信息
					state:'wfk',//大单状态
					statetxt:'未付款',//大单状态文本
					ddnumber:'123456666',//大单的订单编号
					createtime:'2017-02-08 11:01:56',//下单时间
					businessname:'asdsad',//采购商名字
					businesstel:'1231313123',//采购商电话
					businesswangwanghref:'',//商户旺旺链接
					businesswangwangimg:'',//商户旺旺图片链接
					shopname:'供应商名',//供应商名称
					shoptel:'123123123',//供应商电话
					shopwangwanghref:'',//供应商旺旺
					shopwangwangimg:'',//供应商旺旺图片链接
					qzcolor:'0',//旗帜颜色012345
					qzcontent:'666666',//旗帜内容
					beizhu:'666',//备注
					allprice:'10.00',//总金额
					logmoney:'0.3',//运费
					ddurl:'/yich/OrderDetailsServlet?state=000&returnState=N&traid=20170208110156105047&supuserid=20160926152521100262',//订单链接
					wlurl:'/yich/LogInfServlet?traId=20170102200314104817&isretState=0&UOrS=U',//物流链接
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
						amount:'3',//商品数量
					}
				]
			}
		]
	},//商品列表
	nowpage:1,//当前的分页
	inputs:{sdd:'',szh:'',shh:'',sname:'',stel:'',sstart:{time:''},send:{time:''},choice:'sydd'},//查询内容,分页查询用
}
const mutations = {		
	page(state,n){
		state.nowpage=n.page;
	},
	pubAjax(storestate,_list){//页面加载
		var list={
				page:6,//总页数
				trade:[//大单列表
					{
						bigmsg:{//大单公用信息
							state:'wfk',//大单状态
							statetxt:'未付款',//大单状态文本
							ddnumber:'123456666',//大单的订单编号
							createtime:'2017-02-08 11:01:56',//下单时间
							businessname:'asdsad',//采购商名字
							businesstel:'1231313123',//采购商电话
							businesswangwanghref:'',//商户旺旺链接
							businesswangwangimg:'',//商户旺旺图片链接
							shopname:'供应商名',//供应商名称
							shoptel:'123123123',//供应商电话
							shopwangwanghref:'',//供应商旺旺
							shopwangwangimg:'',//供应商旺旺图片链接
							qzcolor:'0',//旗帜颜色012345
							qzcontent:'666666',//旗帜内容
							beizhu:'666',//备注
							allprice:'10.00',//总金额
							logmoney:'0.3',//运费
							ddurl:'/yich/OrderDetailsServlet?state=000&returnState=N&traid=20170208110156105047&supuserid=20160926152521100262',//订单链接
							wlurl:'/yich/LogInfServlet?traId=20170102200314104817&isretState=0&UOrS=U',//物流链接
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
								amount:'3',//商品数量
							}
						]
					}
				]
			}//商品列表
			list.page=_list.totalpages;
			list.trade=[];
			
			for(var i=0;i<_list.trade_list.length;i++){
				var trade=_list.trade_list[i];//当前的大单信息
				let state=trade.textIsSend=="未发货"?'wfh':trade.textIsSend=="已发货"?'yfh':trade.textIsSend=="交易成功"?'jycg':trade.textIsSend=="交易关闭"?'jygb':'未知状态';
				let statetxt=trade.textIsSend;
				let ddnumber=trade.tra_id;
				let createtime=trade.tra_created;
				let businessname=trade.bname;
				let businesstel=trade.btel;		
				let shopname=trade.sname;
				let shoptel=trade.stel;
				let businesswangwanghref=trade.businessList[0].wangwang?'http://www.taobao.com/webww/ww.php?ver=3&touid='+trade.businessList[0].wangwang+'&siteid=cntaobao&status=2&charset=utf-8':'';
				let businesswangwangimg=trade.businessList[0].wangwang?'http://amos.alicdn.com/realonline.aw?v=2&uid='+trade.businessList[0].wangwang+'&site=cntaobao&s=2&charset=utf-8':'';
				let shopwangwanghref=trade.supplierShop.wangwang?'http://www.taobao.com/webww/ww.php?ver=3&touid='+trade.supplierShop.wangwang+'&siteid=cntaobao&status=2&charset=utf-8':'';
				let shopwangwangimg=trade.supplierShop.wangwang?'http://amos.alicdn.com/realonline.aw?v=2&uid='+trade.supplierShop.wangwang+'&site=cntaobao&s=2&charset=utf-8':'';
				let qzcolor=trade.order_memo_color=='red'?'1':trade.order_memo_color=='yellow'?'2':trade.order_memo_color=='green'?'3':trade.order_memo_color=='blue'?'4':trade.order_memo_color=='purple'?'5':'0';
				let qzcontent=trade.order_memo_content!==""?trade.order_memo_content:'';
				let beizhu=trade.seller_memo;
				if(!beizhu){beizhu=''}
				let allprice=trade.payment;
				let logmoney=trade.log_money;
				let ddurl='/yich/orderDetailCenter?state='+trade.tra_state+'&returnState='+trade.return_state+'&traid='+trade.tra_id+'&supuserid='+trade.sup_userid;
				let wlurl='/yich/LogInfServlet?traId='+trade.tra_id+'&isretState=0&UOrS=U';
				list.trade.push({bigmsg:{state:state,statetxt:statetxt,ddnumber:ddnumber,createtime:createtime,businessname:businessname,businesstel:businesstel,businesswangwanghref:businesswangwanghref,businesswangwangimg:businesswangwangimg,shopname:shopname,shoptel:shoptel,shopwangwanghref:shopwangwanghref,shopwangwangimg:shopwangwangimg,qzcolor:qzcolor,qzcontent:qzcontent,beizhu:beizhu,allprice:allprice,logmoney:logmoney,ddurl:ddurl,wlurl:wlurl},smallmsg:[]});				
				for(var j=0;j<trade.tradeOrderList.length;j++){
					var strade=trade.tradeOrderList[j];//小单信息
					let state=strade.retOrderState;//小单状态
					let orderid=strade.orderId;
					let imgpro='/yich/GoodInfo?proid='+strade.shopInv.pro_id;
					let imgurl=imgchange(strade.shopInv.product.proImage.src,'@75w_75h');
					let proname=strade.shopInv.pro_name;
					let huohao=strade.shopInv.good_no;
					let sku=strade.skuPropertiesName;
					let wuliu=trade.log_number==true?trade.log_number:'';
					let price=strade.price;
					let amount=strade.traAmount;									
					list.trade[i].smallmsg.push({state:state,orderid:orderid,imgpro:imgpro,imgurl:imgurl,proname:proname,huohao:huohao,sku:sku,wuliu:wuliu,price:price,amount:amount});
				}
			}
			storestate.list=list;
	}
}
const actions={
	Ajax(context){
		let orderNum=context.state.inputs.sdd;
		let account=context.state.inputs.szh;
		let proGoodNo=context.state.inputs.shh;
		let all_order_status=context.state.inputs.sname==''?'':encodeURIComponent(context.state.inputs.sname);
		let allyc_order_status=context.state.inputs.stel;
		let orderStart=context.state.inputs.sstart.time;
		let orderEnd=context.state.inputs.send.time;
		let state=context.state.inputs.choice;
		state=state=='sydd'?0:state=='wfh'?2:state=='yfh'?3:state=='jtkz'?4:state=='thz'?5:state=='hhz'?6:state=='jycg'?9:state=='jygb'?10:state=='zfdd'?'-2':'';
		Vue.http.post('/yich/ordMergeOrder',{pno:context.state.nowpage,orderNum:orderNum,account:account,proGoodNo:proGoodNo,all_order_status:all_order_status,allyc_order_status:allyc_order_status,orderStart:orderStart,orderEnd:orderEnd,state:state},{emulateJSON:true})
		.then((response)=>{
			window.checkErrorVue(response);
			context.commit('pubAjax',response.body);
		},(response)=>{
			
		});
	}
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})