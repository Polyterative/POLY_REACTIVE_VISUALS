import { NgtAnimationFrameStore, NgtRender } from '@angular-three/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { InstancedMesh, Matrix4, Object3D, Vector3 } from 'three';
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

  points: Models.Point[] = this.buildPointArray();

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
    let count = 16; // number of points in each dimension
    let height: number = count;
    let width: number = count;
    let depth: number = count;

    let distanceBetweenPoints: number = .25;

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

    let position = point.current.position.clone().multiplyScalar(0.25);
    let noise = this.constantsService.simplexNoise.noise4D(
      position.x, position.y, position.z,
      this.constantsService.tick / (5000 / 2)
    ) * 5;

    let randomSize: number = Math.abs(Math.sin(this.constantsService.tick / 10 * (point.id.x + 1) / 100));
    object.scale.x = noise;
    object.scale.y = noise;
    object.scale.z = noise;
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

  setupMesh(inst: InstancedMesh) {

    this.points.forEach((item, index) => {
      const matrix = new Matrix4();
      matrix.setPosition(item.current.position);
      matrix.scale(item.current.scale);
      inst.setMatrixAt(index, matrix);
      inst.instanceMatrix.needsUpdate = true;

      // inst.setColorAt(index, item.color);
    })
  }

  animateMesh($event: { state: NgtRender; object: Object3D }): void {
    let object = <InstancedMesh>$event.object;

    this.points.forEach((child, index) => {
      // let distanceFromCenter = child.position.distanceTo(new Vector3(0, 0, 0));

      // move the individual instance closer to the center 0,0,0
      // child.position.add(new Vector3(-distanceFromCenter / 100, -distanceFromCenter / 100, -distanceFromCenter / 100));

      const matrix = new Matrix4();
      matrix.setPosition(child.current.position);
      matrix.scale(child.current.scale);
      object.setMatrixAt(index, matrix);
    });

    object.instanceMatrix.needsUpdate = true;
  }
}
