var LikeButton = document.getElementById("like-button");
var DisLikeButton = document.getElementById("dislike-button");

//LikeButton.addEventListener('click', inc);
//DisLikeButton.addEventListener('click', dec);

var article = document.getElementsByClassName('post');
var input = document.getElementsByTagName("input");

var btn = document.getElementsByTagName("button");

addl();
function addl(){
  for(var i = 0; i < btn.length-1; i++){
    if(i % 2 == 0){
      (function(index){
        btn[i+1].addEventListener('click', function(){
          inc(index);
        })
      })(i);
    }
    else{
      (function(index){
        btn[i+1].addEventListener('click', function(){
          dec(index);
        })
      })(i);
    }
  }
}

function inc(index){
  index = Math.floor(index/2);
  input[index+1].value = Number(input[index+1].value) + 1;
}

function dec(index){
  index = Math.floor(index/2);
  input[index+1].value = Number(input[index+1].value) - 1;
}

function addreverse(){
  for(var i = 0; i < btn.length-1; i++){
    if(i % 2 == 0){
      (function(index){
        btn[i+1].addEventListener('click', function(){
          dec(index);
        })
      })(i);
    }
    else{
      (function(index){
        btn[i+1].addEventListener('click', function(){
          inc(index);
        })
      })(i);
    }
  }
}

document.getElementById("search-input").addEventListener("keyup", liveSearch);

function liveSearch(){

  var input = document.getElementById('search-input').value;
  var post = document.getElementsByClassName('post');
  var par = document.getElementsByClassName('post-content');
  var num = document.getElementsByClassName('post-number');

  for (i = 0; i < par.length+1; i++) {
    var p = par[i].getElementsByTagName("p")[0];
    var n = num[i].getElementsByTagName("input")[0];
    if(p.textContent.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
      n.value.indexOf(input) > -1){
      post[i].style.display = "";
    }
    else{
      post[i].style.display = "none";
      //ar[i].Add();
      //i = i -1;
    }
  }
}

//Allows user to press "ENTER" to add post
function enter(e){
  if(e.keyCode === 13){
    e.preventDefault();
    sendPost();
  }
}

//Add event listener for new post

//Add new post to DOM
function addPost(event){
  var text = document.getElementById("new-post-input");

//Check for a valid input
  if ((text.value.length == 0) || (text.value.length > 200)){
    alert("Please enter a post between 1 and 200 characters in length.");
  }
  else{
    addreverse(); //DONT delete :) (adds arrow function to new posts)
    //Create Container
    var newPostContainer = document.createElement("article");
    newPostContainer.classList.add("post");


    //Create content items
    var text = document.createTextNode(document.getElementById("new-post-input").value + "");
    var newPostContent = document.createElement("div");
    newPostContent.classList.add("post-content");
    var newPostText = document.createElement("p");
    newPostText.classList.add("post-text");
//////////////////////////////////////////////////////////////////////
    var newPostVotes = document.createElement("div");
    newPostVotes.classList.add("votes");
////////////////////////////////////////////////////////////////
    var upVoteButton = document.createElement("button");
    upVoteButton.setAttribute("type", "button");
    upVoteButton.setAttribute("id", "like-button");
    // upVoteButton.setAttribute("i", "");
    upVoteButton.classList.add("fa","fa-chevron-up");

    var newPostUpVote = document.createElement("div");
    newPostUpVote.classList.add("post-icon-up");
///////////////////////////////////////////////////////////////////////
    // var newPostNumberInput = document.createElement("input");

///////////////////////////////////////////////////////////////////////////
    var newPostNumber = document.createElement("div");
    newPostNumber.classList.add("post-number");
    var newPostNumberInput = document.createElement("input");
    newPostNumberInput.setAttribute("type", "text");
    newPostNumberInput.setAttribute("id", "like-number");
    newPostNumberInput.setAttribute("value", "0");
    newPostNumberInput.setAttribute("onfocus", "this.blur()");
    // newPostNumberInput.setAttribute("readonly");
////////////////////////////////////////////////////////////////////////////

    var downVoteButton = document.createElement("button");
    downVoteButton.setAttribute("type", "button");
    downVoteButton.setAttribute("id", "dislike-button");
    downVoteButton.classList.add("fa","fa-chevron-down");
    var newPostDownVote = document.createElement("div");
    newPostDownVote.classList.add("post-icon-down");

////////////////////////////////////////////////////////////////////////////

    newPostVotes.appendChild(newPostUpVote);
    newPostUpVote.appendChild(upVoteButton);


    newPostVotes.appendChild(newPostNumber);
    newPostNumber.appendChild(newPostNumberInput);

    // newPostNumber.appendChild(newPostUpVote);
    newPostVotes.appendChild(newPostDownVote);
    newPostDownVote.appendChild(downVoteButton);
    newPostContainer.appendChild(newPostVotes);

    newPostText.appendChild(text);
    newPostContent.appendChild(newPostText);
    newPostContainer.appendChild(newPostContent);
    // console.log(newPostContainer);
    lastPost = document.getElementsByClassName("post")[0];
    document.getElementsByClassName("post-container")[0].insertBefore(newPostContainer, lastPost);
    addl(); //adds new listener to new posts
    document.getElementById("new-post-input").value = "";
  }
}


//Popular button js
var number = document.getElementsByClassName('post-number');
var pp = document.getElementsByClassName('post-content');
var highest = 0;
var removePosts = document.getElementsByClassName('post');

function popularfunc(){

  for(i = 0; i < pp.length; i++){
  var nn = number[i].getElementsByTagName("input")[0];

  var n = Number(nn.value);

  if(n > highest){

    highest = n;
    var newobject = removePosts[i];
  }

}
for(i = 0; i < pp.length; i++){
  if(removePosts[i] !== newobject){
    removePosts[i].style.display = "none";

  }
  else{
    removePosts[i].style.display = "";
  }
}
popular.removeEventListener('click', popularfunc);
}
var popular = document.getElementsByClassName("link-popular")[0];
popular.addEventListener('click',popularfunc);


// functions for sending stuff to the server //

//make post button talk to server
document.getElementById('new-post-button').addEventListener('click', sendPost);

function sendPost(){
    //set the values for what we're gonna send
    var postContent = document.getElementById('new-post-input').value || '';
    var postVotes = 0;
    console.log("post contnent: ", postContent);
    //if it exists try to store the post and if it fails tell the user
    if(postContent){
        storePost(postContent, postVotes, function(err){
            if(err){
                alert("Unable to make post. Please try again.");
            }else{
                // insert code here to make new post appear
                addPost();
            }
        });
    }else{
        alert("You need to enter some text for the post!");
    }
}

function storePost(content, votes, callback){
    //set up a new XMLHttpRequest to send to server
    var postRequest = new XMLHttpRequest();
    //set the values needed for the post
    postRequest.open('POST', '/post');
    postRequest.setRequestHeader('Content-Type', 'application/json');

    //set up to listen for when server replies
    postRequest.addEventListener('load', function(event){
        var error;
        //if error tell user and don't post
        if(event.target.status !== 200){
            error = event.target.response;
        }
        callback(error);
    });

    //this is the object that were sending to the server
    //it will be in req.body
    var postBody = {
        content: content,
        votes: votes
    };
    console.log("post body: ", postBody);
    postRequest.send(JSON.stringify(postBody)); //send the request
}
