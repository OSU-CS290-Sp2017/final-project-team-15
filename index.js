var LikeButton = document.getElementById("like-button");
var DisLikeButton = document.getElementById("dislike-button");

//LikeButton.addEventListener('click', inc);
//DisLikeButton.addEventListener('click', dec);

var article = document.getElementsByClassName('post');
var input = document.getElementsByTagName("input");

var btn = document.getElementsByTagName("button");
for(var i = 0; i < btn.length; i++){
  if(i === 0) {var g = 0;}
  if((i - 1) % 2 == 0){
    (function(index){
      btn[i].addEventListener('click', function(){
          inc(index);
      })
    })(i);
  }
  else{
    (function(index){
      btn[i].addEventListener('click', function(){
          dec(index - 1);
      })
    })(i);
  }
}

function inc(index){
  index = Math.floor(index/2);
  input[index].value = Number(input[index].value) + 1;
}

function dec(index){
  index = Math.floor(index/2);
  input[index].value = Number(input[index].value) - 1;
}

/*for(var i = 0; i < input.length; i++){
  console.log(input[i].value);
}*/

document.getElementById("search-input").addEventListener("keyup", liveSearch);

function liveSearch(){

  var input = document.getElementById('search-input').value;
  var post = document.getElementsByClassName('post');
  var par = document.getElementsByClassName('post-content');
  var num = document.getElementsByClassName('post-number');

  for (i = 0; i < par.length; i++) {
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

//Add event listener for new post
document.getElementById("new-post-button").addEventListener("click", addPost);

//Add new post to DOM
function addPost(event){
  var text = document.getElementById("new-post-input");

//Check for a valid input
  if ((text.value.length == 0) || (text.value.length > 200)){
    alert("Please enter a post between 1 and 200 characters in length.");
  }

//Create Container
  var newPostContainer = document.createElement("article");
  newPostContainer.classList.add("post");

//Create voting div items
/*
  var newPostVotes = document.createElement("div");
  newPostVotes.classList.add("votes");

  var upVoteButton = document.createElement("button");
  upVoteButton.classList.add("fa fa-chevron-up");
  upVoteButton.setAttribute("id", "like-button");

  var newPostUpVote = document.createElement("button");
  newPostUpVote.classList.add("post-icon-up");

  var newPostNumberInput = document.createElement("input");
  newPostNumberInput.style...
  newPostNumberInput.value = 20...
  newPostNumberInput.type = text...

  var newPostNumber = document.createElement("div");
  newPostNumber.classList.add("post-number");

  var downVoteButton = document.createElement("button");
  upVoteButton.classList.add("fa fa-chevron-down");
  upVoteButton.setAttribute("id", "dislike-button");

  var newPostDownVote = newPostVotes.createElement("button");
  newPostDownVote.classList.add("post-icon-down");
*/

//Create content items
  var text = document.createTextNode(document.getElementById("new-post-input").value + "");
  var newPostContent = document.createElement("div");
  newPostContent.classList.add("post-content");
  var newPostText = document.createElement("p");
  newPostText.classList.add("post-text");


//Append Children in ascending order
/*
  newPostUpVote.appendChild(upVoteButton);
  newPostVotes.appendChild(newPostUpVote);
  newPostNumber.appendChild(newPostNumberInput);
  newPostVotes.appendChild(newPostNumber);
  newPostUpVote.appendChild(downVoteButton);
  newPostVotes.appendChild(newPostDownVote);
  newPostContainer.appendChild(newPostVotes);
*/

  newPostContent.appendChild(text);
  newPostContainer.appendChild(newPostContent);
  document.getElementsByClassName("post-container")[0].appendChild(newPostContainer);
}
