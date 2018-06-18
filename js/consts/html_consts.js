const LEVEL_HTML = `<div class = "background-opacity-wrapper"> </div>
<div class="game-background">
<nav>
  <div class="humburger-btn-wrapper" id="humbergerBtn">
    <div class="humburger-btn-line"></div>
    <div class="humburger-btn-line"></div>
    <div class="humburger-btn-line"></div>
  </div>
</nav>
  <ul class='spells'>
    <li class='spell attack'><p class='spell_wrapper'><span class='spell__name'>Attack</span><span class='spell__description'>40 damage to monster</span></li>
    <li class='spell shield'><p class='spell_wrapper'><span class='spell__name'>Shield</span><span class='spell__description'>+50 to your defense (absorbs damage)</span></li>
    <li class='spell heal'><p class='spell_wrapper'><span class='spell__name'>Heal</span><span class='spell__description'>+30 to your health</span></li>
    <li class='spell blitzAttack'><p class='spell_wrapper'><span class='spell__name'>Blitz Attack</span><span class='spell__description'>3 tasks, each gives +20 to your attack power (max is 60)</span></li>
    <li class='spell super blockSuper'><p class='spell_wrapper'><span class='spell__name'>Super Attack</span><span class='spell__description'>60 damage to monster. Available when the yellow scale is full</span></li>
  <li class='tips-background'></li>
  </ul>
  <div class="door door-left"></div>
  <div class="door door-right"></div>
  <div class='hero-container'>
    <div class="hero-health__wrapper">
     <div class='hero-shield'>
       <span>Shield: <span class='hero-shield__number'></span></span>
     </div>
      <div class='hero-health-scale'>
        <span class='hero-health-scale__number'></span>
      </div>
      <div class='hero-super'>
        <div class='hero-super_scale'>
        </div>
      </div>
    </div>
    <div class='hero-spell-vis'><img class='hero-spell-image'></div>
  </div>
  <div class="monster-container">
    <div class="monster-head-container">
      <div class="monster-health__wrapper">
        <div class='monster-shield'>
          <span>Shield: <span class='monster-shield__number'></span></span>
        </div>                          
        <div class='monster-health-scale'>
          <span class='monster-health-scale__number'></span>
        </div>
      </div>
    </div>
    <div class="monster-body-container"><p class="monster-name"></p></div>
    <div class="monster-legs-container">
      <div class='monster-spell-vis'><img class='monster-spell-image'></div>
    </div>
  </div>
  <div id="taskModal" class="modal">
    <div class="task-modal-content">
      <div class='task-task-content'>
        <p class='task-task-description' id='taskDesc'></p>
        <div class='task-task-text-wrapper'><p class='task-task-text' id='taskText'></p></div>
      </div>
      <div class='task-field' id='taskField'>
        <div class='task-field-answer-container' id="taskFieldAnswer"></div>
        <div class='answer'><span id='answer__correct' class='correct'></span><span id='answer__wrong' class='wrong'></span></div>
      </div>
    </div>
  </div>                      
  <div class='dialog' id = dialog>
    <p class='dialog__message' id='message'></p>
    <button type="button" class="dialog__button" id = 'dialogButton'>Close</button>
  </div>
</div>`,

  RIGHT_DOOR_PAGE_HTML = `<div class="game-background game-background-mirror">
<nav>
    <div class="humburger-btn-wrapper" id="humbergerBtn">
        <div class="humburger-btn-line"></div>
        <div class="humburger-btn-line"></div>
        <div class="humburger-btn-line"></div>
    </div>
</nav>
<div class="door door-right door-right-reception"></div>
<div class="hero-container"></div>
</div>
<div class='dialog' id='dialog'>
<p class='dialog__message' id='message'></p>
<button type="button" class="dialog__button" id='dialogButton'>Start</button>
</div>`,

  LEFT_DOOR_PAGE_HTML = `<div class="game-background">
  <nav>
    <div class="humburger-btn-wrapper" id="humbergerBtn">
      <div class="humburger-btn-line"></div>
      <div class="humburger-btn-line"></div>
      <div class="humburger-btn-line"></div>
    </div>
  </nav>
  <div class="door door-left door-left-boss"></div>
  <div class="hero-container"></div>
  <div class='dialog' id='dialog'>
    <p class='dialog__message' id='message'></p>
    <button type="button" class="dialog__button" id='dialogButton'>Start</button>
  </div>`,

  SIDE_NAV_HTML = `<div class="sidenav">
  <btn class="close-btn" id="closeBtn">&#10006;</btn>
  <ul class="sidenav-list">
    <li id="officeColors">Office Colors</li>
    <li id="soundSettings">Sound</li>
    <li id="bestResults">Best Results</li>
    <li id="rules">Rules</li>
  </ul>
</div>`,

  OFFICE_SETTINGS_HTML = `<div class="menu-modal">
  <div class="menu-modal-content-wrapper">
    <div class="menu-modal-content">
      <div class="menu-modal-caption">
        <btn class="close-btn menu-close-btn" id="closeOffices">&#10006;</btn>
        <h1>Select Office Color</h1>
      </div>
      <div class="menu-modal-section">
        <div class="offices-grid">
          <div class="offices-row-1">
            <div class="office-option office-option-1-1 selected"></div>
            <div class="office-option office-option-1-2"></div>
            <div class="office-option office-option-1-3"></div>
            <div class="office-option office-option-1-4"></div>
          </div>
          <div class="offices-row-2">
            <div class="office-option office-option-2-1"></div>
            <div class="office-option office-option-2-2"></div>
            <div class="office-option office-option-2-3"></div>
        </div>
      </div>
      <div class="menu-modal-submit-wrapper">
        <button type="button" class="btn btn-danger menu-btn" id="saveOfficeBtn">Save</button>
      </div>
    </div>
  </div>
</div>`,

  RESULTS_TABLE_HTML = `<div class="menu-modal">
  <div class="menu-modal-content-wrapper">
    <div class="menu-modal-content">
      <div class="menu-modal-caption">
        <btn class="close-btn menu-close-btn" id="closeResults">&#10006;</btn>
        <h1>Best Results</h1>
      </div>
      <div class="menu-modal-section result-modal-content">                                
      <table>
          <thead>
              <tr class="table-header">
                  <th>#</th>
                  <th>User Name</th>
                  <th>Result</th>
              </tr>
          </thead>
          <tbody id="resultsTable">
          </tbody>
      </table>                              
      </div>
    </div>
  </div>`,

  SOUND_SETTINGS_HTML = `<div class="menu-modal">
<div class="menu-modal-content-wrapper">
  <div class="menu-modal-content">
  <div class="menu-modal-caption">
  <btn class="close-btn menu-close-btn" id="closeSound">&#10006;</btn>
  <h1>Sound Settings</h1>
</div>
    <div class="menu-modal-section">
      <div class="sound-grid">
        <div class="volume-column">
          <div class="sound-wrapper">
            <div class="map-slider">
              <div class="buttons">
                <span class="fa fa-plus" id="volumePlusBtn"></span>
                <div class="drag-line">
                  <div class="line" id="volumeLine"></div> 
                  <div class="draggable-button" id="volumeBtn"></div>   
                </div>
                <div class="draggable-buton" id="volumeBtn"></div>   
                <span class="fa fa-minus" id="volumeMinusBtn"></span>
              </div>
            </div>
          </div>
          <h2 class="sound-caption">Select volume level for a game</h2>
        </div>
        <div class="speed-column">
          <div class="sound-wrapper">
            <div class="map-slider">
              <div class="buttons">
                <span class="fa fa-plus" id="speedPlusBtn"></span>
                <div class="drag-line">
                  <div class="line" id="speedLine"></div> 
                  <div class="draggable-button" id="speedBtn"></div>   
                </div>
                <div class="draggable-buton" id="speedBtn"></div>   
                <span class="fa fa-minus" id="speedMinusBtn"></span>
              </div>
            </div>
          </div>
          <h2 class="sound-caption">Select speech speed for a game</h2>
        </div>
      </div>
    </div>
    <div class="menu-modal-submit-wrapper">
      <button type="button" class="btn btn-danger menu-btn" id="saveSoundBtn">Save</button>
    </div>
  </div>
</div>
</div>`,

  PLAY_AGAIN_BTN_HTML = `<div class="menu-modal-submit-wrapper">
                          <a href="https://anleonovich.github.io/Final-Game/" class="new-play-link">
                            <button type="button" class="btn btn-danger menu-btn" id="playAgainBtn">Play Again</button>
                          </a>
                        </div>`,

  RULES_HTML = `<div class="menu-modal">
  <div class="menu-modal-content-wrapper">
    <div class="menu-modal-content">
      <div class="menu-modal-caption">
        <btn class="close-btn menu-close-btn" id="closeSound">&#10006;</btn>
        <h1>Rules</h1>
      </div>
    <div class="menu-modal-section">
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
    </div>
  </div>
</div>`;


export {
  LEVEL_HTML, RIGHT_DOOR_PAGE_HTML, LEFT_DOOR_PAGE_HTML, SIDE_NAV_HTML, OFFICE_SETTINGS_HTML,
  RESULTS_TABLE_HTML, SOUND_SETTINGS_HTML, PLAY_AGAIN_BTN_HTML, RULES_HTML
};