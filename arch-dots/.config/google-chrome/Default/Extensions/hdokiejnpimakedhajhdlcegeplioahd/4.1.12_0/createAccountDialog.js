var CreateAccountDialog=function(d){Dialog.call(this,d,{views:[{selector:"#dataEntry"},{selector:"#confirmation",title:Strings.translateString("Confirm Password")}],dynamicHeight:!0,additionalHeaderClasses:["icon"],nextButtonText:Strings.translateString("Create Account"),largeButtons:!0,title:Strings.translateString("Create Account")})};CreateAccountDialog.prototype=Object.create(Dialog.prototype);CreateAccountDialog.prototype.constructor=CreateAccountDialog;
(function(){CreateAccountDialog.prototype.initialize=function(a){Dialog.prototype.initialize.apply(this,arguments);this.inputFields.password.getElement().LP_addPasswordMeter();var b=this;b.inputFields.email.onChange(function(a){a&&LPServer.textRequest({type:"GET",url:"create_account.php",CSRFToken:!1,data:{username:a,check:"avail",mistype:1},success:function(a){0===a.indexOf("mistype:")?b.addError("email",a.substring(8)):"no"===a&&b.addError("email",Strings.translateString("Email already in use."))}})})};
CreateAccountDialog.prototype.close=function(a){if(a)Dialog.prototype.close.apply(this,arguments);else{var b=this;LPTools.getOption(b.data,"showcloseconfirm",!0)?dialogs.confirmation.open({title:"LastPass",text:Strings.translateString("Do you really want to quit?  You cannot use LastPass without creating an account."),handler:function(){dialogs.alert.open({title:"LastPass",text:Strings.translateString("Please visit https://lastpass.com to create an account at a later time."),handler:function(){b.close(!0)}})}}):
b.close(!0)}};CreateAccountDialog.prototype.validate=function(a){var b=Dialog.prototype.validate.apply(this,arguments);5>a.email.length&&(this.addError("email",Strings.translateString("It looks like you've entered an invalid or incomplete email address. Please try again.")),b=!1);a.agreeTerms||(this.addError("agreeTerms",Strings.translateString("You must agree to the Terms and Conditions in order to continue")),b=!1);8>a.password.length&&(this.addError("password",Strings.translateString("Sorry, your password is too short. It must be a minimum of 8 characters long for security reasons.")),
b=!1);a.password&&a.password===a.email&&(this.addError("password",Strings.translateString("Sorry, your password can not be the same as your email address.")),b=!1);if(a.password.match(/^password\d{0,3}$/i)||"12345678"===a.password||"123456789"===a.password||"1234567890"===a.password||a.password.match(/^lastpass\d{0,3}$/i)||"lastpass.com"===a.password||"qwertyuiop"===a.password||"abcd1234"===a.password)this.addError("password",Strings.translateString("Your password is easily guessable, avoid simple runs of characters, or variations of 'password' or 'lastpass'.")),
b=!1;a.password&&-1!==a.reminder.toLowerCase().indexOf(a.password.toLowerCase())&&(this.addError("reminder",Strings.translateString("Your Password Reminder can not be the same as your chosen Master Password for security reasons. Please edit your Reminder so that it does not contain your Master Password.")),b=!1);this.currentViewIndex===this.views.length-1&&a.password!==a.reconfirm&&(this.addError("reconfirm",Strings.translateString("Your Master Password and Confirm Master Password entries do not match, please enter them again.")),
b=!1);return b};var d=function(a,b,d){Topics.get(Topics.ERROR).publish(a);Topics.get(Topics.REQUEST_ERROR).publish({requestID:d})};CreateAccountDialog.prototype.handleSubmit=function(a){a.email=bg.fix_username(a.email);var b=bg.get_key_iterations(a.email),g=LPRequest.getNewRequestID(),e=bg,j=this;e.make_lp_key_hash_iterations(a.email,a.password,b,function(l,k){var h={username:a.email,email:a.email,hash:k,password_hint:a.reminder,improve:1,loglogins:1,iterations:b,xml:1};BuildVariables.createSource&&
(h[BuildVariables.createSource]=1);Topics.get(Topics.REQUEST_START).publish({requestID:g});e.create_account($.param(h),function(b){if(4===b.readyState&&200===b.status){var c="";if(b.responseText){var f=b.responseText;0<=f.indexOf("ok")?(e.g_manual_login=!0,e.LP_do_login(a.email,a.password,!0,!1,null,!0),j.close(!0)):0<=f.indexOf("usernametaken")?c=Strings.translateString("Email already in use, have you forgotten your password?"):0<=f.indexOf("usernameinvalid")||0<=f.indexOf("emailfailed")?c=Strings.translateString("Invalid email address, try again"):
(b&&b.responseXML&&b.responseXML.documentElement&&(b=b.responseXML.getElementsByTagName("error"))&&(0<b.length&&b[0].getAttribute("msg"))&&(c=b[0].getAttribute("msg")),""===c&&(c=Strings.translateString("A server error occurred while processing your request.")))}else c=Strings.translateString("Received empty response from server.");c&&d(c,a,g)}},d)})}})();
