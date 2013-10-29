!function(e,t){var n=function(){var t=e(document).data("events");return t&&t.click&&e.grep(t.click,function(e){return"rails"===e.namespace}).length};n()&&e.error("jquery-ujs has already been loaded!");var a;e.rails=a={linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector:"form",formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",disableSelector:"input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",fileInputSelector:"input:file",linkDisableSelector:"a[data-disable-with]",CSRFProtection:function(t){var n=e('meta[name="csrf-token"]').attr("content");n&&t.setRequestHeader("X-CSRF-Token",n)},fire:function(t,n,a){var r=e.Event(n);return t.trigger(r,a),r.result!==!1},confirm:function(e){return confirm(e)},ajax:function(t){return e.ajax(t)},href:function(e){return e.attr("href")},handleRemote:function(n){var r,o,i,s,u,c,l,d;if(a.fire(n,"ajax:before")){if(s=n.data("cross-domain"),u=s===t?null:s,c=n.data("with-credentials")||null,l=n.data("type")||e.ajaxSettings&&e.ajaxSettings.dataType,n.is("form")){r=n.attr("method"),o=n.attr("action"),i=n.serializeArray();var f=n.data("ujs:submit-button");f&&(i.push(f),n.data("ujs:submit-button",null))}else n.is(a.inputChangeSelector)?(r=n.data("method"),o=n.data("url"),i=n.serialize(),n.data("params")&&(i=i+"&"+n.data("params"))):(r=n.data("method"),o=a.href(n),i=n.data("params")||null);d={type:r||"GET",data:i,dataType:l,beforeSend:function(e,r){return r.dataType===t&&e.setRequestHeader("accept","*/*;q=0.5, "+r.accepts.script),a.fire(n,"ajax:beforeSend",[e,r])},success:function(e,t,a){n.trigger("ajax:success",[e,t,a])},complete:function(e,t){n.trigger("ajax:complete",[e,t])},error:function(e,t,a){n.trigger("ajax:error",[e,t,a])},xhrFields:{withCredentials:c},crossDomain:u},o&&(d.url=o);var p=a.ajax(d);return n.trigger("ajax:send",p),p}return!1},handleMethod:function(n){var r=a.href(n),o=n.data("method"),i=n.attr("target"),s=e("meta[name=csrf-token]").attr("content"),u=e("meta[name=csrf-param]").attr("content"),c=e('<form method="post" action="'+r+'"></form>'),l='<input name="_method" value="'+o+'" type="hidden" />';u!==t&&s!==t&&(l+='<input name="'+u+'" value="'+s+'" type="hidden" />'),i&&c.attr("target",i),c.hide().append(l).appendTo("body"),c.submit()},disableFormElements:function(t){t.find(a.disableSelector).each(function(){var t=e(this),n=t.is("button")?"html":"val";t.data("ujs:enable-with",t[n]()),t[n](t.data("disable-with")),t.prop("disabled",!0)})},enableFormElements:function(t){t.find(a.enableSelector).each(function(){var t=e(this),n=t.is("button")?"html":"val";t.data("ujs:enable-with")&&t[n](t.data("ujs:enable-with")),t.prop("disabled",!1)})},allowAction:function(e){var t,n=e.data("confirm"),r=!1;return n?(a.fire(e,"confirm")&&(r=a.confirm(n),t=a.fire(e,"confirm:complete",[r])),r&&t):!0},blankInputs:function(t,n,a){var r,o,i=e(),s=n||"input,textarea";return t.find(s).each(function(){r=e(this),o=r.is(":checkbox,:radio")?r.is(":checked"):r.val(),o==!!a&&(i=i.add(r))}),i.length?i:!1},nonBlankInputs:function(e,t){return a.blankInputs(e,t,!0)},stopEverything:function(t){return e(t.target).trigger("ujs:everythingStopped"),t.stopImmediatePropagation(),!1},callFormSubmitBindings:function(n,a){var r=n.data("events"),o=!0;return r!==t&&r.submit!==t&&e.each(r.submit,function(e,t){return"function"==typeof t.handler?o=t.handler(a):void 0}),o},disableElement:function(e){e.data("ujs:enable-with",e.html()),e.html(e.data("disable-with")),e.bind("click.railsDisable",function(e){return a.stopEverything(e)})},enableElement:function(e){e.data("ujs:enable-with")!==t&&(e.html(e.data("ujs:enable-with")),e.data("ujs:enable-with",!1)),e.unbind("click.railsDisable")}},a.fire(e(document),"rails:attachBindings")&&(e.ajaxPrefilter(function(e,t,n){e.crossDomain||a.CSRFProtection(n)}),e(document).delegate(a.linkDisableSelector,"ajax:complete",function(){a.enableElement(e(this))}),e(document).delegate(a.linkClickSelector,"click.rails",function(n){var r=e(this),o=r.data("method"),i=r.data("params");return a.allowAction(r)?(r.is(a.linkDisableSelector)&&a.disableElement(r),r.data("remote")!==t?!n.metaKey&&!n.ctrlKey||o&&"GET"!==o||i?(a.handleRemote(r)===!1&&a.enableElement(r),!1):!0:r.data("method")?(a.handleMethod(r),!1):void 0):a.stopEverything(n)}),e(document).delegate(a.inputChangeSelector,"change.rails",function(t){var n=e(this);return a.allowAction(n)?(a.handleRemote(n),!1):a.stopEverything(t)}),e(document).delegate(a.formSubmitSelector,"submit.rails",function(n){var r=e(this),o=r.data("remote")!==t,i=a.blankInputs(r,a.requiredInputSelector),s=a.nonBlankInputs(r,a.fileInputSelector);return a.allowAction(r)?i&&r.attr("novalidate")==t&&a.fire(r,"ajax:aborted:required",[i])?a.stopEverything(n):o?s?(setTimeout(function(){a.disableFormElements(r)},13),a.fire(r,"ajax:aborted:file",[s])):!e.support.submitBubbles&&e().jquery<"1.7"&&a.callFormSubmitBindings(r,n)===!1?a.stopEverything(n):(a.handleRemote(r),!1):(setTimeout(function(){a.disableFormElements(r)},13),void 0):a.stopEverything(n)}),e(document).delegate(a.formInputClickSelector,"click.rails",function(t){var n=e(this);if(!a.allowAction(n))return a.stopEverything(t);var r=n.attr("name"),o=r?{name:r,value:n.val()}:null;n.closest("form").data("ujs:submit-button",o)}),e(document).delegate(a.formSubmitSelector,"ajax:beforeSend.rails",function(t){this==t.target&&a.disableFormElements(e(this))}),e(document).delegate(a.formSubmitSelector,"ajax:complete.rails",function(t){this==t.target&&a.enableFormElements(e(this))}),e(function(){csrf_token=e("meta[name=csrf-token]").attr("content"),csrf_param=e("meta[name=csrf-param]").attr("content"),e('form input[name="'+csrf_param+'"]').val(csrf_token)}))}(jQuery),function(e,t,n){function a(e){var t={},a=/^jQuery\d+$/;return n.each(e.attributes,function(e,n){n.specified&&!a.test(n.name)&&(t[n.name]=n.value)}),t}function r(e,a){var r=this,o=n(r);if(r.value==o.attr("placeholder")&&o.hasClass("placeholder"))if(o.data("placeholder-password")){if(o=o.hide().next().show().attr("id",o.removeAttr("id").data("placeholder-id")),e===!0)return o[0].value=a;o.focus()}else r.value="",o.removeClass("placeholder"),r==t.activeElement&&r.select()}function o(){var e,t=this,o=n(t),i=this.id;if(""==t.value){if("password"==t.type){if(!o.data("placeholder-textinput")){try{e=o.clone().attr({type:"text"})}catch(s){e=n("<input>").attr(n.extend(a(this),{type:"text"}))}e.removeAttr("name").data({"placeholder-password":o,"placeholder-id":i}).bind("focus.placeholder",r),o.data({"placeholder-textinput":e,"placeholder-id":i}).before(e)}o=o.removeAttr("id").hide().prev().attr("id",i).show()}o.addClass("placeholder"),o[0].value=o.attr("placeholder")}else o.removeClass("placeholder")}var i,s,u="placeholder"in t.createElement("input"),c="placeholder"in t.createElement("textarea"),l=n.fn,d=n.valHooks,f=n.propHooks;u&&c?(s=l.placeholder=function(){return this},s.input=s.textarea=!0):(s=l.placeholder=function(){var e=this;return e.filter((u?"textarea":":input")+"[placeholder]").not(".placeholder").bind({"focus.placeholder":r,"blur.placeholder":o}).data("placeholder-enabled",!0).trigger("blur.placeholder"),e},s.input=u,s.textarea=c,i={get:function(e){var t=n(e),a=t.data("placeholder-password");return a?a[0].value:t.data("placeholder-enabled")&&t.hasClass("placeholder")?"":e.value},set:function(e,a){var i=n(e),s=i.data("placeholder-password");return s?s[0].value=a:i.data("placeholder-enabled")?(""==a?(e.value=a,e!=t.activeElement&&o.call(e)):i.hasClass("placeholder")?r.call(e,!0,a)||(e.value=a):e.value=a,i):e.value=a}},u||(d.input=i,f.value=i),c||(d.textarea=i,f.value=i),n(function(){n(t).delegate("form","submit.placeholder",function(){var e=n(".placeholder",this).each(r);setTimeout(function(){e.each(o)},10)})}),n(e).bind("beforeunload.placeholder",function(){n(".placeholder").each(function(){this.value=""})}))}(this,document,jQuery),/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,t,n,a,r){return jQuery.easing[jQuery.easing.def](e,t,n,a,r)},easeInQuad:function(e,t,n,a,r){return a*(t/=r)*t+n},easeOutQuad:function(e,t,n,a,r){return-a*(t/=r)*(t-2)+n},easeInOutQuad:function(e,t,n,a,r){return(t/=r/2)<1?a/2*t*t+n:-a/2*(--t*(t-2)-1)+n},easeInCubic:function(e,t,n,a,r){return a*(t/=r)*t*t+n},easeOutCubic:function(e,t,n,a,r){return a*((t=t/r-1)*t*t+1)+n},easeInOutCubic:function(e,t,n,a,r){return(t/=r/2)<1?a/2*t*t*t+n:a/2*((t-=2)*t*t+2)+n},easeInQuart:function(e,t,n,a,r){return a*(t/=r)*t*t*t+n},easeOutQuart:function(e,t,n,a,r){return-a*((t=t/r-1)*t*t*t-1)+n},easeInOutQuart:function(e,t,n,a,r){return(t/=r/2)<1?a/2*t*t*t*t+n:-a/2*((t-=2)*t*t*t-2)+n},easeInQuint:function(e,t,n,a,r){return a*(t/=r)*t*t*t*t+n},easeOutQuint:function(e,t,n,a,r){return a*((t=t/r-1)*t*t*t*t+1)+n},easeInOutQuint:function(e,t,n,a,r){return(t/=r/2)<1?a/2*t*t*t*t*t+n:a/2*((t-=2)*t*t*t*t+2)+n},easeInSine:function(e,t,n,a,r){return-a*Math.cos(t/r*(Math.PI/2))+a+n},easeOutSine:function(e,t,n,a,r){return a*Math.sin(t/r*(Math.PI/2))+n},easeInOutSine:function(e,t,n,a,r){return-a/2*(Math.cos(Math.PI*t/r)-1)+n},easeInExpo:function(e,t,n,a,r){return 0==t?n:a*Math.pow(2,10*(t/r-1))+n},easeOutExpo:function(e,t,n,a,r){return t==r?n+a:a*(-Math.pow(2,-10*t/r)+1)+n},easeInOutExpo:function(e,t,n,a,r){return 0==t?n:t==r?n+a:(t/=r/2)<1?a/2*Math.pow(2,10*(t-1))+n:a/2*(-Math.pow(2,-10*--t)+2)+n},easeInCirc:function(e,t,n,a,r){return-a*(Math.sqrt(1-(t/=r)*t)-1)+n},easeOutCirc:function(e,t,n,a,r){return a*Math.sqrt(1-(t=t/r-1)*t)+n},easeInOutCirc:function(e,t,n,a,r){return(t/=r/2)<1?-a/2*(Math.sqrt(1-t*t)-1)+n:a/2*(Math.sqrt(1-(t-=2)*t)+1)+n},easeInElastic:function(e,t,n,a,r){var o=1.70158,i=0,s=a;if(0==t)return n;if(1==(t/=r))return n+a;if(i||(i=.3*r),s<Math.abs(a)){s=a;var o=i/4}else var o=i/(2*Math.PI)*Math.asin(a/s);return-(s*Math.pow(2,10*(t-=1))*Math.sin((t*r-o)*2*Math.PI/i))+n},easeOutElastic:function(e,t,n,a,r){var o=1.70158,i=0,s=a;if(0==t)return n;if(1==(t/=r))return n+a;if(i||(i=.3*r),s<Math.abs(a)){s=a;var o=i/4}else var o=i/(2*Math.PI)*Math.asin(a/s);return s*Math.pow(2,-10*t)*Math.sin((t*r-o)*2*Math.PI/i)+a+n},easeInOutElastic:function(e,t,n,a,r){var o=1.70158,i=0,s=a;if(0==t)return n;if(2==(t/=r/2))return n+a;if(i||(i=r*.3*1.5),s<Math.abs(a)){s=a;var o=i/4}else var o=i/(2*Math.PI)*Math.asin(a/s);return 1>t?-.5*s*Math.pow(2,10*(t-=1))*Math.sin((t*r-o)*2*Math.PI/i)+n:.5*s*Math.pow(2,-10*(t-=1))*Math.sin((t*r-o)*2*Math.PI/i)+a+n},easeInBack:function(e,t,n,a,r,o){return void 0==o&&(o=1.70158),a*(t/=r)*t*((o+1)*t-o)+n},easeOutBack:function(e,t,n,a,r,o){return void 0==o&&(o=1.70158),a*((t=t/r-1)*t*((o+1)*t+o)+1)+n},easeInOutBack:function(e,t,n,a,r,o){return void 0==o&&(o=1.70158),(t/=r/2)<1?a/2*t*t*(((o*=1.525)+1)*t-o)+n:a/2*((t-=2)*t*(((o*=1.525)+1)*t+o)+2)+n},easeInBounce:function(e,t,n,a,r){return a-jQuery.easing.easeOutBounce(e,r-t,0,a,r)+n},easeOutBounce:function(e,t,n,a,r){return(t/=r)<1/2.75?a*7.5625*t*t+n:2/2.75>t?a*(7.5625*(t-=1.5/2.75)*t+.75)+n:2.5/2.75>t?a*(7.5625*(t-=2.25/2.75)*t+.9375)+n:a*(7.5625*(t-=2.625/2.75)*t+.984375)+n},easeInOutBounce:function(e,t,n,a,r){return r/2>t?.5*jQuery.easing.easeInBounce(e,2*t,0,a,r)+n:.5*jQuery.easing.easeOutBounce(e,2*t-r,0,a,r)+.5*a+n}}),jQuery(document).ready(function(){jQuery("input").bind("input propertychange",function(){if(jQuery(this).parent().find(".error").remove(),jQuery(this).parent().find(".valid").remove(),"email"==jQuery(this).attr("id")){var e=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;""==jQuery(this).val()||" "==jQuery(this).val()?(jQuery(this).after("<span class='error'></span>"),jQuery(this).parent().find(".error").fadeIn("slow")):e.test(jQuery(this).val())?(jQuery(this).after("<span class='valid'></span>"),jQuery(this).parent().find(".valid").fadeIn("slow")):(jQuery(this).after("<span class='error'></span>"),jQuery(this).parent().find(".error").fadeIn("slow"))}else""==jQuery(this).val()||" "==jQuery(this).val()?(jQuery(this).after("<span class='error'></span>"),jQuery(this).parent().find(".error").fadeIn("slow")):(jQuery(this).after("<span class='valid'></span>"),jQuery(this).parent().find(".valid").fadeIn("slow"))}),jQuery("textarea").bind("input propertychange",function(){jQuery(this).parent().find(".error").remove(),jQuery(this).parent().find(".valid").remove(),""==jQuery(this).val()||" "==jQuery(this).val()?(jQuery(this).after("<span class='error'></span>"),jQuery(this).parent().find(".error").fadeIn("slow")):(jQuery(this).after("<span class='valid'></span>"),jQuery(this).parent().find(".valid").fadeIn("slow"))}),jQuery("#contact-form").on("ajax:beforeSend",function(){jQuery("span.error").fadeOut("slow"),jQuery("span.valid").fadeOut("slow"),jQuery("#thanks").hide(),jQuery("#error").hide(),jQuery("#timedout").hide(),jQuery("#state").hide();var e=!1,t=jQuery("#inquiry_name").val();""==t||" "==t?(jQuery("#inquiry_name").after("<span class='error'></span>"),jQuery("#inquiry_name").parent().find(".error").fadeIn("slow"),e=!0):(jQuery("#inquiry_name").after("<span class='valid'></span>"),jQuery("#inquiry_name").parent().find(".valid").fadeIn("slow"));var n=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,a=jQuery("#inquiry_email").val();""==a||" "==a?(jQuery("#inquiry_email").after("<span class='error'></span>"),jQuery("#inquiry_email").parent().find(".error").fadeIn("slow"),e=!0):n.test(a)?(jQuery("#inquiry_email").after("<span class='valid'></span>"),jQuery("#inquiry_email").parent().find(".valid").fadeIn("slow")):(jQuery("#inquiry_email").after("<span class='error'></span>"),jQuery("#inquiry_email").parent().find(".error").fadeIn("slow"),e=!0);var r=jQuery("#inquiry_message").val();return""==r||" "==r?(jQuery("#inquiry_message").after("<span class='error'></span>"),jQuery("#inquiry_message").parent().find(".error").fadeIn("slow"),e=!0):(jQuery("#inquiry_message").after("<span class='valid'></span>"),jQuery("#inquiry_message").parent().find(".valid").fadeIn("slow")),1==e?(jQuery("#error").fadeIn("slow"),setTimeout(function(){jQuery("#error").fadeOut("slow")},3e3),!1):void 0}).on("ajax:error",function(e,t,n,a){"timeout"==a?(jQuery("#timedout").fadeIn("slow"),setTimeout(function(){jQuery("#timedout").fadeOut("slow")},3e3)):(jQuery("#state").fadeIn("slow"),jQuery("#state").html("The following error occured: "+a),setTimeout(function(){jQuery("#state").fadeOut("slow")},3e3))}).on("ajax:success",function(){jQuery("span.valid").remove(),jQuery("#thanks").fadeIn("slow"),jQuery("input").val(""),jQuery("textarea").val(""),setTimeout(function(){jQuery("#thanks").fadeOut("slow")},3e3)})});var RemotePage={page:$("#page-wrapper"),container:$("#project-page"),content:$("#project-content"),itemTag:"article",currentPage:void 0,currentItem:void 0,previousItem:void 0,nextItem:void 0,currentItemOffset:void 0,init:function(){RemotePage.container.hide(),$("a[data-remote]").on("ajax:beforeSend",function(){var e,t;console.log("beforeSend"),e=$(this),RemotePage.currentItem&&(RemotePage.currentItem.removeClass("active"),RemotePage.container.hide()),RemotePage.currentItem=e.closest(RemotePage.itemTag),RemotePage.currentItemOffset=RemotePage.currentItem.offset().top,RemotePage.getNextAndPreviousItem(),RemotePage.currentItem.addClass("active"),t=RemotePage.currentItem.attr("id"),RemotePage.currentPage==t?RemotePage.page.fadeOut(750,function(){window.scrollTo(0,0),RemotePage.container.fadeIn(750)}):RemotePage.currentPage=t}).on("ajax:success",function(evt,xhr,settings){console.log("Site.success xhr "+eval(xhr));var that=$(this),url=that.attr("href");"undefined"!=typeof _gaq?_gaq.push(["_trackPageview",url]):console.log("_gaq disabled for _trackPageview"+url),RemotePage.content.html(eval(xhr));try{FB.XFBML.parse()}catch(e){console.log("FB error")}RemotePage.container.show("300")}).on("ajax:complete",function(){}).on("ajax:error",function(e,t){var n=$.parseJSON(t.getResponseHeader("X-Flash-Messages"));console.log("Site.error "+n.error)}),$("#next-project").on("click",function(e){var t=RemotePage.nextItem.find("a:first");console.log("link is "+RemotePage.nextItem.find("a:first").attr("href")),e.preventDefault(),t.trigger("click")}),$("#previous-project").on("click",function(e){var t=RemotePage.previousItem.find("a:first");console.log("link is "+RemotePage.previousItem.find("a:first").attr("href")),e.preventDefault(),t.trigger("click")}),$("#close-project").on("click",function(){jQuery("iframe").attr("src",jQuery("iframe").attr("src")),RemotePage.container.fadeOut(500,function(){RemotePage.page.fadeIn(500),window.scrollTo(0,RemotePage.currentItemOffset-75)})})},getNextAndPreviousItem:function(){var e=RemotePage.currentItem.parent(),t=e.find(RemotePage.itemTag).length;RemotePage.previousItem=RemotePage.currentItem.prev(),RemotePage.nextItem=RemotePage.currentItem.next();{RemotePage.nextItem.index()}console.log("prev index "+RemotePage.previousItem.index()),console.log("next index "+RemotePage.nextItem.index()),console.log("cur index "+RemotePage.currentItem.index()),console.log("length "+t),-1==RemotePage.previousItem.index()}};window.console||(console={log:function(){}}),jQuery(function(e){"use strict";var t=window.THEME||{};t.anim=function(){var t=e("#page-wrapper"),n=e("#header"),a=n.data("bg"),r=e(".navbar"),o=r.height();t.hide(),e(window).bind("scroll",function(){var t=e(window).scrollTop();t>=e(window).height()-o?e(".navbar").addClass("fixed"):e(".navbar").removeClass("fixed")}),a?e("<img/>").attr("src",a).load(function(){n.css("background-image","url("+a+")"),t.fadeIn(1200,function(){jQuery("#logo").fadeIn(600,function(){jQuery(".share").animate({opacity:"1","padding-top":"0"},500,function(){})})})}):t.fadeIn(1200)},t.fix=function(){if(navigator.userAgent.match(/IEMobile\/10\.0/)){var e=document.createElement("style");e.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}")),document.getElementsByTagName("head")[0].appendChild(e)}},t.placeholder=function(){e("input, textarea").placeholder()},t.carousel=function(){e(".carousel").each(function(){var t=e(this);t.find(".item").length>1?t.carousel({interval:3e3}):(t.find(".carousel-control").each(function(){e(this).css({display:"none"})}),t.find(".carousel-indicators").each(function(){e(this).css({display:"none"})}))})},t.navigation=function(){e(".navbar-nav li").on("click",function(t){var n=e("#"+e(this).attr("id")+"_page"),a=e(".navbar").height();console.log(n),e(this).parent().find("li").removeClass("active"),e(this).addClass("active"),e(window).width()<=767?e("html, body").stop().animate({scrollTop:n.offset().top-a},1500,"easeInOutExpo"):e("html, body").stop().animate({scrollTop:n.offset().top-a},1500,"easeInOutExpo"),t.preventDefault()})},t.scrollToTop=function(){var t=!1,n=e("#back-to-top");n.click(function(t){e("body,html").animate({scrollTop:"0"},750,"easeOutExpo"),t.preventDefault()}),e(window).scroll(function(){t=!0}),setInterval(function(){t&&(t=!1,e(window).scrollTop()>1e3?n.css("display","block"):n.css("display","none"))},250)},e(document).ready(function(){t.fix(),t.anim(),t.navigation(),t.scrollToTop(),t.placeholder(),RemotePage.init()})});