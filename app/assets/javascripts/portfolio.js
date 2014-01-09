var Portfolio = {
  page: $("#page-wrapper"),
  container: $("#project-page"),
  content: $("#project-content"),
  itemTag: 'article',
  currentItem: undefined,
  previousItem: undefined,
  nextItem: undefined,
  currentItemOffset: undefined, 

  init: function() {
    Portfolio.container.hide();
    $(Portfolio.itemTag + ' a[data-remote]').on("ajax:beforeSend", function(evt, xhr, settings) {
      var that = $(this); 

      if(Portfolio.container.is(':hidden')) {

      }
      else {
        Portfolio.content.fadeOut(300);
      }

      // Get the parent (currentItem) of the link
      Portfolio.currentItem = that.closest(Portfolio.itemTag);
      var offset = Portfolio.currentItem.offset().top;
  		if(offset) {
        Portfolio.currentItemOffset = offset;
      }
      Portfolio.getNextAndPreviousItem();
    })
    .on("ajax:success", function(evt, xhr, settings) {
      //console.log("Site.success xhr " + eval(xhr))
      var that = $(this), 
          url = that.attr('href');
      
      if(Modernizr.history) {
        history.pushState(null, null, url);
      }
          
      if (typeof(_gaq) != "undefined") {
        _gaq.push(['_trackPageview', url]);  
      } else {
        console.log("_gaq disabled for _trackPageview" + url)
      }

      Portfolio.content.html(eval(xhr)); 

      $("#previous-project-name").text(Portfolio.previousItem.find(".post-title:first").text());
      $("#next-project-name").text(Portfolio.nextItem.find(".post-title:first").text());

      try {
        FB.XFBML.parse();
      } catch (e) {
        console.log("FB error");
      }
      if(Portfolio.container.is(':hidden')) {
        Portfolio.page.fadeOut(750, function(){
          Portfolio.container.fadeIn(750);
          window.scrollTo(0, 0);
        });
      }
      else {
        Portfolio.content.fadeIn(750);
      }

    })
    .on('ajax:complete', function(evt, xhr, status) {
      
    })
    .on("ajax:error", function(evt, xhr, status, error) {
      var flash = $.parseJSON(xhr.getResponseHeader('X-Flash-Messages'));
      console.log("Site.error " + flash.error);
    });
    
    $("#next-project").on('click', function(e) {
      var link = Portfolio.nextItem.find("a:first");
      //console.log("link is " + Portfolio.nextItem.find("a:first").attr("href"));
      e.preventDefault();
      link.trigger("click");
    }); 
    
    $("#previous-project").on('click', function(e) {
      var link = Portfolio.previousItem.find("a:first");
      //console.log("link is " + Portfolio.previousItem.find("a:first").attr("href"));
      e.preventDefault();
      link.trigger("click");
    });
    /* Function to close project */ 
    $("#close-project").on('click', function(){
      jQuery('iframe').attr('src', jQuery('iframe').attr('src')); // required to stop video's on exit project
      Portfolio.container.fadeOut(500, function(){
        Portfolio.page.fadeIn(500);
        window.scrollTo(0, Portfolio.currentItemOffset - 75);
  		});
    });
  },
  getNextAndPreviousItem: function() {
    var parent = Portfolio.currentItem.parent(),
        length = parent.find(Portfolio.itemTag).length;  
    
    Portfolio.previousItem = Portfolio.currentItem.prev();
    Portfolio.nextItem = Portfolio.currentItem.next();

    if (Portfolio.previousItem.index() == -1) {
      Portfolio.previousItem = parent.find(Portfolio.itemTag).last();  
    }

    if (Portfolio.nextItem.index() == -1) { 
      Portfolio.nextItem = parent.find(Portfolio.itemTag).first();
    }
  }
}
