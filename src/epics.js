import * as signals from './signals';
import * as messages from './messages';
import * as utils from './utils';
import { combineEpics } from 'redux-observable';
import { curry } from 'ramda';
// Static
import { merge as mergeStatic } from 'rxjs/observable/merge';
// Binders
import { map } from 'rxjs/operator/map';
import { withLatestFrom } from 'rxjs/operator/withLatestFrom';
import { mapTo } from 'rxjs/operator/mapTo';
import { partition } from 'rxjs/operator/partition';
import { switchMap } from 'rxjs/operator/switchMap';
import { letProto as yonk } from 'rxjs/operator/let';

export const _copyEpic = (
  copyContent,
  copySuccess,
  copyFailure,
  actions$
) => {
  return actions$.ofType(signals.COPY)
    ::map(({
      payload,
    }) => payload)
    ::yonk((obs) => {
      const [
        success,
        error
      ] = obs::partition(({ content }) => copyContent(content));

      return mergeStatic(
        success
          ::withLatestFrom(obs)
          ::map(([result, { content }]) => {
            return copySuccess(content)
          }),
        error::mapTo(copyFailure())
      );
    });
};

export const _rootEpic = (combineEpicsFn, copyEpicFn) => {
  return combineEpicsFn(
    copyEpicFn,
  );
};

export const copyEpic = curry(_copyEpic)(
  utils.copyContent,
  messages.copySuccess,
  messages.copyFailure,
);

export default curry(_rootEpic)(
  combineEpics,
  copyEpic,
);