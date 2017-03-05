// code that is shared between client and server, i.e. sent to both

// method definitions
Meteor.methods({
	addEvent:function(event, worldId) {
		if (!this.userId){// not logged in
			return;
		} else {
			var addingEvent = ({content:event.content, start:event.start, worldid:worldId, owner:this.userId, createdOn:new Date(), lastEdit:new Date()});
			var id = Events.insert(addingEvent);
			var worldid = Meteor.call("updateWorldEdit", worldId, function(err, res){/*
// 				if (!err){// all good
//					 console.log("event callback received worldid: "+res);
//					 Session.set("eventid", res);
// 				}*/
			});
			return Events.findOne({_id:id});
		}
	},
	updateEvent:function(event){
		var realEvent = Events.findOne({_id:event._id});
		if (realEvent){
			if (realEvent.owner == this.userId) {
			Events.update({_id: event._id}, {$set:{title:event.title, start:event.start, end:event.end, content:event.content, tags:event.tags, lastEdit:new Date()}});
			Worlds.update({_id: realEvent.worldid}, {$set:{lastEdit:new Date()}});/*
// 			} else {
// 				var eventWorld = Worlds.findOne({_id:event.worldid});
		*/	}
		}
	},
	// removing events
	removeEvent:function(event){
		var realEvent = Events.findOne({_id:event._id});
		if (realEvent){
			var worldId = realEvent.worldid;
			if (realEvent.owner == this.userId) {
				var eventWorld = Worlds.findOne({_id:event.worldid});
				Events.remove(Events.findOne({_id:event._id}));
				Worlds.update({_id: realEvent.worldid}, {$set:{lastEdit:new Date()}});
					var worldid = Meteor.call("updateWorldEdit", worldId, function(err, res){
						if (!err){// all good
						}
					});
			}
		}
	},
})