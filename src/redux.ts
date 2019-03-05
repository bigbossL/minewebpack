import {createStore,applyMiddleware} from 'redux'
import {storeConfig} from './config/store'
import createSagaMiddleware from 'redux-saga';

// import { composeWithDevTools } from 'redux-devtools-extension'
// import {createLogger} from 'redux-logger'

// import rootSaga from './config/saga';
import {all, fork} from "redux-saga/effects";
const sagaMiddleware=createSagaMiddleware();


interface DispatchObj{
    type:string,
    data:any
}

const reducer=(state,action:DispatchObj)=>{ 
    console.log('reducer:',state)
    if(storeConfig.action[action.type]){
       
        return storeConfig.action[action.type](state,action.data)
    }
       return state==void 0?{...storeConfig.state}:{...state}  
}

function* rootSaga() {
    let forkList=[]
    Object.keys(storeConfig.async).forEach(e=>{
        forkList.push(fork(storeConfig.async[e]))
    })
    console.log(forkList)
    yield all(forkList)
}
  
// const loggerMiddleware = createLogger({collapsed: true});
export default function getStore(){
    const store=createStore(reducer, applyMiddleware(sagaMiddleware))
    sagaMiddleware.run(rootSaga)
    return store 
}
// export const store=createStore(reducer, applyMiddleware(sagaMiddleware))

