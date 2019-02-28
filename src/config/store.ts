import { takeEvery } from "redux-saga/effects";
// import {delay} from 'redux-saga'
import { take, all, fork, put, call} from "redux-saga/effects";
export const storeConfig={
    state:{
        count:10,
        no:20
    },
    action:{
        add:(state,data)=>{
            console.log('hello add')
             return {...state,count:data}
        }
    },
    async:{
        hellosage:function*(){
            while(true){
                const action=yield take('CHANGE')
                console.log('catch')
                yield put({type:'add',data:action.data})
            }
        }
    }
}