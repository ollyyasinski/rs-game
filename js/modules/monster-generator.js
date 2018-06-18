import { Helpers } from './helpers'
import { ROLE_ARRAY, NAME_ARRAY , SECOND_NAME_ARRAY } from '../consts/monster_consts'

export class MonsterGenerator {
  constructor(head, body, legs) {
    this.head = head;
    this.body = body;
    this.legs = legs;
  };
  generateMonster(headArray, bodyArray, legsArray) {
    new Helpers().addRandomClass(this.head, headArray);
    new Helpers().addRandomClass(this.body, bodyArray);
    new Helpers().addRandomClass(this.legs, legsArray);
    new NameGenerator(ROLE_ARRAY, NAME_ARRAY, SECOND_NAME_ARRAY).showMonsterName();
  }
}

class NameGenerator {
  constructor(nameOptionsArray1, nameOptionsArray2, nameOptionsArray3) {
    this.position = nameOptionsArray1;
    this.name = nameOptionsArray2;
    this.surname = nameOptionsArray3;
  };
  generateRandomName() {
    return this.position[new Helpers().randomNumber(this.position.length)] + ' ' +
      this.name[new Helpers().randomNumber(this.name.length)] + ' ' +
      this.surname[new Helpers().randomNumber(this.surname.length)];
  };
  showMonsterName() {
    let monsterRandomName = this.generateRandomName();
    $(".monster-name").append(monsterRandomName);
  }
}
