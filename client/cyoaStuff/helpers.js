////////
/// cyoa	HELPERS
////////

Template.param_add_form.helpers({
	cyoa_id:function() {
		return Session.get("cyoaid");
	},
});
Template.paramlist.helpers({
	// find all visible params
	param:function(){
		return CyoaParams.find({cyoaid:Session.get("cyoaid")});
	},
});
Template.cyoaList.helpers({
	// find all visible cyoas
	cyoas:function(){
		return Cyoas.find({eventid:Session.get("eventid")});
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
// 		console.log("entered values");
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
		return  'data.'+dataIndex+'.values.'+index;
	},
	exampleDoc: function () {
		return CyoaParams.findOne();
// 		console.log(this);
		return this;
	},
});
Template.cyoaMeta.helpers({
	// find all visible adventures
	adventures:function(){
// 			console.log("cyoaid");
// 			console.log(Session.get("cyoaid"));
		if (Session.get("cyoaid")) {
			var cyoa = Cyoas.findOne({_id:Session.get("cyoaid")});
			if (cyoa) {
// 				console.log(cyoa);
				return cyoa;
			}
		}
		return;
	},
	// find current world
	activeWorld:function(){
// 		console.log("worldid");
// 		console.log(Session.get("worldid"));
		return Worlds.findOne({_id:Session.get("worldid")});
	},
	ownerUserName : function() {
// 		console.log("ownerUserName");
// 		console.log(this.owner);
// 		console.log(Meteor.users.findOne({_id:this.owner}));
		return Meteor.users.findOne({_id:this.owner}).username;
	},
});
Template.cyoaItem.helpers({
});
Template.cyoaParams.helpers({
	// find all visible docs
	params:function(){
		return CyoaParams.find({eventid:Session.get("cyoaid")});
	},
});
// Template.cyoaItem.helpers({
// 	// find all visible docs
// 	pages:function(){
// 		return Pages.find({cyoaid:Session.get("cyoaid")});
// 	},
// });