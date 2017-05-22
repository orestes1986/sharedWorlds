////////
/// param	HELPERS
////////

Template.param_add_form.helpers({
  schema: function () {
    return new SimpleSchema({
      title: {
        type: String,
		label:"Title (*)",
        instructions: "Enter a title!"
      },
    });
  },
  action: function () {
    return function (els, callbacks, changed) {
// 		console.log("cyoa_add_form Action running!");
// 		console.log("cyoa_add_form Form data!", this);
// 		console.log("Cyoa title!", this.title);
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
		this.cyoaid = Session.get("cyoaid");
		this.pageid = Session.get("pageid");
		this.owner = Meteor.user()._id;
			var id = Meteor.call("addParam", this, function(err, res){
				if (!err){// all good
// 					console.log("event callback received id: "+res);
					Session.set("cyoaid", res);
				}
			});
// 		}
		callbacks.success(); // Display success message.
		callbacks.reset();   // Run each Element's custom `reset` function to clear the form.
		$("#cyoa_add_form").modal('hide');
    };
  },
// 	cyoa_id:function() {
// 		return Session.get("cyoaid");
// 	},
// 	page_id:function() {
// 		return Session.get("pageid");
// 	},
// 	owner:function() {
// 		return Meteor.user()._id;
// 	},
});
Template.paramlist.helpers({
	// find all visible params
	param:function(){
		return CyoaParams.find({cyoaid:Session.get("cyoaid")});
	},
});

Template.param_edit_form.helpers({
	param:function(){
// 		console.log("entered param");
// 		console.log(CyoaParams.findOne({_id:Session.get("paramid")}));
		return CyoaParams.findOne({_id:Session.get("paramid")});
	},
	// find all visible data
	data:function(){
// 		console.log("entered data");
// 		console.log(this);
		if (this.data) {
			return this.data;
		}
	},
	// find all visible values
	values:function(dataValue){
// 		console.log("entered values");
// 		console.log(index);
// 		console.log(this);
		if (this.values) {
// 			console.log(this.values);
			return this.values;
		}
	},
	// find all visible values
	value:function(dataValue){
		console.log("entered values");
// 		console.log(index);
// 		console.log(this);
		if (this.data) {
// 			console.log(this.data);
// 			console.log(this.data.[0]);
// 			console.log(this.data[0]);
			var datum =  this.data[dataValue];
			if (datum.values) {
// 				console.log(datum.values);
	// 			console.log(this.values[0]);
				return datum.values;
			}
		}
	},
	get_name: function(dataIndex){
// 		console.log("get_name");
		return  'data.' + dataIndex + '.name';
	},
	get_value: function(dataIndex, index){
// 		console.log("get_value");
// 		console.log(dataIndex);
// 		console.log(index);
// 		console.log('data.'+dataIndex+'.values.'+index);
		return  'data.'+dataIndex+'.values.'+index+'.value';
	},
	exampleDoc: function () {
		return CyoaParams.findOne();
// 		console.log(this);
		return this;
	},
	is_its_page: function() {
		return (this.pageid == Session.get("pageid"));
	},
	page_name: function () {
		if (Pages.findOne({_id:this.pageid})) {
// 			console.log(Pages.findOne({_id:this.pageid}));
			return Pages.findOne({_id:this.pageid}).title;
		}
	},
	get_cyoaid: function() {
		return Session.get("cyoaid");
	},
});