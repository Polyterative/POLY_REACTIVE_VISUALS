import { CanvasRecorder } from '@tawaship/canvas-recorder';
import { from, Subject, switchMap } from 'rxjs';

export class PolyCanvasRecorder {
  recording = false;

  private start$ = new Subject<void>();
  private stop$ = new Subject<void>();

  constructor(
    canvas: HTMLCanvasElement
  ) {

    let recorder: MediaRecorder;

    let recorderPromise: Promise<CanvasRecorder> = CanvasRecorder.createAsync(canvas, {
      framerate: 30
    });

    this.start$
      .pipe(
        switchMap(() => from(recorderPromise))
      )
      .subscribe((recorder) => {
        // @ts-ignore
        recorder.start();
        setTimeout(() => {
          recorder.finishAsync()
            .then(movie => {
              movie.download();
            });
        }, 10000);

      });

    this.stop$.subscribe(() => {
      this.recording = false;
      recorder.stop();

    });
  }

  start() {
    this.start$.next();
  }

  stop() {
    this.stop$.next();
  }
}
