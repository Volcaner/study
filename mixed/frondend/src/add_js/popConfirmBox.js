/**
 * kaican
 * 1. PopConfirm（弹出框提示）
 * 2. 方法：
 * 		init
 * 		show
 * 		hide
 * 		distroy
 * 3. 调用方法：如下
 * var PopConfirm = new $.PopConfirm();
 * PopConfirm.init({
 * 	parentEl: $("body"),
 * 	title: "确认删除子菜单",
 * 	text: "确定删除子菜单吗？",
 * 	confirmName: "确定",  // 有则显示，无则不显示
 * 	cancelName: "取消",  // 有则显示，无则不显示
 *     success: function() {
 *         console.log("ok");
 *         _handleDel();
 * 
 *         PopConfirm.distroy();
 *     },
 * });
 * PopConfirm.show();
 */

import jQuery from 'expose?$!jquery'

(function($) {
	$.PopConfirm = function() {
		var self = this;

		this.localDataCache = {};

		this.init = function(obj) {
			self.localDataCache = obj;

			var strConfirmHtml = obj.confirmName?'<input type="button" value="' + obj.confirmName + '" class="pma_true pma_btn">':'';
			var strCancelHtml = obj.cancelName?'<input type="button" value="' + obj.cancelName + '" class="pma_cancel pma_btn">':'';

			var strHtml = '\
				<div class="popConfirm hide">\
					<div class="popMianArea">\
						<div class="pma_top">\
							<span>' + obj.title + '</span>\
							<i></i>\
						</div>\
						<div class="pma_content">\
							<p>' + obj.text + '</p>\
						</div>\
						<div class="pma_bottom">' + strConfirmHtml + strCancelHtml + '</div>\
					</div>\
				</div>\
			';
			obj.parentEl.append(strHtml);

			// 监听 window resize 事件
			$(window).resize(function() {
				_resize();
			});

			// 监听 确定  事件
			$(".pma_true").on("click", function(eClick) {
				if(obj.success) {
					obj.success();
				}
			});

			// 监听 取消  事件 
			$(".pma_cancel, .pma_top>i").on("click", function(eClick) {
				self.distroy();
			});
		};

		this.show = function() {
			$(".popConfirm").removeClass("hide");
			_resize();
		};

		this.hide = function() {
			$(".popConfirm").addClass("hide");
		};

		this.distroy = function() {
			$(".popConfirm").empty();
			$(".popConfirm").remove();
		};

		var _resize = function() {
			var wh = $(window).height();
			$(".popMianArea").css({
				"margin-top": (-$(".popMianArea").height()/2) + 'px',
				"margin-left": (-$(".popMianArea").width()/2) + 'px',
			});
		};
	};
})(jQuery)