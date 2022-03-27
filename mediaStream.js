/* eslint-disable linebreak-style */
import moment from 'moment';
import tasksTypes from '../tasks/tasksTypes';
import { newTaskStream$ } from './newTaskFunctions';
import { createRecordTask } from './functions';

export class Timer {
  constructor(container) {
    this.container = container;
    this.minutes = 0;
    this.seconds = 0;
    this.intervalId = null;
  }

  start() {
    this.intervalId = setInterval(() => {
      this.seconds += 1;

      if (this.seconds === 60) {
        this.minutes += 1;
        this.seconds = 0;
      }

      this.redrawTimer();
    }, 1000);
  }

  redrawTimer() {
    const minStr = this.minutes >= 10 ? `${this.minutes}` : `0${this.minutes}`;
    const secStr = this.seconds >= 10 ? `${this.seconds}` : `0${this.seconds}`;
    this.container.textContent = `${minStr}:${secStr}`;
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.minutes = 0;
    this.seconds = 0;
    this.redrawTimer();
  }
}

export class MediaStreamRecorder {
  constructor(manager) {
    this.manager = manager;
    this.timer = new Timer(document.querySelector('.timer'));
    this.chunks = [];
    this.stream = null;
    this.recorder = null;
    this.videoEL = document.querySelector('.video_box');
    this.type = null;
  }

  recordStream(type, modal) {
    return (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: type === 'video',
        });

        const recorder = new MediaRecorder(stream);

        recorder.addEventListener('start', () => {
          this.stream = stream;
          this.recorder = recorder;
          this.timer.start();
          this.type = type;
          modal.show();

          if (type === 'video') {
            this.videoEL.classList.remove('hidden');
            this.videoEL.srcObject = stream;
            this.videoEL.play();
          }
        });

        recorder.addEventListener('dataavailable', (event) => {
          this.chunks.push(event.data);
        });

        return recorder;
      } catch {
        throw new Error(`Нет доступа к ${type} устройству!`);
      }
    })();
  }

  addStopListener() {
    this.recorder.addEventListener('stop', () => {
      const blob = new Blob(this.chunks);
      const src = URL.createObjectURL(blob);

      if (this.type === 'video') {
        this.videoEL.srcObject = null;
        this.videoEL.classList.add('hidden');
      }

      const stream$ = newTaskStream$(this.manager).subscribe((data) => {
        if (data === 'Invalid coords') {
          this.manager.getModal('geoModal').showError('Вы ввели неправильные координаты!');
          return;
        }

        const date = moment().format('YYDDMMHHmm');
        const ext = this.type === 'audio' ? 'wav' : 'ogg';
        const name = `${this.type}_record_${date}.${ext}`;
        const coords = data;
        const type = `${this.type}_record`;

        createRecordTask(this.manager, tasksTypes[type], { src, name, coords });
        stream$.unsubscribe();
        URL.revokeObjectURL(blob);
        this.type = null;
      });
    });
  }

  cleanStream() {
    this.stream.getTracks().forEach((track) => track.stop());
    this.recorder = null;
    this.stream = null;
    this.chunks = [];
  }

  stopRecord() {
    this.recorder.stop();
    this.cleanStream();
    this.timer.stop();
    this.manager.getModal('recordModal').hide();
  }
}
