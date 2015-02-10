function init(){
  x = 0;
  y = 0;
  dx = 1;
  dy = 0;
  snake_length = 1;
  snake_body = ["0_0"];
  food = [];
  food_number = 3;
}


function start(){
  init();
  buttonChange();
  document.body.onkeydown = khandle;
  loop = window.setInterval(function(){
    makeFood();
    clearField();
    showFood();
    showSnake();
    // robo();
    x = x + dx;
    y = y + dy;
    step(x,y);
  }, 500);
}

function robo(){
  if (x<5){
    x++;
  }
  else{
    y++;
  }
}

function khandle(e) {
  if(e.keyCode == 37){
    dy = -1;
    dx = 0;
  };
  if(e.keyCode == 39){
    dy = 1;
    dx = 0;
  };
  if(e.keyCode == 38){
    dx = -1;
    dy = 0;
  };
  if(e.keyCode == 40){
    dx = 1;
    dy = 0;
  };
}

function step(x,y){
  var head = x + "_" + y;
  snake_body.push(head);
  for (i = 0; i < food.length; i++){
    if (head == food[i]){
      snake_length++;
      food.splice(i,1);
    };
  };
}

function showSnake(){
  if (snake_length < snake_body.length){
    snake_body.shift();
  }
  for (i=0; i < snake_body.length; i++){
    setBlue(snake_body[i]);
  }
}

function makeFood(){
  function getRandom(){return Math.round(Math.random()*10);}
  while (food.length < food_number){
    var foodPlace = getRandom() + "_" + getRandom();
    for (i=0; i < snake_body.length; i++){
      if (foodPlace != snake_body[i]){
        food.push(foodPlace);
      };
    };
  };
}

function showFood(){
  for (i=0; i < food.length; i++){
    setGreen(food[i]);
  }
}

function gameOver(){
  window.clearInterval(loop);
  alert("Game Over");
}

function setBlue(name){
  var b = document.getElementsByClassName(name)[0];
  b.style.background = "blue";
}

function setGreen(name){
  var g = document.getElementsByClassName(name)[0];
  g.style.background = "green";
}

function removeColor(name){
  var r = document.getElementsByClassName(name)[0];
  r.style.background = "white";
}

function clearField(){
  var c = document.getElementsByClassName("Cell");
  for (i=0; i<c.length; i++){
    var cel = c[i];
    cel.style.background = "white";
  };
}

function buttonChange(){
  var button = document.getElementsByClassName("start_button")[0];
  button.value = "Stop";
  button.onclick = stop;
  var rbutton = document.getElementsByClassName("restart_button")[0];
  rbutton.style.visibility = "visible";
}

function stop(){
  window.clearInterval(loop);
  var button = document.getElementsByClassName("start_button")[0];
  button.value = "Stoped";
}

function restart(){
  stop();
  clearField();
  init();
  var button = document.getElementsByClassName("start_button")[0];
  button.value = "Start";
  button.onclick = start;
  var rbutton = document.getElementsByClassName("restart_button")[0];
  rbutton.style.visibility = "hidden";
}
