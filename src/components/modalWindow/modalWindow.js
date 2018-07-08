import { createCircleTabNav, createCircleShiftTabNav } from "../helpers/helpers";
import './modalWindow.css';
import './consts/windowConsts';
import { KeyboardEvents } from "./consts/windowConsts";

const MODAL_HTML = require('./modalWindow.html');

export class ModalWindow {
    constructor(focusedElBeforeOpen, title) {
        this.focusedElBeforeOpen = focusedElBeforeOpen;
        this.title = title;
        this.closeBtn = "#closeMenuModal";
        this.modalClass = ".menu-modal";
        this.opacityWrapper = ".background-opacity-wrapper";
        this.opacityWrapperWidth = "background-opacity-wrapper-width";
        this.contentWrapper = ".menu-modal-content";
    }
    createSideNavModal(content) {
        const GAME_BGD = ".game-background";
        const TITLE_EL = "#modalTitle";

        $(GAME_BGD).append(MODAL_HTML);
        $(TITLE_EL).append(this.title);
        $(this.contentWrapper).append(content);

        let focusableEls = $(this.modalClass).find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), btn:not([disabled]), [tabindex="0"]'),
            firstFocusableEl = focusableEls[0],
            lastFocusableEl = focusableEls[focusableEls.length - 1];

        firstFocusableEl.focus();
        this.triggerCloseMenuModal();
        createCircleTabNav(lastFocusableEl, firstFocusableEl);
        createCircleShiftTabNav(lastFocusableEl, firstFocusableEl);
    }

    closeModal() {
        $(this.modalClass).remove();
        $(this.opacityWrapper).removeClass(this.opacityWrapperWidth);
        this.focusedElBeforeOpen.focus();
    }

    triggerCloseMenuModal() {
        let closeModalOnClick = () => {
            $(this.closeBtn).click(() => {
                this.closeModal();
            });
        };

        let closeModalOnEnter = () => {
            $(this.closeBtn).keypress(e => {
                if (e.which === KeyboardEvents.ENTER) {
                    this.closeModal();
                }
            })
        };

        closeModalOnClick();
        closeModalOnEnter();

    }
}