import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state = {
	nowpage:1,//当前显示的页数
	showFeny:true,//分页显隐
	content:[//pic 一次传输的图片,load 加载的图片
			{cname:'',href:'',src:'',time:'',url:'',pic:[],prourl:[],loadpic:[]},
	],//当前页面的请求数据
	state:[
		{
			nowindex:0,//当前第一张图片在获取图片中的位置
			length:14,//获取的图片的总数量
			canright:true,//能不能右移
			canleft:true,//能不能左移
			movepx:137,//移动一格的长度
		}
	],//当前页面， 每个列表的判断数据
	box:{isshow:false,input:''},//搜索框内容
	canmove:[],//是否可以转动
}
const mutations = {		
	page(state,n){
		state.nowpage=n.page;
	},
	jazai(state,response){
		state.content.splice(0);
		state.state.splice(0);	
		var list=response.body.list;
		if(response.data.totalPages<1){
			state.showFeny = false;
			state.nowpage = 1;
		}else{
			state.showFeny = true;
			state.nowpage = response.data.totalPages;
		};
		/*state.nowpage=response.body.totalPages;*/
		for(let k in list){
			let cname=list[k].supshop_name;
			let href='http://www.taobao.com/webww/ww.php?ver=3&touid='+list[k].wangwang+'&siteid=cntaobao&status=2&charset=utf-8';
			let src='http://amos.alicdn.com/realonline.aw?v=2&uid='+list[k].wangwang+'&site=cntaobao&s=2&charset=utf-8'
			let time=list[k].productList[0].publish_time;
			let url='/yich/myShopServlet?supshopId='+list[k].supshop_id;
			let pic=[];
			let prourl=[];
			state.content.splice(k,1,{cname:cname,href:href,src:src,time:time,url:url,pic:[],prourl:[],loadpic:[]});
			for(let key in list[k].productList){
				state.content[k].pic.splice(key,1,imgchange(list[k].productList[key].proImage.src,'@110w_110h'));
				state.content[k].prourl.splice(key,1,'/yich/GoodInfo?proid='+list[k].productList[key].pro_id);
			}
		}
		for(var i=0;i<state.content.length;i++){
			let canright=state.content[i].pic.length>7?true:false;
			if(state.content[i].pic.length>7){state.canmove.splice(i,1,true)}else{state.canmove.splice(i,1,false)}
			state.state.push({nowindex:0,length:state.content[i].pic.length,canleft:false,canright:canright,movepx:137})
			for(let j=0;j<7;j++){					
				if(state.content[i].pic[j]){
					state.content[i].loadpic.splice(j,1,state.content[i].pic[j]);	
				}				
			}
		}
	}
}
const actions={
	Ajax(context){
		var state=context.state;
		Vue.http.post('/yich/NewTrendsSearch',{shop_name:state.box.input,page:state.nowpage})
		.then((response)=>{
			window.checkErrorVue(response);
			context.commit('jazai',response);
		},(error)=>{ 
			
		})
	}
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})