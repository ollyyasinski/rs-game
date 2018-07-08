import { result } from './give-task';
import { showIfAnswerCorrect, showIfAnswerWrong } from '../helpers/helpers';
import { KeyboardEvents } from './consts/taskConsts';

let answerArray = [];

export class checkAnswer {
  constructor(res) {
    this.result = res;
  }
  checkSimpleAnswer() {
    let answer = document.querySelector('.task__form_answer').value.replace(/(^\s*)|(\s*)$/g, '').toLowerCase();
    if (typeof result.result === 'string') {
      if (answer === result.result) {
        showIfAnswerCorrect();
      } else {
        showIfAnswerWrong();
      }
    }
    if (typeof result.result === 'object') {
      for (let i in result.result) {
        if (result.result[i].toLowerCase() === answer) {
          return showIfAnswerCorrect();
        }
      }
      return showIfAnswerWrong();
    }
  }
  checkSelectedAnswer() {
    let answer = taskField.querySelector(':checked') || '';
    if (answer.value === result.result) {
      showIfAnswerCorrect();
    } else {
      showIfAnswerWrong();
    }
  }
  checkDroppedAnswer() {
    let children = $('.sortable').sortable('refreshPositions').children();
    $.each(children, function () {
      answerArray.push($(this).text().trim());
    });
    if (_.isEqual(answerArray, result.result)) {
      answerArray = [];
      showIfAnswerCorrect();
    } else {
      answerArray = [];
      showIfAnswerWrong();
    }
  }
  submitAnswer(selector, check, key) {
    if (key) {
      $(selector).keypress(e => {
        if (e.which === KeyboardEvents.ENTER) {
          check();
          $(selector).blur();
        }
      })
    } else {
      $(selector).click(check);
    }
  }
}
