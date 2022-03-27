/* eslint-disable linebreak-style */
import { tasksTypes } from '../tasks/tasksTypes';
import {
  createUploadTask,
  createTextTask,
  parseInputContent,
  updateStates,
} from '../functions/functions';
import { newTaskStream$ } from '../functions/newTaskFunctions';

export default function inputHandler(event) {
  const { target, type, currentTarget } = event;
  const { classList } = target;

  if (type === 'input') {
    const sendBtn = document.querySelector('.send_icon');
    const canSand = sendBtn.classList.contains('active');

    if (currentTarget.value.trim() && !canSand) {
      sendBtn.classList.add('active');
      return;
    }

    if (!currentTarget.value.trim() && canSand) {
      sendBtn.classList.remove('active');
    }
    return;
  }

  if ((!event.shiftKey && !event.ctrlKey) && event.key === 'Enter') {
    event.preventDefault();
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
  }

  if (classList.contains('upload_input')) {
    const file = event.target.files[0];

    const stream$ = newTaskStream$(this).subscribe((data) => {
      if (data === 'Invalid coords') {
        this.getModal('geoModal').showError('Вы ввели неправильные координаты!');
        return;
      }

      createUploadTask(this, file, data);
      stream$.unsubscribe();
    });
  }
}
