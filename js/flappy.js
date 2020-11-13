class PlotBarreiras {
  constructor(height, width, gap, space, pointNotify) {
    this.space = space;
    this.height = height;
    this.width = width;
    this.gap = gap;
    this.pointNotify = pointNotify;

    this.pares = [
      new ParDeBarreiras(height, gap, width),
      new ParDeBarreiras(height, gap, width + space),
      new ParDeBarreiras(height, gap, width + space * 2),
      new ParDeBarreiras(height, gap, width + space * 3),
    ];

    this.displacement = 3; //velocidade em 'px' do jogo
    this.animar();
  }

  animar = function () {
    //atualiza cada barreira
    this.pares.forEach((par) => {
      par.setX(par.getX() - this.displacement);

      if (par.getX() < par.getLargura() - 50) {
        par.setX(par.getX() + this.space * this.pares.length);
        par.sortGap();
      }

      const meio = this.width / 2;
      if (par.getX() + this.displacement >= meio && par.getX() <= meio) {
        //pointNotify();
      }
    });
  };
}

const divFlappy = window.getComputedStyle(
  document.querySelector("[wm-flappy]")
);
var GameHeight = divFlappy.getPropertyValue("height");

const barreiras = new PlotBarreiras(800, 1200, 200, 400);
const passaro = new Passaro(GameHeight);
const areagame = document.querySelector("[wm-flappy]");
areagame.appendChild(passaro.element);
barreiras.pares.forEach((par) => {
  areagame.appendChild(par.element);
});
setInterval(function () {
  barreiras.animar();
  passaro.animar();
}, 20);
