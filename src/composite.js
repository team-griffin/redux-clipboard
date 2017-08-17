import pat from 'partial-application-tree';
import * as messages from './messages';
import * as signals from './signals';
import * as utils from './utils';
import * as epics from './epics';

const external = {
  document,
};

export default () => pat([
  [ 'utils.copyContent', [ 'external.document' ] ],
  [ 'epics.copy', [ 'utils.copyContent' ] ],
  [ 'epics.rootEpic', [ 'epics.copy' ] ],
], {
  messages,
  signals,
  utils,
  epics,
  external,
});
