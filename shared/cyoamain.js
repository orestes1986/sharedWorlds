// code that is shared between client and server, i.e. sent to both

// method definitions
Meteor.methods({
	addCyoa:function(cyoa, eventid) {
		if (!this.userId){// not logged in
			return;
		} else {
			var addingCyoa = ({title:cyoa.title, url:cyoa.url, eventid:eventid, owner:this.userId, createdOn:new Date(), lastEdit:new Date()});
			var cyoaid = Cyoas.insert(addingCyoa);
// 			console.log(Session.get("worldid"));
// 			console.log(cyoaid);
			var addedCyoa = Cyoas.findOne({_id:cyoaid});
// 			console.log(addedCyoa);
			if (addedCyoa) {
				if (!cyoa.url) {
					console.log("Adding first page");
					var addingFirstPage = ({title:"First Page", cyoaid:cyoaid, parent:[{parentid:"none"}, {parentid:"Constant"}]});
					console.log("addingFirstPage");
					console.log(addingFirstPage);
					var pageid = Meteor.call("addPage", addingFirstPage);
					var event = Events.findOne({_id:eventid});
					console.log("Event start")
					console.log(event.start);
					var pageBodyId = Meteor.call("addPageBody", pageid, event.start); // calling: ~/sharedworlds/shared/pagebodies.js - addPageBody/~ //
					console.log("PagesBody");
					console.log(PagesBodies.findOne({_id:pageBodyId}));
				}
			}
			var addedCyoa = Cyoas.findOne({_id:cyoaid});
			Meteor.call("updateCyoa", addedCyoa); // calling: ~/sharedworlds/shared/cyoamain.js - updateCyoa/~ //
			return cyoaid;//addedCyoa;
		}
	},
	updateCyoa:function(cyoa) {
		if (!this.userId) {// not logged in
			return;
		} else {
			var realCyoa = Cyoas.findOne({_id:cyoa._id});
			if (realCyoa){
				if (realCyoa.owner == this.userId) {
					Cyoas.update({_id: realCyoa._id}, {$set:{title:realCyoa.title, url:realCyoa.url, lastEdit:new Date()}});
					var ev = Events.findOne({_id: realCyoa.eventid});
					Events.update({_id: ev._id}, {$set:{lastEdit:new Date()}});
					Worlds.update({_id: ev.worldid}, {$set:{lastEdit:new Date()}});
				}
			}
		}
	},
	// removing events
	removeCyoa:function(cyoaid) {
// 			console.log("Deleting Cyoa");
// 			console.log(Cyoas.findOne({_id:cyoaid}));
// 			console.log(cyoaid);
		var realCyoa = Cyoas.findOne({_id:cyoaid});
		if (realCyoa){
// 			console.log("Cyoa is real");
			var eventid = realCyoa.eventid;
// 			console.log(realCyoa.owner);
// 			console.log(this.userId);
			if (realCyoa.owner == this.userId) {
	// 			console.log("User is owner");
				var ev = Events.findOne({_id: realCyoa.eventid});
// 				console.log(ev._id);
				Pages.remove({cyoaid:realCyoa._id});
				Cyoas.remove(Cyoas.findOne({_id:realCyoa._id}));
				Events.update({_id: ev._id}, {$set:{lastEdit:new Date()}});
				Worlds.update({_id: ev.worldid}, {$set:{lastEdit:new Date()}});
			}
		}
	},
})
