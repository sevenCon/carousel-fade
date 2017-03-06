/**
 * desc: a demo similar to bootstrap carousel , but the anomation is fade in or out the window.
 * date: 2017-03-06 
 * author:sevenCon.quanlincong
 */

(function initBanner(window){
	var hoverDot = $(".carousel-indicators");  // active
	var banner = $(".carousel-inner"); 
	var tips = $("#home-school-notation");

	var time = 3000; // 轮播时长
	var timeClock = null;
	var timerOut = null;
	var now = +(hoverDot.find(".active").attr("data-slide-to"))+1, // 当前播放的图片
		length = hoverDot.children().length,
		next = now +1; // 所有的图片

	var isMoving = false;
	var last = null;
	var isCarousel = false; // 在非轮播状态下	

	startCarousel();
	// 开始轮播
	function startCarousel(){
		// 已经开始轮播
		if(timeClock){
			return false;
		}
		timeClock = setInterval(function(){
			isCarousel = true;
			nextStep();
		},time);
	}

	// 停止轮播
	function stopCarousel(){
		clearInterval(timeClock);
		timeClock = null;
		isCarousel = false;
	}

	function nextStep(){
		if(now == length){ // 最后一张
			// hover 状态
			next = 1;
		}else{
			next = now + 1;
		}

		hoverDot.find("li.active").removeClass("active");
		hoverDot.find("li:nth-child("+ next +")").addClass("active");
		showAnnotation(next);

		jump(now, next);
	}

	function last(){
		next = null;
		// 第一张
		if(now == 1){
			next = now+1;
		}else{
			next = now - 1;
		}

		hoverDot.find("li.active").removeClass("active");
		hoverDot.find("li:nth-child("+ next +")").addClass("active");
		showAnnotation(next);

		jump(now, next);
	}

	function jump(_now,_next){
		var className = "";
		var stateJump = "";

		if(isMoving){
			return false;
		}
		if(+_now > +_next){
			className = "prev";
			stateJump = "left";
		}else{
			className = "prev";
			stateJump = "left";
		}

		isMoving = true;
		banner.find(".active").addClass(stateJump);
		banner.find(".item:nth-child("+ next +")").addClass(className);
		banner.find(".item:nth-child("+ next +")").addClass(stateJump);
		
		function cb(__next){
			return function(){
				banner.find(".prev").removeClass("prev");
				banner.find(".left").removeClass("left");
				
				banner.find(".item:nth-child(" + __next + ")").addClass("active");
				banner.find(".item:nth-child(" + now + ")").removeClass("active");
				isMoving = false;
				now = __next;

				if(!isCarousel){
					if(__next !== last){
						jump(__next,last);
					}
				}
			}
		}
		if(timerOut){
			clearTimeout(timerOut);
			timerOut = null;
		}
		timerOut = setTimeout(cb(_next),500);
	}

	// icon hover状态
	function hoverIdt(index){
		index++;
		hoverDot.find("li.active").removeClass("active");
		hoverDot.find("li:nth-child("+ index +")").addClass("active");

		showAnnotation(index);
		jump(now,index);
	}
	// 显示标题
	function showAnnotation(index){
		tips.find("li").removeClass("active");
		tips.find("li:nth-child("+index+")").addClass("active");
	}

	hoverDot.find("li").mouseenter(function(el){
		stopCarousel();
		last = +el.target.dataset.slideTo+1;
		hoverIdt(+el.target.dataset.slideTo);
	});
	hoverDot.find("li").mouseleave(function(el){
		startCarousel();
	});
})(window);