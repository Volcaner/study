(function() {
    /**
    * JavaScript Demo: Function.bind()
    * 创建绑定函数
    */
    var module = {
        x: 42,
        getX: function() {
            return this.x;
        }
    };

    var unboundGetX = module.getX;
    console.log(unboundGetX());  // undefined

    // var unboundGetX_a = module.getX();
    // console.log(unboundGetX_a);

    var boundGetX = module.getX.bind(module);
    console.log(boundGetX());

    // var newBoundGetX = new boundGetX();  // this值被忽略
    // console.log(newBoundGetX);
})();

(function() {
    /**
    * 构造函数效果的模拟实现
    * 自然而然地，绑定函数适用于用new操作符 new 去构造一个由目标函数创建的新的实例。
    * 当一个绑定函数是用来构建一个值的，原来提供的 this 就会被忽略。
    * 然而, 原先提供的那些参数仍然会被前置到构造函数调用的前面。
    */

    var value = 2;
    var foo = {
        value: 1
    };
    function bar(name, age) {
        this.habit = "shopping";
        console.log(this.value);
        console.log(name);
        console.log(age);
    };
    bar.prototype.friend = "Kevin";
    var bindFoo = bar.bind(foo, "Daisy");  // 并且已经初始化了参数 name 的值，所以后面 new 的时候只需要 初始化 age 的值就可以了
    // bindFoo();

    var obj = new bindFoo("18");  // 这个时候  this 指向  obj; 原先提供的那些参数仍然会被前置到构造函数调用的前面
    console.log(obj.habit);
    console.log(obj.friend);
})();

(function() {
    /**
    * 偏函数
    * bind()的另一个最简单的用法是使一个函数拥有预设的初始参数。
    * 这些参数（如果有的话）作为bind()的第二个参数跟在this（或其他对象）后面，
    * 之后它们会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们的后面。
    */

    function list() {
        return Array.prototype.slice.call(arguments);
        // Array.prototype.slice.call(arguments [, start, end])  start 表示 返回的数组从第几个参数开始; end 表示结束位置
    };
    var list1 = list(1, 2, 3);
    console.log("list1: " + list1);

    var leadingThirtysevenList = list.bind(undefined, 37);
    var list2 = leadingThirtysevenList();
    console.log("list2: " + list2);
    var list3 = leadingThirtysevenList(1, 2, 3);
    console.log("list3: " + list3);
})();

(function() {
    /**
    * 配合 setTimeout
    * 在默认情况下，使用 window.setTimeout() 时，this 关键字会指向 window （或全局）对象。
    * 当使用类的方法时，需要 this 引用类的实例，你可能需要显式地把 this 绑定到回调函数以便继续使用实例
    */

    function LateBloomer() {
        this.patelCount = Math.ceil(Math.random() * 12) + 1;
    };

    //  Declare bloom after a delay of 1 second
    LateBloomer.prototype.bloom = function() {
        window.setTimeout(this.declare.bind(this), 1000);
    };

    LateBloomer.prototype.declare = function() {
        console.log('I am beautiful flower with ' + this.patelCount + ' patels!');
    };

    var flower = new LateBloomer();
    flower.bloom();  // 1秒后，调用 declare 方法
})();

(function() {
    /**
    * 快捷调用
    */

    var slice = Array.prototype.slice;
    // ...
    console.log(slice.apply("arguments"));

    // 在你想要为一个需要特定的 this 值的函数创建一个捷径（shortcut）的时候，bind() 方法也很好用。
    // 你可以用 Array.prototype.slice 来将一个类似于数组的对象（array-like object）转换成一个真正的数组，就拿它来举例子吧。你可以创建这样一个捷径：

    // 用 bind()可以使这个过程变得简单。在下面这段代码里面，slice 是 Function.prototype 的 apply() 方法的绑定函数，
    // 并且将 Array.prototype 的 slice() 方法作为 this 的值。这意味着我们压根儿用不着上面那个 apply()调用了。

    var unboundSlice = Array.prototype.slice;
    var slice = Function.prototype.apply.bind(unboundSlice);
    // ...
    console.log(slice("arguments"));
})();

(function($) {
    /**
    * test ("#app").showp();
    */

    // var fn = function() {
    //     this.showp = function() {
    //         var el = document.createElement("p");
    //         el.textContent = "aaa";
    //         this.appendChild(el);
    //     };
    // };

    // var showp = function() {
    //     p = p.bind(this);
    //     p();
    // };
    var showp = function() {
        var el = document.createElement("p");
        el.textContent = "aaabbb";
        this.appendChild(el);
    }
    HTMLElement.prototype.showp = showp;

    document.querySelector(".app").showp();
    document.querySelector("body").showp();

    // $(".app").bind(null, "", showp);
})(jQuery);
