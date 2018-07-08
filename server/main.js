// code that is only sent to the server. 

Meteor.startup(function () {
//	 create a starter doc if necessary
	if (!Tags.findOne()) {
		Tags.insert({ genre: 'sci-fi',			color: '#6d9eeb' });
		Tags.insert({ genre: 'science fiction',		color: '#6d9eeb' });
		Tags.insert({ genre: 'sf',			color: '#6d9eeb' });
		Tags.insert({ genre: 's.f.',			color: '#6d9eeb' });
		Tags.insert({ genre: 'fantasy',			color: '#76a5af' });
		Tags.insert({ genre: 'heroic fantasy',		color: '#ffe599' });
		Tags.insert({ genre: 'horror',			color: '#e06666' });
		Tags.insert({ genre: 'cyber punk',		color: '#674ea7' });
		Tags.insert({ genre: 'cyber-punk',		color: '#674ea7' });
		Tags.insert({ genre: 'cyberpunk',		color: '#674ea7' });
		Tags.insert({ genre: 'steam punk',		color: '#cccccc' });
		Tags.insert({ genre: 'steam-punk',		color: '#cccccc' });
		Tags.insert({ genre: 'steampunk',		color: '#cccccc' });
		Tags.insert({ genre: 'neutral',			color: '#fff2cc' });
		Tags.insert({ genre: 'realistic',		color: '#fff2cc' });
		Tags.insert({ genre: 'pragmatic',		color: '#fff2cc' });
		Tags.insert({ genre: 'romantic',		color: '#c27ba0' });
		Tags.insert({ genre: 'love story',		color: '#c27ba0' });
		Tags.insert({ genre: 'love-story',		color: '#c27ba0' });
		Tags.insert({ genre: 'love stories',		color: '#c27ba0' });
		Tags.insert({ genre: 'love-stories',		color: '#c27ba0' });
	}
	if (!Meteor.users.findOne()) {
		Accounts.createUser({
			username: "demo",
			email: "demo@test.com",
			password: "test123",
			profile: {
			//publicly visible fields like firstname goes here
			}
		});
	} else {
// 		var user = Meteor.users.findOne({});
		console.log("There is a user: ");
		var userid = Meteor.users.findOne({})._id;
// 		this.userId = userid;
// 		console.log(this.userId);
// 		this.setUserId(userid);
// 		console.log("this.userId");
// 		console.log(this.userId);
		if (!Worlds.findOne()){// no documents yet!
	// 		Meteor.users.insert( {
	// 			username: 'oresp',
	// 			emails: ['oresp@test.com'],
	// 			services: {
	// 				password: {
	// 					srp: Meteor._srp.generateVerifier('test123')
	// 				}
	// 			}
	// 		});
			var tag = Tags.findOne({genre: "horror"});
			console.log("Tags length");
			console.log(Tags.find({}).fetch().length);
	// 		Worlds.insert({title:"my new Worlds", description:"A dummy world", tags:[Tags.findOne({})._id], advSum:0, createdOn:new Date(), lastEdit:new Date()});
	// 		for (var i = 0; i < 45; i++) {
	// 			var pos0 = parseInt(Math.random() * (Tags.find({}).fetch().length - 0) + 0);
	// 			var pos1 = parseInt(Math.random() * (Tags.find({}).fetch().length - 0) + 0);
	// 			Worlds.insert({title:"my new Worlds "+i, description:"Another dummy world", tags:[Tags.find({}).fetch()[pos0]._id], advSum:0, createdOn:new Date(), lastEdit:new Date()});
	// 		}
			var addingWorld = ({title:"A demo World", description:"A dummy description for a  dummy world", tags:[tag._id], advSum:0, owner:userid, createdOn:new Date(), lastEdit:new Date()});
			var worldid = Worlds.insert(addingWorld);
			var addingEvent = ( {
				content: "A demo event",
				start: new Date("2017.03.23 02:30"),
				end: new Date("2017.03.23 02:30"),
				worldid: worldid,
				owner:userid,
				createdOn: new Date(),
				lastEdit: new Date(),
			} );
// 			var eventid = Events.insert(addingEvent);
// 			var event = Meteor.call("addEvent", addingEvent, worldid);
			var max_date_value = 8640000000000000;
			console.log("max_date_value");
			console.log(max_date_value);
			console.log("addingEvent.start.getTime");
			console.log(addingEvent.start.getTime());
			if ((addingEvent.start.getTime() <= max_date_value) && (addingEvent.start.getTime() >= (-max_date_value))) {
				console.log("addingEvent");
				console.log(addingEvent);
				addingEvent.start = addingEvent.start.getTime();
				addingEvent.end = addingEvent.end.getTime();
				var eventid = Events.insert(addingEvent);
// 				console.log(id);
// 				console.log(worldId);
// 				Worlds.update({_id: worldId}, {$set:{lastEdit:new Date()}});
				worldid = Meteor.call("updateWorldEdit", worldid, function(err,
 res) {/*
	// 				if (!err){// all good
	//					 console.log("event callback received worldid: "+res);
	//					 Session.set("eventid", res);
	// 				}*/
				});
// 				console.log(worldid);
// 				return Events.findOne({_id:id});
			}			
// 			console.log("Returned event");
// 			console.log(event);
	// 		var event = Events.findOne({content: "A demo event"});
			var addingCyoa = ({title:"A demo adventure", url:"", eventid:eventid, owner:userid, createdOn:new Date(), lastEdit:new Date()});
			var cyoaid = Cyoas.insert(addingCyoa);
			var addedCyoa = Cyoas.findOne({_id:cyoaid});
	// 		console.log(addedCyoa);
			if (addedCyoa) {
				////////////////////////////////////////////////
				
				Meteor.call("addAdventure", userid, cyoaid);
				Meteor.call("updateCyoa", addedCyoa);
			}
		}
	}
// 	process.exit();
});
