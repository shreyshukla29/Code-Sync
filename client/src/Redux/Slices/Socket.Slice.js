/* eslint-disable react-hooks/rules-of-hooks */
// src/redux/slices/socketSlice.js
import { createSlice } from '@reduxjs/toolkit'
// import { io } from 'socket.io-client'
import { toast } from 'react-hot-toast'
import { setUsers, setCurrentUser, setStatus, setDrawingData } from './Room.slice'

const initialState = {
    socket: null,
}
const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        initializeSocket(state,action) {
           state.socket = action.payload
        },
        // disconnectSocket(state) {
        //     if (state.socket) {
        //         state.socket.disconnect()
        //         state.socket = null
        //     }
        // },
    },
})

export const { initializeSocket, disconnectSocket } = socketSlice.actions


export const setupSocketListeners = () => (dispatch, getState) => {

    const socket = getState().socket.socket
    console.log('hello')
    if (!socket){
        console.log('return')
        return
    }


    const handleError = (err) => {
        console.error('Socket error:', err)
        dispatch(setStatus('CONNECTION_FAILED'))
        toast.dismiss()
        toast.error('Failed to connect to the server')
    }


    const handleUsernameExist = () => {
        toast.dismiss()
        dispatch(setStatus('INITIAL'))
        toast.error(
            'The username you chose already exists in the room. Please choose a different username.'
        )
    }


    const handleJoiningAccept = ({ user, users }) => {
        console.log('join accept')
        dispatch(setCurrentUser(user))
        dispatch(setUsers(users))
        toast.dismiss()
        dispatch(setStatus('JOINED'))

        if (users.length > 1) {
            toast.loading('Syncing data, please wait...')
        }
    }


    const handleUserLeft = ({ user }) => {
        toast.success(`${user.username} left the room`)
        dispatch(
            setUsers(
                getState().room.users.filter(
                    (u) => u.username !== user.username
                )
            )
        )
    }


    const handleRequestDrawing = ({ socketId }) => {
        const { drawingData } = getState().room
        socket.emit('SYNC_DRAWING', { socketId, drawingData })
    }

 
    const handleDrawingSync = ({ drawingData }) => {
        dispatch(setDrawingData(drawingData))
    }

    socket.on('connect_error', handleError)
    socket.on('connect_failed', handleError)
    socket.on('USERNAME_EXISTS', handleUsernameExist)
    socket.on('join-accepted', handleJoiningAccept)
    socket.on('USER_DISCONNECTED', handleUserLeft)
    socket.on('REQUEST_DRAWING', handleRequestDrawing)
    socket.on('SYNC_DRAWING', handleDrawingSync)

    return () => {
        socket.off("connect_error")
        socket.off("connect_failed")
        socket.off('join-accepted')
        socket.off('USERNAME_EXISTS')
        socket.off('USER_DISCONNECTED')
        socket.off('REQUEST_DRAWING')
        socket.off('SYNC_DRAWING')
    }

   
}

export default socketSlice.reducer
