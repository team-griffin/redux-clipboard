
export const copyContent = (document, content) => {
  const el = document.createElement('textarea');

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

  el.value = content;

  document.body.appendChild(el);

  el.select();

  try {
    document.execCommand('copy');
  } catch (err) {
    throw err;
  } finally {
    document.body.removeChild(el);
  }
};