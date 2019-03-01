import * as React from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
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
  count?: number;
  add?: any;
  no?: number;
  sagaadd?: any;
}
interface HomeState {
  textstate: boolean;
}
function mapStateToProps(state) {
  return {
    count: state.count,
    no: state.no
  };
}
//需要触发什么行为
function mapDispatchToProps(dispatch) {
  return {
    add: () => dispatch({ type: "add", data: 5 }),
    sagaadd: () => dispatch({ type: "CHANGE", data: 30 })
  };
}

const img = {
  data: ["1", "2", "3"],
  imgHeight: 176
};
const tabs2 = [{ title: "房型", sub: "1" }, { title: "介绍", sub: "2" }];
let calendarObj = {
  show: false
};
@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Home extends React.Component<HomeProps, HomeState> {
  nowTimeStamp = Date.now();
  date = new Date(this.nowTimeStamp);
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
          <List style={{ backgroundColor: "white" }}>
            <DatePicker value={this.date} onChange={date => (this.date = date)}>
              <List.Item arrow="horizontal">入住时间</List.Item>
            </DatePicker>
            <DatePicker value={this.date}>
              <List.Item arrow="horizontal">离店时间</List.Item>
            </DatePicker>
          </List>
          <WhiteSpace />
          <HomeList
            homeProps={[
              {
                img: "http://cdn.sygdsoft.com/banner0.png",
                price: 0.01,
                name: "大床房",
                roomList: [
                  {
                    count: 2,
                    price: 0.01,
                    type: "标准间"
                  },
                  {
                    count: 2,
                    price: 0.01,
                    type: "标准间"
                  }
                ]
              },
              {
                img: "http://cdn.sygdsoft.com/banner0.png",
                price: 0.01,
                name: "大床房",
                roomList: [
                  {
                    count: 2,
                    price: 0.01,
                    type: "标准间"
                  },
                  {
                    count: 2,
                    price: 0.01,
                    type: "标准间"
                  }
                ]
              }
            ]}
          />
          {/* <Accordion defaultActiveKey="0" className="my-accordion">
          
          </Accordion> */}

          <WhiteSpace />
          <List>
            <List.Item extra="17695532176">预定热线</List.Item>
          </List>
        </div>
      </div>
    );
  }
}
