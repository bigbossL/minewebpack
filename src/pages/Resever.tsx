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
  Stepper
} from "antd-mobile";
import "./../css/resever.scss";
import "antd-mobile/dist/antd-mobile.css";
import RoomInfo from "./../components/RoomInfo";
import { connect } from "react-redux";
import {timechange} from './../utils'

interface ReseverProps {
  startTime?: Date;
  endTime?: Date;
  data?: Array<any>;
  chooseRoomId?: number;
}
interface ReseverState {
  roomCount: number;
  name: string;
  phone: string;
  context: string;
  itemData:any
}
const Item = List.Item;
function mapStateToProps(state) {
  return {
    data: state.data,
    chooseRoomId: state.chooseRoomId,
    startTime: state.startTime,
    endTime: state.endTime
  };
}
//需要触发什么行为
function mapDispatchToProps(dispatch) {
  return {};
}
@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Resever extends React.Component<
  ReseverProps,
  ReseverState
> {
  public readonly state = {
    roomCount: 1,
    name: void 0,
    phone: void 0,
    context: void 0,
    itemData:{
      // cloudPic: "http://cdn.sygdsoft.com/banner0.png",
      //   guestSource: "微信",
      //   id: 1,
      //   page: 1,
      //   protocol: "标准价",
      //   remain: 5,
      //   roomCategory: "三人间",
      //   roomPrice: 0.01,
      //   rows: 0
    }
  };
  constructor(props){
    super(props)
    console.log('resever',props,props.data)
    // props.data.forEach(e => {
    //   console.log(e.id == props.chooseRoomId,e.id ,props.chooseRoomId)
    //   if (e.id == props.chooseRoomId) {
    //     console.log(e)
    //    this.setState({itemData:{...e}})
    //   }
    // });
    for(let i=0;i<props.data.length;i++){

      if (props.data[i].id == props.chooseRoomId) {
        console.log(props.data[i])
      }
    }
    console.log(this.state.itemData)
  }
  get money(): number {
    return this.state.itemData['roomPrice'] * this.state.roomCount;
  }
  // get itemData() {
  //   console.log("resever props", this.props);
  //   this.props.data.forEach(e => {
  //     if (e.id == this.props.chooseRoomId) {
  //       console.log('匹配了')
  //       return {
  //       cloudPic: "http://cdn.sygdsoft.com/banner0.png",
  //       guestSource: "微信",
  //       id: 1,
  //       page: 1,
  //       protocol: "标准价",
  //       remain: 5,
  //       roomCategory: "三人间",
  //       roomPrice: 0.01,
  //       rows: 0};
  //     }
  //   });
  //   return null;
  // }
  public render() {
    return (
      <div>
        <RoomInfo
          img={this.state.itemData['cloudPic']}
          hotelName={this.state.itemData['roomCategory']}
          name={this.state.itemData['roomCategory']}
          price={this.state.itemData['roomPrice']}
        />
        <WhiteSpace />
        <List>
          <List.Item extra={timechange(this.props.startTime)}>开始时间</List.Item>
          <List.Item extra={timechange(this.props.endTime)}>结束时间</List.Item>
          <InputItem
            clear
            placeholder="请输入姓名"
            value={this.state.name}
            onChange={v => {
              this.setState({ name: v });
            }}
          >
            姓名
          </InputItem>
          <InputItem
            clear
            type="phone"
            placeholder="请输入手机号码"
            value={this.state.phone}
            onChange={v => {
              this.setState({ phone: v });
            }}
          >
            手机号码
          </InputItem>
          <Item multipleLine extra={this.state.roomCount}>
            房间数量
            <Item.Brief>
              <Stepper
                className="stepper"
                value={this.state.roomCount}
                min={1}
                max={this.state.itemData['remain']}
                onChange={count => {
                  this.setState({ roomCount: count });
                }}
              />
            </Item.Brief>
          </Item>
          <TextareaItem
            title="特殊要求"
            // value={this.state.context}
            // placeholder="click the button below to focus"
            data-seed="logId"
            autoHeight
          />
        </List>
        <WhiteSpace />
        <List>
          <List.Item extra={this.money}>合计金额</List.Item>
        </List>
        <WhiteSpace />
        <WingBlank>
          <div className="hint">
            <div className="title">温馨提示</div>
            <div className="msg">1.退房时间12：00</div>
            <div className="msg">2.请电话确认具体事宜</div>
          </div>
        </WingBlank>
        <WhiteSpace />
        <WingBlank>
          <Button type="primary">确认付款</Button>
        </WingBlank>
        <WhiteSpace />
      </div>
    );
  }
}
