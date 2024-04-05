import * as sessionService from '../sessionService.js';
import { eta } from '../config/etaConfig.js';

const htmlWithUser = async (c, viewTemplate, data) => {
  data = data || {};
  data.user = c.user;
  return c.html(eta.render(viewTemplate, data));
};

export { htmlWithUser };
