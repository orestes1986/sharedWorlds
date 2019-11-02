////////
/// World EVENTS
////////
/*
Template.world_add_form.events({
'submit .js-add-world':function(event){

		var world_name = event.target.world_name.value;
		var world_desc = event.target.description.value;
		console.log("name: "+world_name+" desc:"+world_desc);
		if (!Meteor.user()){// user not available
				alert("You need to login first!");
		}
		else {
			// they are logged in... lets insert a world
			var id = Meteor.call("addWorld", world_name, world_desc, function(err, res){
				if (!err){// all good
					console.log("event callback received id: "+res);
					Session.set("worldid", res);
				}
			}); // calling: ~/sharedworlds/shared/worldmain.js - addWorld/~ //
		}
		$("#world_add_form").modal('hide');
		return false;
	}
});*/
Template.world.events({
	"mouseover .js-show-world-info": function(event){
// 		console.log("mouseover world event: ");
// 		console.log(this._id);
		for (var i = 0; i < document.getElementById(this._id).getElementsByTagName("p").length; i++){
			document.getElementById(this._id).getElementsByTagName("p")[i].style.visibility = "inherit";
		}
		for (var i = 0; i < document.getElementById(this._id).getElementsByTagName("h5").length; i++){
			document.getElementById(this._id).getElementsByTagName("h5")[i].style.visibility = "inherit";
		}/*
// 		document.getElementById(this._id).style.height = (document.getElementById(this._id).style.height*1.2)+"px");
// 		document.getElementById(this._id).style.width = (document.getElementById(this._id).style.width*1.2)+"px";*/
	},
	"mouseout .js-show-world-info": function(event){
// 		console.log("mouseout world event: ");
// 		console.log(this._id);
		for (var i = 0; i < document.getElementById(this._id).getElementsByTagName("p").length; i++){
			document.getElementById(this._id).getElementsByTagName("p")[i].style.visibility = "hidden";
		}
		for (var i = 0; i < document.getElementById(this._id).getElementsByTagName("h5").length; i++){
			document.getElementById(this._id).getElementsByTagName("h5")[i].style.visibility = "hidden";
		}
// 		document.getElementById(this._id).style.height = (world_size()*.9);
// 		document.getElementById(this._id).style.width = (world_size()*.9);
	},
});/*
// Template.each_world.events({
//	 'mouseenter .js-show-world-info':function(event){
//		 console.log("showing the modal...");
//	 $(".world_info").modal('show');
//	 },
//	 'mouseexit .js-show-world-info':function(event){
//		 console.log("showing the modal...");
//	 $(".world_info").modal('fade');
//	 },
// });*/
Template.addWorld.events({
	'click .js-show-world-form':function(event){
		console.log("showing the modal...");
		$("#world_add_form").modal('show');
	},/*
//	 // add world button
//	 "click .js-add-world":function(event){
//		 event.preventDefault();
//		 console.log("Add a new world!");
// 
//		 if (!Meteor.user()){// user not available
//				 alert("You need to login first!");
//		 }
//		 else {
//			 // they are logged in... lets insert a world
//			 var id = Meteor.call("addWorld", function(err, res){
//				 if (!err){// all good
//					 console.log("event callback received id: "+res);
//					 Session.set("worldid", res);						
//				 }
//			 }); // calling: ~/sharedworlds/shared/worldmain.js - addWorld/~ //
//		 }
//	 },
// //	 // load world button
// //	 "click .js-load-world":function(event){
// //		 //console.log(this);
// //		 Session.set("worldid", this._id);
// //	 }*/
}),
Template.worldMeta.events({
	// change world privacy
	"click .js-tog-private":function(event){
		if (!Meteor.user()){// user not available
			alert("You need to login first!");
		} else {
			console.log(event.target.checked);
			var world = {_id:Session.get("worldid"), isPrivate:event.target.checked};
			Meteor.call("updateAdvPrivacy", world); // calling: ~/sharedworlds/shared/?????????.js - ?????????/~ //
		}
	},
	// remove world button
	"click .js-remove-world":function(event){
		if (!Meteor.user()){// user not available
			alert("You need to login first!");
		} else {
			// they are logged in... lets insert a world
			var world = {_id:Session.get("worldid")};
			Meteor.call("removeWorld", world); // calling: ~/sharedworlds/shared/worldmain.js - removeWorld/~ //
		}
	},
	// edit world button
	"click .js-edit-icon":function(event){
		if (!Meteor.user()){// user not available
			alert("You need to login first!");
		} else {
			// they are logged in... lets insert a world
			console.log(event);
			console.log(event.element);
			console.log(this);
// 			var world = {_id:Session.get("worldid")};
// 			Meteor.call("removeWorld", world); // calling: ~/sharedworlds/shared/worldmain.js - removeWorld/~ //
		}
	}, 
	// edit world button
	"mouseleave .js-edit-text":function(event){
		if (!Meteor.user()){// user not available
			alert("You need to login first!");
		} else {
			// they are logged in... lets insert a world
// 			console.log(event);
// 			console.log(event.element);
			console.log(this);
// 			var world = {_id:Session.get("worldid")};
// 			Meteor.call("removeWorld", world); // calling: ~/sharedworlds/shared/worldmain.js - removeWorld/~ //
		}
	}, 
})
