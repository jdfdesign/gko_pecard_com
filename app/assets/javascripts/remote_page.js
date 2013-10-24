var RemotePage = {
  page: $("#page-wrapper"),
  container: $("#project-page"),
  content: $("#project-content"),
  itemTag: 'article',
  currentPage: undefined,
  currentItem: undefined,
  previousItem: undefined,
  nextItem: undefined,
  currentItemOffset: undefined, 

  init: function() {
    RemotePage.container.hide();
    $('a[data-remote]').on("ajax:beforeSend", function(evt, xhr, settings) {
      var that, id; 
      console.log("beforeSend")
      that = $(this); 

      // Remove active class on currentItem if any
      if(RemotePage.currentItem){
        RemotePage.currentItem.removeClass('active');
        RemotePage.container.hide();
      }

      // Get the parent (currentItem) of the link
      RemotePage.currentItem = that.closest(RemotePage.itemTag);
  		RemotePage.currentItemOffset = RemotePage.currentItem.offset().top;
      RemotePage.getNextAndPreviousItem();
			
      // Flag parent (currentItem) as active 
      RemotePage.currentItem.addClass('active');
      
      // Store de current parent (currentItem) for next/prev function
      id = RemotePage.currentItem.attr('id');

      if (RemotePage.currentPage == id) { 

        RemotePage.page.fadeOut(750, function(){
    			window.scrollTo(0,0);
    			RemotePage.container.fadeIn(750);
    		});
      } else {
        RemotePage.currentPage = id;
      }

    })
    .on("ajax:success", function(evt, xhr, settings) {
      console.log("Site.success xhr " + eval(xhr))
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

      RemotePage.container.show('300');

    })
    .on('ajax:complete', function(evt, xhr, status) {
      
    })
    .on("ajax:error", function(evt, xhr, status, error) {
      var flash = $.parseJSON(xhr.getResponseHeader('X-Flash-Messages'));
      console.log("Site.error " + flash.error);
    });
    
    /* Function to close project */ 
    $("#close-project").on('click', function(){
      jQuery('iframe').attr('src', jQuery('iframe').attr('src')); // required to stop video's on exit project
      RemotePage.container.fadeOut(500, function(){
        RemotePage.page.fadeIn(500);
        window.scrollTo(0, RemotePage.currentItemOffset - 75);
  		});
    });
  },
  getNextAndPreviousItem: function() { 
    RemotePage.previousItem = RemotePage.currentItem.prev();
    RemotePage.nextItem = RemotePage.currentItem.next();
    
    if (RemotePage.previousItem == 0){
			RemotePage.previousItem = jQuery('.lastest-projects-container').length;
		}
		if (RemotePage.nextItem == jQuery('.lastest-projects-container').length + 1) {
			RemotePage.nextItem = 1;
		}
  }
}
