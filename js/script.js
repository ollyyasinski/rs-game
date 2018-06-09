let result;
let answerArray = [];

let languages = ['js', 'css', 'html', 'c', 'java', 'php', 'ruby', 'python']; // ЯП для монстров (уровней)
let taskField = document.getElementById('taskFieldAnswer');
let main = document.querySelector('main'),
  body = $('body');
let attackQuestions, shieldQuestions, healQuestions, monstersPhrases; // массивы вопросов (чтобы исключить повторение вопросов)
let answerButtom; // кнопка "отправки" ответа, создается в процессе отображения задачи
const incantationsPower = { // силы способностей (будем тестировать)
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
let level = 1;
let levelLanguage;
let gameBackground,
  offices = ['reception', 'office-1', 'office-2', 'office-3', 'office-4'],
  fullGameBody = `<div class="game-background">
  <div class="door door-left"></div>
  <div class="door door-right"></div>
  <div class="hero-container"></div>
  <div class="monster-container">
      <div class="monster-head-container"></div>
      <div class="monster-body-container"></div>
      <div class="monster-legs-container"></div>
  </div>
</div>`,
  oneDoorGameBody = `<div class="game-background game-background-mirror">
<div class="door door-right"></div>
<div class="hero-container"></div>
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


class Player { // класс игрока
  constructor(name, character) {
    this.name = name;
    this.health = 100;
    this.incantations = ['attack', 'shield', 'heal', 'helper', 'multipleAttack'];
    this.character = character; // ссылка на выбранного персонажа;
  }
}

class Monster { // класс монстра
  constructor(level) {
    this.name = generateRandomName(roleArray, nameArray, secondNameArray);
    this.health = 100 + 20 * level;  // переменная, которая будет определять номер уровеня (1, 2, 3, 4, 5)
    this.incantations = ['attack', 'shield', 'heal', 'helper', 'multipleAttack'];
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

new Door(leftDoor).openDoor();
new Door(rightDoor).openDoor();

class createPage { // класс для создания страниц (скорее всего, все уровни будут создаваться одним методом level)
  constructor() { }
  greeting() {
    const characters = document.getElementById('characters'); 
    Array.from(characters.children).forEach(div => {
      div.addEventListener('click', e => {
        let current = document.querySelector('.selected');
        let elem = e.target;
        if(current){
          current.classList.remove('selected');
        }
        if(elem.tagName === 'IMG'){
          elem = e.target.parentElement;
        };
        elem.classList.add('selected');
      });
    });
    const startButton = document.getElementById('startGame');
    startButton.addEventListener('click', new createPage().reception);
  }
  // это же ресепшн, а не уровень, почему goToLevel?
  reception() { // страница ресепшена 
    new Helpers().createPlayer();
    main.classList.add('wrapper__reception');
    main.innerHTML = receptionHTML;
    gameBackground = $('.game-background');
    gameBackground.addClass(offices[0]);

    new Door(rightDoor).openDoor();
    let rDoor = document.querySelector('.door-right');
    rDoor.addEventListener('click', new createPage().level);
    setTimeout(function () {
      let dialogText = new Dialogs().instructions();
      new dialogActions().showDialog(dialogText);
    }, 2000);
  }
  level() { // страница уровня
    levelLanguage = new Helpers().chooseLanguage(languages);
    main.innerHTML = `<h1 class='level__caption'>Level ${level} - ${levelLanguage}</h1> 
                      <div class='dialog' id = dialog></div>`; //нарисовать страницу
    monster = new Monster(level);
    new MonsterGenerator(monsterHeadContainer, monsterBodyContainer, monsterLegsContainer).generateMonster(monsterHeadArray, monsterBodyArray, monsterLegsArray);
    new NameGenerator(roleArray, nameArray, secondNameArray).generateRandomName();
    if (!monstersPhrases) {
      monstersPhrases = new Dialogs().monstersPhrases();
    }
    setTimeout(function () {
      let dialogText = new Helpers().randomArrayElem(monstersPhrases);
      new dialogActions().showDialog(Array.from(dialogText));
    }, 2000);
  }
}

class Helpers {
  constructor() { }
  randomNumber(max) { // генератор случайных чисел
    return Math.floor(Math.random() * max);
  }
  randomArrayElem(arr) { // взять из массива случайный элемент и удалить его из массива
    let index = new Helpers().randomNumber(arr.length); // слуйный индекс
    return arr.splice(index, 1)[0]; // удаляем этот элемент из массива и возвращаем его 
  }
  chooseLanguage(languages) { // выбор языка для уровня
    let index = new Helpers().randomNumber(languages.length);
    let language = languages.splice(index, 1).toString();
    return language;
  }
  addRandomClass(target, sourceArray) {
    return target.addClass(sourceArray[this.generateRandomArrayIndex(sourceArray)]);
  }
  createPlayer() { // создание объекта игрока
    let character = document.querySelector('.selected') ? Array.from(document.querySelector('.selected').children)[0].src :
      document.querySelector('.greeting__profile_character-item').src; // если пользователь не выбрал персонажа - взять персонажа по умолчанию
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

class Incantations { // заклинания
  constructor() { } //в консоли пока отображаются ответы для задач
  attack() {
    if (!attackQuestions) {
      attackQuestions = new AttackQuestions()[levelLanguage](); // получаем массив в вопросами для данного уровня
    }
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
    taskField.innerHTML = `<input type="text" class='task__form_answer'>
                      <input type="button" class='task__form_button' value="Answer">`;
    answerButtom = document.querySelector('.task__form_button');
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
                      <label><input type='radio' class='task__form_options' name='answer' value='${options[3]}'>${options[3]}</label>
                      <input type="button" class='task__form_button' value="Answer">`;
    answerButtom = document.querySelector('.task__form_button');
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
      // correct, do action
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
      // correct, do action
    } else {
      console.log(false);
      //wrong, just close the frame 
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
      `Glad to see you, ${player.name}! Let's do ${levelLanguage}`,
      `You think my level is easy? ${levelLanguage} is not a language, it's a life style!`,
      `Let's see what you got, ${player.name}!.`,
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

new createPage().greeting();
// rightDoor.addEventListener('click', new createPage().level);
// leftDoor.addEventListener('click', new createPage().level);
//тест разных способностей

//new Incantations().heal();
//new Incantations().attack();
//new Incantations().shield();
//new Tasks().calculator();

// $("#myBtn").click(new Tasks().putInRightOrder());