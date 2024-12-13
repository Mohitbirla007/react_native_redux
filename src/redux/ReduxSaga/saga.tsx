import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { increaseCounter, fetchUser, setUserName } from '../ReduxToolkit/store/slices/userSlice';
import { setUser, fetchUserList, increaseCounterSaga } from './ApiFunctions';


// function* mySaga() {
//   yield takeEvery('USER_FETCH_REQUESTED', fetchUser)
// }
function* mySaga() {
  yield takeLatest(setUserName, setUser),
  yield takeLatest(increaseCounter, increaseCounterSaga),
  yield takeLatest(fetchUser, fetchUserList)
}

export default mySaga