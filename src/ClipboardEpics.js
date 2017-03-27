import { register } from './inversify.config';
import bindAll from 'lodash/bindAll';
import * as signals from './signals';
import * as messages from './messages';
import { combineEpics } from 'redux-observable';
import tokens from './tokens';
import { copyContent } from './utils';
// Adders
// Binders
import { map } from 'rxjs/operator/map';

@register(tokens.ClipboardEpics, [tokens.Document])
class ClipboardEpics {

  constructor(document) {
    this._document = document;

    bindAll(this, [
      'root',
      'copy',
    ]);
  }

  copy(actions$) {
    return actions$.ofType(signals.COPY)
      ::map(({
        payload,
      }) => {
        const content = payload.content;

        try {
          copyContent(this._document, content);

          return messages.copySuccess(content);
        } catch (err) {
          return messages.copyFailure(err);
        }
      });
  }

  root() {
    return combineEpics(
      this.copy,
    );
  }
}

export default ClipboardEpics;