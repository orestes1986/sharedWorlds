////////
/// page	HELPERS
////////

Template.allPageList.rendered = function() {
	console.log("allPageList.rendered");
	Meteor.cyoaFunctions.network();
};
Template.allPageList.helpers({
	network:function() {
		console.log("allPageList.helpers");
		Meteor.cyoaFunctions.network();
	},
});
Template.deletepage.helpers({
	onlyPage:function(){
// 		for (var j = 0; j < this_bodies.length; j++) {
			for (var i = 0; i < this.parent.length; i++) {
				var checkParentPageBody = PagesBodies.findOne({_id:this.parent[i].parentid});
				if (checkParentPageBody) {
// 					console.log(checkParentPageBody);
					return true;
				}
			}
// 		}
		return false;
				return true;
	},
});
Template.pageItem.helpers({
	activePage:function(){
// 		console.log(Session.get("pageid"));
// 		console.log(Session.get("cyoaid"));
// 		if (Session.get("pageid") == "none") {
// 			console.log(Pages.find({cyoaid:Session.get("cyoaid"), "parent": { $elemMatch: { "parentid": "none" } }}).fetch().length);
// 			var page = Pages.findOne({cyoaid:Session.get("cyoaid"), "parent": { $elemMatch: { "parentid": "none" } }});
// 		} else {
			var page = Pages.findOne({_id:Session.get("pageid")});
// 		}
		if (page) {
// 			console.log(page._id);
		}
		return page;
	},
	hasParent:function(){
// 		console.log("this.parentid");
// 		console.log(this.parentid);
		for (var i = 0; i < this.parent.length; i++) {
			if (this.parent[i].parentid != "none") {
// 				console.log("this.parent[i].parentid != none");
				return true;
			}
		}
		return false;
	},
});

Template.allPageList.helpers({
	allPages:function(){
// 		console.log(Session.get("pageid"));
// 		console.log(Session.get("cyoaid"));
		var pages = Pages.find({cyoaid:Session.get("cyoaid")});
// 		console.log(pages);
		return pages;
	},
	readyORnot:function(){
// 		console.log("readyORnot");
// 		console.log(this._id);
// 		console.log(Session.get("pageid"));
		var notReadyFlag = false;
		var pageBodies = PagesBodies.find({pageid:this._id}).fetch();
		console.log(pageBodies);
		if ((pageBodies) && (pageBodies.length > 0)){
			for (var i = 0; i < pageBodies.length; i++) {
				for (var j = 0; j < pageBodies[i].texts.length; j++) {
					for (var k = 0; k < pageBodies[i].texts[j].paragraphs.length; k++) {
// 					console.log(pageBodies[i]);
// 					console.log(pageBodies[i].texts[j]);
// 					console.log(pageBodies[i].texts[j].paragraphs[k]);
// 					console.log(pageBodies[i].texts[j].paragraphs[k].paragraph);
						if ((pageBodies[i].texts[j].paragraphs[k].paragraph == "") || (!pageBodies[i].texts[j].paragraphs[k].paragraph)) {
							notReadyFlag = true;
							break;
						}
					}
				}
			}
			if (notReadyFlag) {
// 				console.log("css-page-choise-not-ready");
				return "css-page-choise-not-ready";
			} else {
// 				console.log("css-page-choise-ready");
				return "css-page-choise-ready";
			}
		} else {
// 			console.log("pageBodies do not exist");
			return "css-page-choise-not-ready";
		}
	},
// 	readyORnot:function(){
// // 		console.log("readyORnot");
// // 		console.log(this._id);
// // 		console.log(Session.get("pageid"));
// 		var notReadyFlag = false;
// 		var pageBodies = PagesBodies.find({pageid:this._id}).fetch();
// // 		console.log(pageBodies);
// 		if ((pageBodies) && (pageBodies.length > 0)){
// 			for (var i = 0; i < pageBodies.length; i++) {
// // 			console.log(pageBodies[i].body);
// 				if ((pageBodies[i].body == "") || (!pageBodies[i].body)) {
// 					notReadyFlag = true;
// 					break;
// 				}
// 			}
// 			if (notReadyFlag) {
// // 				console.log("css-page-choise-not-ready");
// 				return "css-page-choise-not-ready";
// 			} else {
// // 				console.log("css-page-choise-ready");
// 				return "css-page-choise-ready";
// 			}
// 		} else {
// // 			console.log("pageBodies do not exist");
// 			return "css-page-choise-not-ready";
// 		}
// 	}
});
Template.existingPageList.helpers({
	existingPages:function(bodyid){
		
		var pages = Pages.find({cyoaid:Session.get("cyoaid"), "parent": { $elemMatch: { "parentid": "Constant" } }}).fetch();
// 		var pages = Pages.find({cyoaid:Session.get("cyoaid"), "parent": { $elemMatch: { "parentid": "constant" } }}).fetch();
		var unwantedSuggestions = [];
		for (var i = 0; i < pages.length;i++) {
			unwantedSuggestions.push(pages[i]._id);
		}
// 		console.log("bodyid");
// 		console.log(bodyid);
		var children = Pages.find({cyoaid:Session.get("cyoaid"), "parent": { $elemMatch: { "parentid": Session.get("bodyid") } }}).fetch();
		for (var i = 0; i < children.length;i++) {
			unwantedSuggestions.push(children[i]._id);
		}
		unwantedSuggestions.push(Session.get("pageid"));
		return Pages.find({cyoaid:Session.get("cyoaid"), _id:{$nin: unwantedSuggestions}});
	},
	readyORnot:function(){
// 		console.log("readyORnot");
// 		console.log(this._id);
// 		console.log(Session.get("pageid"));
		var notReadyFlag = false;
		var pageBodies = PagesBodies.find({pageid:this._id}).fetch();
		console.log(pageBodies);
		if ((pageBodies) && (pageBodies.length > 0)){
			for (var i = 0; i < pageBodies.length; i++) {
				for (var j = 0; j < pageBodies[i].texts.length; j++) {
					for (var k = 0; k < pageBodies[i].texts[j].paragraphs.length; k++) {
// 					console.log(pageBodies[i]);
// 					console.log(pageBodies[i].texts[j]);
// 					console.log(pageBodies[i].texts[j].paragraphs[k]);
// 					console.log(pageBodies[i].texts[j].paragraphs[k].paragraph);
						if ((pageBodies[i].texts[j].paragraphs[k].paragraph == "") || (!pageBodies[i].texts[j].paragraphs[k].paragraph)) {
							notReadyFlag = true;
							break;
						}
					}
				}
			}
			if (notReadyFlag) {
// 				console.log("css-page-choise-not-ready");
				return "css-page-choise-not-ready";
			} else {
// 				console.log("css-page-choise-ready");
				return "css-page-choise-ready";
			}
		} else {
// 			console.log("pageBodies do not exist");
			return "css-page-choise-not-ready";
		}
	}
});
// Template.pageList.helpers({
// 	activePage:function(){
// 		return Pages.find({cyoaid:Session.get("cyoaid"), parentid:Session.get("pageid")});
// 	},
// });
