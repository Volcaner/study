import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

var compare = function(propertyName) { 
    return function (object1, object2) { 
        var value1 = object1[propertyName]; 
        var value2 = object2[propertyName]; 
        if (value2 < value1) { 
            return -1; 
        } 
        else if (value2 > value1) { 
            return 1; 
        } 
        else { 
            return 0; 
        } 
    } 
};
var uuid = function(len, radix) {
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
};

const state = {
	zonPage: 1,
	nowPage: 1,
	list: [],
	defaultList: [
		{
			id: uuid(8),
			button: "仓储首页",
			button_order: 1,
			supshop_id: "",
			url: "06",
			type: "view",
			sub_button_list: [],
		},
		{
			id: uuid(8),
			button: "采购商群",
			button_order: 2,
			supshop_id: "",
			url: "02",
			type: "view",
			sub_button_list: [],
		},
		{
			id: uuid(8),
			button: "企业名片",
			button_order: 3,
			supshop_id: "",
			url: "03",
			type: "view",
			sub_button_list: [],
		},
	],
	linkList: [
		// {
		// 	id: "01",
		// 	name: "仓储下单",
		// },
		{
			id: "02",
			name: "采购商群",
		},
		{
			id: "03",
			name: "企业名片",
		},
		{
			id: "05",
			name: "预存卡",
		},
		{  // default
			id: "06",
			name: "仓储首页",
		},
		{
			id: "07",
			name: "采录库",
		},
		{
			id: "08",
			name: "采购单",
		},
		{
			id: "09",
			name: "订单",
		},
		{
			id: "10",
			name: "公众号文章",
		},
	],
	curList: [],
};

const mutations = {
	setData(state, res) {
		console.log(res);
		if(res && res.body) {
			let result = res.body;
			if(result.list && result.list.length > 0) {
				result.list.forEach(function(item, index) {
					if((isNaN(item.sub_button_order) || item.sub_button_order<=0) && !isNaN(item.button_order) && item.button_order>0) {
						var obj = {
							id: uuid(8),
							button: item.button,
							button_order: item.button_order,
							supshop_id: item.supshop_id,
							url: item.url,
							type: item.type,
							sub_button_list: [],
						};

						for(var i = 0; i < result.list.length; i++) {
							var subObj = result.list[i];
							if(!isNaN(subObj.sub_button_order) && subObj.sub_button_order>0 && !isNaN(subObj.button_order) && subObj.button_order==item.button_order) {
								obj.sub_button_list.push({
									parentId: obj.id,
									id: uuid(8),
									sub_button: subObj.sub_button,
									sub_button_order: subObj.sub_button_order,
									url: subObj.url,
									type: subObj.type,
								});
							}
						}

						obj.sub_button_list.sort(compare("sub_button_order")).reverse();
						state.list.push(obj);
					}
					else {
						// do nothing
					}
				});

				state.list.sort(compare("button_order")).reverse();

				if(state.list && state.list.length > 0) {
					state.list.forEach(function(o, b) {
						state.curList.push(o);
					});
				}
			}
		}
	},
	setCurList(state, list) {
		if(list && list.length > 0) {
			state.curList = [];
			list.forEach(function(o, b) {
				state.curList.push(o);
			});
		}
	},
	delCurListEl(state, item) {
		if(state.curList && state.curList.length > 0) {
			if(item.parentId) {
				for(var i = 0; i < state.curList.length; i++) {
					var obj = state.curList[i];
					if(obj.id == item.parentId) {
						var subButtonList = obj.sub_button_list;
						if(subButtonList && subButtonList.length > 0) {
							for(var j = 0; j < subButtonList.length; j++) {
								if(subButtonList[j].sub_button_order == item.sub_button_order) {
									subButtonList.splice(j, 1);
									break;
								}
							}
						}
						break;
					}
				}
			}
			else {
				for(var i = 0; i < state.curList.length; i++) {
					var obj = state.curList[i];
					if(obj.button_order == item.button_order) {
						state.curList.splice(i, 1);
						break;
					}
				}
			}
		}
	},
};

const actions = {
	Ajax(context) {
		let url = "/yich/DisplayMenu";
		let params = {};
		Vue.http.post(url, params, {emulateJSON: true}).then(function(res) {
			window.checkErrorVue(res);
			context.commit('setData', res);
		}, function(error) {
			console.log(error);
		});
	},
	Save(context) {
		let url = "/yich/CustomMenuServlet";
		let params = {
			button: [],
		};

		if(context.state.curList && context.state.curList.length > 0) {
			context.state.curList.forEach(function(item, index) {
				var obj = {};
				if(item.sub_button_list && item.sub_button_list.length > 0) {
					obj = {
						name: item.button,
						sub_button: [],
					};

					item.sub_button_list.forEach(function(subItem, subIndex) {
						var subObj = {
							type: subItem.type,
							name: subItem.sub_button,
							url: subItem.url,
						};

						obj.sub_button.push(subObj);
					});
				}
				else {
					obj = {
						type: item.type,
						name: item.button,
						url: item.url,
					};
				}

				params.button.push(obj);
			});
		}
		
		Vue.http.post(url, JSON.stringify(params), {emulateJSON: true}).then(function(res) {
			window.checkErrorVue(res);
			// context.commit('setData', res);
			console.log(res);

			if(res && res.body && 1 == res.body.result) {
				//保存弹框
				var _setSaveOkFun = function(tps){
					var timer = null;
					var te_tps = tps?tps:'保存成功！';
					var tpsBox = document.createElement('div');
					tpsBox.className = 'tipsBox';
					tpsBox.innerHTML = '<i></i><span>'+te_tps+'</span>';
					document.body.appendChild(tpsBox);
					timer=setTimeout(function(){
						tpsBox.parentNode.removeChild(tpsBox);
						clearTimeout(timer);
						timer = null;
					},2000);
				};
				_setSaveOkFun();
			}
			else {
				alert("保存失败！");
			}
		}, function(error) {
			console.log(error);
		});
	},
};

export default new Vuex.Store({
	state,
	mutations,
	actions,
});