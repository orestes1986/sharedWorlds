// code that is shared between client and server, i.e. sent to both

// method definitions
Meteor.methods({
	addConstant:function(page) {
		console.log("Entered  addConstant");
		if (!this.userId){// not logged in
			return;
		} else {
			console.log("page");
			console.log(page);
			var cyoa = Cyoas.findOne({_id: page.cyoaid});
			if (cyoa) {
				console.log(cyoa._id);
				
				
// 				var addingParam = (
// 					{ title: param.title,
// 						data: [ 
// 							{ 
// 							name: "A Parameter",
// 							values: [
// 								{ value: "dummy Value", pageid: param.pageid }
// 							]
// 							}
// 						], 
// 						cyoaid:cyoa._id, owner:this.userId
// 					});
// 				var paramid = CyoaParams.insert(addingParam);
				
				var addingPage = ({title:page.content, parent:[{parentid:"Constant"}], cyoaid:page.cyoaid, owner:this.userId});
				console.log("addingPage");
				console.log(addingPage);
				var pageid = Pages.insert(addingPage);
				Meteor.call("addPageBody", pageid, page.start.getTime()); // calling: ~/sharedworlds/shared/pagebodiesmain.js - addPageBody/~ //
// 				console.log("pageid");
// 				console.log(pageid);
// 				console.log("page");
// 				console.log(Pages.findOne({_id:pageid}));
				Meteor.call("updateCyoa", cyoa); // calling: ~/sharedworlds/shared/cyoamain.js - updateCyoa/~ //
				if (Meteor.isClient) {
					$("#page_add_form").modal('hide');
				}
				return pageid;//Pages.findOne({_id:pageid});
			}
		}
	},
	updateConstant:function(page){
		console.log("Entered  updateConstant");
		console.log(page);
		
		if (!this.userId) {// not logged in
			return;
		} else {
			var realPage = Pages.findOne({_id:page._id});
			if (realPage){
				if (realPage.owner == this.userId) {
					var cyoa = Cyoas.findOne({_id: realPage.cyoaid});
// 					var updatingPage = ({title:page.content});
					Pages.update({_id: page._id}, {$set:{title:page.content}});
					var pageBodies = PagesBodies.find({pageid:page._id}).fetch();
					for (var i = 0; i < pageBodies.length; i++) {
						console.log(pageBodies[i]);
						PagesBodies.update({_id:pageBodies[i]._id}, {$set:{time:page.start.getTime()}});
					}
					Meteor.call("updateCyoa", cyoa); // calling: ~/sharedworlds/shared/cyoamain.js - updateCyoa/~ //
				}
			}
		}
	},
})
