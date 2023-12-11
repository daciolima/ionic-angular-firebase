import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences'
import { Timer } from 'easytimer.js';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  timer: any = new Timer();

  relogio: string = "00:00:00"

  timer_atendimento: string = "00:00:00"

  obj_users? : Array<any> = []

  constructor() {
  }

  startTimerAtendimento() {
    this.setTimerLocalStorage();
    this.timer.start();
  }
  pauseTimerAtendimento() {
    this.setTimerLocalStorage();
    this.timer.pause();

  }
  stopTimerAtendimento() {
    this.setTimerLocalStorage();
    this.timer.stop();
  }

  async zerarTimerAtendimento() {
    this.timer.stop();
    await Preferences.set(
      {
        key: 'relogio',
        value:  JSON.stringify("00:00:00")
      }
    );
    return this.displayTimer();
  }

  resetTimerAtendimento() {
    this.timer.reset();
  }

  updateStorageTimer() {
    this.getTimerLocaStorage();
    this.timer.reset();
  }

  displayTimer() {
    this.timer.addEventListener('secondsUpdated', () => {
      this.relogio = this.timer.getTimeValues().toString()
    });
    return this.relogio
  }

  // JSON "set"
    async setTimerLocalStorage() {
      await Preferences.set(
        {
          key: 'relogio',
          value: JSON.stringify(this.displayTimer() )
        }
      );
    }

  async getTimerLocaStorage() {
    const relogio = await Preferences.get({key: 'relogio'})
    this.timer_atendimento = relogio.value ? JSON.parse(relogio.value) : null
    console.log(this.timer_atendimento)

    }

}

