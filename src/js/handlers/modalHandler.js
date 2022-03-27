/* eslint-disable linebreak-style */
import {
  delTaskFromState,
  updateStates,
} from '../functions/functions';
import { updOnAction } from '../functions/fileManagerFunctions';

export default function modalHandler(event) {
  event.preventDefault();
  const { target, target: { classList } } = event;
  const { type } = target.closest('.modal-wrapper').dataset;
  const modal = this.modals[type];

  if (type === 'geoModal') return;
  if (!classList.contains('modal-btn')) return;

  if (classList.contains('cancel-btn')) {
    modal.hide();
    return;
  }

  if (type === 'delModal') {
    const { id } = this.taskUnderAction.dataset;
    const deletingTask = this.state.tasks.find((task) => task.id === id);

    updOnAction('deleteTask',
      document.querySelector('.file_manager'),
      deletingTask);

    modal.hide();
    this.taskUnderAction.remove();
    this.taskUnderAction = null;

    delTaskFromState(this.state, id);
    updateStates(this, 'deleteTask', { id });
    return;
  }

  if (type === 'editModal') {
    const { id } = this.taskUnderAction.dataset;
    modal.setValuesToDOM(this.taskUnderAction);
    const editedTask = this.state.tasks.find((task) => task.id === id);
    modal.setValuesToTask(editedTask);
    modal.hide();
    updateStates(this, 'editTask', { task: editedTask, id });
    this.taskUnderAction = null;
    return;
  }

  if (classList.contains('cancel-record-btn')) {
    this.mediaRecorder.stopRecord();
    return;
  }

  if (classList.contains('save-record-btn')) {
    this.mediaRecorder.addStopListener();
    this.mediaRecorder.stopRecord();
  }
}
