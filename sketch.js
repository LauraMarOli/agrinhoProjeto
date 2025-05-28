    
let tela = "menu";
let botaoJogar, botaoRegar, botaoEnviar, botaoReiniciar;
let arvoreAltura = 80;
let arvoreMax = 200;
let frutos = [];
let todosColhidos = false;

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);

  botaoJogar = createButton("🌱 Jogar");
  botaoJogar.position(width / 2 - 50, height / 2);
  botaoJogar.mousePressed(() => {
    tela = "jogo";
    botaoJogar.hide();
    botaoRegar.show();
  });

  botaoRegar = createButton("🌧️ Regar");
  botaoRegar.position(20, height -70);
  botaoRegar.mousePressed(regarArvore);
  botaoRegar.hide();

  botaoEnviar = createButton("🚚 Enviar para a cidade");
  botaoEnviar.position(width / 2 - 100, height / 2 + 60);
  botaoEnviar.mousePressed(() => {
    tela = "opcoes";
    botaoEnviar.hide();
  });
  botaoEnviar.hide();

  botaoReiniciar = createButton("🔁 Jogar de novo");
  botaoReiniciar.position(width / 2 - 70, height / 2 + 50);
  botaoReiniciar.mousePressed(reiniciarJogo);
  botaoReiniciar.hide();
}

function draw() {
  desenharCenario();

  if (tela === "menu") {
    fill(0);
    textSize(28);
    text("🌳 Bem-vindo ao Jogo!", width / 2, height / 2 - 60);
  }

  else if (tela === "jogo") {
    desenharArvore();

    if (arvoreAltura >= arvoreMax && frutos.length === 0) {
      gerarFrutos();
    }

    if (frutos.length > 0) {
      desenharFrutos();
    }

    if (todosColhidos && tela === "jogo") {
      tela = "fim";
      botaoRegar.hide();
    }
  }

  else if (tela === "fim") {
    desenharCaminhao();
    fill(0);
    textSize(22);
    text("🌟 Todos os frutos foram colhidos!", width / 2, 50);
    botaoEnviar.show();
  }

  else if (tela === "opcoes") {
    fill(0);
    textSize(24);
    text("Obrigado por jogar! 🌾", width / 2, height / 2 - 30);
    botaoReiniciar.show();
  }
}

function regarArvore() {
  if (arvoreAltura < arvoreMax) {
    arvoreAltura += 10;
  }
}

function desenharArvore() {
  // Tronco
  stroke(101, 67, 33);
  strokeWeight(18);
  line(width / 2, height - 60, width / 2, height - 60 - arvoreAltura);

  // Copa bonita
  noStroke();
  fill(34, 139, 34);
  let yBase = height - 60 - arvoreAltura;
  ellipse(width / 2, yBase, 100, 120);
  ellipse(width / 2 - 50, yBase + 20, 100, 100);
  ellipse(width / 2 + 50, yBase + 20, 100, 100);
  ellipse(width / 2, yBase - 30, 90, 90);
}

function gerarFrutos() {
  frutos = [];
  for (let i = 0; i < 6; i++) {
    let x = width / 2 + random(-60, 60);
    let y = height - 60 - arvoreAltura + random(-40, 40);
    frutos.push({ x, y, colhido: false });
  }
}

function desenharFrutos() {
  fill(255, 0, 0);
  noStroke();
  todosColhidos = true;

  for (let f of frutos) {
    if (!f.colhido) {
      ellipse(f.x, f.y, 18, 18);
      todosColhidos = false;
    }
  }
}

function mousePressed() {
  if (tela === "jogo" && frutos.length > 0) {
    for (let f of frutos) {
      if (!f.colhido && dist(mouseX, mouseY, f.x, f.y) < 12) {
        f.colhido = true;
      }
    }
  }
}

function desenharCaminhao() {
  // Estrada
  fill(80);
  rect(0, height - 50, width, 50);
  stroke(255);
  strokeWeight(2);
  for (let i = 0; i < width; i += 40) {
    line(i, height - 25, i + 20, height - 25);
  }

  noStroke();

  // Parte traseira
  fill(200, 0, 0);
  rect(120, height - 100, 150, 50);

  // Cabine
  fill(0, 100, 200);
  rect(270, height - 80, 60, 40);
  fill(255);
  rect(285, height - 75, 25, 20); // janela

  // Rodas
  fill(50);
  ellipse(150, height - 40, 30, 30);
  ellipse(290, height - 40, 30, 30);
}

function desenharCenario() {
  // Céu
  background(180, 230, 255);

  // Nuvens
  fill(255);
  noStroke();
  for (let i = 0; i < 3; i++) {
    let x = 100 + i * 180;
    ellipse(x, 80, 60, 40);
    ellipse(x + 20, 70, 50, 30);
    ellipse(x  -20, 70, 50, 30);
  }

  // Árvores de fundo
  for (let i = 0; i < width; i += 100) {
    fill(101, 67, 33);
    rect(i + 30, height - 120, 10, 40);
    fill(50, 160, 60);
    ellipse(i + 35, height - 130, 50, 50);
  }

  // Chão
  fill(4, 120, 35);
  rect(0, height - 90, width, 90);
}
//reinicia o jogo
function reiniciarJogo() {
  tela = "jogo";
  arvoreAltura = 80;
  frutos = [];
  todosColhidos = false;
  botaoReiniciar.hide();
  botaoRegar.show();
}

