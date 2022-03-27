/* eslint-disable linebreak-style */
import {
  createUploadTask,
} from '../functions/functions';
import { newTaskStream$ } from '../functions/newTaskFunctions';

export default function dragAndDropHandlers(event) {
  const { type } = event;
  event.preventDefault();

  if (type === 'dragover') {
    this.dragableEl.parentElement.classList.remove('hidden');
    return;
  }

  if (type === 'dragleave' && event.screenX === 0) {
    this.dragableEl.parentElement.classList.add('hidden');
    return;
  }

  if (type === 'drop') {
    event.preventDefault();
    this.dragableEl.parentElement.classList.add('hidden');

    const file = event.dataTransfer.files[0];

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
