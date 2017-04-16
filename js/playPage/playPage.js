
//投篮对象，装有投篮的力度和方向
var shoot = {
    dynamics:0,
    angle:0
};
//拖动小球
//拖动小球
var controlBox = document.querySelector('.controlBox');
var control = document.querySelector('.control');
var sBall = document.querySelector('.control .control-ball');
//大圆、小圆半径
var bR = control.clientWidth/2,
    sR = sBall.clientWidth/2;
controlBox.addEventListener('touchstart',function (event) {
    event.stopPropagation();
    event.preventDefault();

});
control.addEventListener('touchstart',function (event) {
    event.stopPropagation();
    event.preventDefault();

});
sBall.addEventListener('touchstart',function (event){
    event.stopPropagation();
    event.preventDefault();

    //取消投篮动作
    quitActOfShoot();
    sBall.removeEventListener('touchend',end);
    //当前点到起点的距离，即求三角形斜边长
    var dist = 0;
    //投篮角度
    var dir = 0;
    var ev = event.touches[0];
    var sX = ev.clientX,
        sY = ev.clientY;
    //手指点击的位置距离小球原点的距离
    var bd = sBall.getBoundingClientRect();
    sBall.addEventListener('touchmove',move);
    sBall.addEventListener('touchend',end);
    function move(event) {
        event.stopPropagation();
        event.preventDefault();
        var ev = event.touches[0];
        var nX = ev.clientX,
            nY = ev.clientY;
        var marX = nX - sX,
            marY = nY - sY;

        var $dist = Math.sqrt((Math.pow(Math.abs(marX),2))+(Math.pow(Math.abs(marY),2)));

        //限制小球不能移出大球范围
        if ($dist>bR) return;
        dist = $dist;
        //投篮角度
        var direct = Math.round(180/Math.PI*Math.atan(Math.abs(marY)/Math.abs(marX)));
        /*
         为了求投篮的角度，将大球划分为一二三四4个象限，根据小球所处的象限和拖动的角度求出投篮的角度
         第一象限：marX < 0 && marY < 0
         第二象限：marX > 0 && marY < 0
         第三象限：marX > 0 && marY > 0
         第四象限：marX < 0 && marY > 0;
         */
        //第一象限
        if (marX < 0 && marY < 0) {
            direct = ten(direct);
        }
        //第二象限,包括180度
        if (marX > 0 && marY < 0){
            direct = ten(90-direct) + 90;
        }
        //第三象限，包括270度
        if (marX > 0 && marY > 0){
            direct = ten(direct) + 180;
        }
        //第四象限
        if (marX < 0 && marY > 0){
            direct = ten(90-direct) + 270;
        }
        dir = direct;
        //改变小球定位
        sBall.style.left = marX + 'px';
        sBall.style.top = marY + 'px';
        //取整十的函数
        function ten(num) {
            return Math.round(num/10)*10;
        }
    }
    function end(event) {
        event.stopPropagation();
        sBall.removeEventListener('touchmove',move);
        sBall.removeEventListener('touchend',end);
        //投篮力度和角度
        shoot.dynamics = Math.ceil(dist/bR*100);
        shoot.angle = dir;
//            console.log(shoot);

        //小球回到原位，做个动画
        sBall.style.top = 0;
        sBall.style.left = 0;
        //投篮动作
		if(!throwStatus){
			actOfShoot();
		}
        //actOfShoot();
        //!!!投篮的过程和动作写在这里
		// -Chuan
			//需要延迟500ms等待投篮动作完成
			setTimeout(function(){
				if(!throwStatus){
					barket.className = 'barket';
					allPack(shoot);
				}else{
					return;
				}
			},500);
			
			
			/*投篮过程和动作部分结束*/
    }
});
//play投篮动作
function actOfShoot() {
    document.querySelector('.ball-wrapper').className += ' prepare';
    document.querySelector('.player').className += ' throw';
}
//取消play投篮动作
function quitActOfShoot() {
    document.querySelector('.ball-wrapper').className = 'ball-wrapper';
    document.querySelector('.player').className = 'player';
}

//翻转记分牌
(function () {
    var gameInfo = document.querySelector('.game-info');
    var back = document.querySelector('.game-info .back');
    gameInfo.onOff = true; //true:正面  false:反面
    gameInfo.addEventListener('touchstart',function () {
        if (this.onOff) {
            gameInfo.className += ' flip';
            back.style.opacity = 1;
            setTimeout(function () {
                gameInfo.className = 'game-info';
            },400)
        }else {
            gameInfo.className += ' flip';
            back.style.opacity = 0;
            setTimeout(function () {
                gameInfo.className = 'game-info';
            },400)
        }
        this.onOff = !this.onOff;
    });
})();