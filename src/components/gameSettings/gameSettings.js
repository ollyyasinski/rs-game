import { ResultsTable } from "../gameResults/gameResults";
import { SIDE_NAV_HTML, RULES_HTML } from "../../consts/html_consts";
import { OfficeSelector, gameColor } from "../officeSelector/officeSelector";
import { SoundSelectors } from "../soundSliders/soundSelectors";
import { ModalWindow } from "../modalWindow/modalWindow";
import { createCircleTabNav, createCircleShiftTabNav } from "../helpers/helpers";

const GAME_BGD = ".game-background";

class SideNav {
    constructor(nextFocusableEl) {
        this.humburgerBtn = "#humbergerBtn";
        this.closeBtn = "#closeBtn";
        this.opacityWrapper = ".background-opacity-wrapper";
        this.opacityWrapperWidth = "background-opacity-wrapper-width";
        this.sideNavEl = ".sidenav";
        this.sideNavElWidth = "sidenav-width";
        this.lastMenuLink = "#rules";
        this.nextFocusableEl = nextFocusableEl;
    };

    openSideNav(closeBtn) {
        $(closeBtn).focus();
        $(this.opacityWrapper).addClass(this.opacityWrapperWidth);
        $(this.sideNavEl).addClass(this.sideNavElWidth);
    }

    triggerSideNavOpen(triggerBtn, closeBtn) {
        $(triggerBtn).click(() => {
            this.openSideNav(closeBtn);
        });

        $(triggerBtn).keypress(e => {
            if (e.which === 13) {
                this.openSideNav(closeBtn);
            }
        });
    }

    closeSideNav(triggerBtn) {
        $(this.opacityWrapper).removeClass(this.opacityWrapperWidth);
        $(this.sideNavEl).removeClass(this.sideNavElWidth);
        $(triggerBtn).focus();
    }

    triggerSideNavClose(triggerBtn, closeBtn) {
        $(closeBtn).click(() => {
            this.closeSideNav(triggerBtn);
        });
        $("#closeBtn").keypress(e => {
            if (e.which === 13) {
                this.closeSideNav(triggerBtn);
            }
        });
    }

    createSideNavView(level, levelLanguage, lastMenuLink, nextFocusableEl) {
        $(GAME_BGD).append(SIDE_NAV_HTML);

        this.triggerSideNavOpen(this.humburgerBtn, this.closeBtn);
        this.triggerSideNavClose(this.humburgerBtn, this.closeBtn);

        createCircleTabNav($(lastMenuLink), $(this.closeBtn));
        createCircleShiftTabNav($(lastMenuLink), $(this.closeBtn));

        // createCircleTabNav($(this.humburgerBtn), $(nextFocusableEl));
        // createCircleShiftTabNav($(this.humburgerBtn), $(nextFocusableEl));

    }

    createOfficeMenuItem(link) {
        $(link).click(() => {
            let focusedElBeforeOpen = document.activeElement;
            new OfficeSelector().showOfficeSelector(focusedElBeforeOpen);
        });

        $(link).keypress(e => {
            if (e.which === 13) {
                let focusedElBeforeOpen = document.activeElement;
                new OfficeSelector().showOfficeSelector(focusedElBeforeOpen);
            }
        });

    }

    createSoundMenuItem(link) {
        $(link).click(() => {
            let focusedElBeforeOpen = document.activeElement;
            new SoundSelectors().showSoundSelector(focusedElBeforeOpen);
        });

        $(link).keypress(e => {
            if (e.which === 13) {
                let focusedElBeforeOpen = document.activeElement;
                new SoundSelectors().showSoundSelector(focusedElBeforeOpen);
            }
        });
    }

    createResultsMenuItem(link) {
        $(link).click(() => {
            let focusedElBeforeOpen = document.activeElement;
            new ResultsTable().showResults(focusedElBeforeOpen);
        });

        $(link).keypress(e => {
            if (e.which === 13) {
                let focusedElBeforeOpen = document.activeElement;
                new ResultsTable().showResults(focusedElBeforeOpen);
            }
        });
    }

    createRulesMenuItem(link) {
        $(link).click(() => {
            let focusedElBeforeOpen = document.activeElement,
                title = "Rules";
            new ModalWindow(focusedElBeforeOpen, title).createSideNavModal(RULES_HTML);
        });
        $(link).keypress(e => {
            if (e.which === 13) {
                let focusedElBeforeOpen = document.activeElement,
                    title = "Rules";
                new ModalWindow(focusedElBeforeOpen, title).createSideNavModal(RULES_HTML);
            }
        });
    }
    createSideNavMenuItems() {
        let menuItemsArray = ['#officeColors', '#soundSettings', '#bestResults', '#rules'];

        this.createOfficeMenuItem(menuItemsArray[0]);
        this.createSoundMenuItem(menuItemsArray[1]);
        this.createResultsMenuItem(menuItemsArray[2]);
        this.createRulesMenuItem(menuItemsArray[3]);
    }

    createSideNav(level, levelLanguage) {
        this.createSideNavView(level, levelLanguage, this.lastMenuLink, this.nextFocusableEl);
        this.createSideNavMenuItems();
    }
}

export { SideNav, gameColor, volume, rate };