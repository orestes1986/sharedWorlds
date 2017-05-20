////////
/// World	HELPERS
////////




Template.foo.helpers({
  settings: function() {
    return {
      position: "top",
      limit: 5,
      rules: [
        {
          token: '@',
          collection: Meteor.users,
//           collection: Tags,
          field: "username",
          template: Template.userPill
        },
        {
          token: '!',
          collection: Tags,
          field: "_id",
          options: '',
          matchAll: true,
          filter: { type: "autocomplete" },
          template: Template.dataPiece
        }
      ]
    };
  }
});



Template.worldList.rendered = function() {
	Meteor.worldFunctions.worldInit();
};
window.onresize = function(event) {
// 	console.log(Session.get("worldid"));
	if (Session.get("worldid") == "none") {
// 		console.log("World window resizes");
		Meteor.worldFunctions.worldInit();
	} else {
// 		console.log("Adventure window resizes");
// 		Meteor.advFunctions.advInit();
	}
};
Template.worldList.helpers({
	// find all visible docs
	worlds:function(){
		return Worlds.find({}, {sort:{lastEdit: -1}, limit : Session.get("objLimit")});
	},
}),
Template.worldMeta.helpers({
	timeline:function() {
		Meteor.eventFunctions.timeline();
	},
	worldEvent:function() {
		console.log(Session.get("worldid"));
		return Events.find({ worldid:Session.get("worldid") });
	},
	// find current world
	isOwner: function(){
// 		console.log("cyoaMeta isOwner: ");
// 		console.log(this.owner);
// 		console.log(Meteor.userId());
		if (this.owner == Meteor.userId()) {
			return true;
		} else {
			return false;
		}
	},
	world:function(){
// 		console.log("worldid");
// 		console.log(Worlds.findOne({_id:Session.get("worldid")}));
		return Worlds.findOne({_id:Session.get("worldid")});
	},
	// find current world
	world:function(){
// 		console.log("worldid");
// 		console.log(Worlds.findOne({_id:Session.get("worldid")}));
		return Worlds.findOne({_id:Session.get("worldid")});
	},
	get_tag_name: function() {
		return Tags.findOne({_id:this.toString()}).genre;
	},
	ownerUserName : function() {
// 		console.log("ownerUserName");
// 		console.log(this.owner);
// 		console.log(Meteor.users.findOne({_id:this.owner}));
		return Meteor.users.findOne({_id:this.owner}).username;
	},
	optionsHelper : function() {
// 		console.log("optionsHelper");
		return {
			collection: "worlds",
			field: "description",
// 			wysiwyg: true,
		}
	},
// 	// test if a user is allowed to edit current world
// 	canEdit:function(){
// 		var world;
// 		world = Worlds.findOne({_id:Session.get("worldid")});
// 		if (world){
// 			if (world.owner == Meteor.userId()){
// 				return true;
// 			}
// 		}
// 		return false;
// 	},
// 	isPrv:function(){
// 		var world;
// 		world = Worlds.findOne({_id:Session.get("worldid")});
// 		if (world){
// 			if (world.isPrivate){
// 				return true;
// 			}
// 		}
// 		return false;
// 	},
})

Template.world.helpers({
	get_color:function() {
		var colors = ["#589"];
		if (this.tags) {
// 			for (var j = 0; j < colorsTOtags.length; j++) {
				for (var i = 0; i < this.tags.length; i++){
					var tmpFoundedTags = Tags.findOne({_id:this.tags[i]});
// 					if (this.tags[i].toUpperCase() == colorsTOtags[j].genre.toUpperCase()) {
					if (tmpFoundedTags.color) {
						colors.push(tmpFoundedTags.color);
					}
// 					}
				}
// 			}
		} else {
			colors.push("#567890", "#098765");
		}
		if (colors.length == 1) {
// 			console.log("found a single tagged world");
			colors.push("#589");
		}
		jQuery.unique(colors);
		colors.push(colors[colors.length-1]);
		return colors;
	},
	get_size: function(){
// 		var adv_of_world = this.getAttribute("data-sum_of_advs");
// 		console.log(this.sum_of_adv);
// 		console.log(Meteor.worldFunctions.get_newSize(this.sum_of_adv));
		return Meteor.worldFunctions.get_newSize(this.sum_of_adv);
	},
	get_random: function(){
// 		var adv_of_world = this.getAttribute("data-sum_of_advs");
// 		console.log(this.sum_of_adv);
// 		console.log(Meteor.worldFunctions.get_randomised(this.sum_of_adv));
		return Meteor.worldFunctions.get_randomised(this.sum_of_adv);
	},
	get_world_size: function(){
// 		var adv_of_world = this.getAttribute("data-sum_of_advs");
// 		console.log(this.sum_of_adv);
		return Meteor.worldFunctions.world_size();
	},
}),
Template.worldItem.helpers({
	get_color:function() {
		var colors = ["#589"];
		var world = Worlds.findOne({_id:Session.get("worldid")});
		if (world) {
			if (world.tags) {
// 				for (var j = 0; j < colorsTOtags.length; j++) {
					for (var i = 0; i < world.tags.length; i++){
						var tmpFoundedTags = Tags.findOne({_id:world.tags[i]});
// 						if (world.tags[i].toUpperCase() == colorsTOtags[j].genre.toUpperCase()) {
						if (tmpFoundedTags.color) {
							colors.push(tmpFoundedTags.color);
						}
// 						}
					}
// 				}
			} else {
				colors.push("#567890", "#098765");
			}
		} else {
			colors.push("#567890", "#098765");
		}
		jQuery.unique(colors);
		colors.push(colors[colors.length-1]);
		return colors;
	},
});