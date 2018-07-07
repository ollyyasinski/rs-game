import { generateRandomObjProperty, randomArrayElem } from '../../components/helpers/helpers'
import { giveTask } from './give-task'

import vocabulary from './assets/vocabularies/vocabulary.json';
import audioVocabulary from './assets/vocabularies/audioVocabulary.json';
import vocabularyReverse from './assets/vocabularies/vocabularyReverse.json'
import smallQuestions from './assets/questions/smallQuestions.json'
import countQuestions from './assets/questions/countQuestions.json'
import nameQuestions from './assets/questions/nameTask.json'
import addWordQuestions from './assets/questions/addWordTask.json'
import celebritiesQuestions from './assets/questions/celebritiesQuestions.json'
import ddQuestions from './assets/questions/d&dQuestions.json'

let englishVocab = vocabulary.english;

export class Tasks {
  constructor() { }
  calculator() {
    let rules = `Calculate the result<br>If necessary, round the number to the nearest integer`;
    let signs = [' + ', ' - ', ' * ', ' / '];
    let str = _.random(0, 100, 0) + signs[_.random(0, 4, 0)] + _.random(0, 100, 0);
    let res = Math.round(eval(str)).toString();
    new giveTask().showTaskSimple(rules, str, res);
  }
  putInRightOrder() {
    let rules = `Put code parts in the right order`;
    let res = ddQuestions;
    let index = _.random(0, res.length, 0);
    let answer = res[index];
    let task = _.shuffle(res[index]);
    res.splice(index, 1);
    new giveTask().showTaskOrder(rules, task, answer);
  }
  translate() {
    let rules = `Translate the word into russian`;
    let task = generateRandomObjProperty(englishVocab),
      answer = englishVocab[task];
    new giveTask().showTaskSimple(rules, task, answer);
    delete englishVocab[task];
  }
  audioTask() {
    let rules = `Write what you hear`;

    let task = generateRandomObjProperty(audioVocabulary),
      answer = audioVocabulary[task];
    new giveTask().showTaskAudio(rules, task, answer);

  }
  translateRUtoEN() {
    let rules = `Translate the word into english`;
    let task = generateRandomObjProperty(vocabularyReverse),
      answer = vocabularyReverse[task];
    new giveTask().showTaskSimple(rules, task, answer);
    delete vocabularyReverse[task];
  }
  trueAndFalseQuestions() {
    let rules = `Select if the fact is true or false`;
    let question = randomArrayElem(smallQuestions);
    new giveTask().showTrueFalseTask(rules, question[0], question[1]);
  }
  count() {
    let rules = `Read the task and write the correct number`;
    let question = randomArrayElem(countQuestions);
    new giveTask().showCountTask(rules, question[0], question[1], question[2]);
  }
  nameTheThing() {
    let rules = `Write the name of what is shown in the picture (in English)`;
    let question = new Helpers().randomArrayElem(nameQuestions);
    new giveTask().showCountTask(rules, null, question[0], question[1]);
  }
  firstNumberInEquation() {
    let rules = `Write a number to make the equation correct`;
    let signs = [' + ', ' - ', ' * '];
    let a = _.random(0, 100, 0);
    let b = _.random(0, 100, 0);
    let sign = signs[_.random(0, 3, 0)];
    let res = eval(`${a} ${sign} ${b}`);
    let task = ` ${sign} ${b} = ${res}`;
    new giveTask().showTaskFirstInEquation(rules, task, a.toString());
  }
  secondNumberInEquation() {
    let rules = `Write a number to make the equation correct`;
    let signs = [' + ', ' - ', ' * '];
    let a = _.random(0, 100, 0);
    let b = _.random(0, 100, 0);
    let sign = signs[_.random(0, 3, 0)];
    let res = eval(`${a} ${sign} ${b}`);
    let firstPart = `${a} ${sign} `;
    let secondPart = ` = ${res}`;
    new giveTask().showTaskSecondInEquation(rules, firstPart, secondPart, b.toString());
  }
  addWord() {
    let rules = `Insert a word to get a sentence`;
    let question = randomArrayElem(addWordQuestions);
    new giveTask().showTaskAddWord(rules, question[0], question[1], question[2]);
  }
  chooseRightName() {
    let rules = `Select the name of the person in the photo`;
    let question = randomArrayElem(celebritiesQuestions);
    new giveTask().showTaskCelebrities(rules, question[0], question[1], question[2]);
  }
}

export {
  englishVocab, audioVocabulary, vocabularyReverse, smallQuestions, countQuestions, nameQuestions, addWordQuestions, celebritiesQuestions, ddQuestions
}
