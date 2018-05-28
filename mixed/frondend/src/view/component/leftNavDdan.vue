<template>
	<div id="left_index" class="alignment">
		<dl class="dl_nav">
			<dt><i class="icon iconfont">&#xe622;</i><a href="javascript:;">订单管理</a></dt>
			<dd>
				<ul>
					<li><a href="/yich/Order/Order_ddsl.html">订单查询</a></li>
					<li><a href="/yich/Order/Order_zc.html">举证订单仲裁</a></li>
					<li><a href="/yich/Order/Order_paycontral.html">支付管理</a></li>
				</ul>
			</dd>
		</dl>

		<dl class="dl_nav">
			<dt><i class="icon iconfont">&#xe69e;</i><a href="javascript:;">信息审核</a></dt>
			<dd>
				<ul>
					<li><a href="/yich/Order/Order_authorizesLists.html">实名认证审核</a></li>
					<!-- <li><a href="javascript:;">仓储资料审核</a></li>
					<li><a href="javascript:;">广告资源审核</a></li> -->
				</ul>
			</dd>
		</dl>
		
		 <dl class="dl_nav">
			<dt><i class="icon iconfont">&#xe6a5;</i><a href="javascript:;">仓储管理</a></dt>
			<dd>
				<ul>
					<li><a href="/yich/Order/Order_storageOfflineSettled.html" >仓储线下入驻</a></li>
					<li><a href="/yich/Order/Order_BSM.html" >仓储运营服务管理</a></li>
				</ul>
			</dd>
		</dl>
		
        <dl class="dl_nav">
			<dt><i class="icon iconfont">&#xe6a5;</i><a href="javascript:;">资金管理</a></dt>
			<dd>
				<ul>
					<li><a href="/yich/Order/Order_TransferAccounts.html" >支付宝转账</a></li>
					<li><a href="/yich/Order/Order_cashBalance.html" >现金账户余额</a></li>
				</ul>
			</dd>
		</dl>

		<dl class="dl_nav">
			<dt><i class="icon iconfont">&#xe645;</i><a href="javascript:;">数据下载</a></dt>
			<dd>
				<ul>
					<li><a href="/yich/OrderFinance">财务数据</a></li>
				</ul>
			</dd>
		</dl>

		<dl class="dl_nav">
			<dt><i class="icon iconfont">&#xe66f;</i><a href="javascript:;">数据上传</a></dt>
			<dd>
				<ul>
					<li><a  href="/yich/advertLink">广告资源上传</a></li>
					<li><a href="/yich/wapshow/src/html/orderCenterComShowModel.html" target='_blank'>企业秀系统模板</a></li>
				</ul>
			</dd>
		</dl>
		
		<dl class="dl_nav">
			<dt><i class="icon iconfont">&#xe65c;</i><a href="javascript:;">微信公众号推广</a></dt>
			<dd>
				<ul>
					<li><a  href="/yich/Order/Order_popularizeManage.html">频道管理</a></li>
					<li><a  href="/yich/Order/Order_enterIntention.html">入驻意向</a></li>
				</ul>
			</dd>
		</dl>
		
		<dl class="dl_nav">
			<dt><i class="icon iconfont">&#xe657;</i><a href="javascript:;">反馈信息</a></dt>
			<dd>
				<ul>
					<li><a href="/yich/febList">用户反馈</a></li>
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
