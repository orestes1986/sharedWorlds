// code sent to client and server
// which gets loaded before anything else (since it is in the lib folder)

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////// Page  Stuff
/////////////////////////////////////////////////////////////////////
this.Pages.attachSchema(new SimpleSchema({
	title: {
		type:String,
		label: "Title",
	},
	body: {
		type:String,
		label: "body",
		optional: true,
		autoform: {
			rows: 5,
			type: 'hidden',
		},
	},
	parentid:{
		type: String,
		optional: true,
		autoform: {
			type: 'hidden',
		},
	},
	cyoaid:{
		type: String,
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
}));