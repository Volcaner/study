module.exports={
	rili:function(){
	var d=document,
		w=window,
		isIE=w.navigator.appVersion.indexOf("MSIE")>-1,
		now=new Date(),
		nowM=now.getMonth(),
		nowY=now.getFullYear(),
		date=null,
		ids=null,
		oInput=null;
	document.write('<iframe frameborder=0 style="display:none;position:absolute;z-index:100;" width="200" height="215" scrolling="no" name="sangcalender" id="sangcalender"></iframe>');
	var f=window.frames['sangcalender'];
	var ff=d.getElementById('sangcalender');
	var fd=f.document;
	fd.open();
	fd.write('<!DOCTYPE html><html><head><style type="text/css">#yearL, #monthL, #monthR, #yearR,#y, #m{cursor:pointer;}.calenderClose a{display:block;width:13px;line-height:13px;border:1px solid #cccccc;background-color:#eeeeee;color:#666; text-decoration:none}.calenderClose a:hover{color:red}td{text-align:center}#calenderDay{cursor:pointer}body{font-size:12px;padding:0;margin:0}.col666{color:#999}.bg9ebdd6{background-color:#e20000;color:#ffffff;}</style></head><body onselectstart="return false" style="-moz-user-select:none" oncontextmenu="return false">')
	fd.write('<table width="100%" border="0" bgcolor="#CCCCCC" cellspacing="1" cellpadding="0">'+
			 '<tr><td><table border="0" cellspacing="0" bgcolor="#e20000" cellpadding="0" style="color:#ffffff" width="100%">'+
			 '<tr><td height="25" align="center" id="yearL" title="上一年">&lt;&lt;</td>'+
			 '<td align="center" id="monthL" title="上一月">&lt;</td><td align="center">'+
			 '<span id="y" title="点击选择年份"></span>年<span id="m" title="点击选择月份"></span>月</td>'+
			 '<td align="center" id="monthR" title="下一月">&gt;</td>'+
			 '<td align="center" id="yearR" title="下一年">&gt;&gt;</td></tr></table></td></tr>'+
			 '<tr bgcolor="#FFFFFF"><td><table width="100%" border="0" bgcolor="#ffffff" cellspacing="1" cellpadding="0">'+
			 '<tr bgcolor="#ffffff" height="18"><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></tr></table></td></tr>'+
			 '<tr bgcolor="#FFFFFF"><td><div id="calenderDay"></div></td></tr></table>');
	fd.write('</body></html>');
	fd.close();

	//获取框架里的元素  gids.call(obj,id)
	function gids(idArr){
		var oId=[];
		for(var i=0,len=idArr.length;i<len;i++){
			oId[idArr[i]]=this.getElementById(idArr[i]);
		}
		return oId;
	}
	//需要添加事件的元素的集合
	var idsArr=['yearL','yearR','y','m','monthL','monthR','calenderClose','calenderDay'];
	if(!ids){ids=gids.call(fd,idsArr)};
	//格式化日历控件
	function formatDay(timestr){
		var t=/(\d+)-(\d+)-(\d+)/.exec(timestr);
		var da=null;
		var dn=getdate(now);
		if(t){
			da=new Date(t[1],t[2]-1,1);
		}else{
			da=new Date(dn['y'],dn['m'],1);
		}
		date=getdate(da);
		var mon=[31,date['y']%4==0?29:28,31,30,31,30,31,31,30,31,30,31];
		var str="",day=1;
		str+='<table width="100%" border="0" bgcolor="#cecece" cellspacing="1" cellpadding="0">';
		for(var md=mon[date['m']-1],wd=md-date['w']+1,n=0;n<6;n++){
			str+='<tr bgcolor="#ffffff" height="23">';
			for(var nn=0;nn<7;nn++){
				if(wd<=md){
					str+='<td class="col666">'+wd+'</td>';
					wd++;
				}else {
					if(day<=mon[date['m']]){
						if(day==dn['d'] && nowM==now.getMonth()&&nowY==now.getFullYear()){
							str+='<td class="bg9ebdd6">'+(day++)+'</td>';
						}else{
							str+='<td>'+(day++)+'</td>';
						}
						var day2=1;
					}else{
						str+='<td class="col666">'+(day2++)+'</td>';
					}
				}
			}
			str+='</tr>';
		}
		str+='</table>';
		ids['calenderDay'].innerHTML=str;
		var dates=[date['y'],fillzero(date['m']+1)];
		each.call([ids['y'],ids['m']],function(o,i){o.innerHTML=dates[i]});
		each.call(ids['calenderDay'].getElementsByTagName("td"),function(o,i){
			addEvent(o,"mouseover",function(e){
				o.style.backgroundColor="#9ebdd6";
			})
			addEvent(o,"mouseout",function(e){
				o.style.backgroundColor="";
			})
			addEvent(o,"click",function(e){
				if(o.className=="col666"){return}
				oInput.value=ids['y'].innerHTML+"-"+ids['m'].innerHTML+"-"+ fillzero(o.innerHTML) ;
				window.f1rqtime = (oInput.value);
		        if(window.f1_datatimerq){
		          window.f1_datatimerq(oInput.value);
		        }

				hide();
			})
		})
	}
	
	//为按钮添加事件
	var handlers=[yL,yR,mL,mR];
	each.call([ids['yearL'],ids['yearR'],ids['monthL'],ids['monthR']],function(o,i){
		addEvent(o,"click",handlers[i]);
	})
	
	var clicks=[yClick,mClick];
	each.call([ids['y'],ids['m']],function(o,i){
		addEvent(o,"click",clicks[i]);
	})
	
	//获取元素位置
	function getPos(e){
		var x,y,e=typeof e=="string"?d.getElementById(e):e,p=[];
		x=e.offsetLeft;
		y=e.offsetTop;
		while(e=e.offsetParent){
			x+=e.offsetLeft;
			y+=e.offsetTop;
		}
		p['x']=x;p['y']=y;
		return p;
	}
	
	//上一年
	function yL(){
		now.setFullYear(date['y']-1);
		formatDay();
	}
	
	//下一年
	function yR(){
		now.setFullYear(date['y']+1);
		formatDay();
	}
	
	//上一月
	function mL(){
		now.setMonth(date['m']-1);
		formatDay();
	}
	
	//下一月
	function mR(){
		now.setMonth(date['m']+1);
		formatDay();
	}
	
	//为SELECT添加事件
	function addEventForSelect(type){
		function changeInner(){
			ids[type].innerHTML=fillzero(oSelect.value);
			now.setFullYear(ids['y'].innerHTML);
			now.setMonth(Number(ids['m'].innerHTML)-1);
			formatDay();
		}
		var oSelect=gids.call(fd,['calenderSelect'])['calenderSelect'];
		oSelect.focus();
		addEvent(oSelect,'change',changeInner);
		addEvent(oSelect,"blur",changeInner);
	}
	
	//生成option选项
	function createOption(type,v){
		var str='',str2='',i=0,i2=0;
		function create(i,i2){
			while(i>=i2){
				if(v==i){
					str2+='<option value="'+i+'" selected>'+i+'</option>';
				}else{
					str2+='<option value="'+i+'">'+i+'</option>';
				}
				i--;
			}
			str+=str2+'</select>';
			ids[type].innerHTML=str;
			addEventForSelect(type);
		}
		str+='<select id="calenderSelect">';
		if(type=="y"){
			i=2050;i2=1980;
			create(i,i2);
			return;
		}
		if(type=="m"){
			i=1;i2=12;
		}
		create(i2,i);
	}
	
	//年鼠标点击
	function yClick(e){
		if(getTarget(e).tagName.toLowerCase()=="span"){
			createOption("y",ids['y'].innerHTML);
		}
	}
	
	//月鼠标点击
	function mClick(e){
		if(getTarget(e).tagName.toLowerCase()=="span"){
			createOption("m",ids['m'].innerHTML);
		}
	}
	
	//each方法
	function each(handler){
		var o=null;
		for(var i=0,len=this.length;i<len;i++){
			o=typeof this[i]=="string"?fd.getElementById(this[i]):this[i];
			handler(o,i);
		}
	}
	
	//如果日期为一位数，则在前面补零
	function fillzero(str){
		var str=typeof str=="string"?str:str.toString();
		if(str.length==1){
			str="0"+str;
		}
		return str;
	}
	
	//获取时间
	function getdate(da){
		var date=[];
		date['y']=da.getFullYear();
		date['m']=da.getMonth();
		date['d']=da.getDate();
		date['w']=da.getDay();
		return date;
	}
	
	//阻止默认事件
	function preventDefault(e){
		var e=e||window.event;
		if(e.preventDefault){
			e.preventDefault();
		}else{
			e.returnValue=false;
		}
	}
	
	function getTarget(e){
		var e=e||window.event;
		return e.srcElement||e.target;
	}
	
	//显示日历控件
	function show(o){
		var s=o.value;
		var p=getPos(o);
		if(s){
			formatDay(s);
		}else{
			now=new Date();
			formatDay();
		}
		ff.style.left=p['x']+"px";
		ff.style.top=p['y'] + o.offsetHeight + "px";
		ff.style.display="block";
	}
	
	//隐藏日历控件
	function hide(){
		ff.style.display="none";
	}
	
	//添加事件
	function addEvent(element,event,handler){
		var element=typeof element=="string"?d.getElementById(element):element;
		if(element.addEventListener){
			element.addEventListener(event,handler,false)
		}else if(element.attachEvent){
			element.attachEvent("on"+event,handler);
		}else{
			element["on"+event]=handler;
		}
	}
	
	//获取要实现控件的表单
	function getObj(className){
		var o=d.getElementsByTagName('*'),oArr=[];
		for(var i=0,len=o.length;i<len;i++){
			if(o[i].className==className){
				oArr.push(o[i])
			}
		}
		return oArr;
	}
	
	each.call(getObj("sang_Calender"),function(o,i){
		addEvent(o,"click",function(e){preventDefault(e);oInput=o,show(o);ff.focus()})
	})
	
	//var iframeObj=isIE?ff:f;
	addEvent(isIE?ff:f,"blur",function(e){hide()})
}


}