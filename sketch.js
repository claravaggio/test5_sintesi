let rectHeight = 500; // Altezza del rettangolo di sfondo
let rectWidth = 200; // Larghezza del rettangolo centrale
let rectX, rectY; // Posizione del rettangolo di sfondo

let ballY; // Posizione verticale del cerchio
let ballDefaultY; // Posizione centrale neutrale del cerchio
let ballDiameter = 50; // Diametro del cerchio

let counter = 0; // Contatore che funge da tachimetro
let speedIncrease = 0.9; // Velocità di aumento del contatore
let decreaseFactor = 0.1; // Fattore di riduzione del contatore

// Variabili per le auto
let auto1X = 10;
let auto2X = 200;
let auto2Speed = 1.5; // Velocità della seconda auto

let gameOver = false;
let simulationStarted = false;

function preload() {
  img1 = loadImage("assets/car1.png");
  img2 = loadImage("assets/car2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  rectX = width / 2 - 100 - rectWidth / 2; // Centro del rettangolo
  rectY = height / 2 - rectHeight / 2; // Centro verticale

  ballDefaultY = rectY + rectHeight / 2; // Posizione centrale del cerchio
  ballY = ballDefaultY;
}

function draw() {
  if (gameOver) {
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(100);
    text("GAME OVER", width / 2, height / 2 - 100);
    return;
  }

  background(0);
  fill(255, 255, 255);
  rect(0, 0, windowWidth, 80);

  fill(255);
  textSize(50);
  textAlign(LEFT);
  text("5", 20, height - 30);

  // Rettangolo con le cinque zone colorate (zona verde più ampia)
  noStroke();
  fill(255, 0, 0); // Rosso (alto)
  rect(rectX, rectY, rectWidth, rectHeight / 6);
  fill(255, 204, 0); // Giallo (alto)
  rect(rectX, rectY + rectHeight / 6, rectWidth, rectHeight / 6);
  fill(130, 255, 134); // Verde (centrale, più grande)
  rect(rectX, rectY + rectHeight / 3, rectWidth, rectHeight / 3);
  fill(255, 204, 0); // Giallo (basso)
  rect(rectX, rectY + (2 * rectHeight) / 3, rectWidth, rectHeight / 6);
  fill(255, 0, 0); // Rosso (basso)
  rect(rectX, rectY + (5 * rectHeight) / 6, rectWidth, rectHeight / 6);

  // Disegna il cerchio che si muove
  fill(255);
  noStroke();
  ellipse(rectX + rectWidth / 2, ballY, ballDiameter);

  // Auto
  image(img1, auto1X, 10, img1.width / 8, img1.height / 8);
  image(img2, auto2X, 10, img2.width / 8, img2.height / 8);

  if (simulationStarted) {
    auto2X += auto2Speed;
    if (auto2X > width - img2.width / 8) {
      auto2X = width - img2.width / 8;
      auto2Speed = 0;
    }
  }

  // Controllo dell'accelerazione e del freno
  if (keyIsDown(ENTER)) {
    if (!simulationStarted) {
      simulationStarted = true; // Inizia la simulazione con la prima pressione di ENTER
    }
    counter += speedIncrease;
    counter = constrain(counter, 0, 100);
    ballY -= 1.5; // Il cerchio si sposta gradualmente verso l'alto, più velocemente
  } else if (keyIsDown(32)) {
    counter -= decreaseFactor * 3;
    counter = max(counter, 0);
    ballY += 1.7; // Il cerchio si sposta gradualmente verso il basso, più velocemente
  } else {
    counter -= decreaseFactor; // Rallenta automaticamente
    counter = max(counter, 0);

    // Ritorno graduale del cerchio verso la posizione centrale
    if (ballY > ballDefaultY) {
      ballY -= 0.75; // Ritorno al verde centrale, più veloce
    } else if (ballY < ballDefaultY) {
      ballY += 0.75; // Ritorno al verde centrale, più veloce
    }
  }

  // Aggiorna posizione verticale del cerchio
  ballY = constrain(ballY, rectY, rectY + rectHeight);

  // Movimento dell'auto1
  auto1X += map(counter, 0, 100, 0, 5);

  if (auto1X + img1.width / 8 > auto2X) {
    gameOver = true;
  }

  // Mostra il contatore a destra del rettangolo
  textAlign(CENTER, CENTER);
  textSize(180);
  fill(255);
  textFont("aktiv-grotesk");
  textStyle(BOLD);
  text(int(counter), rectX + rectWidth + 150, height / 2);
}
