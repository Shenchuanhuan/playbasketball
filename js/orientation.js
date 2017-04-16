
//判断横竖屏,修改html类名来标识横竖屏，竖屏：portrait 横屏：landspace
(function(){
    var supportsOrientation = (typeof window.orientation == 'number' && typeof window.onorientationchange == 'object');
    var HTMLNode = document.body.parentNode;
    var updateOrientation = function() {
        var fame = document.querySelector('.fame');
        if(supportsOrientation) {
            updateOrientation = function() {
                var orientation = window.orientation;
                switch(orientation) {
                    case 90: case -90:
                    orientation = 'landscape';
                    break;
                    default:
                        orientation = 'portrait';
                }
                HTMLNode.setAttribute('class', orientation);
                // alert(window.innerHeight);
                initialDom();
            }
        } else {
            updateOrientation = function() {
                var orientation = (window.innerWidth > window.innerHeight) ? 'landscape': 'portrait';
                HTMLNode.setAttribute('class', orientation);
                // alert(window.innerHeight);
                initialDom();
            };
        }

        updateOrientation();
    };
    var init = function() {
        updateOrientation();
        if(supportsOrientation) {
            // 支持屏幕转动事件的浏览器
            window.addEventListener('orientationchange', updateOrientation, false);
        } else {
            //兼容不支持屏幕转动的浏览器例如微信
            setInterval(updateOrientation, 800);

        }
    };
    window.addEventListener('DOMContentLoaded', init, false);
})();