import {
  englishVocab, audioVocabulary, vocabularyReverse, smallQuestions, countQuestions, nameQuestions, addWordQuestions, celebritiesQuestions, ddQuestions
} from './tasks'
import { Player } from './player-object'
import { dialogActions } from './dialogs'
import { modal, text, spell } from './create-page'; 
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

export class Helpers {
  constructor() { }
  randomNumber(max) {
    return Math.floor(Math.random() * max);
  }
  randomArrayElem(arr) {
    let index = new Helpers().randomNumber(arr.length);
    return arr.splice(index, 1)[0];
  }
  chooseLanguage(languages) {
    let index = new Helpers().randomNumber(languages.length);
    let language = languages.splice(index, 1).toString();
    return language;
  }
  selectElement(e) {
    let current = document.querySelector('.selected');
    let elem = e.target;
    if (current) {
      current.classList.remove('selected');
    }
    if (elem.tagName === 'IMG') {
      elem = e.target.parentElement;
    };
    elem.classList.add('selected');
  };
  roundToTwenty(number, increment, offset) {
    return Math.ceil((number - offset) / increment) * increment + offset;
  };
  generateRandomArrayIndex(array) {
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
  createPlayer() {
    let character = document.querySelector('.selected') ? document.querySelector('.selected').id : 'hero-2';
    player = new Player(document.getElementById('name').value || 'Anonim', character);
    return player;
  }
  showIfAnswerCorrect() {
    new dialogActions().writeDialogText('answer__correct', ['Correct'], 100);
    let {BC} = require('./spells');
    blitzCount = BC;
    if (blitzCount > 0) {
      blitzCount--;
      blitzPower += 20;
    }
    if (blitzCount === 0 || blitzCount === false || blitzCount === undefined) {
      setTimeout(function () {
        modal.style.display = 'none';
        text.innerHTML = '';
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
        text.innerHTML = '';
        document.getElementById('answer__correct').innerHTML = '';
        document.querySelector(".task-modal-content").classList.remove('countTask');
      }, 1000);

      setTimeout(function () {
        new Spells().blitzAttack();
      }, 1500);
    }
  }
  showIfAnswerWrong() {
    new dialogActions().writeDialogText('answer__wrong', ['Wrong'], 100);
    let {BC} = require('./spells');
    blitzCount = BC;
    if (blitzCount > 0) {
      blitzCount--;
    }
    if (blitzCount === false  || blitzCount === undefined) {
      setTimeout(function () {
        modal.style.display = 'none';
        text.innerHTML = '';
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
        text.innerHTML = '';
        document.getElementById('answer__wrong').innerHTML = '';
        document.querySelector(".task-modal-content").classList.remove('countTask');
        new doSpell()[spell]();
        blitzCount = false;
        blitzPower = 0;
      }, 1500);
    } else if (blitzCount > 0) {
      setTimeout(function () {
        modal.style.display = 'none';
        text.innerHTML = '';
        document.getElementById('answer__wrong').innerHTML = '';
        document.querySelector(".task-modal-content").classList.remove('countTask');
      }, 1000);

      setTimeout(function () {
        new Spells().blitzAttack();
      }, 1500);
    }
  }
  setVoiceGender(reading, gender) {
    voices = synth.getVoices();
    (gender === 'female') ? reading.voice = _.find(voices, (o) => { return o.voiceURI === "Google UK English Female"; }) : reading.voice = _.find(voices, (o) => { return o.voiceURI === "Google UK English Male"; });
  }
  createReadableText(text) {
    let readableText = new SpeechSynthesisUtterance(text);
    readableText.volume = volume;
    readableText.rate = rate;
    return readableText;
  }
  unblockSuperAttack() {
    document.querySelector('.super').classList.toggle('blockSuper');
    document.querySelector('.hero-super').classList.toggle('super__full');
    document.querySelector('.super').addEventListener('click', new Helpers().superClick);
  }
  blockSuperAttack() {
    document.querySelector('.super').classList.toggle('blockSuper');
    document.querySelector('.hero-super').classList.toggle('super__full');
    document.querySelector('.super').removeEventListener('click', new Helpers().superClick);
  }
  superClick() {
    let spell = 'superAttack';
    doSuper = true;
    document.querySelector('.spells').classList.toggle('showSpells');
    let modal = document.getElementById('taskModal');
    modal.style.display = 'block';
    new Spells()[spell]();
  }
  randomTasksArray() {
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
}

export { blitzCount, blitzPower }
