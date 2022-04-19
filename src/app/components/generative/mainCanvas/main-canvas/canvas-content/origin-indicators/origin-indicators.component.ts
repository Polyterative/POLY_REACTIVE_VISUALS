import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Vector3 } from 'three';

@Component({
  selector: 'app-origin-indicators',
  templateUrl: './origin-indicators.component.html',
  styleUrls: ['./origin-indicators.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OriginIndicatorsComponent implements OnInit {

  scale = new Vector3(.1, .1, .1);

  constructor() { }

  ngOnInit(): void {
  }

}
