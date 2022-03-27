/* eslint-disable linebreak-style */
import TextTask from './TextTask';
import ImageTask from './ImageTask';
import AudioTask from './AudioTask';
import VideoTask from './VideoTask';
import FileTask from './FileTask';
import CoordsTask from './CoordsTask';
import AudioRecordTask from './AudioRecordTask';
import VideoRecordTask from './VideoRecordTask';

export const tasksTypes = {
  message: TextTask,
  coords: CoordsTask,
  image: ImageTask,
  video: VideoTask,
  audio: AudioTask,
  audio_record: AudioRecordTask,
  video_record: VideoRecordTask,
  application: FileTask,
  file: FileTask,
};

export default tasksTypes;
