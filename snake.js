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
    // robo();
    step();
    gameOver();
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
  }
  if(e.keyCode == 39){
    dy = 1;
    dx = 0;
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
  for (i in food){
    if (head == food[i]){
      snake_length++;
      food.splice(i,1);
    }
  }
}

function setScore(){
  document.getElementById("score").innerHTML = "Score: " + (snake_length-1);
}

function increaseSpeed(){
  if(speed < 9){
    speed++;
  }
  setSpeed();
}

function decreaseSpeed(){
  if(1 < speed){
    speed--;
  }
  setSpeed();
}

function increaseSize(){
  if(size < 15){
    size++;
  }
  setSize();
  document.getElementById("table").removeChild(t);
  createField();
}

function decreaseSize(){
  if(5 < size){
    size--;
  }
  setSize();
  document.getElementById("table").removeChild(t);
  createField();
}

function setSpeed(){
  document.getElementById("speed").innerHTML = "Speed: " + (speed);
}

function setSize(){
  document.getElementById("size").innerHTML = "Size: " + (size);
}

function showSnake(){
  if (snake_length < snake_body.length){
    snake_body.shift();
  }
  for (i in snake_body){
    setBlue(snake_body[i]);
  }
}

function getRandom(){
  return Math.floor(Math.random()*size);
}

function makeFood(){  
  while (food.length < food_number){
    var food_place = getRandom() + "_" + getRandom();
    var infood = false;
    var insnake = false;
    for (i in food){
      if (food_place == food[i]){
        infood = true;
      }
    }
    for (i in snake_body){
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
  for (i in food){
    setGreen(food[i]);
  }
}

function gameOver(){
  for (i in snake_body){
    if (snake_body.length > 2){
        if (snake_body[i-1] == snake_body[snake_body.length-1]){
	      stop();
          alert("Game Over");
	    }
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

function createField(){
  t = document.createElement('table');
  var tbody = document.createElement('tbody');
  for(i=0;i<size;i++) {
    var row = document.createElement('div');
    row.className = "row";
    for (j=0;j<size;j++){
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
