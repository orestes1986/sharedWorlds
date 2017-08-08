Meteor.pageBodyFunctions = {
	isItConstant: function(page) {
		for (var parenti = 0; parenti < page.parent.length; parenti++) {
			if (page.parent[parenti].parentid.toUpperCase() == "CONSTANT") {
				console.log("Constant");
				console.log(page);
				return true;
			}
		}
	},
	isItFirst: function(page) {
		for (var parentj = 0; parentj < page.parent.length; parentj++) {
			if (page.parent[parentj].parentid.toUpperCase() == "NONE") {
				console.log("none");
				console.log(page);
				return true;
			}
		}
	},
}