const express = require('express');
const cors = require('cors');
const { port } = require('./config');

const app = express();

const authRoute = require('./routes/v1/AuthRoute');
const profileRoute = require('./routes/v1/ProfileRoute');
const lecturesRoute = require('./routes/v1/LecturesRoute');
const likeRoute = require('./routes/v1/LikeRoute');

//middleware
app.use(express.json());
app.use(cors());

//HTTP request handlers
app.get('/ping', (req, res) => {
  res.send({ msg: 'Server is running' });
});

app.use('/v1/auth', authRoute);
app.use('/v1/profile', profileRoute);
app.use('/v1/lectures', lecturesRoute);
app.use('/v1/like', likeRoute);

app.all('*', (req, res) => {
  res.status(404).send({ error: 'Page not found' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
