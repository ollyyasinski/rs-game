//door opener
let rightDoor = $(".door-right"),
    leftDoor = $(".door-left");

class Door {
    constructor(door) {
        this.door = door;
    }
    openDoor() {
        this.door.click(
            function openDoor() {
                $(this).addClass("doorOpened");
            }
        );
    }

}

new Door(leftDoor).openDoor();
new Door(rightDoor).openDoor();


//helper
class AppHelpers {
    constructor() { };
    generateRandomArrayIndex(array) { // random index generator
        return _.random(0, array.length - 1, 0);
    };
    addRandomClass(target, sourceArray) {
        return target.addClass(sourceArray[this.generateRandomArrayIndex(sourceArray)]);
    };
}

//monster generator
const monsterHeadContainer = $(".monster-head-container"),
    monsterBodyContainer = $(".monster-body-container"),
    monsterLegsContainer = $(".monster-legs-container"),
    monsterHeadArray = ["monster-head-1", "monster-head-2", "monster-head-3", "monster-head-4"],
    monsterBodyArray = ["monster-body-1", "monster-body-2", "monster-body-3", "monster-body-4", "monster-body-5"],
    monsterLegsArray = ["monster-legs-1", "monster-legs-2", "monster-legs-3"];

class MonsterGenerator {
    constructor(head, body, legs) {
        this.head = head;
        this.body = body;
        this.legs = legs;
    };
    generateMonster(headArray, bodyArray, legsArray) {
        new AppHelpers().addRandomClass(this.head, headArray);
        new AppHelpers().addRandomClass(this.body, bodyArray);
        new AppHelpers().addRandomClass(this.legs, legsArray);
    }

}

new MonsterGenerator(monsterHeadContainer, monsterBodyContainer, monsterLegsContainer).generateMonster(monsterHeadArray, monsterBodyArray, monsterLegsArray);


//nameGenerator
const roleArray = ["Project Manager", "Product Owner", "Scrum Master", "Team Lead", "Key Developer"],
    nameArray = ["Jack", "Tom", "Dzmitry", "Abishek", "Alyaxey", "Richard", "John", "Kiran", "Yauheniy"],
    secondNameArray = ["Jones", "Abhishek", "Smith", "Brown", "Ivanou", "Hill", "Omar", "Clark"];

class NameGenerator {
    constructor(nameOptionsArray1, nameOptionsArray2, nameOptionsArray3) {
        this.nameOptionsArray1 = nameOptionsArray1;
        this.nameOptionsArray2 = nameOptionsArray2;
        this.nameOptionsArray3 = nameOptionsArray3;
    };
    generateRandomName() {
        return console.log(this.nameOptionsArray1[new AppHelpers().generateRandomArrayIndex(this.nameOptionsArray1)] + ' ' +
            this.nameOptionsArray2[new AppHelpers().generateRandomArrayIndex(this.nameOptionsArray2)] + ' ' +
            this.nameOptionsArray3[new AppHelpers().generateRandomArrayIndex(this.nameOptionsArray3)]);
    }
}

new NameGenerator(roleArray, nameArray, secondNameArray).generateRandomName();





// placeholder to open modal
let modal = document.getElementById('taskModal'),
    btn = document.getElementById("myBtn"),
    span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
 }
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
/* перебивает событие кнопки  

}*/
