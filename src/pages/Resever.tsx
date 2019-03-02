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
import RoomInfo from './../components/RoomInfo' 

interface ReseverProps {}
interface ReseverState {
  roomNum: number;
  comeTime: string;
  leaveTime: string;
  needTimes: number;
}
const Item = List.Item;
export default class Resever extends React.Component<
  ReseverProps,
  ReseverState
> {
  public readonly state = {
    roomNum: 1,
    comeTime: "cometime",
    leaveTime: "leavetime",
    needTimes: 2
  };
  public render() {
    return (
      <div>
        <RoomInfo img='http://cdn.sygdsoft.com/banner0.png' hotelName='辽阳宾馆' name='会议室' price={0.05}/>
        <WhiteSpace/>
        <List>
          <List.Item extra={this.state.comeTime}>开始时间</List.Item>
          <List.Item extra={this.state.leaveTime}>结束时间</List.Item>
          <InputItem clear placeholder="请输入姓名">
            姓名
          </InputItem>
          <InputItem clear type="phone" placeholder="请输入手机号码">
            手机号码
          </InputItem>
          <Item multipleLine extra={this.state.roomNum}>
            房间数量
            <Item.Brief>
              <Stepper
                className="stepper"
                value={this.state.roomNum}
                min={1}
                onChange={this.setRoomCount}
              />
            </Item.Brief>
          </Item>
          <TextareaItem
            title="特殊要求"
            // placeholder="click the button below to focus"
            data-seed="logId"
            autoHeight
          />
        </List>
        <WhiteSpace />
        <List>
          <List.Item extra={"￥0.01"}>合计金额</List.Item>
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
  setRoomCount = count => {
    this.setState({ roomNum: count });
  };
}
