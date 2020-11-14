function HTML_newElement(tagName, className) {
  const elem = document.createElement(tagName);
  elem.className = className;
  return elem;
}

class barreira {
  constructor(reverse = false) {
    this.element = HTML_newElement("div", "barreira");

    const borda = HTML_newElement("div", "borda");
    const corpo = HTML_newElement("div", "corpo");

    this.element.appendChild(reverse ? corpo : borda);
    this.element.appendChild(reverse ? borda : corpo);

    this.setHeight = function (height) {
      corpo.style.height = `${height}px`; //edit CSS attribute
    };
  }
}

class ParDeBarreiras {
  /*
        <div class="par-de-barreiras">
              <div class="barreira">
                  <div class="corpo"></div>
                  <div class="borda"></div>
              </div>
              <div class="barreira">
                  <div class="borda"></div>
                  <div class="corpo"></div>
              /div>
          </div> 
      */

  constructor(height, gap, x) {
    this.height = height;
    this.gap = gap;
    this.x = x;

    this.element = HTML_newElement("div", "par-de-barreiras");

    this.superior = new barreira(true);
    this.inferior = new barreira(false);

    this.sortGap();

    this.element.appendChild(this.superior.element);
    this.element.appendChild(this.inferior.element);

    this.setX(x);
  }

  sortGap() {
    this.SupHeight = Math.random() * (this.height - this.gap);
    this.InfHeight = this.height - this.SupHeight - this.gap;

    this.superior.setHeight(this.SupHeight);
    this.inferior.setHeight(this.InfHeight);
  }

  getX() {
    return parseInt(this.element.style.left.split("px")[0]);
  }
  setX(new_x) {
    this.x = new_x;
    this.element.style.left = `${new_x}px`;
  }
  getLargura() {
    return this.element.clientWidth;
  }
}

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

    this.displacement = 0.75; //velocidade em 'px' do jogo
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
        this.pointNotify();
      }
    });
  };
}
