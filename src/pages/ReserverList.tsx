import * as React from "react";
import { render } from "react-dom";
import {
  Flex,
  Button,
  Tabs,
  WhiteSpace,
  Badge,
  Carousel,
  Card,
  Calendar,
  DatePicker,
  List,
  Icon,
  WingBlank,
  Accordion,
  InputItem,
  TextareaItem,
  Stepper,
  Toast
} from "antd-mobile";
import "./../css/resever.scss";
import "antd-mobile/dist/antd-mobile.css";
// import RoomInfo from './../components/RoomInfo'
import ReseverListItem from "./../components/ReseverListItem";
import { getParam,timechange } from "./../utils";
import { cloudBookGet } from "./../config/api";
import {connect} from "react-redux"

interface ReseverListProps {
  roomData?:Array<any>,
  getReseverList?:Function,
  upDateParams?:Function,
  wxId?:string
}
interface ReseverListState {
  roomNum: number;
  comeTime: string;
  leaveTime: string;
  needTimes: number;
}
const Item = List.Item;
function mapStateToProps(state) {
  return {
    roomData:state.reseverList,
    wxId:state.wxId
  };
}
//需要触发什么行为
function mapDispatchToProps(dispatch) {
  return {
    getReseverList:(data)=>{
      dispatch({type:'getReseverList',data:data})
    },
    upDateParams: data => dispatch({ type: "upDateParams", data: data })
  };
}
@connect(mapStateToProps,mapDispatchToProps)
export default class ReseverList extends React.Component<
  ReseverListProps,
  ReseverListState
> {
  componentDidMount() {
    console.log("wxId:", getParam("wxId"));
    this.props.getReseverList({ wxId: this.props.wxId })
  }
  constructor(props){
    super(props)
    this.props.upDateParams(JSON.parse(this.props["match"].params.json));
  }
  public readonly state = {
    roomNum: 1,
    comeTime: "cometime",
    leaveTime: "leavetime",
    needTimes: 2
  };
  public render() {
    let arr = [];
    this.props.roomData.map(e => {
      arr.push(
        <ReseverListItem
          name={e.roomCategory}
          count={e.num}
          price={e.price}
          startTime={timechange(new Date(e.reachTime))}
          endTime={timechange(new Date(e.leaveTime))}
          isEnd={e.payState==1}
          userName={e.name}
          doTime={timechange(new Date(e.doTime))}
          phone={e.phone}
        />
      );
    });
    return <div>{arr}</div>;
  }
  setRoomCount = count => {
    this.setState({ roomNum: count });
  }

}
