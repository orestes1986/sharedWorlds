Meteor.romanFunctions = {
	convertr: function() {
	document.getElementById("display").innerHTML = converter(form1.num.value);
	},
	converter: function(numToConv) {
		//var  = ;
		var numToRom = [];
		var numToRome = "";
		var R = [['M',1000], ['D',500], ['C',100], ['L',50], ['X',10], ['V',5], ['I',1]];
		while (numToConv > 0) {
			if (numToConv > R[0][1]) {
				if (numToConv < R[0][1] * 5 - R[0][1]) {   
					numToRom.push([R[0][0],"next one goes aftah"]);
					numToConv = Math.abs(numToConv - R[0][1]);
					//console.log("Next comes after: " + R[0][0] + " (" + R[0][1] + ")");
					//console.log(numToConv);
				} else {
				// if (numToConv.toString()[0]) {}
					numToConv = 0;
					break;
				}
			}
			for (var i = 0; i < R.length; i++) {
				if (R[i][1] == numToConv) {
					numToRom.push([R[i][0],"end"]);
					numToConv = Math.abs(numToConv - R[i][1]);
					//console.log("End: " + numToConv);
				} else if (i > 0) {
					if ((R[i-1][1] > numToConv) && (R[i][1] < numToConv)) {
						//console.log(numToConv + " is between: " + R[i][1]  + " (" + R[i][0] + ") and: " +  R[i - 1][1]  + " (" + R[i - 1][0] + ")");
						var threshold = R[i - 1][1] - Math.pow(10, numToConv.toString().length - 1);
						//console.log("threshold: " + threshold + " : " + R[i][1] + " : " + Math.pow(10, numToConv.toString().length - 1));
						if (numToConv  < threshold) {
							numToRom.push([R[i][0],"next one goes aftah"]);
							numToConv = Math.abs(numToConv - R[i][1]);
							//console.log("Next comes after: " + R[i][0] + " (" + R[i][1] + ")");
							//console.log(numToConv);
						} else {
							numToRom.push([R[i-1][0],"next one goes befoah"]);
							numToConv = Math.abs(numToConv - threshold + Math.pow(10, numToConv.toString().length - 1));
							//console.log("Next comes before: " + R[i-1][0] + " (" + R[i-1][1] + ")");
							//console.log(numToConv);
						}
					}
				}
			}
		}
	//	console.log("numToRom: " + numToRom);
		for (var i = 0; i < numToRom.length; i++) {
			if (numToRom[i][1] == "next one goes befoah") {
				numToRome += (numToRom[i+1][0] + numToRom[i][0]);
				//console.log("numToRome goes befoah: " + numToRome + " i: " + i);
				i++;
			} else {
				numToRome += numToRom[i][0];
				//console.log("numToRome goes aftah: " + numToRome + " i: " + i);
			}
		}
				//console.log("numToRome: " + numToRome);
				return numToRome;
	},
}