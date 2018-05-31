let rightDoor = $(".door-right"),
    leftDoor = $(".door-left");

rightDoor.click(openDoor);
leftDoor.click(openDoor);

function openDoor() {
    $(this).addClass("doorOpened");
}