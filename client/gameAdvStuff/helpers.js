////////
/// gameAdvs	HELPERS
////////

Template.gamePageItem.rendered = function() {
// 	console.log("gamePageItem.rendered");
	Meteor.call("addingParamsToGameAdv", Session.get("playerid"), Session.get("gameid"), Session.get("bodyid"));
};
Template.gameAdvList.helpers({
	// find all visible cyoas
	games:function(){
		var games = GameAdvs.find({cyoaid:Session.get("cyoaid")}).fetch();
		if (games) {
// 			console.log("games!!!!!!!");
// 			console.log(games);
			var gameids = [];
			for (var i = 0; i < games.length; i++) {
				gameids.push(games[i]._id);
			}
			var players = Players.find( {gameid:{$in:gameids}, playerid: Meteor.userId()}, {gameid:1}).fetch();
// 			console.log("players!!!!!");
// 			console.log(players);
			var playersGameids = [];
			for (var i = 0; i < players.length; i++) {
				playersGameids.push(players[i].gameid);
			}
			return GameAdvs.find( {_id:{$in:playersGameids}}, {gameid:1});
		}
	},
});
Template.gameAdvMeta.helpers({
	// find current world
	activeWorld:function(){
// 		console.log("activeWorld");
		return Worlds.findOne({_id:Session.get("worldid")});
	},
	ownerUserName : function() {
// 		console.log("ownerUserName");
		return Meteor.users.findOne({_id:this.owner}).username;
	},
});
Template.gameAdvItem.helpers({
	gameAdv:function(){
// 		console.log("gameAdvItem gameAdv");
		return GameAdvs.findOne( { _id:Session.get("gameid") } );
	},
});
Template.gameParamlist.helpers({
	params: function(){
// 		console.log("gameParamlist params");
// 		console.log(this);
		if (this.param) {
			var paramsToReturn = [];
			for (var i = 0; i < this.param.length; i++) {
				var paramFlag = false;
				for (var j = 0; j < paramsToReturn.length; j++) {
					if (paramsToReturn[j].paramid == this.param[i].paramid) {
						paramFlag = true;
					}
				}
				if (paramFlag == false) {
					paramsToReturn.push(this.param[i]);
				}
			}
// 			console.log("gameParamlist params");
// 			console.log(this.param);
// 			console.log(paramsToReturn);
			return paramsToReturn;
		}
	},
	param: function(){
// 		console.log("gameParamlist param");
// 		console.log(this);
		var param = CyoaParams.findOne( { _id:this.paramid } );
// 		console.log("param 123123 12132");
// 		console.log(param);
// 		var paramToReturn = {
// 			this.data[this.paramIndex].name
// 		}
		return param;
	},
	numParams: function(){
// 		console.log("gameParamlist params");
// 		console.log(this);
		if (this.numParam) {
			var numParamsToReturn = [];
			for (var i = 0; i < this.numParam.length; i++) {
				var paramFlag = false;
				for (var j = 0; j < numParamsToReturn.length; j++) {
					if (numParamsToReturn[j].numParamid == this.numParam[i].numParamid) {
						paramFlag = true;
					}
				}
				if (paramFlag == false) {
					numParamsToReturn.push(this.numParam[i]);
				}
			}
			return numParamsToReturn;
		}
	},
	numParam: function(){
// 		console.log("gameParamlist param");
// 		console.log(this);
		var numParam = NumParams.findOne( { _id:this.numParamid } );
// 		console.log("param 123123 12132");
// 		console.log(param);
// 		var paramToReturn = {
// 			this.data[this.paramIndex].name
// 		}
		return numParam;
	},
});
Template.gameParamItem.helpers({
	params: function() {
// 		console.log("gameParamItem param");
// 		console.log(this); // a player
// 		console.log(Session.get("paramid")); // id for the requested param
		var param = CyoaParams.findOne({_id: Session.get("paramid")}); // the param
// 		console.log(param);
		var returningObj = [];
		if (this.param) {
			if (this.param.length > 0) {
				for (var i = 0; i < this.param.length; i++) {
					if (Session.get("paramid") == this.param[i].paramid) {
						{
// 							console.log(param.data);
// 							console.log(this.param[i]);
// 							console.log(this.param[i].paramIndex);
// 							console.log(param.data[this.param[i].paramIndex]);
// 							console.log(param.data[this.param[i].paramIndex].name);
// 							console.log(param.data[this.param[i].paramIndex].values[this.param[i].paramValueIndex].value);
							returningObj.push({
								name: param.data[this.param[i].paramIndex].name,
								value: param.data[this.param[i].paramIndex].values[this.param[i].paramValueIndex].value
							});
// 							console.log(param[i].data);
						}
					}
				}
			}
		}
		return returningObj; // Players.findOne( { _id:Session.get("playerid") } );
	},
	numParams: function() {
		var numParam = NumParams.findOne({_id: Session.get("numParamid")}); // the numParam
		var returningObj = [];
		if (this.numParam) {
			if (this.numParam.length > 0) {
				for (var i = 0; i < this.numParam.length; i++) {
					if (Session.get("numParamid") == this.numParam[i].numParamid) {
						{
							returningObj.push({
								name: numParam.data[this.numParam[i].paramIndex].name,
								value: numParam.data[this.numParam[i].paramIndex].values[this.numParam[i].paramValueIndex].value
							});
						}
					}
				}
			}
		}
		return returningObj;
	},
});
Template.gamePageItem.helpers({
	player:function(){
// 		console.log("gamePageItem player");
		return Players.findOne( { _id:Session.get("playerid") } );
	},
	hasParams:function(){
		return (this.param);
// 		return Players.findOne( { _id:Session.get("playerid") } );
	},
	hasNumParams:function(){
		return (this.numParam);
// 		return Players.findOne( { _id:Session.get("playerid") } );
	},
	choices:function() {
// 		console.log("gamePageItem choices");
// 		console.log(this);
		var choicesToReturn = [];
		var pages = Pages.find( {cyoaid:Session.get("cyoaid"), "parent": { $elemMatch: { "parentid": this._id } } } ).fetch();
// 			console.log("pages");
// 			console.log(pages);
// 			console.log(pages.length);
		for (var p = 0; p < pages.length; p++) {
// 			console.log("pages " + p);
			var notReadyFlag = false;
			var pageBodies = PagesBodies.find({pageid:pages[p]._id}).fetch();
// 				console.log("pageBodies");
// 				console.log(pageBodies);
			if ((pageBodies) && (pageBodies.length > 0)){
				returnToBodies:
				for (var i = 0; i < pageBodies.length; i++) {
					for (var j = 0; j < pageBodies[i].texts.length; j++) {
						for (var k = 0; k < pageBodies[i].texts[j].paragraphs.length; k++) {
		// 					console.log("pageBodies " + i);
		// 					console.log(pageBodies[i].body);
							if ((pageBodies[i].texts[j].paragraphs[k].paragraph == "") || (!pageBodies[i].texts[j].paragraphs[k].paragraph)) {
								notReadyFlag = true;
								break returnToBodies;
							} else {
		// 						console.log("css-page-choise-ready");
		// 						console.log(pages[p]);
								choicesToReturn.push(pages[p]);
								break returnToBodies;
							}
						}
					}
				}
				if (notReadyFlag) {
	// 				console.log("css-page-choise-not-ready");
// 					return "css-page-choise-not-ready";
				} else {
// 					console.log("css-page-choise-ready");
// 					console.log(pages[p]);
// 					choicesToReturn.push(pages[p]);
// 					return "css-page-choise-ready";
				}
			} else {
	// 			console.log("pageBodies do not exist");
// 				return "css-page-choise-not-ready";
			}
		}
// 		if (this.param) {
// 			console.log(this.param);
// 			return this.param;
// 		}
// 		console.log("choicesToReturn");
// 		console.log(choicesToReturn);
		return choicesToReturn;
	},
	get_time: function(){
// 		console.log("get_time");
// 		console.log(new Date(parseInt(this.time)));
		return new Date(parseInt(this.time));
	},
	get_choice_value: function(bodyid){
// 		console.log("get_choise_value");
// 		console.log(this);
// 		console.log(bodyid);
		for (var i = 0; i < this.parent.length; i++) {
			if (this.parent[i].parentid == bodyid) {
// 				console.log(this.parent[i].choiceValue);
// 				console.log(this);
// 				console.log(Session.get("bodyid"));
				return  this.parent[i].choiceValue;
			}
		}
	},
	get_texts:function(){
// 		console.log(this);
		return this.texts[0].paragraphs[0].paragraph;
	},
	pageBody:function(){
// 		console.log("gamePageItem pageBody");
// 		console.log(this);
// 		var trueConditions = [];
// 		var player = Players.findOne( { _id:Session.get("playerid") } );
		var body = PagesBodies.findOne({_id:this.bodyid});
// 		console.log(body);
		return body;/*
// 		var pageBodies = PagesBodies.find({pageid:this.pageid}, {sort:{createdOn: 1}}).fetch();
// 		if (player.param) {
// 			if (pageBodies.length > 1) {
// 				for (var i = 1; i < pageBodies.length; i++) {
// 					if (pageBodies[i].conditions) {
// 						var repeatFlag = true;
// 						for (var j = 0; j < pageBodies[i].conditions.length; j++) {
// 							if (repeatFlag == true) {
// 								repeatFlag = false;
// 								for (var p = 0; p < player.param.length; p++) {
// 									if ((player.param.paramid == pageBodies[i].conditions[j].paramid) && (player.param.paramIndex == pageBodies[i].conditions[j].paramIndex) && (player.param.paramValueIndex == pageBodies[i].conditions[j].paramValueIndex)) {
// 										repeatFlag = true;
// 										break;
// 									}
// 								}
// 							} else {
// 								break;
// 							}
// 							if (repeatFlag == true) {
// 								trueConditions.push(i);
// 							}
// 						}
// 					}
// 				}
// 				if (trueConditions.length > 0) {
// 					if (trueConditions.length > 1) {
// 						for (var i = 0; i < trueConditions.length; i++) {
// 							for (var j = 0; j < trueConditions.length; j++) {
// 								if (i > j) {
// 									if (pageBodies[trueConditions[i]].conditions.length > pageBodies[trueConditions[j]].conditions.length) {
// 										var tmpcondition = trueConditions[j];
// 										trueConditions[j] = trueConditions[i];
// 										trueConditions[i] = tmpcondition;
// 									}
// 								}
// 							}
// 						}
// 					}
// // 					console.log("pageBodies[trueConditions[0]]._id");
// // 					console.log(pageBodies);
// // 					console.log(trueConditions);
// // 					console.log(pageBodies[trueConditions[0]]);
// // 					console.log(pageBodies[trueConditions[0]]._id);
// 					Session.set("bodyid", pageBodies[trueConditions[0]]._id);
// 					return pageBodies[trueConditions[0]];
// 				}
// 			}
// 		}
// // 		console.log("pageBodies[0]._id");
// // 		console.log(pageBodies[0]._id);
// 		Session.set("bodyid", pageBodies[0]._id);
// 		return pageBodies[0];
*/	},
});
Template.interuptionBody.helpers({
	interruption:function() {
// 		console.log("interuptionBody interruption");

		Meteor.call("getInterruptions", this, Session.get("playerid"), Session.get("cyoaid"), function(error, result) {
			if(!error){
		// 		addingParamsToGameAdv:function(playerid, gameid, pageid, bodyid){
// 				console.log("interruptions");
// 				console.log(result);
				if (result) {
					for (var i = 0; i < result.length; i++) {
						Meteor.call("addingParamsToGameAdv", Session.get("playerid"), Session.get("gameid"), result[i]._id);
					}
// 					console.log("Entered interruption");
// 					console.log(result);
					returningStuff = result;
					Session.set('interruptions', result);
					return result;
				}
		// 		return Players.findOne( { _id:Session.get("playerid") } );
			}
		});
		return Session.get('interruptions');
	},
	not_first_page:function(){
// 		console.log("not_first_page 00");
// 		console.log(this);
		var page = Pages.findOne({_id:this.pageid});
// 		console.log(page);
		for (var j = 0; j < page.parent.length; j++) {
// 			console.log(page.parent[j]);
			if(page.parent[j].choiceValue == "First Page"){
//				console.log("Found the first page" + i);
				return false;
//				console.log("Removed the first page" + i);
			}
		}
		return true;
	},
	get_texts:function(){
// 		console.log("Entered interruption get_texts");
// 		console.log(this);
		return this.texts[0].paragraphs[0].paragraph;
	},
	get_choice_value: function(bodyid){
// 		console.log("get_choise_value");
// 		console.log(this);
// 		console.log(bodyid);
		for (var i = 0; i < this.parent.length; i++) {
			if (this.parent[i].parentid == bodyid) {
// 				console.log(this.parent[i].choiceValue);
// 				console.log(this);
// 				console.log(Session.get("bodyid"));
				return  this.parent[i].choiceValue;
			}
		}
	},
	interuptChoices: function() {
// 		console.log("gamePageItem choices");
// 		console.log(this);
		var choicesToReturn = [];
		var pages = Pages.find( {cyoaid:Session.get("cyoaid"), "parent": { $elemMatch: { "parentid": this._id } } } ).fetch();
// 			console.log("pages");
// 			console.log(pages);
// 			console.log(pages.length);
		for (var p = 0; p < pages.length; p++) {
// 			console.log("pages " + p);
			var notReadyFlag = false;
			var pageBodies = PagesBodies.find({pageid:pages[p]._id}).fetch();
// 				console.log("pageBodies");
// 				console.log(pageBodies);
			if ((pageBodies) && (pageBodies.length > 0)){
				for (var i = 0; i < pageBodies.length; i++) {
// 				console.log("pageBodies " + i);
// 				console.log(pageBodies[i].body);
					
					for (var j = 0; j < pageBodies[i].texts.length; j++) {
						for (var k = 0; k < pageBodies[i].texts[j].paragraphs.length; k++) {
	// 					console.log(pageBodies[i]);
	// 					console.log(pageBodies[i].texts[j]);
	// 					console.log(pageBodies[i].texts[j].paragraphs[k]);
	// 					console.log(pageBodies[i].texts[j].paragraphs[k].paragraph);
							if ((pageBodies[i].texts[j].paragraphs[k].paragraph == "") || (!pageBodies[i].texts[j].paragraphs[k].paragraph)) {
								notReadyFlag = true;
								break;
							} else {
// 								console.log("css-page-choise-ready");
// 								console.log(pages[p]);
								choicesToReturn.push(pages[p]);
								break;
							}
							
							
						}
					}
				}
				if (notReadyFlag) {
	// 				console.log("css-page-choise-not-ready");
// 					return "css-page-choise-not-ready";
				} else {
// 					console.log("css-page-choise-ready");
// 					console.log(pages[p]);
// 					choicesToReturn.push(pages[p]);
// 					return "css-page-choise-ready";
				}
			} else {
	// 			console.log("pageBodies do not exist");
// 				return "css-page-choise-not-ready";
			}
		}
// 		if (this.param) {
// 			console.log(this.param);
// 			return this.param;
// 		}
// 		console.log("choicesToReturn");
// 		console.log(choicesToReturn);
		return choicesToReturn;
	},
});
