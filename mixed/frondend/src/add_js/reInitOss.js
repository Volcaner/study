import OSS from 'aliyun-oss-sdk.min';

window.appServer = window.location.host + '/yich/stsService';
window.bucket = 'ngsimage';
window.region = 'oss-cn-hangzhou';

window.urllib = OSS.urllib;
window.Buffer = OSS.Buffer;
// window.OSS = OSS.Wrapper;
window.STS = OSS.STS;
window.client;

window.reInitOss = function() {
    var url = appServer;
    return urllib.request(url, {
        method: 'POST',dataType:'json'
    }).then(function(result) {
       var creds =result.data;
       //console.log(creds);
        window.client = new OSS({
            region: region,
            accessKeyId: creds.key,
            accessKeySecret: creds.secret,
            stsToken: creds.token,
            bucket: bucket
        });
        setTimeout(function(){
            if(window.reInitOssInit){
                reInitOssInit(); 
            }
            
        },500);
       
    });
};
reInitOss();