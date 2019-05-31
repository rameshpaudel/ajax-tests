var pageLinks = document.querySelectorAll('nav ul li a');

for(var i=0; i < pageLinks.length; i++){
    //Selecting each links and attaching the event listener
    pageLinks[i].addEventListener('click', linkClicked)
}



//AJAX REQUEST

var xhr =  new XMLHttpRequest();
var outputBox = document.querySelector(".outputBox");

xhr.onload = function(){
    //Creating a div element to place all our response data
    var container = document.createElement('div'); 
    container.innerHTML = parseTheBody(this.response)

    //Replacing the response data to our output
    outputBox.innerHTML = container.querySelector('.outputBox').innerHTML   
}

function linkClicked(e){
    //preventing the link to go to the next page
    e.preventDefault();

    //Fetching the url to navigate to
    var url = e.srcElement.getAttribute('href');
    
    xhr.open("GET", url);
    xhr.send();
}


//Parses the html element inside body tag without the scripts
function parseTheBody(response){
    return response.split("<body>")[1].split("</body>")[0].split('<script')[0];
}
