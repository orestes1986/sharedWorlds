// code sent to client and server
// which gets loaded before anything else (since it is in the lib folder)

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////// Events Stuff
/////////////////////////////////////////////////////////////////////
this.Events.attachSchema(new SimpleSchema({
	content: {
		type:String,
		label: "Description",
		max: 60
	},
	start: {
		type: String,
		label: "Begining",
	},
	end: {
		type: String,
		label: "Ending",
		optional: true,
	},
	description: {
		type:String,
		label: "Description",
		optional: true,
		autoform: {
			rows: 5
		} // http://autoform.meteorapp.com/quickform
	},
	worldid:{
		type: String,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
	owner:{
		type: String,
		optional: true,
		autoform: {
			type: 'hidden', 
		},
	},
	createdOn:{
		type: Date,
		optional: true,
		autoform: { 
			type: 'hidden', 
		},
	},
	lastEdit:{
		type: Date,
		optional: true,
		autoform: { 
			type: 'hidden', 
		},
	},
}));
// // set up a schema controlling the allowable 
// // structure of comment objects for adventures
// EventComments.attachSchema(new SimpleSchema({
// 	title: {
// 		type: String,
// 		label: "Title",
// 		max: 200
// 	},
// 	body:{
// 		type: String,
// 		label: "Comment",
// 		max: 1000
// 	},
// 	eventid:{
// 		type: String, 
// 	},
// 	owner:{
// 		type: String, 
// 	},
// }));