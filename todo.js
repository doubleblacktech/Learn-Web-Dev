var numItems = 0;
var arrData = [];

function init() {
	displayData();
	
	var messagesContainerElem = document.getElementById("todolist-athome");		//** Changed the name of ID
	messagesContainerElem.addEventListener("click", messagesClickHandler);
	
	var addItemElem = document.getElementById("addItem-btn");
	addItemElem.addEventListener("click", addItemClickHandler);
	
	var clearFormElem = document.getElementById("clearForm-btn");
	clearFormElem.addEventListener("click", clearFormClickHandler);
}

function messagesClickHandler(e) {
	var target = e.target

	if (target.className == 'delete') {
		// Delete Item
		
/*	********************************************************************
	Homework for Martin
	
// Extract the ID Number from the ID text

// Get the Title text

// Search the arrData array for Title text and returns its position

// Removes element from the arrData array

// Update the Cookie

********************************************************************* */
		target.parentNode.style.display = 'none'
	} else if(target.className == 'title') {
		editItem(target.id)
	}
}

// Set data in a Cookie
function setData() {
	var expDays = 10;
	var strArray = arrData.join(";");

	// convert the number of days to a valid date
	var expDate = new Date();
	expDate.setDate(expDate.getDate() + expDays);

	// add the number of days until the cookie should expire
	var cValue = escape(strArray) + ((expDays == null) ? "" : "; expires=" + expDate.toUTCString());

	// store the cookie name, cookie value and the expiration date
	document.cookie = "csslayout=" + cValue;	//** Changed the name of Cookie
}

// Get data from a Cookie
function getData(cName) {
	var ndx, name, val;
	
	// convert cookie string into array
	var arrCookies = document.cookie.split(";");

	// loop through array
	for (ndx=0; ndx<arrCookies.length; ndx++) {

		// get name
		name = arrCookies[ndx].substr(0, arrCookies[ndx].indexOf("="));

		// get value
		val = arrCookies[ndx].substr(arrCookies[ndx].indexOf("=") + 1);

		// is this the cookie we need?
		if (name == cName) {
			return unescape(val);
		}
	}
}

// Display data upon startup
function displayData() {
	var ndx;
	var strTmp;

	// assign cookie data to tmp var
	strTmp = getData("csslayout");		//** Changed the name of Cookie

	// if cookie data exists
	if(strTmp != undefined && strTmp != "") {
		
		// convert tmp cookie string into array
		arrData = strTmp.split(";");

		// loop through array ...
		var strNotToDo = "";
		for (ndx=0; ndx<arrData.length; ndx++) {
		
			showItem(ndx, arrData[ndx], "Some Text");		//** Added New Parameter
		}
	}
}

function addItemClickHandler(e) {
	var strTitle = document.getElementById("formTitle").value;
	var strDescr = document.getElementById("formDescr").value;
	
	if (strTitle != null && strTitle != "") {

		showItem(arrData.length, strTitle, "Some Text");
		
		// add string to data array
		arrData.push(strTitle);

		// set data into cookie
		setData();
	} else if (strTitle == "") {
		alert("You must enter an item title");
	}
}

function showItem(id, title, descr) {
	var strNotToDo = 	"<div class='pane'>" + 
						"<h3><a href='javascript:;' id='title-"+ id +"' class='title'>"+ title +"</a></h3>" +
						"<p id='descr-"+ id +"'>"+ descr +"</p>" +
						"<img id='delete-"+ id +"' src='delete.gif' alt='delete' class='delete' />" + 
						"</div>";
						//** Added ID to img element

	// ...  to display on page
	document.getElementById("todolist-athome").innerHTML += strNotToDo;		//** Changed the name of ID
}

function editItem(id) {
	var itemId = id.substr(id.indexOf("-")+1);
	
	var title = document.getElementById("title-"+itemId).innerHTML;
	var descr = document.getElementById("descr-"+itemId).innerHTML;
	
	document.getElementById("formTitle").value = title;
	document.getElementById("formDescr").value = descr;
}

function clearFormClickHandler(e) {
	document.getElementById("formTitle").value = "";
	document.getElementById("formDescr").value = "";
}

// call starter function after all DOM elements have been loaded
window.onload = function() {
	init();
}