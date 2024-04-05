import { Hono } from './deps.js';
import { postgres } from './deps.js';
import * as authController from './authController.js';
import * as todoController from './todoController.js';
import * as mainController from './mainController.js';
import * as middlewares from './middlewares.js';

const app = new Hono();
const sql = postgres();

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

app.get('/', mainController.showMain);

export default app;
