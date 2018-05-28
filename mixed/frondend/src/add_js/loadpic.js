function imgSel(url, dir, storeAsdir, filesarr_next, num, _this, length) {
		$(_this).parent().prev().html('');
		var lujin = dir + "" + storeAsdir.name;// 可以不写
		if ($(_this).parent().prev().children("img").length < length) {
			/* $(_this).parent().prev().prev().attr("src",""); */
			$(_this)
					.parent()
					.prev()
					.html(
							'<img src="'
									+ url
									+ '" class="zclc_tp"/><div class="pross_div"><span class="imgid"id="imgid'
									+ num + '"/></span></div>'
									
					);
		} else {
			$(_this).removeAttr("disabled");
		}
};
// 生成阿里云路径
function imglist(resut, _this) {
		var imgurl = "http://ngsimage.img-cn-hangzhou.aliyuncs.com/" + resut.name;
		$("#" + _this).parents("a").append(
				'<p style="display:none">"' + imgurl + '"</p>');
}

