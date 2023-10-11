const loadingHtmlMinified = `<div id="embedLoadingBody" class="embedLoadingBody"> <style>.embedLoadingBody{margin: 0; padding: 0; position: absolute; left: 0; top: 0; height: 100%; width: 100%; background: rgb(49,49,73); background: linear-gradient(180deg, rgba(46,53,70,1) 0%, rgba(30,34,46,1) 100%); overflow: hidden; font-family: Arial, Helvetica, sans-serif; color: white;}.embedLoadingError{color: red;}.embedLoadingDisplay{position: absolute; left: 50%; top: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); text-align: center;}.embedLoadingSpinner{color: official; display: inline-block; position: relative; width: 80px; height: 80px;}.embedLoadingSpinner div{transform-origin: 40px 40px; animation: embedLoadingSpinner 1.2s linear infinite;}.embedLoadingSpinner div:after{content: " "; display: block; position: absolute; top: 3px; left: 37px; width: 6px; height: 18px; border-radius: 20%; background: #fff;}.embedLoadingSpinner div:nth-child(1){transform: rotate(0deg); animation-delay: -1.1s;}.embedLoadingSpinner div:nth-child(2){transform: rotate(30deg); animation-delay: -1s;}.embedLoadingSpinner div:nth-child(3){transform: rotate(60deg); animation-delay: -0.9s;}.embedLoadingSpinner div:nth-child(4){transform: rotate(90deg); animation-delay: -0.8s;}.embedLoadingSpinner div:nth-child(5){transform: rotate(120deg); animation-delay: -0.7s;}.embedLoadingSpinner div:nth-child(6){transform: rotate(150deg); animation-delay: -0.6s;}.embedLoadingSpinner div:nth-child(7){transform: rotate(180deg); animation-delay: -0.5s;}.embedLoadingSpinner div:nth-child(8){transform: rotate(210deg); animation-delay: -0.4s;}.embedLoadingSpinner div:nth-child(9){transform: rotate(240deg); animation-delay: -0.3s;}.embedLoadingSpinner div:nth-child(10){transform: rotate(270deg); animation-delay: -0.2s;}.embedLoadingSpinner div:nth-child(11){transform: rotate(300deg); animation-delay: -0.1s;}.embedLoadingSpinner div:nth-child(12){transform: rotate(330deg); animation-delay: 0s;}@keyframes embedLoadingSpinner{0%{opacity: 1;}100%{opacity: 0;}}.embedLoadingDisplay{animation: fadeInAnimation ease 5s; animation-iteration-count: 1; animation-fill-mode: forwards;}@keyframes fadeInAnimation{0%{opacity: 0;}100%{opacity: 1;}}</style> <div id="embedLoadingDisplay" class="embedLoadingDisplay"> <img src="../../icon.png" alt="Icon..."> <div> <div class="embedLoadingSpinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div></div>`;

//Adds content in above variable to given object
function enableLoadingScreen(object) {
    object.innerHTML += loadingHtmlMinified;
}

//Removes content added by enable loading screen
function disableLoadingScreen() {
    document.getElementById("embedLoadingBody").remove();
}

//Replaces loading display with an error message
//message: The title
//details: The subtitle
function displayError(message, details) {
    document.getElementById("embedLoadingDisplay").innerHTML = `<h1 class="embedLoadingError">${message}</h1><p>${details}</p>`;
}

//Gets URL Parameter From Key
//key: The URL Parameter Key (ie key=value)
//validityCheck: Returns false if file doesn't end in validityCheckExtension
//expectedFileExtension: Expected url file extension, returns false if not found
function getUrlParameter(key, validityCheck, validityCheckExtension) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName, i; //Build Page URL
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === key) {
            var returnedUrlParam = sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]); //Get Param Value
            if (validityCheck && returnedUrlParam.split('/').pop().indexOf('.') > -1) { //If check enabled and has a file extension
                if (validityCheckExtension && returnedUrlParam.split('/').pop().indexOf('.') == validityCheckExtension) { //If checkextension on and is true
                    return returnedUrlParam;
                } else if (!validityCheckExtension) return returnedUrlParam; //Return URL Param if check extension is off
                else return false; //If checkextension is on but fails
            } else if (!validityCheck) return returnedUrlParam; //Return URL Param if validity check is off
            else return false; // If validitiy check is on but fails
        }
    }
    return false;
};

//Checks url for 404 or similar
//url: The URL to check
//callback: the code to execute afterwards (stupid async functions)
function brokenUrlCheck(url, callback) {
    fetch(executableUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        })
        .catch(e => { //Url Doesn't Exist Error
            console.log(e);
            displayError(`Error: File Doesn't Exist`, `Given File ${executableUrl ? executableUrl : ""} doesn't exist.`); //Invalid Url
        })
        .then(e => { //If Valid File (Non-404)
            console.log(e.status)
            if (e.status == 200) {
                callback();
            } else {
                displayError(`Error: File Not Found`, `Given File ${executableUrl ? executableUrl : ""} not found.`); //Invalid Url
            }
        })
        .catch(e => { //Callback Error
            console.log(e);
            displayError(`Error:`, `${e ? e : ""}`); //Invalid Url
        });
}

//Checks if path ends in file extention
//pathname: The pathname to check
function isFile(pathname) {
    return pathname.split('/').pop().indexOf('.') > -1;
}