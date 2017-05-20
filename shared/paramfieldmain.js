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
	addParamField:function(paramid, pageid){
		console.log("Entered  addParamField");
		console.log(paramid);
		console.log(pageid);
		var realParam = CyoaParams.findOne({_id:paramid});
// 		console.log(realParam);
		if (realParam){
			if (realParam.owner == this.userId) {
// 				console.log("it IS different");
				var cyoa = Cyoas.findOne({_id: realParam.cyoaid});
// 				var updatingPage = ({title:realParam.title, parentid:realParam.parentid, cyoaid:realParam.cyoaid, owner:this.userId});
				var dataIndex = realParam.data.length;
				console.log(dataIndex);
				var setModifier = { $set: {} };
				var value = {name: "Another Parameter", values:[{value:"A dummy value", pageid:pageid}]};
				setModifier.$set['data.' + dataIndex ] = value;
				console.log(setModifier);
				CyoaParams.update({_id:realParam._id}, setModifier);
				Meteor.call("updateCyoa", cyoa);
			}
		}
	},
	removeParamField:function(paramid, dataIndex){
		console.log("Entered  removeParamField");
		console.log(paramid);
		var realParam = CyoaParams.findOne({_id:paramid});
// 		console.log(realParam);
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
})