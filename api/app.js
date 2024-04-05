import { Hono } from './deps.js';
import { postgres } from './deps.js';

const app = new Hono();
const sql = postgres();

app.get('/', async (c) => {
  // return an array of objects, where each object represents a row in the database
  const todos = await sql`SELECT * FROM todos`;
  // return to a json object
  return c.json(todos);
});

export default app;
