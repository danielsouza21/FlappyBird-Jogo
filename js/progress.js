class Progress {
  constructor() {
    this.element = HTML_newElement("span", "progresso");
    this.refleshPoints = function (point) {
      this.element.innerHTML = point;
    };

    this.refleshPoints(0);
  }
}
