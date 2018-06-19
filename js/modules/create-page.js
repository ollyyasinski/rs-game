import { Helpers } from './helpers'
import { Dialogs, dialogActions } from './dialogs'
import { Office } from './offices'
import { SideNav } from './game-settings'
import { languages, offices, soundLevels } from "../variables/arrays"; 
import { MonsterGenerator } from './monster-generator'
import { Monster } from './monster-object'
import { Spells } from './spells'
import { MONSTER_HEAD_ARRAY, MONSTER_BODY_ARRAY, MONSTER_LEGS_ARRAY } from '../consts/monster_consts'

import aQ from '../../assets/questions/attackQuestions.json'
import sQ from '../../assets/questions/shieldQuestions.json'
import hQ from '../../assets/questions/healQuestions.json'

let player, selectedOffice, levelLanguage, monster, taskField, text, description, monstersPhrases, spell, modal;
let attackQuestions, shieldQuestions, healQuestions;

let synth = window.speechSynthesis;
let level = 0;

export class createPage { 
  constructor() { }
  greeting() {
    const characters = document.getElementById('characters');
    Array.from(characters.children).forEach(div => {
      div.addEventListener('click', new Helpers().selectElement)
    });
    const startButton = document.getElementById('startGame');
    startButton.addEventListener('click', new createPage().reception);
  }
  reception() { 
    player = new Helpers().createPlayer();
    document.querySelector('body').style.overflow = 'hidden';
    selectedOffice = offices[0];
    new Office(offices[0], "right").createOffice();
    new SideNav().createSideNav();
    $(".hero-container").addClass(player.character).addClass("hero-container-mirror");
    offices.splice(0, 1);

    let rDoor = document.querySelector('.door-right');
    rDoor.addEventListener('click', function () {
      synth.cancel(); //stops reading
      setTimeout(new createPage().level, 1500);
    });

    setTimeout(function () {
      let dialogText = new Dialogs().instructions();
      new dialogActions().showDialog(dialogText, 'female');
    }, 200);
  }
  level() {
    level++;
    levelLanguage = new Helpers().chooseLanguage(languages);
    selectedOffice = new Helpers().randomArrayElem(offices);
    new Office(selectedOffice, 2).createOffice(level, levelLanguage); 
    new SideNav().createSideNav(level, levelLanguage);

    attackQuestions = aQ[levelLanguage];
    shieldQuestions = sQ[levelLanguage];
    healQuestions = hQ[levelLanguage];

    $(".hero-container").addClass(player.character);
    new MonsterGenerator($(".monster-head-container"), $(".monster-body-container"), $(".monster-legs-container"), ).generateMonster(MONSTER_HEAD_ARRAY, MONSTER_BODY_ARRAY, MONSTER_LEGS_ARRAY );
    monster = new Monster(level);

    taskField = document.getElementById('taskFieldAnswer');
    document.querySelector('.monster-health__wrapper').style.width = `${200 + 20 * level}px`;
    document.querySelector('.hero-health-scale__number').innerHTML = player.health;
    document.querySelector('.monster-health-scale__number').innerHTML = monster.health;
    document.querySelector('.hero-shield__number').innerHTML = player.shield;
    document.querySelector('.monster-shield__number').innerHTML = monster.shield;
    text = document.getElementById('taskText');
    description = document.getElementById('taskDesc');

    monstersPhrases = new Dialogs().monstersPhrasesLevelStart();
    if (level === 5) {
      monstersPhrases = new Dialogs().monstersPhrasesFinal();
    }

    setTimeout(function () {
      let dialogText = new Helpers().randomArrayElem(monstersPhrases);
      new dialogActions().showDialog([dialogText]);
    }, 1000);

    let magic = document.querySelector('.spells');
    Array.from(magic.children).forEach(div => {
      div.addEventListener('click', e => {
        spell = e.target.classList[1];
        if (spell !== 'super') {
          document.querySelector('.spells').classList.toggle('showSpells');
          modal = document.getElementById('taskModal');
          modal.style.display = 'block';
          new Spells()[spell]();
        }
      });
    });
  }
  endGame() {
    level = 'boss';
    selectedOffice = "office-6";
    new Office(selectedOffice, "left").createOffice();
    new SideNav().createSideNav();
    setTimeout(function () {
      let dialogText = new Dialogs().boss();
      new dialogActions().showDialog([dialogText]);
    }, 500);
  }
}

export {
  player, monster, level, spell, levelLanguage, text, description, modal, taskField, attackQuestions, shieldQuestions, healQuestions, selectedOffice
}
