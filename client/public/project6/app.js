const c = document.getElementById("myCanvas");
const canvasHeight = c.height;
const canvasWidth = c.width;
const ctx = c.getContext("2d");
let circleX = 160;
let circleY = 60;
let radius = 20;
let xSpeed = 20;
let ySpeed = 20;
let groundHeight = 5;
let groundX = 100;
let groundY = 500;
let brickArray = [];
let count = 0;

c.addEventListener("mousemove", (e) => {
  groundX = e.clientX;
});
class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.visible = true;
    brickArray.push(this);
  }
  draBrick() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  touchingBall(ballX, ballY) {
    return (
      ballX >= this.x - radius &&
      ballX <= this.x + this.width + radius &&
      ballY >= this.y - radius &&
      ballY <= this.y + this.height + radius
    );
  }
}
function getRandomArbitrary(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

//製作所有的brick
for (let i = 0; i < 10; i++) {
  new Brick(getRandomArbitrary(0, 950), getRandomArbitrary(0, 550));
}

function drawCircle() {
  //確認球跟磚塊有沒有撞到
  brickArray.forEach((brick, index) => {
    if (brick.visible && brick.touchingBall(circleX, circleY)) {
      //改變x, y速度並且將brick從brickArray中移除;
      count++;
      brick.visible = false;
      //從下方撞擊
      if (circleY >= brick.y + brick.height) {
        ySpeed *= -1;
      } //從上方撞擊
      else if (circleY <= brick.y) {
        ySpeed *= -1;
      } else if (circleX <= brick.x) {
        xSpeed *= -1;
      } else if (circleX >= brick.x + brick.width) {
        xSpeed *= -1;
      }
      //brickArray.splice(index, 1);
      if (count == 10) {
        alert("遊戲結束!!");
        clearInterval(game);
      }
    }
  });
  // 確認右邊邊界
  if (circleX >= canvasWidth - radius) {
    xSpeed *= -1;
  }
  // 確認左邊邊界
  if (circleX <= radius) {
    xSpeed *= -1;
  }
  // 確認上邊邊界
  if (circleY <= radius) {
    ySpeed *= -1;
  }
  // 確認下邊邊界
  if (circleY >= canvasHeight - radius) {
    ySpeed *= -1;
  }
  //確認球有沒有打到橘色地板
  if (
    circleX >= groundX - radius &&
    circleX <= groundX + 200 + radius &&
    circleY >= groundY - radius &&
    circleY <= groundY + radius
  ) {
    if (ySpeed > 0) {
      circleY -= 40;
      ySpeed *= -1;
    } else {
      circleY += 40;
      ySpeed *= -1;
    }
  }
  // 更動圓的座標
  circleX += xSpeed;
  circleY += ySpeed;

  //畫出黑色背景
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  //畫出所有的brick
  brickArray.forEach((brick) => {
    if (brick.visible) {
      brick.draBrick();
    }
  });
  //劃出可控制地板
  ctx.fillStyle = "orange";
  ctx.fillRect(groundX, groundY, 200, groundHeight);
  //畫出圓球
  ctx.beginPath();
  ctx.arc(circleX, circleY, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();
}
let game = setInterval(drawCircle, 25);
