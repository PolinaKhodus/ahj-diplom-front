/* eslint-disable linebreak-style */
import {
  updateStates,
} from '../functions/functions';

export default function scrollHandler() {
  document.querySelector('.pinned_message').style.top = `${this.tasksBoxEl.scrollTop}px`;

  if (this.tasksBoxEl.scrollTop === 0) {
    updateStates(this, 'scrollTasks', {});
  }
}
