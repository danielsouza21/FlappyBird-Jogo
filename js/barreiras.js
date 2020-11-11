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
