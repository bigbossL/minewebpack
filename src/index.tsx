/* app/index.tsx */
import * as React from 'react'
import { render } from 'react-dom'
import Item from './components/Item' 

interface IAppProps {}
interface IAppState {}

class App extends React.Component<IAppProps, IAppState> {
  public render(): JSX.Element {
    return (
      <div>
        Hello World???
        <Item textname='fuckc'></Item>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))