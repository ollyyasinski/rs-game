import { OFFICE_COLORS } from "../consts/office_consts";
import { ResultsTable } from "./game-results";
import { selectElementByClick, selectElementByEnter, roundToTwenty } from "./helpers";
import { selectedOffice } from "./create-page";
import { gameBackground } from './offices';
import { gameColor } from "./office-selector";
import { CLIP_PXS, MOVE_LENGTH, SOUND_LEVELS } from "../consts/slider_const";
import { SIDE_NAV_HTML, OFFICE_SELECTOR_HTML, OFFICE_SETTINGS_HTML, SOUND_SETTINGS_HTML, PLAY_AGAIN_BTN_HTML, RULES_HTML } from "../consts/html_consts";
import { SideNavModal } from './side-nav-modal';
import { OfficeSelector } from "./office-selector";
import { languages } from "../variables/arrays";

let volume = 1,
    rate = 1,
    lineHeight,
    soundLevel = volume,
    focusedElBeforeOpen;

const BGD_IMG = "background-image",
    GAME_BGD = ".game-background";

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
    constructor() {
        this.humburgerBtn = "#humbergerBtn";
        this.closeBtn = "#closeBtn";
        this.opacityWrapper = ".background-opacity-wrapper";
        this.opacityWrapperWidth = "background-opacity-wrapper-width";
        this.sideNavEl = ".sidenav";
        this.sideNavElWidth = "sidenav-width";
    };

    openSideNav(closeBtn) {
        $(closeBtn).focus();
        $(this.opacityWrapper).addClass(this.opacityWrapperWidth);
        $(this.sideNavEl).addClass(this.sideNavElWidth);
    }

    triggerSideNavOpen(triggerBtn, closeBtn) {
        $(triggerBtn).click(() => {
            this.openSideNav(closeBtn);
        });

        $(triggerBtn).keypress(e => {
            if (e.which === 13) {
                this.openSideNav(closeBtn);
            }
        });
    }

    closeSideNav(triggerBtn) {
        $(this.opacityWrapper).removeClass(this.opacityWrapperWidth);
        $(this.sideNavEl).removeClass(this.sideNavElWidth);
        $(triggerBtn).focus();
    }

    triggerSideNavClose(triggerBtn, closeBtn) {
        $(closeBtn).click(() => {
            this.closeSideNav(triggerBtn);
        });
        $("#closeBtn").keypress(e => {
            if (e.which === 13) {
                this.closeSideNav(triggerBtn);
            }
        });
    }

    createSideNavHelper(level, levelLanguage) {
        $(GAME_BGD).append(SIDE_NAV_HTML);

        this.triggerSideNavOpen(this.humburgerBtn, this.closeBtn);
        this.triggerSideNavClose(this.humburgerBtn, this.closeBtn);
    }

    createOfficeMenuItem(link) {
        $(link).click(() => {
            let focusedElBeforeOpen = document.activeElement;
            new OfficeSelector().showOfficeSelector(focusedElBeforeOpen);
        });

        $(link).keypress(e => {
            if (e.which === 13) {
                let focusedElBeforeOpen = document.activeElement;
                new OfficeSelector().showOfficeSelector(focusedElBeforeOpen);
            }
        });

    }

    createSoundMenuItem(link) {
        $(link).click(() => {
            this.showSoundSelector();
        });

        $(link).keypress(e => {
            if (e.which === 13) {
                this.showSoundSelector();
            }
        });
    }

    createResultsMenuItem(link) {
        $(link).click(() => {
            this.showResults();
        });

        $(link).keypress(e => {
            if (e.which === 13) {
                this.showResults();
            }
        });
    }

    createRulesMenuItem(link) {
        $(link).click(() => {
            this.showRules();
        });
        $(link).keypress(e => {
            if (e.which === 13) {
                this.showRules();
            }
        });
    }
    createSideNavMenuItems() {
        let menuItemsArray = ['#officeColors', '#soundSettings', '#bestResults', '#rules'];

        this.createOfficeMenuItem(menuItemsArray[0]);
        this.createSoundMenuItem(menuItemsArray[1]);
        this.createResultsMenuItem(menuItemsArray[2]);
        this.createRulesMenuItem(menuItemsArray[3]);
    }

    createSideNav(level, levelLanguage) {
        this.createSideNavHelper(level, levelLanguage);
        this.createSideNavMenuItems();
    }

    showSoundSelector() {
        let volumeSlider = new SoundSlider("#volumeLine", "#volumeBtn", "#volumeMinusBtn", "#volumePlusBtn");
        let speedSlider = new SoundSlider("#speedLine", "#speedBtn", "#speedMinusBtn", "#speedPlusBtn");

        let createSoundSelectorModule = () => {
            $(".game-background").append(SOUND_SETTINGS_HTML);

            volumeSlider.createSoundSlider(volume);
            speedSlider.createSoundSlider(rate);

            this.closeMenuModal("#closeMenuModal");
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
    addPlayAgainBtn() {
        $(".menu-modal-content").append(PLAY_AGAIN_BTN_HTML);
    }
}

export { SideNav, gameColor, volume, rate };