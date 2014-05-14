// https://codercamptweeter.firebaseio.com/

/* 
    1. show a user and their messages/profile pic
        a. display log in page
            1. input text field for username and go button
                a. Check to see if the userame entered is equal to a username in an array of usernames

        b. Each user would have an object
            a. properties like name, url, link to their image
            b. 
    2. add input for a user to add messages to their feed
    3. For other users not logged in then only their tweets and follow button
    4. Make the follow button add their messages to your list of messages.


    Chain of information
    1. array of usernames 
    2. An object for each user
    3. Properties - name, url, imagelink

    Functions 
        1. Follow method
        2. tweet method
        3. Login method - made an initial log in method
        4. retweet
        5. Somewhere, use a prototype
      

*/
//var tweet = document.getElementById().value + 

//An array meant to hold all the usernames for our app. Right now its holding strings, I need to change that to objects. 
/*
var allUsers = [];

var Kyle = {
    name: "Kyle"
};
var Aisha = {
    name: "Aisha""
};
var Christi = {
    name: "Christi"
};

allUsers.push(Kyle, Aisha, Christi);
*/
var allUsers = [];
var Kyle = {
    name: "Kyle"
};
var Aisha = {
    name: "Aisha"
};
var Christi = {
    name: "Christi"
};

allUsers.push(Kyle, Aisha, Christi)


//create a user constructor that will create users as objects
var createUser = function (name) {
    this.name = name;
};

//create a signup function that calls the createUser constructor and pushes it to the array
var signUp = function () {
    allUsers.push(createUser(document.getElementById("signUpName").value));
};
var userName;


// Hiding user home page elements until they log in
document.getElementById("followButton").className = "hide";
document.getElementById("message").className = "hide";
document.getElementById("tweetButton").className = "hide";
document.getElementById("tweetList").className = "hide";

var showHomePage = function () {

    var found = false;
    userName = document.getElementById("name").value;
        for (var i = 0; i < allUsers.length; i++) {
            if (userName === allUsers[i]["name"]) {
                document.getElementById("header").innerHTML = "Welcome to your tweeter, " + userName + "";
                document.getElementById("followButton").className = "";
                document.getElementById("message").className = "";
                document.getElementById("tweetButton").className = "";
                document.getElementById("tweetList").className = "";

                var startElements = document.getElementsByClassName("startPage");
                for (var i = 0; i < startElements.length; i++) {
                    startElements[i].style.display = "none";
                }
                found = true;
            }
        }
        if (found === false) {
            document.getElementById("contentWrapper").innerHTML += "<p class='startPage'>That account could not be found. Sign up if you have not made an account!</p>";
        }
};

//var tweet = {
//    name: "Aisha",
//    message: "I'm Working with Kyle and Christi!"
//}
//var tweet = document.getElementById().value + 

myurl = "https://codercamptweeter.firebaseio.com/.json";
var keyHolder = [];

var NewTweet = function (userName, message) {
    this["userName"] = userName;
    this["message"] = message;
};

var getTweets = function () {
    
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

            //for (var propName in data) {
            //    document.getElementById("container").innerHTML += propName + "<br />";
            //    keyHolder.push(propName);

            //}
            //alert(keyHolder);

            for (var propName in data) {
                document.getElementById("container").innerHTML +=
                data[propName]["userName"] + ':' + data[propName]["message"] +  "<br />";
                data[propName]["userName"] + ':' + data[propName]["message"] + "<br />";
                keyHolder.push(propName["userName"], propName["message"]);
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

};

var sendTweet = function () {
    //username = this.username;
    message = document.getElementById("message").value;
    var tweet = new NewTweet(userName, message);

//    tweet = document.getElementById("message").value;
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
        getTweets();
    };
    // This lets us know what to do when an error occured.  Either you or the server is offline.
    request.onerror = function () {
        //This on error is for when the connection fails
        console.log("Whoops, connection failed!");
    }
    request.send(JSON.stringify(tweet));//what ever is put inside send is posted to the server.  Since our tweet is an object, the JSON stringify will turn it into a string.  If whatever we are sending is already a string, we do not need to JSON.stringify it.

    
};

document.getElementById("container").innerHTML = keyHolder;
