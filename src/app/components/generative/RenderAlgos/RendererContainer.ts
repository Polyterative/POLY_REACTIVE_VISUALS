import { BehaviorSubject } from 'rxjs';
import { Constants } from '../container/container.component';
import { DotGridAlgo } from './DotGridAlgo';
import { ItemAlgo } from './ItemAlgo';

export class RendererContainer {
  public readonly dotGridAlgo: DotGridAlgo = new DotGridAlgo(this.currentTime$, this.constants);
  public readonly itemAlgo: ItemAlgo = new ItemAlgo(this.currentTime$, this.constants);

  constructor(private currentTime$: BehaviorSubject<number>, private constants: Constants) {

  }
}
