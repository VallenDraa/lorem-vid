import { load } from 'cheerio';

export const EMPTY_RESULT_VIDEO =
  'https://ak.picdn.net/shutterstock/videos/1072505354/preview/stock-footage-cool-minimalistic-animated-plate-with-error-found-error-conceptual-d-video-clip-shape.mp4';

export const SERVER_ERROR_VIDEO =
  'https://ak.picdn.net/shutterstock/videos/3409483343/preview/stock-footage-after-effects-must-have-keyframes-selected-from-one-layer-in-order-to-export-them-as-text.mp4';

export const getSourceURL = (query = '') => {
  const url = new URL('https://coverr.co/s');

  if (query) {
    url.searchParams.append('q', query);
  }

  return url.href;
};

export const getVideos = async (query = '') => {
  const url = getSourceURL(query);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Fail to get videos!');
  }

  const html = await response.text();

  const $ = load(html);
  const videoContainers = $('shutterstock-carousel shutterstock-video video')
    .toArray()
    .map(video => video.attribs.src);

  return videoContainers;
};

export const getRandomVideo = (videoLinks: string[]) => {
  const videosLength = videoLinks.length;

  if (videosLength === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * videosLength);
  return videoLinks[randomIndex];
};
