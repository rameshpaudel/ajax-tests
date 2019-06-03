var pageLinks = document.querySelectorAll('nav ul li a');

for(var i=0; i < pageLinks.length; i++){
    //Selecting each links and attaching the event listener
    pageLinks[i].addEventListener('click', linkClicked)
}



//AJAX REQUEST

var xhr =  new XMLHttpRequest();
var outputBox = document.querySelector(".outputBox");


//Setting up a progressbar
xhr.onprogress = function(e) {
    console.log(e);
    if (e.lengthComputable) {
        var loadingPercentage = (e.loaded / e.total) * 100;
        var indicator = document.querySelector('.loading-indicator');
        console.log('Loaded Size', e.loaded);
        console.log('Total Size', e.total);

        indicator.style.width = 100 - loadingPercentage + '%';
        indicator.style.height = 10+'px';
        indicator.style.opacity = loadingPercentage / 100;
        
        setTimeout(()=>{
            indicator.style.height = 0+'px';
            indicator.style.opacity = 0;
            indicator.style.width =  0
        }, 5000)
        
    }
};

// Load it into output box if we want to fetch document
function loadOnDocumentMode(){
    //Replacing the response data to our output
    outputBox.innerHTML = parseTheBody(this.response).innerHTML
}

xhr.onerror = function(e){
    console.log('error',e);
}
function linkClicked(e){
    //preventing the link to go to the next page
    e.preventDefault();

    xhr.onload =  loadOnDocumentMode;

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

function loadDataWhenJSON(){
    // console.log(this.response);
    // console.log(this.response instanceof Document)


    //Looping all the data to show in ui since its in array format
    for(var i =0; i < this.response.length; i++ ){
        //Remove all the items while the item is in first position
        // If not append the items to the outputBox
        // if(i != 1){
            outputBox.innerHTML += generateUIForJSON(this.response[i])   
        // } else{
        //     outputBox.innerHTML = generateUIForJSON(this.response[i])   
        // }
    }
}
function queryJSON(e){

    //Refreshing on load when we want to fetch JSON file
    xhr.onload = loadDataWhenJSON
    

    e.preventDefault();
    //Opening the XHR port
    xhr.open("GET", "./data.json");

    // We are setting the type of data we want to recieve 
    // so we can effieciently manipulate the data
    xhr.responseType = "json"
    xhr.send();
}

loadJSON.addEventListener('click', queryJSON);