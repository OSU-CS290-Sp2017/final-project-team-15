var LikeButton = document.getElementById("like-button");
var DisLikeButton = document.getElementById("dislike-button");

//LikeButton.addEventListener('click', inc);
//DisLikeButton.addEventListener('click', dec);

var article = document.getElementsByClassName('post');
var input = document.getElementsByTagName("input");

var btn = document.getElementsByTagName("button");
for(var i = 0; i < btn.length; i++){
  if(i % 2 == 0){
    (function(index){
      btn[i].addEventListener('click', function(){
          inc(index);
      })
    })(i);
  }
  else{
    (function(index){
      btn[i].addEventListener('click', function(){
          dec(index);
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
