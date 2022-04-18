import { BehaviorSubject } from 'rxjs';
import { Constants } from '../container/container.component';
import { Models } from '../container/models';
import { RenderAlgoBase } from './RenderAlgoBase';
import MyGenerator = Models.MyGenerator;

export interface DotGridGenerator extends MyGenerator {
  kind: 'dotgrid';
}

export class DotGridAlgo extends RenderAlgoBase {

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
