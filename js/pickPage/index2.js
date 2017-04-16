window.onload = function(){
	//获取元素
	var player = document.querySelectorAll('.pickPage-select figure');
	var pickPagePlayer = document.getElementById('pickPage-player');//球员详情页
	var pickPageAbout = document.getElementsByClassName('pickPage-about')[0];//有关于按钮	
	var name = document.querySelector('.player-details h1');
	var part = document.querySelector('.player-details h3');
	var sup = document.querySelector('.player-details p');
	var num = document.getElementsByClassName('player-num')[0];
	var playerico = document.querySelector('.player-ico img');
	var close = document.querySelector('#pickPage-player button');
    var backTop = document.getElementsByClassName('try')[0];
	var gameMode = document.getElementsByClassName('gameMode')[0];
	var modelPage = document.getElementById('modelPage');//选择模式页
	var revert = document.getElementsByClassName('revert')[0];
	var scorePage = document.getElementById('scorePage');//得分页
	// var scorePageClose = document.querySelector('#scorePage button');
	var scorePagedown = document.querySelector('#scorePage a');
	var rankPage = document.getElementById('rankPage');//排行榜页
    var rankBtn = document.querySelector('.scorePageBox .rank');
    var rankPageCup = document.querySelector('.rankPageCup img');

	// scorePagedown.addEventListener('touchstart',function(ev){
     //    ev.stopPropagation();
	// 	rankPage.className = 'active';
	// 	rankPage.style.display = 'block';
	// });
    //点击进入排行榜页
    rankBtn.addEventListener('touchstart',function (ev) {
        ev.stopPropagation();
        //显示排行榜页
        opeaRankPage(1);
        changePage('next');
        //切换阴影小人图像
        chanRankPageCup();
    });
    //排行榜页面回到顶部
    document.querySelectorAll('#rankPage nav a')[0].addEventListener('touchstart',function (ev) {
        ev.stopPropagation();
        backToTop();
        resetSocre();
        //隐藏得分页和排行榜页
        setTimeout(function () {
            opeaScorePage(0);
            opeaRankPage(0);
        },500);
    });
    //play again
    document.querySelectorAll('#rankPage nav a')[1].addEventListener('touchstart',function (ev) {
        ev.stopPropagation();
        changePage('prev');
        changePage('prev');
        resetSocre();
        controlTimer();
        //隐藏得分页和排行榜页
        setTimeout(function () {
            opeaScorePage(0);
            opeaRankPage(0);
        },500);
    });
    //排行榜阴影小人儿切换
    function chanRankPageCup() {
        var player = document.querySelector('.playPage-wrap').getAttribute('data-player');
        console.log(player);
        rankPageCup.src = data[player-1].cup;
    }

	//点击进去选择模式
	gameMode.addEventListener('touchstart',function(ev){
        ev.stopPropagation();
		modelPage.style.display = 'block';
		modelPage.className = 'active';
	});
	//点击返回首页
    backTop.addEventListener('touchstart',function(ev){
        ev.stopPropagation();
        changePage('prev');
    });
	//点击返回游戏
	revert.addEventListener('touchstart',function(ev){
        ev.stopPropagation();
		modelPage.className = 'down';
		setTimeout(function(){
			modelPage.style.display = 'none';
		},500);
	});
    //点击显示球员详情
    for(var i=0;i<player.length;i++){
        player[i].index = i;
        player[i].addEventListener('touchstart',function(ev){
            ev.stopPropagation();
            for(var i=0;i<player.length;i++){
                player[i].className = '';
            }
            this.className = 'up';
        })
    }
    //点击被选中的球员信息球员信息
    var pickPageAbout = document.getElementsByClassName('pickPage-about')[0];
    pickPageAbout.addEventListener('touchstart',function(ev){
        ev.stopPropagation();
        pickPagePlayer.className = 'shake';
        pickPagePlayer.style.display = 'block';
        for(var i=0;i<player.length;i++){
            if(player[i].className == 'up'){
                //球员名字
                name.innerHTML = data[i].name;
                //球员位置
                part.innerHTML = data[i].part;
                //球员特质
                sup.innerHTML = data[i].sup;
                //球衣号码
                num.innerHTML = '#<strong>'+data[i].num+'</strong>';
                //球员
                playerico.src = data[i].ico;
            }
        }
    });
	//点击关闭
	close.addEventListener('touchstart',function(ev){
        ev.stopPropagation();
		pickPagePlayer.className = 'down';
		setTimeout(function(){
			pickPagePlayer.style.display = 'none';
		},500);
	});
	modes.mode = 2; //默认选择模式2,即挑战模式
	for(var i = 0;i < modes.length;i++ ){
		modes[i].index = i;
		modes[i].addEventListener('touchstart',function (ev) {
			ev.stopPropagation();
            for(var i = 0;i < modes.length;i++ ){
            	modes[i].className = '';
            }
            this.className = 'selected';
            modes.mode = this.index+1;
        });
	}
    //pickPage开始游戏按钮
    var startBtn = document.querySelector('.modelPageInner span');
    startBtn.addEventListener('touchstart',function (ev) {
        ev.stopPropagation();
        //给start加内阴影
        // startBtn.className = 'active';
        var ball = document.querySelector('.modelPage_ball');
        ball.style.opacity = '0';
        setTimeout(function () {
            //隐藏modelPage页面
            modelPage.style.display = '';
            ball.style.opacity = '';
        },500);
        //切换player
        var playerPage = document.querySelector('.playPage-wrap');
        for(var i=0;i<player.length;i++){
            if(player[i].className == 'up'){
                playerPage.setAttribute('data-player',i+1);
                playerPage.setAttribute('mode',modes.mode);
            }
        }
        //切换到游戏页面
        changePage('next');
        // 如果是挑战模式显示倒计时
        var countDown = document.querySelector('.countDown');
        controlTimer();
    });
};
