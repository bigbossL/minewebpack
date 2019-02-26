/* app/index.tsx */
import * as React from 'react'
import { render } from 'react-dom'
import { HashRouter,Route,BrowserRouter,Link,Switch } from 'react-router-dom'
import Item from './pages/Item' 
import Home from './pages/Home' 
import About from './pages/About' 

import Button from 'antd/lib/button'
import './text.less'
import { MineRouter } from './components/MineRouter';

import {store,dispatch} from './store'
interface IAppProps {}
interface IAppState {}


class App extends React.Component<IAppProps, IAppState> {

  public render(): JSX.Element {  
    let state={
      no:1
  }
    dispatch('add',4);
    return (
     <MineRouter></MineRouter>
    )
  }
}

render(<App />, document.getElementById('root'))