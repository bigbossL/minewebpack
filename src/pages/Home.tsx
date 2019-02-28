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
  Card
} from "antd-mobile";
// import "./../text.less";
import "antd-mobile/dist/antd-mobile.css";
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
            <a
              key={val}
              href="http://www.alipay.com"
              style={{
                display: "inline-block",
                width: "100%",
                height: img.imgHeight
              }}
            >
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                alt=""
                style={{ width: "100%", verticalAlign: "top" }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event("resize"));
                }}
              />
            </a>
          ))}
        </Carousel>
        <WhiteSpace />
        <Tabs
          tabs={tabs2}
          initialPage={1}
          // tabBarPosition="bottom"
          renderTab={tab => <span>{tab.title}</span>}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "150px",
              backgroundColor: "#fff"
            }}
          >
           <Card full>
      <Card.Header
        title="This is title"
        thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
        extra={<span>this is extra</span>}
      />
    </Card>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "150px",
              backgroundColor: "#fff"
            }}
          >
            Content of second tab
          </div>
        </Tabs>
        <WhiteSpace />
      </div>
    );
  }
}
