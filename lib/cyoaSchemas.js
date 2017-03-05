// code sent to client and server
// which gets loaded before anything else (since it is in the lib folder)

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////// Cyoa Stuff
/////////////////////////////////////////////////////////////////////
this.Cyoas.attachSchema(new SimpleSchema({
	title: {
		type:String,
		label: "Title",
	},
	url: {
		type:String,
		label: "URL",
		optional: true,
	},
	eventid:{
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
// CyoaComments.attachSchema(new SimpleSchema({
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
// 	cyoaid:{
// 		type: String, 
// 	},
// 	owner:{
// 		type: String, 
// 	},
// }));
// CyoaParams.attachSchema(new SimpleSchema({
// 	title: {
// 		type: String,
// 		label: "Title",
// 		max: 200
// 	},
// 	value:{
// 		type: String,
// 		label: "Value",
// 		max: 1000
// 	},
// 	cyoaid:{
// 		type: String, 
// 	},
// }));