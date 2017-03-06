////////
/// page	HELPERS
////////

Template.page_add_form.helpers({
	cyoa_id:function() {
		return Session.get("cyoaid");
	},
	parent_id:function() {
		return Session.get("pageid");
	},
})
Template.bodyEditor.helpers({
  optionsHelper : function() {
    return {
      collection: "pages",
      field: "body",
	  wysiwyg: true,
// 	  textarea: true,
//       removeEmpty: true,
//       placeholder: "Post body for this page",
//       substitute: '<i class="fa fa-pencil"></i>'
    }
  }
});
// Template.editableText.helpers({
//     // test if a user is allowed to edit current doc
//   userCanEdit : function(doc,Collection) {
//     // can edit if the current doc is owned by me.
//     doc = Documents.findOne({_id:Session.get("pageid"), owner:Meteor.userId()});
//     if (doc){
//       return true;
//     }
//     else {
//       return false;
//     }
//   }    
// })
// Template.bodyEditor.helpers({
  // get current doc id
//   docid:function(){
// //     setupCurrentPage();
// 	if (Session.get("pageid")) {
// 		console.log("Session.get(pageid)");
// 		console.log(Session.get("pageid"));
// 		return Session.get("pageid");
// 	}
//   },
//   get_body:function(){
// 	  
// 			var page = Pages.findOne({_id:Session.get("pageid")});
// // 		}
// 		if (page.body) {
// // 			console.log(page.body);
// 		}
// 		return page.body;
// 	}
// });
Template.pageItem.helpers({
	activePage:function(){
// 		console.log(Session.get("pageid"));
// 		console.log(Session.get("cyoaid"));
// 		if (Session.get("pageid") == "none") {
// 			console.log(Pages.find({cyoaid:Session.get("cyoaid"), parentid:Session.get("pageid")}).fetch().length);
// 			var page = Pages.findOne({cyoaid:Session.get("cyoaid"), parentid:Session.get("pageid")});
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
		if (this.parentid != "none") {
// 			console.log("this.parentid != none");
			return true;
		} else {
// 			console.log("this.parentid == none");
			return false;
		}
	},
});

Template.choiseList.helpers({
	choicePages:function(){
// 		console.log(Session.get("pageid"));
// 		console.log(Session.get("cyoaid"));
		var pages = Pages.find({cyoaid:Session.get("cyoaid"), parentid:Session.get("pageid")});
// 		console.log(pages);
		return pages;
	},
	readyORnot:function(){
// 		console.log("readyORnot");
// 		console.log(this._id);
		var page = Pages.findOne({_id:this._id});
		if(page.body) {
// 			console.log("css-page-choise-ready");
			return "css-page-choise-ready";
		} else {
// 			console.log("css-page-choise-not-ready");
			return "css-page-choise-not-ready";
		}
	}
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
		var page = Pages.findOne({_id:this._id});
		if(page.body) {
// 			console.log("css-page-choise-ready");
			return "css-page-choise-ready";
		} else {
// 			console.log("css-page-choise-not-ready");
			return "css-page-choise-not-ready";
		}
	}
});
Template.existingPageList.helpers({
	existingPages:function(){
		var pages = Pages.find({cyoaid:Session.get("cyoaid"), parentid:Session.get("pageid")}).fetch();
// 		console.log(pages);
		var unwantedSuggestions = [];
		for (var i = 0; i < pages.length;i++) {
			unwantedSuggestions.push(pages[i]._id);
		}
		unwantedSuggestions.push(Session.get("pageid"));
// 		console.log(unwantedSuggestions);
		return Pages.find({cyoaid:Session.get("cyoaid"), _id:{$nin: unwantedSuggestions}});
	},
	readyORnot:function(){
// 		console.log("readyORnot");
// 		console.log(this._id);
		var page = Pages.findOne({_id:this._id});
		if(page.body) {
// 			console.log("css-page-choise-ready");
			return "css-page-choise-ready";
		} else {
// 			console.log("css-page-choise-not-ready");
			return "css-page-choise-not-ready";
		}
	}
});
// Template.pageList.helpers({
// 	activePage:function(){
// 		return Pages.find({cyoaid:Session.get("cyoaid"), parentid:Session.get("pageid")});
// 	},
// });


Template.page_add_form.helpers({
  schema: function () {
    return new SimpleSchema({
      title: {
        type: String,
		label:"Title (*)",
        instructions: "Enter a title!"
      },
      body: {
        type: String,
		label:"Body (*)",
        instructions: "This is the main body of the new page",
		autoform: {
			rows: 5,
		},
      },
    });
  },
  action: function () {
    return function (els, callbacks, changed) {
// 		console.log("page_add_form Form data!", this);
// 		console.log("Page title!", this.title);
		var id = Meteor.call("addPage", this, Session.get("cyoaid"), Session.get("pageid"), function(err, res){
			if (!err){// all good
// 				console.log("event callback received id: "+res);
				Session.set("pageid", res);
				$("#page_add_form").modal('hide');
			}
		});
		callbacks.success(); // Display success message.
		callbacks.reset();   // Run each Element's custom `reset` function to clear the form.
    };
  }
});