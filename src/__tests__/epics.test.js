import {combineEpics, createEpicMiddleware, } from 'redux-most';
import { expect } from 'chai';
import { toArray } from 'most-adjunct';
import * as most from 'most';
import sinon from 'sinon';

import { copyEpic } from '../epics';
import * as signals from '../signals';
import * as messages from '../messages';

describe('epics', function() {
  describe('::copyEpic', function() {
    context('when copying is successful', function() {
      it('emits the `copySuccess` action', function(done) {
        const content = {};
        const copyContentStub = sinon.stub().returns(true);

        const action$ = most.of(signals.copy(content));
        const epic$ = copyEpic(copyContentStub, action$).thru(toArray);

        epic$.observe((actions) => {
          expect(actions).to.have.length(1);
          expect(actions[0].type).to.equal(messages.COPY_SUCCESS);
          expect(actions[0].payload.content).to.equal(content);
          done();
        });
      });

    });

    context('when copying is unsuccessful', function() {
      it('emits the `copyFailure` action', function(done) {
        const copyContentStub = sinon.stub().returns(false);

        const action$ = most.of(signals.copy({}));
        const epic$ = copyEpic(copyContentStub, action$).thru(toArray);

        epic$.observe((actions) => {
          expect(actions).to.have.length(1);
          expect(actions[0].type).to.equal(messages.COPY_FAILURE);
          done();
        });
      });
    });
  });
});
