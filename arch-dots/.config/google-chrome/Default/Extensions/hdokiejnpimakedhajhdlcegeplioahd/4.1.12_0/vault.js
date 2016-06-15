LPVault={};
(function(d,b,za){var Aa=Strings.translateString("Folder (a-z)"),Ba=Strings.translateString("Folder (z-a)"),w=Strings.translateString("Name (a-z)"),x=Strings.translateString("Name (z-a)"),N=Strings.translateString("Most Recent"),Ca=Strings.translateString("Sender (a-z)"),Da=Strings.translateString("Sender (z-a)"),Ea=Strings.translateString("Recipient (a-z)"),Fa=Strings.translateString("Recipient (z-a)"),G=[Aa,Ba,w,x,N],gb=[w,x],hb=[w,x,Ea,Fa,N],ib=[w,x,Ca,Da,N],jb=[w,x],kb=[w,x],l=function(a){this.options=a};
l.prototype.getAddElement=function(){void 0===this.addElement&&(this.addElement=LPTools.createElement("div","addMenuItem"),this.build(this.addElement,this.options.icon?this.options.icon:"images/vault_4.0/Add.png"));return this.addElement};l.prototype.build=function(a,c){a.appendChild(LPTools.createElement("span",null,Strings.Vault[this.options.text]));var b=LPTools.createElement("div"),g=LPTools.createElement("div"),q=LPTools.createElement("img",{src:c});a.appendChild(b);b.appendChild(g);g.appendChild(q);
$(a).bind("click",this.options.func)};l.prototype.getMenuElement=function(){void 0===this.menuElement&&(this.menuElement=LPTools.createElement("li","addMenuItem"),this.build(this.menuElement,this.options.additionalIcon));return this.menuElement};var mb=new l({text:"ADD_SITE",icon:"images/vault_4.0/Sites_Active.png",func:function(){b.openSiteDialog()}}),ea=new l({text:"ADD_NOTE",icon:"images/vault_4.0/Notes_Active.png",additionalIcon:"images/vault_4.0/Add_Secure_Note.png",func:function(){b.openNoteDialog()}}),
nb=new l({text:"ADD_FORM_FILL",icon:"images/vault_4.0/Form_Fills_Active.png",func:function(){b.openFormFillDialog()}}),ob=new l({text:"ADD_SHARED_FOLDER",func:function(){b.openCreateSharedFolderDialog()}}),pb=new l({text:"ADD_IDENTITY",func:function(){b.openIdentityDialog()}}),qb=new l({text:"GIVE_EMER_ACCESS",func:function(){dialogs.addEmergencyAccess.open()}}),rb=new l({text:"ADD_CREDIT_MON",func:function(){b.openCreateCreditMonitoringDialog()}}),Ga=new l({text:"ADD_FOLDER",additionalIcon:"images/vault_4.0/Add_Folder.png",
func:function(){b.openFolderDialog()}}),H=new l({text:"SHARE_ITEMS",additionalIcon:"images/vault_4.0/Add_Share.png",func:function(){b.openShareDialog()}}),sb=Strings.translateString("search my vault"),m=null,fa=$("#advacedOptionsOverlay"),tb=$("#inProgressOverlay"),O=$("#tools"),ub=$("#options"),n=$("#mainScroll"),t=$("#addMenu"),Ha=$("#addMenuItems"),Ia=$("#addMenuButton"),Ja=$("#addMenuButtonCustom"),Ka=$("#gridButton"),La=$("#listButton"),P=$("#collapseAllToggle"),Q=$("#sizeToggle"),Ma=$("#orderOption"),
Na=$("#sortOrderMenu"),vb=$("#sortOrderOption"),ga=$("#userMenuItems"),D=$("#leftMenuMinimizeButton"),Oa=$("#moreActions"),Pa=d.getElementById("contextMenu").parentElement,h=$(d.body),ha=$("#advancedMenuItem"),ia=d.getElementById("sortOrderMenu").children[0],p=$("#vaultSearch"),Qa=$("#userMenuContainer"),wb=$("#pageTitle"),R=null,y=null,S=!0,u=null,r=null,f=null,Ra=function(a,c){f.getContainer()===c&&(f.removeBodyState(),f.addBodyState())},e=function(a){a=a||{};this.state=a.bodyState;this.menuElement=
a.menuElement||null;this.groupMenuElement=a.groupMenuElement||null;this.emptyState=this.state+"Empty";this.container=null;this.sortOptions=a.sortOptions||null;this.persistent=LPTools.getOption(a,"persistent",!0);this.searchPlaceholder=LPTools.getOption(a,"searchPlaceholder",sb);this.title=a.title||"";this.addMenu=a.addMenu;this.additionalOptionButtons=a.additionalOptionButtons;this.scrollParent=a.scrollParent;var c=this;Topics.get(Topics.CLEAR_DATA).subscribe(function(){c.clear()});a.menuElement&&
a.menuElement.bind("click",function(a){return a?function(){b[a].apply(b)}:function(){c.show()}}(a.viewFunction))};e.prototype.applyContainerFunction=function(a){var c=this.getContainer();if(null!==c)switch(typeof a){case "string":var b=[];if(1<arguments.length)for(var g=1,q=arguments.length;g<q;++g)b.push(arguments[g]);return c[a].apply(c,b);case "function":return a(c)}};e.prototype.getSortOptions=function(){return this.sortOptions};e.prototype.getContainer=function(){return this.container};e.prototype.setContainer=
function(a,c){if(this.container=a)a._buildOptions.stateChangeCallback=Ra,LPTools.getOption(c,"checkForStateChange",!0)&&f===this&&Ra(a.isEmpty(),a),f===this&&""!==p.val()&&b.search(p.val())};e.prototype.openAll=function(){this.applyContainerFunction("openAll")};e.prototype.collapseAll=function(){this.applyContainerFunction("collapseAll")};e.prototype.createSelectionContextMenu=function(){return this.applyContainerFunction("createSelectionContextMenu")};e.prototype.isEmpty=function(){return this.applyContainerFunction("isEmpty")};
e.prototype.search=function(a){var c=this.applyContainerFunction("applySearch",a);a&&null===c&&!this.isEmpty()?h.addClass("searchEmpty"):h.removeClass("searchEmpty")};e.prototype.clearSelected=function(){this.applyContainerFunction("clearSelected")};e.prototype.getSelectedItems=function(){return this.applyContainerFunction("getSelectedItems")};e.prototype.getSortOrder=function(){void 0===this.sortOrder&&(this.sortOrder=LPProxy.getPreference(this.state+"SortOrder",this.sortOptions?this.sortOptions[0]:
null));return this.sortOrder};e.prototype.setSortOrder=function(a){this.sortOrder=a;LPProxy.setPreferences(this.state+"SortOrder",a)};e.prototype.addBodyState=function(){h.addClass(this.getState());var a=this.getContainer();null!==a&&a.isEmpty()?h.addClass("empty"):h.removeClass("empty")};e.prototype.removeBodyState=function(){h.removeClass(this.emptyState);h.removeClass(this.state)};e.prototype.hide=function(){null!==this.menuElement&&this.menuElement.removeClass("selected");null!==this.groupMenuElement&&
this.groupMenuElement.removeClass("selected");this.removeBodyState();if(this.additionalOptionButtons)for(var a=0,c=this.additionalOptionButtons.length;a<c;++a)this.additionalOptionButtons[a].detach();this.persistent?this.applyContainerFunction("hide"):this.clear()};e.prototype.getAddMenuItems=function(){var a=[];if(this.addMenu&&0<this.addMenu.length)for(var c=0,b=this.addMenu.length;c<b;++c){var g=this.addMenu[c];if(g!==H||LPFeatures.allowIndividualSharing())(g!==ea||LPFeatures.allowNotes())&&a.push(g)}return a};
e.prototype.show=function(){if(f!==this){null!==f&&(p.val(""),z(),f.hide());p.attr("placeholder",this.searchPlaceholder);null!==this.menuElement&&this.menuElement.addClass("selected");null!==this.groupMenuElement&&this.groupMenuElement.addClass("selected");wb.text(this.title);this.addBodyState();this.scrollParent.scrollTop(0);var a=this.getSortOptions();if(null===f||f.getSortOptions()!==a)if(null!==a){LPTools.removeDOMChildren(ia);for(var c=0,lb=a.length;c<lb;++c){var g=d.createElement("li"),q=a[c];
g.textContent=q;LPPlatform.addEventListener(g,"click",xb(q));ia.appendChild(g)}Ma.show()}else Ma.hide();f=this;(a=this.getSortOrder())&&b.sort(a);this.additionalOptionButtons&&ub.append(this.additionalOptionButtons);Ha.children().detach();Ja.children().detach();a=this.getAddMenuItems();if(0<a.length){Ja.append(a[0].getAddElement());for(c=a.length-1;0<c;--c)Ha.append(a[c].getMenuElement());Ia.show()}else Ia.hide()}};e.prototype.getState=function(){return this.isEmpty()?this.emptyState:this.state};
e.prototype.clear=function(){this.container&&(this.container.destruct(),this.container=null)};var k=function(a){a.bodyState=a.bodyState||a.contentID;e.call(this,a);this.contentElement=d.getElementById(a.contentID);this.containerType=a.containerType;this.dataSource=a.dataFunction;this.buildOptions=a.buildOptions;this.filter=a.filter;var c=this;Topics.get(Topics.IDENTITY_ENABLE).subscribe(function(a){c.refresh(a)});c.initializeCallback=function(a,b){var q=new c.containerType(a,c.buildOptions);q.initialize(c.contentElement,
c.scrollParent);c.filter&&q.applyFilter(c.filter,{checkForStateChange:!1});c.setContainer(q,{checkForStateChange:LPTools.getOption(b,"checkForStateChange",!1)});Topics.get(Topics.DIALOG_LOADED).publish()}};k.prototype=Object.create(e.prototype);k.prototype.constructor=k;k.prototype.makeDataRequest=function(a,c){c.error=function(){Topics.get(Topics.DIALOG_LOADED).publish()};LPRequest.makeDataRequest(a,c)};k.prototype.initialize=function(a,c){if(null===this.container&&null!==this.containerType&&null!==
this.dataSource){var b=this,g=a;a=g?function(a,c){b.initializeCallback(a,c);g()}:b.initializeCallback;Topics.get(Topics.DIALOG_LOADING).publish();this.dataSource.call(this,a,c)}};k.prototype.show=function(a){if(null===this.container){var c=this;c.initialize(function(){a&&a();e.prototype.show.apply(c)})}else e.prototype.show.apply(this),a&&a()};k.prototype.refresh=function(a){null!==this.container&&(this.container.destruct(),this.container=null,this.initialize(null,{identity:a,checkForStateChange:!0}))};
var A=function(a){e.call(this,a);this.setContainer(a.container||null);this.filter=a.filter};A.prototype=Object.create(e.prototype);A.prototype.constructor=A;A.prototype.show=function(){this.container.applyFilter(this.filter,{checkForStateChange:!1});e.prototype.show.apply(this,arguments)};var s=new A({filter:{showEmptyGroups:!0,func:function(a){return a instanceof AccountBaseDisplay||a instanceof ApplicationDisplay||a instanceof GroupDisplay}},sortOptions:G,menuElement:$("#vaultMenuItem"),bodyState:"site",
scrollParent:n,title:Strings.translateString("Sites"),addMenu:[mb,ea,H,Ga]}),Sa=new A({filter:{showEmptyGroups:!1,func:function(a){return a instanceof NoteDisplay||a instanceof GroupDisplay}},sortOptions:G,menuElement:$("#notesMenuItem"),bodyState:"note",scrollParent:n,title:Strings.translateString("Secure Notes"),addMenu:[ea,H,Ga]}),Ta=new A({filter:{showEmptyGroups:!1,multiSelect:!1,hasFolderView:!1,func:function(a){return a instanceof FormFillDisplay}},sortOptions:gb,menuElement:$("#formFillMenuItem"),
bodyState:"formFill",scrollParent:n,title:Strings.translateString("Form Fills"),addMenu:[nb]}),Ua=new k({containerType:IdentityContainer,dataFunction:function(a){for(var c=[],b=0,g=m._identities.length;b<g;++b)c.push(m._identities[b].newDisplayObject());a(c)},sortOptions:kb,contentID:"identityContent",bodyState:"identity",scrollParent:n,searchPlaceholder:Strings.translateString("search my identities"),buildOptions:{multiSelect:!1},title:Strings.translateString("Identities"),addMenu:[pb]}),T=new k({containerType:CreditMonitoringContainer,
dataFunction:function(a,c){this.makeDataRequest(LPProxy.getCreditMonitoringData,{success:function(b){for(var g=!0,d=[],e=0,f=b.length;e<f;++e){var j=b[e];"1"!==j.premium&&(g=!1);d.push(new CreditMonitoringProfile(j))}b=$("#creditMonitoring .viewExplanation");g?(b.hide(),T.title=Strings.translateString("Premium Credit Monitoring")):(b.show(),T.title=Strings.translateString("Credit Monitoring"));a(d,c)}})},persistent:!1,contentID:"creditMonitoring",scrollParent:n,title:Strings.translateString("Credit Monitoring"),
addMenu:[rb]}),yb=GridListContainer,zb=Strings.translateString("search my deleted items"),Ab={allowDrag:!1,stickyFolders:!0,stickyFolderParent:d.getElementById("main")},Bb=Strings.translateString("Deleted Items"),Va,Wa=LPTools.createElement("div",{"class":"optionButton optionButtons",id:"purgeAllButton"},Strings.Vault.PURGE_ALL);LPPlatform.addEventListener(Wa,"click",function(){var a=ja.getContainer();a&&(a=a.getItemModelChildren(),0<a.length&&a[0].purge({itemsForAction:a}))});Va=$(Wa);var ja=new k({containerType:yb,
dataFunction:function(a){this.makeDataRequest(LPProxy.getDeletedItems,{success:a})},filter:{showEmptyGroups:!1},sortOptions:G,contentID:"deletedItems",scrollParent:n,persistent:!1,searchPlaceholder:zb,buildOptions:Ab,title:Bb,additionalOptionButtons:[Va]});ja.refresh=function(){};var U=new k({containerType:EmergencyAccessRecipientContainer,dataFunction:function(a){this.makeDataRequest(LPProxy.getEmergencyAccessRecipientInfo,{success:a})},filter:{showEmptyGroups:!1},sortOptions:G,menuElement:$("#emergencyTrustedMenuItem"),
groupMenuElement:$("#emergencyAccessMenuItem"),viewFunction:"openEmergencyAccessTrusted",contentID:"emergencyTrustedContainer",bodyState:"emergencyTrusted",scrollParent:n,persistent:!1,searchPlaceholder:Strings.translateString("search people I trust"),buildOptions:{allowDrag:!1},title:Strings.translateString("People I Trust"),addMenu:[qb]}),ka=new k({containerType:EmergencyAccessSharerContainer,dataFunction:function(a){this.makeDataRequest(LPProxy.getEmergencyAccessSharerInfo,{success:a})},filter:{showEmptyGroups:!1},
sortOptions:G,menuElement:$("#emergencyTrustingMenuItem"),groupMenuElement:$("#emergencyAccessMenuItem"),viewFunction:"openEmergencyAccessTrusting",contentID:"emergencyTrusting",bodyState:"emergencyTrusting",scrollParent:n,persistent:!1,searchPlaceholder:Strings.translateString("search people who trust me"),buildOptions:{allowDrag:!1},title:Strings.translateString("People Who Trust Me")}),Cb=IndividualShareContainer,Db=$("#receivedSharesMenuItem"),Eb=$("#sharingMenuItem"),Fb=Strings.translateString("search my received shares"),
Gb=Strings.translateString("Shared with Me"),la=new k({containerType:Cb,sortOptions:ib,menuElement:Db,groupMenuElement:Eb,viewFunction:"openReceivedShareCenter",contentID:"receivedSharesContent",bodyState:"receivedShares",scrollParent:n,persistent:!1,searchPlaceholder:Fb,buildOptions:{multiSelect:!1},filter:{showEmptyGroups:!1,multiSelect:!1},title:Gb,addMenu:[H],dataFunction:function(a){this.makeDataRequest(LPProxy.getReceivedShareData,{success:function(c){for(var b=LPProxy.getAllModelItems(),g=
[],d=0,e=b.length;d<e;++d){var f=b[d],j=c[f.getID()];j&&("1"===j.state&&f instanceof AccountBase)&&g.push(new AcceptedReceivedSharedItem(f,j))}b=LPProxy.getPendingRecievedShares();d=!1;e=0;for(f=b.length;e<f;++e){var j=b[e],h=c[j._model.getID()];h?j._model._shareData=h:d=!0}d&&LPProxy.refreshSites();a(g.concat(b))}})}}),Hb=IndividualShareContainer,Ib=$("#sentSharesMenuItem"),Jb=$("#sharingMenuItem"),Kb=Strings.translateString("search my sent shares"),Lb=Strings.translateString("Shared with Others"),
V=new k({containerType:Hb,sortOptions:hb,menuElement:Ib,groupMenuElement:Jb,viewFunction:"openSentShareCenter",contentID:"sentSharesContent",bodyState:"sentShares",scrollParent:n,persistent:!1,searchPlaceholder:Kb,buildOptions:{multiSelect:!1},filter:{showEmptyGroups:!1,multiSelect:!1},title:Lb,addMenu:[H],dataFunction:function(a,c){this.makeDataRequest(LPProxy.getSentShareData,{success:function(b){for(var g=LPProxy.getAllModelItems(),d=[],e=0,f=g.length;e<f;++e)var j=g[e],d=d.concat(LPTools.buildSentShareItems(j,
b[j.getID()]));a(d,c)}})}}),Mb=SharedFolderContainer,Nb=$("#sharedFoldersMenuItem"),Ob=$("#sharingMenuItem"),Pb=Strings.translateString("search my shared folders"),Qb=Strings.translateString("Shared Folders"),Rb=[ob],W=$(LPTools.buildCheckbox(null,{text:Strings.translateString("View Deleted Shared Folders")}));W.attr("id","showDeletedSharedFoldersButton");W.addClass("optionButtons");W.bind("click",function(){I?ma():na()});var B=new k({containerType:Mb,dataFunction:function(a){this.makeDataRequest(LPProxy.getSharedFolderData,
{success:function(c){for(var b=LPProxy.getAllSharedGroupModelsByID(),g=[],d=0,e=c.length;d<e;++d){var f=c[d];f.sharedata&&g.push(new SharedFolderItem(b[f.shareid],f))}a(g)}})},sortOptions:jb,menuElement:Nb,groupMenuElement:Ob,viewFunction:"openSharedFolderCenter",contentID:"sharedFoldersContent",bodyState:"sharedFolders",scrollParent:n,searchPlaceholder:Pb,buildOptions:{multiSelect:!1},title:Qb,addMenu:Rb,additionalOptionButtons:[W]});B.initialize=function(a,c){var b=a;k.prototype.initialize.call(this,
b?function(){var a={checkForStateChange:!1};I?na(a):ma(a);b()}:function(){var a={checkForStateChange:!1};I?na(a):ma(a)},c)};var J=function(){LPTools.hideContextMenu(r);r=null},E=function(a){a.preventDefault();a.stopPropagation()},pa=function(){J();ga.hide();Qa.removeClass("selected");oa();Xa()},z=function(){f&&f.clearSelected()},xb=function(a){return function(c){J();b.sort(a);E(c)}},oa=function(){ha.removeClass("selected");O.hide();fa.hide()},Ya=function(){t.addClass("open")},Xa=function(){t.removeClass("open")},
Za=!1;b.initialize=function(a){try{if(!Za){Strings.translate(d.body);Strings.translateStrings(Strings.Vault);if(LPFeatures.canBackgroundOpenPopover()){var c=d.getElementById("vaultLoadingOverlay"),e=LPTools.createElement("button",{"class":"nbtn btn_midi gbtn",id:"loginButton"},Strings.translateString("Login"));LPPlatform.addEventListener(e,"click",function(){bg.open_login()});c.children[0].appendChild(LPTools.createElement("div"));c.children[0].appendChild(e)}Za=!0}Topics.get(Topics.CLEAR_DATA).publish();
LPProxy.initializeModel();d.body.removeAttribute("class");Topics.get(Topics.REFRESH_PREFERENCES).publish();$(".leftMenuItem").removeClass("selected");LPProxy.getPreference("gridView",!0)||b.displayAsList();LPProxy.getPreference("compactView",!1)&&b.displayCompact();m=LPProxy.getUser();m.initialize(ga,$("#userMenuText"));VaultState.setIdentities(m._identities);LPProxy.enableCurrentIdentity(m._identities);m.isFree()&&this.showAdPane();LPTools.parseUserSpecificMenu(d.getElementById("tools"),m._accountClass);
LPTools.parseUserSpecificMenu(d.getElementById("more"),m._accountClass);qa();ra();LPProxy.getSecurityChallengeScore(Sb);D.attr("title","Maximize Menu");LPPlatform.showIntroTutorial()?sa():b.openTour();if(LPFeatures.allowGift()){var g=$("#specialOfferMenu");g.show();g.bind("click",function(){bg.openURL(LPProxy.getBaseURL()+"gift.php")})}var f=LPProxy.getAccountClass(),k=d.getElementById("sharedFoldersMenuItem").parentElement;f===Constants.USER_FREE&&($("#emptySharedFoldersIcon .tourText").append(LPTools.createElement("a",
{"class":"nbtn rbtn dynamicWidth",href:LPProxy.getBaseURL()+"go-premium",target:"_blank"},Strings.translateString("Upgrade to Premium"))),k.parentElement.appendChild(k));$(k.parentElement).children().last().addClass("last");$a()}catch(l){LPPlatform.logException(l)}finally{var j=$("#vaultLoadingOverlay");LPTools.getOption(a,"fadeIn",!1)?(j.addClass("fadeIn"),setTimeout(function(){j.addClass("loaded")},500)):j.addClass("loaded");h.addClass("loaded")}};var ab=function(){LPProxy.getPreference("leftMenuMaximize",
!0)&&sa()},$a,Tb=function(a){b.openReceivedShareCenter(function(){var c=LPProxy.getPendingRecievedShare(a);c&&b.openAcceptShareDialog(c)})},Ub=function(a){b.openReceivedShareCenter(function(){var c=LPProxy.getPendingRecievedShare(a);c&&c.reject()})};$a=function(){var a={},c=d.location.href.split("?");if(2===c.length)for(var c=c[1].split("&"),e=0;e<c.length;++e){var g=c[e].split("=");2===g.length&&(a[g[0]]=g[1])}for(var h in a)switch(c=a[h],"cmd"===h&&(h=c),h){case "opengoogleauth":case "opensettings":Topics.get(Topics.EDIT_SETTINGS).publish();
break;case "openhistory":LPProxy.openHistory();break;case "openbookmarklets":LPProxy.openBookmarklets();break;case "linkpersonal":b.openLinkAccountDialog();break;case "unlinkpersonal":b.unlinkAccount();break;case "sharedfolder":case "sf":b.openSharingCenter();break;case "addidentity":b.openManageIdentities();b.openIdentityDialog();break;case "showdeleted":b.openDeletedItems();break;case "viewcreditmon":b.openCreditMonitoring();break;case "share":for(var e=[],c=c.split(","),g=0,k=c.length;g<k;++g){var l=
c[g],j=LPProxy.getSiteModel(l);j||(j=LPProxy.getNoteModel(l));j&&e.push(j)}0<e.length&&b.openShareDialog(e);break;case "edit":LPProxy.getSiteModel(c)?b.openSiteDialog({vaultItem:c}):LPProxy.getNoteModel(c)&&b.openNoteDialog({vaultItem:c});break;case "acceptshare":Tb(c);break;case "rejectshare":Ub(c)}if(null===f)switch(a.view){case "emergencyAccess":U.show();break;case "emergencyAccessOthers":ka.show();break;default:s.show()}};var bb=function(a){if(a){a=a.getAllSubGroupsIncludingFavorites(!0);for(var c=
[],b=0,d=a.length;b<d;++b){var e=a[b];e.isExpanded()&&c.push(e._model.getName())}LPPlatform.setOpenGroups(c)}},Sb=function(a){$("#securityScore").text(null!==a?Math.round(a)+"%":"")};b.toggleInProgressOverlay=function(){tb.toggle()};var X=function(a,c){0<c?(a.text(c),a.show()):a.hide()},qa=function(){var a=bg.g_pendings.length;X($("#sharingMenuItem .notificationBubble"),a);X($("#pendingItemCount"),a);if(bg.g_emer_sharers){for(var a=K=0,c=bg.g_emer_sharers.length;a<c;++a)"0"===bg.g_emer_sharers[a].accepted&&
++K;X($("#emergencyAccessMenuItem .notificationBubble"),K);X($("#pendingEmergencyCount"),K)}},ra,cb=!1;ra=function(){if(!cb)for(var a=LPProxy.getEmergencyAccessRecipientModels(),c=0,b=a.length;c<b;++c){var d=a[c];if(d.allowedAccess()||d.hasRequestedAccess()){dialogs.denyEmergencyAccess.open({sharee:d});cb=!0;break}}};b.openVault=function(){s.show()};b.openNotes=function(){Sa.show()};b.openFormFills=function(){Ta.show()};b.toggleAdvancedMenu=function(a){ha.toggleClass("selected");O.toggle("fast");
fa.toggle();E(a)};b.clear=function(){m&&(m.destruct(),m=null);d.body.setAttribute("class","loggedout");$("#vaultLoadingOverlay").removeClass("loaded fadeIn");p.val("");z();r=u=y=R=f=null};var sa=function(){h.hasClass("maximized")?(h.removeClass("maximized"),D.removeClass("opened"),D.attr("title","Maximize Menu"),LPProxy.setPreferences("leftMenuMaximize",!1)):(h.addClass("maximized"),D.addClass("opened"),D.attr("title","Minimize Menu"),LPProxy.setPreferences("leftMenuMaximize",!0))};b.openSiteDialog=
function(a){dialogs.site.open(a)};b.openTour=function(){LPProxy.getPreference("seenVault4.0",!1)?(ab(),p.focus()):C.show()};b.openNoteDialog=function(a){dialogs.note.open(a)};b.openFormFillDialog=function(a){dialogs.formFill.open(a)};b.openFolderDialog=function(a,c){dialogs.folder.open({vaultItem:a,defaultData:{groupParent:c?c.getName():""},groups:s.getContainer().getAllSubGroups()})};b.openCreateSharedFolderDialog=function(a,c){LPProxy.getAccountClass()===Constants.USER_FREE?dialogs.upgradePremium.open({upgradeText:[LPTools.createElement("h1",
"upgradeDialogHeader",Strings.translateString("Need to share passwords with family or friends?")),LPTools.createElement("p","dialogText",Strings.translateString("Go Premium now to create a Shared Folder, invite family or friends, and fill the folder with passwords and notes. Give up to 5 people access to the Shared Folder. Changes are synced automatically, and you can assign read-only access. Go Premium now to create a Shared Folder!"))]}):dialogs.createSharedFolder.open({group:a,children:c})};b.openSettingsDialog=
function(){null===R&&(AccountSettingsService.call(function(a){R=a;b.openSettingsDialog()},function(){Notifications.displayErrorMessage("Could not retrieve account settings!")}),Topics.get(Topics.DIALOG_LOADING).publish());dialogs.settings.open(R)};b.openLinkAccountDialog=function(){LPProxy.callAcctsIFrameCommand("linkpersonal")};b.unlinkAccount=function(){var a=LPProxy.getLinkedAccount();a&&a.unlink()};var ta=!1;Topics.get(Topics.ALL_COLLAPSED).subscribe(function(){ta=!0;P.addClass("selected");P.attr("title",
Strings.Vault.EXPAND_ALL)});Topics.get(Topics.ALL_EXPANDED).subscribe(function(){ta=!1;P.removeClass("selected");P.attr("title",Strings.Vault.COLLAPSE_ALL)});b.toggleCollapseAll=function(){ta?(Topics.get(Topics.EXPAND_ALL).publish(),Topics.get(Topics.ALL_EXPANDED).publish()):(Topics.get(Topics.COLLAPSE_ALL).publish(),Topics.get(Topics.ALL_COLLAPSED).publish())};var ua=!1;b.displayLarge=function(){Topics.get(Topics.DISPLAY_LARGE).publish();ua=!1;Q.removeClass("selected");Q.attr("title",Strings.Vault.COMPACT_VIEW);
LPProxy.setPreferences("compactView",!1)};b.displayCompact=function(){Topics.get(Topics.DISPLAY_COMPACT).publish();ua=!0;Q.addClass("selected");Q.attr("title",Strings.Vault.LARGE_VIEW);LPProxy.setPreferences("compactView",!0)};b.toggleSize=function(){ua?(b.displayLarge(),bg.lpevent(S?"v_grd_lrg":"v_lst_lrg")):(b.displayCompact(),bg.lpevent(S?"v_grd_cmp":"v_lst_cmp"))};b.displayAsGrid=function(){Topics.get(Topics.DISPLAY_GRID).publish();Ka.addClass("selected");La.removeClass("selected");LPProxy.setPreferences("gridView",
!0);S=!0};b.displayAsList=function(){Topics.get(Topics.DISPLAY_LIST).publish();La.addClass("selected");Ka.removeClass("selected");LPProxy.setPreferences("gridView",!1);S=!1};b.search=function(a){f&&f.search(a)};var db=function(a,c){switch(c){case w:a.sortByName(!0);break;case x:a.sortByName(!1);break;case Aa:a.sortByFolder(!0);break;case Ba:a.sortByFolder(!1);break;case N:a.sortItemsByMostRecent();break;case Ca:case Ea:a.sortByEmail(!0);break;case Da:case Fa:a.sortByEmail(!1)}};b.sort=function(a){vb.text(a);
db(f.getContainer(),a);f.setSortOrder(a)};b.showMoreOptionsMenu=function(){Oa.show("fast")};b.hideMoreOptionsMenu=function(){Oa.hide("fast")};var K=0,Y=null,va=function(a){f!==a&&(a.show(),Y=a)};b.openEmergencyAccess=function(){null===Y&&(Y=0<K?ka:U);va(Y)};b.openEmergencyAccessTrusted=function(){va(U)};b.openEmergencyAccessTrusting=function(){va(ka)};var eb,L=null,Z=function(a,c){f!==a&&(a.show(c),L=a)};eb=function(){L=null};b.openSharingCenter=function(){null===L&&(L=bg.g_pendings.length?la:LPProxy.getAccountClass()===
Constants.USER_FREE?V:LPFeatures.allowSharedFolders()?B:la);Z(L)};b.openReceivedShareCenter=function(a){Z(la,a)};b.openSentShareCenter=function(a){Z(V,a)};b.openSharedFolderCenter=function(a){Z(B,a)};var I=!1,ma=function(a){B.getContainer().applyFilter({showEmptyGroups:!1,multiSelect:!1,func:function(a){return!a._model.isDeleted()}},a);I=!1},na=function(a){B.getContainer().applyFilter({showEmptyGroups:!1,multiSelect:!1,func:function(){return!0}},a);I=!0};b.openAcceptShareDialog=function(a){dialogs.acceptShare.open({vaultItem:a,
groups:s.getContainer().getAllSubGroups()})};b.openShareDialog=function(a){LPTools.openShareDialog(a)};b.openSharedFolderDialog=function(a,c){dialogs.sharedFolder.open(a,c)};b.openSharedFolderAccessDialog=function(a){dialogs.sharedfolderAccess.open(a)};b.openManageIdentities=function(){Ua.show()};b.openIdentityDialog=function(a){dialogs.identity.open(a)};b.enableIdentity=function(a){null!==y&&y!==a&&(y.disable(),LPProxy.enableIdentity(a));y=a;a=u?u._filter:null;null!==u&&(bb(u),u.destruct());var c=
LPProxy.getAllItems({identity:y}),c=new GridListContainer(c,{separateItems:!0,separateFavorites:!0,stickyFolders:!0,ignoreFilterOnSearch:!0,keyboardNavigation:!0,stickyFolderParent:d.getElementById("main"),folderStateChange:bb}),b=LPPlatform.getOpenGroups();if(null!==b){for(var e=!0,f=c.getAllSubGroupsIncludingFavorites(!0),h=0,k=f.length;h<k;++h){var j=f[h];b[j._model.getName()]?(j.expand(),e=!1):j.collapse()}e&&Topics.get(Topics.ALL_COLLAPSED).publish()}db(c,s.getSortOrder());c.initialize(d.getElementById("vaultContent"),
n);c.applyFilter(a);s.setContainer(c);Sa.setContainer(c);Ta.setContainer(c);u=c};b.openCreditMonitoring=function(){T.show()};b.openCreateCreditMonitoringDialog=function(){dialogs.createCreditMonitoring.open()};b.openDeletedItems=function(){ja.show()};var C,F=0,M=null,v=null,Vb=d.getElementById("tourItems"),aa=$("#tourLeft"),wa=$("#tourRight");aa.hide();aa.bind("click",function(){C.reverse()});wa.bind("click",function(){C.advance()});for(var Wb=function(a){return function(){C.goTo(a)}},v=d.getElementById("tourSteps").children,
ba=0,Xb=v.length;ba<Xb;++ba)LPPlatform.addEventListener(v[ba],"click",Wb(ba));v[0].setAttribute("class","tourStep selected");var ca=function(a){if(a!==F&&0<=a&&a<v.length){v[F].setAttribute("class","tourStep");var c="tour"+(a+1);Vb.setAttribute("class",c);h.addClass(c);M&&h.removeClass(M);M=c;F=a;v[F].setAttribute("class","tourStep selected");0===a?aa.hide():aa.show();a===v.length-1?wa.hide():wa.show()}},xa=function(){ca(F+1)},ya=function(){ca(F-1)};C={advance:xa,reverse:ya,goTo:function(a){ca(a)},
hide:function(){h.removeClass("tourState");h.removeClass(M);M=null;Topics.get(Topics.RIGHT_ARROW).unsubscribe(xa);Topics.get(Topics.LEFT_ARROW).unsubscribe(ya)},show:function(){ca(0);h.addClass("tourState");Topics.get(Topics.RIGHT_ARROW).subscribe(xa);Topics.get(Topics.LEFT_ARROW).subscribe(ya)}};b.showAdPane=function(){var a=d.getElementById("ad"),c=d.createElement("iframe");c.setAttribute("src",za.getPartnerURL(LPProxy.getBaseURL()+"ads.php?nobr=1&noga=1&rand="+Math.floor(1E3*Math.random())+"&v="+
LPProxy.getVersion()));a.appendChild(c);h.addClass("freeUser");setInterval(function(){c.setAttribute("src",za.getPartnerURL(LPProxy.getBaseURL()+"ads.php?v=4.0&nobr=1&noga=1&rand="+Math.floor(1E3*Math.random())+"&v="+LPProxy.getVersion()))},3E5)};h.bind("click",function(){pa()});$("#vault").bind("click",function(){z();pa()});LPPlatform.addEventListener(window,"unload",function(){Topics.get(Topics.CLEAR_DATA).publish()});p.LP_addSearchHandlers("inputLight",function(a){b.search(a)});p.bind("keydown",
function(a){if(40===(a.keyCode||a.which)){var c=f.getContainer();c&&(c=c.getAllChildrenOrdered(),0<c.length&&(c[0].focus(),a.preventDefault(),a.stopPropagation()))}});$("#orderOption").bind("click",function(a){Na.toggle();r=Na;LPTools.addKeyBoardNavigation(ia.children);E(a)});$("#actions").bind("click",function(a){if(null===r||r.get(0).parentElement!==Pa){var c=f.createSelectionContextMenu();Pa.appendChild(c);c.removeAttribute("style");r=$(c);r.show()}else J();E(a)});$("#sharingMenuItem").bind("click",
function(){b.openSharingCenter()});ha.bind("click",b.toggleAdvancedMenu);fa.bind("click",oa);D.bind("click",sa);LPPlatform.addEventListener(d.getElementById("settingsMenuItem"),"click",function(){Topics.get(Topics.EDIT_SETTINGS).publish()});$("#linkAccountMenuItem").bind("click",function(){b.openLinkAccountDialog()});O.on("click",".toolsMenuItem.subMenuOption",function(){return!1});O.on("click",".toolsMenuItem",oa);t.bind("mouseenter",Ya);t.bind("mouseleave",Xa);t.bind("touchstart",function(a){t.unbind("mousenter");
t.unbind("mouseleave");t.hasClass("open")||(Ya(),a.preventDefault())});LPPlatform.addEventListener(d.getElementById("collapseAllToggle"),"click",function(){b.toggleCollapseAll()});LPPlatform.addEventListener(d.getElementById("sizeToggle"),"click",function(){b.toggleSize()});LPPlatform.addEventListener(d.getElementById("gridButton"),"click",function(){b.displayAsGrid()});LPPlatform.addEventListener(d.getElementById("listButton"),"click",function(){b.displayAsList()});LPPlatform.addEventListener(d.getElementById("userMenuContainer"),
"click",function(a){Qa.toggleClass("selected");ga.toggle();E(a)});var fb=function(){C.hide();LPProxy.getPreference("seenVault4.0",!1)||LPProxy.setPreferences("seenVault4.0",!0);ab()};LPPlatform.addEventListener(d.getElementById("skipTour"),"click",fb);LPPlatform.addEventListener(d.getElementById("tourOpenMyVault"),"click",fb);LPPlatform.addEventListener(d.getElementById("manageIdentitiesMenuItem"),"click",function(){b.openManageIdentities()});LPPlatform.addEventListener(d.getElementById("creditMonitoringMenuItem"),
"click",function(){b.openCreditMonitoring()});LPPlatform.addEventListener(d.getElementById("openTourMenuItem"),"click",function(){C.show()});$(".toolsMenuItem.subMenuOption").bind("click",function(a){$(a.target.parentElement.nextElementSibling).toggle();$(a.target).toggleClass("selected");E(a)});LPPlatform.addEventListener(d.getElementById("toolsImport"),"click",function(){LPProxy["import"]()});LPPlatform.addEventListener(d.getElementById("toolsExport"),"click",function(){LPProxy["export"]()});LPPlatform.addEventListener(d.getElementById("toolsOpenFavorites"),
"click",function(){LPProxy.openAllFavorites()});LPPlatform.addEventListener(d.getElementById("bookmarkletsMenuItem"),"click",function(){LPProxy.openBookmarklets()});LPPlatform.addEventListener(d.getElementById("historyMenuItem"),"click",function(){LPProxy.openHistory()});LPPlatform.addEventListener(d.getElementById("deletedMenuItem"),"click",function(){b.openDeletedItems()});LPPlatform.addEventListener(d.getElementById("generateSharingKeys"),"click",function(){bg.lpevent("v_gsk");dialogs.sharingKey.open()});
$("#generateSharingKeys").hide();LPPlatform.addEventListener(d.getElementById("generatePasswordMenuItem"),"click",function(){bg.lpevent("v_gpw");dialogs.generatePassword.open({fillGenerated:!1})});$("#generatePasswordMenuItem").hide();$("#removedLinkedAccountMenuItem").bind("click",function(){b.unlinkAccount()});$("#tryEnterprise").bind("click",function(){dialogs.enterpriseTrial.open()});$("#emergencyAccessMenuItem").bind("click",function(){b.openEmergencyAccess()});Topics.get(Topics.ITEMS_DESELECTED).subscribe(function(){b.hideMoreOptionsMenu()});
Topics.get(Topics.ITEMS_SELECTED).subscribe(function(){b.showMoreOptionsMenu()});Topics.get(Topics.SELECT_COUNT_CHANGE).subscribe(function(a){0<a&&$("#selectedItemCounter").text(a+" selected")});Topics.get(Topics.CONTEXT_MENU).subscribe(function(a,c){c.parentElement!==d.body&&d.body.appendChild(c);r=LPTools.displayContextMenu(a,c)});Topics.get(Topics.CONTEXT_CLOSE).subscribe(function(){J()});Topics.get(Topics.ITEM_SHARE).subscribe(function(a){b.openShareDialog(a)});Topics.get(Topics.IDENTITY_ENABLE).subscribe(function(a){b.enableIdentity(a)});
Topics.get(Topics.CLEAR_DATA).subscribe(function(){b.clear();Dialog.prototype.closeAllDialogs(!0);LPProxy.closeIFrame()});Topics.get(Topics.LOGIN).subscribe(function(a){b.initialize(a);Dialog.prototype.closeAllDialogs()});Topics.get(Topics.REQUEST_SUCCESS).subscribe(function(a){LPTools.getOption(a,"incrementAccountsVersion",!1)&&z()});var da=function(a,c,b){p.val("");z();u.addChild(a.newDisplayObject(),c,b)};Topics.get(Topics.SITE_ADDED).subscribe(da);Topics.get(Topics.NOTE_ADDED).subscribe(da);Topics.get(Topics.FORM_FILL_ADDED).subscribe(da);
Topics.get(Topics.APPLICATION_ADDED).subscribe(da);Topics.get(Topics.EDIT_SHARED_FOLDER_ACCESS).subscribe(function(a){b.openSharedFolderAccessDialog(a)});Topics.get(Topics.EDIT_SITE).subscribe(function(a){b.openSiteDialog(a)});Topics.get(Topics.EDIT_NOTE).subscribe(function(a){b.openNoteDialog(a)});Topics.get(Topics.EDIT_FORM_FILL).subscribe(function(a){b.openFormFillDialog(a)});Topics.get(Topics.EDIT_APPLICATION).subscribe(function(a){dialogs.application.open(a)});Topics.get(Topics.EDIT_SETTINGS).subscribe(function(){LPProxy.callAcctsIFrameCommand("settings")});
Topics.get(Topics.EDIT_IDENTITY).subscribe(function(a){b.openIdentityDialog(a)});Topics.get(Topics.ACCEPT_SHARE).subscribe(function(a){b.openAcceptShareDialog(a)});Topics.get(Topics.RENAME_FOLDER).subscribe(function(a){b.openFolderDialog(a)});Topics.get(Topics.CREATE_SUB_FOLDER).subscribe(function(a){b.openFolderDialog(null,a)});Topics.get(Topics.GROUP_ADDED).subscribe(function(a,c){p.val("");z();s.getContainer().addChild(a.newDisplayObject(),c);if(a instanceof SharedGroup){var b=B.getContainer();
if(null!==b){var d=new SharedFolderItem(a);b.addChild(d)}}});Topics.get(Topics.ESCAPE).subscribe(function(){var a=Dialog.prototype.getCurrentDialog();a&&a.close();z();pa()});Topics.get(Topics.EDIT_SHARED_FOLDER).subscribe(function(a,c){b.openSharedFolderDialog(a,c)});Topics.get(Topics.IDENTITY_ADDED).subscribe(function(a){Ua.getContainer().addChild(a.newDisplayObject())});Topics.get(Topics.REFRESH_DATA).subscribe(function(){LPProxy.initializeModel();qa();ra();Topics.get(Topics.IDENTITY_ENABLE).publish(y);
Dialog.prototype.closeInProcessDialogs();VaultItemDialog.prototype.refreshOpenDialogs();Topics.get(Topics.REFRESH_PREFERENCES).publish();J()});Topics.get(Topics.REFRESH_NOTIFICATIONS).subscribe(function(){qa()});Topics.get(Topics.ACCOUNT_LINKED).subscribe(function(){$("#linkAccountMenuItem").LP_hide();$("#removedLinkedAccountMenuItem").LP_show()});Topics.get(Topics.ACCOUNT_UNLINKED).subscribe(function(){$("#linkAccountMenuItem").LP_show();$("#removedLinkedAccountMenuItem").LP_hide()});Topics.get(Topics.CREATE_SHARED_FOLDER).subscribe(function(a,
c){b.openCreateSharedFolderDialog(a,c)});Topics.get(Topics.REPROMPT).subscribe(function(a){dialogs.reprompt.open({successCallback:a})});Topics.get(Topics.CONFIRM).subscribe(function(a){dialogs.confirmation.open(a)});Topics.get(Topics.EMERGENCY_RECIPIENT_ADDED).subscribe(function(a){U.getContainer().addChild(a.newDisplayObject())});Topics.get(Topics.EDIT_EMERGENCY_RECIPIENT).subscribe(function(a){dialogs.addEmergencyAccess.open({vaultItem:a})});Topics.get(Topics.REAPPLY_SEARCH).subscribe(function(a,
c){var b=p.val();b&&a.applySearch(b,c)});Topics.get(Topics.ENROLLED_CREDIT_MONITORING).subscribe(function(){T.refresh()});Topics.get(Topics.ITEM_SHARED).subscribe(function(){V.refresh()});Topics.get(Topics.REFRESH_PREFERENCES).subscribe(function(){LPFeatures.updateFeatures({"import":!0,noexport:!1,share:!0,share_onlyfolders:!1,show_notes:!0,bookmarklets:!0,hideidentities:!1,showcredmon:!0,link_personal:!0});LPProxy.hasReceivedShares()?h.removeClass("noReceivedShares"):h.addClass("noReceivedShares");
switch(f){case V:LPFeatures.allowIndividualSharing()||(eb(),s.show(),dialogs.alert.open({title:Strings.translateString("Policy Update"),text:Strings.translateString("Your enterprise has prohibited individual sharing.")}));break;case B:LPFeatures.allowSharedFolders()||(s.show(),dialogs.alert.open({title:Strings.translateString("Policy Update"),text:Strings.translateString("Your enterprise has prohibited sharing.")}))}});LPPlatform.addEventListener(d,"DOMContentLoaded",function(){Notifications.initialize()})})(document,
LPVault,BuildVariables);