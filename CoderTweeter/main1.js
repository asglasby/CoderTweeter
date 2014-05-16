"use strict";

/* 
    document.getElementById("divtoinsertimage").innerhtml += "<img src='images/stuff

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
    1. array of allUsers - works
    2. An object for each user
    3. Properties - name, url, imagelink

    Functions 
        1. Follow method
        2. tweet method - works
        3. Login method - works
        4. sign up method - works
        4. retweet
        5. Somewhere, use a prototype
     
      Tasks 
        -add a closure on our tweet constructor so users can't change tweet content
        -add a prototype for user constructor so each user has a default profile pic
        -add css
        -
     still to do- follow, retweet, 

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

var userName;
var allUsers = [];
var allUsersObject = {};
var myurl = "https://codercamptweeter.firebaseio.com/.json";
//var keyHolder = [];
var loggedInUser = "";

var Kyle = {
    name: "Kyle",
    image: "images/meerkat.jpg",
    followers:[]
};
var Aisha = {
    name: "Aisha",
    image: "images/meerkat.jpg",
    followers:[]
};
var Christi = {
    name: "Christi",
    image: "images/meerkat.jpg",
    followers:[]
};

allUsers.push(Kyle, Aisha, Christi)

//create a user constructor that will create users as objects
var userPrototype = {
    image: 'images/meerkat.jpg',
};

var CreateUser = function (name) {
    "use strict";
    this.name = name;
    allUsersObject[name] = name;
    image: "images/meerkat.jpg";
};

//create a signup function that calls the createUser constructor and pushes it to the array
var signUp = function () {
    "use strict";
    var newUserName = document.getElementById("signUpName").value;
    var newUser = new CreateUser(newUserName);
    allUsers.push(newUser);
};

// Hiding user home page elements until they log in
document.getElementById("followButton").className = "hide";
document.getElementById("message").className = "hide";
document.getElementById("tweetButton").className = "hide";
document.getElementById("tweetList").className = "hide";
document.getElementById("otherUsers").className = "hide";
document.getElementById("tweetBox").className = "hide";
document.getElementById("followdiv").className = "hide";

// After the user has logged in the Home Page will load with all the available buttons and features
var showHomePage = function () {
    "use strict";
    var found = false;
    userName = document.getElementById("name").value;
    loggedInUser = userName;
        for (var i = 0; i < allUsers.length; i++) {
            if (userName === allUsers[i]["name"]) {
                document.getElementById("header").innerHTML = "Welcome to your tweeter, " + userName + "";
                document.getElementById("followButton").className = "";
                document.getElementById("message").className = "";
                document.getElementById("tweetButton").className = "";
                document.getElementById("tweetList").className = "";
                document.getElementById("otherUsers").className = "";
                document.getElementById("tweetBox").className = "";
                listOtherUsers();
                
                var startElements = document.getElementsByClassName("startPage");
                for (var i = 0; i < startElements.length; i++) {
                    startElements[i].style.display = "none";
                }
                getTweets();
                found = true;
            }
        }
        if (found === false) {
            document.getElementById("contentWrapper").innerHTML += "<p class='startPage'>That account could not be found. Sign up if you have not made an account!</p>";
        }
};

//This is the New Tweet Constructor for the tweets.
var NewTweet = function (userName, message, result) {
    "use strict";
    this["userName"] = userName;
    this["message"] = message;
    this["originalAuthor"] = userName;
    this["timeStamp"] = result;
};

//This array will be used to store new tweets that will be sent to the Firebase server from the array.
var newTweetArray = [];
    
    
// This function will pull the tweets from the Firebase server.
var getTweets = function () {
    "use strict";
    document.getElementById("container").innerHTML = "";
    var request = new XMLHttpRequest();
    
    // Get will send the information to firebase
    request.open("GET", myurl, true);

    //the onload is what we want to happen when the request comes base from firebase.
    request.onload = function (event) {
        if (this.status >= 200 && this.status < 400) {
            //this is what happens when our request is successful later.

            var data = JSON.parse(this.response); //this will parse my response which will be a key that will be retuned as an object, which can be used.  The key is letting me know how to access my key later.
            //console.log(data);
            //This is what we want to happen when the request is successful.
            //document.getElementById("container").innerHTML = JSON.stringify(data);  // we need to unpack the data that's inside of an object or array.
            for (var propName in data) {
                if (data[propName]["userName"] === userName) {
                //We are being given an object of objects. 
                    document.getElementById("container").innerHTML += "<div class='tweet'> " + 
                    data[propName]["userName"] + ':' + data[propName]["message"] + "<button onclick='reTweet(" + JSON.stringify(data[propName]) + ");'>Retweet</button>" + "<br /></div>";
                    //keyHolder.push(propName["userName"], propName["message"]);
                }
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


//to retweet, I could make another sendTweet call. I need to pass it the object and add it an original author property

var reTweet = function (tweetToRetweet) {

    tweetToRetweet["userName"] = loggedInUser;

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
    request.send(JSON.stringify(tweetToRetweet));//what ever is put inside send is posted to the server.  Since our tweet is an object, the JSON stringify will turn it into a string.  If whatever we are sending is already a string, we do not need to JSON.stringify it.
};

var sendTweet = function () {
    "use strict";
    if (!Date.now) {
        Date.now = function now() {
            return new Date().getTime();
        };
    }
    var result = Date.now();

    //username = this.username;
    var message = document.getElementById("message").value;
    var tweet = new NewTweet(userName, message, result);

    //this will later be pulled out to store and send all new tweets instead of using session storage for new tweets.
    var arrayCounter;

    var request = new XMLHttpRequest();
    request.open("POST", myurl, true); // Post will send the information to firebase

    // the onload is what we want to happen when the request comes base from firebase.
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

    newTweetArray.push(tweet);
    //alert(JSON.stringify(newTweetArray));
    //sendTweetPost();
};

//var sendTweetPost = function () {
//    "use strict";
    
//    var request = new XMLHttpRequest();
//    request.open("POST", myurl, true); // Post will send the information to firebase

//    // the onload is what we want to happen when the request comes base from firebase.
//    request.onload = function (event) {
//        if (this.status >= 200 && this.status < 400) {
//            //this is what happens when our request is successful later.
//            var data = JSON.parse(this.response); //this will parse my response which will be a key that will be retuned as an object, which can be used.  The key is letting me know how to access my key later.
//            console.log(data);
//        } else {
//            //this is was happens when the request fails
//            console.log(this.response);
//        }
//        getTweets();
//    };
//    // This lets us know what to do when an error occured.  Either you or the server is offline.
//    request.onerror = function () {
//        //This on error is for when the connection fails
//        console.log("Whoops, connection failed!");
//    }
//    request.send(JSON.stringify(newTweetArray));//what ever is put inside send is posted to the server.  Since our tweet is an object, the JSON stringify will turn it into a string.  If whatever we are sending is already a string, we do not need to JSON.stringify it.

//};
   
var follow = function () {
    "use strict";
    document.getElementById("container").innerHTML = "";
    for(var j = 0; j < allUsers.length; j++){
        if (loggedInUser == allUsers[j]["name"]) {
            allUsers[j].followers.push(userName);
        }      
    }
    document.getElementById("header").innerHTML = loggedInUser + "'s Tweeter, Page";
    var startElements = document.getElementsByClassName("startPage");
    for (var i = 0; i < startElements.length; i++) {
        startElements[i].style.display = "none";
    }
    document.getElementById("followdiv").innerHTML = "";
    //getTweets();
    getCombinedTweets();
};

//This function will list the other users on or firebase database.  
///*******************will adjust the code to only list people we are not following
var listOtherUsers = function () {
    "use strict";
    document.getElementById("otherUsersTitle").innerHTML = "Other Twitter Users";               

    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i]['name']!== userName) {
            document.getElementById("otherUsersTitle").innerHTML += '<li id="usr' + i + '" onclick="otherUserPage(\'usr' + i + '\');">' + allUsers[i]['name'] + '</li>';
        }       
    }
};

var otherUserPage = function (usrId) {
    "use strict";
    document.getElementById("followdiv").className = "";
    userName = document.getElementById(usrId).innerHTML;
    document.getElementById("header").innerHTML = "Welcome to " + userName + "'s page, " + loggedInUser + " is still logged in.";
    var startElements = document.getElementsByClassName("startPage");
    for (var i = 0; i < startElements.length; i++) {
        startElements[i].style.display = "none";
    }
    document.getElementById("tweetBox").innerHTML = "";
    document.getElementById("followdiv").innerHTML = '<button id="followButton" onclick="follow();">Follow</button>';
    getTweets();
};

var getCombinedTweets = function () {
    "use strict";
    
    var request = new XMLHttpRequest();
    
    request.open("GET", myurl, true); // Post will send the information to firebase
    //the onload is what we want to happen when the request comes base from firebase.
    request.onload = function (event) {
        if (this.status >= 200 && this.status < 400) {
            //this is what happens later if our request is successful.
            var data = JSON.parse(this.response); //this will parse my response which will be a key that will be retuned as an object, which can be used.  The key is letting me know how to access my key later.
            userName = loggedInUser;            
            for (var propName in data) {            
                if (data[propName]["userName"] === userName) {
                    document.getElementById("container").innerHTML += "<div class='tweet'> " + 
                    data[propName]["userName"] + ':' + data[propName]["message"] + "<img class='retweet' src='images/retweet.jpg'/>" + "<br /></div>";                    
                }
            }
            var counter = 0;
            while (counter < allUsers.length) {
                if (userName == allUsers[counter]["name"] && allUsers[counter].followers.length > 0){                
                    var followerCounter = 0;
                    var myFollowers = allUsers[counter].followers.length;
                    while (followerCounter < myFollowers) {
                        userName = allUsers[counter].followers[followerCounter];
                        for (var propName in data) {
                            if (data[propName]["userName"] === userName) {
                                document.getElementById("container").innerHTML += "<div class='tweet'> " +
                                data[propName]["userName"] + ':' + data[propName]["message"] + "<img class='retweet' src='images/retweet.jpg'/>" + "<br /></div>";
                            }
                        }
                        followerCounter++
                    }
                }
                counter++;
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