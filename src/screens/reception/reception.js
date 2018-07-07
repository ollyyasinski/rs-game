import { createPlayer } from '../../modules/helpers';
import { Dialogs } from '../../modules/dialogs';
import { Office } from '../../components/office/office'
import { SideNav } from '../../modules/game-settings/game-settings'
import { RECEPTION } from '../../consts/office_consts'
import { Level } from '../levels/levels';
import { GameEnd } from '../gameEnd/gameEnd';

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
            nextFocusableEl = "door-right";


        reception.createOffice();
        reception.addHero(player.character, true);

        new SideNav(nextFocusableEl).createSideNav();
        // new dialogActions().showTimeoutDialog(dialogText, 100, 'female');

        $('.door-right').click(() => {
            synth.cancel();
            setTimeout(new Level().createLevelPage, 1500);
        });

        $('.door-right').keypress(e => {
            if (e.which === 13) {
                synth.cancel();
                setTimeout(new GameEnd().createGameEndScreen(), 1500);
            }
        })
    }
}

export { player }
