import { configureStore } from "@reduxjs/toolkit";
import { counterSlice, userSlice } from "./slices/userSlice";
import createSagaMiddleware from "@redux-saga/core";
import mySaga from "../../ReduxSaga/saga";

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {users: userSlice.reducer, counter: counterSlice.reducer},    // reducer is combined interegrated in store in case of toolkit. Now store can access all the reducers from userSlice
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),  // connects to middleware
})
export default store;

sagaMiddleware.run(mySaga)