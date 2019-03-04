import {createStore,applyMiddleware} from 'redux'
import {storeConfig} from './config/store'
import createSagaMiddleware from 'redux-saga';
// import rootSaga from './config/saga';
import {all, fork} from "redux-saga/effects";
const sagaMiddleware=createSagaMiddleware();


interface DispatchObj{
    type:string,
    data:any
}

const reducer=(state,action:DispatchObj)=>{
    if(storeConfig.action[action.type]){
        console.log(storeConfig.action[action.type](state,action.data))
        return storeConfig.action[action.type](state,action.data)
    }
       return {...storeConfig.state}  
}

function* rootSaga() {
    let forkList=[]
    Object.keys(storeConfig.async).forEach(e=>{
        forkList.push(fork(storeConfig.async[e]))
    })
    console.log(forkList)
    yield all(forkList)
}
  

export default function getStore(){
    const store=createStore(reducer, applyMiddleware(sagaMiddleware))
    sagaMiddleware.run(rootSaga)
    return store 
}
// export const store=createStore(reducer, applyMiddleware(sagaMiddleware))

