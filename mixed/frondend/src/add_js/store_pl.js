import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
	count: 0,
	zje: 0,
	hh:'',//货号
	list:'',//列表
	address:'',//地址
	ghs:'',//供货商
	sheng:'',//省
	shi:'',//市
	qu:'',//区
	newdizhi:false,//新地址
	lsdizhi:true,//临时地址
	status:false,
	list_nr:'',//新地址填充内容
	index:0,//修改地址的索引
	kk_kd:[],//快递
	sp_zhonglei:0,//商品种类
	//结算
    goodarr:[],	
    kdId:[],
    //结算格式
    jes_gs:'',
    //没有显示的数据
    oExistGoodNos:'',
    type:'',
    //淘宝ID
    taobaoid:'',
    liuy:'',
    useraddress:'',
    //安供货商分类之后的数据结构
    jsonobj:'',
    
    jgmblist:'',//价格模板下拉
    token:'',
 }
const mutations = {
	useraAddress(state,str){
		state.useraddress=str;
	},
	taobid(state,tb){
		state.taobaoid=tb;
	},
	lyan(state,str){
		state.liuy=str;
	},
	Address(state,index){
		var Addres = state.address;
		for(var j=0;j<Addres.length;j++){
			Addres[j].isDefault=0
		};
		Addres[index].isDefault=1;
	},
	jia(state, obj) {
		state.count += obj.a;
		state.zje = (+state.zje + (obj.b*obj.a)).toFixed(2);
		if(!(state.goodarr[obj.obj.sy])){
			state.goodarr[obj.obj.sy]=[];
		}
		state.goodarr[obj.obj.sy][obj.obj.index]=obj.obj;
		var n=0;
        for(var i=0;i<state.goodarr.length;i++){
          if((state.goodarr)[i]){
        		var num=0;
            	for(var j=0;j<(state.goodarr)[i].length;j++){
            		if((state.goodarr)[i][j]){
            			num++
            		}
            	}
            	if(num>0){
            		n++;
            	}
          }
        }
     state.sp_zhonglei=n;
	},
	
	jian(state, obj) {
		state.count -= obj.a;
		//alert(obj.num);
		//obj.num-=obj.a;
		//alert(obj.num);
		state.zje = (+state.zje - (obj.b*obj.a)).toFixed(2);	
		//alert(obj.num);
		if(obj.num==0){
			(state.goodarr[obj.obj.sy][obj.obj.index])='';
		}
		var n=0;
        for(var i=0;i<state.goodarr.length;i++){
        	var num=0;
        	
        	if((state.goodarr)[i]){
        		for(var j=0;j<(state.goodarr)[i].length;j++){
        			if((state.goodarr)[i][j]){
        				//alert(i+'----------------'+j);
        				if(i==obj.obj.sy && j==obj.obj.index){
        					(state.goodarr)[i][j].num-=obj.a;
        				}
            			num++
            		}
            	}
        	}
        	
        	if(num>0){
        		n++;
        	}
        }
     state.sp_zhonglei=n;
	},
	s_sheng(state,text){  //省
		state.sheng=text;
	},
	s_shi(state,text){   //市
		state.shi=text;
	},
	s_qu(state,text){  //区
		state.qu=text;
	},
	quxnewdz(state){  //新地址取消
		state.newdizhi=false;
	},
	quxlsdz(state){  //临时地址取消
		state.lsdizhi=true;
	},
	synewdizhi(state,obj){//使用新地址
		state.newdizhi=false;
		setTimeout(function(){state.newdizhi=true;},0);
		//state.newdizhi=true;
		state.type='newdz';
		state.index=(state.address).length;
		if(obj){
		  state.list_nr=obj.shuju;	
		  state.index=obj.index;
		  state.sheng=( state.list_nr.area).split(" ")[0];
		  state.shi=( state.list_nr.area).split(" ")[1];
		  state.qu=( state.list_nr.area).split(" ")[2];
		}else{
		  state.list_nr='';	
		  state.sheng='';
		  state.shi='';
		  state.qu='';
		}
	},
	sylsdizhi(state,obj){  //使用临时地址
		state.lsdizhi=true;
		setTimeout(function(){state.lsdizhi=false;},0);
		//state.lsdizhi=false;
		state.type='lsdz';
		state.newdizhi=false;
		state.index=(state.address).length;
		if(obj){
			state.list_nr=obj.shuju;	
			  state.index=obj.index;
			  state.sheng=( state.list_nr.area).split(" ")[0];
			  state.shi=( state.list_nr.area).split(" ")[1];
			  state.qu=( state.list_nr.area).split(" ")[2];
		}else{
			  state.list_nr='';	
			  state.sheng='';
			  state.shi='';
			  state.qu='';
			}
	},
	mrdizhi(state,bool){  //默认地址
		state.status=bool;
	},
	vueajax(state){
	 	   Vue.http.post('/yich/AdvanceOrderSearch',{
	 		   goodNo:state.hh,
	 		   },{emulateJSON:true}).then((response) => {
	 			  window.checkErrorVue(response);
		        var dta=response.data;
		        var jsonobj={};
		        for(var i=0;i<dta.datas.length;i++){
		        	if((dta.datas)[i].log_info_id){
		        		state.kdId.push((dta.datas)[i].log_info_id);
		        	}
		        	var a=(dta.datas)[i].supplierShop.supshop_name;
		        	if(a){
			        	if(jsonobj[a]){
			        		(dta.datas)[i].SY=i;
			        		jsonobj[a].push((dta.datas)[i]);
			        	}else{
			        		jsonobj[a]=[];
			        		(dta.datas)[i].SY=i;
			        		jsonobj[a].push((dta.datas)[i]);
			        	}
		        	}
		      
		        }
		        state.oExistGoodNos=(response.data.noExistGoodNos);
		        state.jgmblist=response.data.coopTempProList?response.data.coopTempProList:[];//价格模板下拉
		        state.jsonobj=jsonobj;
		       console.log(state.jsonobj)
    		    state.list=response.data.datas || '';//列表
    		    state.address=response.data.addressList || '';//地址
    		    state.token = response.data.token;
    		    if((response.data.datas)[0] && (response.data.datas)[0].supplierShop && (response.data.datas)[0].supplierShop.supshop_name){
    		    	state.ghs=(response.data.datas)[0].supplierShop.supshop_name;
    		    }
    		    
    		    window.dom();
    		   /* Vue.nextTick(function(){
                    alert('v-for渲染已经完成')
                })*/
    		   
    			  }, (response) => {
    		 });
	},
	kuidi:function(state,n){
		if((state.goodarr)[n.index]){
			var v=(state.goodarr)[n.index];
		   for(var j=0;j<v.length;j++){
			
			   if((state.goodarr)[n.index][j]){
				   (state.goodarr)[n.index][j].kd=n.k;

			   }
			   
		   }
			
			
		}
	
	},
	//结算数据格式
	jis:function(state){  
		/*if(state.taobaoid==''){
			alert("请填写淘宝ID");
			return false
		}*/
		
		var obj={};
		obj.token = state.token;
		obj.taobaoid=state.taobaoid;
		obj.sellermemo=state.liuy;
		obj.goodno='';//货号
		obj.SKU='';//货号
		//obj.price=''//单价
		//obj.kc='';//库存
		obj.num='';//采购数量
		//obj.xj='';//小计
		obj.logcomname='';//快递
		obj.invid='';
		obj.fareType='';
		 obj.coopTempIds='';
		var a=state.goodarr;
		var status=false;//快递状态
		//var yjdf = true;
		if(a && a.length>0){
			for(var i=0;i<a.length;i++){
				if(a[i] && a[i].length>0){
					for(var j=0;j<a[i].length;j++){
						// if(a[i][j] && typeof (a[i][j].xj)!='undefined' && a[i][j].xj*1>0){
						if(a[i][j]){
							if(typeof (a[i][j].kd)!='undefined'){
								 obj.goodno+= a[i][j].goodno+';';
								 obj.SKU+= a[i][j].sku+'@';
								// obj.price+= a[i][j].dj+',';
								 //obj.kc+= a[i][j].kc+',';
								 obj.num+= a[i][j].num+';';
								 //obj.xj+= a[i][j].xj+',';
								 obj.logcomname+=a[i][j].kd+'&'+state.kdId[i]+';';
								 obj.invid+=a[i][j].invid+';';
								 obj.fareType+=a[i][j].fareType+';';								
								 obj.coopTempIds+=a[i][j].jgmbid+';';
							}else{
								status=true;
								break;
							}
						 }
						 /*if(a[i][j] && typeof (a[i][j].xj)!='undefined' && a[i][j].xj*1==0){
							 yjdf = false;
						 }*/
					}
				}
		
			};

			var addres=state.address;
			var selectaddress='';//选中的那条地址
			for(j=0;j<addres.length;j++){
				if(addres[j].isDefault==1){
					selectaddress=addres[j];
					obj.receiver=addres[j].name;//联系人
					obj.receivertel=addres[j].mobile || addres[j].tel;//联系电话
					//obj.sellermemo='';//没有备注
					obj.province=(addres[j].area).split(" ")[0];//省
					obj.city=(addres[j].area).split(" ")[1];//市
					obj.area=(addres[j].area).split(" ")[2];//区
					obj.detailaddr=addres[j].address;//地址
				 }
			};
			
			state.jes_gs=obj;
			var LENGH=(obj.goodno).split(";");
			/*if(!yjdf){
				alert('此商品暂不支持一件代发');
				return;
			}*/
		      if($.trim(((obj.logcomname).split("&"))[0])=='' || selectaddress=='' || (typeof (selectaddress.area)=='undefined' && selectaddress.area!='')){
		    	  alert("下单出错或请选择默认地址!")
		    		return false
		      }
		
            if(!status &&　LENGH.length>0){
            	console.log(state.jes_gs);
            	  Vue.http.post('/yich/ManualInput',state.jes_gs).then((response) => {
            		  console.log(response)
            		  window.checkErrorVue(response);
            		  if(typeof (response.data.outofbigestprice)!='undefined'){
            			  alert("下单金额超过最大限额!");
            			  return false
            		  }
            		  
			    var state=response.data.flag;
			    if(state==1){
			    	var arr=response.data.traIds;
			    	var str=arr.join(",");
			    	 window.location.href='/yich/User/User_sgaddress.html?traId='+str;
			    }else if(state==0){
			    	alert("该下单的商品中有不支持一件代发的商品！")
			    }else{
			    	alert("下单出错或请选择默认地址!");
			    }
	    			  }, (response) => {
	    				
	    		 });
            }else{
            	  alert('请填写快递或填写合理的数量');
            }
				
			
			
			  
		};	
	},

}

const actions={
		Ajax(context,huohao){
			context.state.hh=huohao;
       	    context.commit('vueajax',context.state)
		},
	}
/*const getters={

	}*/
export default new Vuex.Store({
	state,
	mutations,
	actions,
	//getters
})

