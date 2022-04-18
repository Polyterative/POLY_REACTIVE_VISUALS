import { BehaviorSubject, Observable, takeUntil } from 'rxjs';
import { Models } from './models';
import Coordinates = Models.Coordinates;

export class MovementManager {
  // export class MovementManager implements Positionable{

  coordinates = {
    current: { x: 0, y: 0 },
    starting: { x: 0, y: 0 },
    final: { x: 0, y: 0 }
  }

  private startTime: number;
  private endTime: number;

  constructor(
    destroy$: Observable<void>,
    currentTime$: BehaviorSubject<number>,
    animationDuration: number,
    starting: Coordinates,
    final: Coordinates
  ) {

    this.coordinates.starting.x = starting.x;
    this.coordinates.starting.y = starting.y;
    this.coordinates.final.x = final.x;
    this.coordinates.final.y = final.y;

    this.startTime = currentTime$.value;
    this.endTime = this.startTime + animationDuration;

    // currentTime$
    //   .pipe(
    //     takeWhile((x) => x < this.endTime),
    //     takeUntil(destroy$)
    //   )
    //   .subscribe(currentTime => {
    //     if (this.startTime === undefined) {
    //       this.startTime = currentTime;
    //     }
    //     this.endTime = currentTime + animationDuration;
    //   });

    // animate when currentTime is equal to startTime

    currentTime$
      .pipe(takeUntil(destroy$))
      .subscribe(currentTime => {
        // if currentTime is between startTime and endTime update coordinates
        if (currentTime >= this.startTime && currentTime <= this.endTime) {
          this.updatePosition(currentTime);
        }
      });

  }

  updatePosition(currentTime: number) {
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
    const easedX = this.coordinates.starting.x + (this.coordinates.final.x - this.coordinates.starting.x) * easingFunction(easing);
    const easedY = this.coordinates.starting.y + (this.coordinates.final.y - this.coordinates.starting.y) * easingFunction(easing);

    this.coordinates.current.x = easedX;
    this.coordinates.current.y = easedY;

  }

  // currentCoordinates() :{ x: number; y: number }  {
  //   x: movementManager.coordinates.current.x.value,
  //   y: movementManager.coordinates.current.y.value
  // }

  getCurrentCoordinates(): Coordinates {

    return this.coordinates.current;
  }

  private easeInOutQuad(number: number, number2: number, number3: number, number4: number): number {
    return number3 * (number /= number4) * number + number2;
  }
}
