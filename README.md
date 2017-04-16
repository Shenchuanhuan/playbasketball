###	简介
-	这是一个可以在手机上玩耍的投篮小游戏，可以点击这里在线体验
[在线体验投球小游戏](shenchuanhuan.github.io/playbasketball/)
-	打开在线版本后，记得调成手机端模式哟~
-	在家无聊了怎么办？来来来，做下面这几步
	-	git clone https://github.com/Shenchuanhuan/playbasketball.git
	-	cd playbasketball
	-	npm install -g http-server
	-	npm http-server -p 8888
	-	掏出手机，输入：IP：8888
	-	哈哈哈，欢迎进入篮球的世界：史上最难玩的投篮小游戏
	-	如果觉得游戏太垃圾了，欢迎@不想当翻译的死宅不是好程序媛 投诉，【虽然投诉也没什么用 @ v @
	
### 项目小结
-	在一些浏览器或设备上，当transform和z-index在一起使用时会发生异样，造成z-index失灵。
	>引起这个问题的原因：元素设置了transform属性后，会创建一个新的 stacking context（有人译为'层叠上下文'）。

	>哪些情况下会创建新的 stacking context？
	>--[来自MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)
	1.the root element (HTML)
	2.positioned (absolutely or relatively) with a z-index value other than "auto"
	3.a flex item with a z-index value other than "auto"
	4.elements with an opacity value less than 1
	5.elements with a transform value other than "none"
	6.elements with a mix-blend-mode value other than "normal"
	7.elements with isolation set to "isolate", on mobile WebKit and Chrome 22+, position: fixed always creates a new stacking context, even when z-index is "auto"
	8.specifing any attribute above in will-change even you don't write themselves directly

	>解决方法：
	1.父级，任意父级，非body级别，设置overflow:hidden可恢复和其他浏览器一样的渲染。
	2.以毒攻毒。也可以使用3D transform变换
	

-	body设置了overflow:hidden属性，但是body并没有禁止滚动条
	>解决办法：
	1.给body设置position:fixed;width:100%;height:100%
	2.给要滚动的元素添加一个父级，设定高度，overflow：auto
	3.html,body{height:100%;overflow:hidden}
	建议使用第三种，可以把overflow:hidden作为一个单独的隐藏类，更方便控制。

-	移动端调整位置最好使用百分比定位配合translate，直接用rem定位在适配安卓机时可能元素会跑偏。尤其是定位时用bottom，经常出问题,要写bootom:0的话用top;100%,transform:translateY(-100%)代替。
-	防止点透事件的一个简单小决窍：css3中的pointer-events:none 属性，这样设置真正意义上是去掉了onclick事件。
-	移动端要用addEventListener绑定事件，并且可以有多个event事件，因为可以多指触屏，所以获取第一个手指的event方法为event.touches[0]、event.tartgetTouches[0]，要注意的是touchend事件没有clientX,Y pageX,Y。

-	移动端audio，播放audio最好是在播放器加载完成返回“canplay”、“canplaythrough”状态后再进行播放。

### 在查找资料时遇到的一些可能有用的资料存储
-	[移动端click事件延迟300ms到底是怎么回事，该如何解决？](http://www.jshacker.com/note.asp?pageId=3585)
