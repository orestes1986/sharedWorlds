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

// method definitions
Meteor.methods({
	addParam:function(param) {
// 		console.log("Entered  addParam");
		if (!this.userId){// not logged in
			return;
		} else {
// 			console.log("param.cyoaid");
// 			console.log(param.cyoaid);
// 			var dataId = "";
			var cyoa = Cyoas.findOne({_id: param.cyoaid});
			if (cyoa) {
// 				console.log(cyoa._id);
				var addingParam = ({title:param.title, data:[{name: "A Parameter",/* value: "dummy Value", */ values:["A dummy value"]}], cyoaid:cyoa._id, owner:this.userId});
				var paramid = CyoaParams.insert(addingParam);
// 				console.log(paramid);
				Meteor.call("updateCyoa", cyoa);
				if (Meteor.isClient) {
					$("#param_add_form").modal('hide');
				}
				return paramid;
			}
		}
	},
	updateParam:function(param){
// 		console.log("Entered  updateParam");
		var realParam = CyoaParams.findOne({_id:param._id});
		if (realParam){
			if (realParam.owner == this.userId) {
				var cyoa = Cyoas.findOne({_id: param.cyoaid});
// 				var updatingPage = ({title:param.title, parentid:param.parentid, cyoaid:param.cyoaid, owner:this.userId});
				CyoaParams.update({_id: param._id}, {$set:{title:param.title, body:param.body, parentid:param.parentid, cyoaid:param.cyoaid}});
				Meteor.call("updateCyoa", cyoa);
			}
		}
	},
	// removing worlds
	removeParam:function(param){
// 		console.log("removeParam method");
//		 console.log(param);
		var realParam = CyoaParams.findOne({_id:param._id, owner:this.userId});
		if (realParam){
// 			Events.remove({worldid:realWorld._id});
			CyoaParams.remove({_id: realParam._id});
		}
	},
	addParamField:function(param){
		console.log("Entered  addParamField");
		console.log(param);
		var realParam = CyoaParams.findOne({_id:param._id});
// 		console.log(param);
		if (realParam){
			if (realParam.owner == this.userId) {
// 				console.log("it IS different");
				var cyoa = Cyoas.findOne({_id: param.cyoaid});
// 				var updatingPage = ({title:param.title, parentid:param.parentid, cyoaid:param.cyoaid, owner:this.userId});
				var dataIndex = realParam.data.length;
				console.log(dataIndex);
				var setModifier = { $set: {} };
				var value = {name: "Another Parameter", values:["A dummy value"]};
				setModifier.$set['data.' + dataIndex ] = value;
				console.log(setModifier);
				CyoaParams.update({_id:realParam._id}, setModifier);
				Meteor.call("updateCyoa", cyoa);
			}
		}
	},
	removeParamField:function(param, dataIndex){
		console.log("Entered  addParamField");
		console.log(param);
		var realParam = CyoaParams.findOne({_id:param._id});
// 		console.log(param);
		if (realParam){
			if (realParam.owner == this.userId) {
				console.log("it is Empty");
				var unsetObj = {};
				unsetObj['data.' + dataIndex ] = '1';
				console.log(unsetObj);
				CyoaParams.update({_id:realParam._id}, {$unset:unsetObj}, {multi:true});
				
				var pullObj = {};
				pullObj['data' ] = null;
				console.log(pullObj);
				CyoaParams.update({_id:realParam._id}, {$pull:pullObj}, {multi:true});
			}
		}
	},
	addParamFieldValue:function(param, dataIndex){
		console.log("Entered  addParamFieldValue");
		console.log(param);
		console.log(dataIndex);
		var realParam = CyoaParams.findOne({_id:param._id});
// 		console.log(param);
		if (realParam){
			if (realParam.owner == this.userId) {
// 				console.log("it IS different");
				var cyoa = Cyoas.findOne({_id: param.cyoaid});
// 				var updatingPage = ({title:param.title, parentid:param.parentid, cyoaid:param.cyoaid, owner:this.userId});
				var valueIndex = realParam.data[dataIndex].values.length;
				var setModifier = { $set: {} };
				setModifier.$set['data.' + dataIndex + '.values.'+valueIndex] = "Another value";
// 				console.log(setModifier);
				CyoaParams.update({_id:realParam._id}, setModifier);
				Meteor.call("updateCyoa", cyoa);
			}
		}
	},
	updateParamFieldValue:function(param, dataIndex, valueIndex, updating){
// 		console.log("Entered  updateParamFieldValue");
// 		updating = updating.replace(/(\r\n|\n|\r)/gm," ");
// 		console.log(updating);
		var realParam = CyoaParams.findOne({_id:param._id});
		if (realParam){
			if (realParam.owner == this.userId) {
				if ((updating != "") && (updating != " ") && (updating != " ")) {
					if (realParam.data[dataIndex].values[valueIndex] != updating) {
// 						console.log("it IS different");
						var cyoa = Cyoas.findOne({_id: param.cyoaid});
		// 				var updatingPage = ({title:param.title, parentid:param.parentid, cyoaid:param.cyoaid, owner:this.userId});
						
						var setModifier = { $set: {} };
						setModifier.$set['data.' + dataIndex + '.values.'+valueIndex] = updating;
// 						console.log(setModifier);
						CyoaParams.update({_id:realParam._id}, setModifier);
						Meteor.call("updateCyoa", cyoa);
					} else {
						console.log("it is NOT different");
						return false;
					}
				} else {
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
		}
	},
})