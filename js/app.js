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
    monsterLegsContainer = $(".monster-legs-container");

const monsterHead1 = "monster-head-1",
    monsterHead2 = "monster-head-2",
    monsterHead3 = "monster-head-3",
    monsterHead4 = "monster-head-4";

const monsterBody1 = "monster-body-1",
    monsterBody2 = "monster-body-2",
    monsterBody3 = "monster-body-3",
    monsterBody4 = "monster-body-4",
    monsterBody5 = "monster-body-5";

const monsterLegs1 = "monster-legs-1",
    monsterLegs2 = "monster-legs-2",
    monsterLegs3 = "monster-legs-3";

let monsterHeadArray = [monsterHead1, monsterHead2, monsterHead3, monsterHead4],
    monsterBodyArray = [monsterBody1, monsterBody2, monsterBody3, monsterBody4, monsterBody5],
    monsterLegsArray = [monsterLegs1, monsterLegs2, monsterLegs3];

// random index generator
let randomHeadIndex = _.random(0, 3, 0),
    randomBodyIndex =  _.random(0, 4, 0),
    randomLegsIndex = _.random(0, 2, 0);

// monsterHeadContainer.addClass(monsterHeadArray[randomHeadIndex]);
monsterBodyContainer.addClass(monsterBodyArray[randomBodyIndex]);
monsterLegsContainer.addClass(monsterLegsArray[randomLegsIndex]);