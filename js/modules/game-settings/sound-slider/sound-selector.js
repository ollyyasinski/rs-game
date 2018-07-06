import { CLIP_PXS, MOVE_LENGTH, SOUND_LEVELS } from "../../../consts/slider_const";
import { roundToTwenty } from "../../helpers";
import { SideNavModal } from "../../side-nav-modal";
import { SOUND_SETTINGS_HTML } from "../../../consts/html_consts";

let volume = 1,
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
    }
    findSliderPosition(soundLevel) {
        for (let i in SOUND_LEVELS) {
            let soundObj = SOUND_LEVELS[i],
                sliderPosition = _.keys(soundObj)[0],
                soundLevelNumber = soundObj[sliderPosition];

            if (soundLevel === soundLevelNumber) {
                return sliderPosition;
            }
        }
    }

    setSliderToCurrentPosition(soundLevel, sliderSoundLine, sliderSoundBtn) {
        $(sliderSoundLine).css({
            'clip': 'rect(' + this.findSliderPosition(soundLevel) + CLIP_PXS
        });
        $(sliderSoundBtn).css({
            'top': this.findSliderPosition(soundLevel) - (MOVE_LENGTH / 2)
        });
        $(sliderSoundBtn).draggable({
            axis: 'y',
            containment: 'parent'
        });
    }

    reactToDrag(soundBtn, soundLine) {
        $(this.soundBtn).on('drag', () => {
            let soundLevel = $(soundBtn).position().top;

            $(soundLine).css({ 'clip': 'rect(' + soundLevel + CLIP_PXS });
        });
    }

    reactToMinusBtn(soundBtn, soundLine, lineHeight) {
        let actOnMinusBtn = () => {
            let soundLevel = $(soundBtn).position().top + MOVE_LENGTH;

            $(soundLine).css({ 'clip': 'rect(' + soundLevel + CLIP_PXS });

            if (soundLevel <= lineHeight - (MOVE_LENGTH / 2)) {
                $(soundBtn).css({
                    'top': soundLevel
                });
            } else {
                soundLevel = lineHeight - (MOVE_LENGTH / 2);
            }
        }

        $(this.minusBtn).on('click', actOnMinusBtn);

        $(this.minusBtn).keypress(e => {
            if (e.which === 13) {
                actOnMinusBtn();
            }
        });
    }

    reactToPlusBtn(soundBtn, soundLine, lineHeight) {
        let actOnPlusBtn = () => {
            let soundLevel = $(soundBtn).position().top - MOVE_LENGTH;

            $(soundLine).css({
                'clip': 'rect(' + soundLevel + CLIP_PXS
            });

            if (soundLevel + MOVE_LENGTH > 0) {
                $(soundBtn).css({
                    'top': soundLevel
                });
            };

            if (soundLevel >= lineHeight - (MOVE_LENGTH / 2)) {
                soundLevel = lineHeight - (MOVE_LENGTH * 2);
            }
        }

        $(this.plusBtn).on('click', actOnPlusBtn);

        $(this.plusBtn).keypress(e => {
            if (e.which === 13) {
                actOnPlusBtn();
            }
        });
    }

    createSoundSlider(soundLevel) {
        lineHeight = ($(this.soundLine).height());

        this.setSliderToCurrentPosition(soundLevel, this.soundLine, this.soundBtn);
        this.reactToDrag(this.soundBtn, this.soundLine);
        this.reactToMinusBtn(this.soundBtn, this.soundLine, lineHeight);
        this.reactToPlusBtn(this.soundBtn, this.soundLine, lineHeight);
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

export class SoundSettings {
    constructor() {
        this.title = 'Sound Settings';
        this.volumeBtn = "#volumeBtn";
        this.speedBtn = "#speedBtn";
        this.volumeSlider = new SoundSlider("#volumeLine", "#volumeBtn", "#volumeMinusBtn", "#volumePlusBtn");
        this.speedSlider = new SoundSlider("#speedLine", "#speedBtn", "#speedMinusBtn", "#speedPlusBtn");
    }

    applySoundSettings(focusedElBeforeOpen, volumeBtn, speedBtn) {
        $("#saveSoundBtn").click(() => {
            volume = this.volumeSlider.getSoundSetting(volumeBtn);
            rate = this.speedSlider.getSoundSetting(speedBtn);

            new SideNavModal(focusedElBeforeOpen).closeModal(focusedElBeforeOpen);
        });
    }

    showSoundSelector(focusedElBeforeOpen) {
        new SideNavModal(focusedElBeforeOpen, this.title).createSideNavModal(SOUND_SETTINGS_HTML);

        this.volumeSlider.createSoundSlider(volume);
        this.speedSlider.createSoundSlider(rate);
        this.applySoundSettings(focusedElBeforeOpen, this.volumeBtn, this.speedBtn);
    }
}

export { volume, rate };