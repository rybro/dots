var LPCFG={do_popup_actions:!0,popup_show_sitename_suffix:!0,popup_show_menu_expand_visual_cue:!0,g_do_icon_number_hint:!0,g_creditcard_profile_annotate:!0,g_visual_cue_on_hover:!0,RETRY_TIMEOUT_QUANTUM:30,__FINAL:0},LPIFRAMEVARS={g_genpws:[],g_myprefs:{},g_should_set_prefs:!0,g_sites:null,g_formfills:null,g_favicons:null,g_bigicons:null,g_genpwpattern:"",g_do_40fieldicon:!1,_FINAL:0},LPpop={create_popup_obj:function(a,d){function j(a){var b=0,c;for(c in a)b++;return b}if(do_experimental_popupfill){var c=
"undefined"!=typeof g_isfirefox&&g_isfirefox?"html:":"",b=null,e=null,l=null,p=null,p=a.createElement(c+"div");p.style.display="block";p.style.border="0";if(!p)return null;var g=e=null,m=e=null,h,r,f,q=0,l=0;LPCFG.popup_show_menu_expand_visual_cue&&(l=24);r="undefined"!=typeof measureText?measureText:LP_measureText;var t={};"undefined"!=typeof d.favicons&&(t=LPJSON.parse(d.favicons));e=a.createElement(c+"div");if(!e)return null;e.setAttribute("id","popupcontainer");p.appendChild(e);g=a.createElement(c+
"table");if(!g)return null;g.setAttribute("id","lptabpopup");e.appendChild(g);e=a.createElement(c+"div");if(!e)return null;e.setAttribute("id","popupcontainerff");p.appendChild(e);m=a.createElement(c+"table");if(!m)return null;m.setAttribute("id","lptabpopupformfills");m.style.display="none";e.appendChild(m);tbodyff=a.createElement(c+"tbody");tbodyff.setAttribute("id","lptbodyff");m.appendChild(tbodyff);if("undefined"==typeof d.sites)m=0;else for(f in h=LPpop.getAutoFillArray(a,LPJSON.parse(d.sites),
!0),m=j(h),h)if(h.hasOwnProperty(f)&&null!=h[f]&&null!=h[f].useusername){var n=h[f].useusername;0>=n.length&&(n=h[f].name);var s=n,b=a.createElement(c+"tr");if(!b)return null;b.setAttribute("id","trpopuprow"+lp_ofa(f));b.setAttribute("aid",h[f].aid);b.setAttribute("sitename",h[f].name);b.setAttribute("username",h[f].useusername);b.className="popuprow";LPIFRAMEVARS.g_do_40fieldicon&&(b.style.height="39px");g.appendChild(b);e=a.createElement(c+"td");if(!e)return null;e.setAttribute("id","tdpopuprow"+
lp_ofa(f));e.setAttribute("aid",lp_ofa(h[f].aid));b.appendChild(e);"undefined"!=typeof t[h[f].aid]&&(LPIFRAMEVARS.g_do_40fieldicon?(b=LPpop.gen_image_frag(a,LPpop.lookup_bigicon(h[f].aid)),b.width="88px",b.height="22px",b.style.width="88px",b.style.height="22px"):b=LPpop.gen_image_frag(a,LPpop.lookup_favicon(h[f].aid)),b&&e.appendChild(b));if(LPIFRAMEVARS.g_do_40fieldicon){var k=a.createElement(c+"div");k.style.position="absolute";k.style.display="inline-block";k.style.left="104px"}b=a.createElement(c+
"span");if(!b)return null;b.setAttribute("id","spanpopuprow"+lp_ofa(f));b.className="popcell shortenstr";LPIFRAMEVARS.g_do_40fieldicon&&(b.style.fontSize="11px",b.style.fontWeight="bold");LP_elt_set_text(b,n);LPIFRAMEVARS.g_do_40fieldicon?(k.appendChild(b),e.appendChild(k)):e.appendChild(b);LPCFG.popup_show_menu_expand_visual_cue&&(b=LPpop.visual_cue_frag(a,"expand",f))&&(LPIFRAMEVARS.g_do_40fieldicon?k.appendChild(b):e.appendChild(b));if(LPCFG.popup_show_sitename_suffix&&(b=LPpop.subscript_name_frag(a,
h[f].name)))LPIFRAMEVARS.g_do_40fieldicon?(b.style.paddingLeft=0,k.appendChild(b)):e.appendChild(b);e=r(a,s,null,"font-size: 14px;font-family: Helvetica,Arial,sans-serif;font-weight:bold;");e.width+20+l>q&&(q=e.width+20+l)}if("undefined"==typeof d.formfills)r=0;else{g=LPJSON.parse(d.formfills);r=j(g);for(h=0;1>=h;h++)for(f in g)if(g.hasOwnProperty(f)&&null!=g[f]&&null!=g[f].decprofilename&&null!=g[f].profiletype&&parseInt(g[f].profiletype)===h){b=a.createElement(c+"tr");if(!b)return null;b.setAttribute("id",
"trpopupffrow"+lp_ofa(f));b.setAttribute("ffid",g[f].ffid);b.setAttribute("profilename",g[f].decprofilename);b.setAttribute("formtype",h);""!=g[f].ccnum&&0==g[f].profiletype&&b.setAttribute("hascc","1");b.className="popuprow";tbodyff.appendChild(b);e=a.createElement(c+"td");if(!e)return null;e.setAttribute("id","tdpopupffrow"+lp_ofa(f));e.setAttribute("ffid",g[f].ffid);b.appendChild(e);"undefined"!=typeof t[g[f].ffid]&&(LPIFRAMEVARS.g_do_40fieldicon?(b=LPpop.gen_image_frag(a,LPpop.lookup_bigicon(g[f].ffid)),
b.width="88px",b.height="22px",b.style.width="88px",b.style.height="22px",b.style.backgroundColor="#666666"):b=LPpop.gen_image_frag(a,LPpop.lookup_favicon(g[f].ffid)),b&&e.appendChild(b));LPIFRAMEVARS.g_do_40fieldicon&&(k=a.createElement(c+"div"),k.style.position="absolute",k.style.display="inline-block",k.style.left="104px");s=g[f].decprofilename;b=a.createElement(c+"span");b.className="popcell shortenstr";b.setAttribute("id","spanpopupffrow"+lp_ofa(f));LPIFRAMEVARS.g_do_40fieldicon&&(b.style.fontSize=
"11px",b.style.fontWeight="bold");LP_elt_set_text(b,lp_of(g[f].decprofilename,a));LPIFRAMEVARS.g_do_40fieldicon?(k.appendChild(b),e.appendChild(k)):e.appendChild(b);LPCFG.g_creditcard_profile_annotate&&1==h&&(n=a.createElement(c+"span"),n.className="cc",LP_elt_set_text(n,"("+lpgs("Credit Card")+")"),b.appendChild(n),s+=lpgs("Credit Card"));LPCFG.popup_show_menu_expand_visual_cue&&(b=LPpop.visual_cue_frag(a,"expandff",f))&&(LPIFRAMEVARS.g_do_40fieldicon?k.appendChild(b):e.appendChild(b));e=measureText(a,
s,null,"font-size: 14px;font-family: Helvetica,Arial,sans-serif;font-weight:bold;");e.width+20+l>q&&(q=e.width+20+l)}}if(LPCFG.do_popup_actions){if(0<r){b=a.createElement(c+"tr");if(!b)return null;b.className="tablerow_sep";tbodyff.appendChild(b);e=a.createElement(c+"td");if(!e)return null;b.appendChild(e);l=a.createElement(c+"hr");if(!l)return null;e.appendChild(l)}}else if(0>=m&&0>=r)return null;300<q&&(q=300);g_popupfill_widest=q;return p}},visual_cue_frag:function(a,d,j){var c=null,b="undefined"!=
typeof g_isfirefox&&g_isfirefox?"html:":"";if(!d||!a)return null;if(LPCFG.popup_show_menu_expand_visual_cue){c=a.createElement(b+"span");if(!c)return null;c.setAttribute("id",d+lp_ofa(j));c.setAttribute("expander","true");c.className="expander";LPCFG.g_visual_cue_on_hover&&(c.style.display="none");LPIFRAMEVARS.g_do_40fieldicon&&(c.style.paddingRight="16px");if(a=LPpop.gen_image_frag(a,"arrow.png"))a.setAttribute("id",d+"img"+lp_ofa(j)),a.setAttribute("alt","+"),c.appendChild(a)}return c},subscript_name_frag:function(a,
d){var j=null;if(!a)return null;var c="undefined"!=typeof g_isfirefox&&g_isfirefox?"html:":"";d&&0<d.length&&(j=a.createElement(c+"p"),j.className="subtext",LP_elt_set_text(j,d),LPIFRAMEVARS.g_do_40fieldicon&&(j.className+=" shortenstr"));return j},gen_image_frag:function(a,d){if(!a)return null;var j="undefined"!=typeof g_isfirefox&&g_isfirefox?"html:":"",c=null;if(g_isfirefox){c=a.createElement("image");if(!c)return null;c.setAttribute("src",d);c.style.padding="2px"}else{c=a.createElement(j+"img");
if(!c)return null;c.setAttribute("src",d);c.style.padding="2px";c.setAttribute("alt","")}return c},set_icon_hint_from_data:function(a,d){function j(a){var b=0,c;for(c in a)b++;return b}if(LPCFG.g_do_icon_number_hint){var c,b;"undefined"==typeof d.sites?c=0:(c=LPpop.getAutoFillArray(a,LPJSON.parse(d.sites),!0),c=j(c));"undefined"==typeof d.formfills?b=0:(b=LPJSON.parse(d.formfills),b=j(b));g_icon_numbers.sites=c;g_icon_numbers.formfills=b}},getAutoFillArray:function(a,d,j){var c=[];a=punycode.URLToASCII(a.location.href);
lpcanonizeUrl(a);for(var b in d)if(!d[b].genpw||j)c[b]=d[b];return c},lookup_username:function(a){var d;if(LPIFRAMEVARS&&LPIFRAMEVARS.g_sites&&null!==a)for(d in LPIFRAMEVARS.g_sites)if(LPIFRAMEVARS.g_sites[d]&&LPIFRAMEVARS.g_sites[d].aid==a){a=LPIFRAMEVARS.g_sites[d];if(a.useusername)return a.useusername;if(a.unencryptedUsername)return a.unencryptedUsername;break}return""},lookup_sitename:function(a){var d;if(LPIFRAMEVARS&&LPIFRAMEVARS.g_sites&&null!==a)for(d in LPIFRAMEVARS.g_sites)if(LPIFRAMEVARS.g_sites[d]&&
LPIFRAMEVARS.g_sites[d].aid==a){a=LPIFRAMEVARS.g_sites[d];if(a.sitename)return a.sitename;if(a.name)return a.name;break}return""},lookup_profile:function(a){var d;if(LPIFRAMEVARS&&LPIFRAMEVARS.g_formfills&&null!==a)for(d in LPIFRAMEVARS.g_formfills)if(LPIFRAMEVARS.g_formfills[d]&&LPIFRAMEVARS.g_formfills[d].ffid==a){a=LPIFRAMEVARS.g_formfills[d];if(a.decprofilename)return a.decprofilename;if(a.decprofilename)return a.profilename;break}return""},lookup_favicon:function(a){if(LPIFRAMEVARS&&LPIFRAMEVARS.g_favicons&&
null!==a)return(a=LPIFRAMEVARS.g_favicons[a])?a:null},lookup_bigicon:function(a){if(LPIFRAMEVARS&&LPIFRAMEVARS.g_bigicons&&null!==a)return(a=LPIFRAMEVARS.g_bigicons[a])?a:null},__FINAL__:0};
