import axios from "axios";
import qs from "qs";
import { takeEvery, put } from "redux-saga/effects";
const apiConfig = {
  host: "http://b4s3yp.natappfree.cc/"
};
const CLOUD_BOOK_PROTOCOL_GET = "cloudBookProtocolGet";
const GET_ROOM_CATRGORY_REMAIN = "getRoomCategoryRemain";

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
