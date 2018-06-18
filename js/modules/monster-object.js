export class Monster { 
  constructor(level) {
    this.health = 100 + 20 * level;
    this.shield = 0;
  }
}
