var MP = {
<!--mp_trans_disable_start -->
	Version: '3.1.2.0',
	SrcLang: 'en',
<!--mp_trans_disable_end -->
	UrlLang: 'mp_js_current_lang',
	SrcUrl: decodeURIComponent('mp_js_orgin_url'),
	oSite: decodeURIComponent('mp_js_origin_baseUrl'),
	tSite: decodeURIComponent('mp_js_translated_baseUrl'),
<!--mp_trans_disable_start -->
	init: function() {
		if (MP.oSite.indexOf('p_js_') == 1) {
			MP.SrcUrl = window.top.document.location.href;
			MP.oSite = MP.tSite = window.top.document.location.host;
			MP.UrlLang = MP.SrcLang;
		}
	},
	switchLanguage: function(url,pref,sync) {
		var sync = sync;
		var oSite=MP.oSite.replace(/(https?:\/\/|\/?$)/g,'');
		var tSite=MP.tSite.replace(/(https?:\/\/|\/?$)/g,'');
		url=url.replace(/(https?:\/\/|\/?$)/g,'');
		if(sync && (typeof MpStorage !== 'undefined')&&(typeof MpStorage.updatePref !== 'undefined')){
			if(pref){
			var lang = pref.substring(0, 2);
			pref = lang == MP.UrlLang ? MP.SrcLang+pref.substring(2):pref;
			}
			MpStorage.updatePref(url,pref);
		}
		setTimeout(function() {
			var script = document.createElement('SCRIPT');
			if (url == oSite) {
				script.src = location.protocol + '//' + tSite +'?1023749634;' + encodeURIComponent(location.href);
			} else {
				script.src = location.protocol + '//' + url +'?1023749632;' + encodeURIComponent(MP.SrcUrl);
			}
			var target = document.getElementsByTagName('script')[0];
			target.parentNode.insertBefore(script, target);
		}, 500);
		return false;
	},
	switchToLang: function(url) {
		var oSite=MP.oSite.replace(/(https?:\/\/|\/?$)/g,'');
		if(window.top.location.href == url){
			if((typeof MpStorage !== 'undefined')&&(typeof MpStorage.updatePref !== 'undefined')){
				MpStorage.updatePref(oSite,MP.SrcLang);
			}
		}else if(MP.SrcUrl == url){
			if((typeof MpStorage !== 'undefined')&&(typeof MpStorage.updatePref !== 'undefined')){
				MpStorage.updatePref(oSite,MP.SrcLang);
				setTimeout(function(){window.top.location.href = url;},500);
			}
		}else{
			window.top.location.href = url;
		}
	}
	<!-- mp_trans_disable_end -->   
};