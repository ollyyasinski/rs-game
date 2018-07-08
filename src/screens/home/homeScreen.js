import { selectElementByClick } from '../../components/helpers/helpers';
import { createPlayer } from '../../components/helpers/helpers';
import { Reception } from '../reception/reception';
import './css/style.css';

const HTML = require('./index.html');

let player;

export class HomeScreen {
    constructor() { }
    createHomeScreen() {
        let charactersArray = $('.greeting__profile_character-item-wrapper').toArray();
        charactersArray.forEach(div => {
            $(div).click(selectElementByClick);
            $(div).keypress(e => {
                if (e.which === 13) {
                    let current = $('.selected');
                    if (current) {
                        current.removeClass('selected');
                    }
                    $(div).addClass('selected');
                }
            })
        });

        player = createPlayer();

        $('#startGame').click(new Reception().createReception);
    }
}

export { player };