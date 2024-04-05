import { htmlWithUser } from './utils/renderUtils.js';

const showMain = async (c) => {
  return await htmlWithUser(c, 'main.eta');
};

export { showMain };
