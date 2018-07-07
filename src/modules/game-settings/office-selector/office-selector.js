import { selectElementByClick, selectElementByEnter } from "../../helpers";
import { ModalWindow } from "../../../components/modalWindow/modalWindow";
import { OFFICE_SELECTOR_HTML } from "../../../consts/html_consts";
import { OFFICE_COLORS } from "../../../consts/office_consts";
import { selectedOffice as levelSelectedOffice } from "../../../screens/levels/levels";
import { selectedOffice as receptionSelectedOffice } from "../../../screens/reception/reception";
import { selectedOffice as bossSelectedOffice } from "../../../screens/gameEnd/gameEnd";
import { gameBackground } from '../../../components/office/office';

let gameColor = OFFICE_COLORS[0];

export class OfficeSelector {
    constructor() {
        this.title = 'Select Office Color';
        this.saveOfficeBtn = "#saveOfficeBtn";
        this.bgdImg = "background-image";
    }

    addOfficeSelectorOptions(officesArray, bgdImg) {
        for (let i in officesArray) {
            if (levelSelectedOffice) {
                $(officesArray[i]).css(bgdImg, `url("assets/img/office-background/${OFFICE_COLORS[i]}-offices/${levelSelectedOffice}.png")`);
            } else if (receptionSelectedOffice){
                $(officesArray[i]).css(bgdImg, `url("assets/img/office-background/${OFFICE_COLORS[i]}-offices/${receptionSelectedOffice}.png")`);
            } else{
                $(officesArray[i]).css(bgdImg, `url("assets/img/office-background/${OFFICE_COLORS[i]}-offices/${bossSelectedOffice}.png")`);
            }

            $(officesArray[i]).click(selectElementByClick);

            $(officesArray[i]).keypress(e => {
                if (e.which === 13) {
                    selectElementByEnter(officesArray[i]);
                }
            });
        }
    }

    applySelectedOffice(saveOfficeBtn, bgdImg, focusedElBeforeOpen) {
        $(saveOfficeBtn).click(() => {
            let selectedBgd = $(".selected").css(bgdImg),
                colorRegExp = "(?<=background\/)(.*)(?=-offices)";

            gameColor = selectedBgd.match(colorRegExp)[0];
            gameBackground.css(bgdImg, selectedBgd);
            new ModalWindow(focusedElBeforeOpen).closeModal();
        })
    }

    showOfficeSelector(focusedElBeforeOpen) {
        new ModalWindow(focusedElBeforeOpen, this.title).createSideNavModal(OFFICE_SELECTOR_HTML);

        let officesArray = $(".office-option").toArray();

        this.addOfficeSelectorOptions(officesArray, this.bgdImg);
        this.applySelectedOffice(this.saveOfficeBtn, this.bgdImg, focusedElBeforeOpen);
    }
}

export { gameColor };