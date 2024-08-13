// JavaScript Document
var Hits = {
	autorun : true,
	
	ajaxUrl : '/ajax/hits.php',
	
	infoHitsId : 'infoHits',
	
	types : {
		'goods' : true, 
		'subnews' : true ,
		'news' : true ,
		'agent' : true,
		'exhibit' : true,
		'job' : true,
		'supply' : true,
		'goodsNew' :true,
		'tu' :true,
		'zt' :true,
		'shop' : true,
        'photo' : true,
        'knowledge' : true,
        'jbrand' : true
	},
	
	shops : {
		'goods' : true,
		'agent' : true,
		'supply' : true
	},
	
	run : function(){
		var type, id, url, r, flag, shopid = 0;
		url = document.location.host + document.location.pathname;
		//url = 'news.jc001.cn/detail/123.html';
		//url = 'shop.jc001.cn/6388/goods/9115.html';
		r = url.match(/^(\w+)[^\/]+?\/detail\/(\d+)(_\d)?\.html$/i);
		if(!r){
			if(r = url.match(/^shop.+?\/(\d+)\/(\w+)\/(\d+)\.html$/i)){
				if(!Hits.shops[r[2]]){
					id = r[1];
					type = 'shop';
				}else{
					shopid = r[1];
				}
			} else if(r = url.match(/^shop.+?\/(\d+)\/?/i)) {
				type = 'shop';
				id =  r[1];
			} else {
				return;	
			}
		}else if(r[3]){
			return;	
		}else{
			type = r[1];
			id = r[2];
		}
		
		this.submit(type, id, shopid); // r[1] -- type, r[2] -- id
	},
	
	validate: function(type){
		if(this.types[type]){
			return true;
		}else{
			return false;
		}
	},
	
	submit : function(type, id, shopid){
		if(!this.validate(type)){
			return false;
		}
        
		var pars = '?type=' + type + '&id=' + id + '&shopid=' + shopid + '&r=' + Math.random();
		var xmlHttpReq = this.getXmlHttpReq();
        
		//window.status = this.ajaxUrl + pars;
		xmlHttpReq.open("GET", this.ajaxUrl + pars, true);
		xmlHttpReq.send(null);
		
		var infoHitsId = this.infoHitsId;
		xmlHttpReq.onreadystatechange = function(){
			if(xmlHttpReq.readyState == 4){
				if(xmlHttpReq.status == 200){
					var infoHits = document.getElementById(infoHitsId);
					if(infoHits){
						infoHits.innerHTML = xmlHttpReq.responseText;
					}
				}
			}
		}
	},
	
	getXmlHttpReq : function(){
		if (window.XMLHttpRequest) {
			return new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
}
