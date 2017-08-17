const createElement = (document) => {
  return document.createElement('textarea');
};

const makeElementHidden = (el) => {
  el.style.position = 'fixed';
  el.style.top = -10;
  el.style.left = -10;
  el.style.width = '2em';
  el.style.height = '2em';
  el.style.padding = 0;
  el.style.border = 'none';
  el.style.outline = 'none';
  el.style.boxShadow = 'none';
  el.style.background = 'transparent';

  return el;
};

const setElementValue = (el, value) => {
  el.value = value;
};

const selectElement = (el) => {
  el.select();
};

const copy = (document) => {
  document.execCommand('copy');
};

const attemptCopy = (copyFn) => {
  try {
    copyFn();
    return true;
  } catch (err) {
    return false;
  }
};

export const copyContent = (document, content) => {
  const el = createElement(document);
  makeElementHidden(el);
  setElementValue(el, content);

  document.body.appendChild(el);
  selectElement(el);

  const result = attemptCopy(() => copy(document));
  document.body.removeChild(el);

  return result;
};
