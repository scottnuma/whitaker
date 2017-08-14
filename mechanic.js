// JavaScript Document
$(document).ready(function(){
	
	//Hide the menu selectors
	$(".chapters").hide();
	
	//Make them toggle visibiity
	$(".toggle").click(function(){
		$(this).parent().children( ".chapters").toggle();
	});
	
	//Test button
	$("#title").click(function(){
		allowWordClicking();
	});
	
	//Make the menu navigate
	$(".chapter").click(function(){
		
		//Update the heading of the webpage
		var chapterTitle = $(this).text();
		$("h2 .title").text(chapterTitle);
		
		//Create the url
		var parsedTitle = removeSpaces($(this).text());
		
		var paresedChapter = removeSpaces($(this).parent().parent().children("a").text());
		var bookTitle = removeSpaces($("#book_title").text());		
		var url = bookTitle + "/" + parsedTitle + ".txt";
		
		//Load the latin text
		$("#booklines").load(url, function(){
			$("#title").click(allowWordClicking());
		});
	});
	
	//Load the Whitaker Engine
	allowWordClicking();
	
	
});

function allowWordClicking()
{
	var p = $('#booklines');

	//Puts spans around each word
	p.html(function(index, oldHtml) {
    	return oldHtml.replace(/\b(\w+?)\b/g, ' <span class="word">$1</span>')
	});

	p.click(function(event) { loadDefinitionOf(event.target.innerHTML)});
}
function loadDefinitionOf( word )
{
	//Changes the Whitaker window to reflect the definition of the clicked word
	
	if (word.length > 20)
		return;
	var url = "http://www.archives.nd.edu/cgi-bin/wordz.pl?keyword=" + word;
	$("#window").attr('src', url);
	//$(".parsing").load(url);
}
function removeSpaces( str)
{
	return str.replace(/\s/g,"%20");
}
	