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
  messages,
  signals,
  utils,
  epics,
};
