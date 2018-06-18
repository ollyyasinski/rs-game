import { text, description, taskField } from './create-page'
import { englishVocab, audioVocabulary } from './tasks'
import { checkAnswer } from './check-answer'
import { Helpers } from "./helpers";

let answerButtom, rules, result;
let synth = window.speechSynthesis;

export class giveTask {
  constructor() { }
  showTaskSimple(rules, task, answer) { 
    taskField.innerHTML = `<input type="text" class='task__form_answer' autofocus>
                           <input type="button" class='btn task-field-btn' value="Answer">`;
    answerButtom = document.querySelector('.btn');
    description.innerHTML = rules;
    text.innerHTML = task;
    result = new checkAnswer(answer);
    $(".task__form_answer").keypress(function (e) {
      if (e.which == 13) {
        result.checkSimpleAnswer();
      }
    });
    answerButtom.addEventListener('click', result.checkSimpleAnswer);
  }
  showTaskAudio(rules, task, answer) {
    taskField.innerHTML = `<input type="text" class='task__form_answer' autofocus>
                           <input type="button" class='btn task-field-btn' value="Answer">`;
    let description = document.querySelector('#taskDesc'),
      text = document.querySelector('#taskText');
    answerButtom = document.querySelector('.btn');
    description.innerHTML = rules;
    text.innerHTML = `<input type="button" class='btn' id="audioBtn" value= "Click to listen">`;
    let audioBtn = $('#audioBtn');

    audioBtn.click(() => {
      let readTaskText = new SpeechSynthesisUtterance(task);
      new Helpers().setVoiceGender(readTaskText);
      synth.speak(readTaskText);
    });

    result = new checkAnswer(answer); 
    $(".task__form_answer").keypress(function (e) {
      if (e.which == 13) {
        result.checkSimpleAnswer();
      }
    });    
    answerButtom.addEventListener('click', result.checkSimpleAnswer); 
    delete audioVocabulary[task]; 
  };
  showTaskWithOptions(rules, task, options, answer) {
    taskField.innerHTML = `<label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[0]}'>${options[0]}</label>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[1]}'>${options[1]}</label>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[2]}'>${options[2]}</label>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[3]}'>${options[3]}</label>
                           <input type="button" class='btn task-field-btn' value="Answer">`;
    answerButtom = document.querySelector('.btn');
    document.querySelector(".task-modal-content").classList.add('options');
    description.innerHTML = rules;
    text.innerHTML = task;
    result = new checkAnswer(answer);
    answerButtom.addEventListener('click', result.checkSelectedAnswer);
  }
  showTaskOrder(rules, task, answer) {
    text.innerHTML = `<ul class="sortable task-filed-answer">
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
    taskField.innerHTML = `<input type="button" class='btn task-field-btn' value="Answer">`;
    answerButtom = document.querySelector('.task-field-btn');
    description.innerHTML = rules;
    result = new checkAnswer(answer);
    $(function () {
      $(".sortable").sortable();
    });
    answerButtom.addEventListener('click', result.checkDroppedAnswer);
  }
  showTrueFalseTask(rules, task, answer) {
    taskField.innerHTML = `<label class='options-label'><input type='radio' class='task__form_options' name='answer' value='True'>True</label>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='False'>False</label> 
                           <input type="button" class='btn task-field-btn' value="Answer">`;
    answerButtom = document.querySelector('.btn');
    document.querySelector(".task-modal-content").classList.add('options');
    description.innerHTML = rules;
    text.innerHTML = task;
    result = new checkAnswer(answer);
    answerButtom.addEventListener('click', result.checkSelectedAnswer);
  }
  showCountTask(rules, task, src, answer) {
    taskField.innerHTML = `<img src=${src} class='count-task'>
                            <input type="text" class='task__form_answer' autofocus>
                            <input type="button" class='btn task-field-btn' value="Answer">`;
    document.querySelector(".task-modal-content").classList.add('countTask');
    answerButtom = document.querySelector('.btn');
    description.innerHTML = rules;
    if (task !== null) {
      text.innerHTML = task;
    }
    result = new checkAnswer(answer);
    $(".task__form_answer").keypress(function (e) {
      if (e.which == 13) {
        result.checkSimpleAnswer();
      }
    });  
    answerButtom.addEventListener('click', result.checkSimpleAnswer);
  }
  showTaskFirstInEquation(rules, task, answer) {
    taskField.innerHTML = `<label><input type="text" class='task__form_answer math' autofocus>${task}</label>
                          <input type="button" class='btn task-field-btn' value="Answer">`;
    document.querySelector(".task-modal-content").classList.add('countTask');
    answerButtom = document.querySelector('.btn');
    description.innerHTML = rules;
    result = new checkAnswer(answer);
    $(".task__form_answer").keypress(function (e) {
      if (e.which == 13) {
        result.checkSimpleAnswer();
      }
    }); 
    answerButtom.addEventListener('click', result.checkSimpleAnswer);
  }
  showTaskSecondInEquation(rules, firstPart, secondPart, answer) {
    taskField.innerHTML = `<label>${firstPart}<input type="text" class='task__form_answer math' autofocus>${secondPart}</label>
                          <input type="button" class='btn task-field-btn' value="Answer">`;
    document.querySelector(".task-modal-content").classList.add('countTask');
    answerButtom = document.querySelector('.btn');
    description.innerHTML = rules;
    result = new checkAnswer(answer);
    $(".task__form_answer").keypress(function (e) {
      if (e.which == 13) {
        result.checkSimpleAnswer();
      }
    }); 
    answerButtom.addEventListener('click', result.checkSimpleAnswer);
  }
  showTaskAddWord(rules, firstPart, secondPart, answer) {
    taskField.innerHTML = `<label>${firstPart}<input type="text" class='task__form_answer word' autofocus>${secondPart}</label>
                          <input type="button" class='btn task-field-btn' value="Answer">`;
    document.querySelector(".task-modal-content").classList.add('countTask');
    answerButtom = document.querySelector('.btn');
    description.innerHTML = rules;
    result = new checkAnswer(answer);
    $(".task__form_answer").keypress(function (e) {
      if (e.which == 13) {
        result.checkSimpleAnswer();
      }
    }); 
    answerButtom.addEventListener('click', result.checkSimpleAnswer);
  }
  showTaskCelebrities(rules, src, options, answer) {
    taskField.innerHTML = `<img src=${src} class='celebrities-task'>
                           <div class='options-wrapper'>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[0]}'>${options[0]}</label>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[1]}'>${options[1]}</label>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[2]}'>${options[2]}</label>
                           <label class='options-label'><input type='radio' class='task__form_options' name='answer' value='${options[3]}'>${options[3]}</label>
                           <input type="button" class='btn task-field-btn' value="Answer">
                           </div>`;
    answerButtom = document.querySelector('.btn');
    document.querySelector(".task-modal-content").classList.add('countTask');
    description.innerHTML = rules;
    result = new checkAnswer(answer);
    answerButtom.addEventListener('click', result.checkSelectedAnswer);
  }
}

export { result }
