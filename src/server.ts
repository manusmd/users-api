import express from 'express';

const app = express();
const port = 3000;

app.get('/api/users/:name', (request, response) => {
  response.send(request.params);
});

app.get('/api/users', (_request, response) => {
  const users = [{ name: 'Leon' }, { name: 'Dennis' }, { name: 'David' }];
  response.send(users);
});

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
