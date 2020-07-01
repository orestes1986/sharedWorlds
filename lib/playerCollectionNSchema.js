// code sent to client and server
// which gets loaded before anything else (since it is in the lib folder)

/////////////////////////////////////////////////////////////////////
// db.players.find().pretty();
/////////////////////////////////////// Player Stuff
/////////////////////////////////////////////////// Collection
this.Players = new Mongo.Collection("players"); // db.players.find().pretty();
/////////////////////////////////////////////////// Allowances
this.Players.allow({
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
			if (userId != doc.playerid){// the user is messing about
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
this.Players.attachSchema(new SimpleSchema({
	gameid:{
		type: String,
		autoform: {
			type: 'hidden',
		},
	},
	playerid:{
		type: String,
		optional: true,
		autoform: {
			type: 'hidden', 
		},
	},
	pageid: {
		type: String,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
	bodyid: {
		type: String,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
	time: {
		type: Number,
		optional: true,
	},
	param: {
		type: Array,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
	'param.$': {
		type: Object,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
	'param.$.paramid': {
		type: String,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
	'param.$.paramIndex': {
		type: String,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
	'param.$.paramValueIndex': {
		type: String,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
	numParam: {
		type: Array,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
	'numParam.$': {
		type: Object,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
	'numParam.$.pool': {
		type: Number,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
	'numParam.$.paramid': {
		type: String,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
	'numParam.$.paramIndex': {
		type: String,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
	'numParam.$.paramValueIndex': {
		type: Number,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
}));
