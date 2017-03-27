import { createAction } from 'redux-actions';

// Action Types
const prefix = '@@TEAM_GRIFFIN/REDUX_CLIPBOARD';
export const COPY_SUCCESS = `${prefix}/M_COPY_SUCCESS`;
export const COPY_FAILURE = `${prefix}/M_COPY_FAILURE`;
// Actions
export const copySuccess = createAction(COPY_SUCCESS, (content) => ({
  content,
}));
export const copyFailure = createAction(COPY_FAILURE);