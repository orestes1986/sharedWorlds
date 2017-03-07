// code sent to client and server
// which gets loaded before anything else (since it is in the lib folder)

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////// Page  Stuff
/////////////////////////////////////////////////////////////////////
CyoaParams.attachSchema(new SimpleSchema({
	title: {
		type:String,
		label: "Title",
	},
	data: {
		type: [[String]],
		label: "title",
// 		type:
// 		[{
// 			title: {
// 				type:String,
// 				label: "title",
// 			},
// 			value: {
// 				type:String,
// 				label: "value",
// 			},
// 		},],
// 		optional: true,
// 		label: "data",
	},
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
//obj.title = "inventory";
//obj.data[0].title =-"potion";
//obj.data[0].value =-"+3";
//obj.cyoaid = "mPYtMW2xS2zJXDxEf";
//obj.owner = "s5FCSwxiknezHNTin";