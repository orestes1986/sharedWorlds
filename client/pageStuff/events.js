////////
/// page	EVENTS
////////

Template.addPage.events({
	'click .js-show-page-form':function(event){
// 		console.log("showing the modal...");
		$("#page_add_form").modal('show');
	},
});

Template.choiseList.events({
	// remove world button
	"click .js-page-choises":function(event){
// 		console.log("click .js-page-choises");
		Session.set("pageid", this._id);
// 		console.log(this._id);
	},
});

Template.pageItem.events({
	// remove world button
	"click .js-page-parent":function(event){
// 		console.log("click .js-page-choises");
		Session.set("pageid", this.parentid);
// 		console.log(this._id);
	},
});
Template.deletepage.events({
	// remove page button
	"click .js-remove-page":function(event){
		if (!Meteor.user()){// user not available
			alert("You need to login first!");
		} else {
			// they are logged in... lets insert a world
			var world = {_id:Session.get("pageid")};
			Meteor.call("removePage", world);
		}
	}, 
});