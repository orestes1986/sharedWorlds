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
// 				console.log(cyoa._id);
				var addingPage = ({title:page.title, parentid:page.parentid, cyoaid:page.cyoaid, 	owner:this.userId});
				var pageid = Pages.insert(addingPage);
				console.log(pageid);
				console.log(Pages.findOne({_id:pageid}));
				Meteor.call("updateCyoa", cyoa);
				if (Meteor.isClient) {
					$("#page_add_form").modal('hide');
				}
				return Pages.findOne({_id:pageid});
			}
		}
	},
	updatePage:function(page){
		console.log("Entered  updatePage");
		var realPage = Pages.findOne({_id:page._id});
		if (realPage){
			if (realPage.owner == this.userId) {
				var cyoa = Cyoas.findOne({_id: page.cyoaid});
// 				var updatingPage = ({title:page.title, parentid:page.parentid, cyoaid:page.cyoaid, owner:this.userId});
				Pages.update({_id: page._id}, {$set:{title:page.title, body:page.body, parentid:page.parentid, cyoaid:page.cyoaid}});
				Meteor.call("updateCyoa", cyoa);
			}
		}
	},
	// removing worlds
	removePage:function(page){
// 		console.log("removeWorld method");
//		 console.log(page);
		var realPage = Pages.findOne({_id:page._id, owner:this.userId});
		if (realPage){
// 			Events.remove({worldid:realWorld._id});
			Pages.remove(page);
		}
	},
})