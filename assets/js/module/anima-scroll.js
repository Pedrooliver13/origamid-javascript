import debouce from './debounce.js';

export default class AnimaScroll {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
    this.windowMetade = window.innerHeight * 0.6;

    this.checkDistance = debouce(this.checkDistance.bind(this), 50);
  }

  getDistance() {
    this.distance = [...this.sections].map((item) => {
      const offset = item.offsetTop;

      return {
        element: item,
        offset: Math.floor(offset - this.windowMetade),
      }
    }); 
  }

  checkDistance() {
    this.distance.forEach((section) => {
      if (window.pageYOffset > section.offset){
        section.element.classList.add("ativo");

      } else if (section.element.classList.contains("ativo")) {
        section.element.classList.remove("ativo");
      }
    })
  }

  init() {
    if (this.sections.length){
      this.getDistance();
      this.checkDistance();
      
      window.addEventListener("scroll", this.checkDistance);
    }
  }
  
}
