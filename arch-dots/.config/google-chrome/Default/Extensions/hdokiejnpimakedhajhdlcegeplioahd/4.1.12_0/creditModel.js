var CreditMonitoringContainer=function(a,b){Container.call(this,a,b);this.alerts=[];for(var c=0,d=a.length;c<d;++c)this.alerts=this.alerts.concat(a[c].getAlerts());for(c=0;c<this.alerts.length;++c)this.alerts[c].setParent(this)};CreditMonitoringContainer.prototype=Object.create(Container.prototype);CreditMonitoringContainer.prototype.constructor=CreditMonitoringContainer;
CreditMonitoringContainer.prototype.initialize=function(a){a=$(a);this.buildItems(this._items,a.find(".profiles").get(0),this._buildOptions);this.buildItems(this.alerts,a.find(".alerts").get(0),$.extend({},this._buildOptions,{sortFunction:CreditMonitoringAlert.prototype.sortByDateDesc}))};CreditMonitoringContainer.prototype.buildItems=function(a,b){0<a.length&&(LPTools.removeDOMChildren(b),Container.prototype.buildItems.apply(this,arguments))};
CreditMonitoringContainer.prototype.getChildren=function(){return Container.prototype.getChildren.apply(this,arguments).concat(this.alerts)};var CreditMonitoringProfile=function(a){VaultItemBase.call(this,a);VaultItemBaseDisplay.call(this,this);a=0;for(var b=this._data.alerts.length;a<b;++a)this._data.alerts[a]=new CreditMonitoringAlert(this._data.alerts[a])};CreditMonitoringProfile.prototype=Object.create(VaultItemBase.prototype);$.extend(CreditMonitoringProfile.prototype,VaultItemBaseDisplay.prototype);
CreditMonitoringProfile.prototype.constructor=CreditMonitoringProfile;CreditMonitoringProfile.prototype.getID=function(){return this._data.subscriberid};CreditMonitoringProfile.prototype.getName=function(){return""};CreditMonitoringProfile.prototype.getEnabledDate=function(){return this._data.date};CreditMonitoringProfile.prototype.getStatus=function(){return this._data.state};CreditMonitoringProfile.prototype.getAlerts=function(){return this._data.alerts};
CreditMonitoringProfile.prototype.isPremium=function(){return"1"===this._data.premium};
CreditMonitoringProfile.prototype.build=function(){var a=LPTools.createElement("tr");a.appendChild(this.createTextElement("td",this.getID));a.appendChild(this.createTextElement("td",this.getEnabledDate));a.appendChild(this.createTextElement("td",this.getStatus));var b=LPTools.createElement("td");a.appendChild(b);this.isPremium()?b.appendChild(LPTools.createElement("a",{"class":"creditProfileAction",vaultaction:Constants.ACTION_DASHBOARD},"Dashboard")):b.appendChild(LPTools.createElement("a",{"class":"creditProfileAction",
vaultaction:Constants.ACTION_UPGRADE},"Upgrade"));return a};CreditMonitoringProfile.prototype.getContextMenuItems=function(){return this.isPremium()?[new LPTools.ContextMenuItem(Constants.ACTION_DASHBOARD)]:[new LPTools.ContextMenuItem(Constants.ACTION_UPGRADE)]};
CreditMonitoringProfile.prototype.handleClickEvent=function(a,b){switch(a){case Constants.ACTION_UPGRADE:this.upgrade();break;case Constants.ACTION_DASHBOARD:this.openDashboard();break;default:VaultItemBaseDisplay.prototype.handleClickEvent.apply(this,arguments)}};CreditMonitoringProfile.prototype.openDashboard=function(){LPProxy.callAcctsIFrameCommand("opencreditmondashnoalert",this.getID())};CreditMonitoringProfile.prototype.upgrade=function(){bg.openURL(LPProxy.getBaseURL()+"features_joinpremium_creditmon.php")};
var CreditMonitoringAlert=function(a){VaultItemBase.call(this,a);VaultItemBaseDisplay.call(this,this)};CreditMonitoringAlert.prototype=Object.create(VaultItemBase.prototype);$.extend(CreditMonitoringAlert.prototype,VaultItemBaseDisplay.prototype);CreditMonitoringAlert.prototype.constructor=CreditMonitoringAlert;CreditMonitoringAlert.prototype.getID=function(){return this._data.id};CreditMonitoringAlert.prototype.getDate=function(){return this._data.date};
CreditMonitoringAlert.prototype.getMessage=function(){return this._data.message};CreditMonitoringAlert.prototype.getProfileID=function(){return this._data.subscriberid};CreditMonitoringAlert.prototype.getDateMillis=function(){return Date.parse(this._data.date)};CreditMonitoringAlert.prototype.sortByDateDesc=function(a,b){return VaultItemBase.prototype.sortByFunction(a,b,"getDateMillis",!1)};
CreditMonitoringAlert.prototype.build=function(){var a=LPTools.createElement("tr");a.appendChild(this.createTextElement("td",this.getDate));a.appendChild(this.createTextElement("td",this.getProfileID));a.appendChild(this.createTextElement("td",this.getMessage));var b=LPTools.createElement("td");b.appendChild(LPTools.createElement("a",{"class":"creditProfileAction",vaultaction:Constants.ACTION_DELETE},"Delete"));a.appendChild(b);return a};
CreditMonitoringAlert.prototype.toString=function(){return Strings.translateString("Alert")+": "+this.getMessage()};CreditMonitoringAlert.prototype.getContextMenuItems=function(){return[new LPTools.ContextMenuItem(Constants.ACTION_DELETE)]};CreditMonitoringAlert.prototype.handleClickEvent=function(a,b){switch(a){case Constants.ACTION_DELETE:this.deleteItem();break;default:VaultItemBaseDisplay.prototype.handleClickEvent.apply(this,arguments)}};
CreditMonitoringAlert.prototype.deleteItem=function(){var a=this;LPRequest.makeRequest(LPProxy.deleteCreditMonitoringAlert,{parameters:a.getID(),success:function(){a.deleteUpdates()},confirm:a.confirmDelete()})};
