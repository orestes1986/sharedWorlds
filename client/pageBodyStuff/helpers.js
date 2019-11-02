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
	numparam: function() {
// 		console.log("param condition_select_form: ");
// 		console.log(this);
// 		console.log(values);
		return NumParams.find({cyoaid:Session.get("cyoaid")});
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
		console.log("paramName: ");
		console.log(this);
		console.log(this.numORnot);
        if (this.numORnot == true) {
            var param = NumParams.findOne({_id:this.paramid});
			console.log("param");
        } else {
            var param = CyoaParams.findOne({_id:this.paramid});
			console.log("numparam");
        }
		if (param) {
			console.log(param);
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
        var remain = this.time;
        var millenia = Math.trunc(remain / (1000*60*60*24*365*1000));
        remain = remain - (millenia * 1000*60*60*24*365*1000);
        var centuries = Math.trunc(remain / (1000*60*60*24*365*100));
        remain = remain - (centuries * 1000*60*60*24*365*100);
        var decades = Math.trunc(remain / (1000*60*60*24*365*10));
        remain -= (decades * 1000*60*60*24*365*10);
        var years = Math.trunc(remain / (1000*60*60*24*365));
        remain -= (years * 1000*60*60*24*365);
        var months = Math.trunc(remain / (1000*60*60*24*30));
        remain -= (months * 1000*60*60*24*30);
        var weeks = Math.trunc(remain / (1000*60*60*24*7));
        remain -= (weeks * 1000*60*60*24*7);
        var days = Math.trunc(remain / (1000*60*60*24));
        remain -= (days * 1000*60*60*24);
        var hrs = Math.trunc(remain / (1000*60*60));
        remain -= (hrs * 1000*60*60);
        var mins = Math.trunc(remain / (1000*60));
        remain -= (mins * 1000*60);
        var secs = Math.trunc(remain / (1000));
        remain -= (secs * 1000);

		timeToReturn = {
			bodyid: bodyid,
			overall: this.time,
			miliseconds: remain,
			seconds: secs,
			minutes: mins,
			hours: hrs,
			days: days,
			weeks: weeks,
			months: months,
			years: years,
			decades: decades,
			centuries: centuries,
            millenia: millenia
		};
//         var date = new Date(s);
// 		console.log("get_time");
// 		console.log(date);
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
