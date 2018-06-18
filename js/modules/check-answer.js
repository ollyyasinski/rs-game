import { result } from './give-task'
import { Helpers } from './helpers'

let answerArray = [];

export class checkAnswer {
  constructor(res) {
    this.result = res;
  }
  checkSimpleAnswer() {
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
        if (result.result[i].toLowerCase() === answer) {
          return new Helpers().showIfAnswerCorrect();
        }
      }
      return new Helpers().showIfAnswerWrong();
    }
  }
  checkSelectedAnswer() {
    let answer = taskField.querySelector(':checked') || '';
    if (answer.value === result.result) {
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
