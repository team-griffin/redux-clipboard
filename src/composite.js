import * as messages from './messages';
import * as signals from './signals';
import * as utils from './utils';
import * as epics from './epics';

export default () => {
  const api = {
    messages,
    signals,
    utils,
    epics,
  };

  api.utils.copyContent = api.utils.copyContent.bind(null, document);
  api.epics.copy = api.epics.copy.bind(
    null,
    api.utils.copyContent,
    api.messages.copySuccess,
    api.messages.copyFailure,
  );
  api.epics.default = api.epics.default.bind(null, api.epics.default);

  return api;
};