import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({          // slices are the peices of store
    name:"user",
    initialState: {
        userName: '',
        userList: [],
    },
    reducers: {
        setUserName(state, action) {
            state.userName = action.payload
        },
        fetchUser(state, action) {
            state.userList = action.payload
        },
        setUserList(state, action) {
            state.userList = action.payload
        },
        clearUserList(state) {
            state.userList = []
        }
    }
})

export {userSlice};
export const  {setUserName, fetchUser, setUserList, clearUserList}  = userSlice.actions

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        counter: 0,
    },
    reducers: {
        increaseCounter(state) {
            state.counter +=1
        },
        decreseCounter(state){
            state.counter -=1
        }
    }
})
export {counterSlice}
export const {increaseCounter, decreseCounter} = counterSlice.actions