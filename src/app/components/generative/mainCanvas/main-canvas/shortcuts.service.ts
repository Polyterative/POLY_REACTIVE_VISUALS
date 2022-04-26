import { Injectable } from '@angular/core';
import { ShortcutInput } from 'ng-keyboard-shortcuts';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShortcutsService {
  readonly states = {
    showFps: new BehaviorSubject<boolean>(true),
    showStars: new BehaviorSubject<boolean>(false),
    variable1: new BehaviorSubject<boolean>(false)
  }
  readonly shortcuts: ShortcutInput[] = [
    {
      key: 'f',
      command: () => {
        this.states.showFps.next(!this.states.showFps.value);
      }
    },
    {
      key: 's',
      command: () => {
        this.states.showStars.next(!this.states.showStars.value);
      }
    },
    {
      key: '1',
      command: () => {
        this.states.variable1.next(!this.states.variable1.value);
      }
    }
  ];

  constructor(
    // protected snackbar: MatSnackbar
  ) { }
}
