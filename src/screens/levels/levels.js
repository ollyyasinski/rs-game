import { chooseLanguage, randomArrayElem, createBattle } from '../../modules/helpers';
import { Dialogs, dialogActions } from '../../modules/dialogs';
import { Office } from '../../components/office/office';
import { SideNav } from '../../modules/game-settings/game-settings';
import { languages, offices } from "../../variables/arrays";
import { MonsterGenerator } from '../../modules/monster-generator';
import { Monster } from '../../modules/monster-object';
import { showSpell } from '../../modules/show-spell';
import { MONSTER_HEAD_ARRAY, MONSTER_BODY_ARRAY, MONSTER_LEGS_ARRAY } from '../../consts/monster_consts';
import { player } from '../reception/reception';

import aQ from '../../../assets/questions/attackQuestions.json'
import sQ from '../../../assets/questions/shieldQuestions.json'
import hQ from '../../../assets/questions/healQuestions.json'

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
