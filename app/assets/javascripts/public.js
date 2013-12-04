//= require jquery_ujs
//= require jquery.placeholder
//= require jquery.easing
//= require remote_form
//= require remote_page
//= require supersized.3.2.7.js

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
        if(window.supersized_slides) {
        	$.supersized({
        		// Functionality
        		slideshow               :   1,			// Slideshow on/off
        		autoplay				:	1,			// Slideshow starts playing automatically
        		start_slide             :   1,			// Start slide (0 is random)
        		stop_loop				:	0,			// Pauses slideshow on last slide
        		random					: 	0,			// Randomize slide order (Ignores start slide)
        		slide_interval          :   6000,		// Length between transitions
        		transition              :   1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
        		transition_speed		:	1000,		// Speed of transition
        		new_window				:	1,			// Image links open in new window/tab
        		pause_hover             :   0,			// Pause slideshow on hover
        		keyboard_nav            :   1,			// Keyboard navigation on/off
        		performance				:	1,			// 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
        		image_protect			:	1,			// Disables image dragging and right click with Javascript
												   
        		// Size & Position						   
        		min_width		        :   0,			// Min width allowed (in pixels)
        		min_height		        :   0,			// Min height allowed (in pixels)
        		vertical_center         :   1,			// Vertically center background
        		horizontal_center       :   1,			// Horizontally center background
        		fit_always				:	0,			// Image will never exceed browser width or height (Ignores min. dimensions)
        		fit_portrait         	:   1,			// Portrait images will not exceed browser height
        		fit_landscape			:   0,			// Landscape images will not exceed browser width
												   
        		// Components							
        		slide_links				:	'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
        		thumb_links				:	0,			// Individual thumb links for each slide
        		thumbnail_navigation    :   0,			// Thumbnail navigation
                slides                  :   window.supersized_slides,
									
        		// Theme Options			   
        		progress_bar			:	0,			// Timer for each slide							
        		mouse_scrub				:	0
            })
        }
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
    /* ==================================================
       Tooltip
    ================================================== */

    THEME.toolTip = function(){ 
        $('a[data-toggle=tooltip]').tooltip();
    }

    /* ==================================================
       Map
    ================================================== */

    THEME.map = function(){
    	if($('.map').length > 0)
    	{

    		$('.map').each(function(i,e){

    			$map = $(e);
    			$map_id = $map.attr('id');
    			$map_lat = $map.attr('data-mapLat');
    			$map_lon = $map.attr('data-mapLon');
    			$map_zoom = parseInt($map.attr('data-mapZoom'));
    			$map_title = $map.attr('data-mapTitle');
			
			
			
    			var latlng = new google.maps.LatLng($map_lat, $map_lon);			
    			var options = { 
    				scrollwheel: false,
    				draggable: false, 
    				zoomControl: false,
    				disableDoubleClickZoom: false,
    				disableDefaultUI: true,
    				zoom: $map_zoom,
    				center: latlng,
    				mapTypeId: google.maps.MapTypeId.ROADMAP
    			};
			
    			var styles = [ 
    							{
    							  stylers: [
    								{ hue: "#2F3238" },
    								{ saturation: -20 }
    							  ]
    							}, {
    								featureType: "road",
    								elementType: "geometry",
    								stylers: [
    									{ lightness: 100 },
    									{ visibility: "simplified" }
    							  ]
    							}, {
    								featureType: "road",
    								elementType: "labels",
    								stylers: [
    									{ visibility: "off" }
    							  ]
    							}
    						];
			
    			var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
			
    			var map = new google.maps.Map(document.getElementById($map_id), options);
		
    			var image = '_include/img/marker.png';
    			var marker = new google.maps.Marker({
    				position: latlng,
    				map: map,
    				title: $map_title,
    				icon: image
    			});
			
    			map.mapTypes.set('map_style', styledMap);
      			map.setMapTypeId('map_style');
			
    			var contentString = '<p><strong>Company Name</strong><br>Address here</p>';
       
    			var infowindow = new google.maps.InfoWindow({
    				content: contentString
    			});
			
    			google.maps.event.addListener(marker, 'click', function() {
          			infowindow.open(map,marker);
        		});

    		});
    	}	
    }
/*==================================================
  	Init
==================================================*/

  $(document).ready(function() {
    THEME.fix();
    THEME.supersized();
    THEME.anim();
    $('.navbar-nav a').attr('data-remote', true); 
    //THEME.navigation();
    THEME.scrollToTop();
    THEME.placeholder();
    THEME.toolTip();
    THEME.map();
    RemotePage.init();
    
    
  });

}); 
