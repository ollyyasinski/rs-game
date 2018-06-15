import { ATTACK_POWER, SHIELD_POWER, HEAL_POWER, PLAYER_MAX_HEALTH } from './const'
import { AttackQuestions, ShieldQuestions, HealQuestions } from './questions'
import '../css/style.css';
import $ from 'jquery';
require('jquery-ui');
require('jquery-ui/ui/widgets/sortable');
require('jquery-ui/ui/disable-selection');
import _ from 'lodash';
import vocabulary from '../assets/vocabularies/vocabulary.json';
import audioVocabulary from '../assets/vocabularies/audioVocabulary.json';

console.log(audioVocabulary);
console.log(ATTACK_POWER);
console.log(SHIELD_POWER);
console.log(HEAL_POWER);
console.log(PLAYER_MAX_HEALTH);

let result;
let answerArray = [];
const englishVocab = vocabulary.english; //get english vocabulary
const SUPER_ATTACK_POWER = 60;
let languages = ['javaScript', 'css', 'html', 'c', 'java', 'php', 'ruby', 'python']; // ЯП для монстров (уровней)
let taskField;
let main = document.querySelector('main'),
  body = $('body');
let attackQuestions, shieldQuestions, healQuestions, monstersPhrases; // массивы вопросов (чтобы исключить повторение вопросов)
let answerButtom; // кнопка "отправки" ответа, создается в процессе отображения задачи
const spellsPower = { // силы способностей (будем тестировать)
  attack: 40,
  shield: 50,
  heal: 30,
  helper: {
    health: 40,
    attack: 15,
  },
  multipleAttack: 20,
};
let player, monster; // объекты игрока и монстра
let level = 0;
let levelLanguage;
let spell, modal;
let gameBackground,
  offices = ['reception', 'office-1', 'office-2', 'office-3', 'office-4', "office-5"],
  fullGameBody = `<div class="game-background">
  <div class="door door-left"></div>
  <div class="door door-right"></div>
  <div class='hero-container'>
    <div class="hero-health__wrapper">
      <div class='hero-health-scale'>
        <span class='hero-health-scale__number'></span>
      </div>
    </div>
  </div>
  <div class="monster-container">
    <div class="monster-health__wrapper">
      <div class='monster-health-scale'>
        <span class='monster-health-scale__number'></span>
      </div>
    </div>
    <div class="monster-head-container"></div>
    <div class="monster-body-container"></div>
    <div class="monster-legs-container"></div>
  </div>
</div>`,
  oneDoorGameBody = `<div class="game-background game-background-mirror">
<div class="door door-right door-right-reception"></div>
<div class="hero-container"></div>
</div>
<div class='dialog' id='dialog'>
<p class='dialog__message' id='message'></p>
<button type="button" class="dialog__button" id = 'dialogButton'>Start</button>
</div>`;

const heroesArray = ["hero-1", "hero-2", "hero-3", "hero-4"];

const monsterHeadContainer = $(".monster-head-container"),
  monsterBodyContainer = $(".monster-body-container"),
  monsterLegsContainer = $(".monster-legs-container"),
  monsterHeadArray = ["monster-head-1", "monster-head-2", "monster-head-3", "monster-head-4"],
  monsterBodyArray = ["monster-body-1", "monster-body-2", "monster-body-3", "monster-body-4", "monster-body-5"],
  monsterLegsArray = ["monster-legs-1", "monster-legs-2", "monster-legs-3"];

const roleArray = ["Project Manager", "Product Owner", "Scrum Master", "Team Lead", "Key Developer"],
  nameArray = ["Jack", "Tom", "Dzmitry", "Abishek", "Alyaxey", "Richard", "John", "Kiran", "Yauheniy"],
  secondNameArray = ["Jones", "Abhishek", "Smith", "Brown", "Ivanou", "Hill", "Omar", "Clark"];


let receptionHTML = `<div class="game-background game-background-mirror">
                       <div class="door door-right"></div>
                       <div class="hero-container"></div>
                     </div>
                     <div class='dialog' id='dialog'>
                       <p class='dialog__message' id='message'></p>
                       <button type="button" class="dialog__button" id = 'dialogButton'>Start</button>
                     </div>`

let synth = window.speechSynthesis;
let officeColors = ["white", "blue", "green", "red", "pink", "mint"],
  gameColor = officeColors[0];
let voices,
  volume = 0.5;
let blitzCount = false;
let blitzPower = 0;
let text;
let doSuper;
let levelFinished;
/*const ATTACK_POWER = 40;
const SHIELD_POWER = 50;
const HEAL_POWER = 30;
const PLAYER_MAX_HEALTH = 100;*/

class Player { // класс игрока
  constructor(name, character) {
    this.name = name;
    this.health = 100;
    this.spells = ['attack', 'shield', 'heal', 'helper', 'multipleAttack'];
    this.character = character; // ссылка на выбранного персонажа;
    this.helper;
    this.shield = 0;
    this.levelPass = 0;
    this.super = 0;
  }
}

class Office {
  constructor(background, doorsAmount) {
    this.background = background;
    this.doorsAmount = doorsAmount;
  };
  createOffice() {
    if (this.doorsAmount === 2) {
      // main.innerHTML = fullGameBody;
      gameBackground = $('.game-background');
      gameBackground.addClass(this.background);
      gameBackground.css('background-image', `url("assets/img/office-background/${gameColor}-offices/${this.background}.png")`);
    } else {
      main.classList.add('wrapper__reception');
      main.innerHTML = oneDoorGameBody;
      gameBackground = $('.game-background');
      gameBackground.addClass(this.background);
      gameBackground.css('background-image', `url("assets/img/office-background/${gameColor}-offices/${this.background}.png")`);
      new Door($(".door-right")).openDoor();
    }
  };
}

class GameSettings {
  constructor() { };
  setGameColor(selectedColor) {
    gameColor = selectedColor;
  };
  disableSound() {
    volume = 0;
  }
  enableSound() {
    volume = 1;
  }
}


class createPage { // класс для создания страниц (скорее всего, все уровни будут создаваться одним методом level)
  constructor() { }
  greeting() {
    const characters = document.getElementById('characters');
    Array.from(characters.children).forEach(div => {
      div.addEventListener('click', e => {
        let current = document.querySelector('.selected');
        let elem = e.target;
        if (current) {
          current.classList.remove('selected');
        }
        if (elem.tagName === 'IMG') {
          elem = e.target.parentElement;
        };
        elem.classList.add('selected');
      });
    });
    const startButton = document.getElementById('startGame');
    startButton.addEventListener('click', new createPage().reception);
  }
  reception() { // страница ресепшена 
    new Helpers().createPlayer();
    new Office(offices[0], 1).createOffice();
    $(".hero-container").addClass(player.character).addClass("hero-container-mirror");
    offices.splice(0, 1); //delete reception from office list, this array will be used for random office generation

    let rDoor = document.querySelector('.door-right');
    rDoor.addEventListener('click', function () {
      //new Door(rDoor).openDoor();
      synth.cancel(); //stops reading
      setTimeout(new createPage().level, 1500);
    });

    setTimeout(function () {
      let dialogText = new Dialogs().instructions();
      new dialogActions().showDialog(dialogText, 'female');
    }, 200);
  }
  level() { // страница уровня
    level++;
    levelFinished = false;
    levelLanguage = new Helpers().chooseLanguage(languages);
    main.innerHTML = `<div class="game-background">
                        <h1 class='level__caption'>Level ${level} - ${levelLanguage}</h1>
                        <ul class='spells'>
                          <li class='spell attack'><p class='spell_wrapper'><span class='spell__name'>Attack</span><span class='spell__description'>40 damage to monster</span></li>
                          <li class='spell shield'><p class='spell_wrapper'><span class='spell__name'>Shield</span><span class='spell__description'>+50 to your defense (absorbs damage)</span></li>
                          <li class='spell heal'><p class='spell_wrapper'><span class='spell__name'>Heal</span><span class='spell__description'>+30 to your health</span></li>
                          <li class='spell blitzAttack'><p class='spell_wrapper'><span class='spell__name'>Blitz Attack</span><span class='spell__description'>3 tasks, each gives +20 to your attack power (max is 60)</span></li>
                          <li class='spell super blockSuper'><p class='spell_wrapper'><span class='spell__name'>Super Attack</span><span class='spell__description'>60 damage to monster</span></li>
                        </ul>
                        <div class="door door-left"></div>
                        <div class="door door-right"></div>
                        <div class='hero-container'>
                          <div class="hero-health__wrapper">
                           <div class='hero-shield'>
                             <span>Shield: <span class='hero-shield__number'></span></span>
                           </div>
                            <div class='hero-health-scale'>
                              <span class='hero-health-scale__number'></span>
                            </div>
                            <div class='hero-super'>
                              <div class='hero-super_scale'>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="monster-container">
                          <div class="monster-head-container">
                            <div class="monster-health__wrapper">
                              <div class='monster-shield'>
                                <span>Shield: <span class='monster-shield__number'></span></span>
                              </div>                          
                              <div class='monster-health-scale'>
                                <span class='monster-health-scale__number'></span>
                              </div>
                            </div>
                          </div>
                          <div class="monster-body-container"></div>
                          <div class="monster-legs-container"></div>
                        </div>
                        <div id="taskModal" class="modal">
                          <div class="task-modal-content">
                            <h1 class='task-caption'>TASK NAME</h1>
                            <div class='task-task-content'>
                              <p class='task-task-description' id='taskDesc'></p>
                              <p class='task-task-text' id='taskText'></p>
                            </div>
                            <div class='task-field' id='taskField'>
                              <div class='task-field-answer-container' id="taskFieldAnswer"></div>
                              <div class='answer'><span id='answer__correct' class='correct'></span><span id='answer__wrong' class='wrong'></span></div>
                            </div>
                          </div>
                        </div>                      
                        <div class='dialog' id = dialog>
                          <p class='dialog__message' id='message'></p>
                          <button type="button" class="dialog__button" id = 'dialogButton'>Close</button>
                        </div>
                      </div> `; //нарисовать страницу
    new Office(new Helpers().randomArrayElem(offices), 2).createOffice(); //создает рандомный офис, пока закомментила, чтобы не мешать твоему innerHTML
    $(".hero-container").addClass(player.character);
    new MonsterGenerator($(".monster-head-container"), $(".monster-body-container"), $(".monster-legs-container"), ).generateMonster(monsterHeadArray, monsterBodyArray, monsterLegsArray);

    monster = new Monster(level);
    taskField = document.getElementById('taskFieldAnswer');
    document.querySelector('.monster-health__wrapper').style.width = `${200 + 20 * level}px`;
    document.querySelector('.hero-health-scale__number').innerHTML = player.health;
    document.querySelector('.monster-health-scale__number').innerHTML = monster.health;
    document.querySelector('.hero-shield__number').innerHTML = player.shield;
    document.querySelector('.monster-shield__number').innerHTML = monster.shield;
    gameBackground.addClass(new Helpers().randomArrayElem(offices));
    text = document.getElementById('taskText');

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
        console.log(spell);
        if (spell !== 'super'){
          document.querySelector('.spells').classList.toggle('showSpells');
          modal = document.getElementById('taskModal');
          modal.style.display = 'block';
          new Spells()[spell]();
        }
      });
    });
  }
}

class Helpers {
  constructor() { }
  randomNumber(max) { // генератор случайных чисел
    return Math.floor(Math.random() * max);
  }
  randomArrayElem(arr) { // взять из массива случайный элемент и удалить его из массива
    let index = new Helpers().randomNumber(arr.length - 1); // слуйный индекс
    return arr.splice(index, 1)[0]; // удаляем этот элемент из массива и возвращаем его 
  }
  chooseLanguage(languages) { // выбор языка для уровня
    let index = new Helpers().randomNumber(languages.length);
    let language = languages.splice(index, 1).toString();
    return language;
  }
  generateRandomArrayIndex(array) { // random index generator
    return _.random(0, array.length - 1, 0);
  };
  addRandomClass(target, sourceArray) {
    return target.addClass(sourceArray[this.generateRandomArrayIndex(sourceArray)]);
  }
  generateRandomObjProperty(obj) {
    let result,
      count = 0;
    for (let prop in obj)
      if (Math.random() < 1 / ++count)
        result = prop;
    return result;
  }
  createPlayer() { // создание объекта игрока
    let character = document.querySelector('.selected') ? document.querySelector('.selected').id : 'hero-2'; // если пользователь не выбрал персонажа - взять персонажа по умолчанию
    player = new Player(document.getElementById('name').value || 'Anonim', character);
    localStorage.setItem(player.name, 25); //save player name to local storage
  }
  createMonster() { } // сюда запихнем создание имени, тела, объекта 
  showIfAnswerCorrect() { // показывает Correct, если введенные ответ правильный
    new dialogActions().writeDialogText('answer__correct', ['Correct'], 100);
    if (blitzCount > 0) {
      blitzCount--;
      blitzPower += 20;
    }

    if (blitzCount === 0 || blitzCount === false) {
      setTimeout(function () {
        modal.style.display = 'none';
        text.innerHTML = '';
        document.getElementById('answer__correct').innerHTML = '';
        new doSpell()[spell]();
      }, 1500);
    } else {
      setTimeout(function () {
        modal.style.display = 'none';
        text.innerHTML = '';
        document.getElementById('answer__correct').innerHTML = '';
      }, 1000);

      setTimeout(function () {
        new Spells().blitzAttack();
      }, 1500);
    }
  }
  showIfAnswerWrong() { // показывает Wrong, если введенные ответ не правильный
    new dialogActions().writeDialogText('answer__wrong', ['Wrong'], 100);
    if (blitzCount > 0) {
      blitzCount--;
    }
    if (blitzCount === false || doSuper === true) {
      setTimeout(function () {
        modal.style.display = 'none';
        text.innerHTML = '';
        document.getElementById('answer__wrong').innerHTML = '';
        new monsterAttack();
      }, 1500);
    }
    if (doSuper === true) {
      doSuper = false;
      player.super = 0;
      document.querySelector('.hero-super_scale').style.width = `${player.super}%`;
      new Helpers().blockSuperAttack();
    }
    if (blitzCount === 0) {
      setTimeout(function () {
        modal.style.display = 'none';
        text.innerHTML = '';
        document.getElementById('answer__wrong').innerHTML = '';
        new doSpell()[spell]();
      }, 1500);
    } else if (blitzCount > 0) {
      setTimeout(function () {
        modal.style.display = 'none';
        text.innerHTML = '';
        document.getElementById('answer__wrong').innerHTML = '';
      }, 1000);

      setTimeout(function () {
        new Spells().blitzAttack();
      }, 1500);
    }
  }
  setVoiceGender(reading, gender) {
    voices = synth.getVoices();
    (gender === 'female') ? reading.voice = voices[4] : reading.voice = voices[0];
  }
  createReadableText(text) {
    let readableText = new SpeechSynthesisUtterance(text);
    readableText.volume = volume;
    return readableText;
  }
  unblockSuperAttack(){
    document.querySelector('.super').classList.toggle('blockSuper');
    document.querySelector('.super').addEventListener('click', new Helpers().superClick);
  }
  blockSuperAttack(){
    document.querySelector('.super').classList.toggle('blockSuper');
    document.querySelector('.super').removeEventListener('click', new Helpers().superClick);
  }
  superClick(){
    spell = 'superAttack';
    doSuper = true;
    document.querySelector('.spells').classList.toggle('showSpells');
    modal = document.getElementById('taskModal');
    modal.style.display = 'block';
    new Spells()[spell]();
  }
}

class dialogActions { // методы окна диалога
  constructor() { }
  showDialog(text, gender) { //показать окно
    let dialogWrapper = document.getElementById('dialog');
    dialogWrapper.classList.toggle('dialog-active');
    let dialogButton = document.getElementById('dialogButton');
    dialogButton.addEventListener('click', new dialogActions().closeDialog);
    new dialogActions().writeDialogText('message', text, 50, gender);
  }
  writeDialogText(id, text, speed, gender) { // вывод текста 
    document.getElementById('message').innerHTML = '';
    let ele = document.getElementById(id),
      txt = text.join("").split("");
    let readDialogText = new Helpers().createReadableText(text);
    console.log(readDialogText);
    new Helpers().setVoiceGender(readDialogText, gender);

    synth.speak(readDialogText); //read dialog  
    let interval = setInterval(function () {
      if (!txt[0]) {
        return clearInterval(interval);
      };
      ele.innerHTML += txt.shift();
    }, speed != undefined ? speed : 100);
    return false;
  }
  closeDialog() { // закрыть окно
    synth.cancel(); //stop reading
    let dialogWrapper = document.getElementById('dialog');
    dialogWrapper.classList.toggle('dialog-active');
    console.log('LEVEL FINISHED',levelFinished);
    if (level && levelFinished === false) {
      document.querySelector('.spells').classList.toggle('showSpells');
    }
  }
}

class Tasks { // дополнитльные (рандомные) задания
  constructor() { }
  calculator() {
    let rules = `Calculate the result.\nIf necessary, round the number to the nearest integer.`; //правило на этот тип задач
    let signs = [' + ', ' - ', ' * ', ' / '];
    let str = new Helpers().randomNumber(100) + signs[new Helpers().randomNumber(4)] + new Helpers().randomNumber(100); // пример
    let res = Math.round(eval(str)).toString(); //результат    
    console.log('Answer ', res);
    new giveTask().showTaskSimple(rules, str, res); // выводим на экран
  }
  putInRightOrder() {
    let rules = `Put code parts in the right order.`,
      res = [
        ["let max", "=", "(a, b)", "=>", "{", "a > b", ";", "}", ";"],
        ["setTimeout(", "()", "=>", "{", "return 'result'", ";", "},", "1)", ";"],
        ["for(", "var i = 0;", ";", "i++", ")", "{", "if (i > 3)", "break;", "}"],
        ["el", ".addEventListener(", '"click"', ",", "()", "=>", '{ alert("hello!"); }', ");"],
        ["class", "Rectangle", "{", "constructor", "(height){", "this.height", "=", "height;", "} }"]
      ];

    let index = new Helpers().randomNumber(res.length); // генерируем рандомный индекс
    let answer = res[index]; // получаем массив с ответом
    let task = _.shuffle(res[index]);
    res.splice(index, 1); // удаляем этот вопрос из массива (вопросы не повторяются)
    new giveTask().showTaskOrder(rules, task, answer); // выводим на экран
  }
  translate() {
    let rules = `Translate the word into russian.`;
    let task = new Helpers().generateRandomObjProperty(englishVocab),
      answer = englishVocab[task];
    new giveTask().showTaskSimple(rules, task, answer);
    delete englishVocab[task];
  }
  audioTask() {
    let rules = `Write what you hear`;

    let task = new Helpers().generateRandomObjProperty(audioVocabulary),
      answer = audioVocabulary[task];
    new giveTask().showTaskAudio(rules, task, answer);

  }
}

class Spells { // заклинания
  constructor() { } //в консоли пока отображаются ответы для задач
  attack() {
    if (!attackQuestions) {
      attackQuestions = new AttackQuestions()[levelLanguage](); // получаем массив в вопросами для данного уровня
    };
    let question = new Helpers().randomArrayElem(attackQuestions);
    console.log('Answer ', question[1]);
    let rules = new AttackQuestions().rules; // правила для этого вида заклинаний
    new giveTask().showTaskSimple(rules, question[0], question[1]); // выводим вопрос
  }
  shield() {
    if (!shieldQuestions) {
      shieldQuestions = new ShieldQuestions()[levelLanguage]();
    }
    let question = new Helpers().randomArrayElem(shieldQuestions);
    console.log('Answer ', question[1]);
    let rules = new ShieldQuestions().rules;
    new giveTask().showTaskSimple(rules, question[0], question[1]);
  }
  heal() {
    if (!healQuestions) {
      healQuestions = new HealQuestions()[levelLanguage]();
    }
    let question = new Helpers().randomArrayElem(healQuestions);
    let rules = new HealQuestions().rules;
    new giveTask().showTaskWithOptions(rules, question[0], question[1], question[2]);
    console.log('Answer ', question[2]);
  }
  blitzAttack() {
    modal.style.display = 'block';
    let tasks = ['calculator', 'putInRightOrder', 'translate', 'audioTask'];
    let task = new Helpers().randomArrayElem(tasks);
    if (!blitzCount) {
      blitzCount = 3;
    };
    new Tasks()[task]();
  }
  superAttack(){
    console.log('we are super');
    modal.style.display = 'block';
    let tasks = ['calculator', 'putInRightOrder', 'translate', 'audioTask'];
    let task = new Helpers().randomArrayElem(tasks);
    new Tasks()[task]();
  }
}

class giveTask { // вывод вопросов на экран
  constructor() { }
  showTaskSimple(rules, task, answer) { // вопросы по схеме правило -> текст 
    taskField.innerHTML = `<input type="text" class='task__form_answer'>
    <input type="button" class='btn task-field-btn' value="Answer">`;
    answerButtom = document.querySelector('.btn');
    let description = document.getElementById('taskDesc');
    description.innerHTML = rules;
    text.innerHTML = task;
    result = new checkAnswer(answer); // создаем новый объект, в котором будет храниться ответ и проверяться ответ пользователя
    answerButtom.addEventListener('click', result.checkSimpleAnswer); // по клику - проверять результат
  }
  showTaskAudio(rules, task, answer) {
    taskField.innerHTML = `<input type="text" class='task__form_answer'>
    <input type="button" class='btn task-field-btn' value="Answer">`;

    let description = document.querySelector('#taskDesc'),
      text = document.querySelector('#taskText');

    answerButtom = document.querySelector('.btn');
    description.innerHTML = rules;

    text.innerHTML = `<input type="button" class='btn' id="audioBtn" value= "Click to listen">`;
    let audioBtn = $('#audioBtn');

    audioBtn.click(() => {
      let readTaskText = new SpeechSynthesisUtterance(task);
      synth.speak(readTaskText)
    });

    console.log(answer);
    result = new checkAnswer(answer); // создаем новый объект, в котором будет храниться ответ и проверяться ответ пользователя
    console.log(result)
    answerButtom.addEventListener('click', result.checkSimpleAnswer); // по клику - проверять результат
    delete audioVocabulary[task]; //delete alredy used question
  };
  showTaskWithOptions(rules, task, options, answer) { //вопросы по схеме правило -> варианты ответов 
    taskField.innerHTML = `<label><input type='radio' class='task__form_options' name='answer' value='${options[0]}'>${options[0]}</label>
                           <label><input type='radio' class='task__form_options' name='answer' value='${options[1]}'>${options[1]}</label>
                           <label><input type='radio' class='task__form_options' name='answer' value='${options[2]}'>${options[2]}</label>
                           <label><input type='radio' class='task__form_options' name='answer' value='${options[3]}'>${options[3]}</label>
                           <input type="button" class='btn task-field-btn' value="Answer">`;
    answerButtom = document.querySelector('.btn');
    let description = document.getElementById('taskDesc');
    description.innerHTML = rules;
    text.innerHTML = task;
    result = new checkAnswer(answer); // создаем новый объект, в котором будет храниться ответ и проверяться ответ пользователя
    answerButtom.addEventListener('click', result.checkSelectedAnswer);
  }
  showTaskOrder(rules, task, answer) {
    taskField.innerHTML = `<ul class="sortable task-filed-answer">
                        <li class="default" id="id_1">${task[0]}</li>
                        <li class="default" id="id_2">${task[1]}</li>
                        <li class="default" id="id_3">${task[2]}</li>
                        <li class="default" id="id_4">${task[3]}</li>
                        <li class="default" id="id_5">${task[4]}</li>
                        <li class="default" id="id_6">${task[5]}</li>
                        <li class="default" id="id_7">${task[6]}</li>
                        <li class="default" id="id_7">${task[7]}</li>
                        <li class="default" id="id_7">${task[8]}</li>
                      </ul>
                      <input type="button" class='btn task-field-btn' value="Answer">`;
    // <input type="button" class='btn task-filed-btn' value="Answer">`;
    answerButtom = document.querySelector('.task-field-btn');
    let description = document.getElementById('taskDesc');
    description.innerHTML = rules;
    result = new checkAnswer(answer); // создаем новый объект, в котором будет храниться ответ и проверяться ответ пользователяЧ
    $(function () {
      $(".sortable").sortable();
    });
    answerButtom.addEventListener('click', result.checkDroppedAnswer);
  }
}

class checkAnswer { // класс проверки ответов
  constructor(res) {
    this.result = res; // при создании запоминаем правильный ответ из условия 
  }
  checkSimpleAnswer() { // проверка для обычного текстового ответа
    let answer = document.querySelector('.task__form_answer').value.replace(/(^\s*)|(\s*)$/g, '').toLowerCase();
    if (typeof result.result === 'string') {
      if (answer === result.result) {
        new Helpers().showIfAnswerCorrect();
      } else {
        new Helpers().showIfAnswerWrong();
      }
    }
    if (typeof result.result === 'object') {
      for (let i in result.result) {
        if (_.lowerCase(result.result[i]) === answer) {
          return new Helpers().showIfAnswerCorrect();
        }
      }
      return new Helpers().showIfAnswerWrong();
    }
  }
  checkSelectedAnswer() { // проверка для вопросов с вариантами ответов
    console.log(taskField.querySelector(':checked').value);
    let answer = taskField.querySelector(':checked').value;
    if (answer === result.result) {
      new Helpers().showIfAnswerCorrect();
    } else {
      new Helpers().showIfAnswerWrong();
    }
  }
  checkDroppedAnswer() {
    let children = $('.sortable').sortable('refreshPositions').children();
    $.each(children, function () {
      answerArray.push($(this).text().trim());
    });
    if (_.isEqual(answerArray, result.result)) {
      answerArray = [];
      new Helpers().showIfAnswerCorrect();
    } else {
      answerArray = [];
      new Helpers().showIfAnswerWrong();
    }
  }
}


class doSpell { // игрок применяет заклинание
  constructor() { }
  attack(power) {
    let force = ATTACK_POWER;
    if (power !== undefined) {
      force = power;
    }
    if (!monster.shield) {
      monster.health -= force;
    }
    if (monster.shield) {
      if (monster.shield < force) {
        monster.health += monster.shield;
        monster.shield = 0;
        monster.health -= force;
      }
      if (monster.shield > force) {
        monster.shield -= force;
      }
    }
    player.super += 20;
    document.querySelector('.hero-super_scale').style.width = `${player.super}%`;
    if (player.super === 20){
      new Helpers().unblockSuperAttack();
    }
    if (monster.health <= 0) {
      monster.health = 0;
      document.querySelector('.monster-health-scale').style.width = `${monster.health}%`;
      document.querySelector('.monster-health-scale__number').innerHTML = monster.health;
      console.log('win');
      new levelResults().win();
      //break;
      // написать ф-ю победы на уровне и перейти в нее
    };
    if (monster.health > 0) {
      document.querySelector('.monster-health-scale').style.width = `${monster.health * 100 / (100 + 20 * level)}%`;
      document.querySelector('.monster-health-scale').style.marginLeft = `${100 - monster.health * 100 / (100 + 20 * level)}%`;
      document.querySelector('.monster-health-scale__number').innerHTML = monster.health;
      document.querySelector('.monster-shield__number').innerHTML = monster.shield;
      new monsterAttack(); // передать ход монстру
    };
  }
  shield() {
    player.shield += SHIELD_POWER;
    document.querySelector('.hero-shield__number').innerHTML = player.shield;
    new monsterAttack();
  }
  heal() {
    if (player.health < PLAYER_MAX_HEALTH) {
      player.health += HEAL_POWER;
      if (player.health > PLAYER_MAX_HEALTH) {
        player.health = PLAYER_MAX_HEALTH;
      }
    }
    document.querySelector('.hero-health-scale').style.width = `${player.health}%`;
    document.querySelector('.hero-health-scale__number').innerHTML = player.health;
    new monsterAttack();
  }
  blitzAttack() {
    new doSpell().attack(blitzPower);
    blitzCount = false;
    blitzPower = 0;
  }
  superAttack() {
    new doSpell().attack(SUPER_ATTACK_POWER);
    player.super = 0;
    doSuper = false;
    document.querySelector('.hero-super_scale').style.width = `${player.super}%`;
    new Helpers().blockSuperAttack();
  }
}

class monsterAttack { // монстр выбирает рандомную способность и применяет
  constructor() {
    this.spells = ['attack'];
    if (monster.shield === 0) {
      this.spells.push('shield');
    }
    /*if (!monster.helper) { еще рано
      this.spells.push('helper');
    };*/
    if (monster.health < (100 + 20 * level)) {
      this.spells.push('heal');
    };
    /*if (player.helper) { еще рано
      this.spells.push('multiAttack');
    };*/
    //console.log(this.spells);
    let spell = this.spells[new Helpers().randomNumber(this.spells.length)];
    console.log('Monster do', spell);
    setTimeout(this[spell], 1000);
  }
  attack() {
    if (!player.shield) {
      player.health -= ATTACK_POWER;
    }
    if (player.shield) {
      if (player.shield < ATTACK_POWER) {
        player.health += player.shield;
        player.shield = 0;
        player.health -= ATTACK_POWER;
      }
      if (player.shield > ATTACK_POWER) {
        player.shield -= ATTACK_POWER;
      }
    }
    if (player.health <= 0) {
      player.health = 0;
      console.log('loser');
      // запустить страницу проигрыша с таблицей рекордов
      document.querySelector('.hero-health-scale').style.width = `${player.health}%`;
      document.querySelector('.hero-health-scale__number').innerHTML = player.health;
      document.querySelector('.hero-shield__number').innerHTML = player.shield;
      new levelResults().lose();
      // написать ф-ю проигрыша и перейти в нее
    };
    if (player.health > 0) {
      document.querySelector('.hero-health-scale').style.width = `${player.health}%`;
      document.querySelector('.hero-health-scale__number').innerHTML = player.health;
      document.querySelector('.hero-shield__number').innerHTML = player.shield;
      document.querySelector('.spells').classList.toggle('showSpells');
    }
  }
  shield() {
    monster.shield += SHIELD_POWER;
    document.querySelector('.monster-shield__number').innerHTML = monster.shield;
    document.querySelector('.spells').classList.toggle('showSpells');
  }
  heal() {
    monster.health += HEAL_POWER;
    if (monster.health > (100 + 20 * level)) {
      monster.health = 100 + 20 * level;
    };
    document.querySelector('.monster-health-scale').style.width = `${monster.health * 100 / (100 + 20 * level)}%`;
    document.querySelector('.monster-health-scale').style.marginLeft = `${100 - monster.health * 100 / (100 + 20 * level)}%`;
    document.querySelector('.monster-health-scale__number').innerHTML = monster.health;
    document.querySelector('.spells').classList.toggle('showSpells');
  }
}

class levelResults { // уровень закончен
  constructor() { }
  win() { //победой
    player.levelPass++;
    player.health = 100;
    player.shield = 0;
    player.super = 0;
    attackQuestions = 0, shieldQuestions = 0, healQuestions = 0;
    levelFinished = true;
    monstersPhrases = new Dialogs().monstersPhrasesLevelWin();
    setTimeout(function () {
      let dialogText = new Helpers().randomArrayElem(monstersPhrases);
      new dialogActions().showDialog([dialogText]);
    }, 500);
    new Door($(".door-right")).openDoor();
    synth.cancel(); //stop reading
    document.querySelector('.door-right').addEventListener('click', function () { setTimeout(new createPage().level, 1500); });
    new Door($(".door-left")).openDoor();
    document.querySelector('.door-left').addEventListener('click', function () { setTimeout(new createPage().level, 1500); });
  }
  lose() {
    levelFinished = true;
    monstersPhrases = new Dialogs().monstersPhrasesLevelLose();
    setTimeout(function () {
      let dialogText = new Helpers().randomArrayElem(monstersPhrases);
      new dialogActions().showDialog([dialogText]);
    }, 500);
  } // поражением
}

class Dialogs {
  constructor() { }
  instructions() {
    let arr = [`Hello, ${player.name}, we were waiting for you! Welcome to 'Company name' - one of the best companies in the world. To get a job you have to go through 5 interviews. Each interview will check your knowledge in some programming language. Your "monsters" are waiting for you, if you are ready - go through that door. Good luck!`];
    return arr;
  }
  monstersPhrasesLevelStart() {
    let arr = [
      `Well ${player.name}, let's check your ${levelLanguage} skills.`,
      `Heard you are a big fan of ${levelLanguage}. Will see!`,
      `Glad to see you, ${player.name}! Let's do ${levelLanguage}.`,
      `You think my level is easy? ${levelLanguage} is not a language, it's a life style!`,
      `Let's see what you got, ${player.name}!`,
      `Let's see how you cope with ${levelLanguage} level, ${player.name}!`,
      `I can't wait to start, ${player.name}!`,
      `Don't be afraid, ${player.name}, ${levelLanguage} - it's easy. Let's start!`,
      `You shall not pass, ${player.name}!!!`,
      `Only one candidate have passed this level. Are you ready, ${player.name}?`
    ];
    return arr;
  }
  monstersPhrasesLevelWin(){
    let arr = [
      `Excellent work, ${player.name}! Choose your way and good luck.`,
      `You're really good in ${levelLanguage}. You can go through any door for the next interview.`,
      `I'm impressed, ${player.name}! Good luck on the next interview, choose any door.`,
      `Your knowledge of ${levelLanguage} is very good! You can go to any door for next level.`,
      `Good interview, I wish good luck to the next. Choose any door, ${player.name}`,
      `Amazing skills, ${player.name}! Go through one of this doors to continue.`,
      `You really are good at ${levelLanguage}. Choose the door and good luck.`,
      `Good job, ${player.name}. You can go to any door for next level.`,
      `I see, ${levelLanguage} is to easy for you, isn't it? Go through one of this doors to continue.`,
      `I see, you're really big fan of ${levelLanguage}! Good luck on the next interview, ${player.name}, choose any door.`
    ];
    return arr;
  }
  monstersPhrasesLevelLose(){
    let arr = [
      `Better luck next time, ${player.name}.`,
      `I'm sorry, ${player.name}, but as long as your knowledge is not enough.`,
      `You need to pay more attention to ${levelLanguage}. Come again when you are ready.`,
      `You should seriously study ${levelLanguage}. Your knowledge is not enough yet.`,
      `I think in half a year you will succeed. Good luck, ${player.name}!`,
      `Your skills are not enough yet. Good buy, ${player.name}.`,
      `Not bad, ${player.name}, but you still need to learn  a lot. See you!`,
      `We will call you, ${player.name}`,
      `Sorry, ${player.name}, but we can't offer you job now.`,
      `You have serious problems with ${levelLanguage}. Keep learning, ${player.name}`
    ];
    return arr;
  }
  monstersPhrasesFinal() {
    let arr = [
      `Great work, ${player.name}! It is the last test, let's begin!`,
      `Was it easy to get here? Well, the last fight!`,
      `Don't be too happy, ${player.name}! Here everything can end!`
    ];
    return arr;
  }
}

class Door {
  constructor(door) {
    this.door = door;
  }
  openDoor() {
    this.door.click(
      function openDoor() {
        $(this).addClass("doorOpened");
      }
    );
  }
}

class MonsterGenerator {
  constructor(head, body, legs) {
    this.head = head;
    this.body = body;
    this.legs = legs;
  };
  generateMonster(headArray, bodyArray, legsArray) {
    new Helpers().addRandomClass(this.head, headArray);
    new Helpers().addRandomClass(this.body, bodyArray);
    new Helpers().addRandomClass(this.legs, legsArray);
  }

}

class NameGenerator {
  constructor(nameOptionsArray1, nameOptionsArray2, nameOptionsArray3) {
    this.position = nameOptionsArray1;
    this.name = nameOptionsArray2;
    this.surname = nameOptionsArray3;
  };
  generateRandomName() {
    return console.log(this.position[new Helpers().randomNumber(this.position.length)] + ' ' +
      this.name[new Helpers().randomNumber(this.name.length)] + ' ' +
      this.surname[new Helpers().randomNumber(this.surname.length)]);
  }
}

class Monster { // класс монстра
  constructor(level) {
    this.name = new NameGenerator(roleArray, nameArray, secondNameArray).generateRandomName();
    this.health = 100 + 20 * level;  // переменная, которая будет определять номер уровеня (1, 2, 3, 4, 5)
    this.spells = ['attack', 'shield', 'heal', 'helper', 'multipleAttack'];
    this.shield = 0;
  }
}


let resultsTableHTML = `<div id="resultsModal" class="result-modal">
<div class="result-modal-content">
<table>
<caption>Best Results</caption>
    <thead>
        <tr class="table-header">
            <th>#</th>
            <th>User Name</th>
            <th>Result</th>
        </tr>
    </thead>
    <tbody id="resultsTable">
    </tbody>
</table>
</div>
</div>`,
  resultsTable;

class ResultsTable {
  constructor() {
    this.bestResults = Object.keys(localStorage).reduce(function (obj, str) {
      obj[str] = localStorage.getItem(str);
      return obj
    }, {});
    this.bestResultsSortedArray = [];
  };
  createSortedResults() {
    for (result in this.bestResults) {
      if (this.bestResults[result] !== "no result") {
        this.bestResultsSortedArray.push([result, this.bestResults[result]]);
      }
    }
    this.bestResultsSortedArray.sort(function (a, b) {
      return b[1].localeCompare(a[1]);
    });
    this.bestResultsSortedArray = this.bestResultsSortedArray.slice(0, 10);
  };
  createResultsTable(bestResultsSortedArray) {
    $(".game-background").append(resultsTableHTML);
    resultsTable = document.getElementById("resultsTable");
    if (bestResultsSortedArray.length !== 0) {
      while (resultsTable.firstChild) {
        resultsTable.removeChild(resultsTable.firstChild);
      }
      for (let i in bestResultsSortedArray) {
        let resultRow = document.createElement("tr"),
          position = document.createElement("td"),
          userName = document.createElement("td");

        position.innerHTML = parseInt(i) + 1;
        userName.innerHTML = bestResultsSortedArray[i][0];
        let userResult = document.createElement("td");
        userResult.innerHTML = bestResultsSortedArray[i][1];

        resultRow.appendChild(position);
        resultRow.appendChild(userName);
        resultRow.appendChild(userResult);
        resultsTable.appendChild(resultRow);
      }
    } else {
      let resultRow = document.createElement("tr"),
        noResults = document.createElement("td");

      resultRow.appendChild(noResults);
      noResults.innerHTML = "No Results Yet";

      for (let i = 0; i < 2; i++) {
        let emptyCell = document.createElement("td");
        resultRow.appendChild(emptyCell);
      }

      resultsTable.appendChild(resultRow);
    }
  };
  showResults() {
    this.createSortedResults();
    this.createResultsTable(this.bestResultsSortedArray);
  }
}


new createPage().greeting();
// rightDoor.addEventListener('click', new createPage().level);
// leftDoor.addEventListener('click', new createPage().level);
//тест разных способностей

//new Spells().heal();
//new Spells().attack();
//new Spells().shield();
//new Tasks().calculator();

// $("#myBtn").click(new Tasks().putInRightOrder());