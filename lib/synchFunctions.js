// Meteor.synchFunctions = {
// // 	var inputText = "";
// // 	var splitedText;
// // 	var i = 0;
// // 	var timming = 0;
// // 	var dummy;
// // 	var orderedRefs = [];
// // 	var nextTextPoint = 0;
// // 	var nextAudioPoint = 0;
// // 	var prevTextPoint = 0;
// // 	var prevAudioPoint = 0;
// // 	var ki = 0;
// // 	var timesCalledLoadRefs = 0;
// // 	var timesCalledGetTexts = 0;
// 	init: function() {
// 		Session.set("inputText", "");
// 		Session.set("splitedText");
// 		Session.set("i", 0);
// 		Session.set("timming", 0);
// 		Session.set("dummy");
// 		Session.set("orderedRefs", []);
// 		Session.set("nextTextPoint", 0);
// 		Session.set("nextAudioPoint", 0);
// 		Session.set("prevTextPoint", 0);
// 		Session.set("prevAudioPoint", 0);
// 		Session.set("ki", 0);
// 		Session.set("timesCalledLoadRefs", 0);
// 		Session.set("timesCalledGetTexts", 0);
// 	},
// 	getText: function() {
// 		timesCalledGetTexts++;
// 	// 	console.log("timesCalledGetTexts: " + timesCalledGetTexts);
// 		Session.set("inputText", document.getElementById("demo").innerHTML);
// // 		inputText = document.getElementById("demo").innerHTML;
// 		Session.set("splitedText", Session.get("inputText"));
// // 		splitedText = inputText.match(/\S+\s*/g);
// 		loadRefs();
// 	// 	console.log("Ordered refs: " + orderedRefs);
// 	},
// 	ordRefA: function(a,b) {
// 		return (Number(a[0]) < Number(b[0]) ? -1 : (Number(a[0]) > Number(b[0]) ? 1 : 0));
// 	},
// 	ordRefB: function(a,b) {
// 		return (Number(a[1]) < Number(b[1]) ? -1 : (Number(a[1]) > Number(b[1]) ? 1 : 0));
// 	},
// 	loadRefs: function() {
// 	timesCalledLoadRefs++;
// 	// console.log("timesCalledLoadRefs: " + timesCalledLoadRefs);
// 	// 	console.log("Chapter: " + chapter);
// 		var minFlag = false;
// 		var maxFlag = false;
// 		if (chapter != undefined) {
// 	// 		console.log("refki refs.length: " + refs.length);
// 			for (var refki = 0; refki < refs.length; refki++) {
// 				if ((refs[refki][0] == "0") && (refs[refki][1] == "0") && (refs[refki][2] == Number(chapter))) {
// 	// 				console.log("refs min is doubled: " + refs[refki]);
// 					minFlag = true;
// 				}
// 				if ((refs[refki][0] == 
// 		/*splitedText*/Session.get("splitedText").length) && (refs[refki][1] == audio.duration) && (refs[refki][2] == Number(chapter))) {
// 	// 				console.log("refs max is doubled: " + refs[refki]);
// 					maxFlag = true;
// 				}									   
// 			}
// 			if (minFlag == false) {
// 				refs.push(["0","0", Number(chapter), "1"]);
// 			}
// 			if (maxFlag == false) {
// 				if (audio.duration > 0) {
// 	// 				console.log("audio duration: " + audio.duration);
// 					refs.push([/*splitedText*/Session.get("splitedText").length, audio.duration, Number(chapter), "1"]);
// 				}
// 			}
// 		}
// 		minFlag = false;
// 		maxFlag = false;
// 
// 	//	var refereses = [];
// 	//	var refsTogether = document.getElementById("ref").innerHTML.split("<br>");
// 	//	refsTogether = refsTogether.filter(v=>v!='');
// 
// 		var currentChapRefs = [];
// 		for (var j = 0; j < refs.length; j++) {
// 	// 		console.log("refs[j][2]: " + refs[j][2]);
// 			if ((Number(refs[j][2]) == Number(chapter) && (Number(refs[j][3] == 1)))) {
// 				currentChapRefs.push(refs[j]);
// 			}
// 		}
// 		var orderedRefsA = currentChapRefs;//.slice();
// 		var orderedRefsB = currentChapRefs;//.slice();
// 		orderedRefsA.sort(ordRefA);
// 		orderedRefsB.sort(ordRefB);
// 	//	console.log("Refs: " + refereses);
// 	// 	for (var refI = 0; refI < refs.length; refI++) {
// 	//  		console.log("Refs00000: " + refs[refI]);
// 	// 	}
// 	// 	for (var refI = 0; refI < currentChapRefs.length; refI++) {
// 	//  		console.log("currentChapRefs: " + currentChapRefs[refI]);
// 	// 	}
// 	// 	console.log("orderedRefsA after func: " + orderedRefsA);
// 	// 	console.log("orderedRefsB after func: " + orderedRefsB);
// 		if (orderedRefsA.toString() == orderedRefsB.toString()) {
// 	// 		console.log("Sorted references are Not Different!!");
// 			orderedRefs = orderedRefsA;
// 	// 		console.log("orderedRefs: " + orderedRefs);
// 	// 		console.log("orderedRefs.length: " + orderedRefs.length);
// 			orderedRefs = orderedRefs.filter(v=>v!='');
// 		} else {
// 	// 	console.log("Sorted references are Different!!!!!!");
// 		}
// 		document.getElementById("ref").innerHTML = orderedRefs.join(' # ');
// 	// 	console.log("Sorted references after a join!!!!!!" + orderedRefs);
// 	// 	console.log("Sorted references length!" + orderedRefs.length);
// 	},
// 	intervvv: function() {
// 		if (document.getElementById("plauseBtn").innerHTML == "Pause" && i < /*splitedText*/Session.get("splitedText").length) {
// 			Session.set("splitedText", Session.get("inputText").match(/\S+\s*/g));
// // 			splitedText = inputText.match(/\S+\s*/g);
// 			for (var k = ki; k < orderedRefs.length; k++) {
// 				if ((k > 0) && (k < orderedRefs.length)) {
// 					if ((i >= orderedRefs[k-1][0]) && (i < orderedRefs[k][0]) && (nextTextPoint != orderedRefs[k][0])) {
// 						nextTextPoint = orderedRefs[k][0];
// 						nextAudioPoint = orderedRefs[k][1];
// 						prevTextPoint = orderedRefs[k-1][0];
// 						prevAudioPoint = orderedRefs[k-1][1];
// 						ki = k;
// 						break;
// 					}
// 				}
// 			}
// 			var audioDiff = nextAudioPoint - prevAudioPoint;
// 			var textDiff = nextTextPoint - prevTextPoint;
// 			var audioBetween = audio.currentTime - prevAudioPoint;
// 			var textBetween = i - prevTextPoint;
// 			var audioPerc = audioBetween / audioDiff;
// 			var textPerc = textBetween / textDiff;
// 			var percDiff = audioPerc - textPerc;// > 0 means audio is ahead, < 0 means text is ahead
// 			var textCorrection = percDiff * textDiff;
// 	// 		console.log("textCorrection: " + textCorrection);
// 			i += Math.round(textCorrection);
// 			if ((nextTextPoint > i) && (nextAudioPoint > audio.currentTime)) {
// 				timming = ((1000 * (nextAudioPoint - audio.currentTime)) / (nextTextPoint - i));// * splitedText[i].length);
// 			}
// 			var endedText = splitedText;
// 			var endedStr = "";
// 			for (j = 0; j < splitedText.length; j++) {
// 				if (i <= 10) {
// 					endedText[0] = "<mark id='highlighting'>" + splitedText[0];
// 				} else if (j == i - 10) {
// 					endedText[j] = "<mark id='highlighting'>" + splitedText[j];
// 				}
// 				if (j == i) {
// 					endedText[j] = splitedText[j] + "</mark>";
// 				} else {
// 					endedText[j] = splitedText[j];
// 				}
// 				endedStr += endedText[j].slice(0, endedText[j].length);
// 			}
// 			document.getElementById("info").innerHTML = "i :" + i + "<br />current time: " + audio.currentTime + "<br /> Timing: " + timming + " <br />";
// 			document.getElementById("demo").innerHTML = endedStr;
// 			i++;
// 		}
// 		clearInterval(dummy);
// 		dummy = setInterval(intervvv, timming);
// 	},
// 	plause: function() {
// 		if (document.getElementById("plauseBtn").innerHTML == "Play") {
// 			nextTextPoint = splitedText.length;
// 			nextAudioPoint = audio.duration;
// 			clearInterval(dummy);
// 			intervvv();
// 			audio.play();
// 			document.getElementById("plauseBtn").innerHTML = "Pause";
// 				document.getElementById("position").innerHTML = "(" + timming + ")"+ "<br /> <br />";
// 
// 		} else {
// 			clearInterval(dummy);
// 			audio.pause();
// 			document.getElementById("plauseBtn").innerHTML = "Play";
// 				document.getElementById("position").innerHTML = "(" + timming + ")"+ "<br /> <br />";
// 		}
// 	},
// 	getPosition: function(element){
// 		var start = 0, end = 0;
// 		var sel, range, priorRange;
// 		if (typeof window.getSelection != "undefined") {
// 			range = window.getSelection().getRangeAt(0);
// 			priorRange = range.cloneRange();
// 			priorRange.selectNodeContents(element);
// 			priorRange.setEnd(range.startContainer, range.startOffset);
// 			start = priorRange.toString().length;
// 			end = start + range.toString().length;
// 		} else if (typeof document.selection != "undefined" && (sel = document.selection).type != "Control") {
// 			range = sel.createRange();
// 			priorRange = document.body.createTextRange();
// 			priorRange.moveToElementText(element);
// 			priorRange.setEndPoint("EndToStart", range);
// 			start = priorRange.text.length;
// 			end = start + range.text.length;
// 		}
// 		var tillWord = document.getElementById("demo").innerHTML.substring(0, end + 1);
// 		var tillWordsplited = tillWord.match(/\S+\s*/g);
// 		i = tillWordsplited.length - 1;
// 		for (var k = 0; k < orderedRefs.length; k++) {
// 				if ((k > 0) && (k < orderedRefs.length)) {
// 					if ((i >= orderedRefs[k-1][0]) && (i < orderedRefs[k][0]) && (nextTextPoint != orderedRefs[k][0])) {
// 						nextTextPoint = orderedRefs[k][0];
// 						nextAudioPoint = orderedRefs[k][1];
// 						prevTextPoint = orderedRefs[k-1][0];
// 						prevAudioPoint = orderedRefs[k-1][1];
// 						ki = k;
// 						break;
// 					}
// 				}
// 			}
// 		var audioDiff = nextAudioPoint - prevAudioPoint;
// 		var textDiff = nextTextPoint - prevTextPoint;
// 		var textBetween = i - prevTextPoint;
// 		var textPerc = textBetween / textDiff;
// 		var audioUpdate = textPerc * audioDiff;
// 		audio.currentTime = Number(prevAudioPoint) + Number(audioUpdate);
// 		audio.currentTime = Number(prevAudioPoint) + Number(audioUpdate);
// 		intervvv();
// 		document.getElementById("position").innerHTML = "position (i): " + i + "<br />" + splitedText[i] + "<br />";
// 	},
// }