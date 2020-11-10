class PlotBarreiras {
  constructor(height, width, gap, space, pointNotify) {
    this.pares = [
      new ParDeBarreiras(height, gap, width),
      new ParDeBarreiras(height, gap, width + space),
      new ParDeBarreiras(height, gap, width + space * 2),
      new ParDeBarreiras(height, gap, width + space * 3),
    ];

    const displacement = 3; //velocidade em 'px' do jogo
    this.animar = function () {
      this.pares.forEach((par) => {
        par.setX(par.getX() - displacement);
      });
    };
  }
}

//const par1 = new ParDeBarreiras(700, 100, 300);
//document.querySelector("[wm-flappy]").appendChild(par1.element);
