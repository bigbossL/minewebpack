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
import "antd-mobile/dist/antd-mobile.css";
interface Props {
  hotelName: string;
  name: string;
  count:number;
  startTime: string;
  endTime: string;
  isEnd: boolean;
  price:number;
}
export default function ReserverListItem(props: Props) {
  let footer = void 0;
  let header = void 0;
  if (!props.isEnd) {
    footer = (
      <Card.Footer
        content={
          <Button type="primary" size="small">
            立刻支付
          </Button>
        }
        extra={
          <Button type="warning" size="small">
            删除订单
          </Button>
        }
      />
    );
    header = <div>未支付</div>;
  } else {
    header = <div>已支付</div>;
  }
  return (
    <WingBlank size="lg">
      <WhiteSpace size="lg" />
      <Card>
        <Card.Header title="订单详情" extra={header} />
        <Card.Body>
          <List>
            <List.Item extra={props.hotelName}>宾馆名称</List.Item>
            <List.Item extra={props.name}>房间类型</List.Item>
            <List.Item extra={props.count}>房间数量</List.Item>
            <List.Item extra={props.startTime}>开始时间</List.Item>
            <List.Item extra={props.endTime}>结束时间</List.Item>
          </List>
        </Card.Body>
        {footer}
      </Card>
      <WhiteSpace size="lg" />
    </WingBlank>
  );
}
