	//获取元素
	var loadPage = document.getElementsByClassName('loadPage')[0];//loading主体
	var homePage = document.getElementsByClassName('homePage')[0];//主页
	var homePage_logo = document.getElementsByClassName('homePage-logo')[0];//主页logo
	var loadPage_logo = document.getElementsByClassName('loadPage-logo')[0];//loading页的logo
	var loadPage_ball = document.getElementsByClassName('loadPage-ball')[0];//ball
	var homePage_img = document.getElementsByClassName('homePage-img')[0];//主页中间最大那个字体its
	var homePage_span2 = document.getElementsByClassName('homePage-span2')[0];//主页中间右边第二排字体
	var homePage_ziti = document.getElementsByClassName('homePage-ziti')[0];//主页中间部分父级
	var homePage_but = document.getElementsByClassName('homePage-but')[0];//主页最下面部分父级
	var homePage_about = document.getElementsByClassName('homePage-about')[0];//个人中心
	var userPage = document.getElementsByClassName('userPage')[0];//个人中心
	var userPage_close = document.getElementsByClassName('userPage-close')[0];//点击隐藏个人中心
	var audios = document.getElementsByTagName('audio')[0];//音频
	var music = document.getElementsByClassName('music')[0]; //唱片图标父级
	var music_music = document.getElementsByClassName('music-music')[0];//唱片图标
	var music_jindu = document.getElementsByClassName('music-jindu')[0];
	var music_jindu_1 = document.getElementsByClassName('music-jindu-1')[0];//点击关闭声音
	var music_jindu_2 = document.getElementsByClassName('music-jindu-2')[0];//音量条
	var music_jindu_3 = document.getElementsByClassName('music-jindu-3')[0];//调节音量的圆
	var music_jindu_4 = document.getElementsByClassName('music-jindu-4')[0];//点击调到最大音量
	var musiconOff = true;
	// var g = hWidth / 16 / 2;
	var flag = true;
	var timer1 = null;
	var timer = null;
	var timers = null;
	var useronOff = true;
	var bofang = true;
	var index = 0;
	var nums = 0;
	var o1 = true;
	var o2 = true;

	setTimeout(function () {
		music.style.display = 'block';
		homePage.style.display = 'block';
		loadPage.style.display = 'none';
	},1000);

	//homePage_but点击切换到选择人物界面
	homePage_but.addEventListener('touchstart',homePage_buts);
	function homePage_buts(ev){
		ev.stopPropagation();
		changePage('next');
	}
	
	//点击切换到个人中心页面
	homePage_about.addEventListener('touchstart',homePage_abouts);
	function homePage_abouts(){
		console.log(1)
		//设置开关 运动没结束不能再次点击
		if(!useronOff){
			return;
		}
		useronOff = false;
		//userpage页面从90度旋转到-2度
		userPage.style.transform = 'rotateZ(-2deg)';
		//过渡
		userPage.style.transition = 'all 0.3s linear';
		//延时再走到1度
		setTimeout(function(){
			userPage.style.transform = 'rotateZ(1deg)';
			//再延时回到正常位置
			setTimeout(function(){
				userPage.style.transform = 'rotateZ(0deg)';
				useronOff = true;
			},380);
		},350);
	}
	
	
	//点击隐藏个人中心页面
	userPage_close.addEventListener('touchstart',userPage_closes);
	function userPage_closes(){
		//设置开关 运动没结束不能再次点击
		if(!useronOff){
			return;
		}
		useronOff = false;
		//旋转-3度
		userPage.style.transform = 'rotateZ(-3deg)';
		//让userpage掉下本身高度的值
		userPage.style.top = getp(userPage).height + 'px';
		//过渡时间
		userPage.style.transition = 'all 0.4s linear';
		userPage.style.transform = 'rotateZ(-10deg)';
		//再开延时定时器使userpage回到原来的位置
		setTimeout(function(){
			userPage.style.top = '';
			userPage.style.transition = '';
			userPage.style.transform = 'rotateZ(90deg)';
			useronOff = true;
		},550);
	}
	
	
	function getp(obj){
		return obj.getBoundingClientRect();
	}
	//默认播放背景音乐
    audios.load();
    //当前播放歌曲索引下标
    audios.currentMusic = 0;
    audios.addEventListener('canplay',function () {
		audios.play();
		audios.pause();
        //从15秒开始播放
        audios.currentTime = 1;
        audios.play();
        audios.volume = 0.5;

    });
    //列表循环播放
    audios.addEventListener('ended', function () {
        chanMusic();
    }, false);
	//点击唱片图标
	music_music.addEventListener('touchstart',music_musics);
	function music_musics(){
		if(musiconOff){
			//清除唱片图标的定时器
			// clearInterval(timer1);
            music_jindu.style.display = 'block';

            tim = setTimeout(function(){
                music_jindu.style.left = '2.1rem';
				music_jindu.style.opacity = '1';
            },100);
			// music_jindu.style.left = 55/g + 'rem';
			music_jindu.style.transition = 'all 0.3s linear';
		}else{
			// t();
			// tim = setTimeout(function(){

                // music_jindu.style.width = '';
                // music_jindu.style.left = '';
				// music_jindu.style.opacity = '';

			// },0);

			// tim = setTimeout(function(){
				music_jindu.style.left = '';
                // music_jindu.style.width = '';
                music_jindu.style.opacity = '';
				// music_jindu.style.transition = 'all 0.5s linear';
			// },350);
		}
		//取反
		musiconOff = !musiconOff;
	}
	
	//默认转动唱片
	t();
	function t(){
		//让唱片转动
		// timer1  = setInterval(function(){
		// 	nums+=5;
		// 	music_music.style.transform = 'rotate('+nums+'deg)';
		// },16);
        music_music.className = 'music-music rotate';
	}
	
	//点击禁音
	music_jindu_1.addEventListener('touchstart',music_jindu_1s);
	function music_jindu_1s(){
		//设置音量大小
		audios.volume = 0;
		//赋值
		music_jindu_3.style.left ='0px';
	}
	//设置初始音量
	audios.volume = music_jindu_3.offsetLeft/60;
	//拖动调节音量
	music_jindu_3.addEventListener('touchstart',music_jindu_3s);
	function music_jindu_3s(ev){
		ev.stopPropagation();
		//拿到ev对象
		var ev = ev.targetTouches[0];
		//拿到手指位置到父级的距离
		var x = ev.pageX - music_jindu_3.offsetLeft;
		//移动圆点
        music_jindu.addEventListener('touchmove',move);
		function move(ev){
			//拿到ev对象
			var ev = ev.targetTouches[0];
			//手指按下位置
			var evx = ev.pageX - x;
			//可移动最大值
			var max = music_jindu_2.clientWidth - music_jindu_3.clientWidth;
			//防止超出
			if(evx<0){
				evx = 0;
			}
			if(evx>max){
				evx = max;
			}
			//赋值
			music_jindu_3.style.left = evx + 'px';
			//设置音量大小
			audios.volume = evx/max;
		}
		document.addEventListener('touchend',up);
		function up(){
			music_jindu_3.removeEventListener('touchmove',move);
		}
	}
	//点击最大声
	music_jindu_4.addEventListener('touchstart',music_jindu_4s);
	function music_jindu_4s(){
		//设置音量大小
		audios.volume = 1;
		//赋值
		music_jindu_3.style.left = music_jindu_2.clientWidth - music_jindu_3.clientWidth + 'px';
	}
	
