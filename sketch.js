const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = []; //CRIA A MATRIZ VAZIA 
var cesta;
var score = 0;

function preload() {
  backgroundImg = loadImage("./assets/fundooo.png");
cesta = loadImage("./assets/c.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  //
  cannon = new Cannon(170, 330, 50, 80, angle);
  cesta = new Cesta(940, 120, 120,80)
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);
 
//  problema do  código codigo a mais no pop e push 


  push();
  imageMode(CENTER);
//image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i]);
    collisionWithBoat(i);
  }

  cannon.display();
  cesta.display();

  fill("#6d4c41");
  textSize(40);
  text(`Pontuação: ${score}`, width - 200, 50);
  textAlign(CENTER, CENTER);
}


function collisionWithBoat(index) {
 
    if (balls[index] !== undefined) {
      var collision = Matter.SAT.collides(balls[index].body, cesta.body);

      if (collision.collided) {
          score = score + 5;
        

        Matter.World.remove(world, balls[index].body);
        delete balls[index];
      }
    
  }
}


// FUNÇÃO PARA PRESSEIONAR A SETA E ADD NOVA BALA 
function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}


// MOSTRAR AS BALAS DE CANNON 
function showCannonBalls(ball) {
  if (ball) {
    ball.display();
  } 
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}


