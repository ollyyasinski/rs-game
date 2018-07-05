import {
  englishVocab, audioVocabulary, vocabularyReverse, smallQuestions, countQuestions, nameQuestions, addWordQuestions, celebritiesQuestions, ddQuestions
} from './tasks'
import { Player } from './player-object'
import { dialogActions } from './dialogs'
import { modal, spell } from './show-spell';
import { monsterAttack } from './monster-attack';
import { doSpell } from './do-spell';
import { Spells } from './spells'
import { volume, rate } from './game-settings'

let blitzCount = false;
let blitzPower = 0;
let player;
let synth = window.speechSynthesis;
let voices;
let doSuper;


let createPlayer = () => {
  let character = document.querySelector('.selected') ? document.querySelector('.selected').id : 'hero-2';
  player = new Player(document.getElementById('name').value || 'Anonim', character);
  return player;
};

let selectElement = e => {
  let current = $('.selected'),
    elem = $(e.target);
  if (current) {
    current.removeClass('selected');
  }
  if (elem.prop('tagName') === 'IMG') {
    elem = elem.parent();
  };
  elem.addClass('selected');
};

let chooseLanguage = (languages) => {
  let index = _.random(0, languages.length - 1, 0);
  let language = languages.splice(index, 1).toString();
  return language;
}

let randomArrayElem = (arr) => {
  return arr.splice(generateRandomArrayIndex(arr), 1)[0];
}

let generateRandomArrayIndex = (array) => {
  return _.random(0, array.length - 1, 0);
};

let addRandomClass = (target, sourceArray) => {
  return target.addClass(sourceArray[generateRandomArrayIndex(sourceArray)]);
};

let createBattle = (level, player, monster) => {
  $('.monster-health__wrapper').css('width', 200 + 20 * level + 'px');
  $('.hero-health-scale__number').html(player.health);
  $('.monster-health-scale__number').html(monster.health);
  $('.hero-shield__number').html(player.shield);
  $('.monster-shield__number').html(monster.shield);
};

let roundToTwenty = (number, increment, offset) => {
  return Math.ceil((number - offset) / increment) * increment + offset;
};

let showIfAnswerCorrect = () => {
  new dialogActions().writeDialogText('answer__correct', ['Correct'], 100);
  let { BC } = require('./spells');
  blitzCount = BC;
  if (blitzCount > 0) {
    blitzCount--;
    blitzPower += 20;
  }
  if (blitzCount === 0 || blitzCount === false || blitzCount === undefined) {
    setTimeout(function () {
      modal.style.display = 'none';
      $('#taskText').html('');
      document.getElementById('answer__correct').innerHTML = '';
      document.querySelector(".task-modal-content").classList.remove('options');
      document.querySelector(".task-modal-content").classList.remove('countTask');
      new doSpell()[spell]();
      if (spell === 'super') {
        player.super = 0;
        doSuper = false;
        document.querySelector('.hero-super_scale').style.width = `${player.super}%`;
        new Helpers().blockSuperAttack();
      }
      blitzCount = false;
      blitzPower = 0;
    }, 1500);
  } else {
    setTimeout(function () {
      modal.style.display = 'none';
      $('#taskText').html('');
      document.getElementById('answer__correct').innerHTML = '';
      document.querySelector(".task-modal-content").classList.remove('countTask');
    }, 1000);

    setTimeout(function () {
      new Spells().blitzAttack();
    }, 1500);
  }
};

let showIfAnswerWrong = () => {
  new dialogActions().writeDialogText('answer__wrong', ['Wrong'], 100);
  let { BC } = require('./spells');
  blitzCount = BC;
  if (blitzCount > 0) {
    blitzCount--;
  }
  if (blitzCount === false || blitzCount === undefined) {
    setTimeout(function () {
      modal.style.display = 'none';
      $('#taskText').html('');
      document.getElementById('answer__wrong').innerHTML = '';
      document.querySelector(".task-modal-content").classList.remove('options');
      document.querySelector(".task-modal-content").classList.remove('countTask');
      new monsterAttack();
    }, 1500);
  }
  if (doSuper === true) {
    doSuper = false;
    player.super = 0;
    document.querySelector(".task-modal-content").classList.remove('countTask');
    document.querySelector('.hero-super_scale').style.width = `${player.super}%`;
    new Helpers().blockSuperAttack();
  }
  if (blitzCount === 0) {
    setTimeout(function () {
      modal.style.display = 'none';
      $('#taskText').html('');
      document.getElementById('answer__wrong').innerHTML = '';
      document.querySelector(".task-modal-content").classList.remove('countTask');
      new doSpell()[spell]();
      blitzCount = false;
      blitzPower = 0;
    }, 1500);
  } else if (blitzCount > 0) {
    setTimeout(function () {
      modal.style.display = 'none';
      $('#taskText').html('');
      document.getElementById('answer__wrong').innerHTML = '';
      document.querySelector(".task-modal-content").classList.remove('countTask');
    }, 1000);

    setTimeout(function () {
      new Spells().blitzAttack();
    }, 1500);
  }
}

let generateRandomObjProperty = (obj) => {
  let result,
    count = 0;
  for (let prop in obj)
    if (Math.random() < 1 / ++count)
      result = prop;
  return result;
}


let setVoiceGender = (reading, gender) => {
  voices = synth.getVoices();
  (gender === 'female') ? reading.voice = _.find(voices, (o) => { return o.voiceURI === "Google UK English Female"; }) : reading.voice = _.find(voices, (o) => { return o.voiceURI === "Google UK English Male"; });
}

let createReadableText = (text) => {
  let readableText = new SpeechSynthesisUtterance(text);
  readableText.volume = volume;
  readableText.rate = rate;
  return readableText;
}

let unblockSuperAttack = () => {
  document.querySelector('.super').classList.toggle('blockSuper');
  document.querySelector('.hero-super').classList.toggle('super__full');
  document.querySelector('.super').addEventListener('click', new Helpers().superClick);
}

let blockSuperAttack = () => {
  document.querySelector('.super').classList.toggle('blockSuper');
  document.querySelector('.hero-super').classList.toggle('super__full');
  document.querySelector('.super').removeEventListener('click', new Helpers().superClick);
}

let superClick = () => {
  let spell = 'superAttack';
  doSuper = true;
  document.querySelector('.spells').classList.toggle('showSpells');
  let modal = document.getElementById('taskModal');
  modal.style.display = 'block';
  new Spells()[spell]();
}

let randomTasksArray = () => {
  let arr = ['calculator', 'firstNumberInEquation', 'secondNumberInEquation'];
  if (Object.keys(englishVocab).length !== 0) {
    arr.push('translate');
  }
  if (Object.keys(audioVocabulary).length !== 0) {
    arr.push('audioTask');
  }
  if (vocabularyReverse.length !== 0) {
    arr.push('translateRUtoEN');
  }
  if (smallQuestions.length !== 0) {
    arr.push('trueAndFalseQuestions');
  }
  if (countQuestions.length !== 0) {
    arr.push('count');
  }
  if (nameQuestions.length !== 0) {
    arr.push('nameTheThing');
  }
  if (addWordQuestions.length !== 0) {
    arr.push('addWord');
  }
  if (celebritiesQuestions.length !== 0) {
    arr.push('chooseRightName');
  }
  if (ddQuestions.length !== 0) {
    arr.push('putInRightOrder');
  }
  return arr;
}

export {
  blitzCount, blitzPower, createPlayer, selectElement, chooseLanguage, randomArrayElem, addRandomClass,
  createBattle, roundToTwenty, showIfAnswerCorrect, showIfAnswerWrong, generateRandomObjProperty, setVoiceGender,
  createReadableText, unblockSuperAttack, blockSuperAttack, superClick, randomTasksArray
}
