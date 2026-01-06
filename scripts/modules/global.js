export const global = {
  canvas: document.getElementById('gameCanvas'),
  ctx: document.getElementById('gameCanvas').getContext('2d'),
  gravity: 1,
  deltaTime: 0,

  gameTimer: 60,
  gameInterval: null,

  // Pozadia
  menuBackground: new Image(),
  gameBackground: new Image(),
  currentBackground: null,

  // Inicializácia canvasu
  initializeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = 720;
  },

  // Načítanie pozadí
  loadBackgrounds() {
    this.menuBackground.src = "./images/backgroundtest.png";
    this.gameBackground.src = "./images/gameBackground.png";

    this.menuBackground.onload = () => {
      if (!this.currentBackground) {
        this.currentBackground = this.menuBackground;
      }
    };
  },

  // Kreslenie pozadia
  drawBackground() {
    if (!this.currentBackground) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.currentBackground, 0, 0, this.canvas.width, this.canvas.height);
  },

  // Prepnutie na pozadie hry
  switchToGameBackground() {
    this.currentBackground = this.gameBackground;
  },

  // Kreslenie health barov
  drawHealthBars(player1, player2) {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(75, 30, player1.health * 4, 30);
    this.ctx.strokeStyle = 'black';
    this.ctx.strokeRect(75, 30, 400, 30);

    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.canvas.width - 475, 30, player2.health * 4, 30);
    this.ctx.strokeStyle = 'black';
    this.ctx.strokeRect(this.canvas.width - 475, 30, 400, 30);
  },

  // Kreslenie timeru
  drawTimer() {
    this.ctx.fillStyle = 'white';
    this.ctx.font = '30px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`Time: ${this.gameTimer}s`, this.canvas.width / 2, 60);
  },

  // Spustenie timeru
  startTimer() {
    this.gameInterval = setInterval(() => {
      this.gameTimer--;
      if (this.gameTimer <= 0) {
        clearInterval(this.gameInterval);
        alert("Time is up! It's a draw!");
      }
    }, 1000);
  }
};

// Inicializácia
global.initializeCanvas();
global.loadBackgrounds();

// Pri zmene veľkosti okna
window.addEventListener('resize', () => {
  global.initializeCanvas();
});