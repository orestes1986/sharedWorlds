// code that is shared between client and server, i.e. sent to both

// method definitions
Meteor.methods({
	addGameAdv:function(cyoaid) {
// 		console.log("Adding GameAdv");
		if (!this.userId){// not logged in
			return;
		} else {
			var page = Pages.findOne( {cyoaid: cyoaid, "parent": { $elemMatch: { "parentid": "none" } } } );
			if (page) {
// 				console.log(page);
				var addingGame = ({cyoaid:cyoaid, owner:this.userId, createdOn:new Date(), lastEdit:new Date()});
				var gameid = GameAdvs.insert(addingGame);
// 				console.log(gameid);
				var bodyid = Meteor.call("getTheRightBody", page._id); // calling: ~/sharedworlds/shared/playermain.js - getTheRightBody/~ //
// 				console.log("getTheRightBody returned 2");
// 				console.log(bodyid);
				var realBody = PagesBodies.findOne({_id:bodyid});
				if (realBody) {
					//Meteor.call("getTheRightBody", page._id); // calling: ~/sharedworlds/shared/playermain.js - getTheRightBody/~ //
					var addingPlayer = ({gameid:gameid, playerid:this.userId, pageid:page._id, bodyid:bodyid, time:realBody.time});
					var playerid = Players.insert(addingPlayer);
		// 			console.log(gameid);
					return gameid;//addedCyoa;
				}
			}
		}
	},
	updateGameAdv:function(cyoa){
		var realCyoa = Cyoas.findOne({_id:cyoa._id});
		if (realCyoa){
			if (realCyoa.owner == this.userId) {
				Cyoas.update({_id: realCyoa._id}, {$set:{title:realCyoa.title, url:realCyoa.url, lastEdit:new Date()}});
				var ev = Events.findOne({_id: realCyoa.eventid});
				Events.update({_id: ev._id}, {$set:{lastEdit:new Date()}});
				Worlds.update({_id: ev.worldid}, {$set:{lastEdit:new Date()}});
			}
		}
	},
	// removing events
	removeGameAdv:function(gameid){
// 		console.log("Deleting Game");
// 		console.log(GameAdvs.findOne({_id:cyoaid}));
// 		console.log(gameid);
		var realGame = GameAdvs.findOne({_id:gameid});
		if (realGame){
// 			console.log("Game is real");
			Players.remove({gameid:realGame._id, playerid: this.userId});
			var player = Players.findOne({gameid:realGame._id});
			if (! player) {
				GameAdvs.remove({_id:gameid});
			}
		}
	},
	// removing events
	addingParamsToGameAdv:function(playerid, gameid, bodyid) {
// 		console.log("adding Params To Game");
		var realPlayer = Players.findOne({_id:playerid});
		if ((!bodyid) || (bodyid == "")){
			pageid = realPlayer.pageid;
			bodyid = realPlayer.bodyid;
		} else {
			var pageBody = PagesBodies.findOne({_id:bodyid});
			pageid = pageBody.pageid;
		}
		if (realPlayer) {
			if (realPlayer.playerid == this.userId) {
				var realGame = GameAdvs.findOne({_id:realPlayer.gameid});/*
	// 			var paramsForBody = CyoaParams.find({
	// 				$and: [ 
	// 					{	cyoaid:realGame.cyoaid
	// 					}, {
	// 						"data": {
	// 							$elemMatch: {
	// 								"values": {
	// 									$elemMatch: {
	// 										"bodyid": bodyid
	// 									}
	// 								}
	// 							}
	// 						}
	// 					}
	// 				]
	// 			}).fetch();*/
				var paramsForPage = CyoaParams.find({
					$and: [ 
						{	cyoaid:realGame.cyoaid
						}, {
							"data": {
								$elemMatch: {
									"values": {
										$elemMatch: {
											"pageid": pageid
										}
									}
								}
							}
						}
					]
				}).fetch();/*
// 				console.log("params: ");
	// 			if ((paramsForBody) && (paramsForBody.length > 0)){
	// 				for (var parami = 0; parami < paramsForBody.length; parami++) {
	// 					for (var playerParami = 0; playerParami < realPlayer.param.length; playerParami++) {
	// 						if (realPlayer.param[playerParami].paramid == paramsForBody[parami]._id) {
	// 						}
	// 					}
	// 					for (var datai = 0; datai < paramsForBody[parami].data.length; datai++) {
	// 					}
	// 				}
	// 				console.log("paramsForBody");
	// 				console.log(paramsForBody);
	// 			} else */
				if ((paramsForPage) && (paramsForPage.length > 0)) {
					var index = 0;
// 					console.log("paramsForPage");
	// // 				console.log(paramsForPage);
					for (var i = 0; i < paramsForPage.length; i++) {
	// 					console.log(paramsForPage[i]);
						for (var j = 0; j < paramsForPage[i].data.length; j++) {
	// 						console.log(paramsForPage[i].data[j]);
							for (var k = 0; k < paramsForPage[i].data[j].values.length; k++) {
								if (paramsForPage[i].data[j].values[k].pageid == pageid) {
									if ((realPlayer.param) && (realPlayer.param.length > 0)){
										index = Object.keys(realPlayer.param).length;
										for (var l = 0; l < realPlayer.param.length; l++) {
// 											console.log("realPlayer.param");
// 											console.log(realPlayer.param);
											if ((realPlayer.param[l].paramid == paramsForPage[i]._id) && (realPlayer.param[l].paramIndex == j)){
												index = l;
											}
										}
									}
									var paramToupdate = {
										paramid: paramsForPage[i]._id,
										paramIndex: j,
										paramValueIndex: k,
	       
									}
									if (!realPlayer.param) {
										Players.update({_id:realPlayer._id}, { $set: {param:[]}});
									}
									var setModifier = { $set: {} };
									setModifier.$set['param.' + index] = paramToupdate;
									Players.update({_id:realPlayer._id}, setModifier);
// 									console.log(Players.findOne({_id: realPlayer._id}));
// 									console.log(setModifier);
								}
							}
						}
					}
				}
			}
		}
	},
})
