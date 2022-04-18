import { BehaviorSubject, merge, Observable, Subject, take, takeUntil } from 'rxjs';

export class LifetimeManager {

  remainingLifetime$: BehaviorSubject<number> = new BehaviorSubject(0);
  remainingLifetimePercentage$: BehaviorSubject<number> = new BehaviorSubject(0);
  private readonly desiredLifeTime;
  kill$ = new Subject<void>();
  private onDeath: (() => void)[] = [];

  private birthTime: number = 0;

  constructor(
    currentTime$: Observable<number>,
    desiredLifeTime: number,
    destroy$: Observable<void>
  ) {

    currentTime$.pipe(take(1)).subscribe(time => this.birthTime = time);

    this.desiredLifeTime = desiredLifeTime;

    let destroyers$ = merge(destroy$, this.kill$);

    currentTime$
      .pipe(
        takeUntil(destroyers$)
      )
      .subscribe(currentTime => {
        const remainingLifeTime = this.desiredLifeTime - (currentTime - this.birthTime);
        this.remainingLifetime$.next(remainingLifeTime);
      });

    destroy$.pipe(
      takeUntil(destroyers$)
    ).subscribe(() => {
      this.kill$.next();
    });

    this.remainingLifetime$
      .pipe(
        takeUntil(destroyers$)
      )
      .subscribe(remainingLifeTime => {
        if (remainingLifeTime <= 0) {
          this.kill$.next();
        }
      });

    this.remainingLifetime$.subscribe(remainingLifeTime => {
      this.remainingLifetimePercentage$.next((remainingLifeTime / this.desiredLifeTime) * 100);
    });

    this.kill$.pipe(take(1)).subscribe(() => this.onDeath.forEach(onDeath => onDeath()));

  }

  public addOnDeath(event: () => void) {
    this.onDeath.push(event);
  }

  // public getRemainingLifetime(): number {
  //   return this.remainingLifetime$.getValue();
  // }

  public getRemainingLifetimePercentage(): number {
    return this.remainingLifetime$.getValue() / this.desiredLifeTime * 100;
  }

}
