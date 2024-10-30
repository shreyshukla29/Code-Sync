import SplitterComponent from "../component/SplitterComponent";
import ConnectionStatusPage from "../component/connection/ConnectionStatusPage";
import Sidebar from "../component/sidebar/Sidebar";
import WorkSpace from "../component/workspace";
import { useAppContext } from "../context/AppContext";
import { useSocket } from "../context/SocketContext";
import useFullScreen from "../hooks/useFullScreen";
import useUserActivity from "../hooks/useUserActivity";
import { SocketEvent } from "../types/socket";
import { USER_STATUS } from "../types/user"; // Import User if needed
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function EditorPage() {
  // Listen for user online/offline status
  useUserActivity();
  // Enable fullscreen mode
  useFullScreen();

  const navigate = useNavigate();
  const { roomId } = useParams(); // roomId will be inferred as a string
  const { status, setCurrentUser, currentUser } = useAppContext();
  const { socket } = useSocket();
  const location = useLocation();

  useEffect(() => {
    if (currentUser.username.length > 0) return;

    const username = location.state?.username;
    if (username === undefined) {
      navigate("/", {
        state: { roomId },
      });
    } else if (roomId) {
      const user = { username, roomId }; // No type annotation
      setCurrentUser(user);
      socket.emit(SocketEvent.JOIN_REQUEST, user);
    }
  }, [
    currentUser.username,
    location.state?.username,
    navigate,
    roomId,
    setCurrentUser,
    socket,
  ]);

  if (status === USER_STATUS.CONNECTION_FAILED) {
    return <ConnectionStatusPage />;
  }

  return (
    <SplitterComponent>
      <Sidebar />
      <WorkSpace />
    </SplitterComponent>
  );
}

export default EditorPage;
