<template>
<div id="left_index" class="alignment">
		<dl class="dl_nav">
			<dt><i class="icon iconfont">&#xe634;</i><a href="javascript:;">合作管理</a></dt>
			<dd>
				<ul>
					<li><a href="/yich/Storage/Storage_Cooper.html" target="_blank">合作采购商</a></li>
					<li><a href="/yich/Storage/Storage_QueryScore.html">我的服务评分</a></li>
					<li><a href="/yich/Storage/Storage_mblist.html">合作商价格模板</a></li>
					<li><a href="/yich/Storage/Storage_agreement_main.html">协议签署</a></li>
				</ul>
			</dd>
		</dl>
		
		<dl class="dl_nav">
			<dt><i class="icon iconfont">&#xe61e;</i><a href="javascript:;">合作关系建立</a></dt>
			<dd>
				<ul>
					<li><a href="/yich/Storage/Storage_visiter_main.html">访客概况</a></li>
					<li><a href="/yich/Storage/Storage_invite.html">我的合作邀请</a></li>
					<li><a href="/yich/Storage/Storage_applyedAndHandleRecord.html">合作申请审核</a></li>
				</ul>
			</dd>
		</dl>
		
		<dl class="dl_nav">
			<dt><i class="icon iconfont">&#xe627;</i><a href="javascript:;">合作运营</a></dt>
			<dd>
				<ul>
					<!-- /yich/Storage/Storage_UGnav.html   拼团链接 -->
					<!-- <li><a href="javascript:;">拼团</a></li> -->
					<li><a href="/yich/Storage/Storage_UGnav.html">拼团</a></li>
					<li><a href="/yich/Storage/Storage_question_main.html">问卷调查</a></li>
					<li><a href="/yich/Storage/Storage_preMemoryCard.html">预存卡</a></li>
				</ul>
			</dd>
		</dl>
		
		<dl class="dl_nav">
			<dt><i class="icon iconfont">&#xe660;</i><a href="javascript:;">商品管理</a></dt>
			<dd>
				<ul>
					<li><a href="/yich/releasLink">发布新商品</a></li>
					<li><a href="/yich/ShopInvtory?option=PUT_AWAY">在售的商品</a></li>
					<li><a href="/yich/WarehouseServlet?option=WAIT_PUT_AWAY">仓库中商品</a></li>
				</ul>
			</dd>
		</dl>

		<dl class="dl_nav">
			<dt><i class="icon iconfont">&#xe61b;</i><a href="javascript:;">交易</a></dt>
			<dd>
				<ul>
					<li><a href="/yich/Storage/Storage_payPro.html">已售出商品</a></li>
					<li><a href="/yich/Storage/Storage_transaction.html">交易数据</a></li>
				</ul>
			</dd>
		</dl>
		
		<dl class="dl_nav">
			<dt><i class="icon iconfont">&#xe65c;</i><a href="javascript:;">微信公众号推广</a></dt>
			<dd>
				<ul>
					<li><a href="/yich/Storage/Storage_popularize.html">微信公众号推广</a></li>
				</ul>
			</dd>
		</dl>

		<dl class="dl_nav">
			<dt><i class="icon iconfont">&#xe635;</i><a href="javascript:;">物流管理</a></dt>
			<dd>
				<ul>
					<li><a href="/yich/Storage/Storage_dazs.html">打单助手</a></li>
					<li><a href="/yich/LogInfModel">运费模板设置</a></li>
					<li><a href="/yich/Storage/Storage_Notshipped.html"  target="_blank">批量发货</a></li>
				</ul>
			</dd>
		</dl>

		<dl class="dl_nav">
			<dt><i class="icon iconfont">&#xe645;</i><a href="javascript:;">数据下载</a></dt>
			<dd>
				<ul>
					<li><a href="/yich/StorageFinance">财务数据</a></li>
					<li><a href="/yich/InvoiceLink">出库单</a></li>
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
