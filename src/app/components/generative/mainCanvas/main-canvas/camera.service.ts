import { NgtResize } from '@angular-three/core';
import { Injectable } from '@angular/core';
import { merge } from 'rxjs';
import { PerspectiveCamera, Vector3 } from 'three';
import { ConstantsService } from './constants.service';

@Injectable()
export class CameraService {

  public options: PerspectiveCamera = this.buildCamera();

  private zHorizon = new Vector3(0, 0, 100000);
  private center = new Vector3(0, 0, 0);

  public speedDivider = 1.5;

  constructor(
    private constantsService: ConstantsService,
    private resizeService: NgtResize
  ) {

    // this.resizeService
    //   .pipe(
    //
    //   )
    //   .subscribe(value => {
    //     this.options.aspect = value.width / value.height;
    //     this.options.fov = 35;
    //     this.options.updateProjectionMatrix();
    //   })

    // this.options.position.add(new Vector3(15, 15, 15));
    // this.options.lookAt(this.zHorizon);
    this.options.lookAt(this.center);

    merge(
      this.constantsService.tick$
    )
      .subscribe(() => {
        // this.options.position.add(new Vector3(0, 0, (1 / this.speedDivider)));
      });

    this.constantsService.tick$.subscribe(() => {
      // slowly rotate camera around center
      // let wobble: number = Math.cos(this.constantsService.tick / 50000);
      let rotationSpeed: number = this.constantsService.tick / 15000;

      let distanceFromCenter: number = 10;
      this.options.position.set(
        Math.sin(rotationSpeed) * distanceFromCenter,
        -2.5,
        Math.cos(rotationSpeed) * distanceFromCenter
      );

      this.options.lookAt(this.center.clone().add(new Vector3(0, 2.5, 0)));

    });

    // move camera every four beats
    // this.constantsService.beat$.subscribe((x) => {
    //   if (x % 32 === 0) {
    //     // smoothly move camera behind by 500 units
    //     this.options.position.add(new Vector3(0, 0, -500));
    //   }
    // });

  }

  private buildCamera(): PerspectiveCamera {
    return new PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.01, 5000);
  }
}
