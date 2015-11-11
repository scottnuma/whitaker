// JavaScript Document
$(document).ready(function(){
	
	var p = $('#parsed');

	//Puts spans around each word
	p.html(function(index, oldHtml) {
    	return oldHtml.replace(/\b(\w+?)\b/g, ' <span class="word">$1</span>');
	});
	
	//When clicking the word to be parsed
	p.click(function(event) {
		var word = event.target.innerHTML;
		
		//If the word is absurdly long...
		if (word.length > 20) {return false;}
        
        //Stores the initial clicked element.
		var test = event.target;
        
        //Check to make sure that a word, not a paragraph, is clicked. This is a proof of concept, use something other than "background-color".
        if($(test).attr('class')== "word"){
            $(test).css("color","red");
        }
		
		//Else send the iframe to this new url
		var url = "http://www.archives.nd.edu/cgi-bin/wordz.pl?keyword=" + word;
		$("#window").attr('src', url);
	});
	
	//Make the submit button work
	$("#submitButton").click(function ()
	{
		
		//Save the text to a variable
		var toParse = $("#textEntry").val();
		
		//If there is nothing written in the textbox don't take further action
		if (toParse.length == 0 )
		{
			return false;
		}
		
		toParse = removeDash( toParse);
		
		
		
		//Clear the text from the text field
		$("#textEntry").val('');
		
		//Paste the text into the parsed field
		$("#parsed").html(toParse);
		
		//Apply the parsing to the newly applied text
		//Puts spans around each word
		$("#parsed").html(function(index, oldHtml) {
    		return oldHtml.replace(/\b(\w+?)\b/g, ' <span class="word">$1</span>');
		});	
	});
});

function removeDash( entry){
	var result = "";
	for(var i = 0; i < entry.length; i++)
	{
		var letter = entry[i];
		if (letter != "_")
		{
			result += letter;
		}
	}
	return result;
}