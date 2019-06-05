//
var pageLinks = document.querySelectorAll('nav ul li a');
var loadJSON = document.querySelector('#load-json');
var outputBox = document.querySelector('.outputBox')


//Get specific element from the data 
function getHtmlFromResponse(data, queryData = ".outputBox"){
    var dummyDiv = document.createElement('div');
    dummyDiv.innerHTML = data;
    return dummyDiv.querySelector(queryData);
    
}

//Returns the response as text if present
function getResponseAsText(response){
    //We return the type of data we want to return in correct format
    if (response.ok) {
        return response.text();
    }
    throw Error("The request was not successful")
}

//Generate HTML for json
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


//Map all the JSON data to HTML
function mapJSONToHtml(value){
    outputBox.innerHTML += generateUIForJSON(value)
}
//Return the response as json format
function responseToJSON(response){
    //We return the type of data we want to return in correct format
    if (response.ok) {
        return response.json();
    }

    throw Error("The data was not in json format")
}

//Event listeners for the nav anchor tags
function linkClicked(e) {
    //preventing the link to go to the next page
    e.preventDefault();
    var url = e.srcElement.getAttribute('href');
    fetch(url)
        .then(getResponseAsText)
        .then(getHtmlFromResponse)
        .then(data => outputBox.innerHTML = data.innerHTML)
        .catch(error => console.error(error));
}



for (var i = 0; i < pageLinks.length; i++) {
    //Selecting each links and attaching the event listener
    pageLinks[i].addEventListener('click', linkClicked)
}





//Load the json data and output json html
function loadData(){
    fetch('./data.json')
        .then(responseToJSON)
        .then(data => data.map(mapJSONToHtml))
        .catch(error => console.error(error));
}

loadJSON.addEventListener('click', loadData)

