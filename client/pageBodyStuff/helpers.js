////////
/// page body	HELPERS
////////

Template.condition_select_form.helpers({
	param: function() {
// 		console.log("param condition_select_form: ");
// 		console.log(this);
// 		console.log(values);
		return CyoaParams.find({cyoaid:Session.get("cyoaid")});
// 		return [];//"the selected value will appear here";
	},
});
Template.conditionList.helpers({
	isFirst: function(index) {
// 	  console.log("conditionList isFirst: ");
// 	  console.log(this);
		if (index == 0) {
			return true;
		}
	},
  condition: function() {
// 	  console.log("conditionList conditions: ");
// 	  console.log(this);
	  var conditions = [];
		if (this.conditions) {
			return this.conditions;
		}
	},
	select: function(values) {
// 		console.log("select get_index: ");
// 		console.log(this);
// 		console.log(values);
		if(values.hash.option == values.hash.optionValue){
		  return "selected";
		}
	},
	paramName: function() {
// 		console.log("paramName: ");
// 		console.log(this);
		var param = CyoaParams.findOne({_id:this.paramid});
		if (param) {
// 			console.log(param);
			if (param.data) {
				if (param.data[this.paramIndex]) {
					if (param.data[this.paramIndex].name) {
						return param.data[this.paramIndex].name;
					}
				}
			}
		}
// 		console.log(values);
		return "Select parameter";
	},
	paramValue: function() {
// 		console.log("paramValue: ");
// 		console.log(this);
		var param = CyoaParams.findOne({_id:this.paramid});
		if (param) {
// 			console.log(param);
			if (param.data) {
				if (param.data[this.paramIndex]) {
					if (param.data[this.paramIndex].values) {
						if (param.data[this.paramIndex].values[this.paramValueIndex]) {
							if (param.data[this.paramIndex].values[this.paramValueIndex].value) {
								return param.data[this.paramIndex].values[this.paramValueIndex].value;
							}
						}
					}
				}
			}
		}
		return "the selected value will appear here";
	},
});
Template.bodyEditor.helpers({
	// find all visible data
	texts:function(){
// 		console.log("entered texts");
// 		console.log(this);
		if (this.texts) {
			return this.texts;
		}
	},
	// find all visible values
	paragraphs:function(dataValue){
// 		console.log("entered values");
// 		console.log(index);
// 		console.log(this);
		if (this.paragraphs) {
// 			console.log(this.values);
			return this.paragraphs;
		}
	},
	get_paragraph: function(textsindex, index){
// 		console.log("get_paragraph");
// 		console.log(this._id);
// 		console.log(this);
// 		console.log(bodyIndex);
// 		console.log(index);
// 		console.log('data.'+bodyIndex+'.values.'+index);
		return  'texts.'+textsindex+'.paragraphs.'+index+'.paragraph';
	},
	get_body: function(textsindex){
// 		console.log("get_name");
		return  'texts.' + textsindex + '.name';
	},
	get_time: function(bodyid) {
		timeToReturn = {
			bodyid: bodyid,
			overall: this.time,
			seconds: '',
			minutes: '',
			hours: '',
			days: '',
			weeks: '',
			months: '',
			years: '',
			decades: '',
			centuries: '',
		};
		var time = this.time;
// 		console.log("get_time");
		console.log("get_time");
		console.log(this);
		var page = Pages.findOne({_id: this.pageid});
		var pageBodies = PagesBodies.find ({pageid:page._id}, {sort:{createdOn: 1}}).fetch();
		if (Meteor.pageBodyFunctions.isItConstant(page)) {
// 			var constantflag = true;
// 			if (Meteor.pageBodyFunctions.isItFirst(page)) {
// 				console.log("ConstantFlag is true");
// 				if (!(this._id == pageBodies[0]._id)) {
// 					constantflag = false;
// 				}
// 			}
// 		}
// 		if (constantflag) {
			return {
				wholeDate: new Date(parseInt(this.time)),
			};
		}
		var timeToCheck = 100*365*24*60*60*1000;
		if (time > timeToCheck) {
			timeToReturn.centuries = Math.trunc(time/timeToCheck);
			time -= Math.trunc(time/timeToCheck) * timeToCheck;
		}
		timeToCheck = 10*365*24*60*60*1000;
		if (time > timeToCheck) {
			timeToReturn.decades = Math.trunc(time/timeToCheck);
			time -= Math.trunc(time/timeToCheck) * timeToCheck;
		}
		timeToCheck = 365*24*60*60*1000;
		if (time > timeToCheck) {
			timeToReturn.years = Math.trunc(time/timeToCheck);
			time -= Math.trunc(time/timeToCheck) * timeToCheck;
		}
		timeToCheck = 30*24*60*60*1000;
		if (time > timeToCheck) {
			timeToReturn.months = Math.trunc(time/timeToCheck);
			time -= Math.trunc(time/timeToCheck) * timeToCheck;
		}
		timeToCheck = 7*24*60*60*1000;
		if (time > timeToCheck) {
			timeToReturn.weeks = Math.trunc(time/timeToCheck);
			time -= Math.trunc(time/timeToCheck) * timeToCheck;
		}
		timeToCheck = 24*60*60*1000;
		if (time > timeToCheck) {
			timeToReturn.days = Math.trunc(time/timeToCheck);
			time -= Math.trunc(time/timeToCheck) * timeToCheck;
		}
		timeToCheck = 60*60*1000;
		if (time > timeToCheck) {
			timeToReturn.hours = Math.trunc(time/timeToCheck);
			time -= Math.trunc(time/timeToCheck) * timeToCheck;
		}
		timeToCheck = 60*1000;
		if (time > timeToCheck) {
			timeToReturn.minutes = Math.trunc(time/timeToCheck);
			time -= Math.trunc(time/timeToCheck) * timeToCheck;
		}
		timeToCheck = 1000;
		if (time > timeToCheck) {
			timeToReturn.seconds = Math.trunc(time/timeToCheck);
			time -= Math.trunc(time/timeToCheck) * timeToCheck;
		}
// 		console.log(timeToReturn);
		return timeToReturn;
	},
	bodies : function() {
	// 	console.log(this._id);
	// 	console.log(PagesBodies.find({}).fetch());
	// 	console.log(PagesBodies.find({pageid:this._id}).fetch());
		//
	// 		return Worlds.find({}, {sort:{lastEdit: -1}, limit : Session.get("objLimit")});
	return PagesBodies.find({"pageid":this._id}, {sort:{createdOn: 1}}); // {
	// 	  textarea: true,
	//       removeEmpty: true,
	//       placeholder: "Post body for this page",
	//       substitute: '<i class="fa fa-pencil"></i>'
	//     }
	},
	get_content : function() {
	// 	  console.log(this.bodyid);
	return ""; // {
	// 	  textarea: true,
	//       removeEmpty: true,
	//       placeholder: "Post body for this page",
	//       substitute: '<i class="fa fa-pencil"></i>'
	//     }
	},
});

Template.condition_select_value.helpers({
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
// 		console.log(Pages.findOne({_id:this.pageid}));
		return Pages.findOne({_id:this.pageid}).title;
	},
	get_cyoaid: function() {
		return Session.get("cyoaid");
	},
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

Template.choiseList.helpers({
	choicePages:function(bodyid){
// 		console.log(bodyid);
// 		console.log(Session.get("pageid"));
// 		console.log(Session.get("cyoaid"));
		
		var pages = Pages.find( {cyoaid:Session.get("cyoaid"), "parent": { $elemMatch: { "parentid": bodyid } } } ).fetch();
// 		var pages = Pages.find({cyoaid:Session.get("cyoaid"), parentid:bodyid});
// 		console.log(pages);
		return pages;
	},
	// find all visible parent
	parent:function(bodyid){
// 		console.log("entered parent");
// 		console.log(this);
// 		console.log(bodyid);
// 		console.log(this.parent.length);
		var parentToreturn = [];
		if ((this.parent) && (this.parent.length)) {
			for (var i = 0; i < this.parent.length; i++) {
// 				console.log(i);
// 				console.log(this.parent[i]);
// 				console.log(this.parent[i].parentid);
// 				console.log(bodyid);
				if (this.parent[i].parentid == bodyid) {
					parentToreturn.push({
						choiceValue: this.parent[i].choiceValue,
						parentid: this.parent[i].parentid,
						index: i
					});
				}
			}
		}
// 		console.log(parentToreturn);
		return parentToreturn;
	},
	get_choise_value: function(parentIndex){
// 		console.log("get_choise_value");
// 		console.log(parentIndex);
		return  'parent.' + parentIndex + '.choiceValue';
	},
	readyORnot:function(){
// 		console.log("readyORnot");
// 		console.log(this._id);
// 		console.log(Session.get("pageid"));
		var notReadyFlag = false;
		var pageBodies = PagesBodies.find({pageid:this._id}).fetch();
// 		console.log(pageBodies);
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
});
Template.page_add_form.helpers({
	cyoa_id:function() {
		return Session.get("cyoaid");
	},
	parent_id:function() {
		return Session.get("bodyid");
	},
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
// 		console.log("page_add_form Action running!");
// 		console.log("page_add_form Form data!", this);
// 		console.log("Page title!", this.title);
		var pageToAdd = {
			title: this.title,
			cyoaid: Session.get("cyoaid"),
			parent: [{parentid: Session.get("bodyid"), choiceValue: this.title}],
		}
// 		this.cyoaid = Session.get("cyoaid");
// 		this.parent = [{parentid: Session.get("bodyid")}];
		console.log("pageToAdd");
		console.log(pageToAdd);
		console.log(this);
		var id = Meteor.call("addPage", pageToAdd, function(err, res){
			if (!err){// all good
// 				console.log("event callback received id: "+res);
				Session.set("cyoaid", res);
			}
		});
		console.log(id);
// 		}
		callbacks.success(); // Display success message.
		callbacks.reset();   // Run each Element's custom `reset` function to clear the form.
		$("#cyoa_add_form").modal('hide');
    };
  }
});