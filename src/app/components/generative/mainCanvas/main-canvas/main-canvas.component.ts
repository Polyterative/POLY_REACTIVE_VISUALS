import { NgtResize } from '@angular-three/core';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CameraService } from './camera.service';
import { ConstantsService } from './constants.service';
import { ShortcutsService } from './shortcuts.service';

@Component({
  selector: 'app-main-canvas',
  templateUrl: './main-canvas.component.html',
  styleUrls: ['./main-canvas.component.scss'],
  providers: [
    NgtResize,
    CameraService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainCanvasComponent implements OnInit {
  window: Window = window;

  constructor(
    public cameraService: CameraService,
    public constantsService: ConstantsService,
    public shortcutsService: ShortcutsService
  ) { }

  ngOnInit(): void {
  }

}
