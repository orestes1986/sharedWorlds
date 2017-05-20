// code that is only sent to the client


/*

~/[path to apps folder]/ $ meteor login
~/[path to apps folder]/ $ meteor whoami

DEPLOY_HOSTNAME=eu-west-1.galaxy.meteor.com meteor deploy sharedworlds.eu.meteorapp.com --settings ./node_modules/settings.json

*/

////////////////
Meteor.subscribe("userData");
Meteor.subscribe("tags");
////////////////
// subscribe to read WORLD data
////////////////
Meteor.subscribe("worlds");
// Meteor.subscribe("worldEditingUsers");
// Meteor.subscribe("worldComments");
////////////////
// subscribe to read EVENT data
////////////////
Meteor.subscribe("events");
// Meteor.subscribe("eventEditingUsers");
// Meteor.subscribe("eventComments");
////////////////
// subscribe to read ADVENTURE data
////////////////
Meteor.subscribe("cyoas");
// Meteor.subscribe("cyoaEditingUsers");
// Meteor.subscribe("cyoaComments");
Meteor.subscribe("cyoaParams");
Meteor.subscribe("pages");
Meteor.subscribe("pagesBodies");
////////////////
// subscribe to read GAME data
////////////////
Meteor.subscribe("gameAdvs");
// Meteor.subscribe("gameAdvsEditingUsers");
// Meteor.subscribe("gameAdvsComments");
Meteor.subscribe("players");
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
