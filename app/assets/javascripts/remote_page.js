var RemotePage = {
  page: $("#page-wrapper"),
  modal: $("#remote-page-modal"),
  content: $("#remote-page-modal-content"),
  currentItemOffset: undefined, 

  init: function() {
    $("#remote-page-modal").hide();
    $('.modal-link').attr('data-remote', true)
    .on("ajax:beforeSend", function(evt, xhr, settings) {
      var that = $(this); 

      if($("#remote-page-modal").is(':hidden')) {

      }
      else {
        $("#remote-page-modal-content").fadeOut(300);
      }
  		RemotePage.currentItemOffset = that.offset().top;
    })
    .on("ajax:success", function(evt, xhr, settings) {
      // console.log("Site.success xhr " + eval(xhr))
      var that = $(this), 
          url = that.attr('href');

      if (typeof(_gaq) != "undefined") {
        _gaq.push(['_trackPageview', url]);  
      } else {
        console.log("_gaq disabled for _trackPageview" + url)
      }

      $("#remote-page-modal-content").html(eval(xhr));
      
      if(Modernizr.history) {
        history.pushState(null, null, url);
      } 
      
      try {
        FB.XFBML.parse();
      } catch (e) {
        console.log("FB error");
      }
      if($("#remote-page-modal").is(':hidden')) {
        $("#page-wrapper").fadeOut(750, function(){
          $("#remote-page-modal").fadeIn(750);
          window.scrollTo(0, 0);
        });
      }
      else {
        $("#remote-page-modal-content").fadeIn(750);
      }

    })
    .on('ajax:complete', function(evt, xhr, status) {
      
    })
    .on("ajax:error", function(evt, xhr, status, error) {
      var flash = $.parseJSON(xhr.getResponseHeader('X-Flash-Messages'));
      console.log("Site.error " + flash.error);
    });
    
    /* Function to close modal */ 
    $("#close-remote-page-modal").on('click', function(){
      jQuery('iframe').attr('src', jQuery('iframe').attr('src')); // required to stop video's on exit project
      $("#remote-page-modal").fadeOut(500, function(){
        $("#page-wrapper").fadeIn(500);
        window.scrollTo(0, RemotePage.currentItemOffset - 75);
  		});
    });
  }
}
