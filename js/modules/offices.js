import { LEVEL_HTML, RIGHT_DOOR_PAGE_HTML, LEFT_DOOR_PAGE_HTML } from "../consts/html_consts";
import { gameColor } from "./game-settings";
import { Door } from './door';

let main = document.querySelector('main'),
    gameBackground;

class Office {
    constructor(background, doors) {
        this.background = background;
        this.doors = doors;
    };
    createOffice(level, levelLanguage) {
        let addGameBody = () => {
            gameBackground = $('.game-background');
            gameBackground.addClass(this.background);
            gameBackground.css('background-image', `url("assets/img/office-background/${gameColor}-offices/${this.background}.png")`);
        }
        if (this.doors === 2) {
            main.innerHTML = LEVEL_HTML;
            $("nav").append(`<h1 class='level__caption'>Level ${level} - ${levelLanguage}</h1>`);
            addGameBody();
        } else if (this.doors === "right") {
            main.classList.add('wrapper__reception');
            main.innerHTML = RIGHT_DOOR_PAGE_HTML;
            addGameBody();
            new Door($(".door-right")).openDoor();
        } else {
            main.classList.add('wrapper__reception');
            main.innerHTML = LEFT_DOOR_PAGE_HTML;
            addGameBody();
        }
    };
}

export { Office, gameBackground };