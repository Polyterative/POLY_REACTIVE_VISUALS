import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { Euler } from 'three';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  // in ms
  public readonly tickRate: number = 10;
  public readonly bpm: number = 120;

  private startTime = new Date();

  private tickCount$ = new BehaviorSubject<number>(0);

  public tick$ = this.tickCount$.asObservable();

  private beatCount$ = new BehaviorSubject<number>(0);

  public beat$ = this.beatCount$;

  private currentTickCount: number = 0;

  public readonly threeUtils = {
    degreesToEuler: (x: number, y: number, z: number) => {

      // degrees to radians
      return new Euler(
        x * Math.PI / 180,
        y * Math.PI / 180,
        z * Math.PI / 180
      );
    }
  }

  public readonly threeConstants = {
    angles: {
      standard: new Euler(0, 0, 0),
      top: this.threeUtils.degreesToEuler(270, 0, 0)
    }
  }

  constructor() {
    interval(this.tickRate).subscribe((x) => {
      let difference: number = new Date().getTime() - this.startTime.getTime();
      this.tickCount$.next(difference);
      this.currentTickCount = difference;
    });

    interval(this.bpm).subscribe((x) => this.beatCount$.next(x));

  }

  secondsToTicks(number: number): number {
    return number * this.tickRate;
  }

  get tick(): number {
    return this.currentTickCount;
  }
}
