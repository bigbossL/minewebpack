import * as React from "react";
import { render } from "react-dom";
import "./../css/roominfo.scss";
interface Props{
    hotelName:string,
    name:string,
    img:string,
    price:number,
}
export default function RoomInfo(props:Props){
    console.log(props)
    return(
        <div className="roomitem">
        <img src={props.img} className="img" />
        <p className="price">￥{props.price}</p>
        <p className="name">{props.hotelName}-{props.name}</p>
      </div>
    )
} 