var data = new Array();
var wrapper = document.getElementById('wrapper');

function loadJSON(url, callback) {   

	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', url, true);
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == 200) {
			callback(xobj.responseText);
		}
		else if (xobj.status != 200) {
			alert ("cannot get access to database");
		}
	};
	xobj.send(null);  
}

function build(data) {

	data.forEach( (item, i, arr) => {
			var details = document.createElement('details');
			var summary = document.createElement('summary');
			var p = document.createElement('p');

			wrapper.appendChild(details);
			details.appendChild(summary);
			details.appendChild(p);

			summary.innerHTML = item.name;
			p.innerHTML = item.text;
		}
	);

	document.getElementById('stub').remove();
	wrapper.style.visibility = "visible";
}

function filter() {

	var input, filter, details, i;
	input = document.getElementById('filterInput');
	filter = input.value.toUpperCase();
	details = wrapper.getElementsByTagName('details');

	for (i = 0; i < details.length; i++) {
		var summary = details[i].getElementsByTagName("summary")[0];
		if (summary.innerHTML.toUpperCase().indexOf(filter) > -1) {
		details[i].style.display = "";
	} else {
		details[i].style.display = "none";
	}
    }
}

function init() {

	loadJSON(
		"data/formulas.json", 
		dataJSON => {
			data = JSON.parse (dataJSON).formulas;
			build(data);
		}
	);
}

init();
