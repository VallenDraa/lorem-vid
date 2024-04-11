const searchVideoForm = document.getElementById('search-video-form');
const searchVideoInput = document.getElementById('search-video-input');
const videoPlayer = document.getElementById('video-player');

searchVideoForm.addEventListener('submit', e => {
  e.preventDefault();

  const value = searchVideoInput.value.trim();

  videoPlayer.src = value ? `/videos?search=${value}` : '/videos';
});
