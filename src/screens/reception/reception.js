import { Dialogs, dialogActions } from '../../components/dialogs/dialogs';
import { Office } from '../../components/office/office';
import { SideNav } from '../../components/gameSettings/gameSettings';
import { RECEPTION } from '../../components/officeSelector/consts/officeConsts';
import { Level } from '../levels/levels';
import { player } from '../home/homeScreen';

let selectedOffice;

let synth = window.speechSynthesis;

export class Reception {
    constructor() { }

    createReception() {
        selectedOffice = RECEPTION;
        $('body').css('overflow', 'hidden');

        let reception = new Office(selectedOffice, 'right'),
            dialogText = new Dialogs().instructions(),
            nextFocusableEl = "door-right";

        reception.createOffice();
        reception.addHero(player.character, true);

        new SideNav(nextFocusableEl).createSideNav();
        new dialogActions().showTimeoutDialog(dialogText, 200, 'female');

        $('.door-right').click(() => {
            synth.cancel();
            setTimeout(new Level().createLevelPage, 1500);
        });

        $('.door-right').keypress(e => {
            if (e.which === 13) {
                synth.cancel();
                setTimeout(new Level().createLevelPage(), 1500);
            }
        })
    }
}

export { player, selectedOffice }
