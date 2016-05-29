(function(){

    var MediaSniffer = function(){
    
        var self = this;
        
        var mediaDetectCallbacks = [];

		const VIDEO2EXT = {		
			'mpeg' : 'mp4',
			'm4v': 'mp4',
			'3gpp' : '3gp',
			'flv' : 'flv',
			'x-flv' : 'flv',
			'quicktime' : 'mov',
			'msvideo' : 'avi',
			'ms-wmv' : 'wmv',
			'ms-asf' : 'asf',
			'web' : 'webm'
		};
		
		const AUDIO2EXT = {		
			'realaudio' :  	 'ra',
			'pn-realaudio' : 'rm',
			'midi' : 'mid',
			'mpeg' : 'mp3',
			'mpeg3' : 'mp3',
			'wav' : 'wav',
			'aiff' : 'aif'
		};
		
		const IMAGE2EXT = {		
			'jpeg' : 'jpg',
			'jpg': 'jpg',
			'gif' : 'gif',
			'pjpeg' : 'jpg',
			'png' : 'png',
			'msvideo' : 'avi',
			'tiff' : 'tiff',
			'x-icon' : 'ico'
		};
		
		const TEXT2EXT = {		
			'html' : 'html',
			'css': 'css',
			'jafascript' : 'js',
			'x-jafascript' : 'js',
			'xml' : 'xml'
		};
		
		const NO_YOUTUBE_SIGNS = [
			"://s.ytimg.com",
			"://o-o.preferred.",
			"youtube.",
			"soloset.net",
			"solosing.com",
			"static.doubleclick.net",
			"googlevideo.",
		];
		
		const SKIP_SNIFFER_SIGNS = [
			'break.com\/video\/([^.]*)',
			'http:\/\/(www\.)?dailymotion(\.co)?\.([^\.\/]+)\/',
			'www\.facebook\.com\/(.*)\/videos',
			'metacafe\.com\/watch\/(.*)',
			'vimeo\\.com\\/(.*)',
		];
		
		
        const CONTENT_TYPE_RE = /^(video|audio)/i;
        const TRIGGER_VIDEO_SIZE = 1048576;
        const MIN_FILESIZE_TO_CHECK = 50 * 1024;
		
		
		// --------------------------------------------------------------------------
		function checkMedia( media ){

			if (media.url.indexOf("#") != -1)  media.url = media.url.substring(0,media.url.indexOf("#"));
			if ( (media.url.indexOf("tumblr.com") != -1) && (media.url.indexOf("#_=_") != -1) ) media.url = media.url.replace("#_=_", "");			
			
			return media;
		}
		
		
		// --------------------------------------------------------------------------
		this.prepareMedia = function( media ){
		
			if ( media == null ) return null;
			media = checkMedia( media );
			
			var ext = null;
			var type = null;
			var name = "";
			var title = "";
			var size = "";
			var u = GetThemAll.Utils.convertURL(media.url);
			
			var downloadName = u.name;						
			type = getTypeByContentType(media);
			if (type) {
				var x = getExtByContentType( media );
				if (x) {
					ext = x.ext;
					type = x.type;
				}	
			}	
			if (type != "video" && type != "audio" && type != "image" ) type = "";
			
			var disposName = dispositionName( media );
			if( disposName )	ext = GetThemAll.Utils.extractExtension( disposName );
			
			var fileName = getFileName( media );	
			if ( !type )	{
				if (u.type) 	{
					type = u.type;
				}	
				else {
					type = getHeaderValue( "content-type", media );
					ext = getExtByContentTypeVideo( type );
					
					if (ext) {
						type = "video";
					}	
					else  {
						ext = getExtByContentTypeImage( type );
						if (ext)
						{
							type = "image";
						}	
						else
						{
							ext = getExtByContentTypeText( type );
							type = "link";
						}
					}
				}	
			}
			if ( !type || type == "") type= "link";

			if (type == 'video') {	
				if (self.ignoreDomain(media.tab.url)) return null;
 			}
			
			if ( !ext )	{
				if ( u.ext != "" )	{
					ext = u.ext;
				}
			}

			size = getHeaderValue( "Content-Length", media );
			if( size >= TRIGGER_VIDEO_SIZE && !type )	type="video";

			var pageTitle = "";
			if ( fileName ) 	title = fileName;	
			if( media.tab.title )	{
				pageTitle = media.tab.title;					
			}
			if (type == 'video') {
				title = pageTitle;
				downloadName = fileName ? fileName : pageTitle;
			}	
			
			if (!title)	 {
				if( media.tab && media.tab.title )	title = media.tab.title + "." + ext;					
			}
			if (!title) {
				if (disposName) title = disposName + "." + ext;
			}
			
			var frmt = "no name";
			if (title)	{
				frmt = title;
				if ( frmt.length > 10) frmt = frmt.substr(0,10)+"...";
			}
			if ( !downloadName )	{
				downloadName = disposName ? disposName + "." + ext : (u.name ? u.name + "." + u.ext : "media." + ext);
			}
						
			var result = {				
				url: media.url,
				tabId: media.tabId,
				title: title,
				ext: ext,
				format: frmt,
				downloadName: downloadName,
				pageTitle:	pageTitle,
				fileName:	fileName,
				type: type,
				source: "Sniffer",
				size: size,
				priority: 0,
				vubor:  0,
				groupId: 0,
				orderField: 0,
				dwnl:	type == 'video' ? 1 : 3,
			};
			//console.log(result);			
			
			return result;
		}
		
		// --------------------------------------------------------------------------
		this.ignoreDomain = function( url ){
		
			for (var i in SKIP_SNIFFER_SIGNS) {
				if( url.toLowerCase().match( new RegExp(SKIP_SNIFFER_SIGNS[i],'g') )  )   return true;
			}
			return false;
		}	
		
		// ------------------------------------------------------------------
		function getHeadersAll( data ){
			var result = [];
            for (var i = 0; i != data.responseHeaders.length; i++) 
			{
            	result.push( data.responseHeaders[i].name + ": " + data.responseHeaders[i].value );
            }
			return result;
		}
		
		// ------------------------------------------------------------------
        function getHeaderValue(name, data){
            name = name.toLowerCase();
            for (var i = 0; i != data.responseHeaders.length; i++) 
			{
                if (data.responseHeaders[i].name.toLowerCase() == name) 
				{
                    return data.responseHeaders[i].value;
                }
            }
            return null;
        }
		// -------------------------------------------------------------------
		function getTypeByContentType( media ){
			
			var contentType = getHeaderValue( "content-type", media );
			
			if( !contentType )		return null;
			if( contentType == "application/x-fcs" )  return "video";	
			
			var tmp = contentType.split("/");
			
			if( tmp.length == 2 )	{
				return  tmp[0];
			}	
			
			return null;
		}
		// -------------------------------------------------------------------
		function getExtByContentType( media ){
			
			var contentType = getHeaderValue( "content-type", media )
			if( !contentType )		return null;
			if( contentType == "application/x-fcs" )  return { ext: "flv", type: "video" };			
			
 			if( contentType == "application/octet-stream" 
				&& media.type == 'image' )  return null; 
			
			var tmp = contentType.split("/");
			if( tmp.length == 2 )	{
				tmp[1] = tmp[1].toLowerCase();
				switch( tmp[0] )	{
					case "audio":
									if( AUDIO2EXT[tmp[1]] )			return { ext: AUDIO2EXT[tmp[1]], type: "audio"};
									break;
					case "video":
									if( VIDEO2EXT[tmp[1]] )			return { ext: VIDEO2EXT[tmp[1]], type: "video"};
									break;					
					case "image":
									if( IMAGE2EXT[tmp[1]] )			return { ext: IMAGE2EXT[tmp[1]], type: "image"};
									break;					
					case "text":
									if( TEXT2EXT[tmp[1]] )			return { ext: TEXT2EXT[tmp[1]], type: "link"};
									break;					
				}
			}			
			
			return null;
		}
		// -------------------------------------------------------------------
		function getExtByContentTypeVideo( contentType ){
			if( !contentType )		return null;
			
			var tmp = contentType.split("/");
			
			if( tmp.length == 2 )	{
				tmp[1] = tmp[1].toLowerCase();
			
				switch( tmp[0] )	{
					case "audio":
									if( AUDIO2EXT[tmp[1]] )			return AUDIO2EXT[tmp[1]];
									break;
					case "video":
									if( VIDEO2EXT[tmp[1]] )			return VIDEO2EXT[tmp[1]];
									break;					
				}
			}			
			
			return null;
		}
		// -------------------------------------------------------------------
		function getExtByContentTypeImage( contentType ){
			if( !contentType )		return null;
			
			var tmp = contentType.split("/");
			
			if( tmp.length == 2 )	{
				if ( tmp[0] == "image")   {
					tmp[1] = tmp[1].toLowerCase();
					if( IMAGE2EXT[tmp[1]] )			return IMAGE2EXT[tmp[1]];
				}	
			}			
			
			return null;
		}
        
		// -------------------------------------------------------------------
		function getExtByContentTypeText( contentType ){
			if( !contentType )		return null;
			
			var tmp = contentType.split("/");
			
			if( tmp.length == 2 )	{
				if ( tmp[0] == "text") 	{
					tmp[1] = tmp[1].toLowerCase();
					var tip = tmp[1].split(";");
					if( TEXT2EXT[tip[0]] )			return TEXT2EXT[tip[0]];
				}	
			}			
			
			return null;
		}
        
		// -------------------------------------------------------------------
		function getFileName( data ){
			// check disposition name

			var dn = dispositionName( data );
			if( dn )	return dn;
			
			var url = data.url;
			var tmp = url.split( "?" );
			url = tmp[0];
			tmp = url.split( "/" );
			tmp = tmp[ tmp.length - 1 ];
			
			if( tmp.indexOf( "." ) != -1 )		{
				var x = getExtByContentType( data );
				if (x) {
					var replaceExt = x.ext;
					if( replaceExt )  {
						tmp = tmp.split( "." );
						tmp.pop();
						tmp.push( replaceExt );
						tmp = tmp.join(".");
					}	
				}
				
				try		{
					return decodeURIComponent(tmp);					
				}
				catch( ex )	{
					if( window.unescape )		return unescape(tmp);										
					else						return tmp;
				}
			}
			
			return  null;		
		};
		// -------------------------------------------------------------------
        function dispositionName(data){
            try 
			{
                var cd = getHeaderValue('Content-Disposition', data);
                var at = cd.match(/^(inline|attachment);/i);
                
                if ((at != null) && (at[1].toLowerCase() == 'attachment')) 
				{
                    cd = cd.substr(at[0].length);
                    if (cd.charAt(cd.length - 1) != ';')            cd += ';';
                    
                    var fnm = cd.match(/filename="(.*?)"\s*?(?:;|$)/i);
                    if (fnm == null)           fnm = cd.match(/filename=(.*?)\s*?(?:;|$)/i);
                    if (fnm != null)           return fnm[1];
                }
                
            } 
            catch (e) {         }
			
            return null;
        }

		// ------------------------   ------------------------------	
        this.isMedia = function(data){

//var uu = 'svg';		
//if(data.url.indexOf(uu) == -1) return false;
//console.log(data);
		
			if( data.tabId <= 0) return false;
			if ( !data.url )	return false;
            if (data.url.indexOf("chrome-extension") != -1)  return false;
			
            return true;
        }
		
		// ---------------------------------------------------------------------------
		this.onMediaDetect = {
						addListener: function( callback ) {
									if( mediaDetectCallbacks.indexOf( callback ) == -1 )	mediaDetectCallbacks.push( callback );   
								},
						removeListener: function(  ) {
									mediaDetectCallbacks.length=0;   
								}
					}
		
		// ---------------------------------------------------------------------------
		this.isEqualItems = function( item1, item2 ){  
		
			if (item1.url == item2.url) return true;
			
//			if ( (item1.source == "Sniffer") && (item2.source == "Sniffer") && (item1.url == item2.url) && (item1.ext == item2.ext) ) return true;
			
			return false;
			
		}
		
		// -----------------------------------------------------------------------------	
        chrome.webRequest.onResponseStarted.addListener(  function(data){

			if( data.tabId < 0 )		return false;
		
			chrome.tabs.get( data.tabId, function( tab ){
			
				if (chrome.runtime.lastError) {
					//console.log(chrome.runtime.lastError.message);
				} 
				else if ( !tab ) {
					console.log( data );
				}	
				else {
			
					var tabInfo = tab;
					
					if( self.isMedia( data ) )	{				
						
						if( GetThemAll.noYoutube )		{
							for( var i = 0; i != NO_YOUTUBE_SIGNS.length; i++ )		{
								var sign = NO_YOUTUBE_SIGNS[i];
								if( data.url.indexOf(sign) != -1 )				return;
							}
						}
						
						data.tab = tabInfo;
							
						// calling callbacks
						mediaDetectCallbacks.forEach(function( callback ){
							
							callback( self.prepareMedia( data ) );
																	
						});			
								
					}
				}	

			});
            
		}, {
			urls: ["<all_urls>"],
			//types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
		}, ["responseHeaders"]);
				
        
    }
    
    this.Sniffer = new MediaSniffer();
    
}).apply(GetThemAll.Media);
