////////
/// cyoa	HELPERS
////////

Template.cyoaList.helpers({
	// find all visible docs
	cyoas:function(){
		return Cyoas.find({eventid:Session.get("eventid")});
	},
});
Template.cyoaItem.helpers({
	// find all visible docs
	adventure:function(){
// 			console.log("cyoaid");
// 			console.log(Session.get("cyoaid"));
		if (Session.get("cyoaid")) {
			var cyoa = Cyoas.findOne({_id:Session.get("cyoaid")});
			if (cyoa) {
// 				console.log(cyoa);
				return cyoa;
			}
		}
		return;
	},
	// find current world
	activeWorld:function(){
		console.log("worldid");
		console.log(Session.get("worldid"));
		return Worlds.findOne({_id:Session.get("worldid")});
	},
});
// Template.cyoaItem.helpers({
// 	// find all visible docs
// 	pages:function(){
// 		return Pages.find({cyoaid:Session.get("cyoaid")});
// 	},
// });