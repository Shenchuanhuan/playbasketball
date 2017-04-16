
function allPack(objs){

    var shoot = objs;
    var curve1,curve2;
   
    /*
     *   操作按钮的角度即方向对应transx
     *   力量对应 transY
     */

    ballMove(shoot);
    function ballMove(shoot){
        //打开开关
        throwStatus = true;
        var defaultTarget = {
            transX:0,               //30.175||29.175
            transY:9.675,
            marginTopF:0,
            marginTopM:0,          //-280
            marginTopL:2,
            scale:0.6,
            transHig:0.8
        };

        //用一个变量保存默认值
        var Target = defaultTarget;

        //获取到的transform值为string，需要转化为number类型
        var begin = parseFloat(getCss(ball,'transform').transX);
        //篮球的初始大小，也是最大值
        var maxBall = parseFloat(getCss(ballImg,'width'));


        //松手的时候获得一个角度和力量的对象，通过判断角度和力量值进而修改Target的transX和transY属性
        //角度判断:决定水平方向
        if(shoot.angle > 180){ //如果是(180,360]向上投
            //给球加一个自定义属性，记录投球上下方向
            ball.direct = 'up';

            if(shoot.angle >=260 && shoot.angle <=280){//百分百命中方向范围：[260,280]
                //判断横竖屏
                if(html.className == 'landscape'){//横屏模式
                    Target.transX = 29.175;
                }else{//竖屏模式
                    Target.transX = 30.175;
                }
            }else{
                //如果不在百分百命中区，根据角度方向取值
                if(shoot.angle > 180 && shoot.angle < 260){//偏左边
                    Target.transX = 29.175 - (360-shoot.angle)/10;
                }else if(shoot.angle > 280){//偏右边
                    Target.transX = 30.175 + (shoot.angle-270)/10;
                }
            }

        }else{//[0,180]向下投
            ball.direct = 'down';
            if(shoot.angle >=0 && shoot.angle <= 90){//往右
                Target.transX = 30.175 + ((360-shoot.angle)-100)/10;
                if(Target.transX >= 38.175){Target.transX = 38.175};
            }else if(shoot.angle >90 && shoot.angle <=180){//往左
                Target.transX = 30.175 - (360-(shoot.angle + 90))/10;
            }
        }

        //力量判断：取值范围[0,100]，其中50~60都是百分百命中的力量值
        if(shoot.dynamics >= 50 && shoot.dynamics <= 60){//50~60
            if(ball.direct == 'up'){//向上
                if(html.className == 'landscape'){//横屏模式
                    Target.marginTopM = -7;
                }else{//竖屏模式
                    Target.marginTopM = -8;
                }
            }else{//向下
                Target.marginTopM = 4;
                Target.marginTopL = 1;
                th1 = 800;
                th2 = 1000;
                curve1 = 'linear';
                curve2 = 'linear';
            }
            //标准水平运动
            ts = 1400;
        }else{//非命中力量值范围
            if(ball.direct == 'up'){//向上
                //只要力量非百分百命中的力量，transX,t都要进行相应的改变
                if(shoot.dynamics < 50){//用力过小,垂直方向的最高点要改变
                    Target.marginTopM = -7 + Math.round((shoot.dynamics)/10-1);
                    Target.transX -= 5;
                    ts = 1000;
                }else if(shoot.dynamics > 60){//用力过猛
                    Target.marginTopM = -8;
					Target.transX += 3;
                    ts = 1500;
                }
            }else{//向下
                Target.marginTopM = 3;
                Target.marginTopL = -4;
                th1 = 1000;
                th2 = 1500;
                curve1 = 'linear';
                curve2 = 'Cubic.easeOut';
            }
        }
        
        //水平运动
        horizMove(Target.transX,ts);

        //垂直运动
        if(ball.direct == 'up'){
            th1 = 900;
            th2 = 1000;
            curve1 = 'Quint.easeOut';
            curve2 = 'Bounce.easeOut';
            verticalMove(th1,th2,'Quint.easeOut','Bounce.easeOut');
        }else{//向下
            verticalMove(th1,th2,curve1,curve2);
		}
		
        //水平方向的运动函数:传入两个参数：targetX --> 水平移动的目的位置  t---> 水平方向运动总时间
        function horizMove(targetX,t){
            Math.animation(begin,targetX,t,'linear',function(value,isEnding){
                //value返回运动属性的当前值，isEnding返回的是布尔值，运动结束后返回true
				if(shoot.dynamics >60){
					value += 1;
				}
                ball.style.transform = 'translate('+value+'rem,8.675rem)';
                if(isEnding){
                    console.log('水平方向运动结束');
                }
            });
        }

        //垂直方向的运动(marginTop)控制:Quint.easeOut && Expo.easeOut效果更好
        //四个参数：分别是上升到高点和落地的时间t1,t2，上升的运动轨迹和落地的运动轨迹 curve1,curve2
        function verticalMove(t1,t2,curve1,curve2){
            Math.animation(Target.marginTopF,Target.marginTopM,t1,curve1,function(value,isEnding){
                //抛出到最高点的运动
                ball.style.marginTop = value+'rem';
				
                if(isEnding){
                    //抛到最高点后开始下落的运动
                    Math.animation(Target.marginTopM,Target.marginTopL,t2,curve2,function(value,isEnding){
                        var disx = parseFloat(getCss(ball,'transform').transX);
                         //alert(value);
                        //在下落过程中进行判断
                        if( value > -6.9 && value <= -6.3){
                            //命中
                            if( disx >= 29.175 && disx <= 30.675){
                                if(shoot.dynamics >= 50 && shoot.dynamics <= 60){
                                    barket.className += ' goal';
                                    if(throwStatus) {
                                        if (barket.onOff) {
                                            score++;
											if(score >= 99){
												score = 99;
											}
                                            point.innerHTML = score < 10 ? '0' + score : score;
                                            barket.onOff = false;
                                        }
                                    }
                                }
                            }
                        }
                        ball.style.marginTop = value + 'rem';
                        if(isEnding){
                            //篮球落地，一次投篮完全结束
                            console.log('really gameover');
                            //一秒后篮球自动回到手里做准备并回复篮球原始大小
                            setTimeout(function(){
                                ball.style.cssText = '';
                                ballImg.style.cssText = '';
								barket.className = 'barket';
                                throwStatus = false;
                                barket.onOff = true;
                                console.log('垂直方向运动结束')
                            },200);
                        }
                    });
                }
            });

        }

        //投篮过程中篮球大小的运动控制:向上或向下投不影响大小运动
        Math.animation(maxBall,Target.transHig*maxBall,900,function(value,isEnding){
            ballImg.style.width = value + 'px';
            if(isEnding){

                Math.animation(Target.transHig*maxBall,Target.scale*maxBall,900,function(value){
                    ballImg.style.width = value + 'px';//到最高点
                });
            }
        });

    }


//获取样式的函数
    /*
     * 复合属性仅用于获取transform
     */
    function getCss(obj,attr){
        var value = obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
        if(value.indexOf('matrix') != -1){
            //该值为transform的属性值
            var arr = value.slice(7,value.length-1).split(',');
            var X = arr[4]/getCss(html,'font-size');
            var Y = arr[5]/getCss(html,'font-size');
            //toFixed针对于number类型的保留小数用
            //返回一个对象
            return {transX:X.toFixed(3),transY:Y.toFixed(3),scale:1};
        }else{
            //非transform的属性值
            return parseFloat(value);
        }
    }


}

