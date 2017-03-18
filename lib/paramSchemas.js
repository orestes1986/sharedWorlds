// code sent to client and server
// which gets loaded before anything else (since it is in the lib folder)

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////// Param  Stuff
/////////////////////////////////////////////////////////////////////

CyoaParams.attachSchema(new SimpleSchema({
	title: {
		type:String,
		label: "title",
	},
	data: {
		type: Array,
		optional: true
	},
	'data.$': {
		type: Object
	},
	'data.$.name': {
		type: String
	},
	'data.$.values': {
		type: Array
	},
	'data.$.values.$': {
		type: String
	},
// 	'data.$.value': {
// 		type: String
// 	},
// 	'data.$.demoValue': {
// 		type: Array
// 	},
// 	'data.$.demoValue.$': {
// 		type: String
// 	},
// 	'data.$.dataId': {
// 		type: String
// 	},
	cyoaid:{
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
}));

// var dataSchema = new SimpleSchema({
//     "label": {type: String}
//     "value": {type: String}
// });
/*
Schemas.CyoaParam = new SimpleSchema({
    name: { type: String },
    data: { type: Array, optional: true },
    'data.$': { type: Object },
    'data.$.label': { type: String },
    'data.$.value': { type: String }
});
*/
//obj.title = "inventory";
//obj.data[0].title =-"potion";
//obj.data[0].value =-"+3";
//obj.cyoaid = "mPYtMW2xS2zJXDxEf";
//obj.owner = "s5FCSwxiknezHNTin";