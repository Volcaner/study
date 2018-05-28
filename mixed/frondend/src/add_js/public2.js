window.imgchange=function(src,size){
	if((src).indexOf('http://ngsimage')==-1){
		var imgsrc=(src);
		return imgsrc;
	}else{
		var oss_img='';
		var src_oss=(src).split(".");
		src_oss.splice(src_oss.length-1,1);
		var left_ossimg=src_oss.join('.');
		var srclast_oss=src.split('.');
		srclast_oss=srclast_oss[srclast_oss.length-1];
		var a_oss=srclast_oss.split("jpg").length
		var c_oss=srclast_oss.split("png").length
		var e_oss=srclast_oss.split("jpeg").length
		var g_oss=srclast_oss.split("JPG").length
		var i_oss=srclast_oss.split("PNG").length
		var k_oss=srclast_oss.split("JPEG").length
		var o_oss=srclast_oss.split("gif").length
		var m_oss=srclast_oss.split("GIF").length
		if(a_oss>1){
			oss_img=left_ossimg+'.jpg'
		}else if(c_oss>1){
			oss_img=left_ossimg+'.png'
		}else if(e_oss>1){
			oss_img=left_ossimg+'.jpeg'
		}else if(g_oss>1){
			oss_img=left_ossimg+'.JPG'
		}else if(i_oss>1){
			oss_img=left_ossimg+'.PNG'
		}else if(k_oss>1){
			oss_img=left_ossimg+'.JPEG'
		}else if(o_oss>1){
			oss_img=left_ossimg+'.gif'
		}else if(m_oss>1){
			oss_img=left_ossimg+'.GIF'
		}else{
			oss_img=(src);
		}
		var imgsrc=oss_img.replace("oss-","img-");
		imgsrc=imgsrc+size;
	    return imgsrc;
	}
}


window.Stringlength=function(str,size){
  	var name='';
  	var b=0;
  var re=/[\u4E00-\u9FA5]|\s/;
  var bb=0;
  if(str.match(re)){
   var aa=str.match(re);
   bb=aa.length;
  }
  var numstr=bb*0.5+(str.length-bb);
  for(var h=0;h<str.length;h++){

           if(!re.test(str[h])){
                 b+=0.5*1;
           }else{		
           	b+=1*1;
           }
           
           if(b<=size){
           	name+=str[h];
           	
           }else{
           
           }
      }
  return name;
};  