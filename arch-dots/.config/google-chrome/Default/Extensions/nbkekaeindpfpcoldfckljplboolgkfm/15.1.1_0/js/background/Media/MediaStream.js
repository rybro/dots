(function(){
	
	var MediaStream = function(){		
	
		const TITLE_MAX_LENGTH  = 96;
	
		var mediaDetectCallbacks = [];
		
		var self = this;
		
		var detectMediaStream = {};
		
		// --------------------------------------------------------------------------------
		const MEDIASTREAM_URL_STREAM = [   
				{	type:	'parser_metacafe',
					icons:	'metacafe.png',
					url: 	'metacafe\\.com\\/watch\\/(.*)',
					skipRootUrl: null,
					id:		'([^\\/]+)',
					title:	 '<title>([\\s\\S]*)<\\/title>',
					flashvars: 'var\\sflashvars\\s?=\\s?\\{(.*)\\};',
					jsonVideoId:  'flashvars/video_id',	
					jsonUrlHls:	  'sources/0/src',	
					quality: 'RESOLUTION\=(.*)$',
					ext:	 'mp4',	
				},
/*				{	type:	'sniffer_metacafe',
					icons:	'metacafe.png',
					url: 	'cdn\.metacafe\.com\/videos\/([^_]*)\.m3u8',
					id:		'\/(.*)\/',
					title:	 null,
					quality: 'RESOLUTION\=(.*)$',
					ext:	 'mp4',				
				},*/
 				{	type:	'sniffer_vimeo',
					icons:	'vimeo.png',
					//url: 	'vimeocdn\\.com\\/(.*)\\/master\\.json\\?',
					url: 	'\\/video\\/(.*)\\/master\\.json\\?',
					skipRootUrl: '\\/\\/vimeo\\.com\\/',
					id:		null,
					title:	 '<title>([\\s\\S]*)<\\/title>',
					flashvars: '\\{(.*)\\}',
					flashvars: null,
					jsonVideoId:  'clip_id',   //'video/0/id',	
					jsonBaseUrl:  'base_url',
					jsonVideo:  'video',
					ext:	 'mp4',				
				}, 
				{	type:	'parser_vimeo',
					icons:	'vimeo.png',
					url: 	'player\\.vimeo\\.com\\/video\\/(.*)\\/config',
					skipRootUrl: null,
					id:		'(.*)',
					title:	 '<title>([\\s\\S]*)<\\/title>',
					flashvars: '\\{(.*)\\}',
					jsonVideoId:  'video/id',	
					jsonTitle:	  'video/title',	
					//jsonUrlHls:	  'request/files/hls/url',	
					jsonUrlHls:	  null,	
					jsonVideo:	  'request/files/progressive',	
					rowVideo:	  'quality:url',
					quality: 	'RESOLUTION=(.*),CODECS',
					ext:	 	'mp4',				
				},
				{	type:	'parser_facebook',
					icons:	'facebook.png',
					url: 	'facebook\\.com\\/[^\\/]+\\/videos\\/([^\\?]+)\\/',
					skipRootUrl: null,
					id:		'(.*)',
					title:	 'ownerName":"([^,]+)',
					flashvars: '\\"videoData\\"\\:\\[\\{([^}]+)',
					jsonVideoId:  'video_id',	
					jsonTitle:	  null,	
					jsonUrlHls:	  null,	
					jsonVideo:	  '/',	
					rowVideo:	  'hd:hd_src;sd:sd_src',	
					quality: 	'RESOLUTION=(.*),CODECS',
					ext:	 	'ts',				
				},
			];
		
		var mediaStream = [];
		
		// --------------------------------------------------------------------------------
		function getAJAX( url, callback ){
			
			var ajax = new XMLHttpRequest();
			ajax.open('GET', url, true);
			ajax.setRequestHeader('Cache-Control', 'no-cache');
			ajax.setRequestHeader('X-FVD-Extra', 'yes');
			
			ajax.onload = function(){
						var content = this.responseText;
						callback( content );
			}
			
			ajax.onerror = function(){
				callback( null );
			}
			
			ajax.send( null );
		
		}

		// --------------------------------------------------------------------------------
		this.addMediaStream = function( str )		{
			
			for (var i in mediaStream) {
				if ( mediaStream[i].hash == str.hash ) return false;
			}
			
			mediaStream.push(str);
			
			return true;	
		}		
		
		// --------------------------------------------------------------------------------
		this.clearMediaStream = function( tabId )		{
			
			var l = [];
			
			for (var i in mediaStream) {
				if ( mediaStream[i].tabId != tabId ) l.push(mediaStream[i]);
			}
			mediaStream = l;
			
			return true;	
		}		
		
		// --------------------------------------------------------------------------------
		this.isMediaStream = function( hash, tabId )		{
			
			for (var i in mediaStream) {
				if ( mediaStream[i].hash == hash && mediaStream[i].tabId == tabId ) return i;
			}
			
			return -1;	
		}		
		
		// --------------------------------------------------------------------------------
		function checkUrlMediaStream( media ){

 			var url = media.url;
			var root_url = media.tab.url;

			// проверим на sniffer адрес
			for (var i in MEDIASTREAM_URL_STREAM) {		 
				if( url.match( new RegExp(MEDIASTREAM_URL_STREAM[i].url,'g') ) )		{
					if( MEDIASTREAM_URL_STREAM[i].skipRootUrl && root_url.match( new RegExp(MEDIASTREAM_URL_STREAM[i].skipRootUrl,'g') ) ) {		
						return null;
					}		
					else {
						return MEDIASTREAM_URL_STREAM[i];
					}
				}	
			}
			
 			// проверим на root - адрес
			for (var i in MEDIASTREAM_URL_STREAM) {		 
				if( root_url.match( new RegExp(MEDIASTREAM_URL_STREAM[i].url,'g') ) )		{
					var opt = {};
					for (var k in MEDIASTREAM_URL_STREAM[i])  opt[k] = MEDIASTREAM_URL_STREAM[i][k];
					opt['metod'] = 'root';
					return opt;
				}	
			}
			
			return null;	
		}		
		
		// --------------------------------------------------------------------------------
		function compiledMediaStream( media, options, callback ){
		
			tabInfo = media.tab;
			var url = media.url;
			var root_url = media.tab.url;
			if ('metod' in options && options.metod == 'root') url = root_url;

			var videoId = null;
			var videoTitle = null;
			
			// find ID-video
			if (options.id) {
				var m = url.match( new RegExp(options.url,'i') );
				if (m.length<2) return;
				var str = m[1];
				var p = str.match( new RegExp(options.id,'i') );
				if (p.length<2)  return;
				videoId = p[1];	
				//console.log(videoId);				
			}
			
			var hh = hex_md5(url);
			if ( hh in detectMediaStream && detectMediaStream[hh].load == 1 )  {		// этот url уже был .. и .. обрабатывается
				return null;
			}	
			else if ( hh in detectMediaStream && detectMediaStream[hh].load == 2 ) {		// .. имеем данные
				self.clearMediaStream( media.tab.id );	
				GetThemAll.Media.Storage.removeTabDataMode( media.tab.id, 'video' );
				load_detectVideo( detectMediaStream[hh].media, detectMediaStream[hh].videoId );
			}
			else {	
			
				console.log(media, options, hh, detectMediaStream[hh]);

				self.clearMediaStream( media.tab.id );	
				GetThemAll.Media.Storage.removeTabDataMode( media.tab.id, 'video' );

				detectMediaStream[hh] = { load:    		1,
										  videoId: 		videoId,
										  videoTitle:	videoTitle,
										  media:   		null	};
										  
				setTimeout( function(){		// вдруг что - удалим пустую
					
					if ( hh in detectMediaStream && detectMediaStream[hh].load == 1 ) {
						delete detectMediaStream[hh];	
					}	
					
				}, 3000);						  
				
				if (options.type.indexOf('parser') != -1) {
					loadContent( );
				}
				else {
					loadSniffer(  ); 
				}	
			}	

			// ---------------------------
			function loadSniffer( ){
				console.log(url);
				getAJAX( url, function(content){
					var x = JSON.parse(content);	
					console.log(x);
					if (x) {
						videoId = get_json( x, options.jsonVideoId );
						getAJAX( 'https://vimeo.com/'+videoId, function(content){ 
							var mm = content.match( /window\.vimeo\.clip_page_config\s=\s(.*);/,'g');
							if (mm) {
								var x = JSON.parse(mm[1]);	
								url = x.player.config_url;
								
								for (var i in MEDIASTREAM_URL_STREAM) {		 
									if( MEDIASTREAM_URL_STREAM[i].type == 'parser_vimeo' ) 		{
										options = MEDIASTREAM_URL_STREAM[i];
									}
								}	
								
								loadContent( );
							}
						});
					}	
				});
			}
				
			// ---------------------------
			function loadMaster( ){
			
				var mediaFound = false;
				var parsedMediaList = [];
			
				getAJAX( url, function(content){
					var x = JSON.parse(content);	
					console.log(x);
					if (x) {
						videoId = get_json( x, options.jsonVideoId );
						var baseUrl = get_json( x, options.jsonBaseUrl );
						baseUrl = get_base_url( url, baseUrl );
						var videoTitle = tabInfo.title;
						
						var video = get_json( x, options.jsonVideo );
						if (video) {
							for (var i=0; i<video.length; i++) {
								var uuu = get_json( video[i], 'base_url' )
								var label = get_json( video[i], 'width' )+'x'+get_json( video[i], 'height' );
								var list = parsedList( get_json( video[i], 'segments' ), baseUrl+'/'+uuu );
								var init_segment = _base64ToArrayBuffer( get_json( video[i], 'init_segment' ) );
								var ext = options.ext;
								
								var hash = videoId+'_'+label;
								var m = addVideo( videoId, hash, baseUrl+'/'+uuu, list, label, videoTitle, options, tabInfo.id, 'MediaStream', ext );

								parsedMediaList.push(m);
								mediaFound = true;
							}
						}	
						
						if (mediaFound) {
							detectMediaStream[hh].load = 2;
							detectMediaStream[hh].videoId = videoId;
							detectMediaStream[hh].videoTitle = videoTitle;
							detectMediaStream[hh].media = parsedMediaList;
							
							callback( parsedMediaList, videoId );		
						}
					
						
						
					}	
				});
				
				function _base64ToArrayBuffer(base64) {
					var binary_string =  window.atob(base64);
					var len = binary_string.length;
					var bytes = new Uint8Array( len );
					for (var i = 0; i < len; i++)        {
						bytes[i] = binary_string.charCodeAt(i);
					}
					return bytes.buffer;
				}				
				

			}
			
			// ---------------------------
			function loadContent( ){
			
				getAJAX( url, function(content){
					//console.log(content);					
					if (options.flashvars) {
						
						var fv = content.match( new RegExp(options.flashvars,'i') );
						if (fv) {
							if (options.title) { 
								var tt = content.match( new RegExp(options.title,'i') );
								if (tt) videoTitle = tt[1].replace('\n','')
														  .replace(/\\/g,'')
														  .replace(/\"/g,'')	
														  .trim();
							}	
							else {
								videoTitle = media.tab.title	
							}	
							//console.log(videoTitle);
							
							var x = {};
							try {
								x = JSON.parse('{'+fv[1]+'}');
							}
							catch(e) {
								console.log(e);
								console.log(fv);
							}	
							console.log(x);

							if (options.jsonVideoId) {	
								videoId = get_json( x, options.jsonVideoId );
								//console.log(videoId);
							}	
							if (options.jsonTitle) {	
								videoTitle = get_json( x, options.jsonTitle );
							}	
							if (options.jsonUrlHls) {	
								var uu = get_json( x, options.jsonUrlHls );
								parsedHls( uu );
							}	

 							if (options.jsonVideo) {
								var progressive = get_json( x, options.jsonVideo );
								parsedProgressive( progressive );
							}	
 							
						}
						else {
							console.log(fv);	
						}	
					}
					else if (typeof options.func == 'function') {
						options.func(url, JSON.parse(content),  options, tabInfo, callback);	
					}	
				});
			
				// ----
				function _add( o ) {
					for (var k in o) {
						if ( typeof o[k] == 'object')  _add( o[k] );
						else   par[k] = o[k];
					}	
				}	
				// ----
			
			}
			
			// --------------------------
			function get_json( data, type ){
				
				if (type == '/')  return data;
			
				var p = type.split('/');

				var h = data;
				for (var i=0; i<p.length; i++) {
					if ( h[p[i]] ) { 
						h = h[p[i]];
					}
				}	

				return h;
			}
				
			// --------------------------
			function get_base_url( url, data ){
				
				if (data == '/')  return url;
			
				var k = url.indexOf('?');
				if ( k != -1 ) url = url.substring(0,k);
				var u = url.split('/');
			
				var p = data.split('/');

				var h = url;
				for (var i=0; i<p.length; i++) {
					if ( p[i] == '' ) { 
						u.length--;
					}
					else if ( p[i] == '..' ) { 
						u.length--;
					}
					else {
						u.push(p[i]);	
					}	
				}	

				return u.join('/');
			}
			
			// --------------------------------------------------------------------------------
			function parsedList( data, url ) {

				var urlList = [];
				for (var i=0; i<data.length; i++) {
					urlList.push(url + data[i].url);	
				}	
				
				return urlList;
			}
			
				
			// --------------------------
			function parsedHls( url_m3u8 ){
				
				var mediaFound = false;
				var parsedMediaList = [];
			
				// read playlist
				readPlayList( url_m3u8, options, function(results, ext) {
						
						for (var k in results) {
							
							var label = k;
							var url = results[k];
							
							var hash = videoId+'_'+label;
							var k = self.isMediaStream( hash );
							if ( k == -1)  {
					
								var m = addVideo( videoId, hash, url, url, label, videoTitle, options, tabInfo.id, 'MediaStream' );
								
								parsedMediaList.push(m);
								mediaFound = true;
							}	
						}

						if (mediaFound) {
							detectMediaStream[hh].load = 2;
							detectMediaStream[hh].videoId = videoId;
							detectMediaStream[hh].videoTitle = videoTitle;
							detectMediaStream[hh].media = parsedMediaList;
							
							callback( parsedMediaList, videoId );		
						}
					
				});
				
			}
			// --------------------------
			function parsedProgressive( data ){
				
 				var mediaFound = false;
				var parsedMediaList = [];
				
				if ( typeof data == 'object' ) {
					if (data.length) {
						var p = options.rowVideo.split(':');
						for (var i=0; i<data.length; i++) {
							
							var d = data[i];
							var l = (p[0] in d) ? d[ p[0] ] : p[0];
							var u = (p[1] in d) ? d[ p[1] ] : null;
							
							if (u) {
								var hash = videoId+'_'+l;
								
								ext = GetThemAll.Utils.extractExtension( u );
								
								var m = addVideo( videoId, hash, u, null, l, videoTitle, options, tabInfo.id, 'Sniffer', ext );
								
								parsedMediaList.push(m);
								mediaFound = true;
							}	
						}	
					}
					else {	
						var p = options.rowVideo.split(';');
						for (var i=0; i<p.length; i++) {
							var m = p[i].split(':');
							var l = (m[0] in data) ? data[ m[0] ] : m[0];
							var u = (m[1] in data) ? data[ m[1] ] : null;
							
							if (u) {
								var hash = videoId+'_'+l;
								var ext = GetThemAll.Utils.extractExtension( u );
								var m = addVideo( videoId, hash, u, null, l, videoTitle, options, tabInfo.id, 'Sniffer', ext );
		
								parsedMediaList.push(m);
								mediaFound = true;
							}
						}
					}
				}
				if (mediaFound) {

					detectMediaStream[hh].load = 2;
					detectMediaStream[hh].videoId = videoId;
					detectMediaStream[hh].videoTitle = videoTitle;
					detectMediaStream[hh].media = parsedMediaList;
				
					callback( parsedMediaList, videoId );		
				}
			}
			// --------------------------------------------------------------------------------
			function load_detectVideo( data, videoId ){

 				var mediaFound = false;
				var parsedMediaList = [];
				
				for (var i=0; i<data.length; i++) {
					parsedMediaList.push(data[i]);
					mediaFound = true;
				}	
				
				if (mediaFound) {	
					callback( parsedMediaList, videoId );		
				}
			
			}	
			
		}
		
		// --------------------------------------------------------------------------------
		function addVideo( videoId, hash, url, urlList, label, videoTitle, options, tabId, type, ext ){
			
			if (typeof ext == 'undefined') ext = options.ext;
		
			if (type =='MediaStream') { 
		
				self.addMediaStream( { hash:  	 	hash,
									   title: 	 	videoTitle,
									   videoId:	 	videoId, 
									   tabId:	 	tabId,
									   urlPlayList: url,	
									 } );
			}						 
		
			var m = {
					streamId:		videoId,
					urlPlayList: 	urlList,
					url:			url,
					title: 			'['+label+'] '+videoTitle,
					displayName: 	'['+label+'] '+videoTitle + "." + ext,
					downloadName: 	'['+label+'] '+videoTitle + "." + ext,
					ext: 			ext,
					quality:		label,
					yt_hash: 		hash,
					size: 			0,
					type: 			"video",
					groupId: 		0,
					orderField:		0,
					icons:			options.icons,
					status: 		"stop",
					source:			type,
					dwnl:			1
			};
			console.log(m);
		
			return m;
		}
		
		// --------------------------------------------------------------------------------
		function parsedVimeo( url, data, options, tabInfo, callback ) {

			var mediaFound = false;
			var parsedMediaList = [];

			var videoTitle = tabInfo.title;
			var videoId = data.clip_id;
			var k = url.split('/');
			var k1 = data.base_url.split('/');

			var host = [];
			for (var i=0; i<k.length-k1.length; i++)  host.push(k[i]);
			host = host.join('/');
			
			for (var i=0; i<data.video.length; i++) {
			
				var label = data.video[i].height;
				var hash = data.video[i].id;
				
				var u = host+'/'+data.video[i].base_url;
				
				var urlList = [];
				for (var j=0; j<data.video[i].segments.length; j++) {
					urlList.push(u+data.video[i].segments[j].url);	
				}	
			
				var m = addVideo( videoId, hash, u, urlList, label, videoTitle, options, tabInfo.id );
				
				parsedMediaList.push(m);
				mediaFound = true;
			
			}

			if (mediaFound) {	
				callback( parsedMediaList, videoId );		
			}
		}
		
		// --------------------------------------------------------------------------------
		function readPlayList( url, options, callback ){

			var host = url;
			var k = host.lastIndexOf('/');
			if ( k != -1) {
				host = host.substr(0, k+1);
			}		
			
			var ext = options.ext;
		
			getAJAX( url, function(content){
				
				var results = {};
				var line = content.split('\n');
				
				for (var i=0; i<line.length; i++) {
					if (line[i].indexOf('#EXT-X-STREAM-INF') == 0) {	

						var m = line[i].match( new RegExp(options.quality,'i') );
						if (m) {
							var u = line[i+1];
							if (u.indexOf('http') != 0)  u = host + u;
							results[m[1]] = u;
						}
						
						var k = line[i+1].lastIndexOf('.');
						if ( k!= -1)   ext = line[i+1].substring(k+1, line[i+1].length);
						
					
					}
				}
				callback(results, ext);	
				
			});

		}	
		
		function IsRequestSuccessful (httpReq) {
			// Fix for IE: sometimes 1223 instead of 204
			var success = (httpReq.status == 0 || 
				(httpReq.status >= 200 && httpReq.status < 300) || 
				httpReq.status == 304 || httpReq.status == 1223);

			return success;
		}
		

		// -----------------------------------------------------------
		function storeMedia( media, data ){
			
			if (media)	{	
				if( media.length ) 	 {
					media.forEach(function( item )  {
											item.tabId = data.tabId;
											item.streamId = data.tab.streamId;
											item.priority = 1;
											//item.source = "MediaStream";
										});
				}
				else	{							
					media.tabId = data.tabId;
					media.streamId = data.tab.streamId;
					//media.source = "MediaStream";
					media.priority = 1;
				}						
			
				mediaDetectCallbacks.forEach( function( callback ){
									callback( media );
								} );
			
			}
		}
		
		// -----------------------------------------------------------
		this.onMediaDetect = {
			addListener: function( callback ){
				if( mediaDetectCallbacks.indexOf( callback ) == -1 )
				{
					mediaDetectCallbacks.push( callback );
				}
			}
		};
		
		// -----------------------------------------------------------
		this.isEqualItems = function( item1, item2 )		{
		
			if( item1 && item2 && item1.url == item2.url )	{
				return true;
			}
			return false;
		};

		
		// ------------------------------------------------------------------------
        chrome.webRequest.onResponseStarted.addListener(function(data){
			
			if( !data || data.tabId < 0 )		return false;
		
			chrome.tabs.get( data.tabId, function( tab ){
				
				if (chrome.runtime.lastError) {
					//console.log(chrome.runtime.lastError.message);
				} 
				else if ( !tab ) {
					console.log( data );
				}	
				else {
			
					var tabInfo = tab;
					data.tab = tabInfo;
					
					var opt = checkUrlMediaStream(data);
					
					if (opt) {
						compiledMediaStream( data, opt, function( mediaToSave, videoId )  {
										if( mediaToSave )	{
											data.tab.streamId = videoId;
											storeMedia( mediaToSave, data );
										}
						});
					}	
					
				}	

			});
		}, {
			urls: ["<all_urls>"],
			//types: ["main_frame", "xmlhttprequest", "other"]
		}, ["responseHeaders"]);
				
	};
	
	this.MediaStream = new MediaStream();
	
}).apply( GetThemAll.Media );
