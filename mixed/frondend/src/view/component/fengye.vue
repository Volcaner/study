<template>
	<div>
		<a @click='goup' class='nomal' :class='{active:nowpage=="1"}'>上一页</a>
		<a v-for='val in nowshow' @click='changepage(val)' :class='{show:val==nowpage}' class='number'>{{val}}</a>	
		<a @click='godown' class='nomal' :class='{active:nowpage==zong}'>下一页</a>
		<span>总页数{{zong}}</span>
		<input type="text" v-model.trim='jump' style="text-align:center;" class="jumo"/>
		<a @click='changepage(jump)' class='nomal'>跳转</a>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				zong:10,//总页码			
				nowpage:1,//当前页码
				jump:1,//输入框的jump
			}
		},
		computed:{
			yema:function(){
				var arr=[];
				for(var i=1;i<=this.zong;i++){
					arr.push(i);
				}
				return arr;
			},
			nowshow:function(){
				var thisshow='';
				if(this.nowpage<=3){
					thisshow=this.yema.slice(0,5);
				}else if(this.nowpage>=3&&this.nowpage<=this.yema.length-2){
					thisshow=this.yema.slice(this.nowpage-3,this.nowpage+2);
				}else if(this.nowpage>this.yema.length-2){
					thisshow=this.yema.slice(-5);
				}
				return thisshow;
			}
		},
		methods:{
			changepage:function(now){
				this.nowpage=parseFloat(now);
				this.jump=this.nowpage;
			},
			goup:function(){
				if(this.nowpage>1){
					this.nowpage=this.nowpage-1;
					this.jump=this.nowpage;
				}
			},
			godown:function(){
				if(this.nowpage<this.zong){
					this.nowpage=this.nowpage+1;
					this.jump=this.nowpage;
				}
			}
		},
		mounted() {
		var that=this;
		   $(".jumo").blur(function(){
		   if(that.jump==''){
		     that.jump=1;
		    }
		   });
		},
		watch:{
			"jump":function(valNew,valOld){
				if(isNaN(valNew) && valNew!=''){
					this.jump=valOld;
				}else if(valNew>this.zong && valNew!=''){
					this.jump=valOld;
				}else if(valNew<=0 && valNew!=''){
				    this.jump=1;
				}
			}
		}
	}
</script>
<style scoped>
	.active{
		opacity:0.5;
	}
	a{
		cursor:pointer;
		color:#292929;
	}
	.nomal{
		padding:5px;
		border:1px solid #ccc;
		border-radius:3px;
	}
	.number{
		padding:5px;
		border:1px solid #ccc;
		border-radius:3px;
		margin:0 3px;
	}
	.show{
		border:0;		
	}
	input{
		width:20px;
	}
</style>