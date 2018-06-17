let { gameBackground } = require('../script');

class Helpers {
    constructor() { };
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
        console.log(player);
        debugger;
        player = new Player(document.getElementById('name').value || 'Anonim', character);
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
                document.querySelector(".task-modal-content").classList.remove('options');
                document.querySelector(".task-modal-content").classList.remove('countTask');
                new doSpell()[spell]();
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
    showIfAnswerWrong() { // показывает Wrong, если введенные ответ не правильный
        new dialogActions().writeDialogText('answer__wrong', ['Wrong'], 100);
        if (blitzCount > 0) {
            blitzCount--;
        }
        if (blitzCount === false) {
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
        spell = 'superAttack';
        doSuper = true;
        document.querySelector('.spells').classList.toggle('showSpells');
        modal = document.getElementById('taskModal');
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

export { Helpers };