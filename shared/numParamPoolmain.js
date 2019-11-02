// NUMPARAM Pool VALUE method definitions
Meteor.methods({
	addNumParamPoolPoint:function(paramid, value){
		console.log("Entered  addNumParamPoolPoint");
		console.log(value);
		console.log(paramid);
		console.log(ppIndex);
		var realParam = NumParams.findOne({_id:paramid});
		console.log(realParam);
		if (realParam){
			var pageFlag = false;
// 			var param = NumParams.findOne({_id:paramid});
// 			var pageBodies = PagesBodies.find({pageid: value.pageid}).fetch();
			for (var i = 0; i < realParam.point_pool.length; i++) {
				if (realParam.point_pool[i].pageid == value.pageid) {
	// 				console.log("Page already has a value attached to it for this param");
					if (!realParam.point_pool[i].bodyid) {
						pageFlag = true;
						break;
					}
				}
	// 			console.log(param.point_pool[i]);
			}
	// 		if ((pageBodies.length + pageFlag) > 0) {
			if (pageFlag == false) {
				if (realParam.owner == this.userId) {
	// 				console.log("it IS different");
					var cyoa = Cyoas.findOne({_id: realParam.cyoaid});
	// 				var updatingPage = ({title:realParam.title, parentid:realParam.parentid, cyoaid:realParam.cyoaid, owner:this.userId});
					var ppIndex = Object.keys(realParam.point_pool).length;
					console.log(value);
					var setModifier = { $set: {} };
					setModifier.$set['point_pool.' + ppIndex] = value;
					console.log(setModifier);
					NumParams.update({_id:realParam._id}, setModifier);
					Meteor.call("updateCyoa", cyoa); // calling: ~/sharedworlds/shared/cyoamain.js - updateCyoa/~ //
					return 1;
// 					return "Value added";
				} else {
					return 0;
// 					return "You are not the owner";
				}
			} else {
				if (value.bodyid){ // realParam.point_pool[i].bodyid
					for (var i = 0; i < realParam.point_pool.length; i++) {
						if (realParam.point_pool[i].bodyid == value.bodyid) {
			// 				console.log("Page already has a value attached to it for this param");
							return 4;
// 							return "This body already has a value attached to it!"
						}
			// 			console.log(realParam.point_pool[i]);
					}
					if (realParam.owner == this.userId) {
		// 				console.log("it IS different");
						var cyoa = Cyoas.findOne({_id: realParam.cyoaid});
		// 				var updatingPage = ({title:realParam.title, parentid:realParam.parentid, cyoaid:realParam.cyoaid, owner:this.userId});
						var ppIndex = Object.keys(realParam.point_pool).length;
						var setModifier = { $set: {} };
						setModifier.$set['point_pool.' + ppIndex] = value;
						console.log("Cheeeeeck");
						console.log(ppIndex);
						console.log(value);
						console.log(setModifier);
						NumParams.update({_id:realParam._id}, setModifier);
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
	updateNumParamPoolPoint:function(paramid, ppIndex, updating){
		console.log("Entered  updateNumParamPoolPoint");
		var realParam = NumParams.findOne({_id:paramid});
		console.log(realParam);
		console.log(updating);
		if (realParam){
			if (realParam.owner == this.userId) {
				if ((updating.value != "") && (updating.value != " ") && (updating.value != " ")) {
					if (realParam.point_pool[ppIndex]) {
						if (realParam.point_pool[ppIndex].value != updating.value) {
							if (Meteor.isServer) {
								console.log("it IS different");
							}
							var cyoa = Cyoas.findOne({_id: realParam.cyoaid});							
							var setModifier = { $set: {} };
							setModifier.$set['point_pool.' + ppIndex + '.value'] = updating.value;
	// 						console.log(setModifier);
							NumParams.update({_id:realParam._id}, setModifier);
							Meteor.call("updateCyoa", cyoa); // calling: ~/sharedworlds/shared/cyoamain.js - updateCyoa/~ //
						} else {
							if (Meteor.isServer) {
								console.log("it is NOT different");
							}
							return false;
						}
					}
				} else {
						Meteor.call("removeNumParamPoolPoint", paramid, ppIndex); // calling: ~/sharedworlds/shared/numParamPoolmain.js - removeNumParamPoolPoint/~ //
				}
			}
		}
	},
	updateNumParamPoolPointBodyId:function(paramid, ppIndex, updating){
		var realParam = NumParams.findOne({_id:paramid});
		console.log("Entered updateNumParamPoolPointBodyId");
		console.log(realParam);
		if (realParam){
			if (updating.bodyid) {
				console.log("It has a bodyID!!!");
				console.log(updating);
				if (realParam.point_pool[ppIndex].bodyid == updating.bodyid) {
					console.log("This body already has a value attached to it!");
					return 4;
// 							return "This body already has a value attached to it!"
				}
				if (realParam.owner == this.userId) {
					var cyoa = Cyoas.findOne({_id: realParam.cyoaid});
					var setModifier = { $set: {} };
					setModifier.$set['point_pool.' + ppIndex+'.bodyid'] = updating.bodyid;
					NumParams.update({_id:realParam._id}, setModifier);
					Meteor.call("updateCyoa", cyoa); // calling: ~/sharedworlds/shared/cyoamain.js - updateCyoa/~ //
					return 1;
					console.log("Value added");
// 					return "Value added";
				} else {
					return 0;
					console.log("You are not the owner");
// 					return "You are not the owner";
				}
			}
		}
	},
	removeNumParamPoolPoint: function(numParamid, ppIndex){
		console.log("Entered  removeNumParamPoolPoint");
		var realParam = NumParams.findOne({_id:numParamid});
		console.log(realParam);
		if (realParam){
			console.log("it is realParam");
			if (realParam.owner == this.userId) {
				console.log("it is Empty");
				var unsetObj = {};
				unsetObj['point_pool.' + ppIndex ] = '1';
				console.log(unsetObj);
				NumParams.update({_id:realParam._id}, {$unset:unsetObj}, {multi:true});
				
				var pullObj = {};
				pullObj['point_pool'] = null;
				console.log(pullObj);
				NumParams.update({_id:realParam._id}, {$pull:pullObj}, {multi:true});
			}
		}
	},
})
