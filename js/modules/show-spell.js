export class showSpell {
  constructor() { }
  attack(who) {
    let wrapper = document.querySelector(`.${who}-spell-vis`);
    let image = document.querySelector(`.${who}-spell-image`);
    wrapper.style.width = '140px';
    wrapper.style.height = '140px';
    wrapper.style.left = document.querySelector(`.${who}-container`).offsetWidth / 2 - 70 + 'px';
    image.style.display = 'block';
    image.src = '~/../assets/img/spells/Exattack.png';
    image.style.width = '1200%';
    image.style.height = '100%';

    let attack = setInterval(() => {
      let now = parseInt(image.style.left) || 0;
      image.style.left = now - 100 + '%';
    }, 50);

    setTimeout(function () {
      clearInterval(attack);
      image.style.display = 'none';
      image.style.left = 0;
      image.style.top = 0;
    }, 500);
  }
  shield(who) {
    let wrapper = document.querySelector(`.${who}-spell-vis`);
    let image = document.querySelector(`.${who}-spell-image`);
    wrapper.style.width = '150px';
    wrapper.style.height = '160px';
    wrapper.style.left = document.querySelector(`.${who}-container`).offsetWidth / 2 - 75 + 'px';
    image.style.display = 'block';
    image.src = '~/../assets/img/spells/Exshield.png';
    image.style.width = '1048px';
    image.style.height = '472px';

    let shield = setInterval(() => {
      let now = parseInt(image.style.left) || 0;

      if (now === -900) {
        let top = parseInt(image.style.top) || 0;
        image.style.top = top - 160 + 'px';
        now = 150;
      }
      image.style.left = now - 150 + 'px';
    }, 100);

    setTimeout(function () {
      clearInterval(shield);
      image.style.display = 'none';
      image.style.left = 0;
      image.style.top = 0;
    }, 1900);
  }
  heal(who) {
    let wrapper = document.querySelector(`.${who}-spell-vis`);
    let image = document.querySelector(`.${who}-spell-image`);
    wrapper.style.width = '215px';
    wrapper.style.height = '220px';
    wrapper.style.left = document.querySelector(`.${who}-container`).offsetWidth / 2 - 108 + 'px';
    image.style.display = 'block';
    image.src = '~/../assets/img/spells/Exheal.png';
    image.style.width = '870px';
    image.style.height = '673px';


    let heal = setInterval(() => {
      let now = parseInt(image.style.left) || 0;

      if (now === -645) {
        let top = parseInt(image.style.top) || 0;

        image.style.top = top - 220 + 'px';
        now = 215;
      }
      image.style.left = now - 215 + 'px';
    }, 100);
    setTimeout(function () {
      clearInterval(heal);
      image.style.display = 'none';
      image.style.left = 0;
      image.style.top = 0;
    }, 1000);
  }
}