import { Dialogs, dialogActions } from '../../components/dialogs/dialogs'
import { Office } from '../../components/office/office'
import { SideNav } from '../../components/gameSettings/gameSettings'
import { BOSS_OFFICE } from '../../components/officeSelector/consts/officeConsts';
import { player, selectedOffice, level } from '../levels/levels';

export class GameEnd {
    constructor() { }
    createGameEndScreen() {
        // level = 'boss',
        let selectedOffice = BOSS_OFFICE;

        let bossOffice = new Office(selectedOffice, "left"),
            dialogText = new Dialogs().boss();

        bossOffice.createOffice();
        bossOffice.addHero(player.character);

        new SideNav().createSideNav();
        new dialogActions().showTimeoutDialog([dialogText], 500);
    }
}

export { selectedOffice };