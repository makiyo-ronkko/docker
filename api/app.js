import { Hono } from './deps.js';
import { sql } from './config/database.js';
import * as authController from './authController.js';
import * as todoController from './todoController.js';
import * as mainController from './mainController.js';
import * as middlewares from './middlewares.js';

const app = new Hono();

// app.get('/', async (c) => {
//   // return an array of objects, where each object represents a row in the database
//   const todos = await sql`SELECT * FROM todos`;
//   // return to a json object
//   return c.json(todos);
// });

app.use('*', middlewares.addUserToContextMiddleware);
app.use('/todos/*', middlewares.accessControlMiddleware);

app.get('/auth/login', authController.showLoginForm);
app.post('/auth/login', authController.loginUser);
app.get('/auth/registration', authController.showRegistrationForm);
app.post('/auth/registration', authController.registerUser);
app.post('/auth/logout', authController.logoutUser);

app.get('/todos', todoController.showForm);
app.get('/todos/:id', todoController.showTodo);
app.post('/todos', todoController.createTodo);
app.post('/todos/:id', todoController.updateTodo);
app.post('/todos/:id/delete', todoController.deleteTodo);

app.get('/addresses', async (c) => {
  return c.json(await sql`SELECT * FROM addresses`);
});

app.post('/addresses', async (c) => {
  const body = await c.req.json();
  await sql`INSERT INTO addresses (name, address) VALUES (${body.name}, ${body.address})`;
  return c.json({ status: 'ok' });
});

app.get('/addresses/:id', async (c) => {
  const id = c.req.param('id');
  const rows = await sql`SELECT * FROM addresses WHERE id = ${id}`;
  if (rows.length === 0) {
    return c.json({ status: 'Not found' }, 404);
  }

  return c.json(rows[0]);
});

app.put('/addresses/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  await sql`UPDATE addresses SET name = ${body.name}, address = ${body.address} WHERE id = ${id}`;
  // here we assume that such an address exists -- could also check whether one exists
  return c.json({ status: 'ok' });
});

app.delete('/addresses/:id', async (c) => {
  const id = c.req.param('id');
  await sql`DELETE FROM addresses WHERE id = ${id}`;
  // here we assume that such an address exists -- could also check whether one exists
  return c.json({ status: 'ok' });
});

app.get('/', mainController.showMain);

export default app;
