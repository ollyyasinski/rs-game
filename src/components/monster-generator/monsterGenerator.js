import { addRandomClass } from '../helpers/helpers';
import { ROLE_ARRAY, NAME_ARRAY, SECOND_NAME_ARRAY } from './consts/monster_consts';
import './css/monster-legs.css';

export class MonsterGenerator {
  constructor(head, body, legs) {
    this.head = head;
    this.body = body;
    this.legs = legs;
  };
  generateMonster(headArray, bodyArray, legsArray) {
    addRandomClass(this.head, headArray);
    addRandomClass(this.body, bodyArray);
    addRandomClass(this.legs, legsArray);
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
    return this.position[_.random(0, this.position.length - 1, 0)] + ' ' +
      this.name[_.random(0, this.name.length - 1, 0)] + ' ' +
      this.surname[_.random(0, this.surname.lengt - 1, 0)];
  };
  showMonsterName() {
    let monsterRandomName = this.generateRandomName();
    $(".monster-name").append(monsterRandomName);
  }
}
