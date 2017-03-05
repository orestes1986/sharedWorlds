// code sent to client and server
// which gets loaded before anything else (since it is in the lib folder)
colorsTOtags = [
	{ genre: 'sci-fi',		color: '#6d9eeb' },
	{ genre: 'science fiction',	color: '#6d9eeb' },
	{ genre: 'sf',		color: '#6d9eeb' },
	{ genre: 's.f.',		color: '#6d9eeb' },
	{ genre: 'fantasy',		color: '#76a5af' },
	{ genre: 'heroic fantasy',	color: '#ffe599' },
	{ genre: 'horror',	color: '#e06666' },
	{ genre: 'cyber punk',	color: '#674ea7' },
	{ genre: 'cyber-punk',	color: '#674ea7' },
	{ genre: 'cyberpunk',	color: '#674ea7' },
	{ genre: 'steam punk',	color: '#cccccc' },
	{ genre: 'steam-punk',	color: '#cccccc' },
	{ genre: 'steampunk',	color: '#cccccc' },
	{ genre: 'neutral',		color: '#fff2cc' },
	{ genre: 'realistic',		color: '#fff2cc' },
	{ genre: 'pragmatic',		color: '#fff2cc' },
	{ genre: 'romantic',		color: '#c27ba0' },
	{ genre: 'love story',		color: '#c27ba0' },
	{ genre: 'love-story',		color: '#c27ba0' },
	{ genre: 'love stories',		color: '#c27ba0' },
	{ genre: 'love-stories',		color: '#c27ba0' },
];
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////// Worlds Stuff
/////////////////////////////////////////////////////////////////////
this.Worlds = new Mongo.Collection("worlds");
// WorldEditingUsers = new Mongo.Collection("worldEditingUsers");
// WorldComments = new Mongo.Collection("worldComments");
// set up a schema controlling the allowable 
// structure of comment objects for world

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////// Events Stuff
/////////////////////////////////////////////////////////////////////
this.Events = new Mongo.Collection("events");
// EventEditingUsers = new Mongo.Collection("eventEditingUsers");
// EventComments = new Mongo.Collection("eventComments");
// set up a schema controlling the allowable 
// structure of comment objects for adventures
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////// Cyoa Stuff
/////////////////////////////////////////////////////////////////////
this.Cyoas = new Mongo.Collection("cyoas");
// CyoaEditingUsers = new Mongo.Collection("cyoaEditingUsers");
// CyoaComments = new Mongo.Collection("cyoaComments");
// CyoaParams = new Mongo.Collection("cyoaParams");
// set up a schema controlling the allowable 
// structure of comment objects for adventures
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////// Page Stuff
/////////////////////////////////////////////////////////////////////
this.Pages = new Mongo.Collection("pages");
// CyoaEditingUsers = new Mongo.Collection("pageEditingUsers");
// CyoaComments = new Mongo.Collection("cyoaComments");
// CyoaParams = new Mongo.Collection("cyoaParams");
// set up a schema controlling the allowable 
// structure of comment objects for adventures

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////// Allowances
/////////////////////////////////////////////////////////////////////
this.Worlds.allow({
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
this.Events.allow({
	// we need to be able to update images for ratings.
	update:function(userId, doc){
		console.log("testing security on event update");
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
		console.log("testing security on event insert");
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
		console.log("testing security on event remove");
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
this.Pages.allow({
	// we need to be able to update images for ratings.
	update:function(userId, doc){
		console.log("testing security on page update");
		console.log(Meteor.user());
		console.log(doc.owner);
		console.log(userId);
// 		if (Meteor.user()){// they are logged in
// 			if (userId != doc.owner){// the user is messing about
// 				return false;
// 			} else {// the user is logged in, the adventure has the correct user id
// 				return true;
// 			}
// 		} else {// user not logged in
// 			return false;
// 		}
				return true;
	},
	insert:function(userId, doc){
		console.log("testing security on page insert");
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
		console.log("testing security on page remove");
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