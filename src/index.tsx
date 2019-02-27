/* app/index.tsx */
import * as React from 'react'
import { render } from 'react-dom'
import './text.less'
import { MineRouter } from './components/MineRouter';

import getStore from './redux'
import {createStore} from 'redux'
import {Provider} from 'react-redux' 
interface IAppProps {}
interface IAppState {}


class App extends React.Component<IAppProps, IAppState> {

  public render(): JSX.Element {  
    // const store=createStore(reducer)
    const store=getStore()
    return (
      
      <Provider store={store}>
             <MineRouter></MineRouter>
      </Provider>
    )
  }
}

render(<App />, document.getElementById('root'))