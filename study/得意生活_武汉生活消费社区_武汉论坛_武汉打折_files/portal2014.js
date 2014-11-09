(function(){
	'use strict';
	//创建计时器
	var timer = function(callback, interval){
		return new timer.fn.init(callback, interval);
	};
	timer.fn = timer.prototype = {
		init: function(callback, interval){
			interval && (this.interval = interval);
			this.callback = callback;
			this.timer = setInterval(callback, this.interval);
			return this;
		},
		pause: function(){
			clearInterval(this.timer);
		},
		resume: function(){
			clearInterval(this.timer);
			this.timer = setInterval(this.callback, this.interval);
		}
	};
	timer.fn.init.prototype = timer.fn;
	//计时器结束



	$('#icf_top_tags').add('#icf_issues_tags').on('mouseover', 'a', function(e){
		var target = $(this), index = target.index(), content = target.parent().next(), width = content.prop('id') === 'icf_top_content' ? 300 : 218 ;
		target.addClass('hover').siblings().removeClass('hover');
		content.stop().animate({marginLeft: - width * index});
	});
	
	//精彩活动
	var activitiesFooterLock = false, activitiesButton = $('#icf_activities_footer'), activitiesTimer = timer(function(){
		activitiesButton.trigger('click');
	}, 5000);
	
	$('#icf_activities_footer').click(function(){
		activitiesTimer.resume();
		if(activitiesFooterLock){
			return;
		}
		
		var container = $(this).prev(), children = container.children(), first = children.first();
		if(children.length < 5){
			activitiesTimer.pause();
			return;
		}
		
		activitiesFooterLock = true;
		children.filter(':nth-child(-n+4)').clone().appendTo(container);
		first.animate({marginTop:-331}, function(){
			first.css({marginTop:0});
			children.filter(':nth-child(-n+4)').remove();
			activitiesFooterLock = false;
		});
	});

	//时尚购物
	var shoppingLock = false, figures = $('#ics_focus').children('figure'),
		layer1 = {left:32, top:40, width:179, height:235, opacity:0.2},
		layer2 = {left:67, top:20, width:213, height:280, opacity:1},
		layer3 = {left:138, top:40, width:179, height:235, opacity:0.2},
		shoppingTimer = timer(function(){
			$('#ics_focus').children().last().trigger('click');
		}, 2000),
		move = function(){figures.eq('0').css({zIndex:1}).animate(layer1, 300).next().css({zIndex:2}).animate(layer2, 300).next().css({zIndex:1}).animate(layer3, 300, function(){shoppingLock = false;})};
	move();
	$('#ics_focus').children('.arrow').click(function(){
		shoppingTimer.resume();
		if(shoppingLock){
			return;
		}
		shoppingLock = true;
		var direction = $(this).index();
		direction ? figures.first().before(figures.last()) : figures.last().after(figures.first());
		figures = $('#ics_focus').children('figure')
		move();
	});
	$('#ics_focus').on('click', 'figure', function(e){
		shoppingTimer.resume();
		var target = $(this);
		if( target.index() == 1 ){
			figures.first().before(figures.last());
			e.preventDefault();
		}
		else if( target.index() == 3 ){
			figures.last().after(figures.first());
			e.preventDefault();
		}
		else{
			return;
		}
		figures = $('#ics_focus').children('figure')
		move();
	}).on('mouseenter', 'figure', function(){
		shoppingTimer.pause();
	}).on('mouseleave', 'figure', function(){
		shoppingTimer.resume();
	});


	//首页焦点轮播
	var focus_lock = false, buttons = $('#icf_buttons').children();
	var focusTimer = timer(function(){
		var next = buttons.filter('.active').next();
		next.is('.hover') && (next = buttons.first());
		next.trigger('click');
	}, 5000);

	var slider = $('<li class="hover" style="left:0;"></li>').appendTo('#icf_buttons');

	$('#icf_buttons').on('click', 'li:not(.hover)', function(){
		var target = $(this);
		if(target.is('.active') || focus_lock){
			return;
		}
		focus_lock = true;
		var targetIndex = target.index(), active = target.siblings('.active'), activeIndex = active.index(), figures = $('#icf_stage').children(), left;

		active.removeClass('active');
		target.addClass('active');
		slider.stop().animate({left:38*targetIndex});
		if(targetIndex < activeIndex){
			left = -300;
		}
		else{
			left = 300;
		}
		figures.eq(targetIndex).css({left:left,opacity:0}).show().animate({left:0, opacity:1}, 500, function(){
			figures.eq(activeIndex).hide();
			focus_lock = false;
		}).addClass('active').siblings('.active').removeClass('active');
	}).on('click', 'li', function(){
		focusTimer.resume();
	});
    $('#icf_stage').find('img').each(function(){
        var height = this.height;
        var width = this.width;
        var src = this.src;
        var that = this;
        if(height === 0 || width === 0){
           this.height = 330;
           this.width = 300;
        }
		else{
        	resize.call(this, height, width);
		}
		var preLoader = new Image();
		$(preLoader).on('load' ,function(){
			resize.call(that, this.height, this.width);
		});
		preLoader.src = src;
        function resize(height, width){
			
            if(height/width < 11/10){
                this.height = 330;
                this.removeAttribute('width');
                this.style.marginLeft = -(width*(330/height) - 300)/2 + 'px';
            }
            else{
                this.width = 300;
                this.removeAttribute('height');
                this.style.marginTop = -(height*(300/width) - 330)/2 + 'px';
            }
        }
    });

	//团购进行时

	var tuanTimer = timer(function(){
		var list = $('#ics_groupon_list'),hover = list.find('.hover') , next = hover.next();
		!next.length && (next = list.children(':first'));
		hover.removeClass('hover');
		next.addClass('hover');
	}, 5000);

	$('#ics_groupon_list').on('mouseenter', '.title', function(){
		tuanTimer.pause();
		$(this).parent().parent().addClass('hover').siblings().removeClass('hover');
	}).on('mouseleave', '.hover', function(){//鼠标移出时重新开始计时
		tuanTimer.resume();
	}).on('mouseenter', '.hover', function(){
		tuanTimer.pause();
	});
	
	
	//汽车轮播
    var carslock = false, buttonsContainer = $('#icc_figures_buttons'), carButtons = buttonsContainer.children(), carList = $('#icc_figures_list').children();
	var carsTimer = timer(function(){
		var next = carButtons.filter('.active').next();
		next.length == 0 && (next = carButtons.first());
		next.trigger('click');
	}, 5000);

	buttonsContainer.on('click', 'li:not(.active)', function(){
		carsTimer.resume();
		if(carslock){
			return;
		}
		carslock = true;
		var target = $(this), targetIndex = target.index(), active = target.siblings('.active'), activeIndex = active.index(), targetLi = carList.filter('.active');
		active.removeClass('active').end().addClass('active');
		if(targetIndex < activeIndex){
			var left = -279;
		}
		else{
			var left = 279;
		}
		targetLi.css({zIndex:2}).end().eq(targetIndex).css({display:'block',left:left,opacity:0,zIndex:3}).animate({left:0,opacity:1}, function(){
			targetLi.removeClass('active').css({opacity:0, display:'none',zIndex:2});
			carslock = false;
		}).addClass('active');
	}).on('click', 'li', function(){
		carsTimer.resume();
	});
	
	//凑热闹
	var funsLock = false, funsNum = 1,icfs_uls = $('#icfs_list').children(), icfs_count = icfs_uls.length;
	$('#icfs_pages').on('click', 'a', function(){
		if(funsLock){
			return;
		}
	　　var direction = this.id !== 'icfs_page_up', target = icfs_uls.filter('.firstone'), button =  $(this);
	　　if(direction){
			if(funsNum == icfs_count){
				return;
			}
			
			funsLock = true;
			funsNum++;
			
			if(funsNum == icfs_count){
				button.addClass('hover');
			}
			button.prev('.hover').removeClass('hover');
			
	　　	target.animate({marginLeft: -888}, function(){
				target.removeClass('firstone').css({marginLeft:0}).appendTo(target.parent());
				funsLock = false;
			}).next().addClass('firstone').show();
	　　}
	　　else{
			if(funsNum == 1){
				return;
			}
			
			funsLock = true;
			funsNum--;
			
			if(funsNum == 1){
				button.addClass('hover');
			}
			button.next('.hover').removeClass('hover');
			
			target.before(target.siblings().last().css({marginLeft:-888,display:'block'}).animate({marginLeft:0}, function(){
				target.removeClass('firstone');
				$(this).addClass('firstone');
				funsLock = false;
			}));
　　	}
	});

	//侧边栏导航
	var win = $(window), scrollLeft = win.scrollLeft(), sideNav = $('#index_side_nav'), winWidth = win.width(), smallWindow = (winWidth < 1240), ie6 = ($.browser.msie && $.browser.version < 7);
	win.resize(function(){
		winWidth = win.width();
		if(ie6){
			if(winWidth < 1064){
				scrollLeft = win.scrollLeft();
				left = winWidth - 62 + scrollLeft;
				if(winWidth < 1024){
					sideNav.css({left:left < 938 ? left : 938});
				}
				else{
					sideNav.css({left:left});
				}
			}
			else{
				sideNav.css({left:(winWidth - 1000) /2 + 998});
			}
		}
		else{
			if(winWidth < 1064){
				if(smallWindow){
					return;
				}
				smallWindow = true;
				sideNav.css({right: 0});
			}
			else{
				smallWindow = false;
				sideNav.css({right:(winWidth - 1000) /2 - 62});
			}


		}
	}).trigger('resize');
	sideNav.slideDown(400);

	if(ie6){
		win.on('scroll', function(){
			win.trigger('resize');
		});
	}
	$('#scroll_top').on('click', function(){
		$('html,body').animate({scrollTop:0}, 300);
	});
	var positions = ['index_content_joys', 'index_content_shoping','index_content_events', 'index_content_information', 'index_content_life', 'index_content_funs'];
	$('#index_side_nav').find('ul').on('click', 'a', function(){
		var destination = positions[$(this).parent().index()];
		if(destination){
			$('html,body').animate({scrollTop: ( $('#' + destination).offset().top - 41 ) }, 300);
		}
	});
　　　var eventsPositions = ['index_content_marriage', 'index_content_house','index_content_furnishing', 'index_content_bady', 'index_content_car'];
　　　$('#ice_banner').on('click', 'a', function(){
　　　var destination = eventsPositions[$(this).index()];
　　　if(destination){
        $('html,body').animate({scrollTop: ( $('#' + destination).offset().top - 41 ) }, 300);
　　　　}
　　});
})();
	
//精彩内容异步加载
function doCallback( JSON ){
	var container = document.getElementById('icf_activities_body'), html = '', itemsLen = JSON.items.length;
	//添加内容
	for( var i=0;i<itemsLen;i++){

		var item = JSON.items[i];

		var days = Math.ceil( ( item['expire'] - new Date()/1000 ) /3600/24 );
		html += '<li><img height="70px" width="70px" src="'+item['thumb']+'" /><h3><a href="'+item['quote']+'" target="_blank">'+item['name']+'</a></h3><p>截止还有'+days+'天</p><a href="'+item['quote']+'" class="flag c" target="_blank">我要参加</a></li>';
		
   }
   container.innerHTML = html;
}

//屏蔽showMenu造成的错误
function showMenu(){}

//discuz首页弹窗
function setcookie(cookieName, cookieValue, seconds, path, domain, secure) {
	var expires = new Date();
	var cookiedomain = cookiedomain === undefined ? '' : cookiedomain;
	var cookiepath = cookiepath === undefined ? '' : cookiepath;
	if(cookieValue == '' || seconds < 0) {
		cookieValue = '';
		seconds = -2592000;
	}
	expires.setTime(expires.getTime() + seconds * 1000);
	domain = !domain ? cookiedomain : domain;
	path = !path ? cookiepath : path;
	document.cookie = escape(cookiepre + cookieName) + '=' + escape(cookieValue)
		+ (expires ? '; expires=' + expires.toGMTString() : '')
		+ (path ? '; path=' + path : '/')
		+ (domain ? '; domain=' + domain : '')
		+ (secure ? '; secure' : '');
}

$('#sinaWeatherTool').attr({src:"http://weather.news.sina.com.cn/chajian/iframe/weatherStyle0.html?city=%E6%AD%A6%E6%B1%89"});