import {
  ATTACK_POWER, SHIELD_POWER, HEAL_POWER, PLAYER_MAX_HEALTH, SUPER_ATTACK_POWER, ATTACK_SOUNDS, HEAL_SOUNDS, SHILED_SOUNDS
} from '../consts/attack_consts'
import { randomArrayElem, unblockSuperAttack, blockSuperAttack, blitzPower } from './helpers'
import { monster, player, level } from './create-page'
import { showSpell } from './show-spell'
import { monsterAttack } from './monster-attack'
import { levelResults } from './level-results'

export class doSpell {
  constructor() { }
  attack(power) {
    let audio = new Audio(`~/../assets/sounds/attack/${randomArrayElem(ATTACK_SOUNDS)}.mp4`);
    audio.play();
    let force = ATTACK_POWER;
    new showSpell().attack('monster');
    if (power !== undefined) {
      force = power;
    }
    if (!monster.shield) {
      monster.health -= force;
    }
    if (monster.shield) {
      if (monster.shield < force) {
        monster.health += monster.shield;
        monster.shield = 0;
        monster.health -= force;
      }
      if (monster.shield > force) {
        monster.shield -= force;
      }
    }
    player.super += 20;
    if (player.super > 100) {
      player.super = 100;
    }
    document.querySelector('.hero-super_scale').style.width = `${player.super}%`;
    if (player.super === 100) {
      unblockSuperAttack();
    }
    if (monster.health <= 0) {
      monster.health = 0;
      document.querySelector('.monster-health-scale').style.width = `${monster.health}%`;
      document.querySelector('.monster-health-scale__number').innerHTML = '';
      if (level < 5) {
        setTimeout(() => {
          new levelResults().win();
        }, 2000);
      }
      if (level === 5) {
        setTimeout(() => {
          new levelResults().winGame();
        }, 2000);
      }
    };
    if (monster.health > 0) {
      document.querySelector('.monster-health-scale').style.marginLeft = `${100 - monster.health * 100 / (100 + 20 * level)}%`;
      document.querySelector('.monster-health-scale').style.width = `${monster.health * 100 / (100 + 20 * level)}%`;
      document.querySelector('.monster-health-scale__number').innerHTML = monster.health;
      document.querySelector('.monster-shield__number').innerHTML = monster.shield;
      setTimeout(() => {
        new monsterAttack();
      }, 2000);
    };
  }
  shield() {
    let audio = new Audio(`~/../assets/sounds/shield/${randomArrayElem(SHILED_SOUNDS)}.mp4`);
    audio.play();
    player.shield += SHIELD_POWER;
    document.querySelector('.hero-shield__number').innerHTML = player.shield;
    new showSpell().shield('hero');
    setTimeout(() => {
      new monsterAttack();
    }, 2000);
  }
  heal() {
    let audio = new Audio(`~/../assets/sounds/heal/${randomArrayElem(HEAL_SOUNDS)}.mp4`);
    audio.play();
    if (player.health < PLAYER_MAX_HEALTH) {
      player.health += HEAL_POWER;
      if (player.health > PLAYER_MAX_HEALTH) {
        player.health = PLAYER_MAX_HEALTH;
      }
    }
    new showSpell().heal('hero');
    document.querySelector('.hero-health-scale').style.width = `${player.health}%`;
    document.querySelector('.hero-health-scale__number').innerHTML = player.health;
    setTimeout(() => {
      new monsterAttack();
    }, 2000);
  }
  blitzAttack() {
    new doSpell().attack(blitzPower);
  }
  super() {
    new doSpell().attack(SUPER_ATTACK_POWER);
    blockSuperAttack();
  }
}
