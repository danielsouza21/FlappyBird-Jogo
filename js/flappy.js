class FlappyBird_Game {
  constructor() {
    let pontos = 0;

    const areagame = document.querySelector("[wm-flappy]"); //Get game window

    //Get all properties CSS of game window and save the height/width of game
    const flappy_style = window.getComputedStyle(areagame);
    var GameHeight = parseInt(
      flappy_style.getPropertyValue("height").split("px")[0]
    );
    var GameWidth = parseInt(
      flappy_style.getPropertyValue("width").split("px")[0]
    );

    //Create elements
    this.barreiras = new PlotBarreiras(GameHeight, GameWidth, 250, 400, () =>
      this.progress.refleshPoints(++pontos)
    ); //barreiras.js
    this.passaro = new Passaro(GameHeight); //passaro.js
    this.progress = new Progress(); //progress.js

    //Insert elements at game area
    areagame.appendChild(this.passaro.element);
    areagame.appendChild(this.progress.element);
    this.barreiras.pares.forEach((par) => {
      areagame.appendChild(par.element);
    });
  }

  start = function () {
    const barreiras = this.barreiras;
    const passaro = this.passaro;

    const timer = setInterval(function () {
      barreiras.animar();
      passaro.animar();
      if (Collided(passaro, barreiras)) {
        clearInterval(timer);
        console.log("stop");
      }
    }, 5);
  };
}

function Overlap(elementA, elementB) {
  let a = elementA.getBoundingClientRect();
  let b = elementB.getBoundingClientRect();

  //A direito >= B esquerdo e B direito >= A esquerdo
  const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left;
  const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top;
  return horizontal && vertical;
}

function Collided(passaro, barreiras) {
  var collided = false;
  barreiras.pares.forEach((par_de_barreiras) => {
    if (!collided) {
      const superior = par_de_barreiras.superior.element; //cano superior
      const inferior = par_de_barreiras.inferior.element; //cano inferior

      let collided_sup = Overlap(passaro.element, superior);
      let collided_inf = Overlap(passaro.element, inferior);

      if (collided_sup || collided_inf) {
        collided = true; //return true;
      }
    }
  });

  return collided; //return false
}

const FlappyBird = new FlappyBird_Game();
FlappyBird.start();
