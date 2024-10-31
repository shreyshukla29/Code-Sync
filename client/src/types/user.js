const USER_CONNECTION_STATUS = {
    OFFLINE: "offline",
    ONLINE: "online",
};

class User {
    constructor(username, roomId) {
        this.username = username;
        this.roomId = roomId;
    }
}

class RemoteUser extends User {
    constructor(username, roomId, status, cursorPosition, typing, currentFile, socketId) {
        super(username, roomId);
        this.status = status;
        this.cursorPosition = cursorPosition;
        this.typing = typing;
        this.currentFile = currentFile;
        this.socketId = socketId;
    }
}

const USER_STATUS = {
    INITIAL: "initial",
    CONNECTING: "connecting",
    ATTEMPTING_JOIN: "attempting-join",
    JOINED: "joined",
    CONNECTION_FAILED: "connection-failed",
    DISCONNECTED: "disconnected",
};

// Exporting the constants and classes
export { USER_CONNECTION_STATUS, USER_STATUS, RemoteUser, User };
