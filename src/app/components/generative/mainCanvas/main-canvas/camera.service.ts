import { Injectable } from '@angular/core';
import { merge } from 'rxjs';
import { PerspectiveCamera, Vector3 } from 'three';
import { ConstantsService } from './constants.service';

@Injectable()
export class CameraService {

  public options: PerspectiveCamera = new PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.01, 5000);

  private zHorizon = new Vector3(0, 0, 100000);

  public speedDivider = 1.5;

  constructor(
    private constantsService: ConstantsService
  ) {
    this.options.position.add(new Vector3(0, 50, 0));
    // this.options.lookAt(this.zHorizon);
    this.options.lookAt(new Vector3(0, 50, 1000));

    merge(
      this.constantsService.tick$
    )
      .subscribe(() => {
        this.options.position.add(new Vector3(0, 0, (1 / this.speedDivider)));
      });

    // move camera every four beats
    // this.constantsService.beat$.subscribe((x) => {
    //   if (x % 32 === 0) {
    //     // smoothly move camera behind by 500 units
    //     this.options.position.add(new Vector3(0, 0, -500));
    //   }
    // });

  }


}
