/*
 * @Description: 
 * @Date: 2021-02-23 11:52:37
 * @LastEditTime: 2021-03-04 14:25:55
 */
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

import routes from 'routes/index.js';
import store from 'store';

import { GlobalStyle } from './style';
import { IconStyle } from 'assets/iconfont/iconfont';
import { Data } from 'application/Singers/data';


function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <Data>
          {
            renderRoutes(routes)
          }
        </Data>
      </HashRouter>
    </Provider>
  );
}

export default App;
