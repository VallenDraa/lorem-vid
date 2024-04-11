import path from 'path';
import express from 'express';

import {
  EMPTY_RESULT_VIDEO,
  getRandomVideo,
  getVideos,
  SERVER_ERROR_VIDEO,
} from './video';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));

app.get('/', (_req, res) => {
  return res.render('index');
});

app.get('/videos', async (req, res) => {
  const { search } = req.query as { search: string };

  try {
    const videos = await getVideos(search);
    const randomSelectedVideo = getRandomVideo(videos);

    return res.redirect(randomSelectedVideo || EMPTY_RESULT_VIDEO);
  } catch {
    return res.redirect(SERVER_ERROR_VIDEO);
  }
});

app.get('*', (req, res) => res.redirect(EMPTY_RESULT_VIDEO));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
