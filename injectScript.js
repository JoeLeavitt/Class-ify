/*******************************
 * myUCF Portal Extension      *	 
 * Created by: Joseph Leavitt  *
 * Last Edited: 11/06/15       *
 *******************************/

var PROFESSOR_HTML_ID = "MTG_INSTR$";

main();

function main()
{
	var professorIndex = 0;
	var currProfessor = "";

	while(currProfessor != "DoneParsing") 
	{
		currProfessor = parseProfessorName(professorIndex);
		
		console.log("[PROFESSOR NAME]: " + currProfessor);

		if(currProfessor != "Staff" && currProfessor != "DoneParsing")
			requestRatingsPage(currProfessor, professorIndex);

		professorIndex++;
	}

}	

/* Parses professor names from myUCF class search page */
function parseProfessorName(professorIndex)
{
	try{
		var professorName = document.getElementById('ptifrmtgtframe')
			.contentWindow.document.getElementById(PROFESSOR_HTML_ID + professorIndex).innerHTML;
		
		return professorName;

	} catch(err) {
		return "DoneParsing";
	}
}

/* Sends message to background.js to request search page from ratemyprofessor.com */
function requestRatingsPage(currProfessor, professorIndex)
{
	chrome.runtime.sendMessage
	({
		method: 'POST',
		action: 'xhttp',
		url: 'http://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=university%20of%20central%20florida&queryoption=HEADER&query=' 
			+ CurrentProfessor + '&facetSearch=true',
		data: '',
		link: searchPageURL,
		index: professorIndex
		
		}, function(response){
		
		var skertHTML = response.response;
		
		var div = document.createElement('div');
		
		div.innerHTML = skertHTML.replace(/<script(.|\s)*?\/script>/g, '');

		var professorClass = div.getElementsByClassName("listing PROFESSOR")[0].getElementsByTagName('a')[0];

		searchPageURL = "http://www.ratemyprofessors.com" + professorClass.getAttribute('href');
		
		console.log("[PROFESSOR URL]: " + searchPageURL);

		//requestProfessorData(response.professorIndex, searchPageURL);
	});
}

function requestProfessorData()
{
	
}
