import { englishVocab, audioVocabulary } from './tasks'
import { checkAnswer } from './check-answer'
import { setVoiceGender } from "./helpers";

import { SIMPLE_TASK_HTML, LISTEN_BTN_HTML, ANSWER_BTN_HTML } from '../consts/html_consts';

let result,
  synth = window.speechSynthesis;

export class giveTask {
  constructor() { }
  createTaskField(taskField, rules, resultCheck, key, task) {
    $('#taskFieldAnswer').html(taskField);
    $('#taskDesc').html(rules);
    new checkAnswer().submitAnswer('#answerBtn', resultCheck);
    if (task) {
      $('#taskText').html(task);
      document.querySelector('.task-modal-content').classList.add('countTask');
    }
    if (key) {
      new checkAnswer().submitAnswer('.task__form_answer', resultCheck, true);
    }
  }
  showTaskSimple(rules, task, answer) {
    result = new checkAnswer(answer);
    this.createTaskField(SIMPLE_TASK_HTML, rules, result.checkSimpleAnswer, true, task);
  }
  showTaskAudio(rules, task, answer) {
    result = new checkAnswer(answer);
    this.createTaskField(SIMPLE_TASK_HTML, rules, result.checkSimpleAnswer, true, LISTEN_BTN_HTML);

    $('#audioBtn').click(() => {
      let readTaskText = new SpeechSynthesisUtterance(task);
      setVoiceGender(readTaskText);
      synth.speak(readTaskText);
    });

    delete audioVocabulary[task];
  };
  showTaskWithOptions(rules, task, options, answer) {
    let taskFieldHTML = `<label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[0]}'>${options[0]}</label>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[1]}'>${options[1]}</label>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[2]}'>${options[2]}</label>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[3]}'>${options[3]}</label>
                           <input type="button" class='btn task-field-btn' value="Answer" id="answerBtn">`;

    result = new checkAnswer(answer);
    this.createTaskField(taskFieldHTML, rules, result.checkSelectedAnswer, false, task);
    $(".task-modal-content").addClass('options');
  }
  showTaskOrder(rules, task, answer) {
    let taskHTML = `<ul class="sortable task-filed-answer">
                        <li class="drag-item" id="id_1">${task[0]}</li>
                        <li class="drag-item" id="id_2">${task[1]}</li>
                        <li class="drag-item" id="id_3">${task[2]}</li>
                        <li class="drag-item" id="id_4">${task[3]}</li>
                        <li class="drag-item" id="id_5">${task[4]}</li>
                        <li class="drag-item" id="id_6">${task[5]}</li>
                        <li class="drag-item" id="id_7">${task[6]}</li>
                        <li class="drag-item" id="id_7">${task[7]}</li>
                        <li class="drag-item" id="id_7">${task[8]}</li>
                      </ul>`;

    result = new checkAnswer(answer);
    this.createTaskField(ANSWER_BTN_HTML, rules, result.checkDroppedAnswer, false, taskHTML);
    $(function () {
      $(".sortable").sortable();
    });
  }
  showTrueFalseTask(rules, task, answer) {
    let taskFieldHTML = `<label class='options-label'><input type='radio' class='task__form_options' name='answer' value='True'>True</label>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='False'>False</label> 
                           <input type="button" class='btn task-field-btn' value="Answer" id="answerBtn">`;


    result = new checkAnswer(answer);
    document.querySelector(".task-modal-content").classList.add('options');
    this.createTaskField(taskFieldHTML, rules, result.checkSelectedAnswer, false, task);
  }
  showCountTask(rules, task, src, answer) {
    let taskFieldHTML = `<img src=${src} class='count-task'>
                            <input type="text" class='task__form_answer' autofocus>
                            <input type="button" class='btn task-field-btn' value="Answer" id="answerBtn">`;

    result = new checkAnswer(answer);
    this.createTaskField(taskFieldHTML, rules, result.checkSimpleAnswer, true);
  }
  showTaskFirstInEquation(rules, task, answer) {
    let taskFieldHTML = `<label><input type="text" class='task__form_answer math' autofocus>${task}</label>
                          <input type="button" class='btn task-field-btn' value="Answer" id="answerBtn">`;

    result = new checkAnswer(answer);
    this.createTaskField(taskFieldHTML, rules, result.checkSimpleAnswer, true);
  }
  showTaskSecondInEquation(rules, firstPart, secondPart, answer) {
    let taskFieldHTML = `<label>${firstPart}<input type="text" class='task__form_answer math' autofocus>${secondPart}</label>
                          <input type="button" class='btn task-field-btn' value="Answer">`;

    result = new checkAnswer(answer);
    this.createTaskField(taskFieldHTML, rules, result.checkSimpleAnswer, true);
  }
  showTaskAddWord(rules, firstPart, secondPart, answer) {
    let taskFieldHTML = `<label>${firstPart}<input type="text" class='task__form_answer word' autofocus>${secondPart}</label>
                          <input type="button" class='btn task-field-btn' value="Answer" id="answerBtn">`;

    result = new checkAnswer(answer);
    this.createTaskField(taskFieldHTML, rules, result.checkSimpleAnswer, true);
  }
  showTaskCelebrities(rules, src, options, answer) {
    let taskFieldHTML = `<img src=${src} class='celebrities-task'>
                           <div class='options-wrapper'>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[0]}'>${options[0]}</label>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[1]}'>${options[1]}</label>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[2]}'>${options[2]}</label>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[3]}'>${options[3]}</label>
                           <input type="button" class='btn task-field-btn' value="Answer" id="answerBtn">
                           </div>`;

    result = new checkAnswer(answer);
    this.createTaskField(taskFieldHTML, rules, result.checkSimpleAnswer, true);
  }
}

export { result }
