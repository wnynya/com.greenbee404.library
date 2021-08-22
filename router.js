const router = require('express').Router();

const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

router.get('/how-to-be-a-detective', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/book-detective.html'));
});

router.get('/web-prison', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/book-web-prison.html'));
});

router.get('/taste-of-x', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/book-taste-of-x.html'));
});

router.get('/censura-librorum', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/book-censura-librorum.html'));
});

router.get('/the-things-that-make-lyric-poetry-summer', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/book-the-things-that-make-lyric-poetry-summer.html'));
});

router.get('/the-things-that-make-lyric-poetry-winter', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/book-the-things-that-make-lyric-poetry-winter.html'));
});

module.exports = router;