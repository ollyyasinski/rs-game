import { chooseLanguage, randomArrayElem, createBattle } from '../../components/helpers/helpers';
import { Dialogs, dialogActions } from '../../components/dialogs/dialogs';
import { Office } from '../../components/office/office';
import { SideNav } from '../../components/gameSettings/gameSettings';
import { languages, offices } from "./consts/levelConsts";
import { MonsterGenerator } from '../../components/monster-generator/monsterGenerator';
import { Monster } from '../../screens/levels/monster-object';
import { showSpell } from '../../components/spells/show-spell';
import { MONSTER_HEAD_ARRAY, MONSTER_BODY_ARRAY, MONSTER_LEGS_ARRAY } from '../../components/monster-generator/consts/monster_consts';
import { player } from '../reception/reception';
import './css/style.css';

import aQ from './questions/attackQuestions.json'
import sQ from './questions/shieldQuestions.json'
import hQ from './questions/healQuestions.json'

let selectedOffice, levelLanguage, monster;
let attackQuestions, shieldQuestions, healQuestions;

let synth = window.speechSynthesis,
    level = 0;

export class Level {
    constructor() { }
    createLevelPage() {
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

}

export {
    player, monster, level, levelLanguage, attackQuestions, shieldQuestions, healQuestions, selectedOffice, synth
}
