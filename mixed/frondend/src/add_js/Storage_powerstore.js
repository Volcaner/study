import Vue from 'vue'
import Vuex from 'vuex'
import vueResource from 'vue-resource'
Vue.use(Vuex);
Vue.use(vueResource);
const state = {//页面状态
	power:0,//页面是否可操作0 不可以1  可以
	pstate:'member',//当前页码状态
	checkperson:{//身份验证判断*******************
		isshow:false,
		yanz:'',
		tel:'',
		showerror:'',
		canphone:true,//能否点击验证
		yanztext:'发送验证码',
	},
	allmstate:[],//所有成员页面所有数据
	mstate:{//*************************成员页面状态*******
		fenyeisshow:true,
		nowpage:1,
		allpage:1,
		select:'',//当前选择的部门 默认所有
		jsonlist:'',//部门以及旗下的岗位
		hasset:true,//是否可以新建成员
		list:[{//成员加载信息
			name:'',
			branchname:'',
			postname:'',
			createtime:'',
			isprotect:'',
			employeeId:'',//雇员编号
			employeePhone:'',//电话
		}],
	},
	bstate:{//**********部门状态*****************
		jsonlist:[],
		ischeck:{index1:'',index2:''}
	},
	ppstate:{//**********岗位权限状态*********************
		jsonlist:[],
	}
}
const mutations = {		
	page(state,n){
		state.mstate.nowpage=n.page;
	},
	allmstate(state,val){
		state.allmstate = val;
	},
	jiazai(state,response){
		var data=response.body;
		state.mstate.allpage=data.totalPage;
		state.mstate.jsonlist=data.deptList;
		if(!state.mstate.jsonlist){state.mstate.jsonlist=[]}
		var length=0;
		for(var i in state.mstate.jsonlist){
			if(!state.mstate.jsonlist[i].postList){
				length++;
				state.mstate.jsonlist[i].postList=[];
			}
		}
		if(length==state.mstate.jsonlist.length){state.mstate.hasset=false}
		state.mstate.list.splice(0);
		var list=data.employeeList;
		if(!list){list=[]}
		var json=[];
		for(var k in list){
			let time=new Date(list[k].time);
			let createtime = resetTime(time);
			//let createtime=time.getFullYear()+'-'+(parseInt(time.getMonth())+1)+'-'+time.getDate()+' '+time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
			json.push({name:list[k].employeeAccount,branchname:list[k].department.deptName,postname:list[k].department.postList[0].postName,createtime:createtime,isprotect:list[k].loginProtect,employeeId:list[k].employeeId});
		}
		state.mstate.list=json;
	}
}
const actions={
	Ajax(context){
		Vue.http.post('/yich/EmployeeList',{deptId:context.state.mstate.select,page:context.state.mstate.nowpage},{emulateJSON:true})
		.then((response)=>{
			window.checkErrorVue(response);
			context.commit('jiazai',response);
			if(response.data.employeeList){
				context.commit('allmstate',response.data.employeeList);
			}
		},(error)=>{
			
		});
	}
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
})
//重新获取时间(格式)
function resetTime(time){
	var resetime = '';
	if(time){
		var YY = time.getFullYear()?time.getFullYear():'00';
		var MM = (parseInt(time.getMonth())+1)<10 ? "0"+(parseInt(time.getMonth())+1) : (parseInt(time.getMonth())+1)>=10 ? parseInt(time.getMonth())+1 : '00';
		var DD = parseInt(time.getDate())<10 ? "0"+parseInt(time.getDate()) : parseInt(time.getDate())>=10 ? parseInt(time.getDate()):'00';
		var HH = parseInt(time.getHours())<10 ? "0"+parseInt(time.getHours()) : parseInt(time.getHours())>=10 ? parseInt(time.getHours()):'00';
		var MI = parseInt(time.getMinutes())<10 ? "0"+parseInt(time.getMinutes()) : parseInt(time.getMinutes())>=10 ? parseInt(time.getMinutes()):'00';
		var SS = parseInt(time.getSeconds())<10 ? "0"+parseInt(time.getSeconds()) : parseInt(time.getSeconds())>=10 ? parseInt(time.getSeconds()):'00';
		resetime = YY+"-"+MM+"-"+DD+" "+HH+":"+MI+":"+SS;
	}
	return resetime;
}