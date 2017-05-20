// code sent to client and server
// which gets loaded before anything else (since it is in the lib folder)
/////////////////////////////////////////////////// Tags Stuff
this.Tags = new Mongo.Collection("tags");
// Users = new Mongo.Collection("users");
// CyoaEditingUsers = new Mongo.Collection("stuffEditingUsers");
// CyoaComments = new Mongo.Collection("stuffComments");
/////////////////////////////////////////////////// Allowances
this.Tags.allow({
	// we need to be able to update images for ratings.
	update:function(userId, doc){
		console.log("testing security on world update");
		if (Meteor.user()){// they are logged in
			if (userId != doc.owner){// the user is messing about
				return false;
			} else {// the user is logged in, the adventure has the correct user id
				return true;
			}
		} else {// user not logged in
			return false;
		}
	},
	insert:function(userId, doc){
		console.log("testing security on world insert");
		if (Meteor.user()){// they are logged in
//			 if (userId != doc.owner){// the user is messing about
// 	return false;
//			 } else {// the user is logged in, the world has the correct user id
	return true;
//			 }
		} else {// user not logged in
			return false;
		}
	},
	remove:function(userId, doc){
		console.log("testing security on world remove");
		if (Meteor.user()){// they are logged in
			if (userId != doc.owner){// the user is messing about
	return false;
			} else {// the user is logged in, the world has the correct user id
	return true;
			}
		} else {// user not logged in
			return false;
		}
	}
});