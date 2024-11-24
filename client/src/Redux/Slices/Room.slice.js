// src/redux/slices/roomSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    currentUser: {
        username: "",
        roomId: "",
    },
    status: "INITIAL", // USER_STATUS.INITIAL equivalent
    activityState: "CODING", // ACTIVITY_STATE.CODING equivalent
    drawingData: null,
}

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setUsers(state, action) {
            state.users = action.payload
        },
        setCurrentUser(state, action) {
            state.currentUser = action.payload
        },
        setStatus(state, action) {
            state.status = action.payload
        },
        setActivityState(state, action) {
            state.activityState = action.payload
        },
        setDrawingData(state, action) {
            state.drawingData = action.payload
        },
        addUser(state, action) {
            state.users.push(action.payload)
        },
        removeUser(state, action) {
            state.users = state.users.filter(
                (user) => user.username !== action.payload.username
            )
        },
    },
})

export const {
    setUsers,
    setCurrentUser,
    setStatus,
    setActivityState,
    setDrawingData,
    addUser,
    removeUser,
} = roomSlice.actions

export default roomSlice.reducer
