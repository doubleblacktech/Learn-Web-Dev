var numItems = 0;
var arrData = [];
var initWidth = 275;
var numItems = 0;
var numLost = 0;
var myTimerId;

function init() {
	displayData();
	
	$("#todolist-athome").click(messagesClickHandler);
	
	$("#addItem-btn").click(addItemClickHandler);
	
	$("#clearForm-btn").click(clearFormClickHandler);
	
	/*	Set Timer Bar ******************************** */
	myTimerId = setInterval(function(){
			myTimer()
		},500);
}

function messagesClickHandler(e) {
	var target = e.target

	if (target.className == 'delete') {
		// Delete Item
		
		var myId = getNumFromId(target.id)

		var myTitle = $("#title-"+myId);

		var arrPos = arrData.indexOf(myTitle);

		arrData.splice(arrPos,1);
		
		numItems = arrData.length;

		setData();
		
		/*	Remove element ******************************** */
		$(target.parentNode).remove();
	} else if(target.className == 'title') {
		editItem(target.id)
	} else {
	
		/*	Reset Timer Bar ******************************** */
		if(!$('#'+target.id).hasClass('red')) {
			var id = getNumFromId(target.id)

			var myTimerBar = $("#pane-"+ id +" .timerBar");
		
			myTimerBar.width(initWidth);
		}
	}
}

// Set data in a Cookie
function setData() {
	var expDays = 10;

	$.cookie("domstrikesback", arrData.join(";"), { expires: expDays });
}

// Get data from a Cookie
function getData(cName) {
	return $.cookie(cName).split(";");
}

// Display data upon startup
function displayData() {
	var ndx;
	var strTmp;

	// assign cookie data to tmp var
	arrData = getData("domstrikesback");		//** Changed the name of Cookie

	// if cookie data exists
	if(arrData != undefined && arrData != "") {
		
		// loop through array ...
		$.each( arrData, function( key, value ) {
			showItem(key, value, "Some Text");
		});
	}
	
	numItems = arrData.length;
}

function addItemClickHandler(e) {
	var strTitle = $("#formTitle").val();
	var strDescr = $("#formDescr").val();
	
	if (strTitle != null && strTitle != "") {

		showItem(arrData.length, strTitle, "Some Text");
		
		// add string to data array
		arrData.push(strTitle);

		/*	Update the number of items ******************************** */
		numItems = arrData.length;
		
		// set data into cookie
		setData();
	} else if (strTitle == "") {
		alert("You must enter an item title");
	}
}

function showItem(id, title, descr) {

	/*	Added id to pane element ******************************** */
	var myPanel = $( "<div class='pane' id='pane-"+ id +"'>" );
	
	/*	Added id to header element ******************************** */
	var myTitle = $( "<h3 id='header-"+ id +"'><a href='javascript:;' id='title-"+ id +"' class='title'>"+ title +"</a></h3>" ).appendTo( myPanel );
	var myDescr = $( "<p id='descr-"+ id +"'>"+ descr +"</p>" ).appendTo( myPanel );
	
	/*	Added Timer Bar element ******************************** */
	var timerBar = $( "<div class='timerBar'>" ).appendTo( myPanel );
	
	var myDelete = $( "<img id='delete-"+ id +"' src='delete.gif' alt='delete' class='delete' />" ).appendTo( myPanel ); 
	
	myPanel.appendTo( "#todolist-athome" );
}

function editItem(id) {
	var itemId = id.substr(id.indexOf("-")+1);
	
	$("#formTitle").val( $("#title-"+itemId) );
	$("#formDescr").val( $("#descr-"+itemId) );
}

function clearFormClickHandler(e) {
	$("#formTitle").val("");
	$("#formDescr").val("");
}

/*	Timer function for Timer Bar ******************************** */
function myTimer() {
	var w;
	
	$("div.timerBar").each(function() { 
	
		// Get the width of the current Timer Bar
		w = $(this).width()
		
		// If width is greater than zero ...
		if(w > 0) {
		
			// Reduce the width of the current Timer Bar
			$(this).width(w - 10);
		} else {
		
			// Get the parent to the current Timer Bar
			var myParent = $(this).parent();
			
			// If the current Timer Bar already does not have a class called red ...
			if(!myParent.hasClass('red')) {
			
				myParent.addClass("red");
			}
		}		
	});
	
	$("div.timerBar").each(function() { 
		w = $(this).width()

		if(w < 1) {
			numLost++
		}
	});
	
	if(numLost == numItems && numItems > 0){
		window.clearInterval(myTimerId);
		
		alert("GAME OVER!!");
	}
}

/*	Encapsulate getting a number from element id ******************************** */
function getNumFromId(val) {
	return val.substr(val.indexOf("-") + 1);
}

// call starter function after all DOM elements have been loaded
$(function() {
	init();
});
