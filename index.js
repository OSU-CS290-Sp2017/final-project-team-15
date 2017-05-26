var LikeButton = document.getElementById("like-button");
var DisLikeButton = document.getElementById("dislike-button");

//LikeButton.addEventListener('click', inc);
//DisLikeButton.addEventListener('click', dec);


var article = document.getElementsByClassName('post');
var allnumber = document.getElementsByClassName('post-number');
var test = document.getElementsByTagName("input");

var btn = document.getElementsByTagName("button");
for(var i = 0; i < btn.length; i++){
  if(i % 2 == 0){
    console.log(Math.floor(i/2));
    btn[i].addEventListener('click', function(){test[Math.floor(i/2)] = Number(test[Math.floor(i/2)]) + 1;});
    }
  else{
    btn[i].addEventListener('click', dec);
  }
}


function dec(){
  test[0].value = Number(test[0].value) - 1;
}
