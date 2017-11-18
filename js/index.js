(function () {
    var aBox = document.getElementById('imgBox');   //图片盒子
    var box = document.getElementById('box');       //最外盒子
    var bBox = document.getElementById('focusBox'); //焦点盒子
    var oLi = bBox.getElementsByTagName('li');      //所有焦点
    var oImgs = aBox.getElementsByTagName('img');   //所有图片
    var wid = box.clientWidth;                      //最外盒子的内容宽度

    function get (cal) {    //数据请求
        var xhr = new XMLHttpRequest;
        xhr.open('get', 'data.txt', true);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && /^2\d{2}$/.test(this.status)) {
                // 数据处理
                var data = 'JSON' in window ? JSON.parse(this.responseText) : eval('(' + this.responseText + ')');
                typeof cal === 'function' ? cal(data) : null;
            }
        };
        xhr.send(null);
    }

    get(bindData);
    var length;

    function bindData(data) {
        length = data.length + 1;
        utils.css(aBox, 'width', length * wid); //设置图片盒子的宽度=所有图片的length（数量）*视图容器的宽度
        var imgSrc = '';
        var liSrc = '';
        for (var i = 0; i < data.length; i++) {
            var cur = data[i];
            imgSrc += '<div><img real=' + cur.img + '></div>';   //图片的模板
            liSrc += i === 0 ? '<li class="selected"></li>' : '<li></li>';   //焦点的模板
        }
        imgSrc += '<div><img real=' + data[0].img + '></div>';   //图片的模板
        aBox.innerHTML = imgSrc;     //添加到图片盒子
        bBox.innerHTML = liSrc;      //添加到焦点盒子
        imgLoad();    //加载当前视口图片
        loadInd()     //焦点点击事件
    }

    var timer;

    function imgLoad() {
        for (var i = 0; i < oImgs.length; i++) {
            (function (n) {
                var cur = oImgs[n];
                var imgSrc = cur.getAttribute('real');
                var temp = new Image;
                temp.src = imgSrc;
                temp.onload = function () {
                    cur.src = imgSrc;
                    zfAnimate({  //第一次加载图片时透明度变化的动画
                        ele: cur,
                        target: {
                            opacity: 1  //透明度
                        },
                        duration: 200   //动画的速度
                    });
                    temp = null;
                }
            })(i);
        }
        timer = setInterval(auto, 3000);    //图片切换的速度
    }

    var step = 0; //设置一个初始值

    function auto(ind) {
        step++;
        typeof ind != 'undefined' ? step = ind : null;
        if (step > length - 1) {  //当初始值大于图片总数-1的时候，将图片盒子的left改为0；
            utils.css(aBox, 'left', 0);
            step = 1;
        }
        zfAnimate({
            ele: aBox,
            target: {
                left: step * -wid
            },
            duration: 300  //图片运动的速度
        });
        changeInd(step)
    }

    function changeInd(n) { //默认选中时的焦点样式设置
        n >= length - 1 ? n = 0 : null;
        for (var i = 0; i < oLi.length; i++) {
            var cur = oLi[i];
            i === n ? cur.className = 'selected' : cur.className = '';
        }
    }

    function loadInd() {  //焦点点击事件
        for (var i = 0; i < oLi.length; i++) {
            oLi[i].ind = i;
            oLi[i].onclick = function () {
                auto(this.ind);
            }
        }
    }

    var oLeft = document.getElementById('left');  //左箭头
    var oRight = document.getElementById('right');  //右箭头
    box.onmouseover = function () {  //鼠标滑到轮播图的事件
        oLeft.style.display = oRight.style.display = 'block';
        clearInterval(timer);
    };
    box.onmouseout = function () {   //鼠标离开时的事件
        oLeft.style.display = oRight.style.display = 'none';
        timer = setInterval(auto, 3000); //离开后执行动画的时间间隔
    };
    oLeft.onclick = function () {    //点击左箭头事件
        step--;
        if (step === -1) {
            utils.css(aBox, 'left', (length - 1) * -wid);
            step = length - 2;
        }
        zfAnimate({
            ele: aBox,
            target: {
                left: step * -wid
            },
            duration: 300 //点击左箭头向左运动的速度
        });
        changeInd(step)
    };
    oRight.onclick = function () {    // 点击右箭头事件
        auto()
    }
})();