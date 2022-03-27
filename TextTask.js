/* eslint-disable linebreak-style */
import Task from './Task';

export default class TextTask extends Task {
  constructor(data) {
    super(data);
    this.content = data.content;
    this.type = 'message';
  }

  createMarkup() {
    return `
      <div class="task task-block text-block ${this.getSpecialsClasses()}"
        data-id="${this.id}" 
        data-task-type="${this.type}">
        <div class="task_block_header">
          <div class="header_status_box">
            <span class="icon header_status pinned_icon"></span>
            <span class="icon header_status favorite_icon"></span>
          </div>
          <div class="header_controls_box">
            <span class="icon visibility_icon to-visible"></span>
            <span class="icon header_controls edit_icon"></span>
            <span class="icon header_controls del_icon"></span>              
          </div>
        </div>
        <div class="task_block_main">
          <div class="text-content">${this.content}</div>         
        </div>
        
        <div class="task_block_footer">
          <div class="footer_coords_box">
            <span class="coords_field">[${this.getCoordsString()}]</span>
          </div>
          <div class="footer_time_box">
            ${this.getDate()}
          </div>
        </div>
      </div>
    `;
  }

  createInfoMarkup() {
    return `
      <div class="task info_task-block info_text-block"
        data-id="${this.id}" 
        data-task-type="${this.type}">
        <div class="info_task_block_header">
          ${this.getType(this)}
        </div>
        <div class="info_task_block_main">
          <div class="text-content">${this.content}</div>         
        </div>
        
        <div class="task_block_footer info_task_block_footer">
          <div class="footer_coords_box">
            <span class="coords_field">[${this.getCoordsString()}]</span>
          </div>
          <div class="footer_time_box">
            ${this.getDate()}
          </div>
        </div>
      </div>
    `;
  }
}
