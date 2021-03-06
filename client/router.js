
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
// 'DEMO' page
Router.route('/demo', function () {
// 	console.log("you hit / ");
	this.render("navbar-plain", {to:"header"});
	this.render("demotemplate", {to:"main"});
});

// 'HOME' page
Router.route('/', function () {
// 	console.log("you hit / ");
	Session.set("worldid", "none");
	Session.set("eventid", "none");
	Session.set("cyoaid", "none");
	Session.set("pageid", "none");
	Session.set("gameid", "none");
	this.render("navbar-plain", {to:"header"});
	this.render("worldList", {to:"main"});	
});
// 'HOME' page
Router.route('/account/:_id', function () {
// 	console.log("you hit / ");
	Session.set("worldid", "none");
	Session.set("eventid", "none");
	Session.set("cyoaid", "none");
	Session.set("pageid", "none");
	Session.set("gameid", "none");
	if	(this.params._id) {
		Session.set("userHomeid", this.params._id);
	} else {
		Session.set("userHomeid", Meteor.user()._id);
	}
	this.render("navbar-plain", {to:"header"});
	this.render("userItem", {to:"main"});	
});
// 'HOME' page
Router.route('/genre/:_id', function () {
// 	console.log("you hit / ");
	Session.set("worldid", "none");
	Session.set("eventid", "none");
	Session.set("cyoaid", "none");
	Session.set("pageid", "none");
	Session.set("gameid", "none");
	Session.set("genreid", this.params._id);
	this.render("navbar-plain", {to:"header"});
	this.render("genreItem", {to:"main"});	
});
// 'HOME' page
Router.route('/account', function () {
// 	console.log("you hit / ");
	Session.set("worldid", "none");
	Session.set("eventid", "none");
	Session.set("cyoaid", "none");
	Session.set("pageid", "none");
	Session.set("gameid", "none");
	console.log(Meteor.user());
	Session.set("userHomeid", Meteor.user()._id);
	this.render("navbar-plain", {to:"header"});
	this.render("userItem", {to:"main"});	
});
// individual 'WORLD' page
Router.route('/worlds/:_id', function () {
	Session.set("worldid", this.params._id);
	Session.set("eventid", "none");
	Session.set("cyoaid", "none");
	Session.set("pageid", "none");
	Session.set("gameid", "none");
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
	}
	this.render("navbar-plain", {to:"header"});
	this.render("worldItem", {to:"main"});
});

// individual adventure page
Router.route('/cyoas/:cyoaid', function () {
// 	console.log("you hit /adventures	"+this.params.cyoaid);
	Session.set("gameid", "none");
	Session.set("cyoaid", this.params.cyoaid);
	var page = Pages.findOne( {cyoaid:Session.get("cyoaid"), "parent": { $elemMatch: { "parentid": "none" } } } );
	if (page) {
		Session.set("pageid", page._id);
	}
	var cyoa = Cyoas.findOne({_id:Session.get("cyoaid")});
	if (cyoa) {
		var event = Events.findOne({_id:cyoa.eventid});
		if (event) {
			Session.set("eventid", event._id);
			Session.set("worldid", event.worldid);
		}
	}
// 	console.log(Session.get("cyoaid"));
// 	console.log(Session.get("worldid"));
	this.render("navbar-plain", {to:"header"});
	this.render("cyoaItem", {to:"main"});	
});
// individual page page
Router.route('/cyoas/:cyoaid/page/:pageid', function () {
// 	console.log("you hit /adventures	"+this.params._id);
	Session.set("gameid", "none");
	Session.set("cyoaid", this.params.cyoaid);
	var cyoa = Cyoas.findOne({_id:Session.get("cyoaid")});
	if (cyoa) {
		var event = Events.findOne({_id:cyoa.eventid});
		if (event) {
			Session.set("eventid", event._id);
			Session.set("worldid", event.worldid);
		}
	}
	Session.set("pageid", this.params.pageid);
	this.render("navbar-plain", {to:"header"});
	this.render("cyoaItem", {to:"main"});	
});
// page list page
Router.route('/cyoas/:cyoaid/list', function () {
// 	console.log("you hit /adventures	"+this.params._id);
	Session.set("gameid", "none");
	Session.set("cyoaid", this.params.cyoaid);
	this.render("navbar-plain", {to:"header"});
	this.render("allPageList", {to:"main"});	
});
// individual adventureGame page
Router.route('/games/:gameid', function () {
// 	console.log("you hit /games	"+this.params.gameid);
	var game = GameAdvs.findOne( {_id: this.params.gameid} );
	if (game) {
		Session.set("gameid", this.params.gameid);
// 		console.log("gameid");
// 		console.log(Session.get("gameid"));
// 		console.log(game);
		var player = Players.findOne( { gameid: Session.get("gameid"), playerid:Meteor.user()._id } );
		if (player) {
// 			console.log(player);
			Session.set("playerid", player._id);
// 			console.log("playerid");
// 			console.log(Session.get("playerid"));
		}
		var cyoa = Cyoas.findOne({_id:game.cyoaid});
		if (cyoa) {
// 			console.log(cyoa);
			Session.set("cyoaid", cyoa._id);
			var event = Events.findOne({_id:cyoa.eventid});
			if (event) {
// 				console.log(event);
				Session.set("eventid", event._id);
				Session.set("worldid", event.worldid);
			}
		}
	}
// 	console.log(Session.get("cyoaid"));
// 	console.log(Session.get("worldid"));
	this.render("navbar-plain", {to:"header"});
	this.render("gameAdvItem", {to:"main"});	
});/*
// individual game page page
Router.route('/games/:gameid/page/:pageid', function () {
// 	console.log("you hit /adventures	"+this.params._id);
	var game = GameAdvs.findOne( {_id: this.params.gameid} );
	if (game) {
		console.log(game);
		Session.set("gameid", game._id);
		var cyoa = Cyoas.findOne({_id:game.cyoaid});
		if (cyoa) {
			console.log(cyoa);
			Session.set("cyoaid", cyoa._id);
			var event = Events.findOne({_id:cyoa.eventid});
			if (event) {
				console.log(event);
				Session.set("eventid", event._id);
				Session.set("worldid", event.worldid);
			}
		}
	}
	Session.set("pageid", this.params.pageid);
	this.render("navbar-plain", {to:"header"});
	this.render("gameAdvItem", {to:"main"});	
});*/
