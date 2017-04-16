
//显示得分页  参数为真：显示  参数为假：隐藏
function opeaScorePage(bool) {
    var scorePage = document.getElementsByClassName('scorePageBox')[0];
    if (bool) {
        scorePage.style.display = 'block';
    }else {
        scorePage.style.display = 'none';
    }
}
//显示排行榜页  参数为真：显示  参数为假：隐藏
function opeaRankPage(bool) {
    var rankPage = document.getElementsByClassName('rankPageBox')[0];
    if (bool) {
        rankPage.style.display = 'block';
    }else {
        rankPage.style.display = 'none';
    }
}
// 上下页切屏 type = 'prev' 上一页，type = 'next'下一页，没有参数默认下一页
function changePage(type) {
    //页面当前位置
    var nowTrans = fameY();
    //当前页面高度
    var sections = document.querySelectorAll('.fame>section');
    //当前有几个未隐藏的section
    var secCount = sections.length;
    for (var i = 0;i < sections.length;i++){
        if (sections[i].style.display == 'none') {
            secCount--;
            if (secCount<1) secCount=1;
        }
    }
    //当前fame大盒子的高度
    var nowPageH = wdHeight*secCount;
    if (!type || type == 'next') {  //没有参数或者next为下一页
        //如果处于最后一页，下滑无效
        if (nowTrans == -(nowPageH-wdHeight)) return;
        fame.style.transform = 'translateY('+ (nowTrans-wdHeight) + 'px)';
    }
    else if (type == 'prev') {      //prev上一页
        //如果是第一页，上滑无效
        if (!nowTrans) return;
        fame.style.transform = 'translateY('+ (nowTrans+wdHeight) + 'px)';
    }else {
        console.log('滑屏函数参数有误！');
    }
}
//获取当前fame的transformY的值
function fameY() {
    if (!fame.style.transform) return 0;
    return parseFloat(fame.style.transform.split('(')[1]);
}
//获取当前在第几页
function  currentPage() {
    return Math.abs(fameY())/wdHeight+1;
}
//定时器的显示隐藏
function controlTimer() {
    if(modes.mode == 2) {
        countDown.style.display = 'block';
        /*启动定时计*/
        //++
        cDown();
        //++end
    }else {
        countDown.style.display = '';
    }
}
//获取得分，并把得分显示在的分页中
function getScore() {
    var strongs = document.querySelectorAll('.scorePageAccount strong');
    var score = parseFloat(document.querySelector('.playPage').getElementsByClassName('score')[0].innerHTML);
    console.log(score);
    if (score != '00' || score) {
        score<10 ? score = '0'+score : score = ''+score;
        strongs[0].innerHTML = score.charAt(0);
        strongs[1].innerHTML = score.charAt(1);
    }
}
//重置得分
function resetSocre() {
    score = 0;
    document.querySelector('.playPage .score').innerHTML= '00';
}
//回到首页
function backToTop() {
    fame.style.transform = 'translateY(0)';
}
//获取样式
function css(obj,attr) {
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}
//切换歌曲  bool:false 下一首  true:上首
function chanMusic(bool) {
    audios.pause();
    var musicImg = document.querySelector('.back .musicImg');
    var len = musicData.length;
    if (bool) {
        audios.currentMusic--;
        if (audios.currentMusic < 0) audios.currentMusic = len-1;
    }else {
        audios.currentMusic++;
        if (audios.currentMusic >= len) audios.currentMusic = 0;
    }
    audios.src = musicData[audios.currentMusic].src;
    musicImg.src = musicData[audios.currentMusic].img;
    audios.addEventListener('canplay',function () {
        audios.play();
    });
}