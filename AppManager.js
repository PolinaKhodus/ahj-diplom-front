/* eslint-disable linebreak-style */
import GeoAddModal from './modals/GeoAddModal';
import DeleteModal from './modals/DeleteModal';
import EditModal from './modals/EditModal';
import ErrorModal from './modals/ErrorModal';
import RecordModal from './modals/RecordModal';
import eventHandlers from './handlers/eventHandlers';
import { getTaskById, getPinnedType } from './functions/functions';
import { MediaStreamRecorder } from './functions/mediaStream';

export default class AppManager {
  constructor(url) {
    this.url = url;
    this.container = document.querySelector('.workspace_wrapper');

    this.state = {
      tasks: [],
      conditions: { geo: false, pinnedTask: null, lastChange: null },
      info: [],
    };

    this.geoAllowedStatus = true;
    this.creatingTask = null;
    this.taskUnderAction = null;
  }

  init() {
    this.initModals();
    this.initElements();
    this.initWSConnection();
    this.initHandlers();
    this.registerEvents();
    this.mediaRecorder = new MediaStreamRecorder(this);
  }

  initElements() {
    this.inputEl = document.querySelector('.input_panel');
    this.footerSticks = document.querySelectorAll('footer .icon');
    this.tasksBoxEl = document.querySelector('.main-container_content');
    this.forms = document.querySelectorAll('.form-modal');
    this.uploadEl = document.querySelector('.upload_input');
    this.dragableEl = document.querySelector('.draggable_area');
    this.mngAsideEl = document.querySelector('.media_status_aside');
    this.ctrlAsideEl = document.querySelector('.info_aside');
    this.pinnedMessage = document.querySelector('.pinned_message');
  }

  initModals() {
    this.modals = {
      geoModal: new GeoAddModal(),
      delModal: new DeleteModal(),
      editModal: new EditModal(),
      errModal: new ErrorModal(),
      recordModal: new RecordModal(),
    };
  }

  initWSConnection() {
    this.ws = new WebSocket(this.url);
    this.ws.binaryType = 'blob';
    this.registerSocketEvents();
  }

  initHandlers() {
    this.handlers = {
      wsHandler: new eventHandlers.WSEventsHandler(this),
    };
  }

  registerEvents() {
    document.addEventListener('DOMContentLoaded', () => {
      eventHandlers.onLoadHandler.call(this);
    });

    document.addEventListener('dragover', (event) => {
      eventHandlers.dragAndDropHandler.call(this, event);
    });

    document.addEventListener('dragleave', (event) => {
      eventHandlers.dragAndDropHandler.call(this, event);
    });

    this.dragableEl.addEventListener('drop', (event) => {
      eventHandlers.dragAndDropHandler.call(this, event);
    });

    this.inputEl.addEventListener('keydown', (event) => {
      eventHandlers.inputHandler.call(this, event);
    });

    this.inputEl.addEventListener('input', (event) => {
      eventHandlers.inputHandler.call(this, event);
    });

    this.uploadEl.addEventListener('change', (event) => {
      eventHandlers.inputHandler.call(this, event);
    });

    this.footerSticks.forEach((stick) => {
      stick.addEventListener('click', (event) => {
        eventHandlers.onStickClickHandler.call(this, event);
      });
    });

    this.forms.forEach((form) => {
      form.addEventListener('click', (event) => {
        eventHandlers.modalHandler.call(this, event);
      });
    });

    this.tasksBoxEl.addEventListener('click', (event) => {
      eventHandlers.taskHandler.call(this, event);
    });

    this.pinnedMessage.addEventListener('click', (event) => {
      eventHandlers.taskHandler.call(this, event);
    });

    this.tasksBoxEl.addEventListener('scroll', () => {
      eventHandlers.scrollHandler.call(this);
    });

    this.mngAsideEl.addEventListener('click', (event) => {
      eventHandlers.asideHandler.call(this, event);
    });

    this.ctrlAsideEl.addEventListener('click', (event) => {
      eventHandlers.asideHandler.call(this, event);
    });
  }

  registerSocketEvents() {
    this.ws.addEventListener('open', () => {
      this.handlers.wsHandler.onWSOpen(this);
    });

    this.ws.addEventListener('close', () => {
      this.handlers.wsHandler.onWSClose(this);
    });

    this.ws.addEventListener('message', (event) => {
      this.handlers.wsHandler.onWSMessage(this, event);
    });
  }

  getModal(modalName) {
    return this.modals[modalName];
  }

  hidePinnedMessage() {
    this.pinnedMessage.classList.add('hidden');
    this.state.conditions.pinnedTask = null;
  }

  showPinnedMessage(id) {
    const pinnedTask = getTaskById(this.state, id);
    const pinnedElement = document.querySelector(`[data-id="${id}"]`);

    pinnedTask.isPinned = true;
    this.pinnedMessage.classList.remove('hidden');
    this.pinnedMessage.style.top = `${this.tasksBoxEl.scrollTop}px`;
    pinnedElement.classList.add('is-pinned', 'hidden');

    this.pinnedMessage.querySelector('.pinned_info_box_type')
      .textContent = getPinnedType(pinnedTask);

    this.state.conditions.pinnedTask = id;
    this.taskUnderAction = null;
  }

  showPinnedTask() {
    const pinnedId = this.state.conditions.pinnedTask;
    const pinnedTaskIdx = this.state.tasks.findIndex((task) => task.id === pinnedId);
    const lastIndex = this.state.tasks.length - 1;
    const pinnedElement = document.querySelector('.is-pinned');
    const pinnedTask = this.state.tasks.find(({ isPinned }) => isPinned);

    if (pinnedTaskIdx < lastIndex) {
      const nextTaskId = this.state.tasks[pinnedTaskIdx + 1].id;
      const nextElement = document.querySelector(`[data-id="${nextTaskId}"]`);
      nextElement.insertAdjacentElement('beforebegin', pinnedElement);
    } else if (!lastIndex) {
      this.tasksBoxEl.insertAdjacentElement('beforebegin', pinnedElement);
    } else {
      const prevTaskId = this.state.tasks[pinnedTaskIdx - 1].id;
      const prevElement = document.querySelector(`[data-id="${prevTaskId}"]`);
      prevElement.insertAdjacentElement('afterend', pinnedElement);
    }

    pinnedElement.classList.remove('hidden', 'is-pinned');
    pinnedElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
    pinnedTask.switchPinned();
  }

  infoClose() {
    this.ctrlAsideEl.lastElementChild.innerHTML = '';
    this.ctrlAsideEl.classList.add('hidden');
    this.state.info = [];
  }

  getLocalStorage() {
    return JSON.parse(localStorage.getItem('chaos'));
  }
}
