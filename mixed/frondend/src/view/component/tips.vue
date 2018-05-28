<template>
	<div id="tips" class="tipsname">
	   <div class="tips" :class="ts">
	   	   <i :class="ts"></i>
	   	   <p :class="ts">{{ts_text}}</p>
	   </div>
	</div>
</template>
<script> 
export default{   
 props:["ts","ts_text"],

    }  
</script> 
<style lang="less" scoped>
@import '../../css/public.less';
.tips{
	overflow:hidden;
	font-size:12px;
	padding:4px 5px;
	i{
		display:block;
		float:left;
		width:16px;
		height:16px;
		margin-right:4px;
	}
	i.error{
		background:url('../../images/s_ico1.png');
	}
	i.warning{
		background:url('../../images/s_ico2.png');
	}
	i.success{
		background:url('../../images/s_ico3.png');
	}
	p{
		float:left;
		line-height:16px;
		font-size:12px;
		white-space:nowrap; 
     }
     p.error{
     	color:#e8290f;
     }
     p.warning{
     	color:#e44803;
     }
     p.success{
     	color:#469b00;
     }
}
.tips.error{
	background:#ffecec;
	.border(#ffc8c8);
}
.tips.warning{
	background:#ffffe5;
	.border(#fed18b);
}
.tips.success{
	background:#dff7c8;
	.border(#9bcd54);
}
</style>
