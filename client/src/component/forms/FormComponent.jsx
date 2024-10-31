/* eslint-disable no-unused-vars */
import { useAppContext } from "../../context/AppContext"
import { useSocket } from "../../context/SocketContext"
import { SocketEvent } from "../../types/socket"
import { USER_STATUS } from "../../types/user"
import { ChangeEvent, FormEvent, useEffect, useRef } from "react"
import { toast } from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import {useSelector} from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { useState } from 'react';


const FormComponent = () => {

  const {username} = useSelector((state)=>state.auth.data)


    // const location = useLocation()
    // const { currentUser, setCurrentUser, status, setStatus } = useAppContext()
    // const { socket } = useSocket();
    // const usernameRef = useRef(null)
     const navigate = useNavigate()

    // const createNewRoomId = () => {
    //     setCurrentUser({ ...currentUser, roomId: uuidv4() })
    //     toast.success("Created a new Room Id")
    //     usernameRef.current?.focus()
    // }

    const [roomName, setroomName] = useState("");
   const [roomId, setroomId] = useState("");

   
    // const validateForm = () => {
    //     if (currentUser.username.length === 0) {
    //         toast.error("Enter your username")
    //         return false
    //     } else if (currentUser.roomId.length === 0) {
    //         toast.error("Enter a room id")
    //         return false
    //     } else if (currentUser.roomId.length < 5) {
    //         toast.error("ROOM Id must be at least 5 characters long")
    //         return false
    //     } else if (currentUser.username.length < 3) {
    //         toast.error("Username must be at least 3 characters long")
    //         return false
    //     }
    //     return true
    // }


    const GenerateUniqueId =(e)=>{
      e.preventDefault();
      setroomId((val)=>
        uuidv4()
      )

      console.log(roomId)
    }

    const joinRoom = (e) => {
      console.log('hit')
        e.preventDefault()
      //  if (status === USER_STATUS.ATTEMPTING_JOIN) return
       // if (!validateForm()) return
        toast.loading("Joining room...")
//setStatus(USER_STATUS.ATTEMPTING_JOIN)
       // socket.emit(SocketEvent.JOIN_REQUEST, currentUser)

       if(!roomId){
        toast.error('enter roomId')
        return;
       }

       if(!roomName){
        toast.error('enter room name')
        return;
       }
       navigate(`/Editor/${roomId}`)
    }

    // useEffect(() => {
    //     if (currentUser.roomId.length > 0) return
    //     if (location.state?.roomId) {
    //         setCurrentUser({ ...currentUser, roomId: location.state.roomId })
    //         if (currentUser.username.length === 0) {
    //             toast.success("Enter your username")
    //         }
    //     }
    // }, [currentUser, location.state?.roomId, setCurrentUser])

    // useEffect(() => {
    //     if (status === USER_STATUS.DISCONNECTED && !socket.connected) {
    //         socket.connect()
    //         return
    //     }

    //     const isRedirect = sessionStorage.getItem("redirect") || false

    //     if (status === USER_STATUS.JOINED && !isRedirect) {
    //         const username = currentUser.username
    //         sessionStorage.setItem("redirect", "true")
    //         navigate(`/editor/${currentUser.roomId}`, {
    //             state: {
    //                 username,
    //             },
    //         })
    //     } else if (status === USER_STATUS.JOINED && isRedirect) {
    //         sessionStorage.removeItem("redirect")
    //         setStatus(USER_STATUS.DISCONNECTED)
    //         socket.disconnect()
    //         socket.connect()
    //     }
    // }, [currentUser, location.state?.redirect, navigate, setStatus, socket, status])

    return (
        <>
        <div className="border p-4 border-gray-700 lg:w-2/3">
            <h2 className="text-xl font-semibold text-white">Create Room</h2>
            <div className="my-4">
              <input
                type="text"
                className="mt-2 p-2  w-full rounded bg-gray-700 border border-gray-600"
                placeholder="Room Name"
                name="username"
                value={roomName}
                onChange={(e)=> setroomName(e.target.value)}   
              />
              <input
                type="text"
                className="mt-2 p-2 w-full rounded bg-gray-700 border border-gray-600"
                placeholder="Room ID"
                name="roomId"
                value={roomId}
                onChange={(e)=> setroomId(e.target.value)}
              />
              <div className="flex space-x-2 mt-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"  
              onClick={GenerateUniqueId}  >
                  Generate Unique ID
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                  onClick={joinRoom}

                >
                  Create Room
                </button>
              </div>
            </div>
          </div>
          <div className="border border-gray-700 p-4  w-full lg:w-2/3">
            <h2 className="text-xl font-semibold text-white">Join Room</h2>
            <div className="my-4">
              <input
                type="text"
                className="mt-2 p-2 w-full rounded bg-gray-700 border border-gray-600"
                placeholder="Room Id"
               
              />
              <div className="flex space-x-2 mt-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                 
                >
                  Join Room
                </button>
              </div>
            </div>
          </div>
          </>
    )
}

export default FormComponent
