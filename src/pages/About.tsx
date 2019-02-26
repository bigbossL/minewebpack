import * as React from 'react'
import { render } from 'react-dom'

interface AboutProps {
    textname:string
}
interface AboutState {
    textstate:boolean
}

export default class About extends React.Component<AboutProps,AboutState>{
    public render(){
        return(
            <div> home</div>
        )
    }
}