let lastRenderTime = 0;
const SnakeSpeed = 6;

let game = document.getElementById("game");

function main(carrentTime) {
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (carrentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SnakeSpeed) return;
  lastRenderTime = carrentTime;
  SnakeControll();
  SnakeAfterControll();
}
const Snakemove = [
  { x: 11, y: 11 },
  { x: 12, y: 11 },
  { x: 13, y: 11 },
  { x: 14, y: 11 },
  { x: 15, y: 11 },
  { x: 16, y: 11 },
  { x: 17, y: 11 },
];

function SnakeControll() {
  for (i = Snakemove.length - 2; i >= 0; i--) {
    Snakemove[i + 1] = { ...Snakemove[i] };
  }

  window.addEventListener("keydown", (e) => {
    inputDirection = { x: 0, y: 0 };

    switch (e.key) {
      case "ArrowUp":
        //if (Snakemove[0].x !== 0) break;
        inputDirection = { x: -1, y: 0 };
        //Snakemove[0].x += 1;
        //Snakemove[0].y += 0;
        break;
      case "ArrowDown":
        // if (lastInputDirection.y !== 0) break;
        inputDirection = { x: 1, y: 0 };
        //Snakemove[0].x += -1;
        //Snakemove[0].y += 0;
        break;
      case "ArrowLeft":
        //  if (lastInputDirection.x !== 0) break;
        inputDirection = { x: 0, y: -1 };
        //Snakemove[0].x += 0;
        //Snakemove[0].y += 1;
        break;
      case "ArrowRight":
        //  if (lastInputDirection.x !== 0) break;
        inputDirection = { x: 0, y: 1 };
        //Snakemove[0].x += 0;
        //Snakemove[0].y += -1;
        break;
    }
  });

  Snakemove[0].x += inputDirection.x;
  Snakemove[0].y += inputDirection.y;
  if (
    (Snakemove[0].x > 21) |
    (Snakemove[0].x < 0) |
    (Snakemove[0].y > 21) |
    (Snakemove[0].y < 0)
  ) {
    document.getElementById("GameOver").style.display = "block";
    setTimeout(() => {
      document.location.reload();
    }, 5000);
    return;
  }
}
let foodGR = {
  x: Math.floor(Math.random() * (20 - 0 + 0)) + 0,
  y: Math.floor(Math.random() * (20 - 0 + 0)) + 0,
};

//var intervalID = window.setInterval(myCallback, 10000);

function myCallback() {
  setTimeout(() => {
    foodGR = {
      x: Math.floor(Math.random() * (20 - 0 + 0)) + 0,
      y: Math.floor(Math.random() * (20 - 0 + 0)) + 0,
    };
  }, 10);
}
function SnakeAfterControll() {
  for (let i = 0; i < Snakemove.length; i++) {
    if ((foodGR.x === Snakemove[i].x) & (foodGR.y === Snakemove[i].y)) {
      console.log("SnakeEatTheFood");
      foodGR = {
        x: Math.floor(Math.random() * (20 - 0 + 0)) + 0,
        y: Math.floor(Math.random() * (20 - 0 + 0)) + 0,
      };
      let LastSnake = Snakemove.slice(-1);
      Snakemove.push({ x: LastSnake.x + 1, y: LastSnake.y + 1 });
      Snakemove.push({ x: LastSnake.x + 2, y: LastSnake.y + 2 });
      //Snakemove.push({ x: LastSnake.x + 3, y: LastSnake.y + 3 });
    }
  }

  game.innerHTML = "";
  Snakemove.forEach((e) => {
    for (let j = 0; j < Snakemove.length - 1; j++) {
      if (
        (Snakemove[0].x === Snakemove[j + 1].x) &
        (Snakemove[0].y === Snakemove[j + 1].y)
      ) {
        document.getElementById("GameOver").style.display = "block";
        setTimeout(() => {
          document.location.reload();
        }, 5000);
        return;
      }
    }
    const SnakeBody = document.createElement("div");
    SnakeBody.style.gridRowStart = e.x;
    SnakeBody.style.gridColumnStart = e.y;
    SnakeBody.classList.add("Snake");
    game.appendChild(SnakeBody);
  });
  const food = document.createElement("div");
  food.style.gridRowStart = foodGR.x;
  food.style.gridColumnStart = foodGR.y;
  food.classList.add("food");
  game.appendChild(food);
}

window.requestAnimationFrame(main);
