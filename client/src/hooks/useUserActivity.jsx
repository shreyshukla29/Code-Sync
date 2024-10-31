/* eslint-disable no-unused-vars */
import { useAppContext } from "../context/AppContext";
import { useSocket } from "../context/SocketContext";
import { SocketEvent, SocketId } from "../types/socket";
import { RemoteUser, USER_CONNECTION_STATUS } from "../types/user";
import { useCallback, useEffect } from "react";

function useUserActivity() {
    const { setUsers } = useAppContext();
    const { socket } = useSocket();

    const handleUserVisibilityChange = useCallback(() => {
        if (document.visibilityState === "visible") {
            socket.emit(SocketEvent.USER_ONLINE, { socketId: socket.id });
        } else if (document.visibilityState === "hidden") {
            socket.emit(SocketEvent.USER_OFFLINE, { socketId: socket.id });
        }
    }, [socket]);

    const handleUserOnline = useCallback(
        ({ socketId }) => {
            setUsers((users) => {
                return users.map((user) => {
                    if (user.socketId === socketId) {
                        return {
                            ...user,
                            status: USER_CONNECTION_STATUS.ONLINE,
                        };
                    }
                    return user;
                });
            });
        },
        [setUsers]
    );

    const handleUserOffline = useCallback(
        ({ socketId }) => {
            setUsers((users) => {
                return users.map((user) => {
                    if (user.socketId === socketId) {
                        return {
                            ...user,
                            status: USER_CONNECTION_STATUS.OFFLINE,
                        };
                    }
                    return user;
                });
            });
        },
        [setUsers]
    );

    const handleUserTyping = useCallback(
        ({ user }) => {
            setUsers((users) => {
                return users.map((u) => {
                    if (u.socketId === user.socketId) {
                        return user;
                    }
                    return u;
                });
            });
        },
        [setUsers]
    );

    useEffect(() => {
        document.addEventListener("visibilitychange", handleUserVisibilityChange);

        socket.on(SocketEvent.USER_ONLINE, handleUserOnline);
        socket.on(SocketEvent.USER_OFFLINE, handleUserOffline);
        socket.on(SocketEvent.TYPING_START, handleUserTyping);
        socket.on(SocketEvent.TYPING_PAUSE, handleUserTyping);

        return () => {
            document.removeEventListener("visibilitychange", handleUserVisibilityChange);

            socket.off(SocketEvent.USER_ONLINE, handleUserOnline);
            socket.off(SocketEvent.USER_OFFLINE, handleUserOffline);
            socket.off(SocketEvent.TYPING_START, handleUserTyping);
            socket.off(SocketEvent.TYPING_PAUSE, handleUserTyping);
        };
    }, [
        socket,
        setUsers,
        handleUserVisibilityChange,
        handleUserOnline,
        handleUserOffline,
        handleUserTyping
    ]);
}

export default useUserActivity;
