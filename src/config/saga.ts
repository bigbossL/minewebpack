// import {delay} from 'redux-saga'
import {take,all,fork,put,call} from 'redux-saga/effects'

function* watchman(){
    while(true){
       
        const action=yield take('CHANGE')
         console.log('catch',action.data)
        yield put({type:'add',data:action.data});
    }
}
function * watchman2(){
    while(true){
        const action=yield take('ANOTHER')
        yield put({type:'add',data:action.data})
    }
}

export default function * rootSaga(){
    yield all([
        fork(watchman),
        fork(watchman2)
    ])
}