let rightDoor = $(".door-right"),
    leftDoor = $(".door-left");

rightDoor.click(openDoor);
leftDoor.click(openDoor);

function openDoor() {
    $(this).addClass("doorOpened");
}



// monster generator
let monsterHeadContainer = $(".monster-head-container"),
    monsterBodyContainer = $(".monster-body-container"),
    monsterLegsContainer = $(".monster-legs-container"),
    monsterHeadArray = ["monster-head-1", "monster-head-2", "monster-head-3", "monster-head-4"],
    monsterBodyArray = ["monster-body-1", "monster-body-2", "monster-body-3", "monster-body-4", "monster-body-5"],
    monsterLegsArray = ["monster-legs-1", "monster-legs-2", "monster-legs-3"];

// random index generator
let generateRandomArrayIndex = (array) => {
    return _.random(0, array.length - 1, 0);
};

let addRandomClass = (target, sourceArray) => {
    return target.addClass(sourceArray[generateRandomArrayIndex(sourceArray)]);
}

addRandomClass(monsterHeadContainer, monsterHeadArray);
addRandomClass(monsterBodyContainer, monsterBodyArray);
addRandomClass(monsterLegsContainer, monsterLegsArray);


const roleArray = ["Project Manager", "Product Owner", "Scrum Master", "Team Lead", "Key Developer"],
    nameArray = ["Jack", "Tom", "Dzmitry", "Abishek", "Alyaxey", "Richard", "John", "Kiran", "Yauheniy"],
    secondNameArray = ["Jones", "Abhishek", "Smith", "Brown", "Ivanou", "Hill", "Omar", "Clark"];

generateRandomName = (array1, array2, array3) => {
    return console.log(array1[generateRandomArrayIndex(array1)] + ' ' + array2[generateRandomArrayIndex(array2)] + ' ' + array3[generateRandomArrayIndex(array3)]);
}

generateRandomName(roleArray, nameArray, secondNameArray);





// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

let orderArray = [];

$(function () {
    $("#sortable").sortable({
        stop: function (ev, ui) {
            let children = $('#sortable').sortable('refreshPositions').children();
            $.each(children, function () {
                orderArray.push($(this).text().trim());
            });
            console.log(orderArray);
        }
    });
});

