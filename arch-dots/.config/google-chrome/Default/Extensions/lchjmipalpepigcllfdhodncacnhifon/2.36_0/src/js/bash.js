var bash_functions={addListeners:function(){var a=[],c,b,f,d;document.addEventListener("contextmenu",function(a){d=window.getSelection().toString();for(b=a.target;(b=b.parentNode)&&"message-container"!==b.className&&b!==document.body;);c=b.firstChild;f=b.getElementsByClassName("quoted-message")});chrome.runtime.onMessage.addListener(function(e,h,g){"get_bash"==e.action&&(a=bash_functions.checkMessages(f,b,c,d),g({data:a}))})},checkMessages:function(a,c,b,f){var d=[],e,h,g;if(0<a.length){for(var k=
0,l=a.length;k<l;k++){e=a[k];h=e.getElementsByClassName("message-top");g=bash_functions.getMessage(e,a,h,k);if(-1<g.indexOf(f))return d[0]=bash_functions.getUsername(e.getElementsByClassName("message-top")[0]),d[1]=bash_functions.getURL(b),d;d[0]=null}e=c.getElementsByClassName("message")[0];g=bash_functions.getMessage(e,a,h,-1);-1<g.indexOf(f)?(d[0]=bash_functions.getUsername(b),d[1]=bash_functions.getURL(b)):d[0]=null}else 0===a.length&&(g=bash_functions.getMessage(c),-1<g.indexOf(f)?(d[0]=bash_functions.getUsername(b),
d[1]=bash_functions.getURL(b)):d[0]=null);return d},getUsername:function(a){var c=a.getElementsByTagName("a")[0].innerHTML;if("Filter"==c||"\u21d7"==c)c=a.innerHTML.match(/(Human\s#)([0-9]+)/)[0];return c},getURL:function(a){a=a.getElementsByTagName("a");for(var c,b=0,f=a.length;b<f;b++)if(c=a[b],-1<c.innerHTML.indexOf("Message Detail"))return c.href},getMessage:function(a,c,b,f){if(c){a=a.innerText;for(var d,e=0,h=b.length;e<h;e++)d=b[e],a=a.replace(d.innerText,""),e!==f&&(d=c[e].innerText.replace(d.innerText,
""),a=a.replace(d,""))}else a=a.innerText;c=a.lastIndexOf("---");-1<c&&(a=a.substring(0,c));a=a.replace("[quoted text omitted]","");return a.trim()},init:function(){chrome.runtime.sendMessage({need:"config"},function(a){config=a.data;config.eti_bash&&bash_functions.addListeners()})}};bash_functions.init();