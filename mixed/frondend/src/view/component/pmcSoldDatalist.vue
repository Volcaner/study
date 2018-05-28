<!-- 预存卡-售出记录列表 -->
<template>
	<div id="pmcSoldData">
		<p class="pmc_useDataMes">
			<span v-if="timeInterval"><i>{{ startTime }}</i>&nbsp;<i v-if="(startTime && endTime)">到</i>&nbsp;<i>{{ endTime }}</i></span>
			<span>售出金额&nbsp;:&nbsp;{{ totalAmount }}</span>
		</p>
		<ul class="pmc_useDataTitle pmc_soldDataTitle">
			<li>{{ typeName }}</li>
			<li>预存卡名称/卡号</li>
			<li>交易号</li>
			<li>折扣<i :class="sortSta === 'zk' ? hightlight : '' " @click="sortBtn1"></i></li>
			<li>支付方式</li>
			<li>交易时间<i :class="sortSta === 'jyt' ? hightlight : '' " @click="sortBtn2"></i></li>
		</ul>
		<ul class="pmc_useDataCon pmc_soldDataCon">
			<li v-for="items in pmcPlists">
				<p><a class="userName" :title="items.business.name" @click="userJumpStore(items.business.user_id)">{{ items.business.name }}</a><a v-if="items.business.wangwang" target="_blank" :href="setAwang(items.business.wangwang)">
<img border="0" :src="setImgwang(items.business.wangwang)" alt="和我联系" /></a></p>
				<p>
					<a class="pmc_name" :title="items.prestoreCard.prestore_card_name" @click="nameJumpUrl(items.prestoreCard.prestore_card_id)">{{ items.prestoreCard.prestore_card_name }}</a>
					<a class="pmc_name" :title="items.prestore_card_sold_id" @click="IdJumpUrl(items.prestoreCard.prestore_card_id,items.prestore_card_sold_id)">{{ items.prestore_card_sold_id }}</a>
				</p>
				<p>{{ items.alipay_num }}</p>
				<p>{{ parseFloat(items.prestoreCard.discount).toFixed(1) }}</p>
				<p>{{ items.mode|paymode }}</p>
				<p>{{ items.buy_time.split(' ')[0] }}<br>{{ items.buy_time.split(' ')[1] }}</p>
			</li>
		</ul>
	</div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default{
	props:["typeName","pmcPlists","totalAmount"],
	data(){
		return{
			sortSta:"jyt",
			hightlight:"hightlight",
		}
	},
	computed:{
		...mapState(["timeInterval","startTime","endTime"]),
	},
	methods:{
		...mapMutations(["pmcOption"]),
		...mapActions(["starAjaxData"]),
		sortBtn1:function(){
			this.sortSta = "zk";
			this.pmcOption(2);
			this.$emit(this.starAjaxData());
		},
		sortBtn2:function(){
			this.sortSta = "jyt";
			this.pmcOption(4);
			this.$emit(this.starAjaxData());
		},
		setAwang:function(src){
			return "http://www.taobao.com/webww/ww.php?ver=3&touid="+src+"&siteid=cntaobao&status=2&charset=utf-8";
		},
		setImgwang:function(src){
			return "http://amos.alicdn.com/realonline.aw?v=2&uid="+src+"&site=cntaobao&s=2&charset=utf-8";
		},
		userJumpStore:function(shopId){
			window.open('/yich/User/User_FileManagement.html?userid='+shopId);
		},
		nameJumpUrl:function(pmcId){
			window.open('/yich/Storage/Storage_pmcDetail.html?pmcId='+pmcId);
		},
		IdJumpUrl:function(pmcId,pmcSoldNo){
			window.open('/yich/Storage/Storage_pmcCardNoRecord.html?pmcId='+pmcId+'&pmcSoldNo='+pmcSoldNo);
		},
		
	},
	filters:{
		paymode:function(val){
			var thisName = '';
			switch(val){
			case "alipay":
				thisName = "支付宝";
				break;
			case "wechat":
				thisName = "微信";
				break;
			default:
				thisName = "现金账户";
				break;
			}
			return thisName;
		}
	},
}

</script>
<style lang="less" scoped>
/* 样式:preMemoryCard.less; */
.pmc_soldDataTitle{
	
	li:nth-child(1){
		width:220px;
	}
	li:nth-child(2){
		width:220px;
	}
	li:nth-child(3){
		width:220px;
	}
	li:nth-child(4){
		width:80px;
	}
	li:nth-child(5){
		width:100px;
	}
	li:nth-child(6){
		width:100px;
	}

}
.pmc_soldDataCon{
	li{
		p:nth-child(1){
			width:220px;
			.userName{
				max-width: 180px;
				cursor:pointer;
				white-space: nowrap;
			    text-overflow: ellipsis;
			    overflow: hidden;
			}
			.userName:hover{
				text-decoration: underline;
			}
		}
		p:nth-child(2){
			width:220px;
			.pmc_name{
				width: 200px;
			}
		}
		p:nth-child(3){
			width:220px;
		}
		p:nth-child(4){
			width:80px;
		}
		p:nth-child(5){
			width:100px;
		}
		p:nth-child(6){
			width:100px;
		}

	}
}
</style>