// 函数作用域
setTimeout(func, 0);
console.log("aaa1");

function func() {
    console.log("aaa2");
}


console.log(aaa3);

var aaa3 = "aaa3";

var i = 0;
console.log(++i);

new Promise(function(a, b) {
    // setTimeout(function() {
        if(false) {
            a();
        }
        else {
            b();
        }
    // }, 0);
}).then(function() {
    console.log("aaa4  successed!");
}).catch(function() {
    console.log("aaa4  failed!");
});

setTimeout(function() {
    console.log('aaa4_6');
}, 0);

console.log('aaa4_5');

for(var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);
    }, 10);
}

function aaa5() {
    return function() {
        console.log('aaa5');
    }
}
aaa5()();

// Promise
var aaa6 = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, 5000, "aaa6");
    }).then(function(result) {
        console.log(result);
    });
}
var aaa7 = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(reject, 3000, "aaa7");
    }).then(function(result) {
        console.log(result);
    });
}
var aaa8 = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, 2000, "aaa8");
    })
}

new Promise(function(resolve, reject) {
    resolve();
})
    .then(aaa6)
    .then(aaa7)
    .then(aaa8)
    .then(function(result) {
        console.log(result);
    })
    .catch(function(result) {
        console.log(result + "_Error!")
    });




console.log("bbb1");

new Promise(function(resolve, reject) {
    console.log("bbb2");
    resolve();
    console.log("bbb3");
}).then(function() {
    console.log("bbb4");
});

console.log("bbb5");
