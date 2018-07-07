import { Dialogs, dialogActions } from '../../modules/dialogs'
import { Office } from '../../components/office/office'
import { SideNav } from '../../modules/game-settings/game-settings'
import { BOSS_OFFICE } from '../../consts/office_consts';
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