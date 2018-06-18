import { CLIP_PXS, MOVE_LENGTH, SOUND_LEVELS } from "../consts/slider_const";
import { OFFICE_COLORS } from "../consts/const";
import { SIDE_NAV_HTML, OFFICE_SETTINGS_HTML, SOUND_SETTINGS_HTML, PLAY_AGAIN_BTN_HTML, RULES_HTML } from "../consts/html_consts";
import { ResultsTable } from "./game-results";
import { Helpers } from "./helpers";
import { selectedOffice } from "./create-page";
import { gameBackground } from './offices';

let gameColor = OFFICE_COLORS[0],
    volume = 1,
    rate = 1,
    lineHeight,
    soundLevel = volume;

class SoundSlider {
    constructor(soundLine, soundBtn, minusBtn, plusBtn) {
        this.soundLine = soundLine;
        this.soundBtn = soundBtn;
        this.minusBtn = minusBtn;
        this.plusBtn = plusBtn;
        this.soundLevel;
    };
    createSoundSlider() {
        lineHeight = ($(this.soundLine).height());
        let sliderSoundLine = this.soundLine,
            sliderSoundBtn = this.soundBtn,
            sliderMinusBtn = this.minusBtn,
            sliderPlusBtn = this.plusBtn;

        $(sliderSoundBtn).draggable({
            axis: 'y',
            containment: 'parent'
        });

        $(sliderSoundBtn).on('drag', () => {
            let soundLevel = $(sliderSoundBtn).position().top;

            $(sliderSoundLine).css({
                'clip': 'rect(' + soundLevel + CLIP_PXS
            });
        });


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
    getSoundSetting(sliderSoundBtn) {
        for (let i in SOUND_LEVELS) {
            soundLevel = new Helpers().roundToTwenty($(sliderSoundBtn).position().top, MOVE_LENGTH, 0);
            let soundLevelNumber = Number(Object.keys(SOUND_LEVELS[i]));
            if (soundLevel === soundLevelNumber) {
                return SOUND_LEVELS[i][soundLevelNumber];
            }
        }
    }
};

class SideNav {
    constructor() { };
    createSideNav(level, levelLanguage) {
        $(".game-background").append(SIDE_NAV_HTML);

        $("#humbergerBtn").click(() => {
            $(".background-opacity-wrapper").addClass("background-opacity-wrapper-width");
            $(".sidenav").addClass("sidenav-width");
        });

        $("#closeBtn").click(() => {
            $(".background-opacity-wrapper").removeClass("background-opacity-wrapper-width");
            $(".sidenav").removeClass("sidenav-width");
        });

        $('#officeColors').click(() => {
            this.showOfficeSelector();
        })

        $('#soundSettings').click(() => {
            this.showSoundSelector();
        });

        $("#bestResults").click(() => {
            this.showResults();
        });
        $('#rules').click(() => {
            this.showRules();
        });
    }
    showOfficeSelector() {
        $(".game-background").append(OFFICE_SETTINGS_HTML);
        let officesArray = $(".office-option").toArray();
        for (let i in officesArray) {
            $(officesArray[i]).css('background-image', `url("assets/img/office-background/${OFFICE_COLORS[i]}-offices/${selectedOffice}.png")`);
            $(officesArray[i]).click(new Helpers().selectElement);
        }

        $("#saveOfficeBtn").click(() => {
            let selectedBgd = $(".selected").css("background-image");
            gameColor = selectedBgd.match("(?<=background\/)(.*)(?=-offices)")[0];
            gameBackground.css("background-image", selectedBgd);
            $(".menu-modal").remove();
            $(".background-opacity-wrapper").removeClass("background-opacity-wrapper-width");
            $(".sidenav").removeClass("sidenav-width");
        }
        )

        this.closeMenuModal("#closeOffices");
    }
    showSoundSelector() {
        $(".game-background").append(SOUND_SETTINGS_HTML);

        let volumeSlider = new SoundSlider("#volumeLine", "#volumeBtn", "#volumeMinusBtn", "#volumePlusBtn");
        let speedSlider = new SoundSlider("#speedLine", "#speedBtn", "#speedMinusBtn", "#speedPlusBtn");
        volumeSlider.createSoundSlider();
        speedSlider.createSoundSlider();

        $("#saveSoundBtn").click(() => {
            volume = volumeSlider.getSoundSetting("#volumeBtn");
            rate = speedSlider.getSoundSetting("#speedBtn");
            $(".menu-modal").remove();
            $(".background-opacity-wrapper").removeClass("background-opacity-wrapper-width");
            $(".sidenav").removeClass("sidenav-width");
        });

        this.closeMenuModal("#closeSound");
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
        })
    }
    addPlayAgainBtn() {
        $(".menu-modal-content").append(PLAY_AGAIN_BTN_HTML);
        $("#playAgainBtn").click(
            new createPage().greeting()
        )
    }
}

export { SideNav, gameColor, volume, rate };