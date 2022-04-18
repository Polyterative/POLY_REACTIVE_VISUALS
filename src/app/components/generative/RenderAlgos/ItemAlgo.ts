import { BehaviorSubject } from 'rxjs';
import { Constants } from '../container/container.component';
import { RenderAlgoBase } from './RenderAlgoBase';

export class ItemAlgo extends RenderAlgoBase {

  constructor(
    protected override currentTime$: BehaviorSubject<number>,
    protected override constants: Constants
  ) {
    super(
      currentTime$,
      constants
    );
  }

}
