import $ from 'expose-loader?$!jquery';
import "./flexible.js";
import "./complex.js";
import "./../css/index.css";
import "./../css/public.css";

console.log("aaa");

console.log(fff=>fff+1);
for(let i = 0; i < 10; i++) {
    setTimeout(function() {
        console.log(i+1);
    }, 100);
}

$("#btn").on("click", function() {
    $("#video")[0].play();
});


var img1 = require("./../images/loading.gif");
$("body").append('<br /><img src=' + img1 + ' alt=""></img><br />');


var img2 = require("./../images/videobg1.jpg");
$("body").append('<br /><img src=' + img2 + ' alt=""></img><br />');

var img3 = require("./../images/heimao.gif");
$("body").append('<br /><img src=' + img3 + ' alt=""></img><br />');

// 写一个 loop
var lastTime=new Date(), deltaTime, anitId, tailNum = 0, tailUrl, can1, cxt1, x=0, y=0, k=0, imgObj=[];
var _drawTail = function() {
    can1 = $("#can1")[0];
    cxt1 = can1.getContext('2d');

    var bodyW = $("body").width();

    can1.width = bodyW;
    can1.height = bodyW*4/6;

    for(let j = 0; j <= 24; j+=2) {
        var img = new Image();
        if(j<10) img.src = "https://static.ws.126.net/163/f2e/news/dada_protection/img/fengzheng_000" + "0"+j + ".png";
        else img.src = "https://static.ws.126.net/163/f2e/news/dada_protection/img/fengzheng_000" + j + ".png";
        imgObj.push(img);
    }


}
_drawTail();
var _loop = function() {
    anitId = window.requestAnimationFrame(_loop);

    var newTime = new Date();
    deltaTime = newTime - lastTime;
    lastTime = newTime;
    if(deltaTime > 40) deltaTime = 40;

    console.log(deltaTime);

    k += deltaTime;

    if(k > 50) {
        // if(tailNum < 10) _tail("0" + tailNum);
        // else
        _tail(tailNum);
        tailNum++;
        if(tailNum > 12) tailNum = 0;

        k = 0;
    }


};

var _tail = function(i) {
    if($("#tail").length <= 0) {
        var tailImg = document.createElement("img");
        $(tailImg).attr("id", "tail");
        $("body").append(tailImg);
    }

    tailUrl = imgObj[i].src;
    $("#tail").attr("src", tailUrl);
    cxt1.clearRect(0, 0, can1.width, can1.height);
    cxt1.save();
        var img = new Image();
        img.src = tailUrl;
        cxt1.drawImage(img, 0, 0);
    cxt1.restore();
    cxt1.save();
        cxt1.translate(x--, y++);
        var img = new Image();
        img.src = tailUrl;
        cxt1.drawImage(img, can1.width-500, 0);
    cxt1.restore();
};

$(window).ready(_loop());

$("#loop").on("click", function() {
    window.requestAnimationFrame(_loop);
});

$("#stopLoop").on("click", function() {
    window.cancelAnimationFrame(anitId);
});
