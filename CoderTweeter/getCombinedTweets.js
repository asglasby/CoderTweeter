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
            getTweetsArray = [];
            for (var propName in data) {
                if (data[propName]["userName"] === userName) {
                    getTweetsArray.push(data[propName]);
                    getTweetsArray.sort(function (a, b) {
                        return b.timeStamp - a.timeStamp
                    });
                }
            }
            var counter = 0;
            while (counter < allUsers.length) {
                if (userName == allUsers[counter]["name"] && allUsers[counter].followers.length > 0) {                    
                    var followerCounter = 0;
                    var myFollowers = allUsers[counter].followers.length;
                    while (followerCounter < myFollowers) {
                        userName = allUsers[counter].followers[followerCounter];
                        for (var propName in data) {
                            if (data[propName]["userName"] === userName) {
                                getTweetsArray.push(data[propName]);
                                getTweetsArray.sort(function (a, b) {
                                    return b.timeStamp - a.timeStamp
                                });
                                
                                document.getElementById("container").innerHTML = "";
                                for (var i = 0; i < getTweetsArray.length; i++) {                              
                                    
                                    document.getElementById("container").innerHTML += "<div class='tweet'> " + getTweetsArray[i]["userName"] + ':' + getTweetsArray[i]["message"] + "<img class='retweet' src='images/retweet.jpg' />" + "<br /> </div>";
                                }
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