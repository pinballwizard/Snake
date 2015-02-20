speed = 1;
size = 10;
food_number = 5;

function init(){
  x = 0;
  y = 0;
  dx = 1;
  dy = 0;
  snake_length = 1;
  snake_body = ["0_0"];
  food = [];
  setScore();
  setSpeed();
  setSize();
  button = $("#start_button")[0];
}

function start(){
  init();
  buttonChange();
  document.body.onkeydown = khandle;
  loop = window.setInterval(main, 500-50*speed);
}

function main(){
    makeFood();
    clearField();
    showFood();
    showSnake();
    setScore();
    setSpeed();
    step();
    gameOver();
}

function khandle(e) {
  if(e.keyCode == 37){
    dx = 0;
    dy = -1;
  }
  if(e.keyCode == 39){
    dx = 0;
    dy = 1;
  }
  if(e.keyCode == 38){
    dx = -1;
    dy = 0;
  }
  if(e.keyCode == 40){
    dx = 1;
    dy = 0;
  }
}

function step(){
  x = x + dx;
  y = y + dy;
  if (x < 0){
    x = size-1;
  }
  if (y < 0){
    y = size-1;
  }
  if (x > size-1){
    x = 0;
  }
  if (y > size-1){
    y = 0;
  }
  var head = x + "_" + y;
  snake_body.push(head);
  for (var i in food){
    if (head == food[i]){
      snake_length++;
      food.splice(i,1);
    }
  }
  if (snake_length < snake_body.length){
    snake_body.shift();
  }
}

function changeSpeed(x){
  speed += x;
  if(speed < 1 || speed > 9){
    speed -= x;
  }
  setSpeed();
}

function changeSize(x){
  size += x;
  if(size < 5 || size > 15){
    size -= x;
  }
  setSize();
  $("#table").remove(t);
  createField();
}

function showSnake(){
  snake_body.forEach(setBlue);
}

function getRandom(){
  return Math.floor(Math.random()*size);
}

function makeFood(){  
  while (food.length < food_number){
    var food_place = getRandom() + "_" + getRandom();
    var infood = false;
    var insnake = false;
    for (var i in food){
      if (food_place == food[i]){
        infood = true;
      }
    }
    for (var i in snake_body){
      if (food_place == snake_body[i]){
        insnake = true;
      }
    }
    if ((infood == false) && (insnake == false)){
      food.push(food_place);
    }
  }
}

function showFood(){
  food.forEach(setGreen);
}

function gameOver(){
  var l = snake_body[snake_body.length-1];
  for (var i in snake_body){
    if (snake_body[i-1] == l){
	  stop();
      alert("Game Over");
	}
  }
}

function setBlue(name){
  $("."+name).removeClass("empty");
  $("."+name).removeClass("food");
  $("."+name).addClass("snake");
}

function setGreen(name){
  $("."+name).removeClass("empty");
  $("."+name).removeClass("snake");
  $("."+name).addClass("food");
}

function setSpeed(){
  $("#speed").text("Speed : " + (speed));
}

function setSize(){
  $("#size").text("Size : " + (size));
}

function setScore(){
  $("#score").text("x " + (snake_length-1));
}

function clearField(){
  $(".cell").removeClass("food");
  $(".cell").removeClass("snake");
  $(".cell").addClass("empty");
}

function createField(){
  t = document.createElement('table');
  var tbody = document.createElement('tbody');
  for(var i = 0; i < size; i++) {
    var row = document.createElement('div');
    row.className = "row";
    for (var j = 0; j < size; j++){
      var cell = document.createElement('div');
      cell.className = "cell "+i+"_"+j;
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
  t.appendChild(tbody);
  $("#table").append(t);
}

function buttonChange(){
  $("#start_button").val("Stop");
  button.onclick = stop;
}

function stop(){
  window.clearInterval(loop);
  $("#start_button").val("Restart");
  button.onclick = restart;
}

function restart(){
  stop();
  clearField();
  init();
  $("#start_button").val("Start");
  button.onclick = start;
}
