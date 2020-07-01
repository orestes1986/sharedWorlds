// code sent to client and server
// which gets loaded before anything else (since it is in the lib folder)

/////////////////////////////////////////////////////////////////////
// db.gameAdvs.find().pretty();
/////////////////////////////////////////////////// GameAdv Stuff
/////////////////////////////////////////////////// Collection
this.GameAdvs = new Mongo.Collection("gameAdvs"); // db.gameAdvs.find().pretty();
/////////////////////////////////////////////////// Allowances
this.GameAdvs.allow({
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
this.GameAdvs.attachSchema(new SimpleSchema({
	title:{
		type: String,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
	cyoaid:{
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
// 	players:{
// 		type: Array,
// 		optional: true,
// 		autoform: {
// 			type: 'hidden', 
// 		},
// 	},
// 	'players.$': {
// 		type: Object,
// 		optional: true,
// 		autoform: {
// 			type: 'hidden',
// 		},
// 	},
// 	'players.$.playerid': {
// 		type: String,
// 		optional: true,
// 		autoform: {
// 			type: 'hidden',
// 		},
// 	},
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
