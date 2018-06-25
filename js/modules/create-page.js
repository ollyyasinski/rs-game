import { createPlayer, selectElement, chooseLanguage, randomArrayElem, createBattle } from './helpers'
import { Dialogs, dialogActions } from './dialogs'
import { Office } from './offices'
import { SideNav } from './game-settings'
import { languages, offices, soundLevels } from "../variables/arrays";
import { MonsterGenerator } from './monster-generator'
import { Monster } from './monster-object'
import { showSpell } from './show-spell'
import { MONSTER_HEAD_ARRAY, MONSTER_BODY_ARRAY, MONSTER_LEGS_ARRAY } from '../consts/monster_consts'
import { RECEPTION, BOSS_OFFICE } from '../consts/office_consts'

import aQ from '../../assets/questions/attackQuestions.json'
import sQ from '../../assets/questions/shieldQuestions.json'
import hQ from '../../assets/questions/healQuestions.json'

let player, selectedOffice, levelLanguage, monster;
let attackQuestions, shieldQuestions, healQuestions;

let synth = window.speechSynthesis,
  level = 0;

export class createPage {
  constructor() { }
  greeting() {
    let charactersArray = $('.greeting__profile_character-item-wrapper').toArray();
    charactersArray.forEach(div => {
      $(div).click(selectElement);
    })
    $('#startGame').click(new createPage().reception);
  }

  reception() {
    player = createPlayer();
    selectedOffice = RECEPTION;
    $('body').css('overflow', 'hidden');

    let reception = new Office(selectedOffice, 'right'),
      dialogText = new Dialogs().instructions();

    reception.createOffice();
    reception.addHero(player.character, true);

    new SideNav().createSideNav();
    new dialogActions().showTimeoutDialog(dialogText, 100, 'female');

    $('.door-right').click(() => {
      synth.cancel();
      setTimeout(new createPage().level, 1500);
    });

  }

  level() {
    level++;
    levelLanguage = chooseLanguage(languages);
    selectedOffice = randomArrayElem(offices);
    monster = new Monster(level);
    attackQuestions = aQ[levelLanguage];
    shieldQuestions = sQ[levelLanguage];
    healQuestions = hQ[levelLanguage];

    let levelOffice = new Office(selectedOffice, 2),
      monsterPhrase = new Dialogs().selectMonsterPhrase();

    levelOffice.createOffice(level, levelLanguage, player.character);
    levelOffice.addHero(player.character);

    new SideNav().createSideNav(level, levelLanguage);
    new MonsterGenerator($(".monster-head-container"), $(".monster-body-container"), $(".monster-legs-container"), ).generateMonster(MONSTER_HEAD_ARRAY, MONSTER_BODY_ARRAY, MONSTER_LEGS_ARRAY);

    createBattle(level, player, monster);
    new dialogActions().showTimeoutDialog([monsterPhrase], 1000);
    new showSpell().showSpellsCyrcle();
  }
  endGame() {
    level = 'boss',
      selectedOffice = BOSS_OFFICE;

    let bossOffice = new Office(selectedOffice, "left"),
      dialogText = new Dialogs().boss();

    bossOffice.createOffice();
    bossOffice.addHero(player.character);

    new SideNav().createSideNav();
    new dialogActions().showTimeoutDialog([dialogText], 500);
  }
}

export {
  player, monster, level, levelLanguage, attackQuestions, shieldQuestions, healQuestions, selectedOffice, synth
}
