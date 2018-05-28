<template>
	<div id="left_index" class="alignment">
		<dl class="dl_nav">
			<dt><i class="icon iconfont">&#xe634;</i><a href="javascript:;">合作管理</a></dt>
			<dd>
				<ul>
					<li><a href="/yich/User/User_CooPer.html">合作供货商</a></li>
					<li><a href="/yich/User/User_mblist.html">合作商价格模板</a></li>
					<li><a href="/yich/User/User_agreement_main.html">协议签署</a></li>
					<li><a href='/yich/User/User_upnew.html'>上新动态</a></li>
				</ul>
			</dd>
		</dl>
		<dl class="dl_nav">
				<dt><i class="icon iconfont">&#xe61e;</i><a href="javascript:;">合作关系建立</a></dt>
				<dd>
					<ul>
						<li><a href="/yich/User/User_applyedAndHandleRecord.html">我的合作申请</a></li>
						<li><a href="/yich/User/User_invite.html">合作邀请审核</a></li>
					</ul>
				</dd>
		</dl>
		<dl class="dl_nav">
				<dt><i class="icon iconfont">&#xe627;</i><a href="javascript:;">合作运营商</a></dt>
				<dd>
					<ul>
					<!-- 我发起的拼团: /yich/User/User_UGnav.html  -->
					<!-- 我参与的拼团: /yich/User/User_JGnav.html -->
						<!-- <li><a href="javascript:;">我发起的拼团</a></li>
						<li><a href="javascript:;">我参与的拼团</a></li> -->
						<li><a href="/yich/User/User_UGnav.html">我发起的拼团</a></li>
						<li><a href="/yich/User/User_JGnav.html">我参与的拼团</a></li>
						<li><a href="/yich/User/User_question_main.html">问卷调查</a></li>
						<li><a href="/yich/User/User_preMemoryCard.html">预存卡</a></li>
					</ul>
				</dd>
		</dl>
		<dl class="dl_nav">
			<dt><i class="icon iconfont">&#xe660;</i><a href="javascript:;">采录收藏</a></dt>
			<dd>
				<ul>
					<li><a href="/yich/User/User_RecordedLibrary.html">采录库</a></li>
					<li><a href="/yich/CollectionNavigation?option=0&page=1&fcid=0">收藏的仓储</a></li>
				</ul>
			</dd>
		</dl>

		<dl class="dl_nav">
			<dt><i class="icon iconfont">&#xe61b;</i><a href="javascript:;">交易</a></dt>
			<dd>
				<ul>
					<li><a href="/yich/User/User_payPro.html">已下单商品</a></li>
					<li><a href="/yich/User/User_transaction.html">交易数据</a></li>
				</ul>
			</dd>
		</dl>
		
		<dl class="dl_nav">
			<dt><i class="icon iconfont" style="font-size: 18px;">&#xe659;</i><a href="javascript:;">转售</a></dt>
			<dd>
				<ul>
					<li><a href="/yich/User/User_resalePro.html">转售订单</a></li>
				</ul>
			</dd>
		</dl>

		<!-- <dl class="dl_nav">
			<dt><i class="icon iconfont">&#xe658;</i><a href="javascript:;">下单入口</a></dt>
			<dd>
				<ul>
					<li><a href="/yich/User/User_purchase.html">采购单</a></li>
					<li><a href="/yich/TaoBaoNewServlet">淘宝同步订单</a></li>
				</ul>
			</dd>
		</dl> -->

		<dl class="dl_nav">
			<dt><i class="icon iconfont">&#xe6a5;</i><a href="javascript:;">支付管理</a></dt>
			<dd>
				<ul>
					<li><a href="/yich/User/User_paycontral.html">支付管理</a></li>
				</ul>
			</dd>
		</dl>

	</div>
</template>
<style lang="less" scoped>
@import '../../css/public.less';
#left_index{
	background:#ffffff;
	float:left;
	min-height:unit(@leftMinheight,px);
	width:unit(@leftWidth,px);
	.dl_nav{
		padding:18px 0;
		.borderBottom(#e6e6e6);
		dt{
			overflow:hidden;
			padding-left:16px;
			i.icon.iconfont{
				display:block;
				float:left;
				font-size:20px;
				margin-right:4px;
				color:#626262;
			}
			a{
				display:block;
				float:left;
				font-size:14px;
				color:#000000;
				font-weight:bold;
			}
		}
		dd{
			padding-left:42px;
			margin-top:10px;
			a{
               display:block;
               font-size:14px;
               color:#626262;
               line-height:26px;
               &:hover{
                 color:#e20000;
               }
			}
		}
	}
}
</style>
