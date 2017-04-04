import rootEpic, { copyEpic } from '../epics';
import { ActionsObservable, combineEpics } from 'redux-observable';
import { COPY } from '../signals';
import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { ignoreElements } from 'rxjs/operator/ignoreElements';
import { _do as execute } from 'rxjs/operator/do';
import { skip } from 'rxjs/operator/skip';
import { take } from 'rxjs/operator/take';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import sinon from 'sinon';

const createDebugEpic = () => {
  const subject = new ReplaySubject();

  return {
    debugSubject: subject,
    debugEpic: (actions$) => {
      return actions$
        ::execute((action) => {
          subject.next(action);
        })
        ::ignoreElements();
    }
  };
};

describe('epics', function() {
  describe('::copyEpic', function() {
    beforeEach(function() {
      const {
        debugSubject,
        debugEpic,
      } = createDebugEpic();

      this.copyContentStub = sinon.stub();

      const epicMiddleware = createEpicMiddleware(
        combineEpics(
          debugEpic,
          copyEpic.bind(
            null,
            this.copyContentStub,
            () => ({ type: 'SUCCESS' }),
            () => ({ type: 'FAILURE' }),
          ),
        )
      );
      const mockStore = configureMockStore([ epicMiddleware ]);
      this.store = mockStore();
      this.debugSubject = debugSubject;
    });

    context('when copying is successful', function() {
      it('emits the `copySuccess` action', function(done) {
        this.copyContentStub.returns(true);

        this.debugSubject::skip(1)::take(1).subscribe((action) => {
          expect(action).to.eql({
            type: 'SUCCESS',
          });
          done();
        });

        this.store.dispatch({
          type: COPY,
          payload: {},
        });
      });

    });

    context('when copying is unsuccessful', function() {
      it('emits the `copyFailure` action', function(done) {
        this.copyContentStub.returns(false);

        this.debugSubject::skip(1)::take(1).subscribe((action) => {
          expect(action).to.eql({
            type: 'FAILURE',
          });
          done();
        });

        this.store.dispatch({
          type: COPY,
          payload: {},
        });
      });
    });
  });

  describe('::rootEpic', function() {
    
  });
});