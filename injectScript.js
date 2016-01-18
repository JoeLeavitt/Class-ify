/*******************************
 * myUCF Portal Extension      *
 * Created by: Joseph Leavitt  *
 * Last Edited: 1/16/2016      *
 *******************************/

var PROFESSOR_HTML_ID = "MTG_INSTR$";
var professorURL = "";

main();

function main()
{
	var professorIndex = 0;
	var currProfessor = "";

	while(currProfessor != "DoneParsing")
	{
		currProfessor = parseProfessorName(professorIndex);

        if(currProfessor.indexOf(',') != 1)
        {
            var temp = currProfessor.split(',');
            currProfessor = temp[0].toString();
        }
        console.log(currProfessor);

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
			+ currProfessor + '&facetSearch=true',
		data: '',
		link: professorURL,
		index: professorIndex

		}, function(response) {

		var skertHTML = response.response;

		var div = document.createElement('div');

		div.innerHTML = skertHTML.replace(/<script(.|\s)*?\/script>/g, '');

		var professorClass = div.getElementsByClassName("listing PROFESSOR")[0].getElementsByTagName('a')[0];

		professorURL = "http://www.ratemyprofessors.com" + professorClass.getAttribute('href');

		//console.log("[PROFESSOR URL]: " + professorURL);

		requestProfessorData(response.professorIndex, professorURL);
	});
}

function requestProfessorData(professorIndex, professorURL)
{

    chrome.runtime.sendMessage
    ({
        method: 'POST',
        action: 'xhttp',
        url: professorURL,
        data: '',
        link: professorURL,
        index: professorIndex

        }, function(response) {

        var skertHTML = response.response;

        var div = document.createElement('div');

        div.innerHTML = skertHTML.replace(/<script(.|\s)*?\/script>/g, '');

        div.childNodes;

        // check if professor rating is a number.
        if (!isNaN(div.getElementsByClassName("grade")[0].innerHTML))
            var professorRating = div.getElementsByClassName("grade")[0].innerHTML;

            var professorID = document.getElementById('ptifrmtgtframe')
                 .contentWindow.document.getElementById(PROFESSOR_HTML_ID + response.professorIndex);

        populatePage(professorID, professorRating, response.professorURL);
    });
}

function populatePage(professorID, professorRating, professorURL)
{

    var span = document.createElement('span'); // Created to separate professor name and score in the HTML
    var link = document.createElement('a');
    var space = document.createTextNode("  "); // Create a space between professor name and rating
    var professorRatingTextNode = document.createTextNode(professorRating); // The text with the professor rating

    if (professorRating < 3.5) {
        link.style.color = "#8A0808"; // red = bad
    } else if (professorRating >= 3.5 && professorRating < 4) {
        link.style.color = "#FFBF00"; // yellow/orange = OKAY
    } else if (professorRating >= 4 && professorRating <= 5) {
        link.style.color = "#298A08"; // green = good
    }

    span.style.fontWeight = "bold"; // bold it

    link.href = professorURL; // make the link
    link.target = "_blank"; // open a new tab when clicked

    // append everything together
    link.appendChild(professorRatingTextNode);
    span.appendChild(space);
    span.appendChild(link);
    professorID.appendChild(span);
}
