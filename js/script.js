let result;
let answerArray = [];

let languages = ['js', 'css', 'html', 'c', 'java', 'php', 'ruby', 'python']; // ЯП для монстров (уровней)
let form = document.getElementById('form');
const main = document.querySelector('.wrapper');
let attackQuestions, shieldQuestions, healQuestions; // массивы вопросов (чтобы исключить повторение вопросов)
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

// выбор аватарки игрока (потом закинум в какой-нибудь класс. или нет)
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
    let name = generateRandomName(roleArray, nameArray, secondNameArray);
    let health = 100 + 20 * level;  // переменная, которая будет определять номер уровеня (1, 2, 3, 4, 5)
    let incantations = ['attack', 'shield', 'heal', 'helper', 'multipleAttack'];
  }
} 

class createPage { // класс для создания страниц (скорее всего, все уровни будут создаваться одним методом level)
  constructor() { }
  reseption() { // страница ресепшена
    new Helpers().createPlayer();
    main.innerHTML = ``;
    // отрисовать, повесть события, написать ф-ю для диалога
  }
  level() { // страница уровня
    let levelLanguage = new Helpers().chooseLanguage(languages);
    main.innerHTML = `<h1 class='level__caption'>Level ${level} - ${levelLanguage}</h1>
                      <div>some div for dialog</div>`; //нарисовать страницу
    monster = new Monster(level);
  }
}

class Helpers {
  constructor() { }
  randomNumber(max) { // генератор случайных чисел
    return Math.floor(Math.random() * max);
  }
  chooseLanguage(languages) { // выбор языка для уровня
    let index = new Helpers().randomNumber(languages.length);
    let language = languages.splice(index, 1).toString();
    return language;
  }
  createPlayer() { // создание объекта игрока
    player = new Player(document.getElementById('name').value || 'Anonim', Array.from(document.querySelector('.selected').children)[0].src);
  }
  createMonster() { } // сюда запихнем создание имени, тела, объекта 
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
      let index = new Helpers().randomNumber(attackQuestions.length); // генерируем рандомный индекс
      let question = attackQuestions[index]; // получаем массив с вопросом и ответом
      console.log('Answer ', question[1]);
      attackQuestions.splice(index, 1); // удаляем этот вопрос из массива (вопросы не повторяются)
      let rules = new AttackQuestions().rules; // правила для этого вида заклинаний
      new giveTask().showTaskSimple(rules, question[0], question[1]); // выводим вопрос
    }
  }
  shield() {
    //как и атака
    shieldQuestions = new ShieldQuestions()[levelLanguage]();
    let index = new Helpers().randomNumber(shieldQuestions.length);
    let question = shieldQuestions[index];
    console.log('Answer ', question[1]);
    shieldQuestions.splice(index, 1);
    let rules = new ShieldQuestions().rules;
    new giveTask().showTaskSimple(rules, question[0], question[1]);
  }
  heal() {
    healQuestions = new HealQuestions()[levelLanguage]();
    let index = new Helpers().randomNumber(healQuestions.length);
    let question = healQuestions[index];
    let rules = new HealQuestions().rules;
    healQuestions.splice(index, 1);
    new giveTask().showTaskWithOptions(rules, question[0], question[1], question[2]);
    console.log('Answer ', question[2]);
  }
}

class giveTask { // вывод вопросов на экран
  constructor() { }
  showTaskSimple(rules, task, answer) { // вопросы по схеме правило -> текст 
    form.innerHTML = `<input type="text" class='task__form_answer'>
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
    form.innerHTML = `<label><input type='radio' class='task__form_options' name='answer' value='${options[0]}'>${options[0]}</label>
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
    form.innerHTML = `<ul id="sortable">
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
                      <input type="button" class='task__form_button' value="Answer">`;
    answerButtom = document.querySelector('.task__form_button');
    let description = document.getElementById('taskDesc');
    description.innerHTML = rules;
    result = new checkAnswer(answer); // создаем новый объект, в котором будет храниться ответ и проверяться ответ пользователяЧ
    $(function () {
      $("#sortable").sortable();
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
    console.log(form.querySelector(':checked').value);
    let answer = form.querySelector(':checked').value;
    if (answer === result.result) {
      console.log(true);
      // correct, do action
    } else {
      console.log(false);
      //wrong, just close the frame 
    }
  }
  checkDroppedAnswer() {
    let children = $('#sortable').sortable('refreshPositions').children();
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

class Dialogs{
  constructor(){}
  instructions(){
    // потом разобъем строку на части, чтобы красиво отображать
    let arr = [`Hello, ${player.name}, we were waiting for you! Welcome to 'Company name' - one of the best companies in the world. To get a job you have to go through 5 interviews. Each interview will check your knowledge in some programming language. Your "monsters" are waiting for you, if you are ready - go through that door. Good luck!`];
    return arr;
  }
  monstersPhrases(){
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
  monstersPhrasesFinal(){
    let arr = [
      `Great work, ${player.name}! It is the last test, let's begin!`,
      `Was it easy to get here? Well, the last fight!`,
      `Don't be too happy, ${player.name}! Here everything can end!`
    ];
    return arr;
  }
}

const startButton = document.getElementById('startGame');
startButton.addEventListener('click', new createPage().reseption);
//rightDoor.addEventListener('click', new createPage().level);
//leftDoor.addEventListener('click', new createPage().level);
//тест разных способностей

//new Incantations().heal();
//new Incantations().attack();
//new Incantations().shield();
//new Tasks().calculator();

$("#myBtn").click(new Tasks().putInRightOrder());