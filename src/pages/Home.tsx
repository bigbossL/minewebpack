import * as React from 'react'
import { render } from 'react-dom'
import {connect} from 'react-redux'
import {Button} from 'antd'

interface HomeProps {
    textname:string,
    count?:number,
    add?:any,
    no?:number,
    sagaadd?:any
}
interface HomeState {
    textstate:boolean
}
 const array=[1,1,1,1,1,1,1]
 function mapStateToProps(state) {
    return {
        count: state.count,
        no:state.no
    }
}
//需要触发什么行为
function mapDispatchToProps(dispatch) {
    return {
        add: () => dispatch({ type: 'add',data:5 }),
        sagaadd:()=>dispatch({ type: 'CHANGE',data:30 })
    }
}
@connect(mapStateToProps,mapDispatchToProps)
 export default class Home extends React.Component<HomeProps,HomeState>{
   
    public render(){
        let domArr=[];
        array.forEach(e => {
            domArr.push(<div>fuck！！{this.props.count}</div>)
        });
        return(
            <div>
            {domArr}
            <Button onClick={this.props.add}>add</Button>
            <div>{this.props.no}</div>
            <Button onClick={this.props.sagaadd}>async</Button>
            </div>
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