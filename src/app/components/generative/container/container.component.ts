import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import p5 from 'p5';
import { BehaviorSubject, from, interval, Subject, switchMap } from 'rxjs';
import { share, takeUntil } from 'rxjs/operators';
import { GridHelper, Material } from 'three';
import { WebMidi } from 'webmidi';
import { RendererContainer } from '../RenderAlgos/RendererContainer';
import { Models } from './models';
import { Utils } from './utils';
import createCoordinatesGrid = Utils.createCoordinatesGrid;
import getOrigin = Utils.getOrigin;

export interface Constants {units: { distanceBetweenLayers: number };}

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent implements OnInit, AfterViewInit, OnDestroy {
  fps = 60;

  // rxjs clock
  interval$ = interval(1000 / this.fps)
    .pipe(share());

  private unit = 8;

  generators: Models.ItemGenerator[] = [];
  private permanentRenderers: Models.PiGenerator[] = [];

  private addItemGenerators$ = new Subject<Models.ItemGenerator[]>();

  private removeGenerator$ = new Subject<Models.PiGenerator>();

  private currentTime$ = new BehaviorSubject<number>(0);

  private destroy$ = new Subject<void>();

  private constants: Constants = {
    units: {
      distanceBetweenLayers: this.unit * 4
    }
  }



  private coordinatesGrid$ = new BehaviorSubject<Models.CoordinateGridPoint[]>([]);

  private events = {
    windowResized$: new Subject<{ width: number, height: number }>(),
    threeInitialized$: new Subject<void>()
  }

  private renderers: RendererContainer = new RendererContainer(this.currentTime$, this.constants);
  window = window;

  constructor(
  ) {
    this.events.threeInitialized$
      .pipe(
        switchMap(x => this.interval$),
        takeUntil(this.destroy$)
      )
      .subscribe(value => this.currentTime$.next(value));

  }

  ngAfterViewInit() {
    this.events.threeInitialized$.next()

  }





  private setupMidiInterators(): void {
    from(WebMidi.enable({}))
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        // listen to midi input
        WebMidi.inputs.forEach(input => {
          // @ts-ignore
          input.addListener('noteon', 'all', (e) => {
            console.log(e);

            // let item = buildFlicker(
            //   this.coordinatesGrid$.value, this.unit, this.currentTime$, this.fps, this.destroy$
            // );
            // this.addItemGenerators$.next(
            //   item
            // )
            //
            // //destroy item when killed
            // item.lifetimeManager.addOnDeath(() => this.removeGenerator$.next(item));
          });
        });

        // listen to midi events
      });
  }


  private buildCoordinatesGrid(p: p5): Models.CoordinateGridPoint[] {
    return createCoordinatesGrid(8, 8, getOrigin(p), this.unit);
  }

  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();
  }


  ngOnInit(): void {
  }

  onGridHelperReady(helper: GridHelper) {
    const material = helper.material as Material;
    material.opacity = 0.2;
    material.transparent = true;
  }
}
