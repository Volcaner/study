import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
	count:[{"state":true,"huohao":''}],  //货号个数
	//type:'0',  //全部/出售中/已下架
	page:'1', //页码
	supshopIds:'',//通过仓储参数
	list:'', //list数据
	hhpinj:'',//货号拼接
	cc_hh:'1',//判断是仓储还是货号
	zonPage:'0',//总页码数
	sellStatus:'',//上下架状态
	sort:'1',//排序
	ulList:'',//下拉列表
	sortField:'',//排序类型
	allCheck:[],//多选框val值
	lengthArr:0,//选择的个数
	valArr:'',//选择的值
	valobj:[],//选择的整个对象
	pllink:'/yich/User/User_pl.html?goodNo=',//批量下单link
	tbodyshow:true,
    fyshow:true,
    currentPage:0,
    coidArr:'',
    coil:'',
}
const mutations = {
		clearlengthArr(state){
			state.lengthArr=0;
			state.valArr='';
		},
		huo(state, obj){    //货号数组
			//if((state.count)[obj.index] || (state.count)[obj.index]==''){
			if(((state.count).length-1)>=obj.index){
				(state.count)[obj.index].huohao=obj.huoh;
			}else{
				if((state.count).length>1){
				(state.count).push({"state":true,"huohao":obj.huoh});
			 }
			}
		},
		jia(state){  //添加货号
			(state.count).push({"state":true,"huohao":''});
		},
		jian(state, n){ //删除货号
			(state.count)[n].state=false;
			(state.count)[n].huohao='';
		},
		type(state,n){  //全部/出售中/已下架
			state.sellStatus=n.type;
		},
		toptype(state,n){//判断是仓储还是货号
			state.cc_hh=n.toplx;		
		},
		ccText(state,obj){//通过仓储参数
			state.supshopIds=obj.text;
		},
		paixu(state,n){
			state.sort=n.num;
			state.sortField=n.type;
		},
		vueajax(state){//列表数据   
		 	   Vue.http.post('/yich/RecordedLibrary',{
		 		   goodNos:state.hhpinj,
		 		   pageNo:state.page,
		 		   supshopIds:state.supshopIds,
		 		   sellStatus:state.sellStatus,
		 		   sort:state.sort,
		 		  sortField:state.sortField
		 		   },{emulateJSON:true}).then((response) => {
		 			  window.checkErrorVue(response);
		 			 state.allCheck.length=0;
		 			 state.lengthArr=0;
					state.list=(response.data.recoredLibraryList);
	    			  var page=response.data.totalPageNum;
	    			  if(state.zonPage!=page){
	    				  state.zonPage=page
	    			  }
	    			  state.fyshow=false;
	    			  setTimeout(function(){
	    			   state.fyshow=true;  
	    			  },0);
	    			  if(response.data.totalPageNum<1){
							state.fyshow = false;
	    			  }else{
							state.fyshow = true;
	    			  };
	    			state.tbodyshow=false;
	    			setTimeout(function(){
	    				state.tbodyshow=true;
	    			},0);
	    			  }, (response) => {
	    		 });
		},
		listUl(state){  //下拉数据
			   Vue.http.post('/yich/CollectionedStorages').then((response) => {
				   window.checkErrorVue(response);
					var v=response.data;
					var arr=[];
					for(var key in v){
						for(var i=0;i<v[key].length;i++){
							var json={};
							json.name=key;
							json.val=v[key][i]
							arr.push(json);
						}
					
					}
					var b=sortarr(arr,"name");
					  state.ulList=b;
	    			  }, (response) => {
	    		 });
		},
		huohao(state){ //货号拼接字符串
			var hh='';
			var obj=state.count;
			for(var i=0;i<obj.length;i++){
       		   if(obj[i].state){
       			   if(obj[i].huohao){
       			      hh+=obj[i].huohao+",";
       			   }
       		   }
       	   }; 
       	state.hhpinj=hh;
		},
		page(state,obj){//页码
			state.page=obj.page;
		},
		checkdata(state,obj){ //全选数据
			state.allCheck[obj.index]=obj.val;
			var num=0;
			state.valArr='';
			state.valobj.length=0;
			for(var i=0;i<(state.allCheck).length;i++){
				if((state.allCheck)[i]){
					num++;
					state.valArr+=(state.allCheck)[i].good_no+",";
					state.valobj.push((state.allCheck)[i]);
					if((state.allCheck)[i].coll && (state.allCheck)[i].coll.coid){
						state.coidArr+=(state.allCheck)[i].coll.coid+",";
					}
					
				}
			}
			state.lengthArr=num;
			state.pllink='/yich/User/User_pl.html?goodNo='+escape(state.valArr);
		},
		clearData(state,obj){//全不选
			var num=0;
			(state.allCheck)[obj.index]='';
			//state.lengthArr=(state.allCheck).length;
			state.valArr='';
			state.valobj.length=0;
			for(var i=0;i<(state.allCheck).length;i++){
				if((state.allCheck)[i]){
					num++;
					state.valArr+=(state.allCheck)[i].good_no+",";
					state.valobj.push((state.allCheck)[i]);
				}
			}
			state.lengthArr=num;
			state.pllink='/yich/User/User_pl.html?goodNo='+escape(state.valArr);
		},
}



const actions={
		Ajax(context){
			if(context.state.cc_hh==1){
				context.state.supshopIds='';
		  }else{
			  context.state.hhpinj=null;
			  (context.state.count).length=0;
			  (context.state.count).push({"state":true,"huohao":''});
		  }
       	    context.commit('vueajax',context.state)
		},
		list_ul(context){
			context.commit('listUl',context.state)
		},
		checkevent(context,obj){
			context.commit('checkdata',obj)	
		},
		clear(context,obj){
			context.commit('clearData',obj)
		}
	}
function sortarr(arr,key){
	  return arr.sort(function(a,b){
			var x=a[key];
			var y=b[key];
			return ((x<y)?-1:((x>y)?1:0));
		});
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
})