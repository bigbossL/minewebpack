
import { takeEvery } from "redux-saga/effects";
// import {delay} from 'redux-saga'
import { take, all, fork, put, call } from "redux-saga/effects";
import { cloudBookProtocolGet, getRoomCategoryRemain,hotelMessage } from "./api";
export const storeConfig = {
  state: {
    data: [],
    hasLoadCount: false,
    hotelmsg:[],
    startTime:void 0,
    endTime:void 0,
    chooseRoomId:void 0,
  },
  action: {
    init:(state,data)=>{
      return {...storeConfig.state}
    },
    updata: (state, data) => {
        let newdata={...state};
        newdata.data=data
      return newdata;
    },
    updataTime: (state, data) => { 
      let newdata = [...state.data];  
      for(let i=0;i<newdata.length;i++){
          for(let j=0;j<data.length;j++){
              if(newdata[i].roomCategory==data[j].category){   
                 newdata[i]['remain']=data[j].remain
                 newdata[i]['cloudPic']=data[j].cloudPic  
              }
          }
      }
     
      console.log("updataTime", newdata);
      return { ...state, data: newdata,hasLoadCount:true};
    },
    updateHotleMsg:(state,data)=>{
      console.log('updateHotleMsg')
      let imgArr=[]
      data.forEach(e=>{
        if(e.name=="酒店图片"){
          imgArr=e.value.split(',')
        }
      })
      console.log(imgArr)
      return{...state, hotelmsg: imgArr};
    },
    chooseRoom:(state,data)=>{
      console.log('执行了')
      return {...state,chooseRoomId:data}
    },
    setStartTime:(state,data)=>{
      return {...state,startTime:data}
    },
    setEndTime:(state,data)=>{
      return {...state,endTime:data}
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
    getHotelMsg:function*(){
        while (true) {
            const action = yield take("getHotelMsg");
            try {
              const res = yield hotelMessage();
              console.log('updateHotleMsg CALL',res)
              yield put({ type: "updateHotleMsg", data: res.data });
            } catch (e) {
              console.log(e.error);
            }
          }
    }
  }
};
