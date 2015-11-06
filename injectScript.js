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

		//if(currProfessor != "Staff" && currProfessor != "DoneParsing")
		//	requestRatingsPage(currProfessor, professorIndex);

		professorIndex++;
	}

}	


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

function requestRatingsPage(currProfessor, professorIndex)
{

}

function requestProfessorData()
{

}
