import { selectElementByClick, selectElementByEnter } from '../../components/helpers/helpers';
import { Reception } from '../reception/reception';
import './css/style.css';
import { KeyboardEvents, START_GAME_BTN } from './consts/homeScreenConsts';

const HTML = require('./index.html');

export class HomeScreen {
    constructor() { }
    createHomeScreen() {
        let charactersArray = $('.greeting__profile_character-item-wrapper').toArray();
        $('#name').keydown(e => {
            if (e.which === KeyboardEvents.ENTER) { e.preventDefault() }
        });
        charactersArray.forEach(div => {
            $(div).click(selectElementByClick);
            $(div).keypress(e => {
                if (e.which === KeyboardEvents.ENTER) {
                    selectElementByEnter(div);
                }
            });
        });

        
        $(START_GAME_BTN).click(new Reception().createReception);
    }
}
