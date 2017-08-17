import composite from './composite';

const {
  messages,
  signals,
  utils,
  epics: {
    rootEpic: epics,
  },
} = composite();

export {
  signals,
  messages,
  utils,
  epics,
};
