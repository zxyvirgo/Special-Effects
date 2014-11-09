/* http://plugins.jquery.com/validate */
(function(a,b,c,d){var e=['input:not([type]),input[type="color"],input[type="date"],input[type="datetime"],input[type="datetime-local"],input[type="email"],input[type="file"],input[type="hidden"],input[type="month"],input[type="number"],input[type="password"],input[type="range"],input[type="search"],input[type="tel"],input[type="text"],input[type="time"],input[type="url"],input[type="week"],textarea',"select",'input[type="checkbox"],input[type="radio"]'],f=e.join(","),g={},h=function(a,c){var f={pattern:!0,conditional:!0,required:!0},h=b(this),i=h.val()||"",j=h.data("validate"),k=j!==d?g[j]:{},l=h.data("prepare")||k.prepare,m=h.data("pattern")||("regexp"==b.type(k.pattern)?k.pattern:/(?:)/),n=h.attr("data-ignore-case")||h.data("ignoreCase")||k.ignoreCase,o=h.data("mask")||k.mask,p=h.data("conditional")||k.conditional,q=h.data("required"),r=h.data("describedby")||k.describedby,s=h.data("description")||k.description,t=h.data("trim"),u=/^(true|)$/i,v=/^false$/i,s=b.isPlainObject(s)?s:c.description[s]||{};if(q=""!=q?q||!!k.required:!0,t=""!=t?t||!!k.trim:!0,u.test(t)&&(i=b.trim(i)),b.isFunction(l)?i=l.call(h,i)+"":b.isFunction(c.prepare[l])&&(i=c.prepare[l].call(h,i)+""),"regexp"!=b.type(m)&&(n=!v.test(n),m=n?RegExp(m,"i"):RegExp(m)),p!=d)if(b.isFunction(p))f.conditional=!!p.call(h,i,c);else for(var x=p.split(/[\s\t]+/),y=0,z=x.length;z>y;y++)c.conditional.hasOwnProperty(x[y])&&!c.conditional[x[y]].call(h,i,c)&&(f.conditional=!1);if(q=u.test(q),q&&(h.is(e[0]+","+e[1])?!i.length>0&&(f.required=!1):h.is(e[2])&&(h.is("[name]")?0==b('[name="'+h.prop("name")+'"]:checked').length&&(f.required=!1):f.required=h.is(":checked"))),h.is(e[0]))if(m.test(i)){if("keyup"!=a.type&&o!==d){for(var A=i.match(m),B=0,z=A.length;z>B;B++)o=o.replace(RegExp("\\$\\{"+B+"(?::`([^`]*)`)?\\}","g"),A[B]!==d?A[B]:"$1");o=o.replace(/\$\{\d+(?::`([^`]*)`)?\}/g,"$1"),m.test(o)&&h.val(o)}}else q?f.pattern=!1:i.length>0&&(f.pattern=!1);var C=b('[id="'+r+'"]'),D=s.valid;return C.length>0&&"keyup"!=a.type&&(f.required?f.pattern?f.conditional||(D=s.conditional):D=s.pattern:D=s.required,C.html(D||"")),"function"==typeof k.each&&k.each.call(h,a,f,c),c.eachField.call(h,a,f,c),f.required&&f.pattern&&f.conditional?(c.waiAria&&h.prop("aria-invalid",!1),"function"==typeof k.valid&&k.valid.call(h,a,f,c),c.eachValidField.call(h,a,f,c)):(c.waiAria&&h.prop("aria-invalid",!0),"function"==typeof k.invalid&&k.invalid.call(h,a,f,c),c.eachInvalidField.call(h,a,f,c)),f};b.extend({validateExtend:function(a){return b.extend(g,a)},validateSetup:function(c){return b.extend(a,c)}}).fn.extend({validate:function(c){return c=b.extend({},a,c),b(this).validateDestroy().each(function(){var a=b(this);if(a.is("form")){a.data(name,{options:c});var d=a.find(f),g=c.namespace;a.is("[id]")&&(d=d.add('[form="'+a.prop("id")+'"]').filter(f)),d=d.filter(c.filter),c.onKeyup&&d.filter(e[0]).on("keyup."+g,function(a){h.call(this,a,c)}),c.onBlur&&d.on("blur."+g,function(a){h.call(this,a,c)}),c.onChange&&d.on("change."+g,function(a){h.call(this,a,c)}),c.onSubmit&&a.on("submit."+g,function(e){var f=!0;d.each(function(){var a=h.call(this,e,c);a.pattern&&a.conditional&&a.required||(f=!1)}),f?(c.sendForm||e.preventDefault(),b.isFunction(c.valid)&&c.valid.call(a,e,c)):(e.preventDefault(),b.isFunction(c.invalid)&&c.invalid.call(a,e,c))})}})},validateDestroy:function(){var a=b(this),c=a.data(name);if(a.is("form")&&b.isPlainObject(c)&&"string"==typeof c.options.nameSpace){var d=a.removeData(name).find(f).add(a);a.is("[id]")&&(d=d.add(b('[form="'+a.prop("id")+'"]').filter(f))),d.off("."+c.options.nameSpace)}return a}})})({sendForm:!0,waiAria:!0,onSubmit:!0,onKeyup:!1,onBlur:!1,onChange:!1,nameSpace:"validate",conditional:{},prepare:{},description:{},eachField:$.noop,eachInvalidField:$.noop,eachValidField:$.noop,invalid:$.noop,valid:$.noop,filter:"*"},jQuery,window);
(function($){
	var userAgent = navigator.userAgent.toLowerCase(); 
	$.browser = { 
		version: (userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1], 
		safari: /webkit/.test( userAgent ), 
		opera: /opera/.test( userAgent ), 
		msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ), 
		mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent ) 
	};
})(jQuery);
(function($){
	var placeholder = function(){
		var inputs = $(this).is("input[placeholder]")?$(this):$(this).find("input[placeholder]");
		if(inputs.length === 0){
			return this;
		}
		//解决placeholder兼容性问题
		var onFocus = function(){
			var target = $(this);
			if(target.data('placeholder') == "true"){
				target.prev().attr({id:target.attr('id')}).end().removeAttr('id');
				target.hide().prev().show();
				setTimeout(function(){target.prev().trigger('focus')},10);
			}
		};
	
		var onBlur = function(){
			var target = $(this);
			if( ( target.data('placeholder') == "" && this.value != "") || this.value == ""){
				
				if(target.next().data('replaceholder')){
					target.hide().next().show();
				}
				else{
					var style = this.outerHTML.match(/style=(\'|\")[^\1]*?\1/i)||'';
					style = style&&style[0];
					var newEle = $('<input ' + style + ' />');
					newEle[0].type = 'text';
					newEle[0].id = this.id;
					newEle[0].className = this.className
					newEle.prop({id:this.id}).data({inputType:'password'});
						
					//原来的元素删除id，把原id 属性加入data集合内
					target.removeAttr('id').hide();
					newEle.on('focus', onFocus).val($(this).attr('placeholder'));
					target.after(newEle);
				}
				target.next().data({placeholder:"true"});
			}
		};
		
		inputs.on('blur', onBlur).trigger('blur');
		
		return this;
	};
	
	if(! ('placeholder' in document.createElement('input') ) ){//元素不支持placeholder属性
		$.extend($.fn, {placeholderFix: placeholder});
	}
	else{
		$.extend($.fn, {placeholderFix: function(){return this;}});
	}
	
	//函数节流
	var throttle = function(fn, delay, mustRunDelay){
		return function(){
			var context = this, target = $(this), args = arguments, t_curr = +new Date();
			timer = target.data('timer');
			t_start = target.data('t_start');
			clearTimeout(timer);
			if(!t_start){
				target.data({t_start: t_curr});
			}
			if(t_curr - t_start >= mustRunDelay){
				fn.apply(context, args);
				target.data({t_start: t_curr});
			}
			else {
				target.data({
					timer: setTimeout(function(){
						fn.apply(context, args);
					}, delay)
				});
			}
		};
	};
	
	//顶部导航下拉列表
	
	$('#hcx_common_header').add('#hcx_forum_header').on('mouseenter', '.hcx_top_list', throttle(function(){
		//触发下拉
		var target = $(this),
			drop_down = target.find('.hcx_drop_down'),
			height = target.children('ul').children().length * 25 || 186;
			if( drop_down.data('inited') ) {
				//计算初始高度，实现匀速动画
				ddHeight = drop_down.height();
				var ddWidth = drop_down.width();
			}
			else{
				ddHeight = 0;
				var ddWidth = target.children('ul').width();
				drop_down.css({width:ddWidth});
				var tagWidth = target.width() + 8;
				if(tagWidth > ddWidth){
					target.children('ul').width(tagWidth);
				}
				drop_down.data({inited: true});
			}
		target.addClass('hover').find('.arrow').addClass('arrow_down').removeClass('arrow_right').end().find('.hcx_drop_down').stop().css({display: 'block', height: ddHeight, overflow: 'hidden'}).animate({height: height}, (height - ddHeight)/height*300, 'linear');
		
	}, 220)).on('mouseleave', '.hcx_top_list', throttle(function(){
		
		//下拉收回
		var target = $(this),
			ddHeight = target.find('.hcx_drop_down').height(),
			height = target.children('ul').children().length * 25 || 186;

		$(this).removeClass('hover').find('.arrow').addClass('arrow_right').removeClass('arrow_down').end().find('.hcx_drop_down').stop().slideUp((ddHeight/height)*300, 'linear', function(){
			this.style.height = 0;
		});
		
	}, 220)).on('mouseenter', '.hfh_tab:not(.hcx_top_list)', throttle(function(){
		
		var target = $(this),
			drop_down = target.find('.hcx_drop_down'),
			
			//计算初始高度，实现匀速动画
			ddHeight = drop_down.data('inited')?drop_down.height(): (function(){
				drop_down.data({inited: true});
				return 0;
			})(),
			height = drop_down.is('.channel') ? 35 : 85;
		target.addClass('hover').find('.arrow').addClass('arrow_down').removeClass('arrow_right').end().find('.hcx_drop_down').stop().css({display: 'block', height: ddHeight, overflow: 'hidden'}).animate({height: height}, (height - ddHeight)/height*300, 'linear');
		
	}, 220)).on('mouseleave', '.hfh_tab:not(.hcx_top_list)', throttle(function(){
		
		var target = $(this),
			drop_down = target.find('.hcx_drop_down'),
			ddHeight = target.find('.hcx_drop_down').height(),
			height = drop_down.is('.channel') ? 35 : 85;
		$(this).removeClass('hover').find('.arrow').addClass('arrow_right').removeClass('arrow_down').end().find('.hcx_drop_down').stop().slideUp((ddHeight/height)*300, 'linear', function(){
			this.style.height = 0;
		});
	}, 220));
	
	//顶部导航固定页头
	var topNav = $('#hcx_common_header'),scrollTop, win = $(window);
	win.on('scroll', function(e){
		var currentScrollTop = win.scrollTop();
		if(currentScrollTop == scrollTop || scrollTop == undefined){
			topNav.css('left',-$(e.target).scrollLeft());
		}
		else{
			scrollTop = currentScrollTop;
		}
	}).trigger('scroll');

	
	//顶部搜索js
	var chs_input = $('#chs_input');
	chs_input.placeholderFix().on('keydown', function(e){
		if( e.which === 13 ){
			$('#chs_button').trigger('click');
		}
	});
	$('#chs_button').click(function(){
		var searchText = chs_input.val();
		if(searchText != ''){
			window.open ("search/?q=" + searchText);
		}
	});
	
	//ui组件js
	var hcx_ui = function(){
		var target = $(this);
		this.on('click', '.hus_title', function(e){
			var title = $(this), select = title.parent();
			if(select.is('.hover')){
				return;
			}
			e.stopPropagation();
			var list = title.addClass('hover').next();
			select.addClass('hover');
			var callback = function(){
				select.trigger('cancel');
				$(this).off('click', callback);
			};
			$('body').on('click', callback);
			list.show();
		}).on('mouseenter', '.hus_options li', function(){
			$(this).addClass('hover');
		}).on('mouseleave', '.hus_options li', function(){
			$(this).removeClass('hover');
		}).on('click', '.hus_options li', function(){
			target.data({value: $(this).data('value')}).find('.hus_title_text').html($(this).text());
			$(this).parent().prev().prev().val($(this).data('value')).parent().trigger('change');
		}).on('cancel', function(){
			$(this).removeClass('hover').find('.hover').removeClass('hover').end().find('ul').hide();
		}).on('click', function(){
			if( $(this).is('.hover') ){
				$(this).trigger('cancel');
			}
			
		});
	};
	$.extend($.fn, {hcx_ui: hcx_ui});
	
	
})(jQuery);

//统计代码
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-3823552-1']);
_gaq.push(['_trackPageview']);
(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?b051b14789f4b43a39316713ae0ac54a";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();