const 

  SIDE_NAV_HTML = `<div class="sidenav">
  <btn class="close-btn" id="closeBtn" tabindex="0">&#10006;</btn>
  <ul class="sidenav-list">
    <li id="officeColors" tabindex="0">Office Colors</li>
    <li id="soundSettings" tabindex="0">Sound</li>
    <li id="bestResults" tabindex="0">Best Results</li>
    <li id="rules" tabindex="0">Rules</li>
  </ul>
</div>`,

OFFICE_SELECTOR_HTML = `<div class="menu-modal-section">
      <div class="offices-grid">
        <div class="offices-row-1">
          <div class="office-option office-option-1-1 selected" tabindex="0"></div>
          <div class="office-option office-option-1-2" tabindex="0"></div>
          <div class="office-option office-option-1-3" tabindex="0"></div>
          <div class="office-option office-option-1-4" tabindex="0"></div>
        </div>
        <div class="offices-row-2">
          <div class="office-option office-option-2-1" tabindex="0"></div>
          <div class="office-option office-option-2-2" tabindex="0"></div>
          <div class="office-option office-option-2-3" tabindex="0"></div>
      </div>
    </div>
    <div class="menu-modal-submit-wrapper">
      <button type="button" class="btn btn-danger menu-btn" id="saveOfficeBtn">Save</button>
    </div>
  </div>`,

  PLAY_AGAIN_BTN_HTML = `<div class="menu-modal-submit-wrapper">
                          <a href="https://anleonovich.github.io/Final-Game/" class="new-play-link">
                            <button type="button" class="btn btn-danger menu-btn" id="playAgainBtn">Play Again</button>
                          </a>
                        </div>`,

  RULES_HTML = `<div class="menu-modal-section">
      <div class='rules-wrapper'>
        <p>In this game you are a programmer trying to get a job in the 'We Will Hack You Inc.'.</p>
        <p>You need to complete 5 levels to win. In each level you will come across a "monster" who will test your knowledge in some programming language.</p>
        <p>Use spells to inflict damage or to protect and heal yourself.</p>
        <p>After choosing a spell, you will be given a task. The spell will apply only if your answer is correct. Don't forget to read tasks rules carefully.</p>
        <p>You go first. After your turn a monster does his spell (regardless of the correctness of your answer). Monster can heal and protect himself or attack you (but always in 40 points). With each level the monster's health will increase.</p>
        <p>To win the level you must lower the monster's health to zero.</p>
        <p>Use the doors to go to new levels.</p>
        <p>Good luck!</p>
      </div>
    </div>`,

  SIMPLE_TASK_HTML = `<input type="text" class='task__form_answer' autofocus>
<input type="button" class='btn task-field-btn' value="Answer" id="answerBtn">`,

  LISTEN_BTN_HTML = `<input type="button" class='btn' id="audioBtn" value= "Click to listen">`,

  ANSWER_BTN_HTML = `<input type="button" class='btn task-field-btn' value="Answer" id="answerBtn">`;


export {
  LEVEL_HTML, RIGHT_DOOR_PAGE_HTML, LEFT_DOOR_PAGE_HTML, SIDE_NAV_HTML, SIDE_NAV_MODAL_HTML, OFFICE_SELECTOR_HTML,
  RESULTS_TABLE_HTML, SOUND_SETTINGS_HTML, PLAY_AGAIN_BTN_HTML, RULES_HTML, SIMPLE_TASK_HTML, LISTEN_BTN_HTML, ANSWER_BTN_HTML
};