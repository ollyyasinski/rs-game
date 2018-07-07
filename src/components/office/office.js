import { gameColor } from "../gameSettings/gameSettings";
import { Door } from './door/door';

const TWO_DOOR_OFFICE_HTML = require('./officeHtmls/twoDoorOffice.html');
const LEFT_DOOR_OFFICE_HTML = require('./officeHtmls/leftDoorOffice.html');
const RIGHT_DOOR_OFFICE_HTML = require('./officeHtmls/rightDoorOffice.html');

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
            main.innerHTML = TWO_DOOR_OFFICE_HTML;
            $("nav").append(`<h1 class='level__caption'>Level ${level} - ${levelLanguage}</h1>`);
            addGameBody();
        } else if (this.doors === "right") {
            main.classList.add('wrapper__reception');
            main.innerHTML = RIGHT_DOOR_OFFICE_HTML;
            addGameBody();

            $('#dialogButton').focus();
            $('#dialogButton').keypress(e => {
                if (e.which == 13) {
                    $('.door').focus();
                    $('#dialog').remove();
                }
            });
            $('#dialogButton').click(() => {
                $('.door').focus();
                $('#dialog').remove();
            });

            new Door($(".door-right")).openDoor();
        } else {
            main.classList.add('wrapper__reception');
            main.innerHTML = LEFT_DOOR_OFFICE_HTML;
            addGameBody();
        }
    };
    addHero(hero, mirror) {
        if (mirror) {
            $(".hero-container").addClass(hero).addClass("hero-container-mirror");
        }
        $(".hero-container").addClass(hero);
    }
}

export { Office, gameBackground };