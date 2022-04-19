import { ChangeDetectorRef } from '@angular/core';
import { Observable, switchMap, take, takeUntil, tap } from 'rxjs';
import { Models } from './Models';
import PositionData = Models.PositionData;

export class MovementManager {
  // export class MovementManager implements Positionable{

  // current
  current: PositionData = new PositionData();

  private startTime: number = 0;
  private endTime: number = 0;

  constructor(
    public changeDetector: ChangeDetectorRef,
    destroy$: Observable<void>,
    currentTime$: Observable<number>,
    animationDuration: number,
    public starting: Models.PositionData,
    public final: Models.PositionData
  ) {

    currentTime$
      .pipe(
        take(1),
        tap(currentTime => {
          this.startTime = currentTime;
          this.endTime = currentTime + animationDuration;

          this.current = starting;
        }),
        switchMap(x => currentTime$),
        takeUntil(destroy$)
      )
      .subscribe(currentTime => {
        // if currentTime is between startTime and endTime update coordinates
        if (currentTime >= this.startTime && currentTime <= this.endTime) {
          this.updatePosition(currentTime);
        }
      });

  }

  updatePosition(currentTime: number) {
    const timeDifference = this.endTime - this.startTime;
    const timePassed = currentTime - this.startTime;
    const percentage = timePassed / timeDifference;
    // move from starting to final position considering duration with easing

    // apply easing
    const easing = (currentTime - this.startTime) / (this.endTime - this.startTime);
    const easingFunction = (t: number) => {
      if (t < 0.5) {
        return Math.pow(t * 2, 2) / 2;
      } else {
        return 1 - Math.pow((1 - t) * 2, 2) / 2;
      }
    };

    const currentPosition = this.current.position
    const startingPosition = this.starting.position;
    const finalPosition = this.final.position;

    const currentX = startingPosition.x + (finalPosition.x - startingPosition.x) * easingFunction(easing);
    const currentY = startingPosition.y + (finalPosition.y - startingPosition.y) * easingFunction(easing);
    const currentZ = startingPosition.z + (finalPosition.z - startingPosition.z) * easingFunction(easing);

    this.current.position.set(currentX, currentY, currentZ);

    this.changeDetector.markForCheck();
    this.changeDetector.detectChanges();

  }

  private easeInOutQuad(number: number, number2: number, number3: number, number4: number): number {
    return number3 * (number /= number4) * number + number2;
  }
}
