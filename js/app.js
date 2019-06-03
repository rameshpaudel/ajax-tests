var pageLinks = document.querySelectorAll('nav ul li a');

for(var i=0; i < pageLinks.length; i++){
    //Selecting each links and attaching the event listener
    pageLinks[i].addEventListener('click', linkClicked)
}



//AJAX REQUEST

var xhr =  new XMLHttpRequest();
var outputBox = document.querySelector(".outputBox");



xhr.onload = function(){
    //Replacing the response data to our output
    outputBox.innerHTML = parseTheBody(this.response).innerHTML
}

xhr.onerror = function(e){
    console.log('error',e);
}
function linkClicked(e){
    //preventing the link to go to the next page
    e.preventDefault();

    //Fetching the url to navigate to
    var url = e.srcElement.getAttribute('href');
    
    xhr.open("GET", url);
    //We can specify which type of data we want from the response
    xhr.responseType = "document";
    
    //Sending the ajax request
    xhr.send();
}


//Parses the html element inside body tag without the scripts
function parseTheBody(response){
    
    return response.querySelector('.outputBox')
}


function generateUIForJSON(data){
    return `
        <div class="quarter">
            <div class="image">
                <img src="${data.picture}"/>
            </div>
            <div class="info">
                <h3>${data.name}</h3>
                <h4>${data.gender}</h3>
                <h5>${data.email}</h5>
            </div>
        </div>
    `
}

var loadJSON = document.querySelector("#load-json");

function queryJSON(e){

    //Refreshing on load when we want to fetch JSON file
    xhr.onload = function(){
        // console.log(this.response);
        // console.log(this.response instanceof Document)
        //Looping all the data to show in ui since its in array format
        for(var i =0; i < this.response.length; i++ ){
            if(i != 1){
                outputBox.innerHTML += generateUIForJSON(this.response[i])   
            } else{
                outputBox.innerHTML = generateUIForJSON(this.response[i])   
            }
        }
    }


    e.preventDefault();
    var url = "./data.json";
    xhr.open("GET", url);
    xhr.responseType = "json"
    xhr.send();
}

loadJSON.addEventListener('click', queryJSON);