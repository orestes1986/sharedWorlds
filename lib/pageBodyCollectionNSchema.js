// code sent to client and server
// which gets loaded before anything else (since it is in the lib folder)

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// PagesBodies Stuff
/////////////////////////////////////////////////// Collection
this.PagesBodies = new Mongo.Collection("pagesBodies");
/////////////////////////////////////////////////// Allowances
this.PagesBodies.allow({
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
PagesBodies.attachSchema(new SimpleSchema({
	time: {
		type: Number,
		optional: true
	},
// 	body: {
// 		type: String,
// 		optional: true
// 	},
	texts: {
		type: Array,
		optional: true
	},
	'texts.$': {
		type: Object,
		optional: true
	},
	'texts.$.paragraphs': {
		type: Array,
		optional: true
	},
	'texts.$.paragraphs.$': {
		type: Object,
		optional: true
	},
	'texts.$.paragraphs.$.paragraph': {
		type: String,
		optional: true
	},
	conditions: {
		type: Array,
		optional: true
	},
	'conditions.$': {
		type: Object,
		optional: true
	},
	'conditions.$.operation': { // "None", "OR", "AND"
		type: String,
		optional: true
	},
	'conditions.$.paramid': {
		type: String,
		optional: true
	},
	'conditions.$.paramIndex': {
		type: String,
		optional: true
	},
	'conditions.$.operator': { // "equal", "unequal"
		type: String,
		optional: true
	},
	'conditions.$.numORnot': {
		type: Boolean,
		optional: true
	},
	'conditions.$.paramValueIndex': {
		type: String,
		optional: true
	},
	pageid:{
		type: String,
		optional: true,
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
	createdOn:{
		type: Date,
		optional: true,
		autoform: { 
			type: 'hidden', 
		},
	},
}));
