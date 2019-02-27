import {createStore,applyMiddleware} from 'redux'
import {storeConfig} from './config/store'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './config/saga';
const sagaMiddleware=createSagaMiddleware();


interface DispatchObj{
    type:string,
    data:any
}
//SAGA 的回调？


const reducer=(state,action:DispatchObj)=>{
    if(storeConfig.action[action.type]){
        return storeConfig.action[action.type](state,action.data)
    }
       return {...storeConfig.state}  
}

export default function getStore(){
    const store=createStore(reducer, applyMiddleware(sagaMiddleware))
    sagaMiddleware.run(rootSaga)
    return store 
}
// export const store=createStore(reducer, applyMiddleware(sagaMiddleware))

