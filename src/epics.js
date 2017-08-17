import * as most from 'most';
import { select, combineEpics } from 'redux-most';
import r from 'ramda';

import * as signals from './signals';
import * as messages from './messages';

const mmapc = r.curryN(2, most.map);

export const _copyEpic = (
  copyContent,
  actions$
) => {
  return r.pipe(
    select(signals.COPY),
    mmapc((action) => {
      const {
        payload: {
          content,
        },
      } = action;

      if (copyContent(content) === true){
        return messages.copySuccess(content);
      }
      return messages.copyFailure();
    }),
  )(actions$);
};

export const rootEpic = (...epics) => combineEpics(epics);
