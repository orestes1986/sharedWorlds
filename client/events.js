////////
/// General EVENTS
////////

Template.navbar.events({
	// add doc button
	"click .js-add-doc":function(event){
		event.preventDefault();
		console.log("Add a new doc!");
		for (var i=0;i<10;i++){
			Meteor.call('testMethod', function(){
				console.log('testMethod returned');
			}); // calling: ~/sharedworlds/shared/?????????.js - ?????????/~ //
			console.log('after testMethod call');
		}
		if (!Meteor.user()){// user not available
				alert("You need to login first!");
		}
		else {
			// they are logged in... lets insert a doc
			var id = Meteor.call("addDoc", function(err, res){
				if (!err){// all good
					console.log("event callback received id: "+res);
					Session.set("docid", res);						
				}
			}); // calling: ~/sharedworlds/shared/?????????.js - ?????????/~ //
		}
	}//,
//	 // load doc button
//	 "click .js-load-doc":function(event){
//		 //console.log(this);
//		 Session.set("docid", this._id);
//	 }
})
