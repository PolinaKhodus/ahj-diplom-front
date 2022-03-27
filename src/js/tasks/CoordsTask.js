/* eslint-disable linebreak-style */
import Task from './Task';

export default class CoordsTask extends Task {
  constructor(data) {
    super(data);
    this.type = 'coords';
  }

  createMarkup() {
    return `
      <div class="task task-block coords-block ${this.getSpecialsClasses()}"
        data-id="${this.id}" 
        data-task-type="${this.type}">
        <div class="task_block_header">
          <div class="header_status_box">
            <span class="icon header_status pinned_icon"></span>
            <span class="icon header_status favorite_icon"></span>
          </div>
          <div class="header_controls_box">
            <span class="icon header_controls del_icon"></span>              
          </div>
        </div>
        <div class="task_block_main">
          <div class=coords_preview_box></div>
          <div class="coords_main_box">
            <div class="coords_title">Мое местоположение:</div>
            <div class="coords_text-content">${this.formatCoordsToLink(this.coords)}</div>
          </div>                   
        </div>
        
        <div class="task_block_footer">
          <div class="footer_coords_box">
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
      <div class="task info_task-block info_coords-block"
        data-id="${this.id}" 
        data-task-type="${this.type}">
        <div class="info_task_block_header">
          ${this.getType(this)}
        </div>
        <div class="info_task_block_main">
          <div class=coords_preview_box></div>
          <div class="coords_main_box">
            <div class="coords_text-content">${this.formatCoordsToLink(this.coords)}</div>
          </div>         
        </div>
        
        <div class="task_block_footer info_task_block_footer">
          <div class="footer_coords_box">
          </div>
          <div class="footer_time_box">
            ${this.getDate()}
          </div>
        </div>
      </div>
    `;
  }

  formatCoordsToLink(coords) {
    const lat = coords.latitude.toFixed(4);
    const long = coords.longitude.toFixed(4);
    const dom = 'https://yandex.ru/maps/';
    const href = `${dom}?ll=${long}%2C${lat}&mode=search&sll=${long}%2${lat}
                  &text=${lat}%2C${long}&utm_source=main_stripe_big&z=14`;

    return `
      <a href="${href}" class="coords_link" target="_blank">
        ${lat}, ${long}
      </a>
    `;
  }
}
