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

interface ReseverProps {
  startTime?: Date;
  endTime?: Date;
}
interface ReseverState {
  roomCount: number;
  name: string;
  phone: string;
  context: string;
}
const Item = List.Item;
export default class Resever extends React.Component<
  ReseverProps,
  ReseverState
> {
  public readonly state = {
    roomCount: 1,
    name: void 0,
    phone: void 0,
    context: void 0
  };
  get money(): number {
    return 100;
  }
  public render() {
    return (
      <div>
        <RoomInfo
          img="http://cdn.sygdsoft.com/banner0.png"
          hotelName="辽阳宾馆"
          name="会议室"
          price={0.05}
        />
        <WhiteSpace />
        <List>
          <List.Item extra={this.props.startTime}>开始时间</List.Item>
          <List.Item extra={this.props.endTime}>结束时间</List.Item>
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
