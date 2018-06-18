import { monster, player, createPage } from './create-page';
import { Dialogs, dialogActions } from './dialogs'
import { Door } from './door';
import { Helpers } from './helpers'
import { SideNav } from './game-settings'

let lose;

export class levelResults {
  constructor() { }
  win() {
    player.levelPass++;
    player.health = 100;
    player.shield = 0;
    player.super = 0;

    localStorage.setItem(player.name, player.levelPass);
    document.querySelector('.level__caption').innerHTML = "Congratulations!";

    let monstersPhrases = new Dialogs().monstersPhrasesLevelWin();
    setTimeout(function () {
      let dialogText = new Helpers().randomArrayElem(monstersPhrases);
      new dialogActions().showDialog([dialogText]);
    }, 500);

    new Door($(".door-right")).openDoor();
    document.querySelector('.door-right').addEventListener('click', function () { setTimeout(new createPage().level, 1500); });
    new Door($(".door-left")).openDoor();
    document.querySelector('.door-left').addEventListener('click', function () { setTimeout(new createPage().level, 1500); });
  }
  lose() {
    lose = true;
    localStorage.setItem(player.name, player.levelPass);

    let monstersPhrases = new Dialogs().monstersPhrasesLevelLose();
    setTimeout(function () {
      let dialogText = new Helpers().randomArrayElem(monstersPhrases);
      new dialogActions().showDialog([dialogText]);
    }, 500);
  }
  winGame() {
    document.querySelector('.level__caption').innerHTML = "Congratulations!";
    player.levelPass++;
    localStorage.setItem(player.name, player.levelPass);

    setTimeout(function () {
      let dialogText = new Dialogs().monstersPhrasesWinFinal();
      new dialogActions().showDialog([dialogText]);
    }, 500);

    new Door($(".door-right")).openDoor();
    document.querySelector('.door-right').addEventListener('click', function () { setTimeout(new createPage().endGame, 1500); });
    new Door($(".door-left")).openDoor();
    document.querySelector('.door-left').addEventListener('click', function () { setTimeout(new createPage().endGame, 1500); });

  }
}

export { lose }
