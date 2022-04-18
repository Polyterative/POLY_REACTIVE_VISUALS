import { Vector3 } from 'three';

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

  export interface PositionedObject {
    position: Vector3;
    rotation: Vector3;
    dimensions: Vector3;
    type: ObjectType;
  }

  export enum ObjectTypes {
    FLAT_CIRCLE = 'flat-circle',
    DOTGRID = 'dotgrid',
  }

  export type ObjectType = `${ ObjectTypes }`;

}
