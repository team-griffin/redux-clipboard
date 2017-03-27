import { Container } from 'inversify';
import { helpers } from 'inversify-vanillajs-helpers';

const container = new Container();
const register = helpers.register(container);

export {
  container,
  register,
};