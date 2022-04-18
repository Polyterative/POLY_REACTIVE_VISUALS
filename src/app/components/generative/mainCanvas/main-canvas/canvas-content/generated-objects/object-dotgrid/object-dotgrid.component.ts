import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Models } from '../Models';

@Component({
  selector: 'app-object-dotgrid',
  templateUrl: './object-dotgrid.component.html',
  styleUrls: ['./object-dotgrid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectDotgridComponent implements OnInit {

  @Input() item!: Models.PositionedObject

  constructor() { }

  ngOnInit(): void {
    // randomize width and height
    // this.item.position.set(
    //   Math.random() * this.item.dimensions.x,
    //   Math.random() * this.item.dimensions.y,
    //   Math.random() * this.item.dimensions.z
    // )
  }

}
