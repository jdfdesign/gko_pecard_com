//= require jquery_ujs
//= require jquery.placeholder
//= require jquery.easing
//= require remote_form
//= require remote_page

// make console.log safe to use
window.console || (console = {
  log: function() {}
});

jQuery(function($){
  'use strict';
  var THEME = window.THEME || {};


  THEME.anim = function(){
    /* Starting Animation on Load */ 
    var wrapper = $("#page-wrapper"),
        header= $("#header"),
        image_url = $("#main-carousel img:first").attr('src'),
        navbar = $('.navbar'),
        navbarHeight = navbar.height();
    
    wrapper.hide();

    $(window).bind('scroll', function () {
      var scrollTop = $(window).scrollTop();
      scrollTop >= $(window).height() - navbarHeight ? $(".navbar").addClass("fixed") : $(".navbar").removeClass("fixed");
    });
    
    if(image_url) {
      $('<img/>').attr('src', image_url).load(function() {
        $('.carousel-inner item').css('max-height', $(window).height());
        $("#page-wrapper").fadeIn(1200, function() { 
        	jQuery('#logo').fadeIn(600, function() {
        		jQuery('.share').animate({opacity: '1', 'padding-top': '0'}, 500,function() {

        		});
        	});
      	});
      });
    } else {
      wrapper.fadeIn(1200);
    }
  }

  /* ==================================================
  	Fix
  ================================================== */

  THEME.fix = function(){
    // fix for ie device_width bug 
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      var msViewportStyle = document.createElement("style");
      msViewportStyle.appendChild(
      document.createTextNode("@-ms-viewport{width:auto!important}"));
      document.getElementsByTagName("head")[0].
      appendChild(msViewportStyle);
    }
  };
  
  /* ==================================================
  	Placeholder
  ================================================== */

  THEME.placeholder = function(){
    // enable placeholder fix for old browsers
    $('input, textarea').placeholder();
  };
  
  /* ==================================================
  	Supersized
  ================================================== */

    THEME.supersized = function() {
    	$.supersized({
    		slide_interval : 3000, // Length between transitions
    		transition : 3, // 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
    		transition_speed : 1200, // Speed of transition
    		slides : supersized_slides,
    		_init: function(){
        console.log('hi im supersized')               
      },
    		theme :{
    		  _init: function(){
          console.log('hi im supersized')               
        }}
      })
    };
    
  /* ==================================================
  	Carousel
  ================================================== */

    THEME.carousel = function() {
      // start the carousel if there is more than one image
      // else hide controls
      $('.carousel').each(function(index) {
        var _self = $(this);
        if (_self.find('.item').length > 1) {
          _self.carousel({
            interval: 3000
          });
        } else {
          _self.find('.carousel-control').each(function(index) {
            $(this).css({
              display: 'none'
            })
          })
          _self.find('.carousel-indicators').each(function(index) {
            $(this).css({
              display: 'none'
            })
          })
        }
      })
    };

  /* ==================================================
    	Navigation
    ================================================== */
    THEME.navigation = function() {

      $('.navbar-nav li').on("click", function(e) {
        var target = $("#" + $(this).attr('id') + "_page"),
            navbarHeight = $('.navbar').height();
        console.log(target);
        $(this).parent().find('li').removeClass('active');
        $(this).addClass('active');

        if ($(window).width() <= 767) {
          $('html, body').stop().animate({
            scrollTop: target.offset().top - navbarHeight
          }, 1500, 'easeInOutExpo');
        } else {
          $('html, body').stop().animate({
            scrollTop: target.offset().top - navbarHeight
          }, 1500, 'easeInOutExpo');
        }

        e.preventDefault();
      })
    }
  /* ==================================================
    	Scroll to Top
    ================================================== */

    THEME.scrollToTop = function() {
      var didScroll = false;

      var $arrow = $('#back-to-top');

      $arrow.click(function(e) {
        $('body,html').animate({
          scrollTop: "0"
        }, 750, 'easeOutExpo');
        e.preventDefault();
      });

      $(window).scroll(function() {
        didScroll = true;
      });

      setInterval(function() {
        if (didScroll) {
          didScroll = false;

          if ($(window).scrollTop() > 1000) {
            $arrow.css('display', 'block');
          } else {
            $arrow.css('display', 'none');
          }
        }
      }, 250);
    };
/*==================================================
  	Init
==================================================*/

  $(document).ready(function() {
    THEME.fix();
    //THEME.supersized();
    THEME.anim(); 
    THEME.navigation();
    THEME.scrollToTop();
    THEME.placeholder();
    RemotePage.init();
  });

}); 
