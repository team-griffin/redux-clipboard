import { createAction } from 'redux-actions';

// Action Types
const prefix = '@@TEAM_GRIFFIN/REDUX_CLIPBOARD';
export const COPY = `${prefix}/S_COPY`;
// Actions
export const copy = createAction(COPY, (content) => ({
  content,
}));