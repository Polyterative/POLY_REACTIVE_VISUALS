import { NgtAnimationFrameStore } from '@angular-three/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { InstancedMesh, Object3D, Vector3 } from 'three';
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

  points: Models.Point[] = [];

  types = Models.ObjectTypes;
  private destroy$ = new Subject<void>();

  constructor(
    public cameraService: CameraService,
    public constantsService: ConstantsService,
    private changeDetector: ChangeDetectorRef,
    private oscServer: AbletonService,
    private animationFrameStore: NgtAnimationFrameStore
  ) {

    // build 3d array of points

    let count = 4;
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
                i + distanceBetweenPoints - width / 2,
                j + distanceBetweenPoints,
                k + distanceBetweenPoints - depth / 2
              ),
              new Vector3(
                0,
                0,
                0
              ),
              new Vector3(
                .1,
                .1,
                .1
              )
            ));

          this.points.push(point);
        }
      }
    }

    console.log(this.points);

  }

  ngOnInit(): void {

    // https://angular-three.netlify.app/?path=%2Fdocs%2Fcore-api-stores--page

  }

  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();
  }

  gap = 1
  numberOfItems: number = 256;
  // square root of number of items
  numberOfRows: number = Math.sqrt(this.numberOfItems);
  numberOfColumns: number = Math.sqrt(this.numberOfItems);

  instancedGridReady(instancedMesh: InstancedMesh) {

    console.log(instancedMesh)  // move grid coords to center the grid

  }

  animateObject(object: Object3D): void {
    // object.rotation.z += .11;
    object.rotation.x = this.constantsService.tick / 1000;

  }
}
