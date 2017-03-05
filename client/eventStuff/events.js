////////
/// Event EVENTS
////////

Template.addCyoa.events({
	'click .js-show-cyoa-form':function(event){
// 		console.log("showing the modal...");
		$("#cyoa_add_form").modal('show');
	},
});
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
ReactiveForms.createFormBlock({
  template: 'basicFormBlock',
  submitType: 'normal'
});

ReactiveForms.createElement({
  template: 'basicInput',
  validationEvent: 'keyup',
  reset: function (el) {
    $(el).val('');
  }
});
//////////////////////////////////////////////////////////////////////////
Template.cyoa_add_form.helpers({
  schema: function () {
    return new SimpleSchema({
      title: {
        type: String,
		label:"Title (*)",
        instructions: "Enter a title!"
      },
      url: {
        type: String,
		label:"URL (optional)",
        instructions: "Fill this if you are connecting an external document",
		optional: true,
      },
    });
  },
  action: function () {
    return function (els, callbacks, changed) {
// 		console.log("cyoa_add_form Action running!");
		console.log("cyoa_add_form Form data!", this);
		console.log("Cyoa title!", this.title);
// 		if (this.url) {
// 			console.log("Cyoa URL!", this.url);
// 			var id = Meteor.call("addEventCYOA", this, Session.get("eventid"), function(err, res){
// 				if (!err){// all good
// 					console.log("event callback received id: "+res);
// 					Session.set("cyoaid", res);
// 				}
// 			});
// 		} else {
// 			console.log("URL didn't given!");
// 			var id = Meteor.call("addCyoa", this, Session.get("eventid"), function(err, res){
// 				if (!err){// all good
// 					console.log("event callback received id: "+res);
// 					Session.set("cyoaid", res);
// 				}
// 			});
			var id = Meteor.call("addCyoa", this, Session.get("eventid"), function(err, res){
				if (!err){// all good
					console.log("event callback received id: "+res);
					Session.set("cyoaid", res);
				}
			});
// 		}
		callbacks.success(); // Display success message.
		callbacks.reset();   // Run each Element's custom `reset` function to clear the form.
		$("#cyoa_add_form").modal('hide');
    };
  }
});