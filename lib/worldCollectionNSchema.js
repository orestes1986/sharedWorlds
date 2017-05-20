// code sent to client and server
// which gets loaded before anything else (since it is in the lib folder)

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////// Worlds Stuff
/////////////////////////////////////////////////// Collection
this.Worlds = new Mongo.Collection("worlds");
/////////////////////////////////////////////////// Allowances
this.Worlds.allow({
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
this.Worlds.attachSchema(new SimpleSchema({
	title: {
		type:String,
		label: "Title",
		max: 60
	},
	description: {
		type:String,
		label: "Description",
		max: 2000,
		autoform: {
			rows: 5
		} // http://autoform.meteorapp.com/quickform
	},
	owner:{
		type: String,
		optional: true,
		autoform: { 
			type: 'hidden', 
		},
	},
	advSum: {
		type: Number,
		optional: true,
		autoform: { 
			type: 'hidden', 
		},
	},
	createdOn:{
		type: Date,
		optional: true,
		autoform: { 
			type: 'hidden', 
		},
	},
	lastEdit:{
		type: Date,
		optional: true,
		autoform: { 
			type: 'hidden', 
		},
	},
	tags: {
		type: [String],
		optional: true,
		autoform: {
			type: 'tags',
		}
	}
}));