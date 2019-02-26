import * as React from 'react'
import { render } from 'react-dom'

interface HomeProps {
    textname:string
}
interface HomeState {
    textstate:boolean
}
 const array=[1,1,1,1,1,1,1]
export default class Home extends React.Component<HomeProps,HomeState>{
   
    public render(){
        let domArr=[];
        array.forEach(e => {
            domArr.push(<div>fuck！！</div>)
        });
        return(
            <div>wocao??{domArr}</div>
        )
    }
    public renderArr=()=>{
        let domArr=[];
        array.forEach(e => {
            domArr.push(<div>fuck！！</div>)
        });
        return domArr
    }
}