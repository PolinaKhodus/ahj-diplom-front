/* eslint-disable linebreak-style */
import Task from './Task';

export default class VideoRecordTask extends Task {
  constructor(data) {
    super(data);
    this.src = data.src;
    this.name = data.name;
    this.type = 'audio_record';
  }

  createMarkup() {
    return `
      <div class="task task-block video_record-block ${this.getSpecialsClasses()}"
      data-id="${this.id}"
      data-task-type="video_record">
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
          <video class="video-block_preview_video" controls>
            <source src="${this.src}" type='video/ogg; codecs="theora, vorbis"'>
            <source src="${this.src}" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
            <source src="${this.src}" type='video/webm; codecs="vp8, vorbis"'>
            <source src="${this.src}" type='video/wmv; codecs="vp8, vorbis"'>
          </video>
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

  createInfoMarkup() {
    return `
      <div class="task info_task-block info_video_record-block"
        data-id="${this.id}" 
        data-task-type="${this.type}">
        <div class="info_task_block_header">
          ${this.getType(this)}
        </div>
        <div class="info_task_block_main">
          <div class="preview_box">
            <video class="info_video-block_preview_video" controls>
              <source src="${this.src}" type='video/ogg; codecs="theora, vorbis"'>
              <source src="${this.src}" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
              <source src="${this.src}" type='video/webm; codecs="vp8, vorbis"'>
              <source src="${this.src}" type='video/wmv; codecs="vp8, vorbis"'>
            </video>
          </div>
          <div>${this.name}</div>         
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
