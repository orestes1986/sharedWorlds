// code that is shared between client and server, i.e. sent to both

// method definitions
Meteor.methods({
	addPageBody:function(pageid, time) {
		console.log("Entered  addPageBody");
		if (!this.userId){// not logged in
			return;
		} else {
			var page = Pages.findOne({_id: pageid});
			console.log("time before if");
			console.log(time);
			if (!time) {
				var time = 5*60*1000;
				if ((Meteor.pageBodyFunctions.isItConstant(page))&& !(Meteor.pageBodyFunctions.isItFirst(page))) {
					var pageBodies = PagesBodies.find ({pageid:page._id}, {sort:{createdOn: 1}}).fetch();
					time = pageBodies[0].time;
				}
			}
			console.log("time after if");
			console.log(time);
			if ((page) && (page.owner == this.userId)) {
// 				console.log(page._id);
// 				var addingBody = ({title:"A new body for this page", body: "",/* value: "dummy Value", */ pageid:page._id, owner:this.userId});
				var addingBody = ({texts: [{paragraphs:[{paragraph:""},]},], time:time, pageid:page._id, owner:this.userId, createdOn:new Date()});
				console.log(addingBody);
				var bodyid = PagesBodies.insert(addingBody);
				console.log(bodyid);
				Meteor.call("updateCyoa", page.cyoaid); // calling: ~/sharedworlds/shared/cyoamain.js - updateCyoa/~ //
// 				if (Meteor.isClient) {
// 					$("#param_add_form").modal('hide');
// 				}
				return bodyid;
			}
		}
	},
	// removing worlds
	removePageBody:function(bodyid){
		if (!this.userId){// not logged in
			return;
		} else {
			console.log("removePageBody method");
			console.log(bodyid);
			var realPageBody = PagesBodies.findOne({_id:bodyid, owner:this.userId});
			console.log(realPageBody);
			if ((realPageBody) && (realPageBody.owner == this.userId)) {
				var page = Pages.findOne({_id: realPageBody.pageid});
				var pageBodies = PagesBodies.find ({pageid:page._id}, {sort:{createdOn: 1}}).fetch();
				if (Meteor.pageBodyFunctions.isItConstant(page)) {
					if (Meteor.pageBodyFunctions.isItFirst(page)) {
						if (bodyid == pageBodies[0]._id) {
							console.log ("pageBodies");
							console.log (pageBodies);
							return;
						}
					} else {
						if (pageBodies.length < 2) {
							console.log ("pageBodies");
							console.log (pageBodies);
							return;
						}
					}
				}
				PagesBodies.remove({_id:bodyid});
				for (;;) {
					var repeatFlag = false;
					var realParam = CyoaParams.find({}).fetch();
					console.log(realParam);
					if (realParam){
						for (var params = 0; params < realParam.length; params++) {
							for (var datas = 0; datas < realParam[params].data.length; datas++) {
								for (var value = 0; value < realParam[params].data[datas].values.length; value++) {
									if (realParam[params].data[datas].values[value].bodyid == realPageBody._id) {
										Meteor.call("removeParamFieldValue", realParam[params]._id, datas, value); // calling: ~/sharedworlds/shared/paramvaluemain.js - removeParamFieldValue/~ //
										repeatFlag = true;
										console.log("true");
										break;
									}
						// 			console.log(param.data[dataIndex].values[i]);
								}
							}
						}
					}
					console.log("repeatFlag");
					console.log(repeatFlag);
					if (repeatFlag == false) {
						break;
					}
				}
				/////////////////////////////////////////
			}
		}
	},
	addPageBodyCondition:function(pageBodyid){
		if (!this.userId){// not logged in
			return;
		} else {
			console.log("Entered  addPageBodyCondition");
			console.log(pageBodyid);
			var realPageBody = PagesBodies.findOne({_id:pageBodyid, owner:this.userId});
	// 		console.log(realPageBody);
			if ((realPageBody) && (realPageBody.owner == this.userId)){
				var page = Pages.findOne({_id: realPageBody.pageid});
				var cyoa = Cyoas.findOne({_id: page.cyoaid});
	// 			var conditionsIndex = 0;
				var condition = { operation:"AND", paramid:"none", paramIndex:"0", operator:"equal", paramValueIndex:"0" };
				if (realPageBody.conditions) {
					console.log("realPageBody.conditions");
	// 				console.log(realPageBody.conditions);
	// 				console.log(realPageBody.conditions.length);
					if (realPageBody.conditions.length == 0) {
	// 					console.log("realPageBody.conditions.length");
	// 					console.log(realPageBody.conditions.length);
	// 					conditionsIndex = Object.keys(realPageBody.conditions).length;
						condition.operation = "None";
					}
					PagesBodies.update({_id:pageBodyid}, { $push:{ conditions: condition }});
				} else {
					condition.operation = "None";
					PagesBodies.update({_id:pageBodyid}, { $set:{ conditions: [condition] }});
				}
				Meteor.call("updateCyoa", cyoa); // calling: ~/sharedworlds/shared/cyoamain.js - updateCyoa/~ //
			}
		}
		
	},
	updatePageBodyCondition:function(pageBodyid, condition){
		if (!this.userId){// not logged in
			return;
		} else {
			console.log("Entered  updatePageBodyCondition");
			console.log(pageBodyid);
			console.log(condition);
			var realPageBody = PagesBodies.findOne({_id:pageBodyid, owner:this.userId});
	// 		console.log(realPageBody);
			if ((realPageBody) && (realPageBody.owner == this.userId)){
				var page = Pages.findOne({_id: realPageBody.pageid});
				var cyoa = Cyoas.findOne({_id: page.cyoaid});
				var setModifier = { $set: {} };
				setModifier.$set['conditions.' + condition.index] = { operation: condition.operation, paramid: condition.paramid, paramIndex:  condition.paramIndex, operator: condition.operator, numORnot: condition.numORnot, paramValueIndex: condition.paramValueIndex };
				PagesBodies.update({_id:pageBodyid}, setModifier);
				Meteor.call("updateCyoa", cyoa); // calling: ~/sharedworlds/shared/cyoamain.js - updateCyoa/~ //
			}
		}
	},
	removePageBodyCondition:function(pageBodyid, conditionIndex){
		if (!this.userId){// not logged in
			return;
		} else {
			console.log("Entered  removePageBodyCondition");
			console.log(pageBodyid);
			console.log(conditionIndex);
			var realPageBody = PagesBodies.findOne({_id:pageBodyid, owner:this.userId});
				if ((realPageBody) && (realPageBody.owner == this.userId)){
	// 			var page = Pages.findOne({_id: realPageBody.pageid});
	// 			var cyoa = Cyoas.findOne({_id: page.cyoaid});
	// 			delete realPageBody.conditions[conditionIndex];
				realPageBody.conditions.splice(conditionIndex, 1);
				if ((conditionIndex == 0) && (realPageBody.conditions) && (realPageBody.conditions.length > 0)){
					realPageBody.conditions[0].operation = "None";
				}
	// 			PagesBodies.remove({_id:pageBodyid});
				Meteor.call("updatePageBody", realPageBody); // calling: ~/sharedworlds/shared/pagebodiesmain.js - updatePageBody/~ //
					//
	// 			Meteor.call("updateCyoa", cyoa); // calling: ~/sharedworlds/shared/cyoamain.js - updateCyoa/~ //
			}
		}
	},
	updatePageBodyNumCondition:function(pageBodyid, condition){
		if (!this.userId){// not logged in
			return;
		} else {
			console.log("Entered  updatePageBodyNumCondition");
			console.log(pageBodyid);
			console.log(condition);
			var realPageBody = PagesBodies.findOne({_id:pageBodyid, owner:this.userId});
	// 		console.log(realPageBody);
			if ((realPageBody) && (realPageBody.owner == this.userId)){
				var page = Pages.findOne({_id: realPageBody.pageid});
				var cyoa = Cyoas.findOne({_id: page.cyoaid});
				var setModifier = { $set: {} };
				setModifier.$set['numconditions.' + condition.index] = { operation: condition.operation, paramid: condition.paramid, paramIndex:  condition.paramIndex, operator: condition.operator, paramValueIndex: condition.paramValueIndex };
				PagesBodies.update({_id:pageBodyid}, setModifier);
				Meteor.call("updateCyoa", cyoa); // calling: ~/sharedworlds/shared/cyoamain.js - updateCyoa/~ //
			}
		}
	},
	removePageBodyNumCondition:function(pageBodyid, conditionIndex){
		if (!this.userId){// not logged in
			return;
		} else {
			console.log("Entered  removePageBodyNumCondition");
			console.log(pageBodyid);
			console.log(conditionIndex);
			var realPageBody = PagesBodies.findOne({_id:pageBodyid, owner:this.userId});
				if ((realPageBody) && (realPageBody.owner == this.userId)){
	// 			var page = Pages.findOne({_id: realPageBody.pageid});
	// 			var cyoa = Cyoas.findOne({_id: page.cyoaid});
	// 			delete realPageBody.conditions[conditionIndex];
				realPageBody.conditions.splice(conditionIndex, 1);
				if ((conditionIndex == 0) && (realPageBody.conditions) && (realPageBody.conditions.length > 0)){
					realPageBody.numconditions[0].operation = "None";
				}
	// 			PagesBodies.remove({_id:pageBodyid});
				Meteor.call("updatePageBody", realPageBody); // calling: ~/sharedworlds/shared/pagebodiesmain.js - updatePageBody/~ //
					//
	// 			Meteor.call("updateCyoa", cyoa); // calling: ~/sharedworlds/shared/cyoamain.js - updateCyoa/~ //
			}
		}
	},
	updatePageBody:function(pageBody) {
		if (!this.userId){// not logged in
			return;
		} else {
			console.log("Entered  updatePageBody");
			var realPageBody = PagesBodies.findOne({_id:pageBody._id, owner:this.userId});
			if ((realPageBody) && (realPageBody.owner == this.userId)){
				var page = Pages.findOne({_id: realPageBody.pageid});
				var cyoa = Cyoas.findOne({_id: page.cyoaid});
	// 				var updatingPage = ({title:page.title, parentid:page.parentid, cyoaid:page.cyoaid, owner:this.userId});
				PagesBodies.update({_id: pageBody._id}, {$set:/*{title:page.title, conditions:*/pageBody/*.conditions, cyoaid:page.cyoaid}*/});
				Meteor.call("updateCyoa", cyoa); // calling: ~/sharedworlds/shared/cyoamain.js - updateCyoa/~ //
			}
		}
	},
	removePageBodyChoice:function(pageBodyid, pageBodyChoiceid){
		if (!this.userId){// not logged in
			return;
		} else {
			console.log("Entered  removePageBodyChoice");
			console.log(pageBodyid);
			var realPageBody = PagesBodies.findOne({_id:pageBodyid, owner:this.userId});
			if ((realPageBody) && (realPageBody.owner == this.userId)){
				var pageChoiceToremove = Pages.findOne({_id:pageBodyChoiceid});
				console.log(pageChoiceToremove)
				var index = 0;
				for (var  i = 0; i < pageChoiceToremove.parent.length; i++) {
					if (pageChoiceToremove.parent[i].parentid == pageBodyid) {
						pageChoiceToremove.parent.splice(i, 1);
						Meteor.call("updatePage", pageChoiceToremove);
						return; // calling: ~/sharedworlds/shared/pagemain.js - updatePage/~ //
					//
					}
				}
			}
		}
	},
})
