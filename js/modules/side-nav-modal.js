import { SIDE_NAV_MODAL_HTML } from "../consts/html_consts";

class SideNavModal {
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
        const TITLE_EL = "h1";

        $(GAME_BGD).append(SIDE_NAV_MODAL_HTML);
        $(TITLE_EL).append(this.title);
        $(this.contentWrapper).append(content);

        let createCircleTabNav = (lastFocusableEl, firstFocusableEl) => {
            $(lastFocusableEl).keydown(e => {
                if (e.which === 9) {
                    e.preventDefault();
                    firstFocusableEl.focus();
                }
            });
        };

        let createCircleShiftTabNav = (lastFocusableEl, firstFocusableEl) => {
            $(firstFocusableEl).keydown(e => {
                if (e.shiftKey && e.keyCode === 9) {
                    e.preventDefault();
                    lastFocusableEl.focus();
                }
            });
        };

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
                if (e.which === 13) {
                    this.closeModal();
                }
            })
        };

        closeModalOnClick();
        closeModalOnEnter();

    }
}

export { SideNavModal };