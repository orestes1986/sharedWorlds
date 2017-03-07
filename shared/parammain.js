// code that is shared between client and server, i.e. sent to both

// method definitions
Meteor.methods({
	addParam:function(param) {
		console.log("Entered  addParam");
		if (!this.userId){// not logged in
			return;
		} else {
			var cyoa = Cyoas.findOne({_id: param.cyoaid});
			if (cyoa) {
// 				console.log(cyoa._id);
				var addingParam = ({title:param.title, cyoaid:param.cyoaid, owner:this.userId});
				var paramid = CyoaParams.insert(addingParam);
				console.log(paramid);
				console.log(CyoaParams.findOne({_id:paramid}));
				Meteor.call("updateCyoa", cyoa);
				if (Meteor.isClient) {
					$("#page_add_form").modal('hide');
				}
				return CyoaParams.findOne({_id:paramid});
			}
		}
	},
	updateParam:function(param){
		console.log("Entered  updateParam");
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
			CyoaParams.remove(param);
		}
	},
})