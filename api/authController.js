import { Eta } from './deps.js';
import { scrypt } from './deps.js';
import * as userService from './userService.js';
import * as sessionService from './sessionService.js';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const validator = z
  .object({
    password: z.string(),
    verification: z.string(),
  })
  .refine((data) => data.password === data.verification, {
    message: "Passwords don't match",
    path: ['confirm'], // path of error
  });

const showRegistrationForm = (c) => c.html(eta.render('registration.eta'));

const showLoginForm = (c) => c.html(eta.render('login.eta'));

const registerUser = async (c) => {
  const body = await c.req.parseBody();
  // The validation functionality would check that the provided email is valid
  // and that the provided password is non - empty.
  const validationResult = validator.safeParse(body);

  if (!validationResult.success) {
    const serverErrors = Object.fromEntries(
      validationResult.error?.issues?.map((issue) => [
        issue.path[0],
        issue.message,
      ]) || []
    );

    return c.html(
      eta.render('registration.eta', {
        ...body,
        error: serverErrors.confirm,
      })
    );
  }
  // if (body.password !== body.verification) {
  //   return c.text('The provided passwords did not match.');
  // }

  const existingUser = await userService.findUserByEmail(body.email);
  if (existingUser) {
    return c.text(`A user with the email ${body.email} already exists.`);
  }

  const user = {
    email: body.email,
    passwordHash: scrypt.hash(body.password),
  };

  await userService.createUser(user);

  return c.redirect('/');
};

const loginUser = async (c) => {
  // body: id, email, passwordHash
  const body = await c.req.parseBody();

  // user: eamil, password, verification
  const user = await userService.findUserByEmail(body.email);
  console.log(user);
  if (!user) {
    return c.text(`No user with the email ${body.email} exists.`);
  }

  const passwordsMatch = scrypt.verify(body.password, user.password_hash);
  if (!passwordsMatch) {
    return c.text(`Incorrect password.`);
  }

  await sessionService.createSession(c, user);

  return c.redirect('/');
};

const logoutUser = async (c) => {
  await sessionService.deleteSession(c);
  return c.redirect('/');
};

export {
  registerUser,
  showRegistrationForm,
  showLoginForm,
  loginUser,
  logoutUser,
};
