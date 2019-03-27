import { takeEvery } from "redux-saga/effects";
// import {delay} from 'redux-saga'
import { take, all, fork, put, call } from "redux-saga/effects";
import {
  cloudBookProtocolGet,
  getRoomCategoryRemain,
  hotelMessage,
  cloudBookGet,
  deleteResever
} from "./api";
import ReseverList from "../pages/ReserverList";
export const storeConfig = {
  state: {
    props:void 0,
    data: [],
    hasLoadCount: false,
    hotelmsg: [],
    startTime: void 0,
    endTime: void 0,
    chooseRoomId: void 0,
    wxId: void 0,
    nickName: void 0,
    headUrl: void 0,
    guestSource: "微信",
    ip: void 0,
    reseverList: [],
    hotelMsg:{
      name:void 0,
      phone:void 0,
      position:void 0,
      attention:void 0,
      abstract:void 0,
    }
  },
  action: {
    upDataProps:(state,data)=>{
      return {...state,props:data}
    },
    init: (state, data) => {
      return { ...storeConfig.state };
    },
    updata: (state, data) => {
      // let newdata = { ...state };
      // newdata.data = data;
      let newData=new Array() 
      data.forEach(e => {
        let oldData=newData.find(el=>{
          return el.roomCategory==e.roomCategory
        })
        if(oldData==null){
          let newe={...e,priceArr:[{
            type:e.protocol,
            price:e.roomPrice
          }]}
          newData.push(newe)
        }
        else{
          oldData['priceArr'].push({
            type:e.protocol,
            price:e.roomPrice
          })
        }
        
      });
      console.log('newDAta',newData)
      return {...state,data:newData};
    },
    updataTime: (state, data) => {
      let newdata = [...state.data];
      for (let i = 0; i < newdata.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (newdata[i].roomCategory == data[j].category) {
            newdata[i]["remain"] = data[j].remain;
            newdata[i]["cloudPic"] = data[j].cloudPic;
          }
        }
      }

      console.log("updataTime", newdata);
      return { ...state, data: newdata, hasLoadCount: true };
    },
    updataImg: (state, data) => {
      let newdata = [...state.data];
      for (let i = 0; i < newdata.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (newdata[i].roomCategory == data[j].category) {
      
            newdata[i]["cloudPic"] = data[j].cloudPic;
          }
        }
      }

      console.log("updataTime", newdata);
      return { ...state, data: newdata};
    },
    updateHotleMsg: (state, data) => {
      console.log("updateHotleMsg");
      let imgArr = [];
      let hotelMsg={
        name:void 0,
        phone:void 0,
        position:void 0,
        attention:void 0,
        abstract:void 0,
      }
      data.forEach(e => {
        console.log(e.name)
        if(e.name=='酒店名称'){
          hotelMsg.name=e.value
        }
        if(e.name=='联系电话'){
          hotelMsg.phone=e.value
        }
        if(e.name=='位置'){
          hotelMsg.position=e.value
        }
        if(e.name=='简介'){
          hotelMsg.abstract=e.value
        }
        if(e.name=='注意事项'){
          hotelMsg.attention=e.value
        }
        if (e.name == "酒店图片") {
          imgArr = e.value.split(",");
        }
      });
  
      console.log('updatte',{ ...state, hotelmsg: imgArr ,hotelMsg:hotelMsg});
      return { ...state, hotelmsg: imgArr ,hotelMsg:hotelMsg};
    },
    chooseRoom: (state, data) => {
      console.log("执行了");
      return { ...state, chooseRoomId: data };
    },
    setStartTime: (state, data) => {
      return { ...state, startTime: data };
    },
    setEndTime: (state, data) => {
      return { ...state, endTime: data };
    },
    upDateReseverList: (state, data) => {
      return { ...state, reseverList: data };
    },
    upDateParams: (state, data) => {
      return {
        ...state,
        wxId: data.openid,
        nickName: data.nickname,
        headUrl: data.headimgurl,
        ip: data.ip
      };
    }
  },
  async: {
    getCloudBook: function*() {
      while (true) {
        const action = yield take("getCloudBook");
        try {
          const res = yield cloudBookProtocolGet();
          yield put({ type: "updata", data: res.data });
          console.log("success", res);
        } catch (e) {
          console.log(e.error);
        }
      }
    },
    getRoomImg: function*() {
      while (true) {
        const action = yield take("getRoomImg");
        try {
          const res = yield getRoomCategoryRemain(action.data);
          yield put({ type: "updataImg", data: res.data });
        } catch (e) {
          console.log(e.error);
        }
      }
    },
    getRoomCountList: function*() {
      while (true) {
        const action = yield take("getRoomCountList");
        try {
          const res = yield getRoomCategoryRemain(action.data);
          yield put({ type: "updataTime", data: res.data });
        } catch (e) {
          console.log(e.error);
        }
      }
    },
    getHotelMsg: function*() {
      while (true) {
        const action = yield take("getHotelMsg");
        try {
          const res = yield hotelMessage();
          yield put({ type: "updateHotleMsg", data: res.data });
        } catch (e) {
          console.log(e.error);
        }
      }
    },
    getReseverList: function*() {
      while (true) {
        const action = yield take("getReseverList");
        try {
          console.log('getReseverList',action)
          const res = yield cloudBookGet(action.data);
          yield put({ type: "upDateReseverList", data: res.data });
        } catch (e) {
          console.log(e.error);
        }
      }
    },
    deleteResever: function*() {
      while (true) {
        const action = yield take("deleteResever");
        
        try {
          yield deleteResever(action.data);
          // const res = yield cloudBookGet(action.data.wxId);
        } catch (e) {
          console.log(e.error);
        }
      }
    }
  }
};
