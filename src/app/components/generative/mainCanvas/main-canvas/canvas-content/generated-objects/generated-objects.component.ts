import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { Vector3 } from 'three';
import { CameraService } from '../../camera.service';
import { ConstantsService } from '../../constants.service';
import { AbletonService } from './ableton.service';
import { Models } from './Models';

@Component({
  selector: 'app-generated-objects',
  templateUrl: './generated-objects.component.html',
  styleUrls: ['./generated-objects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneratedObjectsComponent implements OnInit {

  objects: Models.PositionedObject[] = [];

  types = Models.ObjectTypes;

  constructor(
    public cameraService: CameraService,
    public constantsService: ConstantsService,
    private changeDetector: ChangeDetectorRef,
    private oscServer: AbletonService
  ) {

    // this.constantsService.beat$
    this.oscServer.events.note$
      .pipe(
        // bufferCount(8),
        // withLatestFrom(this.constantsService.tick$),
        // map(([beats, tick]) => tick)
        // map(([beats, tick]) => this.cameraService.options.position.z)
        map((_) => this.cameraService.options.position.z)
      )
      .subscribe((x) => {
        // add new objects to the array
        let forwardOffset: number = -50;
        // let calculatedCurrentCameraPosition: number = x / this.cameraService.speedDivider;
        let calculatedCurrentCameraPosition: number = x;
        this.objects.push({
          position: new Vector3(
            0,
            1,
            (calculatedCurrentCameraPosition + forwardOffset)
          ),
          rotation: new Vector3(
            0,
            0,
            0
          ),
          dimensions: new Vector3(
            1,
            1,
            1
          ),
          type: Models.ObjectTypes.FLAT_CIRCLE
        });

        this.objects.push({
          position: new Vector3(
            Math.sin(calculatedCurrentCameraPosition / 100) * Math.random() * 25,
            0,
            (calculatedCurrentCameraPosition + forwardOffset)
          ),
          rotation: new Vector3(
            0,
            0,
            0
          ),
          dimensions: new Vector3(
            5,
            5,
            .01
          ),
          type: Models.ObjectTypes.DOTGRID
        });

        // move x to the right or to the left at max 10 at random
        // this.objects.forEach((object) => {
        //   object.position.x = object.position.x + (Math.random() * 20) - 5;
        // });

        this.changeDetector.markForCheck();
        this.changeDetector.detectChanges();
      });

    //remove objects from the array that are behind the camera
    this.constantsService.tick$
      .pipe(
        filter((x) => x % 500 === 0)
      )
      .subscribe((x) => {
        let cameraPosition: Vector3 = this.cameraService.options.position;

        //remove from array in the fastest way possible performance wise
        this.objects = this.objects.filter((object) => {
          return object.position.z > cameraPosition.z;
        });

        this.changeDetector.markForCheck();

      });
  }

  ngOnInit(): void {

  }

}
