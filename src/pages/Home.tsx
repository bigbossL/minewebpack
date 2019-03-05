import * as React from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { cloudBookProtocolGet } from "./../config/api";
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

import { HomeList } from "../components/HomeList";
interface HomeProps {
  textname: string;
  data?: any;
  loadData?: any;
  loadRoomCount?: any;
  no?: number;
  hasLoadCount?: boolean;
  loadHotelMsg?:Function
}
interface HomeState {
  startTime: Date;
  endTime: Date;
}
function mapStateToProps(state) {
  return {
    data: state.data,
    hasLoadCount: state.hasLoadCount
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
    loadHotelMsg:()=>dispatch({type:"getHotelMsg"})
  };
}

const img = {
  data: ["1", "2", "3"],
  imgHeight: 176
};
let calendarObj = {
  show: false
};
@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Home extends React.Component<HomeProps, HomeState> {
  componentDidMount = () => {
    // simulate img loading
    setTimeout(() => {
      img.data = [
        "AiyWuByWklrrUDlFignR",
        "TekJlZRVCjLFexlOCuWn",
        "IJOtIlfsYdTyaDTRVrLI"
      ];
    }, 100);
  };
  get nowDate(): Date {
    return new Date(Date.now());
  }
  public readonly state = {
    startTime: void 0,
    endTime: void 0
  };
  constructor(props) {
    super(props);
    this.props.loadData();
    this.props.loadHotelMsg();
  }
  public render() {
    return (
      <div>
        <Carousel
          autoplay={false}
          infinite
          beforeChange={(from, to) =>
            console.log(`slide from ${from} to ${to}`)
          }
          afterChange={index => console.log("slide to", index)}
        >
          {img.data.map(val => (
            <img
              src="http://cdn.sygdsoft.com/banner0.png"
              alt=""
              style={{ width: "100%", height: "100%", verticalAlign: "top" }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event("resize"));
              }}
            />
          ))}
        </Carousel>
        <div>
          <List>
            <DatePicker
              value={this.state.startTime}
              onChange={date => this.setDate(0, date)}
            >
              <List.Item arrow="horizontal">
                入住时间{this.props.data.length}
              </List.Item>
            </DatePicker>
            <DatePicker
              value={this.state.endTime}
              onChange={date => this.setDate(1, date)}
            >
              <List.Item arrow="horizontal">离店时间</List.Item>
            </DatePicker>
          </List>
          <WhiteSpace />
          {this.props.hasLoadCount ? (
            <HomeList homeProps={this.props.data} />
          ) : (
            <div />
          )}
          <WhiteSpace />
          <List>
            <List.Item extra="17695532176">预定热线</List.Item>
          </List>
        </div>
      </div>
    );
  }

  private setDate = (type: number, date: Date): void => {
    switch (type) {
      case 0:
        this.setState({ startTime: date }, () => {
          if (this.state.startTime != void 0 && this.state.endTime != void 0) {
            this.props.loadRoomCount(this.state.startTime, this.state.endTime);
          }
        });
        break;
      case 1:
        this.setState({ endTime: date }, () => {
          if (this.state.startTime != void 0 && this.state.endTime != void 0) {
            this.props.loadRoomCount(this.state.startTime, this.state.endTime);
          }
        });
        break;
    }
  };
}
