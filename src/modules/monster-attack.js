import { ATTACK_POWER, SHIELD_POWER, HEAL_POWER, ATTACK_SOUNDS, HEAL_SOUNDS, SHILED_SOUNDS } from '../consts/attack_consts'
import { monster, player, level } from '../screens/levels/levels';
import { levelResults } from './level-results'
import { randomArrayElem } from './helpers'
import { showSpell } from './show-spell'

export class monsterAttack {
  constructor() {
    this.spells = ['attack'];
    if (monster.shield === 0) {
      this.spells.push('shield');
    }
    if (monster.health < (100 + 20 * level)) {
      this.spells.push('heal');
    };
    let spell = this.spells[_.random(0, this.spells.length - 1)];
    setTimeout(this[spell], 1000);
  }
  attack() {
    let audio = new Audio(`~/../assets/sounds/attack/${randomArrayElem(ATTACK_SOUNDS)}.mp4`);
    audio.play();
    new showSpell().attack('hero');
    if (!player.shield) {
      player.health -= ATTACK_POWER;
    }
    if (player.shield) {
      if (player.shield < ATTACK_POWER) {
        player.health += player.shield;
        player.shield = 0;
        player.health -= ATTACK_POWER;
      }
      if (player.shield > ATTACK_POWER) {
        player.shield -= ATTACK_POWER;
      }
    }
    if (player.health <= 0) {
      player.health = 0;
      document.querySelector('.hero-health-scale').style.width = `${player.health}%`;
      document.querySelector('.hero-health-scale__number').innerHTML = player.health;
      document.querySelector('.hero-shield__number').innerHTML = player.shield;
      setTimeout(() => {
        new levelResults().lose();
      }, 2500);
    };
    if (player.health > 0) {
      document.querySelector('.hero-health-scale').style.width = `${player.health}%`;
      document.querySelector('.hero-health-scale__number').innerHTML = player.health;
      document.querySelector('.hero-shield__number').innerHTML = player.shield;
      setTimeout(function () {
        document.querySelector('.spells').classList.toggle('showSpells');
      }, 2500);
    }
  }
  shield() {
    let audio = new Audio(`~/../assets/sounds/shield/${randomArrayElem(SHILED_SOUNDS)}.mp4`);
    audio.play();
    monster.shield += SHIELD_POWER;
    document.querySelector('.monster-shield__number').innerHTML = monster.shield;
    new showSpell().shield('monster');
    setTimeout(function () {
      document.querySelector('.spells').classList.toggle('showSpells');
    }, 2500);
  }
  heal() {
    let audio = new Audio(`~/../assets/sounds/heal/${randomArrayElem(HEAL_SOUNDS)}.mp4`);
    audio.play();
    monster.health += HEAL_POWER;
    if (monster.health > (100 + 20 * level)) {
      monster.health = 100 + 20 * level;
    };
    document.querySelector('.monster-health-scale').style.width = `${monster.health * 100 / (100 + 20 * level)}%`;
    document.querySelector('.monster-health-scale').style.marginLeft = `${100 - monster.health * 100 / (100 + 20 * level)}%`;
    document.querySelector('.monster-health-scale__number').innerHTML = monster.health;
    new showSpell().heal('monster');
    setTimeout(function () {
      document.querySelector('.spells').classList.toggle('showSpells');
    }, 2500);
  }
}
