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
	addParamFieldValue:function(paramid, dataIndex, value){
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
					Meteor.call("updateCyoa", cyoa);
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
						Meteor.call("updateCyoa", cyoa);
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
	updateParamFieldValue:function(paramid, dataIndex, valueIndex, updating){
// 		console.log("Entered  updateParamFieldValue");
		var realParam = CyoaParams.findOne({_id:paramid});
// 		console.log(realParam);
		if (realParam){
			if (realParam.owner == this.userId) {
				if ((updating.value != "") && (updating.value != " ") && (updating.value != " ")) {
					if (realParam.data[dataIndex]) {
						if (realParam.data[dataIndex].values[valueIndex].value != updating.value) {
							if (Meteor.isServer) {
								console.log("it IS different");
							}
							var cyoa = Cyoas.findOne({_id: realParam.cyoaid});							
							var setModifier = { $set: {} };
							setModifier.$set['data.' + dataIndex + '.values.'+valueIndex+'.value'] = updating.value;
	// 						console.log(setModifier);
							CyoaParams.update({_id:realParam._id}, setModifier);
							Meteor.call("updateCyoa", cyoa);
						} else {
							if (Meteor.isServer) {
								console.log("it is NOT different");
							}
							return false;
						}
					}
				} else {
						Meteor.call("removeParamFieldValue", paramid, dataIndex, valueIndex);
				}
			}
		}
	},
	updateParamFieldValueBodyId:function(paramid, dataIndex, valueIndex, updating){
		var realParam = CyoaParams.findOne({_id:paramid});
// 		console.log(realParam);
		if (realParam){
			if (updating.bodyid) {
				console.log("It has a bodyID!!!");
				console.log(updating);
				for (var i = 0; i < realParam.data[dataIndex].values.length; i++) {
					if (realParam.data[dataIndex].values[i].bodyid == updating.bodyid) {
						console.log("This body already has a value attached to it!");
						return 4;
// 							return "This body already has a value attached to it!"
					}
				}
				if (realParam.owner == this.userId) {
					var cyoa = Cyoas.findOne({_id: realParam.cyoaid});
					var setModifier = { $set: {} };
					setModifier.$set['data.' + dataIndex + '.values.'+valueIndex+'.bodyid'] = updating.bodyid;
					CyoaParams.update({_id:realParam._id}, setModifier);
					Meteor.call("updateCyoa", cyoa);
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
	removeParamFieldValue: function(paramid, dataIndex, valueIndex){
		console.log("Entered  removeParamFieldValue");
		var realParam = CyoaParams.findOne({_id:paramid});
		console.log(realParam);
		if (realParam){
			console.log("it is realParam");
			if (realParam.owner == this.userId) {
				console.log("it is Empty");
				var unsetObj = {};
				unsetObj['data.' + dataIndex + '.values.'+valueIndex ] = '1';
				console.log(unsetObj);
				CyoaParams.update({_id:realParam._id}, {$unset:unsetObj}, {multi:true});
				
				var pullObj = {};
				pullObj['data.' + dataIndex + '.values' ] = null;
				console.log(pullObj);
				CyoaParams.update({_id:realParam._id}, {$pull:pullObj}, {multi:true});
			}
		}
	},
})