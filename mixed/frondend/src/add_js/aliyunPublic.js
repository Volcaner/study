import OSS from 'aliyun-oss-sdk.min'
import reinitoss from '../add_js/reInitOss'
reinitoss.reInitOss(OSS);
function download(name,newname){
	if(!newname){
		newname='';
	}
 var applyTokenDo2 = function (func) {
	 return func(client);
	  };
			//下载图片
   var downloadFile = function (client) {
	   if(!window.ossstate){
			return false
		}
		   var object = name;
		   var filename = newname;

		   var result = client.signatureUrl(object, {
		     response: {
		       'content-disposition': 'attachment; filename="' + filename + '"'
			     }
			   });
			   window.location = result;
	
			   return result; 
		   
 };
 applyTokenDo2(downloadFile);
}

module.exports={
	"download":download
}
