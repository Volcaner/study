<template>
	<div class="selectLinkPlugin">
		<div class="sl_Area clearfix">
			<div class="sl_top"><span>选择文章</span><i @click='hideClick'></i></div>
			<div class="sl_center">
				<div class="slCenter_tab">
					<span data-slTab="PA" class="slTab_push" @click='tabClick'>推送文章</span>
					<span data-slTab="CA" class="slTab_custom" @click='tabClick'>自定义文章</span>
				</div>
				<div class="slCenter_main">
					<div class="sl_push clearfix hide">
						<div class="slCenterMain_search clearfix">
							<input type="text" placeholder="商品标题/货号" class="slSearch_inputBox">
							<input type="button" value="搜索" class="slSearch_btn">
						</div>

						<div class="slCenterMain_content">
							<div class="listTabs">
								<span></span>
								<span>文章标题</span>
								<span>发布日期</span>
								<span>操作</span>
							</div>
							<ul>
								<li>
									<span><input type="radio" name="customTitle" /></span>
									<span><h5>我是自定义文章标题</h5></span>
									<span><i>2018-04-06</i></span>
									<span><a href="javascript:;">预览</a></span>
								</li>
								<li>
									<span><input type="radio" name="customTitle" /></span>
									<span><h5>我是自定义文章标题</h5></span>
									<span><i>2018-04-06</i></span>
									<span><a href="javascript:;">预览</a></span>
								</li>
							</ul>
						</div>
						<div class="slCenterMain_pages">
							<fenye :page="zonPage"></fenye>
						</div>
					</div>

					<div class="sl_custom clearfix">
						<div class="slCenterMain_search clearfix">
							<input type="text" placeholder="商品标题/货号" class="slSearch_inputBox">
							<input type="button" value="搜索" class="slSearch_btn">
						</div>

						<div class="slCenterMain_create">
							<input type="button" value="新建自定义文章" class="" @click='clickCreateArticle()'>
						</div>

						<div class="slCenterMain_content">
							<div class="listTabs">
								<span></span>
								<span>文章标题</span>
								<span>保存日期</span>
								<span>操作</span>
							</div>
							<ul>
								<li>
									<span><input type="radio" name="customTitle" /></span>
									<span><h5>我是自定义文章标题</h5></span>
									<span><i>2018-04-06</i></span>
									<span><a href="javascript:;">预览</a><button type="button">删除</button></span>
								</li>
								<li>
									<span><input type="radio" name="customTitle" /></span>
									<span><h5>我是自定义文章标题</h5></span>
									<span><i>2018-04-06</i></span>
									<span><a href="javascript:;">预览</a><button type="button">删除</button></span>
								</li>
							</ul>
						</div>
						<div class="slCenterMain_pages">
							<fenye :page="zonPage"></fenye>
						</div>
					</div>

















					<!-- <div class="sl_pro clearfix">
						<div class="slCenterMain_search clearfix">
							<input type="text" placeholder="商品标题/货号" class="slSearch_inputBox">
							<input type="button" value="搜索" class="slSearch_btn">
						</div>
						<div class="slCenterMain_content">
							<ul></ul>
						</div>
						<div class="slCenterMain_pages">
							<p class="show_fy tcdPageCode" id="img_selfPro"></p>

							<fenye :page="zonPage" v-if="showFeny"></fenye>
						</div>
					</div>
					<div class="sl_assort clearfix hide">
						<div class="slCenterMain_content">
							<ul></ul>
							<a class="slAssort_mg" href="/yich/ShopClassrelationManage?page=1&choseFlag=1" target="_blank">管理分类</a>
						</div>
					</div> -->
				</div>
			</div>
			<div class="sl_bottom">
				<input type="button" value="确定" class="sl_true" @click='submitClick'>
				<input type="button" value="取消" class="sl_cancel" @click='cancelClick'>
			</div>
		</div>
	</div>
</template>
<!--   [if lt IE 9]>
	<script src="js/froala_editor_ie8.min.js"></script>
<![endif]> -->
<script src="js/js/froala_editor.min.js"></script>
<script type="text/javascript" charset="utf-8" defer>
	import fenye from '../component/fenye.vue';
	export default{
		data() {
			return {
				showFeny: true,
			}
		},
		computed:{
			// ...mapState(["zonPage"])
		},
		props:['bIsPopShow', 'zonPage'],
		mounted() {
			let that = this;

			// 监听 window resize 事件
			$(window).resize(function() {
    			that.resize();
    		});

    		if(this.bIsPopShow) {
    			this.resize();
    		}
		},
		methods: {
			clickCreateArticle: function() {
				window.open("/yich/Storage/Storage_article.html");
			},
			resize: function() {
				var wh = $(window).height();
				$(".slCenterMain_content").css("height", ((wh/2)-30) + 'px');
	    		$(".sl_Area").css({
	    			"margin-top": (-$(".sl_Area").height()/2) + 'px',
	    		});
			},
			tabClick: function(eClick) {
				var that = this;
    			$(eClick.currentTarget).addClass("activeTab");
    			$(eClick.currentTarget).siblings().removeClass("activeTab");

    			var dataSlTab = $(this).attr("data-slTab");
    			switch(dataSlTab) {
    				case "PRO": {
    					self.tab = "1";
    					$(".sl_pro").removeClass("hide");
    					$(".sl_pro").siblings().addClass("hide");

    					// post 
    					// _clearPage();
    					// var params = {
    					// 	modularId: self.localPluginCache.modularId,
    					// 	option: "1",
    					// 	page: 1,
    					// 	pagesize: 10,
    					// 	text: $(".slSearch_inputBox").val(),
    					// };
    					// _post4Link(params, function(res) {
    					// 	console.log(res);
    					// 	_drawPage4Pro(res);
    					// }, function(error) {
    					// 	console.log(error);
    					// });	
    					break;
    				}
    				case "ASSORT": {
    					self.tab = "2";
    					$(".sl_assort").removeClass("hide");
    					$(".sl_assort").siblings().addClass("hide");

    					// post
    					// _clearPage();
    					// var params = {
    					// 	modularId: self.localPluginCache.modularId,
    					// 	option: "2",
    					// 	page: 1,
    					// 	pagesize: 99,
    					// };
    					// _post4Link(params, function(res) {
    					// 	console.log(res);
    					// 	_drawPage4Assort(res);
    					// }, function(error) {
    					// 	console.log(error);
    					// });
    					break;
    				}
    				default: {
    					break;
    				}
    			}
			},
			hideClick: function(eClick) {
				this.$emit("hide", false);
			},
			cancelClick: function(eClick) {
				this.$emit("cancel", false);
			},
			submitClick: function(eClick) {
				this.$emit("submit", false);
			},
		},
		components:{
			"fenye": fenye,
		},
	}
</script>
<style scoped lang="less">
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	.clearfix:after{
		content: "";
		display: block;
		clear: both;
		zoom: 1;
		height: 1px;
	}
	.hide{
	  visibility: hidden !important;
	  height: 0 !important;
	  display: none !important;
	}

	.selectLinkPlugin{
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
	}

	.sl_Area{
		position: fixed;
		width: 70%;
		// min-height: 810px;
		border: 8px solid rgba(0, 0, 0, 0.2);
		left: 15%;
		top: 50%;
		// background: -webkit-linear-gradient(#fefefe, #d0d0d0);
		// background: -moz-linear-gradient(#fefefe, #d0d0d0);
		// background: linear-gradient(#fefefe, #d0d0d0);
		// background: -ms-linear-gradient(#fefefe, #d0d0d0);
		// background: -o-linear-gradient(#fefefe, #d0d0d0);
	}

	/***********sl_top*************/
	.sl_top{
		overflow: hidden;
		height: 38px;
		background: #e9e9e9;
		border-bottom: solid 1px #d2d2d2;
		line-height: 38px;
		font-size: 14px;
		color: #333333;
		font-weight: bold;
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
	}
	.sl_top>span{
		display: block;
		float: left;
		text-indent: 25px;
	}
	.sl_top>i{
		cursor: pointer;
		float: right;
		margin: 10px 10px 0 0;
		width: 13px;
		height: 13px;
		display: block;
		background: url(../../images/img.png) -145px -6px no-repeat;
		overflow: hidden;
	}

	/***********sl_bottom*************/
	.sl_bottom{
		height: 54px;
		border-top: solid 1px #d2d2d2;
		background: #e9e9e9;
		font-size: 12px;
		position: relative;
		left: 0;
		bottom: 0;
		width: 100%;
	}
	.sl_true{
		width: 48px;
		height: 26px;
		background: -webkit-linear-gradient(#fe403f, #ec1d1c);
		background: -moz-linear-gradient(#fe403f, #ec1d1c);
		background: linear-gradient(#fe403f, #ec1d1c);
		background: -ms-linear-gradient(#fe403f, #ec1d1c);
		background: -o-linear-gradient(#fe403f, #ec1d1c);
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#fe403f, endColorstr=#ec1d1c, GradientType='0');
		border: solid 1px #e20000;
		border-radius: 3px;
		color: #ffffff;
		float: left;
		margin: 12px 0 0 24px;
		cursor: pointer;
	}
	.sl_cancel{
		width: 48px;
		height: 26px;
		background: -webkit-linear-gradient(#fefefe, #d0d0d0);
		background: -moz-linear-gradient(#fefefe, #d0d0d0);
		background: linear-gradient(#fefefe, #d0d0d0);
		background: -ms-linear-gradient(#fefefe, #d0d0d0);
		background: -o-linear-gradient(#fefefe, #d0d0d0);
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#fefefe, endColorstr=#d0d0d0, GradientType='0');
		color: #333333;
		float: left;
		margin: 12px 0 0 10px;
		border: solid 1px #bbbbbb;
		border-radius: 3px;
		cursor: pointer;
	}

	/***********sl_center*************/
	.sl_center{
		position: relative;
		background: #fff;
	}

	.slCenter_tab{
		position: relative;
		height: 47px;
		margin: 0 20px;
		border-bottom: 1px solid #cbcbcb;
	}
	.slCenter_tab>span{
		position: relative;
		float: left;
		display: block;
		padding: 0 12px;
		margin-right: 11px;

		line-height: 43px;
		font-size: 14px;
		color: #777;
		cursor: pointer;
	}
	.activeTab{
		border-bottom: 3px solid #f44343;
	}

	.slCenter_main{

	}
	.sl_pro{

	}
	.slCenterMain_search{
		position: relative;
		margin: 6px 0 0 34px;
	}
	.slCenterMain_search>.slSearch_inputBox{
		display: block;
		float: left;
		width: 250px;
		padding: 0 8px;
		margin-right: 10px;
		border: 1px solid #d2d2d2;
		border-radius: 2px;
		line-height: 28px;
		color: #212121;
	}
	.slCenterMain_search>.slSearch_btn{
		display: block;
		float: left;
		border: 1px solid #999;
		width: 50px;
		line-height: 28px;
		text-align: center;
		color: #212121;
		border-radius: 3px;
		cursor: pointer;
		background: -webkit-linear-gradient(#fff, #e3e3e3); /* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(#fff, #e3e3e3); /* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(#fff, #e3e3e3); /* Firefox 3.6 - 15 */
		background: linear-gradient(#fff, #e3e3e3); /* 标准的语法 */
	}
	.slCenterMain_create{
		position: relative;
		display: block;

		>input{
			// width: 48px;
			padding: 0 10px;
			height: 26px;
			background: -webkit-linear-gradient(#fe403f, #ec1d1c);
			background: -moz-linear-gradient(#fe403f, #ec1d1c);
			background: linear-gradient(#fe403f, #ec1d1c);
			background: -ms-linear-gradient(#fe403f, #ec1d1c);
			background: -o-linear-gradient(#fe403f, #ec1d1c);
			filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#fe403f, endColorstr=#ec1d1c, GradientType='0');
			border: solid 1px #e20000;
			border-radius: 3px;
			color: #ffffff;
			// float: left;
			margin: 12px 0 0 24px;
			cursor: pointer;
		}
	}
	.slCenterMain_pages{
		float: right;
	}
	.slCenterMain_content{
		margin-top: 15px;
		overflow: auto;
	}
	.slCenterMain_content>ul{
		list-style: none;
	}
	.slCenterMain_content>ul>li{

	}
	.slCenterMain_content>ul>li>div{
		margin: 0 34px 10px 34px;
	}
	.sl_pro>.slCenterMain_content>ul>li>div>input{
		float: left;
		width: 18px;
		height: 18px;
		margin: 21px 18px 21px 0;
		cursor: pointer;
	}
	.sl_pro>.slCenterMain_content>ul>li>div>img{
		float: left;
		display: block;
		width: 60px;
		height: 60px;
		border: 1px solid #e9e9e9;
	}
	.sl_pro>.slCenterMain_content>ul>li>div>p{
		float: left;
		display: block;
		width: calc( 80% - 96px);
		height: 100%;
		padding-top: 12px;
		padding-left: 12px;
	}
	.sl_pro>.slCenterMain_content>ul>li>div>p>span{
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis; 
		-o-text-overflow: ellipsis;
		font-size: 14px;
		color: #777;
		line-height: 1;
		padding-bottom: 10px;
	}
	.sl_pro>.slCenterMain_content>ul>li>div>p>b{
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis; 
		-o-text-overflow: ellipsis;
		font-weight: normal;
		font-size: 14px;
		color: #777;
		line-height: 1;
	}
	.sl_pro>.slCenterMain_content>ul>li>div>span{
		float: left;
		display: block;
		width: 20%;
		height: 60px;
		line-height: 60px;
		color: #f44336;
		font-size: 14px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis; 
		-o-text-overflow: ellipsis;
	}

	.sl_assort>.slCenterMain_content>ul>li>div>input{
		float: left;
		width: 18px;
		height: 18px;
		margin: 16px 18px 16px 0;
		cursor: pointer;
	}
	.sl_assort>.slCenterMain_content>ul>li>div>label{
		float: left;
		display: block;
		height: 50px;
		line-height: 50px;
		padding-left: 12px;
		font-size: 14px;
		color: #777;
	}
	.sl_assort>.slCenterMain_content>a{
		float: left;
		display: block;
		font-size: 14px;
		color: #005aff;
		margin-left: 80px;
		margin-top: 12px;
		margin-bottom: 50px;
		cursor: pointer;
		text-decoration: none;
	}

	/***********分页*************/
	/*分页*/
	.tcdPageCode {
	  padding: 11px 12px;
	  text-align: left;
	  color: #ccc;
	}
	.tcdPageCode a {
	  color: #626262;
	  display: inline-block;
	  height: 28px;
	  line-height: 28px;
	  padding: 0 9px;
	  border: 1px solid #e6e6e6;
	  border-left: 0;
	  vertical-align: middle;
	}
	.tcdPageCode span.current {
	  display: inline-block;
	  height: 28px;
	  line-height: 28px;
	  padding: 0 9px;
	  color: #005aff;
	  border: 1px solid #e6e6e6;
	  border-left: 0;
	  vertical-align: middle;
	}
	.tcdPageCode span.disabled {
	  display: inline-block;
	  height: 28px;
	  line-height: 28px;
	  font-size: 24px;
	  color: #fff;
	  background: #e9e9e9;
	  border: 1px solid #e6e6e6;
	  vertical-align: middle;
	}
	.tcdPageCode span.current:nth-child(2) {
	  border-left: 1px solid #e6e6e6;
	}
	.tcdPageCode .tcdNumber:nth-child(2) {
	  border-left: 1px solid #e6e6e6;
	}
	.tcdPageCode span.firDisable {
	  width: 34px;
	  line-height: 24px !important;
	  margin-right: 8px;
	  text-align: center;
	}
	.tcdPageCode span.lasDisable {
	  width: 34px;
	  line-height: 24px !important;
	  margin-left: 8px;
	  text-align: center;
	}
	.prevPage {
	  width: 34px;
	  font-size: 24px;
	  margin-right: 8px;
	  line-height: 24px !important;
	  background: #e9e9e9;
	  color: #fff !important;
	  border-left: 1px solid #e6e6e6 !important;
	}
	.nextPage {
	  width: 34px;
	  font-size: 24px;
	  margin-left: 8px;
	  line-height: 24px !important;
	  background: #e9e9e9;
	  color: #fff !important;
	  border-left: 1px solid #e6e6e6 !important;
	}
	.layp_jumpBox {
	  display: inline-block;
	  margin-left: 12px;
	  font-size: 14px;
	  color: #626262;
	  vertical-align: middle;
	}
	.layp_jumpBox .layp_jumpNum {
	  width: 30px;
	  height: 27px;
	  border: 1px solid #e6e6e6;
	  text-align: center;
	}
	.layp_jumpBox input::-webkit-outer-spin-button,
	.layp_jumpBox input::-webkit-inner-spin-button {
	  -webkit-appearance: none;
	}
	.layp_jumpBox input[type="number"] {
	  -moz-appearance: textfield;
	}
	.layp_jumpBox .layp_jumpBtn {
	  height: 27px;
	  width: 50px;
	  font-size: 14px;
	  color: #626262;
	  cursor: pointer;
	  border-radius: 3px;
	  margin-left: 12px;
	  border: 1px solid #e6e6e6;
	  background: transparent;
	}
/************************/
</style>