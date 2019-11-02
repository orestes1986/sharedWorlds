// code that is shared between client and server, i.e. sent to both

// method definitions
Meteor.methods({
	addPage:function(page) {
		console.log("Entered  addPage");
		if (!this.userId){// not logged in
			return;
		} else {
			var cyoa = Cyoas.findOne({_id: page.cyoaid});
			if (cyoa) {
				page.owner = this.userId;
				var pageid = Pages.insert(page);
				Meteor.call("updateCyoa", cyoa); // calling: ~/sharedworlds/shared/cyoamain.js - updateCyoa/~ //
				if (Meteor.isClient) {
					$("#page_add_form").modal('hide');
				}
				return pageid;//Pages.findOne({_id:pageid});
			}
		}
	},
	updatePage:function(page){
// 		console.log("Entered  updatePage");
		if (!this.userId) {// not logged in
			return;
		} else {
			var realPage = Pages.findOne({_id:page._id});
			if (realPage){
				if (realPage.owner == this.userId) {
					var cyoa = Cyoas.findOne({_id: page.cyoaid});
	// 				var updatingPage = ({title:page.title, parentid:page.parent.parentid, cyoaid:page.cyoaid, owner:this.userId});
					Pages.update({_id: page._id}, {$set:{/*title:page.title, body:page.body,*/ parent:page.parent, cyoaid:page.cyoaid}});
					Meteor.call("updateCyoa", cyoa); // calling: ~/sharedworlds/shared/cyoamain.js - updateCyoa/~ //
				}
			}
		}
	},
	// removing worlds
	removePage:function(page){
		console.log("removePage method");
		console.log(page);
		var onlyPageFlag = true;
		var realPage = Pages.findOne({_id:page._id, owner:this.userId});
		console.log(realPage);
		if (realPage) {
// 			console.log("Page is real");
// 			console.log(realPage.parent);
			if (realPage.parent) {
// 				console.log("Page has parent");
				for (var pi = 0; pi < realPage.parent.length; pi++) {
					if ((realPage.parent[pi].parentid.toUpperCase() == "NONE")) {
// 						console.log("realPage.parent[pi].parentid");
// 						console.log(realPage.parent[pi].parentid);
// 						var checkParentPageBody = PagesBodies.findOne({_id:realPage.parent[pi].parentid});
// 						console.log(checkParentPageBody);
// 						if (checkParentPageBody) {
// 							onlyPageFlag = false;
// 							break;
// 						}
// 					}
					return;
				}
			}
// 			if (onlyPageFlag == false) {
// 			Events.remove({worldid:realWorld._id});
			}
			Pages.remove({_id:realPage._id});
		}
		/////////////////////////////////////////
		for (;;) {
			var repeatFlag = false;
			var realParam = CyoaParams.find({}).fetch();
			console.log(realParam);
			if (realParam){
				for (var params = 0; params < realParam.length; params++) {
					for (var datas = 0; datas < realParam[params].data.length; datas++) {
						for (var value = 0; value < realParam[params].data[datas].values.length; value++) {
							if (realParam[params].data[datas].values[value].pageid == page._id) {
								Meteor.call("removeParamFieldValue", realParam[params]._id, datas, value); // calling: ~/sharedworlds/shared/paramvaluemain.js - removeParamFieldValue/~ //
								repeatFlag = true;
								console.log("true");
								break;
							}
				// 			console.log(param.data[dataIndex].values[i]);
						}
					}
				}
			}
			console.log("repeatFlag");
			console.log(repeatFlag);
			if (repeatFlag == false) {
				break;
			}
		}
		/////////////////////////////////////////
	},
})
