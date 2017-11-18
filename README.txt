# 使用方法：
1.写成HTML文件中的布局,css样式改成自己需求的
    <div id="自己定义">
        <div id="自己定义“></div>
        <ul id="自己定义“></ul>
        <a href="javascript:;" id="自己定义">＜</a><a href="javascript:;" id="自己定义">＞</a>
    </div>
2.在index.js里将id或class改成自己设定的id或class
3.时间设置：
    （1）改变图片切换的速度：将index.js里imgLoad和box.onmouseout函数里timer = setInterval(auto, 3000)的3000改掉就好，1秒等于1000；
    （2）改变切换过程中图片运动的速度：将index.js里除了imgLoad的duration外，其他的duration全部改掉就好duration: 200，200=0.2秒；


js文件都是封装好的