// code sent to client and server
// which gets loaded before anything else (since it is in the lib folder)

/////////////////////////////////////////////////////////////////////
// db.cyoas.find().pretty();
/////////////////////////////////////////////////// Cyoa Stuff
/////////////////////////////////////////////////// Collection
this.Cyoas = new Mongo.Collection("cyoas"); // db.cyoas.find().pretty();
// UserAdventures = new Mongo.Collection("userAdventures");
/////////////////////////////////////////////////// Allowances
this.Cyoas.allow({
	// we need to be able to update images for ratings.
	update:function(userId, doc){
		console.log("testing security on adventure update");
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
		console.log("testing security on adventure insert");
		if (Meteor.user()){// they are logged in
//			 if (userId != doc.owner){// the user is messing about
// 	return false;
//			 } else {// the user is logged in, the adventure has the correct user id
				return true;
//			 }
		} else {// user not logged in
			return false;
		}
	},
	remove:function(userId, doc){
		console.log("testing security on adventure remove");
		if (Meteor.user()){// they are logged in
			if (userId != doc.owner){// the user is messing about
				return false;
			} else {// the user is logged in, the adventure has the correct user id
				return true;
			}
		} else {// user not logged in
			return false;
		}
	}
});
/////////////////////////////////////////////////// Schema
this.Cyoas.attachSchema(new SimpleSchema({
	title: {
		type:String,
		label: "Title",
	},
	url: {
		type:String,
		label: "URL",
		optional: true,
	},
	eventid:{
		type: String,
		autoform: {
			type: 'hidden',
		},
	},
	owner:{
		type: String,
		autoform: {
			type: 'hidden', 
		},
	},
	starting_time:{
		type: String,
		optional: true,
		autoform: {
			type: 'hidden', 
		},
	},
	createdOn:{
		type: Date,
		autoform: { 
			type: 'hidden', 
		},
	},
	lastEdit:{
		type: Date,
		autoform: { 
			type: 'hidden', 
		},
	},
}));
