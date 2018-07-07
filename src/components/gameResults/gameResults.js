import { ModalWindow } from '../modalWindow/modalWindow';
import './resultsTable.css';
import { PLAY_AGAIN_BTN_HTML } from './consts/gameResultsConsts';

const RESULTS_TABLE_HTML = require('./resultsTable.html');

export class ResultsTable {
    constructor() {
        this.bestResults = Object.keys(localStorage).reduce((obj, str) => {
            obj[str] = localStorage.getItem(str);
            return obj
        }, {});
        this.bestResultsSortedArray = [];
        this.title = "Best Results"
    };
    createSortedResults() {
        for (let result in this.bestResults) {
            if (!isNaN(Number(this.bestResults[result]))) {
                this.bestResultsSortedArray.push([result, this.bestResults[result]]);
            }
        }
        this.bestResultsSortedArray.sort((a, b) => {
            return b[1].localeCompare(a[1]);
        });
        this.bestResultsSortedArray = this.bestResultsSortedArray.slice(0, 10);
    };
    createResultsTable(focusedElBeforeOpen, bestResultsSortedArray) {
        new ModalWindow(focusedElBeforeOpen, this.title).createSideNavModal(RESULTS_TABLE_HTML);

        let resultsTable = $("#resultsTable");

        if (bestResultsSortedArray.length !== 0) {
            resultsTable.empty();
            for (let i in bestResultsSortedArray) {
                let resultRow = $("<tr></tr>"),
                    position = $("<td></td>"),
                    userName = $("<td></td>"),
                    userResult = $("<td></td>");

                resultRow.append(position.html(parseInt(i) + 1));
                resultRow.append(userName.html(bestResultsSortedArray[i][0]));
                resultRow.append(userResult.html(bestResultsSortedArray[i][1]));
                resultsTable.append(resultRow);
            }
        } else {
            let resultRow = $("<tr></tr>"),
                noResults = $("<td colspan='3'></td>");

            resultRow.append(noResults.html("No Results Yet"));
            resultsTable.append(resultRow);
        }
    }

    showResults(focusedElBeforeOpen, btn) {
        this.createSortedResults();
        this.createResultsTable(focusedElBeforeOpen, this.bestResultsSortedArray);

        if (btn) {
            this.addPlayAgainBtn();
        }
    }
    addPlayAgainBtn() {
        $(".menu-modal-content").append(PLAY_AGAIN_BTN_HTML);
    }
}