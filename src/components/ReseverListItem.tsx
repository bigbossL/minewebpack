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
  Stepper,
  Toast
} from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import { submitResever } from "./../config/api";
import { connect } from "react-redux";
interface Props {
  name: string;
  count: number;
  startTime: string;
  endTime: string;
  isEnd: boolean;
  price: number;
  doTime: string;
  userName: string;
  phone: string;
  obj: any;
  deleteResever?: Function;
  wxId?: string;
  ip?: string;
  getReseverList?: Function;
}
function mapStateToProps(state) {
  return {
    data: state.data,
    hasLoadCount: state.hasLoadCount,
    hotelmsg: state.hotelmsg,
    wxId: state.wxId,
    ip: state.ip
  };
}
//需要触发什么行为
function mapDispatchToProps(dispatch) {
  return {
    getReseverList: data => {
      dispatch({ type: "getReseverList", data: data });
    },
    deleteResever: (data, callback) =>
      dispatch({
        type: "deleteResever",
        data: data,
        callback: () => {
          callback();
        }
      })
  };
}
function ReserverListItem(props: Props) {
  let footer = void 0;
  let header = void 0;
  if (!props.isEnd) {
    footer = (
      <Card.Footer
        content={
          <Button
            type="primary"
            size="small"
            onClick={async () => {
              try {
                const res = await submitResever({ ...props.obj, id: void 0 });
                console.log(res);
                window.location.href = `http://sygdsoft.com/sygd2/wechatPayCreate?orderId=${
                  res.data
                }&price=${props.price}&wxId=${props.wxId}&domain=${props.ip}`;
              } catch (e) {
                Toast.fail(e.message, 1);
                console.log(e.message);
              }
            }}
          >
            立刻支付
          </Button>
        }
        extra={
          <Button
            type="warning"
            size="small"
            onClick={async () => {
              try {
                await props.deleteResever([props.obj]);
                await props.getReseverList({ wxId: props.wxId });
                await Toast.success('删除成功',1)
              } catch (e) {
                Toast.fail(e.message, 1);
              }

              //删除没试过 可能有问题啊=。=
            }}
          >
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
            {/* <List.Item extra={props.hotelName}>宾馆名称</List.Item> */}
            <List.Item extra={props.name}>房间类型</List.Item>
            <List.Item extra={props.count}>房间数量</List.Item>
            <List.Item extra={props.startTime}>开始时间</List.Item>
            <List.Item extra={props.endTime}>结束时间</List.Item>
            <List.Item extra={props.userName}>预留联系人</List.Item>
            <List.Item extra={props.phone}>预留电话</List.Item>
            <List.Item extra={props.doTime}>下单时间</List.Item>
          </List>
        </Card.Body>
        {footer}
      </Card>
      <WhiteSpace size="lg" />
    </WingBlank>
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReserverListItem);
