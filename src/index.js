import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'mobx-react';

import PositionStore from './stores/PositionStore';

ReactDOM.render(
  (
    <Provider PositionStore={PositionStore}>
      <App />
    </Provider>
  ), document.getElementById('root')
);
