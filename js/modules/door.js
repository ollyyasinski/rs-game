let synth = window.speechSynthesis;

export class Door {
  constructor(door) {
    this.door = door;
  }
  openDoor() {
    this.door.click(
      function openDoor() {
        $(this).addClass("doorOpened");
        synth.cancel();
      }
    );
  }
}
