// code that is shared between client and server, i.e. sent to both

//
//db.cyoaParams.update({_id: "hexBZFeR5XaaHXs6y" }, {$push:{data:{name: "Another data name",values:["another value"]}}})

//
//db.cyoaParams.update({_id: "hexBZFeR5XaaHXs6y" }, {$push:{'data.$.values':"yet another value"}})
//db.cyoaParams.update({_id: "hexBZFeR5XaaHXs6y" }, {$push:{'data.0.values':"one more value"}})
//
//db.cyoaParams.update({_id: "hexBZFeR5XaaHXs6y" }, {$set:{'data.0.values.1':"this value is edited"}})


//NumParams.update({_id: "hexBZFeR5XaaHXs6y" }, {$set:{'data.2':{name:"A dummy name", values:["A dummy value"]}}});

//
// db.cyoaParams.update({}, {$pull:{data:{name:"Another data name"}}})

// PARAM method definitions
Meteor.methods({
	addNumParam:function(numParam) {
		console.log("Entered  addNumParam");
		if (!this.userId){// not logged in
			return;
		} else {
			var cyoa = Cyoas.findOne({_id: numParam.cyoaid});
			if (cyoa) {
// 				console.log(cyoa._id);
				var addingParam = (
					{ title: numParam.title,
					point_pool: [{value: 0, pageid: numParam.pageid}],
						data: [ 
							{ 
							name: "An Attribute",
							}
						], 
						cyoaid:cyoa._id,
					   owner:this.userId
					});
				var paramid = NumParams.insert(addingParam);
// 				console.log(paramid);
				Meteor.call("updateCyoa", cyoa); // calling: ~/sharedworlds/shared/cyoamain.js - updateCyoa/~ //
				if (Meteor.isClient) {
					$("#param_add_form").modal('hide');
				}
				return paramid;
			}
		}
	},
	updateNumParam:function(numParam){
// 		console.log("Entered  updateNumParam");
		var realParam = NumParams.findOne({_id:numParam._id});
		if (realParam){
			if (realParam.owner == this.userId) {
				var cyoa = Cyoas.findOne({_id: numParam.cyoaid});
// 				var updatingPage = ({title:realParam.title, parentid:realParam.parentid, cyoaid:realParam.cyoaid, owner:this.userId});
				NumParams.update({_id: numParam._id}, {$set:{title:numParam.title, point_pool: numParam.point_pool, data:numParam.data/*, cyoaid:numParam.cyoaid, owner:numParam.owner*/}});
				Meteor.call("updateCyoa", cyoa); // calling: ~/sharedworlds/shared/cyoamain.js - updateCyoa/~ //
			}
		}
	},
	// removing numeric params
	removeNumParam:function(numParamid){
// 		console.log("removeNumParam method");
//		 console.log(numParamid);
		var realNumParam = NumParams.findOne({_id:numParamid, owner:this.userId});
		if (realNumParam){
// 			Events.remove({worldid:realWorld._id});
			NumParams.remove({_id: realNumParam._id});
		}
	},
})
