jQuery(function($){

var ANUBIS = window.ANUBIS || {};

/* ==================================================
   Navigation
================================================== */
ANUBIS.navigation = function(){ 
		$('ul.nav li.dropdown').hover(function () {
			$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn();
		}, function () {
			$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut();
		});
} 
/* ==================================================
   Drop Menu
================================================== */

ANUBIS.subMenu = function(){
	$('#menu-nav').supersubs({
		minWidth: 12,
		maxWidth: 27,
		extraWidth: 0 // set to 1 if lines turn over
	}).superfish({
		delay: 0,
		animation: {opacity:'show'},
		speed: 'fast',
		autoArrows: false,
		dropShadows: false
	});	
}

/* ==================================================
   Mobile Navigation
================================================== */
/* Clone Menu for use later */
var mobileMenuClone = $('#menu').clone().attr('id', 'navigation-mobile');

ANUBIS.mobileNav = function(){
	var windowWidth = $(window).width();
	
	// Show Menu or Hide the Menu
	if( windowWidth <= 979 ) {
		if( $('#mobile-nav').length > 0 ) {
			mobileMenuClone.insertAfter('header');
			$('#navigation-mobile #menu-nav').attr('id', 'menu-nav-mobile').wrap('<div class="container"><div class="row"><div class="span12" />');
		}
	} else {
		$('#navigation-mobile').css('display', 'none');
		if ($('#mobile-nav').hasClass('open')) {
			$('#mobile-nav').removeClass('open');	
		}
	}
}

// Call the Event for Menu 
ANUBIS.listenerMenu = function(){
	$('#mobile-nav').on('click', function(e){
		$(this).toggleClass('open');
		
		$('#navigation-mobile').stop().slideToggle(350, 'easeOutExpo');
		
		e.preventDefault();
	});
}

/* ==================================================
   Hover for Touch Devices
================================================== */

// Fix Hover on Touch Devices
ANUBIS.utils = function(){
	
	$('.work-item-thumbs, .box, .post-thumb, .single-people, .item-project, .lightbox').bind('touchstart', function(){
		$(".tapped").removeClass("tapped");
      	$(this).addClass('tapped');
    });
	
}

/* ==================================================
   Hover for Touch Devices
================================================== */

// Fix Hover on Touch Devices
ANUBIS.carousel = function(){
	
  $('.carousel').carousel({
    interval: 4000
  })
	
}


/* ==================================================
   Filter Team
================================================== */

ANUBIS.people = function (){
	if($('#team-people').length > 0){		
		var $container = $('#team-people');
		
		$container.imagesLoaded(function() {
			$container.isotope({
			  // options
			  animationEngine: 'best-available',
			  itemSelector : '.single-people',
			  layoutMode : 'fitRows'
			});
		});
	
		
		// filter items when filter link is clicked
		var $optionSets = $('#team-filter .option-set'),
			$optionLinks = $optionSets.find('a');
	
		  $optionLinks.click(function(){
			var $this = $(this);
			// don't proceed if already selected
			if ( $this.hasClass('selected') ) {
			  return false;
			}
			var $optionSet = $this.parents('.option-set');
			$optionSet.find('.selected').removeClass('selected');
			$this.addClass('selected');
	  
			// make option object dynamically, i.e. { filter: '.my-filter-class' }
			var options = {},
				key = $optionSet.attr('data-option-key'),
				value = $this.attr('data-option-value');
			// parse 'false' as false boolean
			value = value === 'false' ? false : value;
			options[ key ] = value;
			if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
			  // changes in layout modes need extra logic
			  changeLayoutMode( $this, options )
			} else {
			  // otherwise, apply new options
			  $container.isotope( options );
			}
			
			return false;
		});
	}
}

/* ==================================================
   Filter Portfolio
================================================== */

ANUBIS.portfolio = function (){
	if($('#portfolio-projects').length > 0){		
		var $container = $('#portfolio-projects');
		
		$container.imagesLoaded(function() {
			$container.isotope({
			  // options
			  animationEngine: 'best-available',
			  itemSelector : '.item-project',
			  layoutMode : 'fitRows'
			});
		});
	
		
		// filter items when filter link is clicked
		var $optionSets = $('#portfolio-filter .option-set'),
			$optionLinks = $optionSets.find('a');
	
		  $optionLinks.click(function(){
			var $this = $(this);
			// don't proceed if already selected
			if ( $this.hasClass('selected') ) {
			  return false;
			}
			var $optionSet = $this.parents('.option-set');
			$optionSet.find('.selected').removeClass('selected');
			$this.addClass('selected');
	  
			// make option object dynamically, i.e. { filter: '.my-filter-class' }
			var options = {},
				key = $optionSet.attr('data-option-key'),
				value = $this.attr('data-option-value');
			// parse 'false' as false boolean
			value = value === 'false' ? false : value;
			options[ key ] = value;
			if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
			  // changes in layout modes need extra logic
			  changeLayoutMode( $this, options )
			} else {
			  // otherwise, apply new options
			  $container.isotope( options );
			}
			
			return false;
		});
	}
}


/* ==================================================
   DropDown 
================================================== */

ANUBIS.dropDown = function(){
	$('.dropmenu').on('click', function(e){
		$(this).toggleClass('open');
		
		$('.dropmenu-active').stop().slideToggle(350, 'easeOutExpo');
		
		e.preventDefault();
	});
	
	$('.dropmenu-active a').on('click', function(e){
		var dropdown = $(this).parents('.dropdown');
		var selected = dropdown.find('.dropmenu .selected');
		var newSelect = $(this).html();
		
		$('.dropmenu').removeClass('open');
		$('.dropmenu-active').slideUp(350, 'easeOutExpo');
		
		selected.html(newSelect);
		
		e.preventDefault();
	});
}


/* ==================================================
   Contact Form
================================================== */

ANUBIS.contactForm = function(){
	$("#contact-submit").on('click',function() {
		$contact_form = $('#contact-form');
		
		var fields = $contact_form.serialize();
		
		$.ajax({
			type: "POST",
			url: "_include/php/contact.php",
			data: fields,
			dataType: 'json',
			success: function(response) {
				
				if(response.status){
					$('#contact-form input').val('');
					$('#contact-form textarea').val('');
				}
				
				$('#response').empty().html(response.html);
			}
		});
		return false;
	});
}


/* ==================================================
   Map
================================================== */

ANUBIS.map = function(){
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
								// Insert Here Your Custom Style if you Want Colorize the Map
							}
						];
			
			var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
			
			var map = new google.maps.Map(document.getElementById($map_id), options);
		
			var image = '_include/img/map-marker.png';
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

/* ==================================================
   Flickr Widget
================================================== */

ANUBIS.flickr = function(){
	// check if flickr_list exists
	if($('.flickr-list').length > 0){
		
		// cycling all the flickr_list
		$('.flickr-list').each(function(){
			$count = $(this).attr('data-count'); // set photos counts by attribute data-count
			
			// append ul into flickr_list
			$(this).html('<ul></ul>');
			
			$(this).find('ul').jflickrfeed({
				limit: $count, // photos limit
				itemTemplate: '<li><a href="{{link}}" title="{{title}}" target="_blank"><span class="overlay"></span><i class="font-icon-search"></i><img src="{{image_m}}" alt="{{title}}" title="{{title}}" /></a></li>', // list html template
				qstrings: {
					id: '52617155@N08' // your Flickr ID 
				}
			});
		}); 
	}
}

/* ==================================================
   Twitter Widget
================================================== */

ANUBIS.twitter = function(){
	// check if twitter_list exists
	if($('.twitter-list').length > 0){
		
		// cycling all the twitter_list  
		$(".twitter-list").each(function(){
			$count = $(this).attr('data-count'); // set tweet counts by attribute data-count
			
			$(this).tweet({
				join_text: '',
				username: "Bluxart", // your Twitter ID
				count: $count, // tweets limit
				view_text: "View on Twitter" // alt text
			});	
		});
	}	
}

/* ==================================================
   Accordion
================================================== */

ANUBIS.accordion = function(){
	var accordion_trigger = $('.accordion-heading.accordionize');
	
	accordion_trigger.delegate('.accordion-toggle','click', function(e){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		   	$(this).addClass('inactive');
		}
		else{
		  	accordion_trigger.find('.active').addClass('inactive');          
		  	accordion_trigger.find('.active').removeClass('active');   
		  	$(this).removeClass('inactive');
		  	$(this).addClass('active');
	 	}
		e.preventDefault();
	});
}

/* ==================================================
   Toggle
================================================== */

ANUBIS.toggle = function(){
	var accordion_trigger_toggle = $('.accordion-heading.togglize');
	
	accordion_trigger_toggle.delegate('.accordion-toggle','click', function(e){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		   	$(this).addClass('inactive');
		}
		else{
		  	$(this).removeClass('inactive');
		  	$(this).addClass('active');
	 	}
		e.preventDefault();
	});
}


/* ==================================================
   Tooltip
================================================== */

ANUBIS.toolTip = function(){ 
    $('a[data-toggle=tooltip]').tooltip();
}


/* ==================================================
	Scroll to Top
================================================== */

ANUBIS.scrollToTop = function(){
	var didScroll = false;

	var $arrow = $('#back-to-top');

	$arrow.click(function(e) {
		$('body,html').animate({ scrollTop: "0" }, 750, 'easeOutExpo' );
		e.preventDefault();
	})

	$(window).scroll(function() {
		didScroll = true;
	});

	setInterval(function() {
		if( didScroll ) {
			didScroll = false;

			if( $(window).scrollTop() > 1000 ) {
				$arrow.css('display', 'block');
			} else {
				$arrow.css('display', 'none');
			}
		}
	}, 250);
}

/* ==================================================
	Init
================================================== */



$(document).ready(function(){
	// Call placeholder.js to enable Placeholder Property for IE9
	/*Modernizr.load([
	{
		test: Modernizr.input.placeholder,
		nope: '_include/js/placeholder.js', 
		complete : function() {
				if (!Modernizr.input.placeholder) {
						Placeholders.init({
						live: true,
						hideOnFocus: false,
						className: "yourClass",
						textColor: "#999"
						});    
				}
		}
	}
	]); */
	
 // ANUBIS.utils();
	
 // ANUBIS.getSize();
 // ANUBIS.centerImg();
	
 // ANUBIS.mobileNav();
 // ANUBIS.listenerMenu();
 // ANUBIS.subMenu();
 ANUBIS.navigation();
 ANUBIS.dropDown();
 ANUBIS.carousel();
 // ANUBIS.people();
 // ANUBIS.portfolio();
 // ANUBIS.accordion();
 // ANUBIS.toggle();
 // ANUBIS.toolTip();
 // ANUBIS.fancyBox();
 // ANUBIS.map();
 // ANUBIS.flickr();
 // ANUBIS.twitter();
 // ANUBIS.contactForm();
 // ANUBIS.scrollToTop();
 // ANUBIS.changeOpacity();
});

$(window).resize(function(){
	ANUBIS.centerImg();
	ANUBIS.mobileNav();
});

});
