import { attackQuestions, shieldQuestions, healQuestions, levelLanguage } from '../../screens/levels/levels';
import { randomTasksArray, randomArrayElem } from '../helpers/helpers';
import { modal } from './show-spell';
import { giveTask } from '../tasks/give-task'
import { Tasks } from '../tasks/tasks';

let BC = false;

export class Spells {
  constructor() {
    if (BC === 1) { BC = false; }
  }
  attack() {
    let question = randomArrayElem(attackQuestions);
    console.log('question', question);
    let rules = `<span>Read the tasks carefully!</span><ul>Your answer may be:<li class='rules-list'>1. number (1, 2.1)</li><li class='rules-list'>2. string (more than one word is possible)</li><li class='rules-list'>3. boolean (true/false)</li><li class='rules-list'>4. array ([1,2,3], [[1,2],[3,4]])</li></ul><span>There is not case sensitivity. Error is possible answer</span>`;
    new giveTask().showTaskSimple(rules, question[0], question[1]);
  }
  shield() {
    let question = randomArrayElem(shieldQuestions);
    let rules = `<span>Write the name of the function/keyword/other. Don't use () for functions!</span><ul>Use the following characters:<li>1. <></li><li>2. :</li><li>3. -</li></ul>`;
    new giveTask().showTaskSimple(rules, question[0], question[1]);
  }
  heal() {
    let question = randomArrayElem(healQuestions);
    let rules = `<span>Choose one of the options.</span>`;
    new giveTask().showTaskWithOptions(rules, question[0], question[1], question[2]);
  }
  blitzAttack() {
    modal.style.display = 'block';
    let tasks = randomTasksArray();
    let task = randomArrayElem(tasks);
    let { blitzCount } = require('../../components/helpers/helpers');
    BC = blitzCount;
    if (!BC) {
      BC = 3;
    };
    new Tasks()[task]();
  }
  superAttack() {
    modal.style.display = 'block';
    let tasks = randomTasksArray();
    let task = randomArrayElem(tasks);
    new Tasks()[task]();
  }
}


export { BC }
