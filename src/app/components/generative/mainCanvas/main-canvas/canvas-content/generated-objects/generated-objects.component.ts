import { NgtAnimationFrameStore } from '@angular-three/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Object3D, Vector3 } from 'three';
import { CameraService } from '../../camera.service';
import { ConstantsService } from '../../constants.service';
import { AbletonService } from './ableton.service';
import { Models } from './Models';
import PositionData = Models.PositionData;

@Component({
  selector: 'app-generated-objects',
  templateUrl: './generated-objects.component.html',
  styleUrls: ['./generated-objects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneratedObjectsComponent implements OnInit, OnDestroy {

  renderedPoints: Models.Point[] = this.buildPointArray();

  types = Models.ObjectTypes;
  private destroy$ = new Subject<void>();

  constructor(
    public cameraService: CameraService,
    public constantsService: ConstantsService,
    private changeDetector: ChangeDetectorRef,
    private oscServer: AbletonService,
    private animationFrameStore: NgtAnimationFrameStore
  ) {


  }

  private buildPointArray() {
    let points: Models.Point[] = [];
    let count = 8;
    let height: number = count;
    let width: number = count;
    let depth: number = count;

    let distanceBetweenPoints: number = .5;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        for (let k = 0; k < depth; k++) {
          let point = new Models.Point(
            new PositionData(
              new Vector3(
                (i * distanceBetweenPoints) - width * distanceBetweenPoints / 2,
                (j * distanceBetweenPoints),
                (k * distanceBetweenPoints) - width * distanceBetweenPoints / 2
              ),
              new Vector3(
                0,
                0,
                0
              ),
              new Vector3(
                .01,
                .01,
                .01
              )
            ), new Vector3(
              i, j, k
            )
          );

          points.push(point);
        }
      }
    }

    return points;
  }

  ngOnInit(): void {

    // https://angular-three.netlify.app/?path=%2Fdocs%2Fcore-api-stores--page

  }

  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();
  }

  animateObject(object: Object3D, point: Models.Point): void {
    // object.rotation.z += .11;
    // object.rotation.x = this.constantsService.tick / 1000;

    let position = point.current.position;
    let noise = this.constantsService.simplexNoise.noise4D(position.x, position.y, position.z, this.constantsService.tick / (2000));

    let randomSize: number = Math.abs(Math.sin(this.constantsService.tick / 10 * (point.id.x + 1) / 100));
    object.scale.x = .5 + noise;
    object.scale.y = .5 + noise;
    object.scale.z = .5 + noise;
    // if (point.id.x % 3 === 0) {
    //   let number: number = Math.sin(this.constantsService.tick / 500) / 100;
    //   object.scale.x = number;
    //   object.scale.y = number;
    //   object.scale.z = number;
    // } else {
    //   let number: number = Math.sin(this.constantsService.tick / 1000) / 100;
    //   object.scale.x = number;
    //   object.scale.y = number;
    //   object.scale.z = number;
    // }
  }

}
