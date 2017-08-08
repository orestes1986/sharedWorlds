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
	addNumParam:function(param) {
		console.log("Entered  addNumParam");
		if (!this.userId){// not logged in
			return;
		} else {
			var cyoa = Cyoas.findOne({_id: param.cyoaid});
			if (cyoa) {
// 				console.log(cyoa._id);
				var addingParam = (
					{ title: param.title,
						data: [ 
							{ 
							name: "A Parameter",
							values: [
								{ value: 0, pageid: param.pageid }
							]
							}
						], 
						cyoaid:cyoa._id, owner:this.userId
					});
				var paramid = NumParams.insert(addingParam);
// 				console.log(paramid);
				Meteor.call("updateCyoa", cyoa);
				if (Meteor.isClient) {
					$("#param_add_form").modal('hide');
				}
				return paramid;
			}
		}
	},
	updateNumParam:function(param){
// 		console.log("Entered  updateNumParam");
		var realParam = NumParams.findOne({_id:param._id});
		if (realParam){
			if (realParam.owner == this.userId) {
				var cyoa = Cyoas.findOne({_id: param.cyoaid});
// 				var updatingPage = ({title:realParam.title, parentid:realParam.parentid, cyoaid:realParam.cyoaid, owner:this.userId});
				NumParams.update({_id: param._id}, {$set:{title:param.title, data:param.data, /*cyoaid:param.cyoaid, owner:param.owner*/}});
				Meteor.call("updateCyoa", cyoa);
			}
		}
	},
	// removing numeric params
	removeNumParam:function(paramid){
// 		console.log("removeNumParam method");
//		 console.log(paramid);
		var realParam = NumParams.findOne({_id:paramid, owner:this.userId});
		if (realParam){
// 			Events.remove({worldid:realWorld._id});
			NumParams.remove({_id: realParam._id});
		}
	},
})
