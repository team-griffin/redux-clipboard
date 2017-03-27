import { container } from './inversify.config';
import tokens from './tokens';
import ClipboardEpics from './ClipboardEpics';

export default () => {
  container.bind(tokens.Document).toConstantValue(document);

  return container;
};