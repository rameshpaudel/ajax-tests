//We convert XMLHttpRequest to promise framework
var makeRequest = new Promise((resolve,reject)=>{

    var xhr = new XMLHttpRequest();


    xhr.onload = function(){
        setTimeout(()=>{
            //Resolve returns the promise framework
            resolve(xhr.response)
        },2000)
    }

    xhr.onerror = ()=>{
        reject("Something went wrong");
    }

    xhr.open("GET","./data.json");
    xhr.responseType = "json";
    xhr.send();
})



makeRequest.then(data=>{
    console.log("RESPONSE FROM THE rEQUEST", data)
    var { name,email,address,picture} = data[0];
    return { name,email,address,picture};
}) 
.then(data=>{
    console.log("SECOND DATA", data)
})
.catch(error => console.error(error))