import { BehaviorSubject } from 'rxjs';
import { Constants } from '../container/container.component';

export abstract class RenderAlgoBase {

  constructor(
    protected currentTime$: BehaviorSubject<number>,
    protected constants: Constants
  ) {}
}
