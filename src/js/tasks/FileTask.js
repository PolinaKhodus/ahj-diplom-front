/* eslint-disable linebreak-style */
import Task from './Task';

export default class FileTask extends Task {
  constructor(data) {
    super(data);
    this.src = data.src;
    this.name = data.name;
    this.type = 'file';
  }

  createMarkup() {
    return `
      <div class="task task-block file-block ${this.getSpecialsClasses()}" 
      data-id="${this.id}"
      data-task-type="file">
        <div class="task_block_header">
          <div class="header_status_box">
            <span class="icon header_status pinned_icon"></span>
            <span class="icon header_status favorite_icon"></span>
          </div>
          <div class="header_controls_box">
            <span class="icon visibility_icon to-visible"></span>
            <span class="icon header_controls download_icon"></span>  
            <span class="icon header_controls del_icon"></span>              
          </div>
        </div>
        <div class="task_block_main">
          <div class="preview_img"}"></div>
          <span class="file_name_box">${this.getFormattedName(this.name)}</span>
          <a href="${this.src}" class="download_link hidden" download="${this.name}"></a>         
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
}
