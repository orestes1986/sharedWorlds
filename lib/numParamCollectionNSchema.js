// code sent to client and server
// which gets loaded before anything else (since it is in the lib folder)
/////////////////////////////////////////////////////////////////////
// db.numParams.find().pretty();
/////////////////////////////////////// NumParam  Stuff
/////////////////////////////////////////////////// Collection
NumParams = new Mongo.Collection("numParams"); // db.numParams.find().pretty();
// ParamValues = new Mongo.Collection("paramValues");
/////////////////////////////////////////////////// Allowances
NumParams.allow({
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
NumParams.attachSchema(new SimpleSchema({
	title: {
		type:String,
		label: "title",
	},
	point_pool: {
		type: Array,
		optional: true,
		autoform: {
			type: 'hidden', 
		},
	},
	'point_pool.$': {
		type: Object,
		optional: true,
		autoform: {
			type: 'hidden', 
		},
	},
	'point_pool.$.value': {
		type: Number,
		label: "Unspent points",
	},
	'point_pool.$.pageid': {
		type: String,
		optional: true,
		autoform: {
			type: 'hidden', 
		},
	},
	'point_pool.$.bodyid': {
		type: String,
		optional: true,
		autoform: {
			type: 'hidden', 
		},
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
	'data.$.unique': {
		type: Boolean,
		optional: true,
		autoform: {
			type: 'hidden', 
		},
	},
	'data.$.hidden': {
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
