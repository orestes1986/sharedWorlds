
// set up the iron router
Router.configure({
	layoutTemplate: 'ApplicationLayout'
});
/*
// 'home' page
Router.route('/', function () {
	console.log("you hit / ");
	this.render("navbar", {to:"header"});
	this.render("worldList", {to:"main"});	
});

// individual world page
Router.route('/worlds/:_id', function () {
	console.log("you hit /worlds	"+this.params._id);
	Session.set("worldid", this.params._id);
	this.render("navbar", {to:"header"});
	this.render("worldItem", {to:"main"});	
});
*/

// 'HOME' page
Router.route('/', function () {
// 	console.log("you hit / ");
	Session.set("worldid", "none");
	Session.set("eventid", "none");
	Session.set("cyoaid", "none");
	Session.set("pageid", "none");
	this.render("navbar-plain", {to:"header"});
	this.render("worldList", {to:"main"});	
});
// 'HOME' page
Router.route('/users/:_id', function () {
// 	console.log("you hit / ");
	Session.set("worldid", "none");
	Session.set("eventid", "none");
	Session.set("cyoaid", "none");
	Session.set("pageid", "none");
	Session.set("userHomeid", this.params._id);
	this.render("navbar-plain", {to:"header"});
	this.render("userItem", {to:"main"});	
});
// individual 'WORLD' page
Router.route('/worlds/:_id', function () {
	Session.set("worldid", this.params._id);
	Session.set("eventid", "none");
	Session.set("cyoaid", "none");
	Session.set("pageid", "none");
	Session.set("worldBegins", 0);
	Session.set("worldEnds", 1);
	var world = Worlds.findOne({_id:Session.get("worldid")});
	if (world) {
		Session.set("worldEvents", Events.find({worldid:Session.get("worldid")}).fetch());
		var worldEventsBegining = Events.find({
				worldid:Session.get("worldid")
		}, {
			sort:{start: 1}
		}).fetch();
		var worldEventsEnding = Events.find({
				worldid:Session.get("worldid")
			}, {
				sort:{end: 1}
			}).fetch();
		if (Session.get("worldEvents").length > 0) {
			Session.set("worldBegins", worldEventsBegining[0].start);
			if (worldEventsEnding[worldEventsEnding.length-1].end) {
			Session.set("worldEnds", worldEventsEnding[worldEventsEnding.length-1].end);
			} else {
			Session.set("worldEnds", worldEventsEnding[worldEventsEnding.length-1].start);
			}
			// 			console.log(Session.get("worldEnds"));
		}
	}
	this.render("navbar-plain", {to:"header"});
	this.render("worldItem", {to:"main"});
});

// individual adventure page
Router.route('/cyoas/:_id', function () {
// 	console.log("you hit /adventures	"+this.params._id);
	Session.set("cyoaid", this.params._id);
	var page = Pages.findOne({cyoaid:Session.get("cyoaid"), parentid:"none"});
	if (page) {
		Session.set("pageid", page._id);
	}
	this.render("navbar-plain", {to:"header"});
	this.render("cyoaItem", {to:"main"});	
});
// individual page page
Router.route('/cyoas/:cyoaid/page/:pageid', function () {
// 	console.log("you hit /adventures	"+this.params._id);
	Session.set("pageid", this.params.pageid);
	this.render("navbar-plain", {to:"header"});
	this.render("cyoaItem", {to:"main"});	
});
// page list page
Router.route('/cyoas/:cyoaid/list', function () {
// 	console.log("you hit /adventures	"+this.params._id);
	this.render("navbar-plain", {to:"header"});
	this.render("allPageList", {to:"main"});	
});