speed = 9;
size = 15;

function init(){
  x = 0;
  y = 0;
  dx = 1;
  dy = 0;
  snake_length = 1;
  snake_body = ["0_0"];
  food = [];
  food_number = 5;
  setScore();
  setSpeed();
  setSize();
  button = document.getElementById("start_button");
}

function start(){
  init();
  buttonChange();
  document.body.onkeydown = khandle;
  loop = window.setInterval(main, 1000-100*speed);
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
  document.getElementById("table").removeChild(t);
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
  var b = document.getElementsByClassName(name)[0];
  b.style.background = "DodgerBlue";
}

function setGreen(name){
  var g = document.getElementsByClassName(name)[0];
  g.style.background = "limegreen";
}

function setSpeed(){
  document.getElementById("speed").innerHTML = "Speed: " + (speed);
}

function setSize(){
  document.getElementById("size").innerHTML = "Size: " + (size);
}

function setScore(){
  document.getElementById("score").innerHTML = "Score: " + (snake_length-1);
}

function clearField(){
  var c = document.getElementsByClassName("Cell");
  for (var i = 0; i < c.length; i++){
    c[i].style.background = "white";
  }
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
  document.getElementById("table").appendChild(t);
}

function buttonChange(){
  button.value = "Stop";
  button.onclick = stop;
}

function stop(){
  window.clearInterval(loop);
  button.value = "Restart";
  button.onclick = restart;
}

function restart(){
  stop();
  clearField();
  init();
  button.value = "Start";
  button.onclick = start;
}
