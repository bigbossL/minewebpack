import { takeEvery } from "redux-saga/effects";
// import {delay} from 'redux-saga'
import { take, all, fork, put, call} from "redux-saga/effects";
import { cloudBookProtocolGet,getRoomCategoryRemain } from './api';
export const storeConfig={
    state:{
        count:10,
        no:20,
        data:null,
        hasLoadCount:false,
    },
    action:{
        add:(state,data)=>{
            console.log('hello add')
             return {...state,count:data}
        },
        updata:(state,data)=>{
            return {...state,data:data}
        },
        updataTime:(state,data)=>{
            console.log('updataTime',data)
        }
    },
    async:{
        hellosage:function*(){
            while(true){
                const action=yield take('CHANGE')
                console.log('catch')
                yield put({type:'add',data:action.data})
            }
        },
        getCloudBook: function*(){
            while(true){
                const action=yield take('getCloudBook')
                try{
                 const res=yield cloudBookProtocolGet()
                 yield put({type:'updata',data:res.data})
                 console.log('success',res)
                }catch(e){
                    console.log(e.error)
                }
                
            }
        },
        getRoomCountList:function*(){
            while(true){
                const action=yield take('getRoomCountList')
                try{
                    const res= yield getRoomCategoryRemain(action.data)
                    yield put({type:'updataTime',data:res.data})
                }catch(e){
                    console.log(e.error)
                }
            }
        }
    }
}