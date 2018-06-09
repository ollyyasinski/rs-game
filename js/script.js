let result;
let answerArray = [];

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
let level = 4;
let levelLanguage;
let spell, modal;
let gameBackground,
  offices = ['reception', 'office-1', 'office-2', 'office-3', 'office-4', "office-5"],
  fullGameBody = `<div class="game-background">
  <div class="door door-left"></div>
  <div class="door door-right"></div>
  <div class="hero-container"></div>
  <div class="monster-container">
      <div class="monster-head-container"></div>
      <div class="monster-body-container"></div>
      <div class="monster-legs-container"></div>
  </div>
</div>
<div class='dialog' id='dialog'>
<p class='dialog__message' id='message'></p>
<button type="button" class="dialog__button" id = 'dialogButton'>Start</button>
</div>`,
  oneDoorGameBody = `<div class="game-background game-background-mirror">
<div class="door door-right"></div>
<div class="hero-container"></div>
</div>
<div class='dialog' id='dialog'>
<p class='dialog__message' id='message'></p>
<button type="button" class="dialog__button" id = 'dialogButton'>Start</button>
</div>`;

let rightDoor = $(".door-right"),
  leftDoor = $(".door-left");

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

const heroesArray = ["hero-1", "hero-2", "hero-3", "hero-4"];

class Player { // класс игрока
  constructor(name, character) {
    this.name = name;
    this.health = 100;
    this.spells = ['attack', 'shield', 'heal', 'helper', 'multipleAttack'];
    this.character = character; // ссылка на выбранного персонажа;
  }
}

class Office {
  constructor(background, doorsAmount) {
    this.background = background;
    this.doorsAmount = doorsAmount;
  }
  createOffice() {
    main.classList.add('wrapper__reception');
    if (this.doorsAmount === 2) {
      new Door(rightDoor).openDoor();
      new Door(leftDoor).openDoor();
      main.innerHTML = fullGameBody;
      gameBackground = $('.game-background');
      gameBackground.addClass(this.background);
    } else {
      new Door(rightDoor).openDoor();
      main.innerHTML = oneDoorGameBody;
      gameBackground = $('.game-background');
      gameBackground.addClass(this.background);
    }
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
      new Door(rDoor).openDoor();
      setTimeout(new createPage().level, 1500);
    });
    setTimeout(function () {
      let dialogText = new Dialogs().instructions();
      new dialogActions().showDialog(dialogText);
    }, 200); 
  }
  level() { // страница уровня
    level++;
    levelLanguage = new Helpers().chooseLanguage(languages);

   /* ЧАСТЬ твоего последнего коммита
   new Office(new Helpers().randomArrayElem(offices), 2).createOffice();
    $(".hero-container").addClass(player.character);*/

    main.innerHTML = `<div class="game-background">
                        <h1 class='level__caption'>Level ${level} - ${levelLanguage}</h1>
                        <div class='magic'>
                          <div class='magic__spell attack'>Attack</div>
                          <div class='magic__spell shield'>Shield</div>
                          <div class='magic__spell heal'>Heal</div>
                          <div class='magic__spell multi-attack'>Multi-attack</div>
                          <div class='magic__spell helper'>Helper</div>
                          <div class='magic__spell super'>Super</div>
                        </div>
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
                        <div id="taskModal" class="modal">
                          <div class="task-modal-content">
                            <h1 class='task-caption'>TASK NAME</h1>
                            <div class='task-task-content'>
                              <p class='task-task-description' id='taskDesc'></p>
                              <p class='task-task-text' id='taskText'></p>
                            </div>
                            <div class='task-field' id='taskField'>
                              <div class='task-field-answer-container' id="taskFieldAnswer"> </div>
                              <div class='task-field-answer-btn-container' id="taskFieldBtn">
                                <input type="button" class='btn task-field-btn' value="Answer">
                              </div>
                            </div>
                          </div>
                        </div>                      
                        <div class='dialog' id = dialog>
                          <p class='dialog__message' id='message'></p>
                          <button type="button" class="dialog__button" id = 'dialogButton'>Start</button>
                        </div>
                      </div> `; //нарисовать страницу
    monster = new Monster(level);
    gameBackground = $('.game-background');
    taskField = document.getElementById('taskFieldAnswer');
    document.querySelector('.monster-health__wrapper').style.width = `${200 + 20*level}px`;
    document.querySelector('.hero-health-scale__number').innerHTML = player.health;
    document.querySelector('.monster-health-scale__number').innerHTML = monster.health;
    gameBackground.addClass(new Helpers().randomArrayElem(offices));    

    new MonsterGenerator(monsterHeadContainer, monsterBodyContainer, monsterLegsContainer).generateMonster(monsterHeadArray, monsterBodyArray, monsterLegsArray);

    // new NameGenerator(roleArray, nameArray, secondNameArray).generateRandomName();
    if (!monstersPhrases) {
      monstersPhrases = new Dialogs().monstersPhrases();
    }
    setTimeout(function () {
      let dialogText = new Helpers().randomArrayElem(monstersPhrases);
      new dialogActions().showDialog(Array.from(dialogText));
    }, 2000);

    let magic = document.querySelector('.magic');
    Array.from(magic.children).forEach(div => {
      div.addEventListener('click', e => {
        document.querySelector('.magic').classList.toggle('showSpells');
        spell = e.target.classList[1];
        modal = document.getElementById('taskModal');
        modal.style.display = 'block';
        new Spells()[spell]();
        //console.log(e.target.classList[1]);
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
    let index = new Helpers().randomNumber(arr.length-1); // слуйный индекс
    return arr.splice(index, 1)[0]; // удаляем этот элемент из массива и возвращаем его 
  }
  chooseLanguage(languages) { // выбор языка для уровня
    let index = new Helpers().randomNumber(languages.length);
    let language = languages.splice(index, 1).toString();
    return language;
  }
  addRandomClass(target, sourceArray) {
    return target.addClass(sourceArray[this.randomNumber(sourceArray.length)]);
  }
  createPlayer() { // создание объекта игрока
    let character = document.querySelector('.selected') ? document.querySelector('.selected').id :
      document.querySelector('.greeting__profile_character-item').id; // если пользователь не выбрал персонажа - взять персонажа по умолчанию
    player = new Player(document.getElementById('name').value || 'Anonim', character);
  }
  createMonster() { } // сюда запихнем создание имени, тела, объекта 
}

class dialogActions { // методы окна диалога
  constructor() { }
  showDialog(text) { //показать окно
    let dialogWrapper = document.getElementById('dialog');
    dialogWrapper.classList.toggle('dialog-active');
    let dialogButton = document.getElementById('dialogButton');
    dialogButton.addEventListener('click', new dialogActions().closeDialog);
    new dialogActions().writeDialogText('message', text, 50);
  }
  writeDialogText(id, text, speed) { // вывод текста
    let ele = document.getElementById(id),
      txt = text.join("").split("");
    let interval = setInterval(function () {
      if (!txt[0]) {
        return clearInterval(interval);
      };
      ele.innerHTML += txt.shift();
    }, speed != undefined ? speed : 100);
    return false;
  }
  closeDialog() { // закрыть окно
    let dialogWrapper = document.getElementById('dialog');
    dialogWrapper.classList.toggle('dialog-active');
    if (level) {
      document.querySelector('.magic').classList.toggle('showSpells');
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
        ["el", ".addEventListener(", '"click"', ",", "()", "=>", '{ alert("hello!"); }', ",", ");"],
        ["class", "Rectangle", "{", "constructor", "(height){", "this.height", "=", "height;", "} }"]
      ];

    let index = new Helpers().randomNumber(res.length); // генерируем рандомный индекс
    let answer = res[index]; // получаем массив с ответом
    let task = _.shuffle(res[index]);
    res.splice(index, 1); // удаляем этот вопрос из массива (вопросы не повторяются)
    new giveTask().showTaskOrder(rules, task, answer); // выводим на экран
  }
}

class Spells { // заклинания
  constructor() { } //в консоли пока отображаются ответы для задач
  attack() {
    console.log('HERE');
    console.log("LANGUAGE: ",levelLanguage);
    console.log('ARR: ', attackQuestions);
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
}

class giveTask { // вывод вопросов на экран
  constructor() { }
  showTaskSimple(rules, task, answer) { // вопросы по схеме правило -> текст 
    taskField.innerHTML = `<input type="text" class='task__form_answer'>`;
    answerButtom = document.querySelector('.btn');
    let description = document.getElementById('taskDesc');
    let text = document.getElementById('taskText');
    description.innerHTML = rules;
    text.innerHTML = task;
    result = new checkAnswer(answer); // создаем новый объект, в котором будет храниться ответ и проверяться ответ пользователя
    answerButtom.addEventListener('click', result.checkSimpleAnswer); // по клику - проверять результат
  }
  showTaskWithOptions(rules, task, options, answer) { //вопросы по схеме правило -> варианты ответов 
    taskField.innerHTML = `<label><input type='radio' class='task__form_options' name='answer' value='${options[0]}'>${options[0]}</label>
                           <label><input type='radio' class='task__form_options' name='answer' value='${options[1]}'>${options[1]}</label>
                           <label><input type='radio' class='task__form_options' name='answer' value='${options[2]}'>${options[2]}</label>
                           <label><input type='radio' class='task__form_options' name='answer' value='${options[3]}'>${options[3]}</label>`;
    answerButtom = document.querySelector('.btn');
    let description = document.getElementById('taskDesc');
    let text = document.getElementById('taskText');
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
                      </ul>`;
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
    if (answer === result.result) {
      console.log(true);
      new doSpell()[spell]();
    } else {
      console.log(false);
      //wrong, just close the frame 
    }
  }
  checkSelectedAnswer() { // проверка для вопросов с вариантами ответов
    console.log(taskField.querySelector(':checked').value);
    let answer = taskField.querySelector(':checked').value;
    if (answer === result.result) {
      console.log(true);
      new doSpell()[spell]();

    } else {
      console.log(false);
      //wrong, just close the frame 
      // передать ход монстру
    }
  }
  checkDroppedAnswer() {
    let children = $('.sortable').sortable('refreshPositions').children();
    $.each(children, function () {
      answerArray.push($(this).text().trim());
    });
    if (_.isEqual(answerArray, result.result)) {
      console.log(true);
      answerArray = [];
      // correct, do action
    } else {
      console.log(false);
      answerArray = [];
      //wrong, just close the frame 
    }
  }
}


class doSpell{
  constructor(){}
  attack(){
    modal.style.display = 'none';
    let monsterHealth = monster.health;
    if (monster.shield) {
      monster.health += monster.shield;
    }
    console.log('HEALTH ',monster.health);
    monster.health -= 40;
    console.log('HEALTH 2',monster.health);
    if (monster.health > (100 + 20 * level)) {
      monster.shield = monster.health - 100 + 20 * level;
      monster.health = 100 + 20 * level;
    }
    if(monster.health <= 0) {
      monster.health = 0;
      console.log('win');
      document.querySelector('.monster-health-scale').style.width = `${monster.health}%`;
      document.querySelector('.monster-health-scale__number').innerHTML = monster.health;
      // написать ф-ю победы на уровне и перейти в нее
    }
      document.querySelector('.monster-health-scale').style.width = `${monster.health*100/(100 + 20 * level)}%`;
      document.querySelector('.monster-health-scale').style.marginLeft = `${100 - monster.health*100/(100 + 20 * level)}%`;
      document.querySelector('.monster-health-scale__number').innerHTML = monster.health;
      // передать ход монстру 
  }
  shield(){
    console.log(player.shield);
    if (!player.shield){
      player.shield = 50;
      // придумать внешнее отображение щита
    }
  }
  heal(){
    console.log('DO SPELL');
    modal.style.display = 'none';
    if (player.health < 100) {
      player.health += 30;
      if (player.health > 100) {
        player.health = 100;
      }
    }
    document.querySelector('.hero-health-scale').style.width = `${player.health}%`;
    document.querySelector('.hero-health-scale__number').innerHTML = player.health;
    // передать ход монстру 
  }
}

class Dialogs {
  constructor() { }
  instructions() {
    // потом разобъем строку на части, чтобы красиво отображать
    let arr = [`Hello, ${player.name}, we were waiting for you! Welcome to 'Company name' - one of the best companies in the world. To get a job you have to go through 5 interviews. Each interview will check your knowledge in some programming language. Your "monsters" are waiting for you, if you are ready - go through that door. Good luck!`];
    return arr;
  }
  monstersPhrases() {
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
    this.door.classList.add("doorOpened");
  }
}
class MonsterGenerator {
  constructor(head, body, legs) {
    this.head = head;
    this.body = body;
    this.legs = legs;
  }
  generateMonster(headArray, bodyArray, legsArray) {
    new Helpers().addRandomClass(this.head, headArray);
    new Helpers().addRandomClass(this.body, bodyArray);
    new Helpers().addRandomClass(this.legs, legsArray);
  }
}

class NameGenerator {
  constructor(nameOptionsArray1, nameOptionsArray2, nameOptionsArray3) {
    this.nameOptionsArray1 = nameOptionsArray1;
    this.nameOptionsArray2 = nameOptionsArray2;
    this.nameOptionsArray3 = nameOptionsArray3;
  };
  generateRandomName() {
    return console.log(this.nameOptionsArray1[new Helpers().randomNumber(this.nameOptionsArray1.length)] + ' ' +
      this.nameOptionsArray2[new Helpers().randomNumber(this.nameOptionsArray2.length)] + ' ' +
      this.nameOptionsArray3[new Helpers().randomNumber(this.nameOptionsArray3.length)]);
  }
}

class Monster { // класс монстра
  constructor(level) {
    this.name = generateRandomName(roleArray, nameArray, secondNameArray);
    this.health = 100 + 20 * level;  // переменная, которая будет определять номер уровеня (1, 2, 3, 4, 5)
    this.spells = ['attack', 'shield', 'heal', 'helper', 'multipleAttack'];
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