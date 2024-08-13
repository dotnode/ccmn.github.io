var _JCCounter = {
params : {},
	 domain : '.jc001.cn',
	 appurl : 'http://stat.jc001.cn/w.1.0.php',
	 cookieVt : '__JCCT_times',
	 cookieVp : '__JCCT_pages',
	 cookieVid : '__JCCT_uid',

	 set : function(k, v){
		 this.params[k] = v;
	 },

getUrl : function(){
	 var pt;
	 var url = this.appurl + '?';
	 for(var k in this.params){
		 pt = typeof(this.params[k]);
		 if(pt == 'object' || pt == 'function'){
			 continue;
		 }
		 url += k + '=' + this.params[k] + '&';
	 }
	 return url.substr(0, url.length - 1);
 },

getVpages : function(){
    var vpages = this.cookieRead(this.cookieVp);
    vpages = parseInt(unescape(vpages));
    if(vpages){
	    vpages = 1 + vpages;
    }else{
	    vpages = 1;
    }
    return vpages;
},

getVtimes : function(vpages){
    var vtimes = this.cookieRead(this.cookieVt);
    vtimes = parseInt(unescape(vtimes));
    if(vtimes > 0){
        if(vpages == 1){
	        vtimes = 1 + vtimes ;
        }
    }else{
        vtimes = 1;
    }
    return vtimes;
},

pre : function(){},

parseUrl : function(){
    var m;
    var re = new RegExp('^http://www' + this.domain + '/(\\w+)/?$', 'i');
    if(m = window.location.href.match(re)){
        this.set('_jcc_diyid', '51');
        this.set('url', 'http://www' + this.domain + '/' + m[1]);
    }
},

setUrl : function(){
	 this.pre();
	 this.set('url', escape(window.location.href));
	 this.set('ref', escape(document.referrer));
	 this.set('ssize', screen.width + ',' + screen.height);

	 // visited pages
	 var vpages = this.getVpages();
	 this.cookieWrite(this.cookieVp, vpages, 24 * 2);
	 this.set('vpages', vpages);

	 // visited times
	 var vtimes = this.getVtimes(vpages);
	 this.cookieWrite(this.cookieVt, vtimes, 365 * 24 * 100);
	 this.set('vtimes', vtimes);

	 // uid
	 var uid = this.cookieRead(this.cookieVid);
	 if(uid.length == 0){
		 uid = this.mkuid();
	 }
	 this.cookieWrite(this.cookieVid, uid, 365 *  24 * 100);
	 this.set('uid', uid);

	 // diy id
	 this.parseUrl();
 },

mkuid : function(){
	var d = new Date();
	return '' 
		+ d.getYear() 
		+ d.getMonth() 
		+ d.getDate() 
		+ d.getHours() 
		+ d.getMinutes()
		+ d.getSeconds() 
		+ parseInt(Math.random() * 1000);
},

post : function(){
    this.setUrl();
    var _sw = new Image(1,1);
    _sw.src = this.getUrl();
    _sw.onload = function(){};
},

cookieRead : function(name){
	 var cookieValue = "";
	 var search = name + "=";
	 if(document.cookie.length > 0){ 
		 offset = document.cookie.indexOf(search);
		 if (offset != -1){ 
			 offset += search.length;
			 end = document.cookie.indexOf(";", offset);
			 if (end == -1) end = document.cookie.length;
			 cookieValue = unescape(document.cookie.substring(offset, end));
		 }
	 }
	 return cookieValue;
 },

cookieWrite : function(name, value, hours){
    var expire = "";
    if(hours != null){
        expire = new Date((new Date()).getTime() + hours * 3600);
        expire = "; expires=" + expire.toGMTString();
    }
    path = "; domain=" + this.domain + "; path=/;";
    document.cookie = name + "=" + escape(value) + expire + path;
}
}
