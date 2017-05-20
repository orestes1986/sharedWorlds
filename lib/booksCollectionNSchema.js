// code sent to client and server
// which gets loaded before anything else (since it is in the lib folder)

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// Cyoa Stuff
/////////////////////////////////////////////////// Collection
this.Books = new Mongo.Collection("books");
// UserAdventures = new Mongo.Collection("userAdventures");
/////////////////////////////////////////////////// Allowances
this.Books.allow({
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
this.Books.attachSchema(new SimpleSchema({
	title: {
		type:String,
		label: "Title",
	},
	audioURL: {
		type:String,
		label: "URL",
		optional: true,
	},
	chapterWord:{
		type: String,
		autoform: {
			type: 'hidden',
		},
	},
	chapterNum:{
		type: String,
		optional: true,
		autoform: {
			type: 'hidden', 
		},
	},
	chapters: {
		type: Array,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
	'chapters.$': {
		type: Object,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
	'chapters.$.chapter': {
		type: Number,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
	'chapters.$.textPosition': {
		type: Number,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
	'chapters.$.owner':{
		type: String,
		autoform: {
			type: 'hidden', 
		},
	},
	'chapters.$.checker':{
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
	checker:{
		type: Date,
		autoform: { 
			type: 'hidden', 
		},
	},
}));