/* app/index.tsx */
import * as React from 'react'
import { render } from 'react-dom'

interface IAppProps {}
interface IAppState {}

class App extends React.Component<IAppProps, IAppState> {
  public render(): JSX.Element {
    return (
      <div>
        Hello World
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))