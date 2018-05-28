import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state={
	supShopId:window.location.href.split("supshopId=")[1],
	shopName:'',
	iscompany:false,//是否公司？
	storeSta:'',
	openShopTime:'',//入驻时间
	storageScore:'0',//服务评分
	contacts:'',//联系人
	wangwang:'',
	landline:'',
	tel:'',
	QQ:'',
	wechat:'',
	mail:'',
	fax:'',
	factoryAddress:'',
	shop_brief:'暂无简介',
	dengj:"C",//等级
	dengjX:1,//等级
	legal_person_name:'',//法人代表姓名
	company_register_no:'',//公司注册号
	company_register_addr:'',//公司注册地址
	company_create_time:'',//公司成立时间
	business_scope:'',//经营范围
	company_type:'',//公司类型
	operating_period:'',//营业期限
	registration_organ:'',
	coopStatus:'',//按钮状态
	black:'',//是否被拉入黑名单
	applySta:'',//申请状态
	coopId:'',
	modalLoginFlag:false,
	userid:false,
	sumData:[{name:"订单笔数",num:0},
			{name:"被采录数",num:0},
			{name:"被下载数",num:0},
			{name:"退款率",num:0},
			{name:"纠纷率",num:0},
			{name:"合作伙伴",num:0}],
	nowData:[{name:"订单笔数",num:0},
			{name:"被采录数",num:0},
			{name:"被下载数",num:0},
			{name:"退款率",num:0},
			{name:"纠纷率",num:0}],
	zzCompany:[{name:'公司营业执照',imgSrc:''},
	           {name:'公司基本资格证书',imgSrc:''},
	           {name:'经营许可类证书',imgSrc:''},
	           {name:'产品类证书',imgSrc:''},
	           {name:'其他类证书',imgSrc:''}],//公司资质
	storageInfo:'',//仓储信息	
	company:'',//公司档案初始
	companyMore:'',//公司档案更多
	isImg:false,
	myImgSrc:[],
	myImgName:'',
	myImgIndex:0,
	companyImg:[],//公司照片
	companyZZ:[],//营业执照
	conpanyZS:[],//公司基本资格证书
	companyXK:[],//经营许可类证书
	companyCP:[],//产品类证书
	companyOther:[],//其他类证书
	businessLicense:[],
	qualifications:[],//资质证书
	storagePic:[],
	qr:'',
	registered_capital:'',
}
const mutations={
	//初始
	starAjax(state){
	
		Vue.http.post('/yich/sFileManagement?supShopId='+state.supShopId).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
	    	/*var data = JSON.parse(response.data);   */	
	    	if(response.data.all_store_trade_data.shopStatistics){
	    		var myData = response.data.all_store_trade_data.shopStatistics;
	    		setSumData(state.sumData,myData);
	    		setNowData(state.nowData,myData);
	    	};
	    	if(response.data.storage_appliy_coo!='null'){
	    		if(response.data.storage_appliy_coo.appliyinfo.black != "Y"){
	    			state.coopStatus = response.data.storage_appliy_coo.appliyinfo.coopStatus;
	    		}
	    		state.black = response.data.storage_appliy_coo.appliyinfo.black?response.data.storage_appliy_coo.appliyinfo.black:'N';
	    		state.coopId = response.data.storage_appliy_coo.appliyinfo.coopId?response.data.storage_appliy_coo.appliyinfo.coopId:'';
	    	};
	    	if(response.data.storage_info){
	    		if(response.data.storage_info.ower_info){
	    			baseContent(response.data);
	    			if(response.data.storage_info.ower_info.level!=''){
	    				state.dengj = response.data.storage_info.ower_info.level.split('-')[0];
		    	    	state.dengjX = parseInt(response.data.storage_info.ower_info.level.split('-')[1]);
	    			}else{
	    				state.dengj = "C";
	    				state.dengjX = 1; 
	    			}	
	    		}
	    		if(response.data.storage_info.ower_info.contacts_QR_code){
	    			state.qr = imgchange(response.data.storage_info.ower_info.contacts_QR_code,'@337w_448h');
	    		}
	    		if(response.data.storage_info.ower_info.qualifications){
	    			state.qualifications = response.data.storage_info.ower_info.qualifications.split(',');
	    		}
	    		if(response.data.storage_info.ower_info.company_pic){
	    			state.storagePic = response.data.storage_info.ower_info.company_pic.split(',');
	    		}
	    		if(response.data.storage_info.ower_info.authentication.o_or_c == "C"){
	    			state.storeSta = "公司";
	    			if(response.data.storage_info.ower_info){
	    				//response.data.storage_info.ower_info.openShopTime = response.data.storage_info.ower_info.openShopTime.substring(0,response.data.storage_info.ower_info.openShopTime.length-2);
	    				//state.openShopTime = response.data.storage_info.ower_info.openShopTime;
		    			state.company = response.data.storage_info.ower_info.storageImpowerCompany;
		    			state.companyMore = response.data.storage_info.ower_info;
		    	    	/*setCompany(response.data.storage_info.ower_info);
		    	    	setImgSrc(response.data.storage_info.ower_info);*/
		    	    	if(response.data.storage_info.ower_info.company_pic){
		    	    		state.companyImg = response.data.storage_info.ower_info.company_pic.split(",");
		    	    	}
		    	    	if(response.data.storage_info.ower_info.business_scope){
		    	    		state.business_scope = response.data.storage_info.ower_info.business_scope;
		    	    	}
		    	    	if(response.data.storage_info.ower_info.company_type){
		    	    		state.company_type = response.data.storage_info.ower_info.company_type;
		    	    	}
		    	    	if(response.data.storage_info.ower_info.registration_organ){
		    	    		state.registration_organ = response.data.storage_info.ower_info.registration_organ;
		    	    	}
		    	    	if(response.data.storage_info.ower_info.registered_capital){
		    	    		state.registered_capital = response.data.storage_info.ower_info.registered_capital;
		    	    	}
		    	    	if(response.data.storage_info.ower_info.operating_period_end&&response.data.storage_info.ower_info.operating_period_start){
		    	    		if(response.data.storage_info.ower_info.operating_period_end == '1'){
		    	    			state.operating_period = response.data.storage_info.ower_info.operating_period_start + '至长期';
		    	    		}else{
		    	    			state.operating_period = response.data.storage_info.ower_info.operating_period_start + '至'+response.data.storage_info.ower_info.operating_period_end;
		    	    		}
		    	    	}
		    	    	state.iscompany = true;
		    	    	if(response.data.storage_info.ower_info.authentication){
		    	    		if(response.data.storage_info.ower_info.authentication.business_license){
		    	    			state.businessLicense = response.data.storage_info.ower_info.authentication.business_license.split(',');
		    	    		}
			    	    	if(response.data.storage_info.ower_info.authentication.legal_person_name){
			    	    		state.legal_person_name = response.data.storage_info.ower_info.authentication.legal_person_name;
			    	    	}
			    	    	if(response.data.storage_info.ower_info.authentication.company_register_no){
			    	    		state.company_register_no = response.data.storage_info.ower_info.authentication.company_register_no;
			    	    	}
			    	    	if(response.data.storage_info.ower_info.authentication.company_register_addr){
			    	    		state.company_register_addr = response.data.storage_info.ower_info.authentication.company_register_addr;
			    	    	}
			    	    	if(response.data.storage_info.ower_info.authentication.company_create_time){
			    	    		state.company_create_time = response.data.storage_info.ower_info.authentication.company_create_time;
			    	    	}
		    	    	}
	    			}
	    			
	    		}else{
	    			state.storeSta = "个人"
	    			state.iscompany = false;
	    		};
	    		if(response.data.storage_info.serscore){
	    			state.storageScore = response.data.storage_info.serscore;
	    		}
	    		if(response.data.storage_info.ower_info.openShopTime){
	    			state.openShopTime = response.data.storage_info.ower_info.openShopTime.substring(0,response.data.storage_info.ower_info.openShopTime.length-2);
	    		}
	    		if(response.data.storage_info.ower_info.contacts){
	    			state.contacts = response.data.storage_info.ower_info.contacts;
	    		}
	    		if(response.data.storage_info.ower_info.wangwang){
	    			state.wangwang = response.data.storage_info.ower_info.wangwang;
	    		}
	    		if(response.data.storage_info.ower_info.mobile ||response.data.storage_info.ower_info.tel){
	    			state.tel = response.data.storage_info.ower_info.mobile || response.data.storage_info.ower_info.tel;
	    		}
	    		if(response.data.storage_info.ower_info.landline_tel){
	    			state.landline = response.data.storage_info.ower_info.landline_tel;
	    		}
	    		if(response.data.storage_info.ower_info.shop_qq){
	    			state.QQ = response.data.storage_info.ower_info.shop_qq;
	    		}
	    		if(response.data.storage_info.ower_info.shop_wechat){
	    			state.wechat = response.data.storage_info.ower_info.shop_wechat;
	    		}
	    		if(response.data.storage_info.ower_info.shop_email){
	    			state.mail = response.data.storage_info.ower_info.shop_email;
	    		}
	    		if(response.data.storage_info.ower_info.shop_fax){
	    			state.fax = response.data.storage_info.ower_info.shop_fax;
	    		}
	    		if(response.data.storage_info.ower_info.factory_address&&response.data.storage_info.ower_info.factory_address !=";;;"){
	    			state.factoryAddress = response.data.storage_info.ower_info.factory_address.replace(/;+$/,"");
	    		}
	    		if(response.data.storage_info.ower_info.shop_brief){
	    			state.shop_brief = response.data.storage_info.ower_info.shop_brief;
	    		}
	    	};
	
		}, (response) => {
				// 响应错误回调
		});
	},
	applyAjax(state){
		Vue.http.post('/yich/storageMaterialOpreta',{commit_opt:5,coopStatus:state.applySta,coopId:state.coopId,supShopId:state.supShopId,shop_name:state.shopName}).then((response) => {
			// 响应成功回调
			 window.checkErrorVue(response);
			if(response.data.flag == "1"){
					state.coopStatus = "P"
			}
		},(response) => {
			// 响应错误回调
		});
	},
}
const actions={
	starAjax(context){
		context.commit("starAjax");
	},
	applyAjax(context){
		context.commit("applyAjax");
	},
}
export default  new Vuex.Store({
	state,
	mutations,
	actions,
})
//基础信息
function baseContent(data){
	var json = {shopName:'',shopPhone:'',shopTel:'',openTime:'',shopCon:'暂无简介',wangwang:''}
	json.shopName = data.storage_info.ower_info.shop_name;
	json.openTime = data.storage_info.ower_info.openShopTime.split(" ")[0];
	if(typeof (data.storage_info.ower_info.mobile)!='undefined' && data.storage_info.ower_info.mobile){
		json.shopPhone = data.storage_info.ower_info.mobile;
	}else if(typeof (data.storage_info.ower_info.user_tel)!='undefined' && data.storage_info.ower_info.user_tel){
		json.shopPhone = data.storage_info.ower_info.user_tel;
	}else{
		json.shopPhone='';
	}
	if(data.storage_info.ower_info.landline_tel){
		json.shopTel = data.storage_info.ower_info.landline_tel;
		if(json.shopTel.charAt(0) == '-'){
			json.shopTel = json.shopTel.substring(1);
		}
		if(json.shopTel.charAt(json.shopTel.length-1) == '-'){
			json.shopTel = json.shopTel.substring(0,json.shopTel.length-2);
		}
	}
	if(data.storage_info.ower_info.shop_brief){
		json.shopCon = data.storage_info.ower_info.shop_brief;
	}
	if(data.storage_info.ower_info.wangwang){
		json.wangwang = data.storage_info.ower_info.wangwang;
	}
	state.shopName = data.storage_info.ower_info.shop_name;
	
	 state.storageInfo = json;
}
//累计交易数
function setSumData(sumData,data){
	for(var i in sumData){
		if(sumData[i].name == '订单笔数'){
			sumData[i].num = data.sale_shop;
		}else if(sumData[i].name == '被采录数'){
			sumData[i].num = data.record_shop;
		}else if(sumData[i].name == '被下载数'){
			sumData[i].num = data.download_shop;
		}else if(sumData[i].name == '退款率'){
			if(parseInt( data.sale_shop)!=0){
				sumData[i].num = ((parseInt(data.retNum)/parseInt(data.sale_shop))*100).toFixed(2)+"%";
			}
		}else if(sumData[i].name == '纠纷率'){
			if(parseInt(data.sale_shop)!=0){
				sumData[i].num = ((parseInt(data.artNum)/parseInt( data.sale_shop))*100).toFixed(2)+"%";
			}
		}else if(sumData[i].name == '合作伙伴'){
			sumData[i].num = data.supplier_id;
		}
	}
}
//近三个月交易数
function setNowData(nowData,data){
	for(var i in nowData){
		if(nowData[i].name == '订单笔数'){
			nowData[i].num = data.traThreeNum;
		}else if(nowData[i].name == '被采录数'){
			nowData[i].num = data.record_three_month_shop;
		}else if(nowData[i].name == '被下载数'){
			nowData[i].num = data.download_three_month_shop;
		}else if(nowData[i].name == '退款率'){
			if(parseInt(data.traThreeNum)!=0){
				nowData[i].num = ((parseInt(data.retThreeNum)/parseInt(data.traThreeNum))*100).toFixed(2)+"%";
			}
		}else if(nowData[i].name == '纠纷率'){
			if(parseInt(data.traThreeNum)!=0){
				nowData[i].num = ((parseInt(data.artThreeNum)/parseInt(data.traThreeNum))*100).toFixed(2)+"%";
			}
		}
	}
}
/*//公司资质
function setCompany(data){
	var arr = state.zzCompany;
	for(var i in arr){
		if(arr[i].name == '公司营业执照' && data.storageImpowerCompany.businessLicense){
			arr[i].imgSrc = data.storageImpowerCompany.businessLicense;
		}else if(arr[i].name == '公司基本资格证书' && data.basic_qualifications){
			arr[i].imgSrc = data.basic_qualifications.split(',')[0];
		}else if(arr[i].name == '经营许可类证书' && data.license_certificate){
			arr[i].imgSrc = data.license_certificate.split(',')[0];
		}else if(arr[i].name == '产品类证书' && data.product_certificate){
			arr[i].imgSrc = data.product_certificate.split(',')[0];
		}else if(arr[i].name == '其他类证书'  && data.other_certificate){
			arr[i].imgSrc = data.other_certificate.split(',')[0];
		}
	}
}
//公司档案
function setImgSrc(data){
	if(data.company_pic){
		state.companyImg = data.company_pic.split(',');
	}
	if(data.storageImpowerCompany.businessLicense){
		state.companyZZ.push(data.storageImpowerCompany.businessLicense);
	}
	if(data.basic_qualifications){
		state.conpanyZS = data.basic_qualifications.split(',');
		}
	if(data.license_certificate){
		state.companyXK = data.license_certificate.split(',');
	}
	if(data.product_certificate){
		state.companyCP = data.product_certificate.split(',');
	}
	if(data.other_certificate){
		state.companyOther = data.other_certificate.split(',');
	}
	
}*/