import { Eta } from '../deps.js';

const eta = new Eta({ views: `${Deno.cwd()}/templates/`, cache: true });

export { eta };
