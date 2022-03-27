/* eslint-disable linebreak-style */
import Modal from './Modal';

export default class DeleteModal extends Modal {
  constructor(type = 'delModal') {
    super(type);
  }

  createMarkup() {
    return `
      <div class="modal modal-wrapper hidden"  data-type="delModal">
        <form class="form-modal del-form-modal" data-type="delModal" novalidate>
          <div class="form-title">Удаление контента</div>
          <p class="message-content">
            Вы действительно хотите удалить данный блок?
            Это действие необратимо!
          </p>
          
          <div class="modal-btn-row modal-row">
            <button class="modal-btn ok-btn">Apply</button>
            <button class="modal-btn cancel-btn">Cancel</button>            
          </div>    
        </form>
      </div>
    `;
  }
}
