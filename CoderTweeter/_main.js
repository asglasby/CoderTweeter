﻿// https://codercamptweeter.firebaseio.com/

var tweet = {
    name: "Aisha",
    message: "It is working!"
}

myurl = "https://codercamptweeter.firebaseio.com/.json";
var request = new XMLHttpRequest();
request.open("POST", myurl, true); // Post will send the information to firebase

//the onload is what we want to happen when the request comes base from firebase.
request.onload = function (event) {
    if (this.status >= 200 && this.status < 400) {
        //this is what happens when our request is successful later.
        var data = JSON.parse(this.response); //this will parse my response which will be a key that will be retuned as an object, which can be used.  The key is letting me know how to access my key later.
        console.log(data);
    } else {
        //this is was happens when the request fails
        console.log(this.response);
    }
};
// This lets us know what to do when an error occured.  Either you or the server is offline.
request.onerror = function() {
    //This on error is for when the connection fails
    console.log("Whoops, connection failed!");
}
request.send(JSON.stringify(tweet));//what ever is put inside send is posted to the server.  Since our tweet is an object, the JSON stringify will turn it into a string.  If whatever we are sending is already a string, we do not need to JSON.stringify it.


////GET  REQUEST///////////////////////////////////////////////////////////////////////////////////////////Sample GET REQUEST
var request = new XMLHttpRequest();
request.open("GET", myurl, true); // Post will send the information to firebase

//the onload is what we want to happen when the request comes base from firebase.
request.onload = function (event) {
    if (this.status >= 200 && this.status < 400) {
        //this is what happens when our request is successfullater.
        var data = JSON.parse(this.response); //this will parse my response which will be a key that will be retuned as an object, which can be used.  The key is letting me know how to access my key later.
        //console.log(data);
        //This is what we want to happen when the request is successful.
        //document.getElementById("container").innerHTML = JSON.stringify(data);  // we need to unpack the data that's inside of an object or array.
        for (var propName in data) {
            document.getElementById("container").innerHTML +=
            data[propName]["name"] + ':' + data[propName]["message"] + "<br />";
        }

    } else {
        //this is was happens when the request fails
        console.log(this.response);
    }
};
// This lets us know what to do when an error occured.  Either you or the server is offline.
request.onerror = function () {
    //This on error is for when the connection fails
    console.log("Whoops, connection failed!");
}
request.send();//what ever is put inside send is posted to the server.  Since our tweet is an object, the JSON stringify will turn it into a string.  If whatever we are sending is already a string, we do not need to JSON.stringify it.

