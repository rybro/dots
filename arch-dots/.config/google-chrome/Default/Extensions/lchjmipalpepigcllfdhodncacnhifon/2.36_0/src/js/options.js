$(document).ready(function(){$(".options_navigation_link").click(function(){toLink=$(this).attr("id").split("_link")[0];selectedPage=$(".navbar-item-selected").attr("id").split("_link")[0];if(toLink==selectedPage)return!0;$("#"+selectedPage+"_link").removeClass("navbar-item-selected");$("#"+toLink+"_link").addClass("navbar-item-selected");$("#"+selectedPage+"_page").removeClass("shown").addClass("hidden");$("#"+toLink+"_page").removeClass("hidden").addClass("shown");"supersecretabout"==toLink?$("body").css("background-color",
"#000"):$("body").css("background-color","transparent")});""==localStorage["ChromeLL-Config"]||void 0==localStorage["ChromeLL-Config"]?(console.log("Blank Config. Rebuilding"),options.getDefault(function(a){localStorage["ChromeLL-Config"]=a}),localStorage.chromeLL_userhighlight&&""!=localStorage.chromeLL_userhighlight?options.restoreV1():options.init()):options.init()});
var options={init:function(){console.log("loading config");var a=JSON.parse(localStorage["ChromeLL-Config"]),b=$(":checkbox"),d;for(d in b)b[d].checked=a[b[d].id];b=$(":text");for(d in b)b[d].name&&(b[d].name.match("(user|keyword|tag)_highlight_")||b[d].name.match("user_book")||b[d].name.match("snippet")||b[d].name.match("rep_ignore")||b[d].name.match("users")||b[d].name.match("token")||b[d].name.match("post_template"))||!a[b[d].id]||(b[d].value=a[b[d].id]);for(var c in a.user_highlight_data)document.getElementsByClassName("user_name")[document.getElementsByClassName("user_name").length-
1].value=c,document.getElementsByClassName("header_bg")[document.getElementsByClassName("header_bg").length-1].value=a.user_highlight_data[c].bg,document.getElementsByClassName("header_color")[document.getElementsByClassName("header_color").length-1].value=a.user_highlight_data[c].color,options.ui.addDiv.userHighlight();for(c in a.bookmark_data)document.getElementsByClassName("bookmark_name")[document.getElementsByClassName("bookmark_name").length-1].value=c,document.getElementsByClassName("bookmark_tag")[document.getElementsByClassName("bookmark_tag").length-
1].value=a.bookmark_data[c],options.ui.addDiv.bookmarkName();for(c in a.snippet_data)document.getElementsByClassName("snippet_name")[document.getElementsByClassName("snippet_name").length-1].value=c,document.getElementsByClassName("snippet")[document.getElementsByClassName("snippet").length-1].value=a.snippet_data[c],options.ui.addDiv.snippetName();for(c=0;a.keyword_highlight_data[c];c++)document.getElementsByClassName("keyword")[document.getElementsByClassName("keyword").length-1].value=a.keyword_highlight_data[c].match,
document.getElementsByClassName("keyword_bg")[document.getElementsByClassName("keyword_bg").length-1].value=a.keyword_highlight_data[c].bg,document.getElementsByClassName("keyword_color")[document.getElementsByClassName("keyword_color").length-1].value=a.keyword_highlight_data[c].color,options.ui.addDiv.keywordHighlight();for(c=0;a.tag_highlight_data[c];c++)document.getElementsByClassName("tag")[document.getElementsByClassName("tag").length-1].value=a.tag_highlight_data[c].match,document.getElementsByClassName("tag_bg")[document.getElementsByClassName("tag_bg").length-
1].value=a.tag_highlight_data[c].bg,document.getElementsByClassName("tag_color")[document.getElementsByClassName("tag_color").length-1].value=a.tag_highlight_data[c].color,options.ui.addDiv.tagHighlight();for(c in a.post_template_data)document.getElementsByClassName("template_text")[document.getElementsByClassName("template_text").length-1].value=a.post_template_data[c].text,document.getElementsByClassName("template_title")[document.getElementsByClassName("template_title").length-1].value=c,options.ui.addDiv.postTemplate();
document.getElementById("clear_notify").value=a.clear_notify;document.addEventListener("keyup",function(a){if(a.target.name){if("user_highlight_username"==a.target.name){for(var b=document.getElementById("user_highlight").getElementsByClassName("user_name"),c=!1,d=1;b[d];d++)""==b[d].value&&(c=!0);c||options.ui.addDiv.userHighlight()}if("user_book_name"==a.target.name){b=document.getElementById("bookmarked_tags").getElementsByClassName("bookmark_name");c=!1;for(d=1;b[d];d++)""==b[d].value&&(c=!0);
c||options.ui.addDiv.bookmarkName()}if("user_snippet"==a.target.name){b=document.getElementById("snippets").getElementsByClassName("snippet_name");c=!1;for(d=1;b[d];d++)""==b[d].value&&(c=!0);c||options.ui.addDiv.snippetName()}if("post_template_title"==a.target.name){b=document.getElementById("post_template").getElementsByClassName("template_title");c=!1;for(d=1;b[d];d++)""==b[d].value&&(c=!0);c||options.ui.addDiv.postTemplate()}if("keyword_highlight_keyword"==a.target.name){b=document.getElementById("keyword_highlight").getElementsByClassName("keyword");
c=!1;for(d=1;b[d];d++)""==b[d].value&&(c=!0);c||options.ui.addDiv.keywordHighlight()}if("tag_highlight_keyword"==a.target.name){b=document.getElementById("tag_highlight").getElementsByClassName("tag");c=!1;for(d=1;b[d];d++)""==b[d].value&&(c=!0);c||options.ui.addDiv.tagHighlight()}}});d=chrome.app.getDetails();document.getElementById("version").innerText=d.version;document.getElementById("downloadcfg").href=options.download();chrome.storage.local.getBytesInUse("imagemap",function(b){b/=1048576;document.getElementById("cache_size").innerHTML=
Math.round(100*b)/100});d=document.getElementById("fun_css_div");if(13547==a.user_id||5599==a.user_id)d.style.display="block";"loading"==document.readyState?document.addEventListener("DOMContentLoaded",function(){options.ui.hideUnusedMenus();options.ui.setColorPicker();options.listeners.menuVisibility();options.listeners.click();options.listeners.change();options.listeners.menuButton();options.ui.populateCacheTable();options.ui.displayLBContent();options.save()}):(options.ui.hideUnusedMenus(),options.ui.setColorPicker(),
options.listeners.menuVisibility(),options.listeners.click(),options.listeners.change(),options.listeners.menuButton(),options.ui.populateCacheTable(),options.ui.displayLBContent(),options.save())},functions:{cleanIgnorator:function(){var a=JSON.parse(localStorage["ChromeLL-Config"]);a.ignorator_backup=a.ignorator_list;for(var b=a.clean_ignorator,d=a.ignorator_list.split(","),c,e,g,h,f=1;d[f];f++)d[f]=d[f].trim();f={userList:[],removeBanned:""};f.userList=d;f.removeBanned=b;c=new XMLHttpRequest;c.open("POST",
"http://eti-stats.herokuapp.com/tools/api/clean_ignorator/",!0);c.setRequestHeader("Content-Type","application/json");c.onreadystatechange=function(){503==c.status?document.getElementById("ignorateinfo").innerText="eti-stats is down - try again later":4==c.readyState&&200==c.status&&(e=JSON.parse(c.responseText),g=e.userList,h=g.toString(),a.ignorator_list=h,localStorage["ChromeLL-Config"]=JSON.stringify(a),document.getElementById("ignorateinfo").innerText="ignorator cleaned - reloading page in 3 seconds...",
setTimeout(function(){location.reload()},3E3))};c.send(JSON.stringify(f));b=(new Date).getTime();a.last_clean=b;localStorage["ChromeLL-Config"]=JSON.stringify(a)},rateLimiter:function(){var a=JSON.parse(localStorage["ChromeLL-Config"]);if(""==a.ignorator_list)document.getElementById("ignorateinfo").innerText="no ignorator list found...";else if(a=(new Date).getTime()-a.last_clean,864E5<a)document.getElementById("ignorateinfo").innerText="running ignorator cleaner...",options.functions.cleanIgnorator();
else{var b=(864E5-a)/1E3,a=Math.floor(b/3600),d=Math.floor(b/60),c=d-60*a,b=Math.floor(b-60*d);1===a?a+=" hour, ":1!==a&&(a+=" hours, ");1===c?c+=" minute, and ":1!==c&&(c+=" minutes, and ");1===b?b+=" second.":1!==b&&(b+=" seconds.");document.getElementById("ignorateinfo").innerText="try again in "+a+c+b}},restoreIgnorator:function(){var a=JSON.parse(localStorage["ChromeLL-Config"]),b=a.ignorator_backup;confirm("Are you sure you want to restore last ignorator backup?")&&(""==b?document.getElementById("ignorateinfo").innerHTML=
"no backup found...":b==a.ignorator_list?document.getElementById("ignorateinfo").innerHTML="current list and backup are identical...":(a.ignorator_list=b,localStorage["ChromeLL-Config"]=JSON.stringify(a),document.getElementById("ignorateinfo").innerHTML="backup restored - reloading page in 3 seconds...",setTimeout(function(){location.reload()},3E3)))},ignoratorClick:function(){var a=document.getElementById("ignorator");document.getElementById("ignorator_messagelist").checked=a.checked;document.getElementById("ignorator_topiclist").checked=
a.checked;options.save()},highlightClick:function(){var a=document.getElementById("enable_user_highlight");document.getElementById("userhl_messagelist").checked=a.checked;document.getElementById("userhl_topiclist").checked=a.checked;options.save()},downloadClick:function(){document.getElementById("downloadcfg").click()},restoreClick:function(){document.getElementById("restorecfg").click()},showTextarea:function(){document.getElementById("old_cfg_options").style.display="none";document.getElementsByClassName("old_cfg_options")[0].style.display=
"inline";options.show()},processConfig:function(a){try{"string"===typeof a?newCfg=JSON.parse(a):""!=document.getElementById("cfg_ta").value&&(newCfg=JSON.parse(document.getElementById("cfg_ta").value));var b=JSON.parse(localStorage["ChromeLL-Config"]),d;for(d in newCfg)b[d]=newCfg[d];b.last_saved=(new Date).getTime();localStorage["ChromeLL-Config"]=JSON.stringify(b)}catch(c){console.log("This doesnt look like a config",c),a=options.functions.decodeBase64(document.getElementById("cfg_ta").value),options.restoreV1(a)}location.reload()},
resetConfig:function(){!0===confirm("Are you sure you want to reset your settings?")&&options.getDefault(function(a){localStorage["ChromeLL-Config"]=a;location.reload()})},decodeBase64:function(){var a={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",decode:function(b){var d="",c,e,g,h,f,k=0;for(b=b.replace(/[^A-Za-z0-9\+\/\=]/g,"");k<b.length;)c=this._keyStr.indexOf(b.charAt(k++)),e=this._keyStr.indexOf(b.charAt(k++)),h=this._keyStr.indexOf(b.charAt(k++)),f=this._keyStr.indexOf(b.charAt(k++)),
c=c<<2|e>>4,e=(e&15)<<4|h>>2,g=(h&3)<<6|f,d+=String.fromCharCode(c),64!=h&&(d+=String.fromCharCode(e)),64!=f&&(d+=String.fromCharCode(g));return d=a._utf8_decode(d)},_utf8_decode:function(b){for(var a="",c=0,e=c1=c2=0;c<b.length;)e=b.charCodeAt(c),128>e?(a+=String.fromCharCode(e),c++):191<e&&224>e?(c2=b.charCodeAt(c+1),a+=String.fromCharCode((e&31)<<6|c2&63),c+=2):(c2=b.charCodeAt(c+1),c3=b.charCodeAt(c+2),a+=String.fromCharCode((e&15)<<12|(c2&63)<<6|c3&63),c+=3);return a}};return JSON.parse(a.decode(config))},
sortCache:function(a){if("default"===a)options.ui.populateCacheTable(a);else{var b=[],d=[],c={},e={};options.cache.restore(function(g){g=g.imagemap;if("filetype"===a){e.none=[];e[".gif"]=[];e[".jpg"]=[];e[".png"]=[];for(var h in g){var f=g[h].filename,k=f.match(/\.(gif|jpg|png)$/i);k?e[k[0]].push(f):e.none.push(f)}for(var l in e){if(e[l]===[])return;b=b.concat(e[l])}}else{for(h in g)f=g[h].filename,b.push(f);b.sort();"z_a"===a&&b.reverse()}l=0;for(f=b.length;l<f;l++)for(h in k=b[l],g)g[h].filename!=
k||c[h]||(d.push(h),c[h]={filename:k,index:l});options.ui.populateCacheTable(d)})}},searchCache:function(){var a=document.getElementById("imagemap_search").value,b=[],d={};/\S/.test(a)?options.cache.restore(function(c){c=c.imagemap;for(var e in c){var g=c[e].filename;!d[e]&&-1<g.indexOf(a)&&(b.push(e),d[e]=g)}options.ui.populateCacheTable(b)}):options.ui.populateCacheTable("default")},emptyCache:function(){chrome.storage.local.remove("imagemap",function(){console.log("Cleared imagemap cache.");location.reload()})},
newLike:function(){options.ui.closeMenu();var a=document.getElementById("like_ta"),b=document.getElementsByClassName("active_like")[0],d=JSON.parse(localStorage["ChromeLL-Config"]),c=d.custom_like_data;b.id.match(/[0-9]+/);var e=1,g;for(g in c)c=parseInt(g.match(/[0-9]+/)[0],10),c>e&&(e=c);var h=e+1,f="like"+h;d.custom_like_data[f]={};d.custom_like_data[f].name="Untitled "+h;d.custom_like_data[f].contents="";e=document.getElementById("like_list");g=document.createElement("a");c=document.createElement("br");
g.href="#";g.id=f;g.className="active_like";g.innerHTML="Untitled "+h;h=document.createElement("a");h.style.cssFloat="right";h.style.fontSize="18px";h.href="#";h.style.textDecoration="none";h.id="delete_custom";h.innerHTML="&#10006;";g.appendChild(h);e.appendChild(g);e.appendChild(c);b.className="";a.value="";localStorage["ChromeLL-Config"]=JSON.stringify(d)},saveLike:function(){var a=JSON.parse(localStorage["ChromeLL-Config"]);options.ui.closeMenu();var b=document.getElementsByClassName("active_like")[0],
d=document.getElementById("like_ta").value,c=b.firstChild.innerText,e=b.id,g=prompt("Rename?",c);g||(g=c);b.firstChild.nodeValue=g;a.custom_like_data[e]={};a.custom_like_data[e].name=g;a.custom_like_data[e].contents=d;a.custom_like_data[e].last_saved=Date.now();localStorage["ChromeLL-Config"]=JSON.stringify(a)},deleteFromConfig:function(a){function b(a){for(var b in a)a[c+1]=a[b],b!==c+1&&delete a[b]}var d=JSON.parse(localStorage["ChromeLL-Config"]),c=a.replace(/[0-9]/g,"");document.getElementsByClassName("active_"+
c);document.getElementsByClassName("inactive_"+c);"like"==c?(delete d.custom_like_data[a],b(d.custom_like_data)):"script"==c&&(delete d.userscript_data[a],b(d.userscript_data));a=document.getElementById(a);a.className=="active_"+c&&(document.getElementsByClassName("inactive_"+c)[0].className="active_"+c,a.className="");var e=a.childNodes[0];a.remove();e.remove();localStorage["ChromeLL-Config"]=JSON.stringify(d)}},listeners:{click:function(){var a={ignorator:"ignoratorClick",enable_user_highlight:"highlightClick",
loadcfg:"processConfig",resetcfg:"resetConfig",forceignorator:"cleanIgnorator",restoreignorator:"restoreIgnorator",downloadbutton:"downloadClick",restorebutton:"restoreClick",old_cfg_options:"showTextarea",cache_empty:"emptyCache",script_new:"newScript",script_save:"saveScript",like_new:"newLike",like_save:"saveLike"};document.addEventListener("click",function(b){var d=b.target.id;a[d]&&(options.functions[a[d]](),"INPUT"!==b.target.tagName&&b.preventDefault());if(b.target.parentNode.id.match(/_list/)&&
"delete"!=b.target.className){var d=b.target.id.replace(/[0-9]/g,""),c=b.target,e=document.getElementsByClassName("active_"+d)[0];e&&(e.className="");c.className="active_"+d;options.ui.switchActive(b.target.id);b.preventDefault()}else"delete_custom"==b.target.id&&(options.functions.deleteFromConfig(b.target.parentNode.id),b.preventDefault())})},change:function(){var a=document.getElementById("restorecfg"),b=document.getElementById("cache_contents"),d=document.getElementById("cache_sort");document.getElementById("script_ta");
var c,e,g;a.addEventListener("change",function(a){options.restoreFromText(a)});b.addEventListener("keyup",function(a){var b=a.target.value;(a=a.target.id)&&b&&(options.cache.data[a]=b);clearTimeout(e);e=setTimeout(options.cache.save,500)});d.addEventListener("change",function(a){a.target.value&&options.functions.sortCache(a.target.value)});document.addEventListener("change",options.save);document.addEventListener("keyup",function(a){"imagemap_search"==a.target.id?(clearTimeout(g),g=setTimeout(options.functions.searchCache,
500)):(clearTimeout(c),c=setTimeout(options.save,500))})},menuVisibility:function(){for(var a=["history_menubar","context_menu","dramalinks","user_info_popup"],b=0,d=a.length;b<d;b++)document.getElementById(a[b]).addEventListener("change",options.ui.hideUnusedMenus)},menuButton:function(){var a=[];a.push(document.getElementById("like_menu"));for(var b=0,d=a.length;b<d;b++){var c=a[b];c.addEventListener("click",function(a){"script_menu"==a.target.id?options.userscriptsMenu.open():"like_menu"==a.target.id&&
options.customLikeMenu.open()});c.addEventListener("mouseleave",function(){options.ui.closeMenu()})}}},ui:{hideUnusedMenus:function(){var a={history_menubar:"history_options",context_menu:"context_options",dramalinks:"dramalinks_options",user_info_popup:"doubleclick_options"},b;for(b in a){var d=document.getElementById(b),c=document.getElementById(a[b]);d.checked?c.style.display="initial":c.style.display="none"}},closeMenu:function(){var a=document.getElementById("menu_items");a&&a.remove()},setColorPicker:function(){$(".color").ColorPicker({onChange:function(a,
b,d,c){c.value=b;options.save()},onSubmit:function(a,b,d,c){$(c).val(b);$(c).ColorPickerHide();options.save()},livePreview:!0,color:"",onBeforeShow:function(){$(this).ColorPickerSetColor(this.value)}})},populateCacheTable:function(a){var b=document.getElementById("cache_contents"),d=document.getElementById("loading_img");if(a&&"default"!==a){b.style.display="none";d.style.display="block";for(var c=b.childNodes,e=c.length-1;1<e;e--)b.removeChild(c[e]);options.cache.restore(function(c){c=c.imagemap;
for(var e=0,f=a.length;e<f;e++){var k=c[a[e]],l=document.createElement("tr"),m=document.createElement("td"),q=document.createElement("td"),n=k.filename,p=k.fullsize,r=100<p.length?p.substring(0,99)+"...":p,k=k.data;l.id=e;m.innerHTML='<input type="text" class="cache_filenames" id="'+e+'" value="'+n+'" style="width:400px;">';q.innerHTML='<a class="cache_url" title="'+p+'" href="'+k+'">'+r+"</a>";b.appendChild(l);l.appendChild(m);l.appendChild(q)}d.style.display="none";b.style.display="block"})}else options.cache.restore(function(c){if(c=
c.imagemap){if("default"==a){b.style.display="none";d.style.display="block";for(var e=b.childNodes,f=e.length-1;1<f;f--)b.removeChild(e[f])}for(f in c){var k=c[f],e=document.createElement("tr"),l=document.createElement("td"),m=document.createElement("td"),q=k.filename,n=k.fullsize,p=80<n.length?n.substring(0,80)+"...":n,k=k.data;e.id=f;l.innerHTML='<input type="text" class="cache_filenames" id="'+f+'" value="'+q+'" style="width:400px;">';m.innerHTML='<a class="cache_url" title="'+n+'" href="'+k+'">'+
p+"</a>";b.appendChild(e);e.appendChild(l);e.appendChild(m)}d.style.display="none";b.style.display="block"}else f=document.createElement("tr"),f.innerHTML="Empty",b.appendChild(f)})},displayLBContent:function(){var a=JSON.parse(localStorage["ChromeLL-Config"]),b=a.custom_like_data,d=document.getElementById("like_ta"),c=document.getElementById("like_list"),e=0,g="",h;for(h in b){var f=b[h];f.last_saved>e&&(e=f.last_saved,g=h);var k=document.createElement("a"),l=document.createElement("a"),m=document.createElement("br");
k.href="#";k.className="inactive_like";k.id=h;k.innerText=f.name;l.style.cssFloat="right";l.style.fontSize="18px";l.href="#";l.style.textDecoration="none";l.id="delete_custom";l.innerHTML="&#10006;";c.appendChild(k);k.appendChild(l);c.appendChild(m)}document.getElementById(g).className="active_like";d.value=a.custom_like_data[g].contents},switchActive:function(a){var b=JSON.parse(localStorage["ChromeLL-Config"]),d=a.replace(/[0-9]/g,""),c=document.getElementById(d+"_ta"),e;"script"==d?e=b.userscript_data[a].contents:
"like"==d&&(e=b.custom_like_data[a].contents);script&&(c.value=e)},addDiv:{userHighlight:function(){var a=document.getElementById("user_highlight").getElementsByClassName("user_name")[0].parentNode.parentNode.cloneNode(!0);a.className="user_highlight_data";a.style.display="block";document.getElementById("user_highlight").insertBefore(a,null);options.ui.setColorPicker()},bookmarkName:function(){var a=document.getElementById("bookmarked_tags").getElementsByClassName("bookmark_name")[0].parentNode.parentNode.cloneNode(!0);
a.className="bookmark_data";a.style.display="block";document.getElementById("bookmarked_tags").insertBefore(a,null)},snippetName:function(){var a=document.getElementById("snippets").getElementsByClassName("snippet_name")[0].parentNode.parentNode.cloneNode(!0);a.className="snippet_data";a.style.display="block";document.getElementById("snippets").insertBefore(a,null)},keywordHighlight:function(){var a=document.getElementById("keyword_highlight").getElementsByClassName("keyword")[0].parentNode.parentNode.cloneNode(!0);
a.className="keyword_highlight_data";a.style.display="block";document.getElementById("keyword_highlight").insertBefore(a,null);options.ui.setColorPicker()},tagHighlight:function(){var a=document.getElementById("tag_highlight").getElementsByClassName("tag")[0].parentNode.parentNode.cloneNode(!0);a.className="tag_highlight_data";a.style.display="block";document.getElementById("tag_highlight").insertBefore(a,null);options.ui.setColorPicker()},postTemplate:function(){var a=document.getElementById("post_template").getElementsByClassName("template_text")[0].parentNode.parentNode.cloneNode(!0);
a.className="post_template_data";a.style.display="block";document.getElementById("post_template").insertBefore(a,null)}}},cache:{save:function(){var a=options.cache.data;options.cache.restore(function(b){b=b.imagemap;for(var d in a)b[d].filename=a[d];chrome.storage.local.set({imagemap:b},function(){console.log("Cache updated:",a)})})},restore:function(a){chrome.storage.local.get("imagemap",function(b){b&&a(b)})},data:{}},customLikeMenu:{open:function(){var a=document.getElementById("like_menu"),b=
document.createElement("span"),d=["New","Save"];b.id="menu_items";b.style.position="absolute";b.style.overflow="auto";b.style.padding="3px 3px";b.style.borderStyle="solid";b.style.borderWidth="2px";b.style.borderRadius="3px";for(var c=0,e=d.length;c<e;c++){var g=d[c],h=b,f=document.createElement("span"),k=document.createElement("anchor"),l=document.createElement("br");f.className="unhigh_span";k.innerHTML="&nbsp"+g+"&nbsp";k.href="#";k.className="like_menu_items";k.id="like_"+g.toLowerCase();f.appendChild(k);
h.appendChild(f);h.appendChild(l)}a.appendChild(b)}},getDefault:function(a){var b=chrome.extension.getURL("/src/json/defaultconfig.json"),d,c,e=new XMLHttpRequest;e.open("GET",b,!0);e.onreadystatechange=function(){4==e.readyState&&200==e.status&&(d=JSON.parse(e.responseText),c=JSON.stringify(d),a(c))};e.send()},save:function(){var a=JSON.parse(localStorage["ChromeLL-Config"]);inputs=$(":checkbox");for(var b in inputs)a[inputs[b].id]=inputs[b].checked;var d=$(":text");for(b in d){var c=d[b];c.className&&
"cache_filenames"==c.className||c.id&&c.id.match(/imagemap_|script_/)||(a[c.id]=c.value)}d=document.getElementById("user_highlight").getElementsByClassName("user_highlight_data");a.user_highlight_data={};for(b=0;d[b];b++)c=d[b].getElementsByClassName("user_name")[0].value.toLowerCase(),""!=c&&(a.user_highlight_data[c]={},a.user_highlight_data[c].bg=d[b].getElementsByClassName("header_bg")[0].value,d[b].getElementsByClassName("user_name")[0].style.background="#"+a.user_highlight_data[c].bg,a.user_highlight_data[c].color=
d[b].getElementsByClassName("header_color")[0].value,d[b].getElementsByClassName("user_name")[0].style.color="#"+a.user_highlight_data[c].color);d=document.getElementById("bookmarked_tags").getElementsByClassName("bookmark_data");a.bookmark_data={};for(b=0;d[b];b++)c=d[b].getElementsByClassName("bookmark_name")[0].value,""!=c&&(a.bookmark_data[c]=d[b].getElementsByClassName("bookmark_tag")[0].value);d=document.getElementById("snippets").getElementsByClassName("snippet_data");a.snippet_data={};for(b=
0;d[b];b++)c=d[b].getElementsByClassName("snippet_name")[0].value,c=c.trim(),""!=c&&(a.snippet_data[c]=d[b].getElementsByClassName("snippet")[0].value);d=document.getElementById("keyword_highlight").getElementsByClassName("keyword_highlight_data");a.keyword_highlight_data={};var e=0;for(b=0;d[b];b++)c=d[b].getElementsByClassName("keyword")[0].value.toLowerCase(),""!=c&&(a.keyword_highlight_data[e]={},a.keyword_highlight_data[e].match=c,a.keyword_highlight_data[e].bg=d[b].getElementsByClassName("keyword_bg")[0].value,
d[b].getElementsByClassName("keyword")[0].style.background="#"+a.keyword_highlight_data[e].bg,a.keyword_highlight_data[e].color=d[b].getElementsByClassName("keyword_color")[0].value,d[b].getElementsByClassName("keyword")[0].style.color="#"+a.keyword_highlight_data[e].color,e++);d=document.getElementById("tag_highlight").getElementsByClassName("tag_highlight_data");a.tag_highlight_data={};for(b=e=0;d[b];b++)c=d[b].getElementsByClassName("tag")[0].value.toLowerCase(),""!=c&&(a.tag_highlight_data[e]=
{},a.tag_highlight_data[e].match=c,a.tag_highlight_data[e].bg=d[b].getElementsByClassName("tag_bg")[0].value,d[b].getElementsByClassName("tag")[0].style.background="#"+a.tag_highlight_data[e].bg,a.tag_highlight_data[e].color=d[b].getElementsByClassName("tag_color")[0].value,d[b].getElementsByClassName("tag")[0].style.color="#"+a.tag_highlight_data[e].color,e++);d=document.getElementById("post_template").getElementsByClassName("post_template_data");a.post_template_data={};for(b=0;d[b];b++)c=d[b].getElementsByClassName("template_title")[0].value,
""!=c&&(a.post_template_data[c]={},a.post_template_data[c].text=d[b].getElementsByClassName("template_text")[0].value);a.clear_notify=document.getElementById("clear_notify").value;a.last_saved=(new Date).getTime();localStorage["ChromeLL-Config"]=JSON.stringify(a);allBg.init_listener(a)},restoreFromText:function(a){a=a.target.files[0];if(a.type.match("text.*")){var b=new FileReader;b.onload=function(a){options.functions.processConfig(a.target.result)};b.readAsText(a)}else alert("Not a text file...")},
restoreV1:function(a){var b=JSON.parse(localStorage["ChromeLL-Config"]),d=a.conf.chromeLL_userhighlight.split(";"),c=[];b.user_highlight_data={};for(var e=0;d[e];e++)c=d[e].split(":"),console.log(c[0]),b.user_highlight_data[c[0]]={},b.user_highlight_data[c[0]].bg=c[1],b.user_highlight_data[c[0]].color=c[3];d={force_https:"chromeLL_forcehttps",short_title:"chromeLL_shorttitle",float_userbar:"chromeLL_floatbars",ignorator:"chromeLL_ignoretopicsbyon",ignorator_list:"chromeLL_ignoretopicsby",enable_user_highlight:"chromeLL_userhighlighton",
number_posts:"chromeLL_numberposts",enable_user_highlight:"chromeLL_userhighlighton"};for(e in d)"true"==a.conf[e]&&(b[e]=!0);b.ignorator_list=a.conf.chromeLL_ignoretopicsby;b.ignore_keyword_list=a.conf.chromeLL_ignoretopics;b.last_saved=(new Date).getTime();console.log(b);localStorage["ChromeLL-Config"]=JSON.stringify(b)},show:function(){document.getElementById("cfg_ta").value=localStorage["ChromeLL-Config"]},download:function(a){options.save();a=new Blob([localStorage["ChromeLL-Config"]],{type:"text/plain"});
return a=window.URL.createObjectURL(a)},debouncer:""};
