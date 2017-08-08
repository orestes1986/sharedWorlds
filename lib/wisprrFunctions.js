Meteor.wisprrFunctions = {
	chaptering: function() {

		//var chapters = '.json_encode($chapters).';

		var divForChaps = "<select name=\"chapterSelect\" id=\"chapterSelect\" onchange=\"loadChapter()\">";

		var word = "";
		if (defaultChapterNaming != "") {
			word = defaultChapterNaming;
		}
		var j = 0;
		var leapj = 0;
		var roboChap = [];
		var roboChapInt = [];
		var theChapters = [];
		var fullchapName = "";
		var chapleaps = [];
		while (true) {
			j++;
			if (word != "") {
				if ((defaultChapterNumbering == "roman") || (defaultChapterNumbering == "Roman") || (defaultChapterNumbering == "latin") || (defaultChapterNumbering == "Latin")) {
					fullchapName = word+" "+converter(j);
				} else {
					fullchapName = word+" "+Number(j);
				}
			} else {
				fullchapName = Number(j);
			}
			//console.log("fullchapName: "+fullchapName);
			roboChap = document.getElementById("wholeBook").innerHTML.split(fullchapName+"\n");
			if (word != "") {
				if (roboChap.length <= 1) {
					roboChap = document.getElementById("wholeBook").innerHTML.split(fullchapName.toUpperCase()+"\n");
				}
				if (roboChap.length <= 1) {
					roboChap = document.getElementById("wholeBook").innerHTML.split(fullchapName.charAt(0).toUpperCase()+fullchapName.slice(1)+"\n");
				}
				if (roboChap.length <= 1) {
					roboChap = document.getElementById("wholeBook").innerHTML.split(fullchapName.toLowerCase()+"\n");
				}
			}
			roboChapInt.push(document.getElementById("wholeBook").innerHTML.lastIndexOf(roboChap[roboChap.length-1]));
			//console.log("roboChapInt: " + roboChapInt[roboChapInt.length-1]);
			var theChapleaps = [];
			if (roboChapInt[roboChapInt.length-1] <= 0) {
				roboChapInt.pop();
				break;
			} else {
				if (defaultChapterLeaping != 1) {
					chapleaps = defaultChapterLeaping.split(",");
					for (var leapCount = 0; leapCount < chapleaps.length; leapCount++) {
						if (Number(j) == Number(chapleaps[leapCount])) {
						//	console.log("j == chapleaps[leapCount]: " + j + ", " +chapleaps[leapCount]);
							leapj++;
							divForChaps += "<option value="+leapj+">"+fullchapName+"</option>";
							theChapleaps = [];
							//theChapleaps.push(j);				 
						}
						theChapleaps.push(j);
					}
				} else {
					leapj++;
					divForChaps += "<option value="+leapj+">"+fullchapName+"</option>";
				}
			}
		}

		var newStart = 0;
		var theChaptersWithLeaps = [];
			if (defaultChapterLeaping != 1) {
			//	console.log("chapleaps000: " + chapleaps);
				for (var leapCount = 0; leapCount < chapleaps.length; leapCount++) {
					for (var chapCount = 0; chapCount < roboChapInt.length; chapCount++) {
						if (chapleaps[leapCount] == chapCount+1) {
							newStart = roboChapInt[chapCount];
							console.log("theChaptersWithLeaps00: " + newStart);
							theChaptersWithLeaps.push(newStart);
						}
					}
				}
				roboChapInt = theChaptersWithLeaps;
			}
				console.log("theChaptersWithLeaps: " + theChaptersWithLeaps[0] + "," + theChaptersWithLeaps[1]);
			for (var demoLeaps = 0; demoLeaps < theChaptersWithLeaps.length; demoLeaps++) {
				console.log("theChaptersWithLeaps: " + theChaptersWithLeaps);
			}

		for (var o = 0; o < roboChapInt.length; o++) {
			//console.log("roboChapInt "+o+": "+roboChapInt[o]);
			//console.log("fullchapName.length: "+fullchapName.toString().length);
			if (fullchapName.length > 0) {
				if (o < roboChapInt.length-1){
					theChapters.push(document.getElementById("wholeBook").innerHTML.substring(roboChapInt[o] - fullchapName.length,roboChapInt[o+1] - fullchapName.length-1));
					console.log("Substr: "+ o +" "+roboChapInt[o]+","+roboChapInt[o+1]);
				} else {
					theChapters.push(document.getElementById("wholeBook").innerHTML.substring(roboChapInt[o] - fullchapName.length,document.getElementById("wholeBook").innerHTML.length));
					console.log("Substr: "+ o +" "+roboChapInt[o]+","+document.getElementById("wholeBook").innerHTML.length);
				}
			} else {
				if (o < roboChapInt.length-1){
					theChapters.push(document.getElementById("wholeBook").innerHTML.substring(roboChapInt[o],roboChapInt[o+1]));
					console.log("Substr: "+ o +" "+roboChapInt[o]+","+roboChapInt[o+1]);
				} else {
					theChapters.push(document.getElementById("wholeBook").innerHTML.substring(roboChapInt[o],document.getElementById("wholeBook").innerHTML.length));
					console.log("Substr: "+ o +" "+roboChapInt[o]+","+document.getElementById("wholeBook").innerHTML.length);
				}
			}
		}

		divForChaps += "</select>";
		document.getElementById("chapters").innerHTML = divForChaps;

		var chapter;
		var audioPath = "";
		var audio = new Audio();
		loadChaptr(1);
	},
	loadChapter: function(){
		var chap = document.getElementById("chapterSelect").value;
		//console.log("chap!!! "+chap);
		loadChaptr(chap);
	},
	loadChaptr: function(chapttt){
		chapter = chapttt;
		var parts = defaultAudioPath.split("/");
		var name = "";
		//console.log("theChapters.length! "+theChapters.length);
		for (var chi = 1; chi < theChapters.length; chi++) {
			//console.log("name[0]!!! "+name[0]);
			//console.log("chapter0!! "+chapter);
			//console.log("name[1]!!! "+name[1]);
			if (parts[parts.length-1].split("0"+chi).length > 1) {
				//console.log("FOUUUUUUND!!!!! 0"+chi);
				name = parts[parts.length-1].split("0"+chi);
				//console.log("name[0]!!!!! "+name[0]);
				//console.log("chapter000!! "+chapter);
				//console.log("name[1]!!!!! "+name[1]);
				break;
			} else if (parts[parts.length-1].split(chi).length > 1) {
				//console.log("FOUUUUUUND!!!!! "+chi);
				name = parts[parts.length-1].split(chi);
				//console.log("name[0]!!!!! "+name[0]);
				//console.log("chapter000!! "+chapter);
				//console.log("name[1]!!!!! "+name[1]);
				break;
			}
		}
		if (chapter < 10) {
			chapter = "0"+chapter;
		}
		//console.log("name[0]!!!!! "+name[0]);
		//console.log("chapter!!!!! "+chapter);
		//console.log("name[1]!!!!! "+name[1]);
		if (audio.duration > 1) {
			audio.pause();
			document.getElementById("plauseBtn").innerHTML = "Play";
			clearInterval(dummy);
		}
		audioPath = defaultAudioPath.replace(parts[parts.length-1], name[0]+chapter+name[1]);
		audio = new Audio();
		audio.src = audioPath;
		audio.addEventListener('loadedmetadata', function() {
	//	console.log("Playing " + audio.src + ", for: " + audio.duration + " seconds.");
			getText();
		});
		document.getElementById("demo").innerHTML = "<pre>"+theChapters[document.getElementById("chapterSelect").value-1]+"</pre>";
	},
}