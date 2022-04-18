import { NgtWithMaterialControllerModule } from '@angular-three/core';
import { NgtBoxGeometryModule } from '@angular-three/core/geometries';
import { NgtMeshBasicMaterialModule } from '@angular-three/core/materials';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CubeComponent } from './cube/cube.component';

@NgModule({
  declarations: [
    CubeComponent
  ],
  imports: [
    CommonModule,
    NgtWithMaterialControllerModule,
    NgtBoxGeometryModule,
    NgtMeshBasicMaterialModule
  ],
  exports: [
    CubeComponent
  ]
})
export class ThreeObjectsModule {}
