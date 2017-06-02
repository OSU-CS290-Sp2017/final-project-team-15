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

//Add new-post functionality
document.getElementById("new-post-button").addEventListener("click", addPost);
function addPost(event){
  var text = document.getElementById("new-post-input");
  if ((text.value.length == 0) || (text.value.length > 200)){
    alert("Please enter a post between 1 and 200 characters in length.");
  }
  //New div creater to be implemented
}


//Popular button js
var number = document.getElementsByClassName('post-number');
var pp = document.getElementsByClassName('post-content');
var highest = 0;

function popularfunc(){
  for(i = 0; i < pp.length; i++){
  var nn = number[i].getElementsByTagName("input")[0];
  // console.log(nn.value);
  if(nn.value > highest){
    console.log("highest needs to be changed");
    highest = nn;
    i++;
    console.log(highest.value);
  }
  else{
    console.log("dont change highest");
  }

  console.log(i);
}

}
var popular = document.getElementsByClassName("link-popular")[0];
popular.addEventListener('click',popularfunc);
