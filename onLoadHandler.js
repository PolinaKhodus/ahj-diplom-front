/* eslint-disable linebreak-style */
export default function onLoadHandler() {
  const geo = document.querySelector('.geo_access_icon');
  const devices = document.querySelector('.devices_icon');
  const audioBtn = document.querySelector('.audio_icon');
  const videoBtn = document.querySelector('.video_icon');

  if (!navigator.mediaDevices || !window.MediaRecorder) {
    devices.classList.add('disabled_devices');
    devices.nextElementSibling.textContent = 'Record not supported';
    audioBtn.classList.add('blocked');
    videoBtn.classList.add('blocked');
  }

  if (!navigator.geolocation) {
    this.geoAllowedStatus = false;
    geo.nextElementSibling.textContent = 'Not supported geolocotion';
    document.querySelector('.geo_send_icon').classList.add('blocked');
    return;
  }

  geo.classList.remove('disabled_geo');

  navigator.geolocation.getCurrentPosition(
    () => {
      geo.classList.add('switch-on');
      geo.nextElementSibling.textContent = 'Switched on';
    },
    () => {
      geo.classList.add('switch-off');
      geo.nextElementSibling.textContent = 'Switched off';
    },
  );
}
