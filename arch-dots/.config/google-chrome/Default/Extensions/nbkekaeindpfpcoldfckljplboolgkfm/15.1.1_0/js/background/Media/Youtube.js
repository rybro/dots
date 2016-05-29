(function(){
	
	var Youtube = function(){		
	
		const TITLE_MAX_LENGTH  = 96;
	
		var mediaDetectCallbacks = [];
	
		// -------------------------------------------------------------------
		function parseYoutubeEmbed( content, callback ){			
		
            var jsr = content.match(/ytplayer\.config\s*=\s*(.+?);<\/script>/i);
            var formats = {};
            var foundFormats = false;

            if (jsr != null) 
			{
				var ytplayer = JSON.parse(jsr[1]);
				var encoded = [];
				for (var key in ytplayer.args) 
				{
					if ( key == "url_encoded_fmt_stream_map" )
					{
						var info = ytplayer.args[key];
						
                        var map = info.split(",");
                        for (var ii = 0; ii != map.length; ii++) 
						{
                            var m = map[ii].match(/itag=([0-9]+)/i);
                            if (!m)       continue;
                            var tag = m[1];
								
                            m = map[ii].match(/url=([^&]+)/i);
                            if (!m)       continue;
							var url = m[1];
								
							m = map[ii].match(/sig=([^&]+)/);
                            if (!m)   continue;
							url += "&signature="+m[1];                              
                                
                            formats[tag] = decodeURIComponent(url);
							foundFormats = true;
                        }
					}
					else if ( key == "adaptive_fmts" )
					{
						var fmts = ytplayer.args[key];
						var data = fmts.split('&');
						
						for (var i = 0; i < data.length; i++) 
						{
							var mu = data[i].split('=');
					
							if ( mu[0] == "url")
							{
								info = decodeURIComponent(mu[1]);
								var x = info.split('&');
								for (var j = 0; j < x.length; j++) 
								{
									var mt = x[j].split('=');
									if ( mt[0] == "itag")
									{
										tag = mt[1];
										formats[tag] = info;
										foundFormats = true;
									}
								}
							}
						}
					}
					else if ( key == "title" )
					{
						var title = ytplayer.args[key];
					}
				}
			}
			
            if (foundFormats)  //http://en.wikipedia.org/wiki/YouTube#Quality_and_codecs
			{
                var ytf = {            
						5: 	 { title: "Low", 	 frm: "FLV", 	size: "240p", 	 },
						6: 	 { title: "Low", 	 frm: "FLV", 	size: "270p", 	 },
						13:  { title: "Mobile",  frm: "3GP", 	size: "144p", 	 },
						17:  { title: "Mobile",  frm: "3GP", 	size: "144p", 	 },
						18:  { title: "Low", 	 frm: "MP4", 	size: "360p", 	 },
						22:  { title: "HD", 	 frm: "MP4", 	size: "720p", 	 },
						34:  { title: "Low", 	 frm: "FLV", 	size: "360p", 	 },
						35:  { title: "SD", 	 frm: "FLV", 	size: "480p", 	 },
						36:  { title: "Mobile",  frm: "3GP", 	size: "240p", 	 },
						37:  { title: "Full HD", frm: "MP4", 	size: "1080p", 	 },
						38:  { title: "4K", 	 frm: "MP4", 	size: "3072p", 	 },
						43:  { title: "Low", 	 frm: "WEBM", 	size: "360p", 	 },
						44:  { title: "SD", 	 frm: "WEBM", 	size: "480p", 	 },
						45:  { title: "HD", 	 frm: "WEBM", 	size: "720p", 	 },
						46:  { title: "Full HD", frm: "WEBM", 	size: "1080p", 	 },
						82:  { title: "3D Low",  frm: "MP4", 	size: "360p", 	 },
						83:  { title: "3D Low",  frm: "MP4", 	size: "240p", 	 },
						84:  { title: "3D HD",   frm: "MP4", 	size: "720p", 	 },
						85:  { title: "3D SD",   frm: "MP4", 	size: "540p", 	 },
						100: { title: "3D Low",  frm: "WEBM", 	size: "360p", 	 },
						102: { title: "3D HD", 	 frm: "WEBM", 	size: "720p", 	 },
						120: { title: "HQ120", 	 frm: "FLV", 	size: "720p", 	 },
						133: { title: "HQ133", 	 frm: "MP4", 	size: "240p", 	 },
						134: { title: "HQ134", 	 frm: "MP4", 	size: "360p", 	 },
						135: { title: "HQ135", 	 frm: "MP4", 	size: "480p", 	 },
						136: { title: "HQ136", 	 frm: "MP4", 	size: "720p", 	 },
						137: { title: "HQ137", 	 frm: "MP4", 	size: "1080p", 	 },
						139: { title: "HQ139", 	 frm: "MP4", 	size: "360p", 	 },
						141: { title: "HQ141", 	 frm: "MP4", 	size: "360p", 	 },
						160: { title: "HQ160", 	 frm: "MP4", 	size: "144p", 	 },
						
						140: { title: "MP3", 	 frm: "MP3", 	size: "480p", 	 },
					}

                var parsedMediaList = [];
					
                for (var i in ytf) 
				{
                    if (!(i in formats))       continue;
                    
                    var u = formats[i];
                    
                    if ((i in ytf)) 
					{
                        var ft = ((title != null) ? title + ' (' + ytf[i].title + ')' : null);
                    }
                    
					var q = ytf[i].title + " [" + ytf[i].size + "]";
                    var ext = ((i in ytf) ? ytf[i].frm.toLowerCase() : 'flv');
					
                    var media = {
							url: u,
							title: ft,
							displayName: ft + "." + ext,
							quality: ytf[i].size,
							ext: ext,
							yt_format: i,
							format: q,
							downloadName: ft + "." + ext,
							type: "video",
							groupId: 0,
							orderField: 0
							
                    };
                    
                    parsedMediaList.push(media);
                    
                    mediaFound = true;
                }
				
				callback( parsedMediaList );
			}
		}
		
			
		// -------------------------------------------------------------------
		function getContentFromYoutubePage( yt_url, videoId, callback ){
			
			var scheme = "http";
			if( yt_url.toLowerCase().indexOf("https") == 0 )	scheme = "https";
			
			// send request to youtube
			var url = scheme + "://www.youtube.com/watch?v="+videoId;
			
			var ajax = new XMLHttpRequest();
			ajax.open('GET', url, true);
			ajax.youtube_id = videoId;
			ajax.setRequestHeader('X-FVD-Extra', 'yes');
			//ajax.setRequestHeader('Cache-Control', 'no-cache');
			ajax.root_url = yt_url;
			ajax.request_url = url;
			
			
			ajax.onload = function(){
			
						var content = this.responseText;

						parseYoutubeEmbed( content, function( media ){
						
										if( media )
										{
											media.forEach(function( item ){
																item.groupId = videoId;
															});
										}
					
										callback( media );
									} );
					}
			
			ajax.onerror = function(){
						callback( null );
					}
			
			ajax.send( null );
		}
		
		
		// -------------------------------------------------------------------
		function checkYoutubePage( data, callback ){
			
			var url = data.url;
			
			var matches = url.match(/https?:\/\/(?:www\.)?youtube\.com\/watch.*[\?|&]v=([^\?&]+)/i);
									
			if( !matches )
			{        
			 	callback( null ); 
				return;
			}

			getContentFromYoutubePage( url, matches[1], callback );   			
			
		}
		
		// -------------------------------------------------------------------
		function checkYoutubeChannel( data, callback ){
	        var url = data.url
					        
	       	matches = url.match(/https?:\/\/(?:www\.)?youtube\.com\/user\/.+?[\?&]v=([^&]+)/i);		
						
			if( matches )
			{  						  
				getContentFromYoutubePage( url, matches[1], callback );   				
				return;	
			}
			
			matches = url.match(/https?:\/\/(?:www\.)?youtube\.com\/user\/([^\/\?&]+)/i);	
						
			if( !matches )
			{
				callback(null);
				return;
			}
			
			GetThemAll.Utils.downloadFromUrl( "http://www.youtube.com/user/" + matches[1], function( contents ){

								if( !contents )		return;
								contents = contents.replace( "\\/", "/" );
							
								matches = contents.match( /data-swf-config\s*=\s*"(.+?)"/i );
								if( matches )
								{				 	
									var conf = matches[1];
									matches = conf.match( /\\\/vi\\\/(.+?)\\\//i ); 	
									
									if( matches )	getContentFromYoutubePage( url, matches[1], callback );							
								}
							} );
		}
		
		// -------------------------------------------------------------------
		function checkYoutubeEmbeds( data, callback ){
			
			var url = data.url;
			
			if( url.toLowerCase().indexOf( "youtube" ) == -1 ){
				callback(null);
				return;
			}
					
			var matches = url.match(/:\/\/(?:www\.)?(?:youtube|youtube-nocookie)(?:\.googleapis)?\.com\/v\/([^\?&]+)/i);
				
			if( !matches ){				
				matches = url.match( /:\/\/(?:www\.)?(?:youtube|youtube-nocookie)\.com\/embed\/([^\?&]+)/ );				
			}	
					
			if( !matches ){
				callback( null );
				return;
			}	


			getContentFromYoutubePage( url, matches[1], callback );					
			
		}
		
		// -------------------------------------------------------------------
		function storeMedia( media, data ){
			
			media.forEach(function( item ){
			
						item.tabId = data.tabId;
						item.priority = 1;
						item.source = "Youtube";
				
					});
				
			mediaDetectCallbacks.forEach( function( callback ){
						callback( media );
					} );
			
			GetThemAll.ContentScriptController.processMessage( data.tabId, {
										action: "insertYTButton",
										media: media
									} );				
				
		}
		
		// -------------------------------------------------------------------
		this.getContentFromYoutubePage = function( url, videoId, callback ){
			getContentFromYoutubePage( url, videoId, callback );
		}
		
		// -------------------------------------------------------------------
		this.onMediaDetect = {
			addListener: function( callback ){
				if( mediaDetectCallbacks.indexOf( callback ) == -1 ){
					mediaDetectCallbacks.push( callback );
				}
			}
		}
		
		// -------------------------------------------------------------------
		this.isEqualItems = function( item1, item2 ){
			
			if( item1.type == item2.type && item1.format == item2.format ){
				return true;
			}
			
			return false;
			
		}

		// -------------------------------------------------------------------
		if( !GetThemAll.noYoutube ){
			
			chrome.webRequest.onResponseStarted.addListener(function(data) {
	                
							GetThemAll.Utils.Async.chain([
					
										// -- warch
										function( chainCallback ){
						
														checkYoutubePage( data, function( mediaToSave ){
																		if( mediaToSave )
																		{
																			storeMedia( mediaToSave, data );
																		}
																		else
																		{
																			chainCallback();	
																		}						
																	} );
						
													},
					
										// -- user
										function( chainCallback ) {
						
														checkYoutubeChannel( data, function( mediaToSave ) {
																		if( mediaToSave )
																		{
																			storeMedia( mediaToSave, data );
																		}
																		else
																		{
																			chainCallback();	
																		}						
																	} );
						
													},
				
										function( chainCallback ) {
					
														checkYoutubeEmbeds( data, function( mediaToSave ) {
																		if( mediaToSave )
																		{
																			storeMedia( mediaToSave, data );
																		}
																		else
																		{
																			chainCallback();	
																		}						
																	} );
					
													},
				
										function(){
					
													}				
				
									]);
			
       
						}, {
								urls: ["<all_urls>"],
								//types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object",  "xmlhttprequest", "other"]
							}, ["responseHeaders"]);
		}
	}
	
	this.Youtube = new Youtube();
	
}).apply( GetThemAll.Media );
