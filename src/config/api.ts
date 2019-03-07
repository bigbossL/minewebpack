import axios from "axios";
import qs from "qs";
import { getNowFormatDate } from "./../utils";
import { takeEvery, put } from "redux-saga/effects";
const apiConfig = {
  host: "http://w6qu6x.natappfree.cc/"
};
const CLOUD_BOOK_PROTOCOL_GET = "cloudBookProtocolGet";
const GET_ROOM_CATRGORY_REMAIN = "getRoomCategoryRemain";
const HOTEL_MESSAGE = "hotelMessageGet";
const SUBMIT_RESEVER = "cloudBookAdd";
const ASK_FOR_RESEVER_LIST = "cloudBookGet";
const DELETE_RESEVER_LIST="cloudBookDelete"
export async function cloudBookProtocolGet() {
  try {
    const res = await axios.post(apiConfig.host + CLOUD_BOOK_PROTOCOL_GET, {});
    return res;
  } catch (e) {
    throw e;
  }
}
interface GetRoomCategoryRemainProps {
  beginTime: any;
  endTime: any;
}
export async function getRoomCategoryRemain(props: GetRoomCategoryRemainProps) {
  try {
    const res = await axios.post(apiConfig.host + GET_ROOM_CATRGORY_REMAIN, {
      beginTime: props.beginTime,
      endTime: props.endTime
    });
    return res;
  } catch (e) {
    throw e;
  }
}

export async function hotelMessage() {
  try {
    const res = await axios.post(apiConfig.host + HOTEL_MESSAGE, {});
    return res;
  } catch (e) {
    throw e;
  }
}
interface submitReseverObj {
  wxId: string;
  nickName: string;
  headUrl: string;
  guestSource: string;
  doTime: Date;
  reachTime: Date;
  leaveTime: Date;
  price: number;
  protocol: string;
  roomCategory: string;
  remain: string;
  num: number;
  phone: string;
  name: string;
}
export async function submitResever(props: submitReseverObj) {
  try {
    const res = await axios.post(apiConfig.host + SUBMIT_RESEVER, props);
    return res;
  } catch (e) {
    throw e;
  }
}

interface cloudBookGet {
  wxId: string;
}
export async function cloudBookGet(props: cloudBookGet) {
  try {
    const res = await axios.post(apiConfig.host + ASK_FOR_RESEVER_LIST, {
      condition:
        `wx_id='${props.wxId}' and reach_time>='${getNowFormatDate()}'`
    });
    return res;
  } catch (e) {
    throw e;
  }
}

export async function deleteResever(props:any){
  try {
    const res = await axios.post(apiConfig.host + DELETE_RESEVER_LIST, props);
    return res;
  } catch (e) {
    throw e;
  }
}
