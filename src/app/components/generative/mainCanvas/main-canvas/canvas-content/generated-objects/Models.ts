import { Vector3 } from 'three';
import { LifetimeManager } from './LifetimeManager';
import { MovementManager } from './MovementManager';

export namespace Models {

  // export interface Position {
  //   x: number;
  //   y: number;
  //   z: number;
  // }
  //
  // export interface Rotation {
  //   x: number;
  //   y: number;
  //   z: number;
  // }

  export class PositionData {
    constructor(
      public position: Vector3 = new Vector3(0, 0, 0),
      public rotation: Vector3 = new Vector3(0, 0, 0),
      public scale: Vector3 = new Vector3(1, 1, 1)
    ) {
    }
  }

  export class ThreeEntity {
    constructor(
      public type: ObjectType,
      public lifetimeManager: LifetimeManager,
      public movementManager: MovementManager
    ) {

    }
  }

  export class Point {
    public current: PositionData = new PositionData()

    constructor(public original: PositionData = new PositionData()) {

      this.current.position.copy(original.position);
      this.current.rotation.copy(original.rotation);
      this.current.scale.copy(original.scale);
    }

  }

  export enum ObjectTypes {
    FLAT_CIRCLE = 'flat-circle',
    DOTGRID = 'dotgrid',
    BOX = 'box',
  }

  export type ObjectType = `${ ObjectTypes }`;

}
