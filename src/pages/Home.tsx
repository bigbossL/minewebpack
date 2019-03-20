import * as React from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { cloudBookProtocolGet } from "./../config/api";
import { getHashUrl } from "./../utils";
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
  Accordion
} from "antd-mobile";
import "./../css/home.scss";
import "antd-mobile/dist/antd-mobile.css";

import HomeList from "../components/HomeList";
interface HomeProps {
  textname: string;
  data?: any;
  loadData?: any;
  loadRoomCount?: any;
  no?: number;
  hasLoadCount?: boolean;
  loadHotelMsg?: Function;
  hotelmsg?: Array<string>;
  startTime?: Date;
  endTime?: Date;
  setStartTime?: Function;
  setEndTime?: Function;
  init?: Function;
  upDateParams?: Function;
  ip?: string;
  hotelMsg?: any;
  props?:string;
  upDataProps?:Function;
  getRoomImg?:Function;
}
interface HomeState {
  startTime: Date;
  endTime: Date;
}
function mapStateToProps(state) {
  return {
    data: state.data,
    hasLoadCount: state.hasLoadCount,
    hotelmsg: state.hotelmsg,
    startTime: state.startTime,
    endTime: state.endTime,
    ip: state.ip,
    hotelMsg: state.hotelMsg,
    props:state.props,
    
  };
}
//需要触发什么行为
function mapDispatchToProps(dispatch) {
  return {
    // add: () => dispatch({ type: "add", data: 5 }),
    loadData: () => dispatch({ type: "getCloudBook" }),
    loadRoomCount: (beginTime: any, endTime: any) =>
      dispatch({
        type: "getRoomCountList",
        data: { beginTime: beginTime, endTime: endTime }
      }),
    loadHotelMsg: () => dispatch({ type: "getHotelMsg" }),
    setStartTime: time => dispatch({ type: "setStartTime", data: time }),
    setEndTime: time => dispatch({ type: "setEndTime", data: time }),
    init: () => dispatch({ type: "init", data: void 0 }),
    upDateParams: data => dispatch({ type: "upDateParams", data: data }),
    upDataProps:data=>dispatch({ type: "upDataProps", data: data }),
    getRoomImg:(beginTime: any, endTime: any)=>dispatch({
      type: "getRoomImg",
      data: { beginTime: beginTime, endTime: endTime }
    })
  };
}
let calendarObj = {
  show: false
};
@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Home extends React.Component<HomeProps, HomeState> {
  componentDidMount() {
    this.load()
  }
  private load= async()=>{
    try{
       await this.props.loadData();
       await this.props.loadHotelMsg();
       await this.props.getRoomImg(this.nowDate,this.nowDate);
    }catch(e){
      throw e
    }
  }
  get nowDate(): Date {
    return new Date();
  }
  public readonly state = {
    startTime: void 0,
    endTime: void 0
  };
  constructor(props) {
    super(props);
    this.props.init();
    // console.log("home constructor",decodeURIComponent(this.props["match"].params.json));
    this.props.upDateParams(
      JSON.parse(decodeURIComponent(this.props["match"].params.json))
    );
    this.props.upDataProps(this.props["match"].params.json)
  }
  public render() {
    return (
      <div>
        <Carousel autoplay={false} infinite  style={{ width: "100%", height: "300px", verticalAlign: "top" }}>
          {this.props.hotelmsg.map(val => (
            <img
              src={val}
              style={{ width: "100%", height: "300px", verticalAlign: "top" }}
            />
          ))}
        </Carousel>
        <Card full>
          <Card.Header
            title={this.props.hotelMsg['name']}
            // extra={<span>this is extra</span>}
          />
          <Card.Body>
            <div>{this.props.hotelMsg['abstract']}</div>
          </Card.Body>
          <Card.Footer
            content={this.props.hotelMsg['position']}
            // extra={<div>extra footer content</div>}
          />
        </Card>
        <div>
          <List>
            <DatePicker
              value={this.state.startTime}
              mode="date"
              minDate={this.nowDate}
              maxDate={
                this.props.endTime
                  ? this.props.endTime
                  : new Date(2030, 1, 1, 23, 59, 59)
              }
              onChange={date => this.setDate(0, date)}
            >
              <List.Item arrow="horizontal">入住时间</List.Item>
            </DatePicker>
            <DatePicker
              value={this.state.endTime}
              mode="date"
              minDate={
                this.props.startTime ? this.props.startTime : this.nowDate
              }
              onChange={date => this.setDate(1, date)}
            >
              <List.Item arrow="horizontal">离店时间</List.Item>
            </DatePicker>
          </List>
          <WhiteSpace />
          {/* {this.props.hasLoadCount ? ( */}
            <HomeList homeProps={this.props.data} />
          {/* ) : (
            <div />
          )} */}
          <WhiteSpace />
          <List>
            <List.Item extra={this.props.hotelMsg["phone"]}>预定热线</List.Item>
          </List>
        </div>
      </div>
    );
  }

  private setDate = (type: number, date: Date): void => {
    switch (type) {
      case 0:
        this.props.setStartTime(date);
        this.setState({ startTime: date }, () => {
          if (this.props.startTime != void 0 && this.props.endTime != void 0) {
            this.props.loadRoomCount(this.props.startTime, this.props.endTime);
          }
        });

        break;
      case 1:
        this.props.setEndTime(date);
        this.setState({ endTime: date }, () => {
          if (this.props.startTime != void 0 && this.props.endTime != void 0) {
            this.props.loadRoomCount(this.props.startTime, this.props.endTime);
          }
        });
        break;
    }
  };
}
