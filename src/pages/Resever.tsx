import * as React from "react";
import { render } from "react-dom";
import {submitResever} from './../config/api'
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
import RoomInfo from "./../components/RoomInfo";
import { connect } from "react-redux";
import {timechange,getStayDays} from './../utils'
import {store} from "../redux";

interface ReseverProps {
  startTime?: Date;
  endTime?: Date;
  data?: Array<any>;
  chooseRoomId?: number;
  wxId?:string
  nickName?:string
  headUrl?:string
  guestSource?:string
}
interface ReseverState {
  roomCount: number;
  name: string;
  phone: string;
  context: string;
}
const Item = List.Item;
function mapStateToProps(state) {
  return {
    data: state.data,
    chooseRoomId: state.chooseRoomId,
    startTime: state.startTime,
    endTime: state.endTime,
    wxId:state.wxId,
    nickName:state.nickName,
    headUrl:state.headUrl,
    guestSource:state.guestSource,
    
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
    context: '',
  };
  constructor(props){
    super(props)
    
  }
  get money(): number {
    return this.props.data[this.props.chooseRoomId]['roomPrice'] * this.state.roomCount*getStayDays(this.props.startTime,this.props.endTime);
  }
  get itemdata():any{
    let arr=void 0;
    this.props.data.forEach(e=>{
      if(e.id==this.props.chooseRoomId){
        arr={...e}
      }
    })
    return arr
  }
  

  public render() {
    return (
      <div>
        <RoomInfo
          img={this.itemdata['cloudPic']}
          hotelName={this.itemdata['roomCategory']}
          name={this.itemdata['roomCategory']}
          price={this.itemdata['roomPrice']}
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
                max={this.props.data[this.props.chooseRoomId]['remain']}
                onChange={count => {
                  this.setState({ roomCount: count });
                }}
              />
            </Item.Brief>
          </Item>
          <TextareaItem
            title="特殊要求"
            value={this.state.context}
            onChange={e=>{
              this.setState({
                context:e
              })
              console.log(this.state)
            }}
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
          <Button type="primary" onClick={this.payment}>确认付款</Button>
        </WingBlank>
        <WhiteSpace />
      </div>
    );
  }
  private payment= async (event)=>{
    
    try{
      if(this.state.name==void 0||this.state.name==''){
        throw new Error('名字不能为空')
      }
      if(this.state.phone==void 0||this.state.phone==''){
        throw new Error('手机号不能为空')
      }
      const res=await submitResever({
        wxId:this.props.wxId,
        nickName:this.props.nickName,
        headUrl:this.props.guestSource,
        guestSource:this.props.guestSource,
        doTime:new Date(),
        reachTime:this.props.startTime,
        leaveTime:this.props.endTime,
        price:this.money,
        protocol:this.itemdata['protocol'],
        roomCategory:this.itemdata['roomCategory'],
        remain:this.state.context,
        num:this.state.roomCount,
        phone:this.state.phone,
        name:this.state.name
      })
      console.log(res)
      　window.location.href=`http://sygdsoft.com/sygd2/wechatPayCreate?orderId=${res.data}&price=${this.money}&wxId=${this.props.wxId}&domain=${store.getState().ip}`;
    }catch(e){
      Toast.fail(e.message, 1);
      console.log(e.message)
    }
  }
}
