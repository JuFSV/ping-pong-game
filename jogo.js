//posiçao inicial e tamanho da bola
let xBola = 300;
let yBola = 200;
let diametro = 20;
let raio = diametro/2;

//velocidade da bola
let velocidadeXBola = 6;
let velocidadeYBola = 6;

//tamanho das raquetes
let raqueteLargura = 10;
let raqueteAltura = 100;

//posiçao inicial das raquetes
let xMinhaRaquete = 5;
let yMinhaRaquete = 150;
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//pontuaçao inicial
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;

function preload(){
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(50, 90, 60);
  bola()
  minhaRaquete();
  //raqueteOponenteMultiplayer() //habilitar se quiser trocar modo do oponente
  raqueteOponenteAuto(); //desabilitar se quiser trocar modo do oponente
  tocarBorda();
  tocarRaquete();
  mostrarPlacar();
  marcarPonto();
  finalJogo();
}

function bola(){
  circle(xBola, yBola, diametro);
  xBola += velocidadeXBola;
  yBola += velocidadeYBola;
}

function minhaRaquete(){
  rect(xMinhaRaquete, yMinhaRaquete, raqueteLargura, raqueteAltura);
  if (keyIsDown(UP_ARROW)){
    yMinhaRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yMinhaRaquete += 10;
  }
}

//modo oponente multiplayer, utilizando teclas W e S
function raqueteOponenteMultiplayer(){
  rect(xRaqueteOponente, yRaqueteOponente, raqueteLargura, raqueteAltura);
  if (keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)){
    yRaqueteOponente += 10;
  }
}

//modo oponente automatico
function raqueteOponenteAuto(){
  rect(xRaqueteOponente, yRaqueteOponente, raqueteLargura, raqueteAltura);
  velocidadeYOponente = yBola - yRaqueteOponente - raqueteAltura / 2 - 30;
  yRaqueteOponente += velocidadeYOponente;
}

function tocarBorda(){
  if (xBola + raio > width || xBola - raio < 0) {
    velocidadeXBola *= -1;
  }
  if (yBola + raio > height || yBola - raio < 0) {
    velocidadeYBola *= -1;
  }
}

function tocarRaquete(){
  if (xBola - raio < xMinhaRaquete + raqueteLargura && yBola - raio < yMinhaRaquete + raqueteAltura && yBola + raio > yMinhaRaquete) {
    velocidadeXBola *= -1;
    raquetada.play();
  }
  if (xBola + raio > xRaqueteOponente && yBola + raio < yRaqueteOponente + raqueteAltura && yBola + raio > yRaqueteOponente) {
    velocidadeXBola *= -1;
    raquetada.play();
  }
}

function mostrarPlacar(){
  textSize(18);
  textAlign(CENTER);
  rect(150, 20, 50, 30);
  text(meusPontos, 175, 40);
  rect(400, 20, 50, 30);
  text(pontosOponente, 425, 40);
}

function marcarPonto(){
  if (xBola > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBola < 10) {
    pontosOponente += 1;
    ponto.play();
  }
}

function finalJogo(){
  if (meusPontos >= 6 || pontosOponente >= 6){
    xBola = 300;
    yBola = 200;
  }
}