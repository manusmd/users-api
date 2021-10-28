import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

const users = [
  { name: 'Leon', username: 'leon9000', password: '123' },
  { name: 'Dennis', username: 'dennis134', password: 'isafruh' },
  { name: 'David', username: 'david245', password: 'sr6f84' },
  { name: 'Hendrik', username: 'hendrik246', password: 'wsroguh' },
  { name: 'Anke', username: 'anke9657', password: 'aeofynij' },
];

app.get('/api/me', (request, response) => {
  //const cookie = request.headers.cookie;
  const username = request.cookies.username;
  const foundUser = users.find((user) => user.username === username);
  if (foundUser) {
    response.send(foundUser);
  } else {
    response.status(404).send('User not found');
  }
});

app.post('/api/login', (request, response) => {
  const loginUser = request.body;
  const user = users.find(
    (user) =>
      user.username === loginUser.username &&
      user.password === loginUser.password
  );
  if (user) {
    response.setHeader('Set-Cookie', `username=${user.username}`);
    response.status(202).send('User can login');
  } else {
    response.status(401).send('Check username and password');
  }
});

app.post('/api/users', (request, response) => {
  const newUser = request.body;
  if (
    typeof newUser.name !== 'string' ||
    typeof newUser.username !== 'string' ||
    typeof newUser.password !== 'string'
  ) {
    response.status(400).send('Missing properties');
    return;
  }
  if (users.some((user) => user.username === newUser.username)) {
    response
      .status(409)
      .send(`There is already someone called ${newUser.name}`);
  } else {
    users.push(newUser);
    response.send(`${newUser.name} was added!`);
  }
});

app.delete('/api/users/:username', (request, response) => {
  const user = users.find((user) => user.username === request.params.username);
  if (user) {
    const index = users.findIndex(
      (user) => user.username === request.params.username
    );
    users.splice(index, 1);
    response.send(`${request.params.username} deleted`);
  } else {
    response.send(`There is no one called ${request.params.username}`);
  }
});

app.get('/api/users/:username', (request, response) => {
  const user = users.find((user) => user.username === request.params.username);
  if (user) {
    response.send(user);
  } else {
    response.status(404).send('Not found');
  }
});

app.get('/api/users', (_request, response) => {
  response.send(users);
});

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
