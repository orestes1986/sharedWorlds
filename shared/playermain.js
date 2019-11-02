// code that is shared between client and server, i.e. sent to both

//
//db.cyoaParams.update({_id: "hexBZFeR5XaaHXs6y" }, {$push:{data:{name: "Another data name",values:["another value"]}}})

//
//db.cyoaParams.update({_id: "hexBZFeR5XaaHXs6y" }, {$push:{'data.$.values':"yet another value"}})
//db.cyoaParams.update({_id: "hexBZFeR5XaaHXs6y" }, {$push:{'data.0.values':"one more value"}})
//
//db.cyoaParams.update({_id: "hexBZFeR5XaaHXs6y" }, {$set:{'data.0.values.1':"this value is edited"}})


//CyoaParams.update({_id: "hexBZFeR5XaaHXs6y" }, {$set:{'data.2':{name:"A dummy name", values:["A dummy value"]}}});

//
// db.cyoaParams.update({}, {$pull:{data:{name:"Another data name"}}})

// PARAM Field VALUE method definitions
Meteor.methods({
	addPlayer:function(paramid, dataIndex, value){
		console.log("Entered  addParamFieldValue");
		console.log(paramid);
// 		console.log(dataIndex);
		var realParam = CyoaParams.findOne({_id:paramid});
// 		console.log(realParam);
		if (realParam){
			var pageFlag = false;
// 			var param = CyoaParams.findOne({_id:paramid});
			var pageBodies = PagesBodies.find({pageid: value.pageid}).fetch();
			for (var i = 0; i < realParam.data[dataIndex].values.length; i++) {
				if (realParam.data[dataIndex].values[i].pageid == value.pageid) {
	// 				console.log("Page already has a value attached to it for this param");
					if (!realParam.data[dataIndex].values[i].bodyid) {
						pageFlag = true;
						break;
					}
				}
	// 			console.log(param.data[dataIndex].values[i]);
			}
	// 		if ((pageBodies.length + pageFlag) > 0) {
			if (pageFlag == false) {
				if (realParam.owner == this.userId) {
	// 				console.log("it IS different");
					var cyoa = Cyoas.findOne({_id: realParam.cyoaid});
	// 				var updatingPage = ({title:realParam.title, parentid:realParam.parentid, cyoaid:realParam.cyoaid, owner:this.userId});
					var valueIndex = Object.keys(realParam.data[dataIndex].values).length;
					var setModifier = { $set: {} };
					setModifier.$set['data.' + dataIndex + '.values.'+valueIndex] = value;
	// 				console.log(setModifier);
					CyoaParams.update({_id:realParam._id}, setModifier);
					Meteor.call("updateCyoa", cyoa); // calling: ~/sharedworlds/shared/cyoamain.js - updateCyoa/~ //
					return 1;
// 					return "Value added";
				} else {
					return 0;
// 					return "You are not the owner";
				}
			} else {
				if (value.bodyid){
					for (var i = 0; i < realParam.data[dataIndex].values.length; i++) {
						if (realParam.data[dataIndex].values[i].bodyid == value.bodyid) {
			// 				console.log("Page already has a value attached to it for this param");
							return 4;
// 							return "This body already has a value attached to it!"
						}
			// 			console.log(param.data[dataIndex].values[i]);
					}
					if (realParam.owner == this.userId) {
		// 				console.log("it IS different");
						var cyoa = Cyoas.findOne({_id: realParam.cyoaid});
		// 				var updatingPage = ({title:realParam.title, parentid:realParam.parentid, cyoaid:realParam.cyoaid, owner:this.userId});
						var valueIndex = Object.keys(realParam.data[dataIndex].values).length;
						var setModifier = { $set: {} };
						setModifier.$set['data.' + dataIndex + '.values.'+valueIndex] = value;
		// 				console.log(setModifier);
						CyoaParams.update({_id:realParam._id}, setModifier);
						Meteor.call("updateCyoa", cyoa); // calling: ~/sharedworlds/shared/cyoamain.js - updateCyoa/~ //
						return 1;
	// 					return "Value added";
					} else {
						return 0;
	// 					return "You are not the owner";
					}
				}
				return 2;
	// 			return "Please attach this value to a body, otherwise this page might not behave as expected!";
			}
		} else {
			return 3;
// 			return "Not a valid param";
		}
	},
	updatePlayerPage:function(playerid, pageid){
// 		console.log("Entered  updateParamFieldValue");
		var realPlayer = Players.findOne({_id:playerid});
// 		console.log(realParam);
		if (realPlayer){
			if (realPlayer.playerid == this.userId) {
				var realPage = Pages.findOne({_id: pageid});
				if (realPage) {
// 					var bodyid = Meteor.playerFunctions.getTheRightBody(pageid, realPlayer._id);
					var bodyid = Meteor.call("getTheRightBody", pageid, realPlayer._id); // calling: ~/sharedworlds/shared/playermain.js - getTheRightBody/~ //
// 					console.log("getTheRightBody returned 3");
// 					console.log(bodyid);
					var realBody = PagesBodies.findOne({_id:bodyid});
					if (realBody) {
						var time = parseInt(parseInt(realPlayer.time) + parseInt(realBody.time));
						Players.update({_id:realPlayer._id}, {$set:{pageid:pageid, bodyid:bodyid, time:time}});
					/*	var params = CyoaParams.find({cyoaid: realPage.cyoaid}).fetch();
						for (var parami = 0; parami < params.length; parami++) {
							for (var datai = 0; datai < param[parami].data.length; datai++) {
								for (var valuei = 0; valuei < param[parami].data[datai].values.length; valuei++) {
									if (param[parami].data[datai].values[valuei].pageid == pageid) {
								
										Players.update({_id:realPlayer._id}, {$set:{pageid:pageid}});

										var paramFlag = false;
										var paramidFlag = false;
										var dataIndexFlag = false;
										var paramIndex = realPlayer.param.length;
										if (realPlayer.param) {
											paramFlag = true;
											for (var realPlayerParami = 0; realPlayerParami < realPlayer.param.length; realPlayerParami++) {
												if (param._id == realPlayer.param[realPlayerParami].paramid) {
													paramidFlag = true;
													var paramid = param._id;
													if (datai == realPlayer.param[realPlayerParami].paramIndex) {
														dataIndexFlag = true;
														var dataIndex = datai;
													}
												}
												break;
											}
										}
										var setParamidModifier = { $set: {} };
										setParamidModifier.$set['param.' + paramIndex + '.paramid'] = param._id;
										Players.update({_id:realPlayer._id}, setParamidModifier);
										var setParamIndexModifier = { $set: {} };
										setParamIndexModifier.$set['param.' + paramIndex + '.paramIndex'] = parami;
										Players.update({_id:realPlayer._id}, setParamIndexModifier);
										var setParamValueIndexModifier = { $set: {} };
										setParamValueIndexModifier.$set['param.' + paramIndex + '.paramValueIndex'] = valuei;
										Players.update({_id:realPlayer._id}, setParamValueIndexModifier);
									}
								}
							}
						} */
					/*	if (realPlayer.data[dataIndex]) {
							if (realParam.data[dataIndex].values[valueIndex].value != updating.value) {
								if (Meteor.isServer) {
									console.log("it IS different");
								}
								var cyoa = Cyoas.findOne({_id: realParam.cyoaid});							
								var setModifier = { $set: {} };
								setModifier.$set['data.' + dataIndex + '.values.'+valueIndex+'.value'] = updating.value;
		// 						console.log(setModifier);
								CyoaParams.update({_id:realParam._id}, setModifier);
								Meteor.call("updateCyoa", cyoa); // calling: ~/sharedworlds/shared/cyoamain.js - updateCyoa/~ //
							} else {
								if (Meteor.isServer) {
									console.log("it is NOT different");
								}
								return false;
							}
						}*/
					}
				}
			}
		}
	},/*
// 	updateParamFieldValueBodyId:function(paramid, dataIndex, valueIndex, updating){
// 		var realParam = CyoaParams.findOne({_id:paramid});
// // 		console.log(realParam);
// 		if (realParam){
// 			if (updating.bodyid) {
// 				console.log("It has a bodyID!!!");
// 				console.log(updating);
// 				for (var i = 0; i < realParam.data[dataIndex].values.length; i++) {
// 					if (realParam.data[dataIndex].values[i].bodyid == updating.bodyid) {
// 						console.log("This body already has a value attached to it!");
// 						return 4;
// // 							return "This body already has a value attached to it!"
// 					}
// 				}
// 				if (realParam.owner == this.userId) {
// 					var cyoa = Cyoas.findOne({_id: realParam.cyoaid});
// 					var setModifier = { $set: {} };
// 					setModifier.$set['data.' + dataIndex + '.values.'+valueIndex+'.bodyid'] = updating.bodyid;
// 					CyoaParams.update({_id:realParam._id}, setModifier);
// 					Meteor.call("updateCyoa", cyoa); // calling: ~/sharedworlds/shared/cyoamain.js - updateCyoa/~ //
// 					return 1;
// 					console.log("Value added");
// // 					return "Value added";
// 				} else {
// 					return 0;
// 					console.log("You are not the owner");
// // 					return "You are not the owner";
// 				}
// 			}
// 		}
// 	},*/
	removePlayer: function(paramid, dataIndex, valueIndex){
// 		console.log("Entered  removeParamFieldValue");
		var realParam = CyoaParams.findOne({_id:paramid});
// 		console.log(realParam);
		if (realParam){
			console.log("it is realParam");
			if (realParam.owner == this.userId) {
// 				console.log("it is Empty");
				var unsetObj = {};
				unsetObj['data.' + dataIndex + '.values.'+valueIndex ] = '1';
// 				console.log(unsetObj);
				CyoaParams.update({_id:realParam._id}, {$unset:unsetObj}, {multi:true});
				
				var pullObj = {};
				pullObj['data.' + dataIndex + '.values' ] = null;
// 				console.log(pullObj);
				CyoaParams.update({_id:realParam._id}, {$pull:pullObj}, {multi:true});
			}
		}
	},
	getTheRightBody: function(pageid, playerid){
// 		console.log("Getting the right body");
		var realPage = Pages.findOne({_id:pageid});
		if (realPage) {
			var bodies = PagesBodies.find({pageid:pageid}).fetch();
// 			console.log(bodies);
// 			console.log(bodies[0].conditions);
			var realPlayer = Players.findOne({_id:playerid});
			if (bodies.length > 0) {
				if ((bodies.length == 1) && (!bodies[0].conditions)) {
					return bodies[0]._id;
				} else if (bodies.length >= 1) {
					console.log("Entered bodies");
					if (realPlayer) {
						console.log("Entered realPlayer");
						console.log(realPlayer);
						bodies.sort(function(a, b) {
							var aConditionsLength = 0;
							var bConditionsLength = 0;
							if (a.conditions) {
								aConditionsLength = a.conditions.length;
							}
							if (b.conditions) {
								bConditionsLength = b.conditions.length;
							}
							if (aConditionsLength < bConditionsLength) {
								return 1;
							}
							if (aConditionsLength > bConditionsLength) {
								return -1;
							}
							if (aConditionsLength == bConditionsLength) {
								return 0;
							}
						});
						for (var bodiesi = 0; bodiesi < bodies.length; bodiesi++) {
							if (bodies[bodiesi].conditions) {
								var ors = [];
								var ands = [];
								for (var conditionsi = 0; conditionsi < bodies[bodiesi].conditions.length; conditionsi++) {
									if (bodies[bodiesi].conditions[conditionsi].operation.toUpperCase() != "OR") {
										ands.push(conditionsi);
									}
								}
								for (var conditionsi = 0; conditionsi < bodies[bodiesi].conditions.length; conditionsi++) {
									var conditionFlag = false;
									for (var andsi = 0; andsi < ands.length; andsi++) {
// 										console.log("Math.abs(ors[orsi] - conditionsi)");
// 										console.log(Math.abs(ors[orsi] - conditionsi));
										if (ands[andsi] == conditionsi) {
											conditionFlag = true;
											break;
										}
									}
									if (conditionFlag) {
// 										console.log("New OR: " + conditionsi);
										ors.push([conditionsi]);
									} else {
// 										console.log("Added to last OR: " + conditionsi);
										ors[ors.length-1].push(conditionsi);
									}
								}
								console.log("ANDS 2");
								console.log(ands);
								console.log("ORS");
								console.log(ors);
								var foundAfalse = false;
								for (var orsi = 0; orsi < ors.length; orsi++) {
									var orBool = false;
// 									console.log(ors[orsi]);
// 									console.log(bodies);
									for (var orsj = 0; orsj < ors[orsi].length; orsj++) {
										for (var andsi = 0; andsi < ands.length; andsi++) {
											if (ands[andsi] == ors[orsi][orsj]) {
												ands.splice(andsi,1);
												break;
											}
										}
// 										if (Meteor.playerFunctions.checkCondition(realPlayer, bodies[bodiesi].conditions[ors[orsi][orsj]]);) {
// 											orBool = true;
// 											break;
// 										}
										if (!orBool) {
											orBool = Meteor.call("checkCondition", realPlayer, bodies[bodiesi].conditions[ors[orsi][orsj]]); // calling: ~/sharedworlds/shared/playermain.js - checkCondition/~ //
// 											console.log("orBool");
// 											console.log(orBool);
// 											orBool = Meteor.playerFunctions.checkCondition(realPlayer, bodies[bodiesi].conditions[ors[orsi][orsj]]);
// 											console.log(orBool);
// 											console.log(realPlayer);
// 											console.log(bodies[bodiesi].conditions[ors[orsi][orsj]]);
										}
									}
									if (!orBool) {
										console.log(foundAfalse);
										foundAfalse = true;
									}
								}
								console.log("ANDS");
								console.log(ands);
								for (var andsi = 0; andsi < ands.length; andsi++) {
// 									console.log(bodies[bodiesi].conditions[ands[andsi]]);
// 									if ( Meteor.playerFunctions.checkCondition(realPlayer, bodies[bodiesi].conditions[ands[andsi]]) ) {
									if (Meteor.call("checkCondition", realPlayer, bodies[bodiesi].conditions[ands[andsi]]) ) { // calling: ~/sharedworlds/shared/playermain.js - checkCondition/~ //
										foundAfalse = true;
										break;
									}
								}
								if (!foundAfalse) {
// 									console.log (bodies[bodiesi]._id);
									return bodies[bodiesi]._id;
								}
							} else {
								var defaultBody = bodies[bodiesi];
							}
						}
						if (defaultBody) {
							return defaultBody._id;
						}
					} else {
						return -1;
					}
				}
			}
		}
	},
	checkCondition: function(player, bodyCondition){
		console.log("checkCondition");
		for (var playerParami = 0; playerParami < player.param.length; playerParami++) {
			if (bodyCondition.paramid == player.param[playerParami].paramid) {
				if (bodyCondition.paramIndex == player.param[playerParami].paramIndex) {
					if (bodyCondition.operator == "equal") {
						console.log("It is equal");
						if (bodyCondition.paramValueIndex == player.param[playerParami].paramValueIndex) {
							return true;
						}
					}
					if (bodyCondition.operator == "unequal") {
						console.log("It is unequal");
						if (bodyCondition.paramValueIndex != player.param[playerParami].paramValueIndex) {
							return true;
						}
					}
					if(bodyCondition.operator == "larger") {
						if (bodyCondition.paramValueIndex < player.param[playerParami].paramValueIndex) {
							return true;
						}
					}
					if(bodyCondition.operator == "smaller") {
						if (bodyCondition.paramValueIndex < player.param[playerParami].paramValueIndex) {
							return true;
						}
					}
				}
			}
		}
		return false;
	},
	getInterruptions: function(currentBody, playerid, cyoaid) {
// 		console.log("interruption");
// 		console.log(currentBody);
// 		console.log(currentBody.time);
		var player = Players.findOne( { _id:playerid} );
		if (player) {
	// 		console.log(player.time);
			var interruptions = [];
			var pages = Pages.find( {cyoaid:cyoaid, "parent": { $elemMatch: { "parentid": "Constant", "choiceValue":"public" } } } ).fetch();
			var bodyTime = parseInt(currentBody.time);
			var playerTime = parseInt(player.time);
			for (var p = 0; p < pages.length; p++) {
// 				var pageBodies = PagesBodies.find({pageid:pages[p]._id}).fetch();
				var bodyid = Meteor.call("getTheRightBody", pages[p]._id, player._id);
// 				console.log(bodyid);
				var pageBodies = PagesBodies.findOne({_id:bodyid});
// 				for (var pb = 0; pb < pageBodies.length; pb++) {
	// 				console.log(parseInt(pageBodies[pb].time));
// 					var constantTime = parseInt(pageBodies[pb].time);
				if (pageBodies) {
					var constantTime = parseInt(pageBodies.time);
					if (constantTime > playerTime - bodyTime) {
	// 					console.log("There is an interruption in the future (of last page)");
						if (constantTime <= playerTime) {
	// 						console.log ("Same interruption is in this pages past");					
// 							interruptions.push(pageBodies[pb]);
							interruptions.push(pageBodies);
						}
					}
				}
// 				}
			}
		}
// 		console.log("interruptions");
// 		console.log(interruptions);
		return interruptions;
	}
})
