// code that is only sent to the client

////////////////
// subscribe to read WORLD data
////////////////
Meteor.subscribe("worlds");
Meteor.subscribe("worldEditingUsers");
Meteor.subscribe("worldComments");
////////////////
// subscribe to read EVENT data
////////////////
Meteor.subscribe("events");
Meteor.subscribe("eventEditingUsers");
Meteor.subscribe("eventComments");
////////////////
// subscribe to read ADVENTURE data
////////////////
Meteor.subscribe("cyoas");
Meteor.subscribe("cyoaEditingUsers");
Meteor.subscribe("cyoaComments");
////////////////
Meteor.subscribe("pages");
////////////////
/////////

intervTime = 100;

/// infiniscroll

Session.set("objLimit", 40);
lastScrollTop = 0;
$(window).scroll(function(event){
	// test if we are near the bottom of the window
	if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
		// where are we in the page?
		var scrollTop = $(this).scrollTop();
		// test if we are going down
		if (scrollTop > lastScrollTop){
			// yes we are heading down...
		Session.set("objLimit", Session.get("objLimit") + 4);
		}

		lastScrollTop = scrollTop;
	}
})
