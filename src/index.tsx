/* app/index.tsx */
import * as React from 'react'
import { render } from 'react-dom'
// import './text.less'
import { MineRouter } from './components/MineRouter';

import getStore from './redux'
import {createStore} from 'redux'
import {Provider} from 'react-redux' 
import './css/main.scss'
interface IAppProps {}
interface IAppState {}


class App extends React.Component<IAppProps, IAppState> {

  public render(): JSX.Element {  
    // const store=createStore(reducer)
    return (
      <Provider store={getStore()}>
             <MineRouter></MineRouter>
      </Provider>
    )
  }
}

render(<App />, document.getElementById('root'))