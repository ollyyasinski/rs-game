import { OFFICE_COLORS } from "../consts/office_consts";
import { ResultsTable } from "./game-results";
import { selectElement, roundToTwenty } from "./helpers";
import { selectedOffice } from "./create-page";
import { gameBackground } from './offices';
import { CLIP_PXS, MOVE_LENGTH, SOUND_LEVELS } from "../consts/slider_const";
import { SIDE_NAV_HTML, OFFICE_SETTINGS_HTML, SOUND_SETTINGS_HTML, PLAY_AGAIN_BTN_HTML, RULES_HTML } from "../consts/html_consts";


let gameColor = OFFICE_COLORS[0],
    volume = 1,
    rate = 1,
    lineHeight,
    soundLevel = volume,
    focusedElBeforeOpen;

class SoundSlider {
    constructor(soundLine, soundBtn, minusBtn, plusBtn) {
        this.soundLine = soundLine;
        this.soundBtn = soundBtn;
        this.minusBtn = minusBtn;
        this.plusBtn = plusBtn;
        this.soundLevel;
    };
    createSoundSlider(soundLevel) {
        lineHeight = ($(this.soundLine).height());
        let sliderSoundLine = this.soundLine,
            sliderSoundBtn = this.soundBtn,
            sliderMinusBtn = this.minusBtn,
            sliderPlusBtn = this.plusBtn;

        let findSliderPosition = (soundLevel) => {
            for (let i in SOUND_LEVELS) {
                let soundObj = SOUND_LEVELS[i],
                    sliderPosition = _.keys(soundObj)[0],
                    soundLevelNumber = soundObj[sliderPosition];

                if (soundLevel === soundLevelNumber) {
                    return sliderPosition;
                }
            }
        }

        let setSliderToCurrentPosition = () => {
            $(sliderSoundLine).css({
                'clip': 'rect(' + findSliderPosition(soundLevel) + CLIP_PXS
            });
            $(sliderSoundBtn).css({
                'top': findSliderPosition(soundLevel) - (MOVE_LENGTH / 2)
            });
            $(sliderSoundBtn).draggable({
                axis: 'y',
                containment: 'parent'
            });
        }

        let reactToDrag = () => {
            $(sliderSoundBtn).on('drag', () => {
                let soundLevel = $(sliderSoundBtn).position().top;

                $(sliderSoundLine).css({
                    'clip': 'rect(' + soundLevel + CLIP_PXS
                });
            });
        }

        let reactToMinusBtn = () => {
            $(sliderMinusBtn).on('click', function () {
                let soundLevel = $(sliderSoundBtn).position().top + MOVE_LENGTH;

                $(sliderSoundLine).css({
                    'clip': 'rect(' + soundLevel + CLIP_PXS
                });

                if (soundLevel <= lineHeight - (MOVE_LENGTH / 2)) {
                    $(sliderSoundBtn).css({
                        'top': soundLevel
                    });
                } else {
                    soundLevel = lineHeight - (MOVE_LENGTH / 2);
                }
            });
        }

        let reactToPlusBtn = () => {
            $(sliderPlusBtn).on('click', function () {
                let soundLevel = $(sliderSoundBtn).position().top - MOVE_LENGTH;

                $(sliderSoundLine).css({
                    'clip': 'rect(' + soundLevel + CLIP_PXS
                });

                if (soundLevel + MOVE_LENGTH > 0) {
                    $(sliderSoundBtn).css({
                        'top': soundLevel
                    });
                };

                if (soundLevel >= lineHeight - (MOVE_LENGTH / 2)) {
                    soundLevel = lineHeight - (MOVE_LENGTH * 2);
                }
            }
            );
        }

        setSliderToCurrentPosition();
        reactToDrag();
        reactToMinusBtn();
        reactToPlusBtn();
    }
    getSoundSetting(sliderSoundBtn) {
        for (let i in SOUND_LEVELS) {
            soundLevel = roundToTwenty($(sliderSoundBtn).position().top, MOVE_LENGTH, 0);
            let soundLevelNumber = Number(_.keys(SOUND_LEVELS[i]));
            if (soundLevel === soundLevelNumber) {
                return SOUND_LEVELS[i][soundLevelNumber];
            }
        }
    }
};

class SideNav {
    constructor() { };
    createSideNav(level, levelLanguage) {

        let createSideNav = () => {
            $(".game-background").append(SIDE_NAV_HTML);

            $("#humbergerBtn").click(() => {
                $("#closeBtn").focus();
                $(".background-opacity-wrapper").addClass("background-opacity-wrapper-width");
                $(".sidenav").addClass("sidenav-width");
            });
            $("#humbergerBtn").keypress(e => {
                if (e.which === 13) {
                    $(".background-opacity-wrapper").addClass("background-opacity-wrapper-width");
                    $(".sidenav").addClass("sidenav-width");
                    $("#closeBtn").focus();
                }
            })


            $("#closeBtn").click(() => {
                $(".background-opacity-wrapper").removeClass("background-opacity-wrapper-width");
                $(".sidenav").removeClass("sidenav-width");
            });
            $("#closeBtn").keypress(e => {
                if (e.which === 13) {
                    $(".background-opacity-wrapper").removeClass("background-opacity-wrapper-width");
                    $(".sidenav").removeClass("sidenav-width");
                }
            });
        }

        let createSideNavMenuItems = () => {
            $('#officeColors').click(() => {
                this.showOfficeSelector();
            });
            $("#officeColors").keypress(e => {
                if (e.which === 13) {
                    this.showOfficeSelector();
                }
            });

            $('#soundSettings').click(() => {
                this.showSoundSelector();
            });
            $("#soundSettings").keypress(e => {
                if (e.which === 13) {
                    this.showSoundSelector();
                }
            });

            $("#bestResults").click(() => {
                this.showResults();
            });
            $("#bestResults").keypress(e => {
                if (e.which === 13) {
                    this.showResults();
                }
            });

            $('#rules').click(() => {
                this.showRules();
            });
            $("#rules").keypress(e => {
                if (e.which === 13) {
                    this.showRules();
                }
            });
        }

        createSideNav();
        createSideNavMenuItems();
    }
    showOfficeSelector() {
        focusedElBeforeOpen = document.activeElement;
        let createOfficeSettingsModal = () => {
            $(".game-background").append(OFFICE_SETTINGS_HTML);
            let officesArray = $(".office-option").toArray();
            for (let i in officesArray) {
                $(officesArray[i]).css('background-image', `url("assets/img/office-background/${OFFICE_COLORS[i]}-offices/${selectedOffice}.png")`);
                $(officesArray[i]).click(selectElement);
                $(officesArray[i]).keypress(e => {
                    if (e.which === 13) {
                        let current = $('.selected');
                        if (current) {
                            current.removeClass('selected');
                        }
                        $(officesArray[i]).addClass('selected');
                    }
                })
            }
            $(".office-option-1-1").focus();
            this.closeMenuModal("#closeOffices");
        }

        let createAccessibleDialog = (dialogEl, overlayEl) => {
            let focusableEls = $(dialogEl).find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), btn:not([disabled]), [tabindex="0"]');
            console.log(focusableEls);
            let firstFocusableEl = focusableEls[0];
            let initialFocusableEl = focusableEls[1];

            initialFocusableEl.focus();
            let lastFocusableEl = focusableEls[focusableEls.length - 1];
            console.log(lastFocusableEl);
            $(lastFocusableEl).keydown(e => {
                if (e.which === 9) {
                    e.preventDefault();
                    firstFocusableEl.focus();
                }
            });
            $(firstFocusableEl).keydown(e => {
                if (e.shiftKey && e.keyCode === 9) {
                    e.preventDefault();
                    lastFocusableEl.focus();
                }
            });
        }

        let applySelectedOffice = () => {
            $("#saveOfficeBtn").click(() => {
                let selectedBgd = $(".selected").css("background-image");
                gameColor = selectedBgd.match("(?<=background\/)(.*)(?=-offices)")[0];
                gameBackground.css("background-image", selectedBgd);
                $(".menu-modal").remove();
                $(".background-opacity-wrapper").removeClass("background-opacity-wrapper-width");
                $(".sidenav").removeClass("sidenav-width");
            }
            )
        }

        createOfficeSettingsModal();
        createAccessibleDialog(".menu-modal");
        applySelectedOffice();
    }
    showSoundSelector() {
        let volumeSlider = new SoundSlider("#volumeLine", "#volumeBtn", "#volumeMinusBtn", "#volumePlusBtn");
        let speedSlider = new SoundSlider("#speedLine", "#speedBtn", "#speedMinusBtn", "#speedPlusBtn");

        let createSoundSelectorModule = () => {
            $(".game-background").append(SOUND_SETTINGS_HTML);

            volumeSlider.createSoundSlider(volume);
            speedSlider.createSoundSlider(rate);

            this.closeMenuModal("#closeSound");
        };

        let applySoundSettings = () => {
            $("#saveSoundBtn").click(() => {
                volume = volumeSlider.getSoundSetting("#volumeBtn");
                rate = speedSlider.getSoundSetting("#speedBtn");
                $(".menu-modal").remove();
                $(".background-opacity-wrapper").removeClass("background-opacity-wrapper-width");
                $(".sidenav").removeClass("sidenav-width");
            });
        };

        createSoundSelectorModule();
        applySoundSettings();

    }
    showRules() {
        $(".game-background").append(RULES_HTML);
        this.closeMenuModal("#closeSound");
    }
    showResults(btn) {
        new ResultsTable().showResults();
        this.closeMenuModal("#closeResults");
        if (btn) {
            this.addPlayAgainBtn();
        }
    }
    closeMenuModal(closeBtn) {
        $(closeBtn).click(() => {
            $(".menu-modal").remove();
            $(".background-opacity-wrapper").removeClass("background-opacity-wrapper-width");
            focusedElBeforeOpen.focus();
        });
        $(closeBtn).keypress(e => {
            if (e.which === 13) {
                $(".menu-modal").remove();
                $(".background-opacity-wrapper").removeClass("background-opacity-wrapper-width");
                focusedElBeforeOpen.focus();
            }
        })

    }
    addPlayAgainBtn() {
        $(".menu-modal-content").append(PLAY_AGAIN_BTN_HTML);
    }
}

export { SideNav, gameColor, volume, rate };