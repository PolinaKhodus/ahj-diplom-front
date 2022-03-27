/* eslint-disable linebreak-style */
import { updateStates } from '../functions/functions';

export default function asideHandler(event) {
  const { target, target: { classList } } = event;

  if (classList.contains('control_task_header_icon')) {
    classList.toggle('down');
    target.closest('.control_task_header').nextElementSibling.classList.toggle('hidden');
    return;
  }

  if (classList.contains('info_panel_close_icon')) {
    this.infoClose();
    updateStates(this, 'closeInfoPanel');
    return;
  }

  if (classList.contains('favorite_filter_icon')) {
    if (this.state.info.length) return;

    updateStates(this, 'getFavorite');
  }
}
