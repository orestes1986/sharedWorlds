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

// PARAM FIELD method definitions
Meteor.methods({
	addNumParamField:function(paramid){
		console.log("Entered  addNumParamField");
		console.log(paramid);
// 		console.log(pageid);
		var realParam = NumParams.findOne({_id:paramid});
// 		console.log(realParam);
		if (realParam){
			if (realParam.owner == this.userId) {
// 				console.log("it IS different");
				var cyoa = Cyoas.findOne({_id: realParam.cyoaid});
// 				var updatingPage = ({title:realParam.title, parentid:realParam.parentid, cyoaid:realParam.cyoaid, owner:this.userId});
				var dataIndex = realParam.data.length;
				console.log(dataIndex);
				var setModifier = { $set: {} };
				var value = {name: "Another Attribute"};
				setModifier.$set['data.' + dataIndex ] = value;
				console.log(setModifier);
				NumParams.update({_id:realParam._id}, setModifier);
				Meteor.call("updateCyoa", cyoa); // calling: ~/sharedworlds/shared/cyoamain.js - updateCyoa/~ //
					//
			}
		}
	},
	updateNumParamField:function(paramid, dataIndex, updating){
		console.log("Entered  updateNumParamField");
		var realParam = NumParams.findOne({_id:paramid});
		console.log(realParam);
		console.log(updating);
		if (realParam){
			if (realParam.owner == this.userId) {
				if ((updating.value != "") && (updating.value != " ") && (updating.value != " ")) {
					if (realParam.data[dataIndex]) {
						if (realParam.data[dataIndex].value != updating.value) {
							if (Meteor.isServer) {
								console.log("it IS different");
							}
							var cyoa = Cyoas.findOne({_id: realParam.cyoaid});							
							var setModifier = { $set: {} };
							setModifier.$set['data.' + dataIndex + '.name'] = updating.value;
							console.log(setModifier);
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
						Meteor.call("removeNumParamField", paramid, dataIndex); // calling: ~/sharedworlds/shared/numParamfieldmain.js - removeNumParamField/~ //
				}
			}
		}
	},
	removeNumParamField:function(paramid, dataIndex){
		console.log("Entered  removeNumParamField");
		console.log(paramid);
		var realParam = NumParams.findOne({_id:paramid});
// 		console.log(realParam);
		if (realParam){
			if (realParam.owner == this.userId) {
				console.log("it is Empty");
				var unsetObj = {};
				unsetObj['data.' + dataIndex ] = '1';
				console.log(unsetObj);
				NumParams.update({_id:realParam._id}, {$unset:unsetObj}, {multi:true});
				
				var pullObj = {};
				pullObj['data' ] = null;
				console.log(pullObj);
				NumParams.update({_id:realParam._id}, {$pull:pullObj}, {multi:true});
			}
		}
	},
})
