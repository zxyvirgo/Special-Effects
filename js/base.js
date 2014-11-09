var GLOBAL={};
GLOBAL.namespace=function(str){
    var arr = str.split("."),o = GLOBAL;
    for(i=arr[0]=="GLOBAl"?1:0;i<arr.length;i++){
        o[arr[i]]=o[arr[i]]||{};
        o=o[arr[i]];
    }
}

GLOBAL.namespace("Dom");
GLOBAL.Dom.getElementsByClassName=function(str,root,tag) {
    if (root) {
        //root是否一定是参数呢？
        root = typeof  root == "string" ? document.getElementById(root) : root;

    } else
    {
        root = document.body;
    }

    tag = tag || "*";
    var els = root.getElementsByTagName(tag), arr = [];
    for (var i = 0, n = els.length; i < n; i++ )
    {
        for (var j = 0, k = els[i].className.split(" "), l = k.length; j < l; j++ ){
            if (k[j] == str) {
                arr.push(els[i]);
                break;
            }
        }
    }
    return arr;
}

GLOBAL.namespace("Event");
GLOBAL.Event.on = function(node,eventType,handler,scope){
    node = typeof node == "string"?document.getElementById(node):node;
    scope = scope || node;

    if(document.all){
        node.attachEvent("on"+eventType,function(){handler.apply(scope,arguments)});}
    else{
        node.addEventListener(eventType,function(){handler.apply(scope,arguments)},false);
    }
}

//打分代码
function Rate(rateRoot){
    var root = typeof rateRoot == "string"?document.getElementById(rateRoot):rateRoot;
    var items = root.getElementsByTagName("img");
    var imgs = ["css/img/star.gif","css/img/star2.gif"];
    var rateFlag;
    for (var i= 0, n = items.length; i<n; i++){
        items[i].index = i;
        GLOBAL.Event.on(items[i],"mouseover",function(){
            if(rateFlag) return;
            for(var j=0; j<n; j++){
                if(j<=this.index){
                    items[j].src = imgs[1];
                }else{
                    items[j].src = imgs[0];
                }
            }
        });
        GLOBAL.Event.on(items[i],"mouseout",function(){
            if(rateFlag) return; //被打过分数的就不用再变回去了
            for (var j=0; j<n; j++){
                items[j].src = imgs[0];
            }
        });
        GLOBAL.Event.on(items[i],"click",function(){
            if(rateFlag) return; //已经打过分的就不用再打分了
            rateFlag =true;
            alert("您打了"+(this.index+1)+"分");
        })
    }
}

var rateNodes = GLOBAL.Dom.getElementsByClassName("J_rate");
for(var i= 0, n = rateNodes.length; i<n; i++){
    new Rate(rateNodes[i]);
}

//动态闪动的方块
function dynamic(){
    var i = Math.round(Math.random()*100);
    var root = document.getElementsByClassName("content_left")[0];
    var pic = root.getElementsByClassName("i"+i)[0];
    if(pic.getAttribute("class").indexOf("pic")==-1){
        pic.removeAttribute("class");
        pic.setAttribute("class","i"+i+" "+"pic");
    }else{
        pic.setAttribute("class","i"+i);
    }
}
var time = setInterval("dynamic()",100);
//轮播效果
function wrap(){
    var wrap = document.getElementById('wrap'),
        pic = document.getElementById('pic'),
        list = document.getElementById('list').getElementsByTagName('li'),
        index = 0,
        timer = null;
    pics = pic.getElementsByTagName("li");

    if (pics.length != list.length) {
        return;
    }
    var len = pics.length;
    for (var j = 0; j < len; j++) {
        pics[j].setAttribute("id", "p" + j);
    }

    for (var j = 0; j < len; j++) {
        list[j].setAttribute("id", j);
    }
    // 定义并调用自动播放函数
    for (var m = 0; m < len; m++) {
        list[m].onmouseover = function () {
            for (var i = 0; i < len; i++) {
                list[i].setAttribute("class", "");
            }
            this.setAttribute("class", "on");
            changeImg("p" + this.id);
            index = this.id;
        }
    }
    function play() {

        for (var i = 0; i < len; i++) {
            list[i].setAttribute("class", "");
        }
        list[index].setAttribute("class", "on");
        changeImg("p" + index);
        if (index < 4) {
            index++;
        } else {
            index = 0;
        }
    }


    function changeImg(curindex) {
        var temp = document.getElementById(curindex);
        pic.insertBefore(temp, pic.firstChild);
    }

    if (timer != null) {
        clearInterval(timer);
        timer = null;
    }
    timer = setInterval(play, 500);

    // 定义图片切换函数

    // 鼠标划过整个容器时停止自动播放
    wrap.onmouseout = function () {
        timer = setInterval(play, 500);
    }

    wrap.onmouseover = function () {
        clearInterval(timer);
    }

}
wrap();