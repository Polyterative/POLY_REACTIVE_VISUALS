import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GridHelper } from 'three';
import { CameraService } from '../camera.service';

@Component({
  selector: 'app-canvas-content',
  templateUrl: './canvas-content.component.html',
  styleUrls: ['./canvas-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanvasContentComponent implements OnInit {

  onGridHelperReady(
    helper: GridHelper): void {

  }

  constructor(
    public cameraService: CameraService
  ) { }

  ngOnInit(): void {
  }

}
