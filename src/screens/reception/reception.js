import { Dialogs, dialogActions } from '../../components/dialogs/dialogs';
import { Office } from '../../components/office/office';
import { SideNav } from '../../components/gameSettings/gameSettings';
import { RECEPTION } from '../../components/officeSelector/consts/officeConsts';
import { Level } from '../levels/levels';
import { createPlayer } from '../../components/helpers/helpers';
import { KeyboardEvents, RIGHT_DOOR, VoiceGender } from './consts/receptionConsts';
import './css/heroes.css';

let selectedOffice, player;
let synth = window.speechSynthesis;

export class Reception {
    constructor() { }

    createReception() {
        player = createPlayer();
        selectedOffice = RECEPTION;
        $('body').css('overflow', 'hidden');

        let reception = new Office(selectedOffice, 'right'),
            dialogText = new Dialogs().instructions(),
            nextFocusableEl = RIGHT_DOOR;

        reception.createOffice();
        reception.addHero(player.character, true);

        new SideNav(nextFocusableEl).createSideNav();
        new dialogActions().showTimeoutDialog(dialogText, 200, VoiceGender.FEMALE);

        $(RIGHT_DOOR).click(() => {
            synth.cancel();
            setTimeout(new Level().createLevelPage, 1500);
        });

        $(RIGHT_DOOR).keydown(e => {
            if (e.which === KeyboardEvents.ENTER) {
                synth.cancel();
                setTimeout(new Level().createLevelPage, 100);
            }
            if (e.which === KeyboardEvents.TAB) {
                e.preventDefault();
                $("#humbergerBtn").focus();
            }
        })
    }
}

export { player, selectedOffice }
