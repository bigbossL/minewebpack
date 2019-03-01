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
  Accordion
} from "antd-mobile";
import "./../css/homelist.scss";
import "antd-mobile/dist/antd-mobile.css";
interface HomeListObj {
  img: string;
  price: number;
  name: string;
  roomList: [];
}
export function HomeList(homeProps) {
  // console.log('fuck',homeProps.homeProps,homeProps['roomList'])
  let homeArr = [];
  homeProps.homeProps.forEach(e => {
    let homeContext = (
      <div className="homelist-item">
        <img src={e.img} className="img" />
        <p className="price">￥{e.price} </p>
        <p className="breakfast">早餐</p>
      </div>
    );
    let items = [];
    e.roomList.forEach(el => {
      items.push(
        <div className="romelist-item">
          <div className="price-type">{el.type}</div>
          <div className="count">剩余:{el.count}</div>
          <div className="price">￥{el.price}</div>
          <Button type="primary" inline size="small" className="button">
            预定
          </Button>
        </div>
      );
    });
    homeArr.push(
      <div>
        {homeContext}
        <Accordion>
          <Accordion.Panel header={e.name}>
            <List>{items}</List>
          </Accordion.Panel>
        </Accordion>
        <WhiteSpace/>
      </div>
    );
  });

  // let item=(<div className='romelist-item'>
  //   <div className='price-type'>标准价</div>
  //   <div className='count'>剩余：2</div>
  //   <div className='price'>￥0.01</div>
  //   <Button type='primary' inline size='small' className='button'>预定</Button>
  // </div>)
  return (
    <div>
      {homeArr}
    </div>
  );
}
