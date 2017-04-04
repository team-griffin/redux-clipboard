import * as signals from './signals';
import { combineEpics } from 'redux-observable';
// Adders
// Binders
import { map } from 'rxjs/operator/map';

export const copyEpic = (
  copyContent,
  copySuccess,
  copyFailure,
  actions$
) => {
  return actions$.ofType(signals.COPY)
    ::map(({
      payload,
    }) => payload)
    ::map(({
      content,
    }) => {
      if (copyContent(content) === true) {
        return copySuccess(content);
      }

      return copyFailure();
    });
};

export default (copyEpicFn) => {
  return combineEpics(
    copyEpicFn,
  );
};