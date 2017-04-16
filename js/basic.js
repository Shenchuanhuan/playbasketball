
//上下滑屏切换页面  垂直滑屏超过4.25rem

(function () {
    // alert(window.innerWidth/16);
    fame.addEventListener('touchstart',function (ev) {
        fame.removeEventListener('touchmove',move);
        ev.preventDefault();
        ev = ev.touches[0];
        //计算rem等于多少px
        var minDist = 4.25*parseFloat(document.body.parentNode.style.fontSize);
        var sY = ev.clientY;
        fame.addEventListener('touchmove',move);
        function move (ev){
            ev.preventDefault();
            ev = ev.touches[0];
            //判断垂直滑屏距离
            var nowY = ev.clientY;
            var mar = Math.abs(nowY - sY);
            if (mar >= minDist) {
				clearScroe();
                if (nowY > sY) {
                    //如果是投篮页，也就是第三页，则mode=2为默认挑战模式
                    if (currentPage() == 3 || currentPage() == 2) {
                        modes.mode = 2;
                    }
                    if (currentPage() == 4 || currentPage() == 5) {
                        // 重置定时器
                        controlTimer();
                        //重置得分
                        resetSocre();
						
                    }
                    changePage('prev');
                    //从得分页上滑，要隐藏得分页,主意此时已经是在第三页了
                    if (currentPage() == 3) {
                        setTimeout(opeaScorePage,500);
                    }
                    //从排行榜上滑，隐藏排行榜,此时已经在第四页或者第三页了
                    if (currentPage() == 4 || currentPage() == 3) {
                        setTimeout(opeaRankPage,500);
                    }
                }else {
                    if (currentPage() == 2 || currentPage() == 1 ) {
                        controlTimer();
                    }
                    //如果是第三页投篮页，禁止往下滑动
                    if (currentPage() == 3) return;
                    //如果是第四页要先显示第五页再下滑
                    if (currentPage() == 4) {
                        opeaRankPage(1);
                    }
                    changePage('next');

                }
                fame.removeEventListener('touchmove',move);
            }
        }
    });
})();

//清空得分函数
function clearScroe(){
	if(currentPage() != 3){
		clearInterval(timer);
		score = '00';
		point.innerHTML = '00';
		counts.innerHTML = '0';
		countDown.style.display = 'none';
	}
}
