import { NgtColorPipeModule, NgtCoreModule, NgtCursorModule, NgtFogPipeModule, NgtRadianPipeModule } from '@angular-three/core';
import {
  NgtBoxGeometryModule, NgtCircleGeometryModule, NgtConeGeometryModule, NgtEdgesGeometryModule, NgtSphereGeometryModule,
  NgtTetrahedronGeometryModule
} from '@angular-three/core/geometries';
import { NgtBoxHelperModule, NgtGridHelperModule } from '@angular-three/core/helpers';
import { NgtAmbientLightModule, NgtDirectionalLightModule, NgtHemisphereLightModule } from '@angular-three/core/lights';
import {
  NgtLineBasicMaterialModule, NgtLineDashedMaterialModule, NgtMeshBasicMaterialModule, NgtMeshLambertMaterialModule,
  NgtMeshPhongMaterialModule, NgtMeshPhysicalMaterialModule, NgtMeshStandardMaterialModule
} from '@angular-three/core/materials';
import { NgtInstancedMeshModule, NgtMeshModule } from '@angular-three/core/meshes';
import { NgtStatsModule } from '@angular-three/core/stats';
import { NgtEffectComposerModule } from '@angular-three/postprocessing';
import { NgtBloomModule } from '@angular-three/postprocessing/effects';
import { NgtSobaOrbitControlsModule } from '@angular-three/soba/controls';
import { NgtSobaStarsModule } from '@angular-three/soba/staging';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CanvasContentComponent } from './canvas-content/canvas-content.component';
import { GeneratedObjectsComponent } from './canvas-content/generated-objects/generated-objects.component';
import { OriginIndicatorsComponent } from './canvas-content/origin-indicators/origin-indicators.component';
import { MainCanvasComponent } from './main-canvas.component';

@NgModule({
  declarations: [
    MainCanvasComponent,
    CanvasContentComponent,
    GeneratedObjectsComponent,
    OriginIndicatorsComponent
  ],
  exports: [
    MainCanvasComponent,
    CanvasContentComponent,
    GeneratedObjectsComponent,
    OriginIndicatorsComponent
  ],
  imports: [
    CommonModule,
//
    NgtCoreModule,
    NgtStatsModule,
    NgtColorPipeModule,
    NgtFogPipeModule,
//
    NgtMeshModule,
//
    NgtBoxGeometryModule,
    NgtConeGeometryModule,
//
    NgtAmbientLightModule,
    NgtHemisphereLightModule,
    NgtDirectionalLightModule,
//
    NgtBoxHelperModule,
    NgtGridHelperModule,
//
    NgtMeshBasicMaterialModule,
    NgtMeshPhongMaterialModule,
    NgtLineBasicMaterialModule,
    NgtMeshPhysicalMaterialModule,
    NgtMeshStandardMaterialModule,
//
    NgtSobaStarsModule,
//
    NgtSobaOrbitControlsModule,
//
    NgtCircleGeometryModule,
    NgtSphereGeometryModule,
    NgtLineDashedMaterialModule,
    NgtRadianPipeModule,
    NgtInstancedMeshModule,
    NgtTetrahedronGeometryModule,
    NgtMeshLambertMaterialModule,
    NgtCursorModule,
    //
    NgtEffectComposerModule,
    NgtBloomModule,
    NgtEdgesGeometryModule
    //
  ]
})
export class MainCanvasModule {}
