import { NgtVector3 } from '@angular-three/core';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Object3D } from 'three';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CubeComponent {
  @Input() position?: NgtVector3; // imported from @angular-three/core

  hover = false;
  active = false;

  onAnimate(mesh: Object3D) {
    mesh.rotation.x = mesh.rotation.y += 0.01;
  }

}
