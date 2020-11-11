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

      if (par.getX() < par.getLargura()) {
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

class Passaro {
  constructor(gameHeight) {
    //poderia/deveria ser uma class
    this.voando = false;
    this.gameHeight = gameHeight;

    this.element = HTML_newElement("img", "passaro");
    this.element.src = "imgs/passaro.png";
    this.setY(300);

    window.onkeydown = (e) => (this.voando = true);
    window.onkeyup = (e) => (this.voando = false);
  }

  getY() {
    return parseInt(this.element.style.bottom.split("px")[0]);
  }

  setY(new_y) {
    this.element.style.bottom = new_y;
  }

  animar() {
    const newY = this.getY() + (this.voando ? 8 : -5);
    const maxY = this.gameHeight - this.element.clientHeight;

    if (newY <= 0) {
      this.setY(0);
    } else if (newY >= maxY) {
      this.setY(maxY);
    } else {
      this.setY(newY);
    }

    this.setY(this.gameHeight / 2);
    //console.log(this.getY());
  }
}

const barreiras = new PlotBarreiras(700, 1200, 200, 400);
const passaro = new Passaro(700);
const areagame = document.querySelector("[wm-flappy]");
areagame.appendChild(passaro.element);
barreiras.pares.forEach((par) => {
  areagame.appendChild(par.element);
});
setInterval(function () {
  barreiras.animar();
  passaro.animar();
}, 20);
