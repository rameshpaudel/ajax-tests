var pageLinks = document.querySelectorAll('nav ul li a');

for(var i=0; i < pageLinks.length; i++){
    //Selecting each links and attaching the event listener
    pageLinks[i].addEventListener('click', linkClicked)
}



//AJAX REQUEST

var xhr =  new XMLHttpRequest();
var outputBox = document.querySelector(".outputBox");

xhr.onload = function(){
    console.log(this.response)

    var container = document.createElement('div');
    
    var finalData = parseTheBody(this.response)
    
    container.innerHTML = finalData;
    

    

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


function parseTheBody(response){
    var splittedData = response.split("<body>")
    var innerData = splittedData[1].split("</body>")[0];
    var finalData = innerData.split('<script')[0]
    return finalData;
}