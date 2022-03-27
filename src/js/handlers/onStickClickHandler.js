/* eslint-disable linebreak-style */
import tasksTypes from '../tasks/tasksTypes';
import {
  createTextTask,
  parseInputContent,
  updateStates,
  showErrorBox,
} from '../functions/functions';
import { newTaskStream$ } from '../functions/newTaskFunctions';

export default function onStickClickHandler(event) {
  const { target, target: { classList } } = event;

  if (classList.contains('geo_icon')) {
    classList.toggle('geo_true');
    this.state.conditions.geo = !this.state.conditions.geo;
    updateStates(this, 'switchGeo');
    return;
  }

  if (classList.contains('upload_icon')) {
    this.uploadEl.dispatchEvent(new MouseEvent('click'));
    return;
  }

  if (classList.contains('send_icon')) {
    const message = this.inputEl.value;

    if (!message.trim()) {
      return;
    }

    const Task = tasksTypes.message;
    const content = parseInputContent(message);

    const stream$ = newTaskStream$(this).subscribe((data) => {
      if (data === 'Invalid coords') {
        this.getModal('geoModal').showError('Вы ввели неправильные координаты!');
        return;
      }

      createTextTask(this, Task, { content, coords: data });
      updateStates(this, 'newTask', this.creatingTask);
      this.creatingTask = null;
      document.querySelector('.send_icon').classList.remove('active');
      stream$.unsubscribe();
    });
    return;
  }

  if (classList.contains('geo_send_icon')) {
    if (!this.state.conditions.geo) {
      showErrorBox('Разрешите вывод координат!');
    }

    newTaskStream$(this).subscribe((data) => {
      if (data === 'Invalid coords') {
        this.getModal('geoModal').showError('Вы ввели неправильные координаты!');
        return;
      }

      if (!data) return;

      createTextTask(this, tasksTypes.coords, { coords: data });
      updateStates(this, 'newTask', this.creatingTask);
      this.creatingTask = null;

      classList.add('blocked');
      const interval = setTimeout(() => {
        classList.remove('blocked');
        clearTimeout(interval);
      }, 1000);
    });
  }

  if (classList.contains('audio_icon') || classList.contains('video_icon')) {
    const type = target.className.includes('audio') ? 'audio' : 'video';

    this.mediaRecorder.recordStream(type, this.modals.recordModal)
      .then((recorder) => {
        recorder.start();
      })
      .catch((err) => {
        this.modals.errModal.setMessage(err.message);
        this.modals.errModal.show();
      });
  }
}
