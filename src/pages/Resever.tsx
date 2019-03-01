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
import "./../css/home.scss";
import "antd-mobile/dist/antd-mobile.css";

interface ReseverProps {
  textname: string;
}
interface ReseverState {
  textstate: boolean;
}
const Item=List.Item
export default class Resever extends React.Component<
  ReseverProps,
  ReseverState
> {
  public readonly state = {
    textstate: false
  };
  public render() {
    return (
      <List>
       
        <List.Item>
          <Button type="primary" size="small" inline >Submit</Button>
          <Button size="small" inline style={{ marginLeft: '2.5px' }} >Reset</Button>
        </List.Item>
        <InputItem
          clear
          placeholder="请输入姓名"
        >
          姓名
        </InputItem>
        <InputItem
            clear
            type="phone"
            placeholder="请输入手机号码"
          >手机号码
          </InputItem>
         <TextareaItem
            title="特殊要求"
            // placeholder="click the button below to focus"
            data-seed="logId"
            autoHeight
          />
        
          

      </List>
    );
  }
  click = () => {
    console.log("fuck!!!!");
    console.log(this);
    this.setState({
      textstate: true
    });
  };
}
