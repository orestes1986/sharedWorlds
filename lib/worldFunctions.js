Meteor.worldFunctions = {
	worldInit: function(){
		var refreshIntervalWorlds = setInterval(function(){
			if (document.getElementsByClassName("css-world").length > 0) {
				for (var i = 0; i < document.getElementsByClassName("css-world").length; i++) {
					var adv_of_world = document.getElementsByClassName("css-world-content")[i].getAttribute("data-sum_of_advs");
					document.getElementsByClassName("css-world")[i].style.height = Meteor.worldFunctions.world_size()+"px";
					document.getElementsByClassName("css-world-content")[i].style.height = Meteor.worldFunctions.get_newSize(adv_of_world)+"px";
					document.getElementsByClassName("css-world-content")[i].style.width = Meteor.worldFunctions.get_newSize(adv_of_world)+"px";
					document.getElementsByClassName("css-world")[i].style.paddingLeft = Meteor.worldFunctions.get_randomised(adv_of_world)+"px";
					document.getElementsByClassName("css-world")[i].style.paddingTop = Meteor.worldFunctions.get_randomised(adv_of_world)+"px";
				}
				clearInterval(refreshIntervalWorlds);
			}
		}, intervTime);
	},
	get_randomised: function(sum_of_adv) {
		var max = (Meteor.worldFunctions.world_size()-Meteor.worldFunctions.get_newSize(sum_of_adv))/2;
		var min = 0;
		var padd = Math.round(Math.random() * (max - min) + min);
		if (Math.random() > .5) {
			return (padd);
		} else {
			return (max+padd);
		}
	},
	world_size: function() {
		var calcW = 0;
		if (document.getElementsByClassName("css-world").length > 0) {
			if (document.getElementsByClassName("css-world")[0].offsetWidth) {
		// 		console.log("Found width!!!!");
				calcW = document.getElementsByClassName("css-world")[0].offsetWidth;
			} else {
				console.log("Did not found width!!!!");
				var win_size =  $(window).width() * .8;
				calcW = Math.round(win_size);
		// 		console.log($(window).width());
		// 		console.log("win size: "+win_size);
				if ($(window).width() >= 1200) {
		// 			console.log("col-lg-3");
					calcW = Math.round(win_size / 4);
				} else if ($(window).width() >= 992) {
		// 			console.log("col-md-4");
					calcW = Math.round(win_size / 3);
				} else if ($(window).width() >= 768) {
		// 			console.log("col-sm-6");
					calcW = Math.round(win_size / 2);
				}
			}
			return calcW;
		}
	},
	get_newSize: function(sum_of_advs){
		var max = Meteor.worldFunctions.world_size();
// 		console.log("world size");
// 		console.log(Meteor.worldFunctions.world_size());
		var min = 150;
		var new_size = min;
		if (Events.find().fetch().length > 0) {
			var total_adventures = Events.find().fetch().length;
			if (sum_of_advs > 0) { 
				new_size = Math.round(min+(sum_of_advs/total_adventures*(max-min)));
			}
		}
		return new_size;
	},
}