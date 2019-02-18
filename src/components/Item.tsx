import * as React from 'react'
import { render } from 'react-dom'

interface ItemProps {
    textname:string
}
interface ItemState {
    textstate:boolean
}

export default class Item extends React.Component<ItemProps,ItemState>{
    public readonly state={
     textstate:false   
    }
    public render(){
        return(
            <div> fuck {this.props.textname} <button onClick={this.click}>change</button><p>!!!!!!!!!!!!!!!!</p></div>
        )
    }
    click=()=>{
        console.log('fuck!!!!')
         console.log(this)
        this.setState({
            textstate:true
        })
    }
}