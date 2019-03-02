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
// import RoomInfo from './../components/RoomInfo'
import ReseverListItem from "./../components/ReseverListItem";
interface ReseverListProps {}
interface ReseverListState {
  roomNum: number;
  comeTime: string;
  leaveTime: string;
  needTimes: number;
}
const Item = List.Item;
export default class ReseverList extends React.Component<
  ReseverListProps,
  ReseverListState
> {
  public readonly state = {
    roomNum: 1,
    comeTime: "cometime",
    leaveTime: "leavetime",
    needTimes: 2
  };
  public render() {
    return (
      <div>
        <ReseverListItem
          hotelName="廖勇宾馆"
          name="大床房"
          count={2}
          price={0.01}
          startTime="startTime"
          endTime="endTime"
          isEnd={true}
        />
         <ReseverListItem
          hotelName="廖勇宾馆"
          name="大床房"
          count={2}
          price={0.01}
          startTime="startTime"
          endTime="endTime"
          isEnd={false}
        />
      </div>
    );
  }
  setRoomCount = count => {
    this.setState({ roomNum: count });
  };
}
