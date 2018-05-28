<!-- 仓储-预存卡头部 -->
<template>
	<div id="pmcTop">
		<div class="pmc_topDiv">
			<span class="pmc_toptitle">预存卡名称&nbsp;:</span>
			<select class="pmc_topname" v-model="cpmcName">
				<option value="">全部预存卡</option>
				<option v-for="items in pmcNames" :value="items.prestore_card_id">{{ items.prestore_card_name }}</option>
			</select>
		</div>
		<div class="pmc_topDiv">
			<span class="pmc_toptitle">预存卡卡号&nbsp;:</span>
			<input type="text" class="pmc_topnickname" v-model="cpmcID">
		</div>
		<div class="pmc_topDiv">
			<span class="pmc_toptitle">{{ timeName }}&nbsp;:</span>
			<label class="pmc_radioBox"><input type="radio" name="pmc_radio" class="pmc_radio" v-model="useTimeRadio" value="radioAll">全部</label>
			<label class="pmc_radioBox">
				<input type="radio" name="pmc_radio" class="pmc_radio" v-model="useTimeRadio" value="radioCellTime">时间段
				<input type="text" class="sang_Calender" id="sang_Calender1" placeholder="请选择时间" v-model="starTimeData" @click="checkTimeBtn"/>&nbsp;到
				<input type="text" class="sang_Calender" id="sang_Calender2" placeholder="请选择时间" v-model="endTimeData" @click="checkTimeBtn"/>
				<!-- <input type="text"> -->
				<!-- <input type="text"> -->
			</label>
		</div>
		<div class="pmc_topDiv">
			<span class="pmc_toptitle">采购商昵称&nbsp;:</span>
			<input type="text" class="pmc_topnickname" v-model="cuserName">
		</div>
		<div class="pmc_topDiv">
			<input type="button" value="搜索" class="pmc_topsearch" @click="pmcTopSearch">
		</div>
	</div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
	export default{
		props:["timeName","pmcNames"],
		data(){
			return{
				cpmcName:'',
				cpmcID:'',
				cuserName:'',
				starTimeData:'',
				endTimeData:'',
				useTimeRadio:'radioAll',
			}
		},
		methods:{
			...mapMutations(["timeInterval","pmcName","pmcId","startTime","endTime","shopName"]),
			...mapActions(["starAjaxData"]),
			pmcTopSearch:function(){
				if(this.useTimeRadio == 'radioCellTime'){
					this.starTimeData = document.getElementById('sang_Calender1').value;
					this.endTimeData = document.getElementById('sang_Calender2').value;
					this.startTime(this.starTimeData);
					this.endTime(this.endTimeData);
					this.timeInterval(true);
				}
				this.$emit(this.starAjaxData());
			},
			checkTimeBtn:function(){
				this.useTimeRadio = "radioCellTime";
			},
			
		},
		watch:{
			useTimeRadio:function(val){
				if(val == "radioAll"){
					this.timeInterval(false);
					this.startTime('');
					this.endTime('');
					this.starTimeData = '';
					this.endTimeData  = '';
				}
			},
			cpmcName:function(val){
				this.pmcName(val);
			},
			cpmcID:function(val){
				console.log(val)
				this.pmcId(val);
			},
			cuserName:function(val){
				this.shopName(val);
			},
			
		},
	}
</script>
<style lang="less" scoped>
#pmcTop{
	padding:20px 24px;
}
.pmc_topDiv{
	margin-bottom: 12px;
	.pmc_toptitle{
		display: inline-block;
		width: 70px;
		height: 28px;
		line-height: 28px;
		font-size: 12px;
		color: #212121;
	}
	.pmc_topname{
		width: 190px;
		height: 28px;
		border:1px solid #d2d2d2;
		background: transparent;
	}
	.pmc_topnickname{
		width:190px;
		height: 28px;
		padding-left: 5px;
		border:1px solid #d2d2d2;
	}
	.pmc_topsearch{
		width: 50px;
		height: 28px;
		border:1px solid #e20000;
		font-size: 14px;
		color: #fff;
		border-radius: 3px;
		cursor: pointer;
		background: -webkit-linear-gradient(#fe3e3e, #eb1b1b);
	    background: -o-linear-gradient(#fe3e3e, #eb1b1b);
	    background: -moz-linear-gradient(#fe3e3e, #eb1b1b);
	    background: linear-gradient(#fe3e3e, #eb1b1b);
	}
}
.pmc_radioBox{
	font-size: 12px;
	color: #212121;
	margin-right: 24px;
	input[type="radio"]{
		position: relative;
		top:2px;
		margin-right: 5px; 
	}
	input[type="text"]{
		width: 150px;
		height: 28px;
		padding-left:3px;
		border:1px solid #d2d2d2;
	}
}
</style>