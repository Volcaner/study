/*
*商户-创建拼团
*/
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

const state={
	islookmore:false,
	supName:'',
	supShopId:'',//仓储id
	proId:'',//商品id
	name:'',//搜索name
	proName:'',
	goodNo:'',
	imgSrc:'',
	isDisplay:'0',
	totalPrice:0,
	goodsDataList:[],
	showGroupXq:false,
	showGroupMotai:false,//选择商品模态
	isSuccess:false,
	skuStarDataList:[],//商品sku初始所有数据
	skuDataList:[],
	skuAllDataList:[],
	pieceTitle:[],//头部件数批次
	minPrice:[],
	minNum:[],
	allPrice:[],//小计金额
	finalData:[],//提交数据
	
	showFeny:false,//是否显示分页
	page:1, //页码
	zonPage:1,//总页码数
}
const mutations={
	page(state,obj){//页码
		state.page=obj.page;
	},
	creatGroupStar(state){
		Vue.http.post('/yich/GroupCoopers',{emulateJSON:true}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			// if(typeof (response.data.check)!='undefined' && response.data.check){
				 state.supName = response.data;
			/* }else{
				 alert("输入不合法");
			 }*/
			
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
	//选择商品
	checkGoodsStar(state){
		Vue.http.post('/yich/SelectGroupGoods',{name:state.name,supshopId:state.supShopId,page:state.page},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			window.checkErrorVue(response);
			if(response.data.totalPage<1){
				state.showFeny = false;
				state.zonPage = 1;
			}else{
				state.showFeny = true;
				state.zonPage = response.data.totalPage;
			};
			if(response.data.list.length>0){
				getGoodsData(response.data.list);
			}else{
				state.goodsDataList =[];
			}
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
	//将要拼团的商品
	goodsConDataStar(state){
		Vue.http.post('/yich/SelectOneGood',{supshopId:state.supShopId,proId:state.proId},{emulateJSON:true}).then((response) => {
			// 响应成功回调
			window.checkErrorVue(response);
			state.proName = response.data.product.pro_name;
			state.goodNo = response.data.product.good_no;
			state.imgSrc = imgchange(response.data.product.proImage.src,"@76w_76h");
			state.isDisplay = response.data
			if(response.data.product.shopInvtory.length>0){
				getPtGoodsData(response.data.product.shopInvtory);
				getFinalData(response.data.product.shopInvtory)
				state.showGroupMotai = false;
				state.showGroupXq = false;
				setTimeout(function(){ //刷新数据
					state.showGroupXq = true;
				},10)
				
				
			}
			
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	},
	
	tiJDataAjax(state){
		var dis0 = 'N',dis1 ='N',dis2='N';
		if(state.pieceTitle.length == 3){
			dis0 = state.pieceTitle[1];
		}else if(state.pieceTitle.length > 3){
			dis0 = state.pieceTitle[1];
			dis1 = state.pieceTitle[2];
		}
		if(state.pieceTitle.length>1){
			dis2 = state.pieceTitle[state.pieceTitle.length-1].split("≥ ")[1] ? state.pieceTitle[state.pieceTitle.length-1].split("≥ ")[1] : '';
		}
		Vue.http.post('/yich/CreateGroup',{supshopId:state.supShopId,proId:state.proId,proName:state.proName,goodNo:state.goodNo,src:state.imgSrc,discount1:dis0,discount2:dis1,discount3:dis2,isDisplay:state.isDisplay,good:state.finalData}).then((response) => {
			// 响应成功回调
			window.checkErrorVue(response);
			if(response.data.result == 1){
				state.isSuccess = true;
				setTimeout(function(){
					state.isSuccess = false;
					window.location.href="/yich/User/User_UGnav.html";
				},3000)
			}else{
				alert("提交失败!!");
			}
			
		},(response) => {
			// 响应错误回调
			console.log("error");
		});
	}
	
}
const actions={
	creatGroupStar(context){
		context.commit("creatGroupStar");
	},
	checkGoodsStar(context){
		context.commit("checkGoodsStar");
	},
	goodsConDataStar(context){
		context.commit("goodsConDataStar");
	},
	tiJDataAjax(context){
		context.commit("tiJDataAjax");
	},
	Ajax(context){
		context.commit("checkGoodsStar");
	},
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})
function getGoodsData(data){
	var goodlist=[];
	for(var i in data){
		var json = {imgsrc:'',goodsName:'',goodsNo:'',price:'',isPtemplate:'无',istemp:'0',proId:''};
		json.imgsrc = imgchange((data[i].proImage.src),"@50w_50h");
		json.goodsName = data[i].pro_name;
		var p=(data[i].region).split("￥");
		json.price = "￥"+parseFloat(p[1]);
		json.isPtemplate = data[i].isTemplate == 0? '无':'有';
		json.istemp = data[i].isTemplate;
		json.proId = data[i].pro_id;
		
		goodlist.push(json);
	}
	state.goodsDataList = goodlist;
}
function getPtGoodsData(data){
	if(data[0].wholesalePrice){
		state.pieceTitle =  getTitle(data[0].wholesalePrice);
	}
	if(data.length > 3){
		state.skuStarDataList = cirSumSetData(data);
		state.skuDataList = cirSumSetData(data);
		state.skuAllDataList =cirAllSetData(data);
		state.islookmore = true;
	}else{
		state.skuDataList =cirAllSetData(data);
		state.islookmore = false;
	}
}
function getTitle(list){
	var temptitle = [];
	var one_num = "";
	if(list.standard0 && list.standard0 != "N" &&  parseInt(list.standard0)>1){
		one_num = parseInt(list.standard0)-1;
	}else if(list.standard1 && list.standard1 != "N" && parseInt(list.standard1)>1){
		one_num = parseInt(list.standard2)-1;
	}else if(list.standard2 && list.standard2 != "N" && parseInt(list.standard2)>1){
		one_num = parseInt(list.standard2)-1;
	}else{
		one_num = "1";
	}
	temptitle.push("1-"+one_num)
	if(list.standard0 && list.standard0 != "N"){
		var te_oneNum = '';
		if(list.standard1 && list.standard1 != "N"){
			te_oneNum = parseInt(list.standard1)-1;
		}else if(list.standard2 && list.standard2 != "N"){
			te_oneNum = parseInt(list.standard2)-1;
		}
		temptitle.push(list.standard0+"-"+te_oneNum);
	}
	if(list.standard1 && list.standard1 != "N"){
		var te_twoNum = '';
		if(list.standard2 && list.standard2 != "N"){
			te_twoNum = parseInt(list.standard2)-1;
		}
		temptitle.push(list.standard1+"-"+te_twoNum);
	}
	if(list.standard2 && list.standard2 != "N"){
		temptitle.push("≥ "+list.standard2);
	}
	return temptitle;
}
function getFinalData(data){
	state.finalData = [];
	for(var i in data){
		var json = {invId:'',sku:'',price:0,num:0,originalPrice:0,wholesalePrice0:0,wholesalePrice1:0,wholesalePrice2:0,wholesaleOriginalPrice:0,templatePrice0:0,templatePrice1:0,templatePrice2:0}
		json.invId = data[i].inv_id;
		json.sku = data[i].sku_properties;
		if(data[i].wholesalePrice){
			if(data[i].wholesalePrice.templaeOrginPrice){
				json.wholesaleOriginalPrice = data[i].wholesalePrice.templaeOrginPrice;
				json.price = data[i].wholesalePrice.templaeOrginPrice;
			}
			if(data[i].wholesalePrice.orginPrice){
				json.originalPrice = data[i].wholesalePrice.orginPrice;
			}
			if(data[i].wholesalePrice.templatePrice0){
				json.templatePrice0 = data[i].wholesalePrice.templatePrice0;
				json.price = data[i].wholesalePrice.templatePrice0;
			}
			if(data[i].wholesalePrice.wholesalePrice0){
				json.wholesalePrice0 = data[i].wholesalePrice.wholesalePrice0;
			}
			if(data[i].wholesalePrice.templatePrice1){
				json.templatePrice1 = data[i].wholesalePrice.templatePrice1;
				json.price = data[i].wholesalePrice.templatePrice1;
			}
			if(data[i].wholesalePrice.wholesalePrice1){
				json.wholesalePrice1 = data[i].wholesalePrice.wholesalePrice1;
			}
			if(data[i].wholesalePrice.templatePrice2){
				json.templatePrice2 = data[i].wholesalePrice.templatePrice2;
				json.price = data[i].wholesalePrice.templatePrice2;
			}
			if(data[i].wholesalePrice.wholesalePrice2){
				json.wholesalePrice2 = data[i].wholesalePrice.wholesalePrice2;
			}
			
		}
		state.finalData.push(json);
	}
}

//循环加载数据
function cirSumSetData(data){
	var tempskulist = [];
	state.allPrice = [];
	state.minPrice = [];
	for(var i=0;i<3;i++){
		var json = {sku:'',pieceNum:'',minpri:0};
		var piecenum = [];//件数
		var minprice = ''
		if(data[i].wholesalePrice){
			//for(var j in state.pieceTitle){
				var leng = state.pieceTitle.length;
				if(leng == 1){
					let piecePrice = {};
					piecePrice.tprice = data[i].wholesalePrice.templaeOrginPrice;
					piecePrice.sPrice = data[i].wholesalePrice.orginPrice;
					
					json.minpri = data[i].wholesalePrice.templaeOrginPrice;
					piecenum.push(piecePrice);
				}else if(leng == 2){
					let piecePrice = {};
					piecePrice.tprice = data[i].wholesalePrice.templaeOrginPrice;
					piecePrice.sPrice = data[i].wholesalePrice.orginPrice;
					
					json.minpri = data[i].wholesalePrice.templaeOrginPrice;
					piecenum.push(piecePrice);
					if(data[i].wholesalePrice.standard2){
						let piecePrice = {};
						piecePrice.tprice = data[i].wholesalePrice.templatePrice2;
						piecePrice.sPrice = data[i].wholesalePrice.wholesalePrice2;
						
						json.minpri = data[i].wholesalePrice.templatePrice2;
						piecenum.push(piecePrice);
					}
				}else if(leng == 3){
					let piecePrice = {};
					piecePrice.tprice = data[i].wholesalePrice.templaeOrginPrice;
					piecePrice.sPrice = data[i].wholesalePrice.orginPrice;
					
					json.minpri = data[i].wholesalePrice.templaeOrginPrice;
					piecenum.push(piecePrice);
					if(data[i].wholesalePrice.standard0){
						let piecePrice = {};
						piecePrice.tprice = data[i].wholesalePrice.templatePrice0;
						piecePrice.sPrice = data[i].wholesalePrice.wholesalePrice0;
						
						json.minpri = data[i].wholesalePrice.templatePrice0;
						piecenum.push(piecePrice);
					}
					if(data[i].wholesalePrice.standard2){
						let piecePrice = {};
						piecePrice.tprice = data[i].wholesalePrice.templatePrice2;
						piecePrice.sPrice = data[i].wholesalePrice.wholesalePrice2;
						
						json.minpri = data[i].wholesalePrice.templatePrice2;
						piecenum.push(piecePrice);
					}
				}else if(leng == 4){
					let piecePrice = {};
					piecePrice.tprice = data[i].wholesalePrice.templaeOrginPrice;
					piecePrice.sPrice = data[i].wholesalePrice.orginPrice;
					
					json.minpri = data[i].wholesalePrice.templaeOrginPrice;
					piecenum.push(piecePrice);
					if(data[i].wholesalePrice.standard0){
						let piecePrice = {};
						piecePrice.tprice = data[i].wholesalePrice.templatePrice0;
						piecePrice.sPrice = data[i].wholesalePrice.wholesalePrice0;
						
						json.minpri = data[i].wholesalePrice.templatePrice0;
						piecenum.push(piecePrice);
					}
					if(data[i].wholesalePrice.standard1){
						let piecePrice = {};
						piecePrice.tprice = data[i].wholesalePrice.templatePrice1;
						piecePrice.sPrice = data[i].wholesalePrice.wholesalePrice1;
						
						json.minpri = data[i].wholesalePrice.templatePrice1;
						piecenum.push(piecePrice);
					}
					if(data[i].wholesalePrice.standard2){
						let piecePrice = {};
						piecePrice.tprice = data[i].wholesalePrice.templatePrice2;
						piecePrice.sPrice = data[i].wholesalePrice.wholesalePrice2;
						
						json.minpri = data[i].wholesalePrice.templatePrice2;
						piecenum.push(piecePrice);
					}
				}
				
			//}
			var sku1 = data[i].sku_properties.split(";")[0];
			var sku2 = data[i].sku_properties.split(";")[1];
			
			if(sku1 && sku2){
				json.sku = sku1.split(':')[1]+"/"+sku2.split(":")[1];
			}else if(sku1){
				json.sku = sku1.split(':')[1];
			}else if(sku2){
				json.sku = sku2.split(":")[1];
			}
			state.minPrice.push(json.minpri);
			/*json.sku = data[i].sku_properties;*/
			json.pieceNum = piecenum;

		}
		tempskulist.push(json);
		state.allPrice.push(0);
		state.minNum.push(0);
	}
	return tempskulist;
	
}
function cirAllSetData(data){
	var tempskulist = [];
	state.allPrice = [];
	state.minPrice = [];
	for(var i in data){
		var json = {sku:'',pieceNum:'',minpri:0};
		var piecenum = [];//件数
		if(data[i].wholesalePrice){
			//for(var j in state.pieceTitle){
				var leng = state.pieceTitle.length;
				if(leng == 1){
					let piecePrice = {};
					piecePrice.tprice = data[i].wholesalePrice.templaeOrginPrice;
					piecePrice.sPrice = data[i].wholesalePrice.orginPrice;
					
					json.minpri = data[i].wholesalePrice.templaeOrginPrice;
					piecenum.push(piecePrice);
				}else if(leng == 2){
					let piecePrice = {};
					piecePrice.tprice = data[i].wholesalePrice.templaeOrginPrice;
					piecePrice.sPrice = data[i].wholesalePrice.orginPrice;
					
					json.minpri = data[i].wholesalePrice.templaeOrginPrice;
					piecenum.push(piecePrice);
				
					if(data[i].wholesalePrice.standard2){
						let piecePrice = {};
						piecePrice.tprice = data[i].wholesalePrice.templatePrice2;
						piecePrice.sPrice = data[i].wholesalePrice.wholesalePrice2;
						
						json.minpri = data[i].wholesalePrice.templatePrice2;
						piecenum.push(piecePrice);
					}
				}else if(leng == 3){
					let piecePrice = {};
					piecePrice.tprice = data[i].wholesalePrice.templaeOrginPrice;
					piecePrice.sPrice = data[i].wholesalePrice.orginPrice;
					
					json.minpri = data[i].wholesalePrice.templaeOrginPrice;
					piecenum.push(piecePrice);
					if(data[i].wholesalePrice.standard0){
						let piecePrice = {};
						piecePrice.tprice = data[i].wholesalePrice.templatePrice0;
						piecePrice.sPrice = data[i].wholesalePrice.wholesalePrice0;
						
						json.minpri = data[i].wholesalePrice.templatePrice0;
						piecenum.push(piecePrice);
					}
					if(data[i].wholesalePrice.standard2){
						let piecePrice = {};
						piecePrice.tprice = data[i].wholesalePrice.templatePrice2;
						piecePrice.sPrice = data[i].wholesalePrice.wholesalePrice2;
						
						json.minpri = data[i].wholesalePrice.templatePrice2;
						piecenum.push(piecePrice);
					}
				}else if(leng == 4){
					let piecePrice = {};
					piecePrice.tprice = data[i].wholesalePrice.templaeOrginPrice;
					piecePrice.sPrice = data[i].wholesalePrice.orginPrice;
					
					json.minpri = data[i].wholesalePrice.templaeOrginPrice;
					piecenum.push(piecePrice);
					if(data[i].wholesalePrice.standard0){
						let piecePrice = {};
						piecePrice.tprice = data[i].wholesalePrice.templatePrice0;
						piecePrice.sPrice = data[i].wholesalePrice.wholesalePrice0;
						
						json.minpri = data[i].wholesalePrice.templatePrice0;
						piecenum.push(piecePrice);
					}
					if(data[i].wholesalePrice.standard1){
						let piecePrice = {};
						piecePrice.tprice = data[i].wholesalePrice.templatePrice1;
						piecePrice.sPrice = data[i].wholesalePrice.wholesalePrice1;
						
						json.minpri = data[i].wholesalePrice.templatePrice1;
						piecenum.push(piecePrice);
					}
					if(data[i].wholesalePrice.standard2){
						let piecePrice = {};
						piecePrice.tprice = data[i].wholesalePrice.templatePrice2;
						piecePrice.sPrice = data[i].wholesalePrice.wholesalePrice2;
						
						json.minpri = data[i].wholesalePrice.templatePrice2;
						piecenum.push(piecePrice);
					}
				}
				
			//}
				var sku1 = data[i].sku_properties.split(";")[0];
				var sku2 = data[i].sku_properties.split(";")[1];
				if(sku1 && sku2){
					json.sku = sku1.split(':')[1]+"/"+sku2.split(":")[1];
				}else if(sku1){
					json.sku = sku1.split(':')[1] || sku1;
				}else if(sku2){
					json.sku = sku2.split(":")[1];
				}
				
			state.minPrice.push(json.minpri);
			/*json.sku = data[i].sku_properties;*/
			json.pieceNum = piecenum;
			
		}
		tempskulist.push(json);
		state.allPrice.push(0);
		state.minNum.push(0);
	}
	return tempskulist;
	

}