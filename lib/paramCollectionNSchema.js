// code sent to client and server
// which gets loaded before anything else (since it is in the lib folder)

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////// Param  Stuff
/////////////////////////////////////////////////// Collection
CyoaParams = new Mongo.Collection("cyoaParams");
// ParamValues = new Mongo.Collection("paramValues");
/////////////////////////////////////////////////// Allowances
CyoaParams.allow({
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
CyoaParams.attachSchema(new SimpleSchema({
	title: {
		type:String,
		label: "title",
	},
	data: {
		type: Array,
		optional: true,
		autoform: {
			type: 'hidden', 
		},
	},
	'data.$': {
		type: Object,
		optional: true,
		autoform: {
			type: 'hidden', 
		},
	},
	'data.$.name': {
		type: String,
		optional: true,
		autoform: {
			type: 'hidden', 
		},
	},
	'data.$.taken': {
		type: Boolean,
		optional: true,
		autoform: {
			type: 'hidden', 
		},
	},
	'data.$.values': {
		type: Array,
		optional: true,
		autoform: {
			type: 'hidden', 
		},
	},
	'data.$.values.$': {
		type: Object,
		optional: true,
		autoform: {
			type: 'hidden', 
		},
	},
	'data.$.values.$.value': {
		type: String,
		optional: true,
		autoform: {
			type: 'hidden', 
		},
	},
	'data.$.values.$.pageid': {
		type: String,
		optional: true,
		autoform: {
			type: 'hidden', 
		},
	},
	'data.$.values.$.bodyid': {
		type: String,
		optional: true,
		autoform: {
			type: 'hidden', 
		},
	},
	'data.$.values.$.textIndex': {
		type: String,
		optional: true,
		autoform: {
			type: 'hidden', 
		},
	},
	'data.$.values.$.paragraphIndex': {
		type: String,
		optional: true,
		autoform: {
			type: 'hidden', 
		},
	},
	'data.$.values.$.unique': {
		type: Boolean,
		optional: true,
		autoform: {
			type: 'hidden', 
		},
	},
	'data.$.values.$.hidden': {
		type: Boolean,
		optional: true,
		autoform: {
			type: 'hidden', 
		},
	},
	cyoaid:{
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
}));