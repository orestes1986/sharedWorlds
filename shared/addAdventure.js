// code to add a demo Adventure. 

Meteor.methods({
	addAdventure: function(userid, cyoaid) {
//	 create a starter doc if necessary
		var contacts = "Contacts";
		var friend = "Phil";
		var talked = "Talked";
		var conversed = "Conversed";
		var toreador = "Toreador";
		var hunter = "Hunter";
		var phoneAcquired = "Acquired phone number";
		var addressAcquired = "Acquired address";
		var meetingAgreement = "Agreed to a meeting";
		////////////////////////////////////////////////
		var title = "Main line 1 (prologue)";
// 		console.log("Adding " + title + " page");
		var parentids = [];
		parentids.push({parentid: "Constant", choiceValue:"private"});
		var addingPage = ({title:title, parent:parentids, cyoaid:cyoaid, owner:userid});
		var pageid = Pages.insert(addingPage);
// 		console.log(pageid);
		var paragraph = "<div>During a night out, a vampire kisses you, she is not able to control herself and drinks a lot, so she weakens you, but not so much as to kill you.</div>";
		var addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (1490229000000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		console.log("addingBodyyy");
		console.log(addingBody);
		var bodyid = PagesBodies.insert(addingBody);
		////////////////////////////////////////////////
		title = friend + " calls you";
// 		console.log("Adding " + title + " page");
		parentids = [];
		parentids.push({parentid: "Constant", choiceValue:"public"});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);
		paragraph = "<div>As this conversation ends, a second line rings, it is " + friend + ".</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (1490229000000 + (14.7*60*60*1000)), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		////////////////////////////////////////////////
		////////////////////////////////////////////////
		title = "First Page";
// 		console.log("Adding " + title + " page");
// 		parentids = [];
		parentids.push({parentid: "none", choiceValue:title}/*, {parentid: "Constant", choiceValue:"public"}*/);
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);
		paragraph = "<div>You wake up, the day has passed, you feel dizzy and cannot yet recall much of last night.</div><div>You realize that your phone is ringing and that is what woke you.</div>";
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (1490229000000 + (14.5*60*60*1000)), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		var addingParam = (
			{ title: contacts,
				data: [ 
					{ 
					name: friend,
					values: [
						{ value: phoneAcquired, pageid: pageid }
					]
					}
				], 
				cyoaid:cyoaid, owner:userid
			});
		var paramid = CyoaParams.insert(addingParam);
		////////////////////////////////////////////////
		////////////////////////////////////////////////
		title = "Go back to sleep";
// 		console.log("Adding " + title + " page");
		var parentpageid = Pages.findOne({title:"First Page"})._id;
		parentids = [];
		parentids.push({parentid: PagesBodies.findOne({pageid:parentpageid})._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);
		paragraph = "<div>After another 4 to 5 hours of sleep, you can't sleep any more, the night is no longer young and your phone's battery is dead.</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (5*60*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		////////////////////////////////////////////////
		title = "Wake up doing your waking routine";
// 		console.log("Adding " + title + " page");
		parentpageid = Pages.findOne({title:"Go back to sleep"})._id;
		parentids = [];
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);
		paragraph = "<div>You wake up, ignoring your phone, you wash yourself and when you look at the mirror, you realize that  you look terrible, your eyes look tired, your face is pale, it is as you somehow grow older overnight.</div><div>As you go to the kitchen, " + friend + " is bashing to your door.</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (10*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		////////////////////////////////////////////////
		title = "Wake up, you charge your phone";
// 		console.log("Adding " + title + " page");
		parentpageid = Pages.findOne({title:"Go back to sleep"})._id;
		parentids = [];
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);
		paragraph = "<div>You wake up, you put your phone to charge and you wait until it turns on before you get along with you waking routine. Once your phone is ready, you see that you have even more unanswered calls as well as some messages.</div><div>Before you give those a better look, " + friend + " is bashing to your door.</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (10*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		////////////////////////////////////////////////
		title = "Checking the phone";
// 		console.log("Adding " + title + " page");
		parentpageid = Pages.findOne({title:"First Page"})._id;
		parentids = [];
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);
		paragraph = "<div>You see your phone, you have several missed calls as well as a number of messages. most of the calls are from " + friend + ", a close friend of yours, but some are from an unknown number.</div><div>The messages are again mostly from " + friend + ", he is looking for you, but there is also one from another unknown number, different from the first one, the sender writes you that he needs to talk to you about something important, it says that you might be in danger.</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (5*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		////////////////////////////////////////////////
		title = "Wake up doing your morning routine";
// 		console.log("Adding " + title + " page");
		parentpageid = Pages.findOne({title:"Checking the phone"})._id;
		parentids = [];
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);
		paragraph = "<div>You wake up, ignoring your phone, you wash yourself and when you look at the mirror, you realize that  you look terrible, your eyes look tired, your face is pale, it is as you somehow grow older overnight.</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (10*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		////////////////////////////////////////////////
		title = "Contact the unknown number that was calling you";
// 		console.log("Adding " + title + " page");
		parentpageid = Pages.findOne({title:"Checking the phone"})._id;
		parentids = [];
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);
		paragraph = "<div>After some rings, it answers, a man talk to you from the other end. He calls you by your first name, he seems confident and easy. He tells you that you left soon last night and you didn't manage to finish what you started.</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (5*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		
		var realParam = CyoaParams.findOne({title: contacts});
		if (realParam){
// 			console.log("Adding Contact " + toreador);
			var dataIndex = realParam.data.length;
			var setModifier = { $set: {} };
			var value = {name: toreador, values:[{value: phoneAcquired, pageid:pageid}]};
			setModifier.$set['data.' + dataIndex ] = value;
			CyoaParams.update({_id:realParam._id}, setModifier);
		}
		////////////////////////////////////////////////
		title = "Tell the " + toreador + " you are not in a mood for conversation, especially with strangers, you just want to know who contacted you";
// 		console.log("Adding " + title + " page");
		parentpageid = Pages.findOne({title:"Contact the unknown number that was calling you"})._id;
		parentids = [];
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);
		paragraph = "<div>He tells you that you met last night at you talked for some time, he thinks he might have a job for you. You could call him again when you are in a better mood.</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (2*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		////////////////////////////////////////////////
		title = "Tell the " + toreador + " you don't remember much of last night";
// 		console.log("Adding " + title + " page");
		parentpageid = Pages.findOne({title:"Contact the unknown number that was calling you"})._id;
		parentids = [];
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);
		paragraph = "<div>He tells you that is a shame he had a very nice time and he thought you were enjoying it as well. He says that he wanted to talk to you about what you spoke last night, he thinks he might have a job for you.</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (2*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		////////////////////////////////////////////////
		title = "Ask him about this job";
// 		console.log("Adding " + title + " page");
		parentpageid = Pages.findOne({title:"Tell the " + toreador + " you don't remember much of last night"})._id;
		parentids = [];
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);
		paragraph = "<div>He says you should meet later and he will tell you all about it.</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (1*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		////////////////////////////////////////////////
		title = "Tell him you are not interested";
// 		console.log("Adding " + title + " page");
		parentpageid = Pages.findOne({title:"Tell the " + toreador + " you don't remember much of last night"})._id;
		parentids = [];
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		parentpageid = Pages.findOne({title:"Ask him about this job"})._id;
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);
		paragraph = "<div>He says it is a shame, he thought you wanted this, especially since you called him now. But it is not a big problem, if you change your mind, you know where to call him.</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (2*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		////////////////////////////////////////////////
		title = "Tell him you are interested";
// 		console.log("Adding " + title + " page");
		parentpageid = Pages.findOne({title:"Tell the " + toreador + " you don't remember much of last night"})._id;
		parentids = [];
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		parentpageid = Pages.findOne({title:"Ask him about this job"})._id;
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);
		paragraph = "<div>You agree to meet later, he gives you an address to go.</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (2*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		
		var realParam = CyoaParams.findOne({title: contacts});
		if (realParam){
// 			var dataIndex = 0;
			for (var i = 0; i < realParam.data.length; i++) {
				if (realParam.data[i].name == toreador) {
					var dataIndex = i;
				}
			}
			var valueIndex = Object.keys(realParam.data[dataIndex].values).length;
			var setModifier = { $set: {} };
			setModifier.$set['data.' + dataIndex + '.values.'+valueIndex] = {value: addressAcquired, pageid: pageid};
			CyoaParams.update({_id:realParam._id}, setModifier);
// 			return "Value added";
		}
		////////////////////////////////////////////////
		title = "Contact the unknown number that texted you";
// 		console.log("Adding " + title + " page");
		parentpageid = Pages.findOne({title:"Checking the phone"})._id;
		parentids = [];
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);
		paragraph = "<div>A man immediately answers, he tells you that he is glad you contacted him. He insists on telling you again and again that you might be in danger especially after last night. That you shouldn't contact any other unknown number might have contacted you, at least not before consulting him first and that you choose well that you called him.</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (5*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		
		var realParam = CyoaParams.findOne({title: contacts});
		if (realParam){
			var dataIndex = realParam.data.length;
			var setModifier = { $set: {} };
			var value = {name: hunter, values:[{value: phoneAcquired, pageid:pageid}]};
// 			console.log("Adding Contact " + hunter);
			setModifier.$set['data.' + dataIndex ] = value;
			CyoaParams.update({_id:realParam._id}, setModifier);
		}
		////////////////////////////////////////////////
		title = "Tell the " + hunter + " you don't remember much of last night";
// 		console.log("Adding " + title + " page");
		parentpageid = Pages.findOne({title:"Contact the unknown number that texted you"})._id;
		parentids = [];
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);
		paragraph = "<div>He tells you that this is not unusual in cases like this and it only confirms his fears. He says that you should meet him as soon as possible, but you should be careful.</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (2*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		////////////////////////////////////////////////
		title = "You thank him for his warning and agree to meet him";
// 		console.log("Adding " + title + " page");
		parentpageid = Pages.findOne({title:"Tell the " + hunter + " you don't remember much of last night"})._id;
		parentids = [];
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);
		paragraph = "<div>He tells that he will contact you again during the afternoon to tell you when and where to meet. For now, he tells you to be careful and if you leave your house, you better stay around the city center, but always in places that there are people.</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (2*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		
		var realParam = CyoaParams.findOne({title: contacts});
		if (realParam){
			var dataIndex = 0;
			for (var i = 0; i < realParam.data.length; i++) {
				if (realParam.data[i].name == hunter) {
					dataIndex = i;
				}
			}
			var valueIndex = Object.keys(realParam.data[dataIndex].values).length;
			var setModifier = { $set: {} };
			setModifier.$set['data.' + dataIndex + '.values.'+valueIndex] = {value: meetingAgreement, pageid: pageid};
			CyoaParams.update({_id:realParam._id}, setModifier);
// 			return "Value added";
		}
		////////////////////////////////////////////////
		title = "You thank him for his warning but deny to meet him";
// 		console.log("Adding " + title + " page");
		parentpageid = Pages.findOne({title:"Tell the " + hunter + " you don't remember much of last night"})._id;
		parentids = [];
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);


		paragraph = "<div>He tells you that you are making a mistake, he understands that the circumstances seem unusual, or even suspicious. Anyway, if you need him you could contact him, but he must warn you that if you contact him after a long while, then he might be suspicious and that is not personal.</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (2*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		////////////////////////////////////////////////
		title = "Wake up doing your morning routine";
// 		console.log("Adding " + title + " page");
		parentpageid = Pages.findOne({title:"First Page"})._id;
		parentids = [];
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);


		paragraph = "<div>You wake up, ignoring your phone, you wash yourself and when you look at the mirror, you realize that  you look terrible, your eyes look tired, your face is pale, it is as you somehow grow older overnight.</div><div>As you go to the kitchen, your phone rings once more.</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (10*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		////////////////////////////////////////////////
		title = "Call with " + friend;
// 		console.log("Adding " + title + " page");
		parentpageid = Pages.findOne({title:"Checking the phone"})._id;
		parentids = [];
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		parentpageid = Pages.findOne({title: friend + " calls you"})._id;
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);


		paragraph = "<div>He immediately starts yelling at you \"Where have you been, I was calling you all day, what happened to you\". After his burst he stops so you can reply.</div>";
		
		

		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (5*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		
		var realParam = CyoaParams.findOne({title: contacts});
		if (realParam){
			var dataIndex = 0;
			for (var i = 0; i < realParam.data.length; i++) {
				if (realParam.data[i].name == friend) {
					dataIndex = i;
				}
			}
			var valueIndex = Object.keys(realParam.data[dataIndex].values).length;
			var setModifier = { $set: {} };
			setModifier.$set['data.' + dataIndex + '.values.'+valueIndex] = {value: talked, pageid: pageid};
			CyoaParams.update({_id:realParam._id}, setModifier);
// 			return "Value added";
		}
		////////////////////////////////////////////////
		title = "Avoid conversation";
// 		console.log("Adding " + title + " page");
		parentpageid = Pages.findOne({title:"Call with " + friend})._id;
		parentids = [];
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);


		paragraph = "<div>You tell him that you are not in the mood, you are ok, but you don't wanna talk. He insists on asking what has happen to you.</div>";
		
		

		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (5*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		////////////////////////////////////////////////
		title = "Hang up";
// 		console.log("Adding " + title + " page");
		parentpageid = Pages.findOne({title:"Avoid conversation"})._id;
		parentids = [];
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);


		paragraph = "<div>You tell him that you are not in the mood right now and you hang up as he tries to insist on asking.</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (1*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		////////////////////////////////////////////////
		title = "Keep avoiding him";
// 		console.log("Adding " + title + " page");
		parentpageid = Pages.findOne({title:"Avoid conversation"})._id;
		parentids = [];
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);


		paragraph = "<div>As he insists, you keep on telling him that you really don't want to talk, you are all right and you will call him later. After a few minutes he stops and you hang up.</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (5*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		////////////////////////////////////////////////
		title = "Reply";
// 		console.log("Adding " + title + " page");
		parentpageid = Pages.findOne({title:"Avoid conversation"})._id;
		parentids = [];
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		parentpageid = Pages.findOne({title:"Call with " + friend})._id;
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
// 		parentid.push(PagesBodies.find({pageid:parentpageid}).fetch()[0]._id);
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);


		paragraph = "<div>You tell him that you have a bad hangover and that you do not remember much of last night. He tells you to meet later tonight.</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (10*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		
		var realParam = CyoaParams.findOne({title: contacts});
		if (realParam){
			var dataIndex = 0;
			for (var i = 0; i < realParam.data.length; i++) {
				if (realParam.data[i].name == friend) {
					dataIndex = i;
				}
			}
			var valueIndex = Object.keys(realParam.data[dataIndex].values).length;
			var setModifier = { $set: {} };
			setModifier.$set['data.' + dataIndex + '.values.'+valueIndex] = {value: conversed, pageid: pageid};
			CyoaParams.update({_id:realParam._id}, setModifier);
// 			return "Value added";
		}
		////////////////////////////////////////////////
		title = "You agree to meet him";
// 		console.log("Adding " + title + " page");
		parentpageid = Pages.findOne({title:"Reply"})._id;
		parentids = [];
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);


		paragraph = "<div>You set a meeting for tonight at the same club as yesterday.</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (1*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		var realParam = CyoaParams.findOne({title: contacts});
		if (realParam){
			var dataIndex = 0;
			for (var i = 0; i < realParam.data.length; i++) {
				if (realParam.data[i].name == friend) {
					dataIndex = i;
				}
			}
			var valueIndex = Object.keys(realParam.data[dataIndex].values).length;
			var setModifier = { $set: {} };
			setModifier.$set['data.' + dataIndex + '.values.'+valueIndex] = {value: meetingAgreement, pageid: pageid};
			CyoaParams.update({_id:realParam._id}, setModifier);
// 			return "Value added";
		}
		////////////////////////////////////////////////
		title = "You avoid it";
// 		console.log("Adding " + title + " page");
		parentpageid = Pages.findOne({title:"Reply"})._id;
		parentids = [];
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);


		paragraph = "<div>You say that you'd rather stay home tonight, he insists but not for long, after a while you hung up.</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (5*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		////////////////////////////////////////////////
		title = "Ignore it";
// 		console.log("Adding " + title + " page");
		parentids = [];
		parentpageid = Pages.findOne({title: friend + " calls you"})._id;
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);


		paragraph = "<div>Keep on with your routine.</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (1*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		////////////////////////////////////////////////
		title = "Keep up your morning routine";
// 		console.log("Adding " + title + " page");
		parentpageid = Pages.findOne({title:"Ignore it"})._id;
		var parentids = [];
		parentids.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		addingPage = ({title: title, parent:parentids, cyoaid:cyoaid, owner:userid});
		pageid = Pages.insert(addingPage);
// 		console.log(pageid);


		paragraph = "<div>Keep on with your routine.</div>";
		
		
		addingBody = ( {
			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (10*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
		} );
		bodyid = PagesBodies.insert(addingBody);
		////////////////////////////////////////////////
		////////////////////////////////////////////////
		title = "Checking the phone";
// 		console.log("Adding " + title + " page");
		var updatingPage = Pages.findOne({title:"Checking the phone"});
// 		var updatingBody = PagesBodies.findOne({pageid:updatingPageid});
		parentpageid = Pages.findOne({title:"Tell the " + toreador + " you are not in a mood for conversation, especially with strangers, you just want to know who contacted you"})._id;
// 		console.log("ADDING PARENTS TO SECOND PAGE");
// 		console.log(updatingPage);
// 		var parentids = [];
		
// 		updatingPage.parent.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
// 		parentpageid = Pages.findOne({title:"Ignore it"})._id;
// 		updatingPage.parent.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		updatingPage.parent.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		parentpageid = Pages.findOne({title:"Ignore it"})._id;
		updatingPage.parent.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		parentpageid = Pages.findOne({title:"Wake up doing your morning routine"})._id;
		updatingPage.parent.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		parentpageid = Pages.findOne({title:"Tell him you are not interested"})._id;
		updatingPage.parent.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		parentpageid = Pages.findOne({title:"Tell him you are interested"})._id; 
		updatingPage.parent.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		parentpageid = Pages.findOne({title:"You thank him for his warning and agree to meet him"})._id;
		updatingPage.parent.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		parentpageid = Pages.findOne({title:"You thank him for his warning but deny to meet him"})._id;
		updatingPage.parent.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		parentpageid = Pages.findOne({title:"You agree to meet him"})._id;
		updatingPage.parent.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		
		parentpageid = Pages.findOne({title:"Ignore it"})._id;
		updatingPage.parent.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		parentpageid = Pages.findOne({title:"You avoid it"})._id;
		updatingPage.parent.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		parentpageid = Pages.findOne({title:"Keep avoiding him"})._id;
		updatingPage.parent.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		parentpageid = Pages.findOne({title:"Hang up"})._id;
		updatingPage.parent.push({parentid: PagesBodies.find({pageid:parentpageid}).fetch()[0]._id, choiceValue:title});
		
// 		addingPage = ({title: title, parent:[{parentid:parentids, choiceValue:title}], cyoaid:cyoaid, owner:userid});
// 		pageid = Pages.insert(addingPage);
		var updatedPage = Pages.update({_id: updatingPage._id}, {$set:{/*title:page.title, texts:page.texts,*/ parent:updatingPage.parent, cyoaid:updatingPage.cyoaid}});
// 		console.log(updatedPage);
		var commonBody = PagesBodies.findOne({pageid:updatingPage._id});
		console.log("commonBody");
		console.log(commonBody);
		/////////////////////////////////////////////////////
		//
		/////////////////////////////////////////////////////
		var childPages = Pages.find( {"parent": { $elemMatch: { "parentid": commonBody._id } } } ).fetch();
// 		var differencies = [];
		var realParam = CyoaParams.findOne({title: contacts});
		var paramIndex = 0;
		for (var i = 1; i < 8; i++) {
			childPages = Pages.find( {"parent": { $elemMatch: { "parentid": commonBody._id } } } ).fetch();
			var choices = childPages;
			console.log("choices 00");
			console.log(choices);
			console.log("childPages");
			console.log(childPages);
			console.log("commonBody._id");
			console.log(commonBody._id);
// 			texts: [{paragraphs:[{paragraph:paragraph},]},]
			var variededaddingBody = ( {
				texts: commonBody.texts, time: commonBody.time/5, conditions:[], pageid:commonBody.pageid, owner:commonBody.owner, createdOn:commonBody.createdOn
			} );
			if ((i == 1) || (i == 3) || (i == 5) || (i == 7)) {
				for (var parami = 0; parami < realParam.data.length; parami++) {
					if (realParam.data[parami].name == toreador) {
						paramIndex = parami;
						break;
					}
				}
				var valueIndex = 0;
				for (var valuei = 0; valuei < realParam.data[paramIndex].values.length; valuei++) {
					if (realParam.data[paramIndex].values[valuei].value == phoneAcquired) {
						valueIndex = valuei;
						break;
					}
				}
				variededaddingBody.conditions.push( { operation: "AND", paramid:realParam._id, paramIndex: paramIndex,  operator: "equal", paramValueIndex: valueIndex } );
				for (var valuei = 0; valuei < realParam.data[paramIndex].values.length; valuei++) {
					if (realParam.data[paramIndex].values[valuei].value == addressAcquired) {
						valueIndex = valuei;
						break;
					}
				}
				variededaddingBody.conditions.push( { operation: "OR", paramid:realParam._id, paramIndex: paramIndex,  operator: "equal", paramValueIndex: valueIndex } );
				for (var j = 0; j < choices.length; j++) {
					if (choices[j].title == "Contact the unknown number that was calling you") {
						choices.splice(j,1);
					}
				}
			}
			if ((i == 2) || (i == 3) || (i == 6) || (i == 7)) {
				for (var parami = 0; parami < realParam.data.length; parami++) {
					if (realParam.data[parami].name == hunter) {
						paramIndex = parami;
						break;
					}
				}
				for (var valuei = 0; valuei < realParam.data[paramIndex].values.length; valuei++) {
					if (realParam.data[paramIndex].values[valuei].value == phoneAcquired) {
						valueIndex = valuei;
						break;
					}
				}
				variededaddingBody.conditions.push( { operation: "AND", paramid:realParam._id, paramIndex: paramIndex,  operator: "equal", paramValueIndex: valueIndex } );
				for (var valuei = 0; valuei < realParam.data[paramIndex].values.length; valuei++) {
					if (realParam.data[paramIndex].values[valuei].value == meetingAgreement) {
						valueIndex = valuei;
						break;
					}
				}
				variededaddingBody.conditions.push( { operation: "OR", paramid:realParam._id, paramIndex: paramIndex,  operator: "equal", paramValueIndex: valueIndex } );
				for (var j = 0; j < choices.length; j++) {
					if (choices[j].title == "Contact the unknown number that texted you") {
						choices.splice(j,1);
					}
				}
			}
			if ((i == 4) || (i == 5) || (i == 6) || (i == 7)) {
				for (var parami = 0; parami < realParam.data.length; parami++) {
					if (realParam.data[parami].name == friend) {
						paramIndex = parami;
						break;
					}
				}
				for (var valuei = 0; valuei < realParam.data[paramIndex].values.length; valuei++) {
					if (realParam.data[paramIndex].values[valuei].value == talked) {
						valueIndex = valuei;
						break;
					}
				}
				variededaddingBody.conditions.push( { operation: "AND", paramid:realParam._id, paramIndex: paramIndex,  operator: "equal", paramValueIndex: valueIndex } );
				for (var valuei = 0; valuei < realParam.data[paramIndex].values.length; valuei++) {
					if (realParam.data[paramIndex].values[valuei].value == conversed) {
						valueIndex = valuei;
						break;
					}
				}
				variededaddingBody.conditions.push( { operation: "OR", paramid:realParam._id, paramIndex: paramIndex,  operator: "equal", paramValueIndex: valueIndex } );
				for (var valuei = 0; valuei < realParam.data[paramIndex].values.length; valuei++) {
					if (realParam.data[paramIndex].values[valuei].value == meetingAgreement) {
						valueIndex = valuei;
						break;
					}
				}
				variededaddingBody.conditions.push( { operation: "OR", paramid:realParam._id, paramIndex: paramIndex,  operator: "equal", paramValueIndex: valueIndex } );
				for (var j = 0; j < choices.length; j++) {
					if (choices[j].title == "Call with " + friend) {
						choices.splice(j,1);
					}
				}
			}
			if (variededaddingBody.conditions) {
				if (variededaddingBody.conditions.length > 1) {
					variededaddingBody.conditions[0].operation = "None";
				}
			}
			bodyid = PagesBodies.insert(variededaddingBody);
			console.log("choices 01");
			console.log(choices);
			for (var j = 0; j < choices.length; j++) {
				var realPage = Pages.findOne({_id: choices[j]._id});
				if (realPage){
					var parentIndex = realPage.parent.length;
					var setModifier = { $set: {} };
					setModifier.$set['parent.' + parentIndex] = {parentid: bodyid, choiceValue: realPage.title};
					Pages.update({_id:realPage._id}, setModifier);
		// 			return "Value added";
				}					
			}
// 			differencies.push(bodyid);
		}
		/////////////////////////////////////////////////////
		//
		/////////////////////////////////////////////////////
		
// 		console.log(pageid);
// 
// 
// 				paragraph = "<div>Keep on with your routine.</div>",
// 
// 			}]
// 		};
// 		addingBody = ( {
// 			texts: [{paragraphs:[{paragraph:paragraph},]},], time: (10*60*1000), pageid:pageid, owner:userid, createdOn:new Date()
// 		} );
// 		bodyid = PagesBodies.insert(addingBody);
		
		////////////////////////////////////////////////
	},
});