<template>
<dl id="bottom">
	<dt>
		<!-- <ul class="bot_top">
			<li><span class="btop"><i class="icon iconfont">&#xe61a;</i></span><span>优质货源</span></li>
			<li><span class="btop"><i class="icon iconfont">&#xe7a1;</i></span><span>底价采购</span></li>
			<li><span class="btop"><i class="icon iconfont">&#xe624;</i></span><span>极速物流</span></li>
			<li><span class="btop"><i class="icon iconfont">&#xe64a;</i></span><span>售后无忧</span></li>
			<li><span class="btop"><i class="icon iconfont">&#xe604;</i></span><span>服务评分</span></li>
			<li><span class="btop"><i class="icon iconfont">&#xe741;</i></span><span>合作共赢</span></li>
		</ul> -->
	</dt>
	<dd style="border-top:0;">
		<ul class="bot_midel">
			<li>
				<p>新手帮助</p>
				<a href="/yich/User/User_matters.html?state=8" target="_blank">入驻流程</a>
				<a href="/yich/User/User_matters.html?state=7" target="_blank">怎么注册</a>
				<a href="/yich/User/User_matters.html?state=0" target="_blank">交易等级</a>
			</li>
			<li>
				<p>关于支付</p>
				<a href="/yich/User/User_matters.html?state=6" target="_blank">支付流程</a>
				<a href="/yich/User/User_matters.html?state=9" target="_blank">支付问题</a>
				<a href="/yich/User/User_matters.html?state=12" target="_blank">价格计算</a>
			</li>
			<li>
				<p>售后服务</p>
				<a href="/yich/User/User_matters.html?state=3" target="_blank">仅退款流程</a>
				<a href="/yich/User/User_matters.html?state=4" target="_blank">退货流程</a>
				<a href="/yich/User/User_matters.html?state=5" target="_blank">换货流程</a>
			</li>
			<li>
				<p>商家后台</p>
				<a class="user_log" href="javascript:;" target="_blank">商户后台</a>
				<a class="shop_log" href="javascript:;" target="_blank">仓储后台</a>
				<a href="/yich/AttractInvestmentServlet" target="_blank">蚁巢入驻</a>
			</li>
			<li>
				<p>合作关系</p>
				<a href="/yich/User/User_matters.html?state=11" target="_blank">合作价格</a>
				<a href="/yich/User/User_matters.html?state=1" target="_blank">服务评分</a>
				<a href="/yich/User/User_matters.html?state=10" target="_blank">拼团说明</a>
			</li>
			<li>
				<p>关于我们</p>
				<a href="/yich/ViewYcZpZs?ycZpZsId=1" target="_blank">关于蚁巢</a>
				<a href="/yich/AttractInvestmentServlet" target="_blank">蚁巢招商</a>
				<a href="/yich/ProsceniumServlet" target="_blank">联系我们</a>
			</li>
			<li>
				<p class="wx_title">微信公众号</p>
				<img src="/yich/s_images/wxlogo.png">
			</li>
		</ul>
	</dd>
	<dd>
		<div class="bot_down">
			<!--<p><i></i>2016 杭州新共秀网络科技有限公司版权所有 浙ICP备15005646号-1</p>-->
			<p>© 2016 杭州新共秀网络科技有限公司版权所有 浙ICP备15005646号-1</p>
			<a href="http://www.12377.cn/" target="_blank"></a>
			<a href="http://www.bj.cyberpolice.cn/index.do" target="_blank"></a>
			<a href="http://www.gsxt.gov.cn/index.html" target="_blank"></a>
		</div>
	</dd>
</dl>
</template>

<style scoped>
#bottom{
	width: 100%;
	background: #fff;
}
#bottom>dt{
	width: 1200px;
	margin: 0 auto;
}
#bottom>dd{
	width: 1200px;
	border-top: 1px solid #e9e9e9;
	margin: 0 auto;
}
.bot_top>li>span{
	float: left;
	display: inline-block;
}
.bot_top>li>span:last-child{
	height: 72px;
	line-height: 72px;
}
.btop{
	position: relative;
	width: 70px;
	height: 70px;
	border:1px solid #e20000;
	border-radius: 70px;
	margin-right: 12px;
	line-height:70px;
	text-align:center;
}
.btop>i{
	font-size:32px;
	color:#e20000;
}
.bot_top{
	padding: 25px 0;
	overflow: hidden;
}
.bot_top>li{
	float: left;
	width: 200px;
	overflow: hidden;
}
.bot_midel{
	padding: 40px 0; 
	overflow: hidden;
}
.bot_midel>li{
	float: left;
	width: 171px;
}
.bot_midel>li>p{
	font-size: 14px;
	color: #626262;
	margin-bottom: 15px;
}
.bot_midel>li>a{
	display: block;
	font-size: 12px;
	color: #999999;
	margin-bottom: 12px;
}
.bot_midel>li>img{
	width:100px;
	height:100px;
}
.bot_down{
	width: 800px;
	padding:20px 0; 
	margin: 0 auto;
	font-size: 12px;
	color: #626262;
	overflow: hidden;
}
.bot_down>p{
	float: left;
	height: 32px;
	line-height: 32px;
}

.bot_down>a{
	float: right;
	display: inline-block;
	width: 103px;
	height: 32px;
	margin-left: 25px;
}
.bot_down>a:nth-child(2){
	background: url(../../images/bot_bottom3.png)no-repeat;
}
.bot_down>a:nth-child(3){
	background: url(../../images/bot_bottom2.png)no-repeat;
	
}
.bot_down>a:nth-child(4){
	background: url(../../images/bot_bottom1.png)no-repeat;
	
}
.wx_title{
	padding-left:15px;
}
</style>