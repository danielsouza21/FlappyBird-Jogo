class Passaro {
  constructor(gameHeight) {
    this.voando = false;
    this.gameHeight = gameHeight;

    this.element = HTML_newElement("img", "passaro");
    this.element.src = "imgs/passaro.png";
    this.setY(300);

    window.onkeydown = (e) => {
      this.voando = true;
    };
    window.onkeyup = (e) => {
      this.voando = false;
    };
  }

  getY() {
    return parseInt(this.element.style.bottom.split("px")[0]);
  }

  setY(new_y) {
    this.element.style.bottom = `${new_y}px`;
  }

  animar() {
    const newY = this.getY() + (this.voando ? 8 : -5);
    const maxY = this.gameHeight.split("px")[0] - this.element.clientHeight;
    if (newY <= 0) {
      this.setY(0);
    } else if (newY >= maxY) {
      this.setY(maxY);
    } else {
      this.setY(newY);
    }
  }
}
