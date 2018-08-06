import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'mobx-react';

import PositionStore from './stores/PositionStore';
import CommandStore from './stores/CommandStore';

ReactDOM.render(
  (
    <Provider CommandStore={CommandStore} PositionStore={PositionStore}>
      <App />
    </Provider>
  ), document.getElementById('root')
);
