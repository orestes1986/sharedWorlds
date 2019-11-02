////////
/// numParam	HELPERS
////////

Template.numParam_edit_form.helpers({
	numParam:function(){
// 		console.log("entered NumParam");
// 		console.log(NumParams.findOne({_id:Session.get("numParamid")}));
		return NumParams.findOne({_id:Session.get("numParamid")});
	},
	// find all visible data
	point_pool:function(){
// 		console.log("entered point pool");
// 		console.log(this);
// 		console.log(this.point_pool);
		if (this.point_pool) {
			return this.point_pool;
		}
	},
	// find all visible data
	num_data:function(){
// 		console.log("entered point pool");
// 		console.log(this);
// 		console.log(this.point_pool);
		if (this.data) {
			return this.data;
		}
	},
	is_its_page: function() {
// 		console.log("is_its_page");
// 		console.log(this);
// 		console.log(this.pageid);
// 		console.log(Session.get("pageid"));
		return (this.pageid == Session.get("pageid"));
	},
	has_body: function() {
// 		console.log("is_its_page");
// 		console.log(this);
// 		console.log(this.pageid);
// 		console.log(Session.get("pageid"));
		return (this.bodyid);
	},
	// find all visible data
	data:function(){
// 		console.log("entered data");
// 		console.log(this);
// 		console.log(this.data);
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
		return  'data.'+dataIndex+'.values.'+index+'.value';
	},
	exampleDoc: function () {
		return NumParams.findOne();
// 		console.log(this);
		return this;
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

Template.condition_select_numvalue.helpers({
	param:function(){
// 		console.log("entered numparam");
// 		console.log(CyoaParams.findOne({_id:Session.get("numParamid")}));
		return NumParams.findOne({_id:Session.get("numParamid")});
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
		return  'data.'+dataIndex+'.values.'+index+'.value';
	},
	is_its_page: function() {
		return (this.pageid == Session.get("pageid"));
	},
	page_name: function () {
// 		console.log(Pages.findOne({_id:this.pageid}));
		return Pages.findOne({_id:this.pageid}).title;
	},
	get_cyoaid: function() {
		return Session.get("cyoaid");
	},
});
