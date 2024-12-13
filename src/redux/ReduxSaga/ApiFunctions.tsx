import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { setUserList } from '../ReduxToolkit/store/slices/userSlice';



export function* setUser(action: any) {
    // console.log("saga", action);
}
export const increaseCounterSaga = (action: any) => {
//  console.log("counter saga", action);
}

export function* fetchUserList() {
    const response = yield fetch("https://jsonplaceholder.typicode.com/users");
    const data = yield response.json();
    yield put(setUserList(data)); 
}