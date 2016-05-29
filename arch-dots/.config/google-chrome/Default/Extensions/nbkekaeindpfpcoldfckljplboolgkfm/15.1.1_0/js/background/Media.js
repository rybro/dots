if (window == chrome.extension.getBackgroundPage()) {

	(function(){
	
		var Media = function(){

			var self = this;

			var _onMediaForTabUpdateListeners = [];
			
			this.isGtaSuggestion = false;
			this.scaleZoom = 1;
			this.widthWin = 0;
			this.localUser = 'en';
			
			this.isDownload = false;
			this.countDownload = 0;
			this.totalDownload = 0;
			
			var textFile = null;
			
			const DETECT_MODULES = ["Sniffer", "Youtube", "DailyMotion", "VKontakte", "BreakCom", "FaceBook", "MediaStream", "SitePage"];
			
			// ===============================================================
			this.init = function(){
			
				this.Storage.onMediaRemove.addListener(function( tabId ) {

							console.log( "REMOVE ITEM " + tabId );
					
							_onMediaForTabUpdateListeners.forEach(function(listener) {
						
										try
										{
											listener(tabId);							
										}
										catch( ex ){			}
						
									});
				
						});
				
		
				
												
				function mediaDetectListener(media){
			
					var tabId = null;
					
					GetThemAll.Utils.Async.chain ( [
							function( chainCallback ){
						
										chainCallback();
									},
					
							function() {
							
										if (media)
										{	
											if( media.length )
											{							
							
												media.forEach(function( item ) {
																tabId = item.tabId;
																self.Storage.addItemForTab(item.tabId, item);							
															});
											}
											else
											{							
												tabId = media.tabId;
												self.Storage.addItemForTab(media.tabId, media);
											}
				
											chrome.extension.sendMessage( {
																		subject: "mediaForTabUpdate",
																		data: tabId
																	} );
				
											_onMediaForTabUpdateListeners.forEach(function(listener){
							
															try
															{
																listener(tabId);							
															}
															catch( ex ){	}
							
														});
										}
									}] );
					
				};
				
				// --------------------------- перебираем модули Sniffer, Youtube
				DETECT_MODULES.forEach( function( module ){
				
					if( self[module] )
					{
						self[module].onMediaDetect.addListener(mediaDetectListener);						
					}
					
				} );
				
				// --------------------------- закрытие вкладки  
				chrome.tabs.onRemoved.addListener( function( tabId ){
				
							if( GetThemAll.Media.Storage.hasDataForTab( tabId ) )
							{
								GetThemAll.Media.Storage.removeTabData( tabId );
						
								_onMediaForTabUpdateListeners.forEach(function( listener ){
												listener( tabId );
											});
							}
						} );
				
				// --------------------------- изменение вкладки
				chrome.tabs.onUpdated.addListener( function( tabId, changeInfo ){
				
							if( changeInfo.url )
							{
								if( GetThemAll.Media.Storage.hasDataForTab( tabId ) )
								{
									GetThemAll.Media.Storage.removeTabData( tabId );
								
								
									_onMediaForTabUpdateListeners.forEach(function( listener ){
												listener( tabId );
											});
								}
							}
					
						} );
				
				// --------------------------- реакция на SendRequest
				chrome.extension.onRequest.addListener ( function(request, sender, sendResponse) {        
				
									if(request.command=="getVideoData")	{
										GetThemAll.Utils.getActiveTab( function( tab ) {
													if( tab )	{
														var media = GetThemAll.Media.Storage.getMedia( tab.id );
														sendResponse(media);
													}
												});	
									}
									else if(request.command=="startDownload")	{
										self.startDownload( request.media );	
									}
								});
				
				
				chrome.extension.onMessage.addListener( function( request ) {
					
									if( request.subject == "start_download" ) {
										chrome.browserAction.setBadgeText({
										  text: "zip"
										});
										self.isDownload = true;
										self.countDownload = 0;
										self.totalDownload = request.count;
									}	
									else if( request.subject == "finish_download" ) {
										chrome.browserAction.setBadgeText({
										  text: ""
										});
										self.isDownload = false;
									}	
									else if( request.subject == "status_download" ) {
										self.countDownload = request.count;
									}	
								} );
				
			}
			
			// ----------------------------------------------
			this.display_setting = function(){
				chrome.tabs.query( 	{
								url: chrome.extension.getURL( "/options.html" )
							}, function( tabs ){

									if( tabs.length > 0 )
									{
										foundTabId = tabs[0].id;
										chrome.tabs.update( foundTabId, {
																		active: true
																		} );
									}
									else
									{
										chrome.tabs.create( {	active: true,
																url: chrome.extension.getURL("/options.html")
															}, function( tab ){ }
														);
									}
						} );
			}

			// ===============================================================
			this.stopListDownload = function( listMedia, count ){

				var m = _b(GetThemAll.Prefs.get( "gta.download_zip" ));
				if (m) {
					GetThemAll.Downloader.stop( function()	{ 
					
					});
				}
			}	
			
			// ===============================================================
			this.startListDownload = function( listMedia, title ){
				
				var removeChars = /[\\\/:*?"<>|"']/g;
				title = title.replace(removeChars, "");
				
				var m = _b(GetThemAll.Prefs.get( "gta.download_zip" ));
				
 				if (listMedia.length==1) {
					self.startDownload( listMedia[0], true );							
				}
				else if (!m) {
					listMedia.forEach( function( item ){
								self.startDownload( item, false );							
							});
				}	
				else { 
					GetThemAll.Utils.getActiveTab(function( tab ){
						GetThemAll.Downloader.start( {	list: 	listMedia,	
														title:	title,
														tabId:	tab.id,
												 }, function(url, fileName)	{ 
												 
												self.Download( {	flag:		1,
																	url:		url,
																	filename:	fileName,
																	ext:		'zip',
															   });
						});									   
					});
					
				}	
					
			}	
			
			// ===============================================================
			this.startDownload = function( media, metod ){

				var flag_download = ('dwnl' in media && media.dwnl) ?  media.dwnl : 1;
				if( flag_download == 3 && !chrome.downloads ) flag_download = 5;
				
				var filename = null;
				if (metod) {			// в начале title
					if (media.title)  filename = media.title;
					if (!filename && media.downloadName) filename = media.downloadName;
				}
				else {
					if (media.downloadName)  filename = media.downloadName;
					if (!filename && media.title) filename = media.title;
				}	
				var ext = (media.ext ? media.ext : null); 
				
				var removeChars = /[\\\/:*?"<>|"']/g;
				filename = filename.replace(removeChars, "");
				
				
				if ( media.source == 'MediaStream' ) {
				
					self.DownloadStream( {	playlist:	media.urlPlayList,
											filename:	filename,
											ext:		ext,
											hash:		media.yt_hash,
											id:			media.id,
											tabId:		media.tabId,
										 } );
				}
				else {
					self.Download( {	flag:		flag_download,
										url:		media.url,
										filename:	filename,
										ext:		ext,
								   });
				}	
				
						
			}
			
			// ===============================================================
			//	hash		- уникальный код
			//	playlist 	- плейлист
			//	filename	- как сохраняем
			//	ext			- расширение
			this.DownloadStream = function( params ){
			
				GetThemAll.DownloadStreams.start( {	hash:		params.hash,
													playlist: 	params.playlist,	
													filename:	params.filename,
													ext:		params.ext,
													id:			params.id,
													tabId:		params.tabId,
												  }, 
					 function(type, hash, data)	{ 
						//console.log('== '+type+' ==', hash, data);
						if ( type === 'start' ) {
							GetThemAll.Media.Storage.setStream( hash, 'start', null );
							chrome.extension.sendMessage( {	subject: "start_download_streams", id: data.id	} );
						}	
						else if ( type === 'finish' ) {
							GetThemAll.Media.Storage.setStream( hash, null, data.size );
							chrome.extension.sendMessage( {	subject: "finish_download_streams", id: data.id	} );
						}
						else if ( type === 'playlist' ) {
							chrome.extension.sendMessage( {	subject: "load_download_streams", id: data.id, count: data.count } );
						}	
						else if ( type === 'load' ) {
							chrome.extension.sendMessage( {	subject: "load_download_streams", id: data.id, count: data.count	} );
						}	
						
					 },									
					 function(error, hash, file, count, size)	{ 
						if ( !error ) {
							var link_href = saveTSFile(file);
							self.Download( {	flag:		1,
												url:		link_href,
												filename:	params.filename,
												ext:		params.ext,
										   });
						}				   
					}
				);									   

			
			}

			// ===============================================================
			function saveTSFile(data)	{ 	
				// If we are replacing a previously generated file we need to
				// manually revoke the object URL to avoid memory leaks.
				if (textFile !== null) 	{
					window.URL.revokeObjectURL(textFile);
				}
			
				textFile = window.URL.createObjectURL(data);		
				return textFile;
			}
			
			
			// ===============================================================
			//	flag		- метод закачки
			//	url 		- адрес
			//	filename	- как сохраняем
			//	ext			- расширение
			this.Download = function( params ){
				
				params.filename = params.filename+(params.ext ? '.'+params.ext : '');
				var removeChars = /[\\\/:*?"<>|"']/g;
				params.filename = params.filename.replace(removeChars, "");

				if (params.flag == 1) {							// с использованием API
					var info = { url: 		params.url,  
								 //saveAs: 	true,
								 filename:  params.filename,		
							   };	
					
					chrome.downloads.download(info,	function (downloadId) {
												console.log('DOWNLOAD', downloadId );
												chrome.downloads.search({ id:downloadId	},
															function (result) {
																console.log('DOWNLOAD', result );
															}		
												);
											}		
										);
				}				
				else if (params.flag == 2) {	// скачивание методом открытия в новой вкладке
					chrome.tabs.create({
									url: 	params.url,
									active: false
								});		
				}				
				else if (params.flag == 3) {	// по старинке - через закачку на странице
					var info = { url: 			params.url,  
								 downloadName: 	params.filename,
							   };	

					GetThemAll.Utils.getActiveTab(function( tab ){
								GetThemAll.ContentScriptController.processMessage( tab.id, {
											action: 	"startDownload",
											media: 		info,
										} );
							});
				}				

			}
			
			// ===============================================================
			this.SaveLink = function( media, title ){
				
				var text = '';
				if (media.k_link>0) {
					text += '\n\nLINK\n';
					media.link.forEach( function( item ){
						text +=  item.title +'\t \t'+item.url+'\n';
					});
				}			
				if (media.k_image>0) {
					text += '\n\nIMAGE\n';
					media.image.forEach( function( item ){
						text +=  item.title +'\t \t'+item.url+'\n';
					});
				}			
				if (media.k_file>0) {
					text += '\n\nFILE\n';
					media.file.forEach( function( item ){
						text +=  item.title +'\t \t'+item.url+'\n';
					});
				}			
				if (media.k_video>0) {
					text += '\n\nMEDIA\n';
					media.video.forEach( function( item ){
						text +=  item.title +'\t \t'+item.url+'\n';
					});
				}			
				
				var blob = new Blob([text], {type: 'text/plain'});
				var link_href = saveTSFile(blob);

				var filename = title+'.txt';
				var removeChars = /[\\\/:*?"<>|"']/g;
				filename = filename.replace(removeChars, "");
				
				chrome.downloads.download({ url: 		link_href,  
											saveAs: 	true,
											filename:   filename,
										  }, function (downloadId) {
												console.log('DOWNLOAD', downloadId );
										  });

			}
			
			
			
			// ===============================================================
			this.onMediaForTabUpdate = {
				addListener: function(callback){
							if (_onMediaForTabUpdateListeners.indexOf(callback) == -1) 
							{
								_onMediaForTabUpdateListeners.push(callback);
							}
						}
			}
		}
		
		this.Media = new Media();
		
	}).apply(GetThemAll);
	
}
else
{
	GetThemAll.Media = chrome.extension.getBackgroundPage().GetThemAll.Media;
}
