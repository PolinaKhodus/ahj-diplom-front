/* eslint-disable linebreak-style */
import {
  updateStates,
  createTextTask,
  scrollBoxUp,
  getPinnedType,
  getTaskById,
  delTaskFromState,
  createInfoTask,
} from '../functions/functions';
import { updFileMngr } from '../functions/fileManagerFunctions';
import taskTypes from '../tasks/tasksTypes';

export default class WSEventsHandler {
  constructor() {
    this.intervalId = null;
  }

  onWSOpen(manager) {
    this.clearInterval();

    document.querySelector('.connection_icon').classList.remove('offline');
    document.querySelector('.connection_icon~* ').textContent = 'Online';

    const { lastChange } = manager.state.conditions;
    updateStates(manager, 'getState', { lastChange });
  }

  onWSClose(manager) {
    manager.ws = null;

    document.querySelector('.connection_icon').classList.add('offline');
    document.querySelector('.connection_icon~* ').textContent = 'Offline';
    // this.restoreConnection();
  }

  onWSMessage(manager, event) {
    const { method, data } = JSON.parse(event.data);

    if (method === 'getState') {
      manager.state.conditions = data.state.conditions;
      const { tasks } = data.state;

      if (!data.state.conditions.geo) {
        document.querySelector('.geo_icon').classList.remove('geo_true');
      }

      tasks.forEach((task) => {
        const { type } = task;
        createTextTask(manager, taskTypes[type], task);
        scrollBoxUp(manager.tasksBoxEl);
        manager.creatingTask = null;
      });

      updFileMngr(data.types, document.querySelector('.file_manager'));
      const pinnedId = data.state.conditions.pinnedTask;

      data.state.info.forEach((task) => {
        createInfoTask(manager, taskTypes[task.type], task);
      });

      if (!pinnedId) return;

      manager.showPinnedMessage(pinnedId);
      const pinnedMessage = document.querySelector('.pinned_message');
      pinnedMessage.classList.remove('hidden');
      document.querySelector('.pinned_info_box_type')
        .textContent = getPinnedType(getTaskById(manager.state, pinnedId));

      /* localStorage.setItem('chaos', JSON.stringify(this.state)); */
      return;
    }

    if (method === 'scrollTasks') {
      const topTask = manager.state.tasks[0];

      const tasksToAdd = [topTask]
        .concat(data)
        .sort((a, b) => a.timestamp - b.timestamp);

      manager.state.tasks.shift(0);
      document.querySelector(`[data-id="${topTask.id}"]`).remove();

      tasksToAdd.reverse().forEach((task) => {
        const { type } = task;
        const newTask = new taskTypes[type](task);
        manager.state.tasks.unshift(newTask);
        const html = newTask.createMarkup();
        manager.tasksBoxEl.insertAdjacentHTML('afterbegin', html);
      });

      manager.tasksBoxEl.scrollTop = 20;
      return;
    }

    if (method === 'newTask') {
      manager.state.conditions.lastChange = data.newTask.timestamp;
      const { type } = data.newTask;
      createTextTask(manager, taskTypes[type], data.newTask);
      scrollBoxUp(manager.tasksBoxEl);
      return;
    }

    manager.state.conditions.lastChange = data.lastChange;

    if (method === 'deleteTask') {
      delTaskFromState(manager.state, data.id);
      document.querySelector(`[data-id="${data.id}"]`).remove();
      return;
    }

    if (method === 'switchGeo') {
      if (manager.state.conditions.geo) {
        manager.state.conditions.geo = false;
      } else {
        manager.state.conditions.geo = true;
      }

      document.querySelector('.geo_icon').classList.toggle('geo_true');
      return;
    }

    if (method === 'switchFavorite') {
      getTaskById(manager.state, data.id).switchFavorite();
      document.querySelector(`[data-id="${data.id}"]`).classList.toggle('is-favorite');
      return;
    }

    if (method === 'editTask') {
      getTaskById(manager.state, data.id).content = data.task.content;
      const editingContent = document.querySelector(`[data-id="${data.id}"] .text-content`);
      editingContent.innerHTML = data.task.content;
      return;
    }

    if (method === 'switchPinnedOn') {
      manager.state.conditions.pinnedTask = data.id;
      manager.showPinnedMessage(data.id);
      getTaskById(manager.state, data.id).isPinned = true;
      return;
    }

    if (method === 'switchPinnedOff') {
      manager.showPinnedTask();
      manager.hidePinnedMessage();
      manager.infoClose();
      return;
    }

    if (method === 'showInfoPanel') {
      data.forEach((id) => {
        const task = getTaskById(manager.state, id);
        createInfoTask(manager, taskTypes[task.type], task);
      });
      return;
    }

    if (method === 'closeInfoPanel') {
      manager.infoClose();
      return;
    }

    if (method === 'getFavorite') {
      data.favorites.forEach((task) => {
        createInfoTask(manager, taskTypes[task.type], task);
      });

      manager.ctrlAsideEl.classList.remove('hidden');
    }
  }

  restoreConnection() {
    this.intervalId = setInterval(() => {
      this.manager.initWSConnection();
    }, 60000);
  }

  clearInterval() {
    clearInterval(this.intervalId);
  }
}
