
(function () {
    var cont = document.querySelector('.music-control .cont');
    var prev = document.querySelector('.music-control .prev');
    var next = document.querySelector('.music-control .next');
    var musicPlayer = document.querySelector('.back .musicPlayer');

    //从loadPage.js中获取audios对象，和currentMusic当前歌曲咋musicData里的下标
    cont.onOff = true;//音乐播放中
    cont.addEventListener('touchstart',function (ev) {
        ev.stopPropagation();
        if (this.onOff) {
            audios.pause();
            this.getElementsByTagName('img')[0].src = 'image/playPage/music-p-1.png';
            //更改碟片和杆子状态
            musicPlayer.className = 'musicPlayer stop';
        }else {
            audios.play();
            this.getElementsByTagName('img')[0].src = 'image/playPage/music-p-4.png';
            //更改碟片和杆子状态
            musicPlayer.className = 'musicPlayer';
        }
        this.onOff = !this.onOff;

    });
    //上一首
    prev.addEventListener('touchstart',function (ev) {
        ev.stopPropagation();
        chanMusic(1);
    });
    //下一首
    next.addEventListener('touchstart',function (ev) {
        ev.stopPropagation();
        chanMusic();
    });
})();