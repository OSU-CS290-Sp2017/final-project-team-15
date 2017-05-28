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
      btn[i].onclick = function(){
          inc(index);
      }
    })(i);
  }
  else{
    (function(index){
      btn[i].onclick = function(){
          dec(index);
      }
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
