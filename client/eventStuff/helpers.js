////////
/// Event HELPERS
////////

Template.eventList.rendered = function() {
	Meteor.eventFunctions.timeline();
};
Template.eventList.helpers({
	world_id:function() {
		return Session.get("worldid");
	},
	timeline:function() {
		Meteor.eventFunctions.timeline();
	},
});
Template.eventMeta.helpers({
  optionsHelper : function() {
    return {
      collection: "events",
      field: "description",
	  wysiwyg: true,
    }
  },
	// find current document
	event:function(){
		if (Session.get("eventid")) {
			return Events.findOne({_id:Session.get("eventid")});
		}
		return;
	}, 
	// test if a user is allowed to edit current doc
	canEdit:function(){
// 		if (Session.get("eventid")) {
// 			var doc = Events.findOne({_id:Session.get("eventid")});
// 			if (doc){
// 				if (doc.owner == Meteor.userId()){
					return true;
// 				}
// 			}
// 		}
// 		return false;
	},
  ownerUserName : function() {
// 	console.log("ownerUserName");
// 	console.log(this.owner);
// 	console.log(Meteor.users.findOne({_id:this.owner}));
	return Meteor.users.findOne({_id:this.owner}).username;
  },
	isPrv:function(){
		if (Session.get("eventid")) {
			var doc = Events.findOne({_id:Session.get("Events")});
			if (doc){
				if (doc.isPrivate){
					return true;
				}
			}
		}
		return false;
	},
});