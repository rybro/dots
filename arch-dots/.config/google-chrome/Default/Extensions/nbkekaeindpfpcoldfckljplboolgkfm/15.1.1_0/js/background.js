
window.addEventListener( "load", function(){

	GetThemAll.Media.init();

	if( GetThemAll.Utils.isVersionChanged() && !GetThemAll.noWelcome )	{
		var url = null;
		
		if( GetThemAll.noYoutube )		{
			
			if (GetThemAll.Prefs.get("install_time") == 0) 	{
				url = "http://gta-suggestion.fvdmedia.com/";
				
				GetThemAll.Prefs.set("gta.superfish.ramp.start_time", 1 );
				GetThemAll.Prefs.set("gta.superfish.b_enable", false );
				
			}
			else {
				if (GetThemAll.Prefs.get("gta.superfish.b_enable")) 	{
					//show_suggestion(  );
				}
			
				GetThemAll.Prefs.set("gta.superfish.ramp.start_time", new Date().getTime() );
			}	
		}	
		else	{
			if (GetThemAll.Prefs.get("install_time") == 0) 	{

				url = "http://flashvideodownloader.org/fvd-suite/to/s/welcome_chrome/";
				
				fGetThemAll.Prefs.set("gta.superfish.ramp.start_time", 1 );
			}
			else {
				//url = "http://flashvideodownloader.org/fvd-suite/to/s/update_chrome/";
				
				GetThemAll.Prefs.set("gta.superfish.ramp.start_time", new Date().getTime() );
				
			}			
		}	
		
		if( url )	{
			chrome.tabs.create({
						url: url,
						active: true
					});			
		}

	}
	
	if( GetThemAll.Prefs.get( "install_time" ) == 0 )	{
		GetThemAll.Prefs.set( "install_time", new Date().getTime() );
	}
		
	// устанавливаем страницу при удаление
	chrome.runtime.setUninstallURL("http://fvdmedia.com/to/s/dwunstl");
	
	// внешний модуль
	var urlOpener = new CondUrlOpen();

	// урл будет показыватся только в указанной версии текущего аддона
	urlOpener.setVersion("5.1.1");
	// установка урла который будет показыватся
	urlOpener.setUrl("https://chrome.google.com/webstore/detail/google-parallax-backgroun/ehapjibcchlieijdiembfopllbhcdmdm?hl=en-US");
	// через какое время простоя компьютера показывать урл
	urlOpener.setIdleTimeout(60*5);
	// задание списка урлов, которые проверяются на несуществование
	// т.е. это признаки что аддон установлен
	urlOpener.setCheckUrls([
		"chrome-extension://ehapjibcchlieijdiembfopllbhcdmdm/pages/options/options.html"
	]);

	urlOpener.start();	
	
	chrome.windows.getCurrent(function(window) 	 {
		GetThemAll.Media.widthWin = window.width;		
		chrome.tabs.getSelected(window.id, function(tab) {
			chrome.tabs.getZoom(tab.id, function( z ) {
				GetThemAll.Media.scaleZoom = z;
			});	
			chrome.tabs.getZoomSettings(tab.id, function( z ) {
				console.log(z);
			});	
		});
		
	});
	
 	chrome.tabs.onZoomChange.addListener(function (zz) {
		chrome.tabs.getZoomSettings(zz.tabId, function( z ) {
			GetThemAll.Media.scaleZoom = z.defaultZoomFactor;
		});	
	}); 
	chrome.i18n.getAcceptLanguages(function(languages){
		if ( languages.indexOf("ru") != -1 ) {
			GetThemAll.Media.localUser = 'ru';
		}
		else {
			GetThemAll.Prefs.set( 'gta.display_vk_button', false );
		}		
	});
	
	// --------------------------------------------------------------------------------
	chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
		
			if (request.akse == 'Page_Options') {
				
				var params = {};
				for (var i = 0; i != request.list.length; i++) 	{
					var v = GetThemAll.Prefs.get( request.list[i] );
					if (v == 'true')  v = true;
					else if (v == 'false')  v = false;
					params[ request.list[i] ] = v;
				}

				var message = {};
				for (var i = 0; i != request.msg.length; i++) 	{
					message[request.msg[i]] =  chrome.i18n.getMessage(request.msg[i]);
				}
				
				sendResponse({paramsOptions: params,  paramsMessage: message});
			}
			else if (request.akse == 'Save_Options') {
				
				for ( var k in request.params ) {
					GetThemAll.Prefs.set( k, request.params[k].toString() );
				}
				
				sendResponse({});
			}	
			else if (request.akse == 'Close_Options') {
				
				chrome.tabs.query( {
						active: true,
						currentWindow: true
					}, function( tabs ){
								if( tabs.length > 0 )	{
									chrome.tabs.remove(tabs[0].id);
								}
				} );
			}	
			else if (request.action == 'SettingOptions') {
				
				display_settings(  );
			}	
	});	
	
	
}, false );

// ----------------------------
chrome.management.getAll(function(extensions){

        for (var i in extensions) {
            //if (extensions[i].enabled) 	{
				//if ( extensions[i].name.indexOf("Vines Compilation") != -1) {
					//GetThemAll.Prefs.set( "rate.display_instagram", false );
				//}	
            //}
			
			if ( extensions[i].name.indexOf("GTA Suggestions") != -1) {
				GetThemAll.Media.isGtaSuggestion = true;
			}	
        }

});
 
 

// -----------------------------------------------------------------
function show_suggestion(  )  {
	
	chrome.management.getAll(function(extensions){

		var fl = true;
	
        for (var i in extensions) {
		
            if (extensions[i].enabled) 	{
				if ( extensions[i].name.indexOf("GTA Suggestions") != -1) {
					fl = false;
				}	
            }
        }
		
		if (fl) {
			var	url = "http://gta-suggestion.fvdmedia.com/update";
			if( url )	{
				chrome.tabs.create({
							url: url,
							active: true
						});			
			}
		}

	});
	

}	

// ---------------------------------------- ОПЦИИ  --------------------------
function display_settings(  )  {

	chrome.tabs.query( 	{  }, function( tabs ){
		
					var myid = chrome.i18n.getMessage("@@extension_id");
		
					if( tabs.length > 0 )	{
						
						for (var i=0; i<tabs.length; i++) {
						
							if ( tabs[i].url.indexOf( "addon="+myid ) != -1 ) {	
								chrome.tabs.update( tabs[i].id, { active: true } );
								return;
							}
						}
						
						chrome.tabs.create( {	active: true,
												url: chrome.extension.getURL("/opt_page.html")
											}, function( tab ){ }
										);
					}
	} );
}

/* 
function display_settings(  )  {

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
*/


// --------------------------------------------------------


