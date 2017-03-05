// code sent to client and server
// which gets loaded before anything else (since it is in the lib folder)

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////// Worlds Stuff
/////////////////////////////////////////////////////////////////////
this.Worlds.attachSchema(new SimpleSchema({
	title: {
		type:String,
		label: "Title",
		max: 60
	},
	description: {
		type:String,
		label: "Description",
		max: 2000,
		autoform: {
			rows: 5
		} // http://autoform.meteorapp.com/quickform
	},
	owner:{
		type: String,
		optional: true,
		autoform: { 
			type: 'hidden', 
		},
	},
	advSum: {
		type: Number,
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
	tags: {
		type: [String],
		optional: true,
		autoform: {
			type: 'tags',
		}
	}
}));
/*
// set up a schema controlling the allowable 
// structure of comment objects for world

WorldComments.attachSchema(new SimpleSchema({
	title: {
		type: String,
		label: "Title",
		max: 200
	},
	body:{
		type: String,
		label: "Comment",
		max: 1000
	},
	worldid:{
		type: String, 
	},
	owner:{
		type: String, 
	},
}));*/