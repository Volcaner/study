<!-- 
	kaican
	wechat official account setting
 -->

<template>
	<div class="woas">
		<top></top>
		<StorageTop></StorageTop>
		<div class="auto_main">
			<leftNavWechat></leftNavWechat>
			<div class="right">
				<p class="woas_top"><a href="javascript:;">自定义菜单</a></p>
				<div class="woas_content clearfix">
					<div class="woasc_phone">
						<div class="phone_top">
							<img src="../../images/phoneTop.png" alt="">
						</div>
						<div class="phone_center">
							<div class="fixed_header">
								<img src="../../images/phoneFixedHeader.png" alt="">
								<p>公众号名称</p>
							</div>

							<div class="edit_orders">
								<span><img src="../../images/txtInput.png" alt=""></span>
								<ul class="order_list clearfix">
									<template v-for="(item, index) in curList">
										<li :id='"order_" + item.id' @click='orderClickEvent($event, item)' :style='"width: calc(" + (100/(curList.length>=3?curList.length:curList.length+1)+"%") + " - 2px);"'>
											<i v-if='item.sub_button_list.length>0' class="iconfont icon">&#xe6d1;</i>
											{{item.button}}
										</li>

										<ul :id='"subOrderList_" + item.id' class="subOrder_list clearfix hide" :style='"width: calc(" + (100/(curList.length>=3?curList.length:curList.length+1)+"%") + " - 2px); left:" + (100/(curList.length>=3?curList.length:curList.length+1)*index+"%") + ";"'>
											<i></i>
											<li :id='"subOrder_" + subItem.id'  @click='subOrderClickEvent($event, subItem)' v-for='subItem in item.sub_button_list'>{{subItem.sub_button}}</li>
											<li v-if='item.sub_button_list.length<5' @click='subOrderAddClickEvent($event, item)' class="order_add">+</li>
										</ul>
									</template>

									<li v-if='curList.length<3' class="order_add" @click='orderAddClickEvent($event)' :style='"width: calc(" + (100/(curList.length>=3?curList.length:curList.length+1)+"%") + " - 2px);"'>+</li>
								</ul>
							</div>
						</div>
						<div class="phone_bottom">
							<img src="../../images/phoneBottom.png" alt="">
						</div>
					</div>

					<div v-show='bIsShowEdit' class="woasc_edit">
						<p class="editBox_top clearfix"><span>{{activeObj.parentId?activeObj.sub_button:activeObj.button}}</span><b @click='delOrderClickEvent'>{{activeObj.parentId?"删除子菜单":"删除菜单"}}</b></p>
						<div class="editBox_center">
							<label class="clearfix">
								<span>{{activeObj.parentId?"子菜单名称":"菜单名称"}}</span>
								<input v-model='orderName' type="text" name="">
								<b>字数不超过4个汉字或8个字符</b>
							</label>
							<label class="clearfix">
								<span>{{activeObj.parentId?"子菜单链接":"菜单链接"}}</span>
								<select v-model='selected' :onchange="ordedrLinkChange(selected)">
									<option :id='"order_"+item.id' :value='item.id' v-for='item in linkList'>{{item.name}}</option>
								</select>
							</label>
						</div>
						<div class="editOrder_handle">
							<transition name="component-fade" mode="out-in">
								<div v-if='selected=="10"' class="publicNumAirticle">
									<a href="javascript:;" @click='clickShowArticlePop'>从公众号文章中选择</a>
									<br />
									<a href="javascript:;" @click='clickShowArticlePop'>请选择一篇文章</a>
								</div>
							</transition>
						</div>
						<div class="editBox_recovery">
							<b @click='recoveryClickEvent'>恢复默认菜单</b>
							<p>默认菜单: 仓储首页 采购商群 企业名片</p>
						</div>
					</div>
					<div v-show='!bIsShowEdit' class="woasc_editTip">
						<p>请点击左侧菜单进行编辑</p>
					</div>
				</div>
				<div class="woas_footer">
					<button type="button" @click='saveAndPublish'>保存并发布</button>
				</div>
			</div>
		</div>
		<bottom></bottom>
		<ArticleLinkSelect v-if='bIsArticlePopShow' :bIsPopShow='bIsArticlePopShow' :zonPage="zonPage" @hide='hideArticlePop(bool)' @cancel='hideArticlePop(bool)'></ArticleLinkSelect>
	</div>
</template>

<script type="text/javascript" charset="utf-8" defer>
	import top from '../component/top.vue';
	import StorageTop from '../component/StorageTop.vue';
	import bottom from '../component/bottom.vue';
	import leftNavWechat from '../component/leftNavWechat.vue';
	import {mapState,mapMutations,mapActions} from 'vuex';
	import PopConfirm from '../../add_js/popConfirmBox.js';
	import ArticleLinkSelect from '../component/articleLinkSelect.vue';

	export default{
		data(){
			return{
				activeObj: {},  // 当前选中的菜单/子菜单
				selected: "",  // link selected
				orderName: "",
				bIsShowEdit: false,

				bIsArticlePopShow: false,
			}
		},
		computed:{
			...mapState(["list", "curList", "defaultList", "linkList", "zonPage"]),
		},
		methods:{
			clickShowArticlePop: function() {
				this.bIsArticlePopShow = true;
			},
			hideArticlePop: function(bool) {
				this.bIsArticlePopShow = bool;
			},
			ordedrLinkChange: function(selected) {
				console.log(selected);
			},
			orderClickEvent: function(e, item) {
				var that = this;
				console.log(e.currentTarget);
				this.activeOrder(item.id);

				this.activeObj = item;

				this.handleEditBox(true);
			},
			subOrderClickEvent: function(e, item) {
				var that = this;
				console.log(e.currentTarget);
				this.activeSubOrder(item.id);

				this.activeObj = item;

				this.handleEditBox(true);
			},
			orderAddClickEvent: function(e) {
				var that = this;
				console.log(e.currentTarget);

				// 数据处理
				var orderObj = {
					id: this.uuid(8),
					button: "菜单",
					button_order: this.curList.length+1,
					supshop_id: "",
					url: "06",
					type: "view",
					sub_button_list: [],
				};

				this.curList.push(orderObj);

				// 触发 click 事件
				setTimeout(function() {
					$("#order_" + orderObj.id).trigger("click");
				}, 0);
			},
			subOrderAddClickEvent: function(e, parentItem) {
				var that = this;
				console.log(e.currentTarget);

				// 数据处理
				var subOrderObj = {
					parentId: parentItem.id,
					id: this.uuid(8),
					sub_button: "子菜单",
					sub_button_order: parentItem.sub_button_list.length+1,
					url: "06",
					type: "view",
				};

				parentItem.sub_button_list.push(subOrderObj);

				// 触发 click 事件
				setTimeout(function() {
					$("#subOrder_" + subOrderObj.id).trigger("click");
				}, 0);
			},
			recoveryClickEvent: function() {
				var that = this;
				var PopConfirm = new $.PopConfirm();
			    PopConfirm.init({
			    	parentEl: $("body"),
			    	title: "恢复默认菜单",
			    	text: "确定恢复默认菜单吗？恢复后，菜单将变为：仓储首页，采购商群，企业名片，确定恢复吗？",
			    	confirmName: "确定",
			    	cancelName: "取消",
				    success: function() {
		                console.log("ok");
		                that.$store.commit('setCurList', that.defaultList);

						that.handleEditBox(false);
						that.activeObj = {};
						that.unActiveAllOrder();

						// 触发 click 事件
						setTimeout(function() {
							$(".order_list>li:eq(0)").trigger("click");
						}, 0);

		                PopConfirm.distroy();
				    },
			    });
			    PopConfirm.show();
			},
			delOrderClickEvent: function() {
				var that = this;
				var _handleDel = function() {
					that.$store.commit('delCurListEl', that.activeObj);

					var parentId;
					if(that.activeObj.parentId) {
						parentId = that.activeObj.parentId;
					}

					that.handleEditBox(false);
					that.activeObj = {};
					that.unActiveAllOrder();

					// 触发 click 事件
					setTimeout(function() {
						if(parentId) {
							$("#order_" + parentId).trigger("click");
						}
					}, 0);
				};



				if(this.activeObj.parentId) {
					var PopConfirm = new $.PopConfirm();
				    PopConfirm.init({
				    	parentEl: $("body"),
				    	title: "确认删除子菜单",
				    	text: "确定删除“" + this.activeObj.sub_button + "”子菜单吗？",
				    	confirmName: "确定",
				    	cancelName: "取消",
					    success: function() {
			                console.log("ok");
			                _handleDel();

			                PopConfirm.distroy();
					    },
				    });
				    PopConfirm.show();
				}
				else {
					if(this.curList && this.curList.length < 2) {
						var PopConfirm = new $.PopConfirm();
						PopConfirm.init({
					    	parentEl: $("body"),
					    	title: "删除菜单",
					    	text: "无法删除，请至少保留一个菜单！",
					    	confirmName: "知道了",
						    success: function() {
				                console.log("ok");

				                PopConfirm.distroy();
						    },
					    });
					    PopConfirm.show();
					}
					else {
						var PopConfirm = new $.PopConfirm();
						PopConfirm.init({
					    	parentEl: $("body"),
					    	title: "确认删除菜单",
					    	text: "删除菜单后，“" + this.activeObj.button + "”菜单下添加的内容将被删除，确定删除菜单吗？",
					    	confirmName: "确定",
				    		cancelName: "取消",
						    success: function() {
				                console.log("ok");
				                _handleDel();

				                PopConfirm.distroy();
						    },
					    });
					    PopConfirm.show();
					}
				}
			},
			saveAndPublish: function() {
				var that = this;
				var PopConfirm = new $.PopConfirm();
				PopConfirm.init({
			    	parentEl: $("body"),
			    	title: "保存并发布",
			    	text: "发布成功后会覆盖原版本，确定发布吗？",
			    	confirmName: "确定",
		    		cancelName: "取消",
				    success: function() {
		                console.log("ok");
		                that.$store.dispatch('Save');

		                PopConfirm.distroy();
				    },
			    });
			    PopConfirm.show();
			},
			handleEditBox: function(bool) {
				this.bIsShowEdit = bool;
			},
			activeOrder: function(id) {
				$("#order_" + id).addClass("order_active");
				$("#order_" + id).siblings().removeClass("order_active");
				$("#subOrderList_" + id).removeClass("hide");
				$("#subOrderList_" + id + ">li").removeClass("order_active");
				$("#subOrderList_" + id).siblings("ul").addClass("hide");
			},
			activeSubOrder: function(id) {
				$("#subOrder_" + id).addClass("order_active");
				$("#subOrder_" + id).siblings().removeClass("order_active");
				$("#subOrder_" + id).parent().siblings("li").removeClass("order_active");
			},
			unActiveAllOrder: function() {
				$(".order_list").find("ul").addClass("hide");
				$(".order_active").removeClass("order_active");
			},
			getStrLen: function(str) {
				if (str == null) return 0;
				if (typeof str != "string"){
					str += "";
				}
				return str.replace(/[^\x00-\xff]/g,"01").length;
			},
			uuid: function(len, radix) {
			    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
			    var uuid = [], i;
			    radix = radix || chars.length;
			 
			    if (len) {
			      // Compact form
			      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
			    } else {
			      // rfc4122, version 4 form
			      var r;
			 
			      // rfc4122 requires these characters
			      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
			      uuid[14] = '4';
			 
			      // Fill in random data.  At i==19 set the high bits of clock sequence as
			      // per rfc4122, sec. 4.1.5
			      for (i = 0; i < 36; i++) {
			        if (!uuid[i]) {
			          r = 0 | Math.random()*16;
			          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			        }
			      }
			    }
			 
			    return uuid.join('');
			},
		},
		beforeMount:function(){
			this.$store.dispatch('Ajax');
		},
		mounted() {
			// $("option#order_02").attr("selected", "");
		},
		components:{
			"top": top,
			"StorageTop": StorageTop,
	     	"bottom": bottom,
	     	"leftNavWechat": leftNavWechat,
	     	"ArticleLinkSelect": ArticleLinkSelect,
		},
		watch: {
			activeObj(newVal, oldVal) {
				console.log(newVal, oldVal);

				this.selected = newVal.url;
				this.orderName = newVal.parentId?newVal.sub_button:newVal.button;
			},
			orderName(newVal, oldVal) {
				console.log(newVal);

				if(this.getStrLen(newVal) > 8) {
					this.orderName = oldVal;
				}

				if(this.activeObj.parentId) {
					this.activeObj.sub_button = this.orderName;
				}
				else {
					this.activeObj.button = this.orderName;
				}
			},
			selected(newVal, oldVal) {
				console.log(newVal);

				this.activeObj.url = newVal;
			},
			deep: true,
		},
	}
</script>

<style scoped lang="less">
	.component-fade-enter-active {
	    transition: opacity .3s ease;
	}
	.component-fade-enter
	/* .component-fade-leave-active for below version 2.1.8 */ {
	    opacity: 0;
	}
</style>