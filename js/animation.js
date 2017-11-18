(function () {
    // 运动方式
    var zfEffect = {
        // 匀速运动公式
        Linear: function (t, b, c, d) {
            return t / d * c + b;
        }
    };

    /**
     *effect 指定运动方式 传参情况
     * @param options [object] ele  target duration effect callBack
     */


    function move(options) {
        var ele = options.ele;
        var target = options.target;
        var duration = options.duration || 1000;
        var effect = options.effect;
        var callBack = options.callback;
        var tempEffect = zfEffect.Linear;
        if (typeof effect === 'number') {
            tempEffect = zfEffect.Linear;
        } else if (effect instanceof Array) {
            tempEffect = effect.length === 2 ? zhufengEffect[effect[0]][effect[1]] : zhufengEffect[effect[0]];
        } else if (typeof effect === 'function') {
            callBack = effect;
        }
        ele.zfTimer ? clearInterval(ele.zfTimer) : null;
        var begin = {};
        var change = {};
        for (var key in target) {
            if (target.hasOwnProperty(key)) {
                begin[key] = utils.css(ele, key);
                change[key] = target[key] - begin[key];
            }
        }
        var time = null;
        ele.zfTimer = setInterval(function () {
            time += 10;
            if (time >= duration) {
                utils.css(ele, target);
                clearInterval(ele.zfTimer);
                typeof callBack === 'function' ? callBack.call(ele) : null;
                return;
            }
            for (var key in target) {
                if (target.hasOwnProperty(key)) {
                    var cur = tempEffect(time, begin[key], change[key], duration);
                    utils.css(ele, key, cur);
                }
            }
        }, 10)
    }

    window.zfAnimate = move;
})();