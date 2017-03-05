// code that is shared between client and server, i.e. sent to both


// method definitions
Meteor.methods({
	// adding new comments to a world
// 	addWorldComment:function(comment){
// // 		console.log("addWorldComment method running!");
// 		if (this.userId){// we have a user
// 			comment.owner = this.userId;
// 				return WorldComments.insert(comment);
// 		}
// 		console.log("did not add comment to the world as user not logged in.");
// 		return;
// 	},
	// adding new worlds
	addWorld:function(world){
		console.log("addWorld entered:");
//		 console.log(world);
		if (!this.userId){// not logged in
			return;
		} else {
		var addingWorld = ({title:world.title, description:world.description, tags:world.tags, owner:this.userId, advSum:0, createdOn:new Date(), lastEdit:new Date()});
//			 console.log(addingWorld);
			var id = Worlds.insert(addingWorld);
			console.log("addWorld method: got an id "+id);
//			 console.log(Worlds.findOne({_id:id}));
			if (Meteor.isClient) {
				$("#world_add_form").modal('hide');
			}
			return id;
		}
	},
	// removing worlds
	removeWorld:function(world){
// 		console.log("removeWorld method");
//		 console.log(world);
		var realWorld = Worlds.findOne({_id:world._id, owner:this.userId});
		if (realWorld){
			Events.remove({worldid:realWorld._id});
			Worlds.remove(world);
		}
	},
	// changing world privacy settings
	updateWorldPrivacy:function(world){
// 		console.log("updateWorldPrivacy method");
		console.log(world);
		var realWorld = Worlds.findOne({_id:world._id, owner:this.userId});
		if (realWorld){
			realWorld.isPrivate = world.isPrivate;
			Worlds.update({_id:world._id}, realWorld);
		}
	},
	// changing worldId privacy settings
	updateWorldEdit:function(worldId){
// 		console.log("updateWorldEdit method");
		if (Worlds.findOne({_id:worldId})){
			Worlds.update({ _id: worldId }, { $set: { advSum: Events.find({worldid:worldId}).count()/*Adventures.find({worldid:worldId}).count()*/, lastEdit: new Date() } });
		}
	},
// adding editors to a world
	addWorldEditingUsers:function(worldid){
		var world, user, eusers;
		world = Worlds.findOne({_id:worldid});
		if (!world){return;}// no world give up
		if (!this.userId){return;}// no logged in user give up
		// now I have a world and possibly a user
		user = Meteor.user().profile;
		eusers = WorldEditingUsers.findOne({worldid:world._id});
		if (!eusers){
			eusers = {
				worldid:world._id,
				users:{},
			};
		}
		user.lastEdit = new Date();
		eusers.users[this.userId] = user;
		WorldEditingUsers.upsert({_id:eusers._id}, eusers);
	}
})
