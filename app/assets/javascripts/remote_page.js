var RemotePage = {
  page: $("#page-wrapper"),
  modal: $("#remote-page-modal"),
  content: $("#remote-page-modal-content"),
  currentItemOffset: undefined, 

  init: function() {
    RemotePage.modal.hide();
    $('.modal-link').attr('data-remote', true)
    .on("ajax:beforeSend", function(evt, xhr, settings) {
      var that = $(this); 

      if(RemotePage.modal.is(':hidden')) {

      }
      else {
        RemotePage.content.fadeOut(300);
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

      RemotePage.content.html(eval(xhr)); 

      try {
        FB.XFBML.parse();
      } catch (e) {
        console.log("FB error");
      }
      if(RemotePage.modal.is(':hidden')) {
        RemotePage.page.fadeOut(750, function(){
          RemotePage.modal.fadeIn(750);
          window.scrollTo(0, 0);
        });
      }
      else {
        RemotePage.content.fadeIn(750);
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
      RemotePage.modal.fadeOut(500, function(){
        RemotePage.page.fadeIn(500);
        window.scrollTo(0, RemotePage.currentItemOffset - 75);
  		});
    });
  }
}
