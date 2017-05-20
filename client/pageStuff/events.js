////////
/// page	EVENTS
////////


Template.page_add_form.events({
	// remove page button
	"click .js-btn-select-existing-page":function(event){
		console.log("js-btn-select-existing-page clicked");
		console.log(this);
		console.log(event);
// 		Session.set("bodyid")
		$("#list_of_pages_form").modal('show');
		$("#page_add_form").modal('hide');
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
			var page = {_id:Session.get("pageid")};
			Meteor.call("removePage", page);
		}
	}, 
});
Template.list_of_pages_form.events({
	// remove page button
	"click .js-page-choises":function(event){
// 		console.log(this);
// 		console.log(this._id);
// 		console.log(this.parent);
		console.log(Session.get("bodyid"));
		this.parent.push({parentid: Session.get("bodyid"), choiceValue:this.title});
// 		console.log(this.parent);
		Meteor.call("updatePage", this);
// 		$("#list_of_pages_form").modal('show');
		$("#list_of_pages_form").modal('hide');
		return false;
	}, 
});