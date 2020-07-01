// code sent to client and server
// which gets loaded before anything else (since it is in the lib folder)
/////////////////////////////////////////////////////////////////////
// db.pages.find().pretty();
/////////////////////////////////////////////////// Page Stuff
/////////////////////////////////////////////////// Collection
this.Pages = new Mongo.Collection("pages"); // db.pages.find().pretty();
/////////////////////////////////////////////////// Allowances
this.Pages.allow({
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
this.Pages.attachSchema(new SimpleSchema({
	title: {
		type:String,
		label: "Title",
	},
	parent: {
		type: Array,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
	'parent.$': {
		type: Object,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
	'parent.$.parentid': {
		type: String,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
	'parent.$.choiceValue': {
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
		optional: true,
		autoform: {
			type: 'hidden', 
		},
	},
}));
