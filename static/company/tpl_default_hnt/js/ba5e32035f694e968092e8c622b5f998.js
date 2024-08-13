/*
 * Copyright (c) 2010, www.jc001.cn! All rights reserved.
 *
 * web         : http://www.jc001.cn
 * author      : stcer (ab12cxyh@163.com)
 * version     : 0.1.0 (2010.8.12)
 */
Object.jextend = Object.jextend || function(A, $) {
    for (var _ in $) A[_] = $[_];
    return A
};

Function.prototype.jbind = Function.prototype.jbind || function() {
	var $ = this, A = new Array();
	for(var C = 0; C < arguments.length; C++){
		A .push(arguments[C]);
	}
	var B = A .shift();
	return function() {
		return $.apply(B, A);
	}
};

Function.prototype.jbAEListener = Function.prototype.jbAEListener || function(B) {
    var A = this;
    return function(C) {
        A.call(B, C || window.event)
    }
};

var $J = $J || function $J() {
    var _ = [], $;
    for (var A = 0; A < arguments.length; A++) {
        $ = arguments[A];
        if (typeof $ == "string") $ = document.getElementById($);
        _.push($)
    }
    return _.length < 2 ? _[0] : _
};

var JC = JC || {
    create: function() {
        return function() {
            this.initialize.apply(this, arguments)
        }
    }
};

var JE = JE || {
    visible: function($) {
        return $J($).style.display != "none"
    },
    hide: function() {
        for (var _ = 0; _ < arguments.length; _++) {
            var $ = $J(arguments[_]);
            $.style.display = "none"
        }
    },
    show: function() {
        for (var _ = 0; _ < arguments.length; _++) {
            var $ = $J(arguments[_]);
            $.style.display = ""
        }
    },
    getH: function($) {
        $ = $J($);
        return $.offsetHeight
    },
    addClass: function($, _) {
        if (! ($ = $J($))) return;
        $.className = ("" == $.className) ? _: ($.className + " " + _)
    },
    removeClass: function($, _) {
        if (! ($ = $J($))) return;
        var A = new RegExp("(^| )" + _ + "( |$)");
        $.className = $.className.replace(A, "$1").replace(/ $/, "")
    }
};

var JD = JD || {
     getCookie: function(s) {
            var r = document.cookie.match("(?:^|;)\\s*" + s + "=([^;]*)");
            return (r && r[1]) ? decodeURIComponent(r[1]) : ""
    },
    setCookie: function(t, w, r, u) {
        var v = encodeURIComponent(w),
        s = r;
        if (typeof s === "number") {
            s = new Date();
            s.setTime(s.getTime() + r * 86400000)
        }
        if (s instanceof Date) {
            v += "; expires=" + s.toUTCString()
        }
        if (typeof u === "string" && u !== "") {
            v += "; domain=" + u
        }
        document.cookie = t + "=" + v + '; path=/';
    },
    pickDomain: function(t, u) {
        u = u || location.hostname;
        var v = ".",
        s = u.split(v),
        r = s.length;
        if (r <= 2) {
            return u
        }
        t = t || 1;
        if (t > r - 2) {
            t = r - 2
        }
        return s.slice(t).join(v)
    },
    escapeHTML: function(s) {
        var t = document.createElement("div"),
        r = document.createTextNode(s);
        t.appendChild(r);
        return t.innerHTML
    }
}

var JEVT = JEVT || {
	observers: false,
	
	element: function($) {
        return $.target || $.srcElement
    },
	
	pX: function(A) {
        return A.pageX || (A.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft))
    },
	
    pY: function(A) {
        return A.pageY || (A.clientY + (document.documentElement.scrollTop || document.body.scrollTop))
    },
	
	observe: function(_, A, B, $) {
        var _ = $J(_);
        $ = $ || false;
        if (A == "keypress" && (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || _.attachEvent)) A = "keydown";
        this._observeAndCache(_, A, B, $)
    },
	
	 _observeAndCache: function(_, A, B, $) {
        if (!this.observers) this.observers = [];
        if (_.addEventListener) {
            this.observers.push([_, A, B, $]);
            _.addEventListener(A, B, $)
        } else if (_.attachEvent) {
            this.observers.push([_, A, B, $]);
            _.attachEvent("on" + A, B)
        }
    },
	
    unloadCache: function() {
        if (!this.observers) return;
        for (var $ = 0; $ < this.observers.length; $++) {
            this.stopObserving.apply(this, this.observers[$]);
            this.observers[$][0] = null
        }
        this.observers = false
    },
	
    stopObserving: function(_, A, B, $) {
        var _ = $J(_);
        $ = $ || false;
        if (A == "keypress" && (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || _.detachEvent)) A = "keydown";
        if (_.removeEventListener) _.removeEventListener(A, B, $);
        else if (_.detachEvent) _.detachEvent("on" + A, B)
    },
    
    getEvent : function(){
        if(document.all){
            return window.event;
        }
    
        func = JEVT.getEvent.caller;
        while(func!=null){
            var arg0 = func.arguments[0];
            if(arg0){
                if((arg0.constructor == Event || arg0.constructor == MouseEvent) 
                        || (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)
                    ){
                    return arg0;
                }
            }
            func = func.caller;
        }
        return null;
    }
}

var jc001 = jc001 || {
    domain : '.jc001.cn',
    domain_pub : '.jc001.cn',
    host : 'http://www.jc001.cn'
//    domain : '.jc001.cn',
//    domain_pub : '.jc001.cn',
//    host : 'http://www.jc001.cn'  
};

jc001.ui = jc001.ui || {
    path : 'http://ui' + jc001.domain_pub
};

jc001.load = jc001.load || (function(){
	var loaded = {};
    var tohead = false;
	
	var loadJsFile = function(file, notui){
		if(loaded[file]){
			return;	
		}
		loaded[file] = true;
		if(file){
			file = (notui ? '' : jc001.ui.path) + file;
            if(tohead){
                var head = ghead();
                var e = document.createElement("script");
                e.type="text/javascript";
                e.src=file;
                head.appendChild(e);
            }else{
			    document.write(unescape("%3Cscript src='" + file + "' type='text/javascript'%3E%3C/script%3E"));
            }
		}
	};
    
    var ghead = function(){
        var head, o = document;
        ((head = o.getElementsByTagName('head')[0]) || (head = o.body.parentNode.appendChild(o.createElement("head"))));
        return head;
    }
	
	var loadCssFile = function(file, callback){
		if(loaded[file]){
			return;	
		}
		
		loaded[file] = true;
		var head = ghead();
		css = document.createElement('link');
		css.setAttribute('rel', 'stylesheet');
		css.setAttribute('type', 'text/css');
		css.setAttribute('href', jc001.ui.path + file);
		head.appendChild(css);
	};
	
	var f = function(apiname, opts){
		opts = opts || {};
        tohead = opts.head;
        
		if(apiname == 'jselect' || apiname == 'jlistmore'){
			loadJsFile('/js/list.js');
        }else if(apiname == 'img-lazy'){
            jc001.load('jquery');
            loadJsFile('/js/jquery/jquery.lazyload.min.js');
        }else if(apiname == 'jc001.papi'){
            jc001.load('jquery');
            loadJsFile('/js/papi.js');
		}else if(apiname == 'jquery'){
            //loadJsFile('/js/jquery/jquery-1.4.2.min.js');
			//loadJsFile('/js/jquery/jquery-1.7.1.min.js');
            loadJsFile('/js/jquery/jquery-1.11.1.min.js');
            loadJsFile('/js/jquery/jquery-migrate-1.2.1.min.js');
		}else if(apiname == 'guestbook'){
			loadJsFile('/js/pop.js');
			loadJsFile('/js/guestbook.js');
        }else if(apiname == 'shopguest'){
            loadJsFile('/js/shopguest.js');
        }else if(apiname == 'comment'){
            loadJsFile('/js/comment.js?v3');
		}else if(apiname == 'dateInput'){
			loadJsFile('/js/calendar/dateInput/dateInput.js?v=3');
			loadCssFile('/js/calendar/dateInput/css.css');
		}else if(apiname == 'majax' || apiname == 'tableEditor'){
            loadJsFile('/js/tableEditor.js');
        }else if(apiname == 'tipbox'){
            loadJsFile('/js/tipbox/tipbox.js');
            loadCssFile('/js/tipbox/tipbox.css');
        }else if(apiname == 'photo'){
            loadJsFile('/js/photo/photo0906.js');
        }else if(apiname == 'mselect'){
            loadJsFile('/js/mselect.js');
        }else if(apiname == 'mselect.mul'){
            loadCssFile('/js/mselect.mul.css');
            loadJsFile('/js/mselect.mul.js');
        }else if(apiname == 'jqModal'){
            loadJsFile('/js/jquery/jqmodal/jqModal.js');
            loadCssFile('/js/jquery/jqmodal/jqModal.css');
        }else if(apiname == 'thickbox'){
            loadJsFile('/js/jquery/plugins/thickbox.js');
            loadCssFile('/js/jquery/plugins/thickbox.css');
        }else if(apiname == 'autocomplete'){
			jc001.load('jquery');
            loadJsFile('/js/jquery/jquery.autocomplete.js');
            loadCssFile('/js/jquery/jquery.autocomplete.css');
        }else if(apiname == 'jcookie'){
            loadJsFile('/js/jquery/jquery.cookie.js');
        }else if(apiname == 'tablesorter'){
            loadJsFile('/js/jquery/jquery.tablesorter.min.js');
            loadCssFile('/js/jquery/tablesorter/blue/style.css');
        }else if(apiname == 'multiselects'){
            loadJsFile('/js/jquery/jquery.multiselects.js');
        }else if(apiname == 'ajaxinit'){
            loadJsFile('/js/ajaxinit.js');
        }else if(apiname == 'jquery.form'){
			jc001.load('jquery');
            loadJsFile('/js/jquery/plugins/jquery.form.js');
        }else if(apiname == 'jqueryUI'){
			jc001.load('jquery');
            loadJsFile('/js/jquery/ui/jquery-ui-1.8.2.custom.min.js');
            loadCssFile('/js/jquery/ui/css/jquery-ui-1.8.2.custom.css');
            loadCssFile("/js/jquery/ui/ui-lightness/jquery-ui-1.8.2.custom.css");
        }else if(apiname == 'marquee'){
            loadJsFile('/js/marquee.js');
        }else if(apiname == 'colorbox'){
            jc001.load('jquery');
			//loadJsFile('/file_manger/js/colorbox/jquery.colorbox-min.js');
            //loadCssFile('/js/jquery/colorbox/css/colorbox.css');
            //loadJsFile('/js/jquery/colorbox/jquery.colorbox.js');
            loadCssFile('/js/jquery/colorbox1.32/style1/colorbox.css');
			loadJsFile('/js/jquery/colorbox1.32/jquery.colorbox.js');
        }else if(apiname == 'storage'){
			jc001.load('json');
			loadJsFile('/js/storage.js');
        }else if(apiname == 'vh'){
            jc001.load('jquery');
            loadCssFile('/js/vh/vh.css');
            loadJsFile('/js/vh/vh.js');
		}else if(apiname == 'json'){
			loadJsFile('/js/json2.js');
		}else if(apiname == 'album' || apiname == "fm"){
			jc001.load('colorbox');
			loadJsFile("/js/fm/fm.js?v=1.1");
			loadCssFile('/js/fm/css.css');
		}else if(apiname == 'jqinclude'){
			jc001.load('jquery');
			loadJsFile("/js/jquery/jquery.include.js");
        }else if(apiname == 'select'){
            jc001.load('jquery');
            loadCssFile("/js/jselect/css.css");
            loadJsFile("/js/jselect/jselect.js");
		}else if(apiname == 'message'){
            jc001.load('jquery');
            loadCssFile("/js/message/msg.css?v=2.1");
            loadJsFile("/js/message/message.js?v=2.2");
        }else if(apiname == 'editor') {
            loadJsFile("/editor/tinymce/tiny_mce.js", true);
        }else if(apiname == 'fmv') {
			jc001.load('jquery');
			loadCssFile("/js/jquery/fmv/tipBoxStyle.css");
            loadJsFile("/js/jquery/fmv/jquery.inputTip.js");
		}else if(apiname == 'jquery.validate') {
			jc001.load('jquery.form');
			loadJsFile("/js/jquery/plugins/jquery.validate.js");
			loadJsFile("/js/jquery/plugins/jquery.validate.zh.js");
		}else if(apiname == 'tooltip') {
			jc001.load('jquery');
			loadCssFile("/js/jquery/plugins/jquery.tooltip.css");
            loadJsFile("/js/jquery/plugins/jquery.tooltip.min.js");
        }else if(apiname == 'jquery.tools') {
            jc001.load('jquery');
            loadJsFile("/js/jquery/jquery.tools.min.js");
		}else if(apiname == 'jquery.pngfix') {
			jc001.load('jquery');
			loadCssFile("/js/jquery/jquery.pngfix.pack.js");
		}else if(apiname == 'uploadfy'){
			jc001.load('jqueryUI');
			loadCssFile("/js/jquery/uploadify/css/default.css?v=1");
			loadCssFile("/js/jquery/uploadify/css/uploadify.css?v=1");
			loadJsFile("/js/jquery/uploadify/scripts/swfobject.js");
			loadJsFile("/js/jquery/uploadify/scripts/jquery.uploadify.v2.1.3.js");
			loadJsFile("/js/fm/uploadify.js?v=2");
		}else if(apiname == 'bbs'){
			loadJsFile("/js/ajax/bbs.js");
		}else if(apiname == 'ui'){
			loadJsFile("/js/ui.js");
        } else if(apiname == 'member'){
            loadJsFile("/js/member.js");
		} else if(apiname == 'news'){
			jc001.load('jquery');
			loadJsFile("/js/news.js");
			loadCssFile('/ui/news/css/photo.css');
		} else if(apiname == 'gallery'){
			jc001.load('jquery');
			loadJsFile("/js/jquery/gallery/jquery.ad-gallery.js");
			//loadJsFile("/js/jquery/gallery/jquery.ad-gallery.pack.js", true);
			loadCssFile('/ui/photo/css/photo_detail_show.css');
        } else if(apiname == 'gallery-v'){
            jc001.load('jquery');
            loadJsFile("/js/jquery/gallery-v/jquery.ad-gallery.js");
            loadCssFile("/js/jquery/gallery-v/jquery.ad-gallery.css");
        } else if(apiname == 'jswf'){
            loadJsFile("/js/flash.js");
        } else if(apiname == 'prompt'){
            loadCssFile('/js/prompt/skin/qq/ymPrompt.css');
            loadJsFile("/js/prompt/ymPrompt.js");
		} else if(apiname == 'jscroll'){
            jc001.load('jquery');
            loadJsFile("/js/jscroll.js");
        } else if(apiname == 'iframe'){
            loadJsFile("/js/iframe.js");
        } else if(apiname == 'jquery.upload'){
            jc001.load('jquery');
            loadJsFile("/js/jquery/ajaxfileupload.js");
        } else if(apiname == 'jquery.imagePreview'){
            jc001.load('jquery');
            loadJsFile("/js/jquery/jquery.imagePreview.1.0.js");
        } else if(apiname == 'cats'){
            jc001.load('json');
            loadJsFile("/js/cart.js");
        } else if(apiname == 'ads.topc'){
            loadJsFile("/js/ads_topc.js?v=1");
        } else if(apiname == 'ads.fullscreen'){
            jc001.load('jquery');
            loadJsFile("/js/ads_full.js");
        } else if(apiname == 'ads.rich'){
            jc001.load('jquery');
            loadJsFile("/js/ads/rich.js");
        } else if(apiname == 'lightbox'){
            loadCssFile('/js/jquery/lightbox/css/jquery.lightbox-0.5.css');
            loadJsFile("/js/jquery/lightbox/jquery.lightbox-0.5.min.js");
        }else if(apiname == 'lightbox2'){
            loadCssFile('/js/jquery/lightbox2/css/lightbox.css');
            loadJsFile("/js/jquery/lightbox2/js/lightbox.min.js");
        } else if(apiname == 'func.tools'){
            loadJsFile("/js/tools.js?v=1");
        }else if(apiname == 'img.turn'){
            loadJsFile("/js/imgswitch.js?v=1");
        }else if(apiname == 'img.turn2'){
            jc001.load('jquery');
            loadJsFile("/js/imgswitch2.js?v=1");
        } else if(apiname == 'ads.push'){
            loadJsFile("/js/ads/ads.push.js?v=1");
        } else if(apiname == 'goods.accessd'){
            loadJsFile("/js/goodsaccessed.js");
        }else if(apiname == 'shop.index'){
            loadJsFile("/js/shop_index.js");
        }else if(apiname == 'shopcard'){
            loadJsFile("/js/shop/shopcard.js");
            loadCssFile('/card/css.css');
        }else if(apiname == 'poll'){
            loadJsFile("/js/poll.js");
        }else if(apiname == 'keywords'){
            loadJsFile("/js/keywords.js");
        }else if(apiname == 'qtip'){
            jc001.load('jquery');
            loadCssFile('/js/qtip/jquery.qtip.min.css');
            loadJsFile("/js/qtip/jquery.qtip.min.js");
        }else if(apiname == 'adTrans'){
            loadCssFile('/js/ads/adTrans.js');
        }else if(apiname == 'copyright'){
            loadJsFile('/js/copyright.js?v=1');
        }else if(apiname == 'brand_bbs'){
            loadJsFile('/js/brand_bbs.js');
        }else if(apiname == 'raty'){
            jc001.load('jquery');
            loadJsFile('/js/jquery/raty/jquery.raty.js');
            loadCssFile('/js/jquery/raty/raty.css');
        }else if(apiname == 'contrast'){
            jc001.load('jquery');
            loadCssFile('/js/contrast/contrast.css');
            loadJsFile('/js/contrast/contrast.js');
        }else if(apiname == 'tencent_service'){
            loadJsFile('/js/tencent_service.js');
        }else if(apiname == 'tencent_service2'){
            loadJsFile('/js/tencent_service2.js');
        }else if(apiname == 'jc001.shopcounter'){
            jc001.load('jc001.papi');
            loadJsFile('/js/papi/counter.js');
        }else if(apiname == 'phprpc'){
            loadJsFile('/js/phprpc/compressed/phprpc_client.js');
        }else if(apiname == 'jc001.adv'){
            jc001.load('jc001.papi');
            jc001.load('jswf');
            loadJsFile('/js/papi/jc001adv.js');
        }else if(apiname == 'jc001.vote'){
            loadJsFile('/js/vote.js');
        }else if(apiname == 'digg'){
            loadJsFile('/js/digg.js');
        }else if(apiname == 'kflash'){
            loadJsFile('/js/kflash.js');
        }else if(apiname == 'adstop'){
            loadJsFile('/js/adstop.js');
        }else if(apiname == 'slide'){
            jc001.load('jquery');
            loadJsFile('/js/jquery/jquery.KinSlideshow-1.2.1.min.js');
        }else if(apiname == 'proxy'){
            loadJsFile('/js/proxy.js');
        }else if(apiname == 'encrypt'){
            loadJsFile('/js/encrypt.js');
        }else if(apiname == 'ask.add'){
            loadJsFile('/js/ask_add.js');
        }else if(apiname == 'isotope'){
            jc001.load('jquery');
            loadJsFile('/js/jquery/jquery.isotope.min.js');
        }else if(apiname == 'sr.add'){
            loadJsFile('/js/sr_add.js');
        }else if(apiname == 'weekly'){
            loadJsFile("/js/weekly.js");
        }else if(apiname == 'morris'){
            jc001.load('jquery');
            loadJsFile("/js/jquery/morris/morris.min.js");
            loadJsFile("/js/jquery/morris/raphael-min.js");
            loadCssFile('/js/jquery/morris/morris.css');
        }else if(apiname == 'scrollto'){
            jc001.load('jquery');
            loadJsFile("/js/scrollto.js");
        }else if(apiname == 'dealer'){
            loadJsFile("/js/dealer.js");
        }else if(apiname == 'map'){
            loadJsFile("/js/map.js");
        }else if(apiname == 'gcat'){
            jc001.load('jquery');
            jc001.load('jc001.papi');
            loadCssFile('/js/cat/gcat.css');
            loadJsFile("/js/cat/gcat.js?v=1");
        }else if(apiname == 'gcatm'){
            loadJsFile('/js/papi.js');
            loadCssFile('/js/cat/gcatm.css');
            loadJsFile("/js/cat/gcat.js");
        }else if(apiname == 'region'){
            jc001.load('gcat');
            loadJsFile("/js/cat/region.js");
        }else if(apiname == 'regionm'){
            jc001.load('gcatm');
            loadJsFile("/js/cat/region.js");
        }else if(apiname == 'form.wizard'){
            jc001.load('jquery');
            loadCssFile('/js/uc/form.wizard.css');
            loadJsFile("/js/uc/form.wizard.js");
        }else if(apiname == 'mupload'){
            loadJsFile("/js/fm/mupload.js");
        }else if(apiname == 'uploadh5'){
            loadCssFile("/js/fm/uploadh5.css");
            loadJsFile("/js/fm/uploadh5.js?v=7");
        }else if(apiname == 'bootstrap-datetimepicker'){
            loadCssFile('/js/bootstrap/bootstrap-datetimepicker.min.css');
            loadJsFile("/js/bootstrap/bootstrap-datetimepicker.min.js");
            loadJsFile("/js/bootstrap/locales/bootstrap-datetimepicker.zh-CN.js");
        }else if(apiname == 'slide2'){
            loadCssFile("/js/slide2/slide2.css");
            loadJsFile("/js/slide2/slide2.js?v=1");
        }else if(apiname == 'intro'){
        // 引导UI
            loadCssFile('/js/intro/introjs.css');
            loadJsFile('/js/intro/intro.js');
        }else if(apiname == 'PhoneCode'){
            jc001.load('jquery');
            loadJsFile("/js/phonecode.js?v=1.3");
        }else if(apiname == 'jcchart'){
            jc001.load('jquery');
            loadJsFile('/js/echarts/jcchart.js');
            loadJsFile('/js/echarts/echarts-all.js');
        }else if(apiname == 'popover'){
            jc001.load('jquery');
            loadCssFile('/js/jquery/popover/jquery.webui-popover.min.css');
            loadJsFile('/js/jquery/popover/jquery.webui-popover.min.js');
        }else if(apiname == 'datetime'){
            jc001.load('jquery');
            loadCssFile('/js/jquery/datetimepicker/jquery.datetimepicker.css');
            loadJsFile('/js/jquery/datetimepicker/jquery.datetimepicker.js');
        }else if(apiname == 'bootstrap'){
            loadJsFile("/bootstrap/js/bootstrap.min.js");
        }else if(apiname == 'layer'){
            jc001.load('jquery');
            loadCssFile('/js/layer-v2.0/layer/skin/layer.css');
            loadJsFile('/js/layer-v2.0/layer/layer.js');
            loadJsFile('/js/layer-v2.0/layer/extend/layer.ext.js');
        }else if(apiname == 'phonehide'){
            jc001.load('layer');
            loadJsFile('/js/phonehide.js');
        }else if(apiname == 'unslider'){
            jc001.load('jquery');
            loadJsFile('/js/jquery/unslider.min.js');
        }else if(apiname == 'qj_soll'){
            jc001.load('jquery');
            loadJsFile('/js/jquery/qj.roll.js');
        }else if(apiname == 'bootstrap2'){
            loadCssFile("/bootstrap/css/bootstrap.min.css");
            loadJsFile("/bootstrap/js/bootstrap.min.js");
        }else if(apiname == 'bootstrapvalidator'){
            jc001.load('bootstrap2');
            loadCssFile("/bootstrap/bootstrapvalidator/dist/css/bootstrapValidator.min.css");
            loadJsFile("/bootstrap/bootstrapvalidator/dist/js/bootstrapValidator.min.js");
        }else if(apiname == 'wx.share'){
            jc001.load('jquery');
            loadJsFile("http://res.wx.qq.com/open/js/jweixin-1.0.0.js", true);
            loadJsFile("/js/weixin/share.js?v=1.21");
        }else if(apiname == 'layui'){
            loadCssFile("/js/layui/build/css/layui.css");
            loadCssFile("/js/layui/build/css/fix.css");
            loadJsFile("/js/layui/build/layui.js?v=1.1");
            layui.config({
                base: '/js/layui/build/lay/modules/' //你的模块目录
            });
        } else if(apiname == 'news_ads'){
            loadJsFile("/js/news_ads.js?v=1.1");
        } else if(apiname == 'new_kefu'){
            loadJsFile("/js/new_kefu.js?v=1.1");
        }
	}

	return f;
})();

var loadErrimg = loadErrimg || function(src){
	var defimg = '/images/nopic.gif';
    var defimg;
	if(src.match(/_s\.{3.4}$/)){
		var bigimg = src.replace(/_s(\.{3.4}$)/, '$1');
		if(bigimg != src){
			defimg = bigimg;
		}
	}
    if(defimg){
	    event.srcElement.src = defimg;
    }
}

var mii = mii || function(e){
    var defimg = 'http://ui.jc001.cn/images/nopic.gif';
    var srcElement = JEVT.element(JEVT.getEvent()); 
    var src = srcElement.src;
    if(defimg == src){
        srcElement.onerror = null;
        return;
    }
    
    if(src.match(/_s\./)){
        var bigimg = src.replace(/_s/, '');
        if(bigimg != src){
            defimg = bigimg;
        }
    }
    srcElement.src = defimg;
}

var imgz = imgz || function imgz(e){
    var img = JEVT.element(JEVT.getEvent()); 
    var iwidth = img.width, iheight = img.height;
    var image = new Image();
    image.src = img.src;
    if(image.width < iwidth && image.height < iheight){
        img.width = image.width;
        img.height = image.height;
    }else if(image.width > 0 && image.height > 0){
        if(image.width / image.height >= iwidth / iheight){
            img.width = iwidth;
            img.height = (image.height * iwidth) / image.width;
        } else {
            img.height = iheight;
            img.width = (image.width * iheight) / image.height;
        }
    }
}
