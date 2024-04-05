import * as sessionService from './sessionService.js';

const accessControlMiddleware = async (c, next) => {
  const authenticated = c.user;
  if (!authenticated) {
    return c.text('You have not authenticated!', 401);
  }

  await next();
};

const addUserToContextMiddleware = async (c, next) => {
  // add the user to the context, from which we can retrieve
  // the user and its id property
  c.user = await sessionService.getUserFromSession(c);
  await next();
};

export { accessControlMiddleware, addUserToContextMiddleware };
