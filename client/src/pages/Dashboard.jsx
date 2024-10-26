// src/pages/Dashboard.js
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FriendAndInvitations from "../component/FriendAndInvitations";

import ActiveRooms from "../component/ActiveRooms";
import Layout from "./../layout/Layout";

const Dashboard = () => {
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joinId, setJoinId] = useState("");
  const [activeRooms, setActiveRooms] = useState([]);

  const generateRoomId = () => {
    const id = uuidv4();
    setRoomId(id);
  };

  const createRoom = () => {
    if (roomName && roomId) {
      setActiveRooms([...activeRooms, { name: roomName, id: roomId }]);
      // Reset room fields after creation
      setRoomName("");
      setRoomId("");
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex mt-24 md:mt-40">
        {/* Left Sidebar */}
        <div className="w-1/4 p-4 text-white hidden lg:block">
          <FriendAndInvitations />
        </div>
        {/* Main Section */}
        <div className="sm:w-2/3 md:w-1/2 p-4 flex flex-col items-center gap-10">
          <div className="border p-4 border-gray-700 lg:w-2/3">
            <h2 className="text-xl font-semibold text-white">Create Room</h2>
            <div className="my-4">
              <input
                type="text"
                className="mt-2 p-2  w-full rounded bg-gray-700 border border-gray-600"
                placeholder="Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <input
                type="text"
                className="mt-2 p-2 w-full rounded bg-gray-700 border border-gray-600"
                placeholder="Room Name"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
              <div className="flex space-x-2 mt-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                  onClick={generateRoomId}
                >
                  Generate Unique ID
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                  onClick={createRoom}
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
                value={joinId}
                onChange={(e) => setJoinId(e.target.value)}
              />
              <div className="flex space-x-2 mt-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                  onClick={createRoom}
                >
                  Join Room
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section (Active Rooms) */}
        <div className="w-1/4 p-4 text-white hidden sm:block">
          <ActiveRooms rooms={activeRooms} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
