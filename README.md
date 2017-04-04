# redux-clipboard

```sh
npm install --save @team-griffin/redux-clipboard
```
```sh
yarn add @team-griffin/redux-clipboard
```

This library allows you to copy a given value to the clipboard. It uses `execCommand('copy')` which is 100% supported. If your application needs a fallback this library is not for you.

## Requirements
- redux
- redux-observable

## Setup

This library uses `redux-observable` to handle its side effects.

```javascript
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { epics as reduxClipboardEpics } from '@team-griffin/redux-clipboard';

createEpicMiddleware(combineEpics(
  reduxClipboardEpics,
));
```

## Usage

```javascript
import { signals } from '@team-griffin/redux-clipboard';

dispatch(signals.copy('my content'));
```

This will copy to the clipboard for you. If you want to perform more actions after the copy has taken place this library supplies 2 messages.

```javascript
import { messages } from '@team-griffin/redux-clipboard';

messages.COPY_SUCCESS;
messages.COPY_FAILURE;
```