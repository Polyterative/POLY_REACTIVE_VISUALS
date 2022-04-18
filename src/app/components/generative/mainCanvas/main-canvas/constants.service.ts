import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { Euler } from 'three';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  public readonly tickRate: number = 5;
  public readonly bpm: number = 120;
  private tickCount$ = new BehaviorSubject<number>(0);

  public tick$ = this.tickCount$.asObservable();

  private beatCount$ = new BehaviorSubject<number>(0);

  public beat$ = this.beatCount$;

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
    interval(this.tickRate).subscribe((x) => this.tickCount$.next(x));

    interval(this.bpm).subscribe((x) => this.beatCount$.next(x));

  }
}
